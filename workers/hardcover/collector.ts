import { recordYearActivity, type YearActivityHistory } from '../../src/utils/yearActivity.ts';

const HARDCOVER_API_URL = 'https://api.hardcover.app/v1/graphql';
export const HARDCOVER_USERNAME = 'giraycoskun';
export const BOOKS_KEY = 'currently-reading:v1';
export const YEAR_READS_KEY = 'read-this-year:v1';

export interface HardcoverBook {
  book: {
    title: string;
    slug: string;
    image: { url: string } | null;
  };
}

export interface HardcoverBooks {
  count: number;
  books: HardcoverBook[];
  updatedAt: string;
}

interface GraphQLResponse {
  data?: {
    user_books?: HardcoverBook[];
    user_books_aggregate?: { aggregate?: { count?: number } | null };
  };
  errors?: Array<{ message?: string }>;
}

export interface Env {
  HARDCOVER_API_TOKEN: string;
  HARDCOVER_BOOKS: {
    get<T>(key: string, type: 'json'): Promise<T | null>;
    put(key: string, value: string): Promise<void>;
  };
}

const QUERY = `
  query ReadingSnapshot($username: citext!, $yearStart: date!, $nextYearStart: date!) {
    user_books(
      where: { user: { username: { _eq: $username } }, status_id: { _eq: 2 } }
      order_by: { updated_at: desc }
      limit: 4
    ) {
      book {
        title
        slug
        image { url }
      }
    }
    user_books_aggregate(
      where: {
        user: { username: { _eq: $username } }
        user_book_reads: { finished_at: { _gte: $yearStart, _lt: $nextYearStart } }
      }
    ) {
      aggregate { count }
    }
  }
`;

export interface HardcoverSnapshot {
  books: HardcoverBooks;
  yearlyReads: YearActivityHistory;
}

export async function collectReadingSnapshot(
  env: Env,
  now = new Date(),
  fetcher: typeof fetch = fetch,
): Promise<HardcoverSnapshot> {
  if (!env.HARDCOVER_API_TOKEN) throw new Error('HARDCOVER_API_TOKEN is not configured');

  const year = now.getUTCFullYear();

  const response = await fetcher(HARDCOVER_API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.HARDCOVER_API_TOKEN}`,
      'User-Agent': 'GirayHardcover/1.0 (+https://giraycoskun.com)',
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        username: HARDCOVER_USERNAME,
        yearStart: `${year}-01-01`,
        nextYearStart: `${year + 1}-01-01`,
      },
    }),
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) throw new Error(`Hardcover returned HTTP ${response.status}`);
  const payload = (await response.json()) as GraphQLResponse;
  if (payload.errors?.length) {
    throw new Error(`Hardcover GraphQL error: ${payload.errors.map((error) => error.message ?? 'unknown error').join('; ')}`);
  }

  const books = payload.data?.user_books;
  if (!Array.isArray(books)) throw new Error('Hardcover returned an invalid books response');
  const yearlyCount = payload.data?.user_books_aggregate?.aggregate?.count;
  if (typeof yearlyCount !== 'number' || !Number.isSafeInteger(yearlyCount) || yearlyCount < 0) {
    throw new Error('Hardcover returned an invalid yearly read count');
  }

  const result: HardcoverBooks = {
    count: books.length,
    books,
    updatedAt: now.toISOString(),
  };
  const previous = await env.HARDCOVER_BOOKS.get<YearActivityHistory>(YEAR_READS_KEY, 'json');
  const yearlyReads = recordYearActivity(previous, HARDCOVER_USERNAME, yearlyCount, now);
  await env.HARDCOVER_BOOKS.put(BOOKS_KEY, JSON.stringify(result));
  await env.HARDCOVER_BOOKS.put(YEAR_READS_KEY, JSON.stringify(yearlyReads));
  return { books: result, yearlyReads };
}
