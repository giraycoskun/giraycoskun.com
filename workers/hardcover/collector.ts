const HARDCOVER_API_URL = 'https://api.hardcover.app/v1/graphql';
export const HARDCOVER_USERNAME = 'giraycoskun';
export const BOOKS_KEY = 'currently-reading:v1';

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
  data?: { user_books?: HardcoverBook[] };
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
  query CurrentlyReading($username: String!) {
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
  }
`;

export async function collectCurrentlyReading(env: Env, fetcher: typeof fetch = fetch): Promise<HardcoverBooks> {
  if (!env.HARDCOVER_API_TOKEN) throw new Error('HARDCOVER_API_TOKEN is not configured');

  const response = await fetcher(HARDCOVER_API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.HARDCOVER_API_TOKEN}`,
    },
    body: JSON.stringify({ query: QUERY, variables: { username: HARDCOVER_USERNAME } }),
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) throw new Error(`Hardcover returned HTTP ${response.status}`);
  const payload = (await response.json()) as GraphQLResponse;
  if (payload.errors?.length) {
    throw new Error(`Hardcover GraphQL error: ${payload.errors.map((error) => error.message ?? 'unknown error').join('; ')}`);
  }

  const books = payload.data?.user_books;
  if (!Array.isArray(books)) throw new Error('Hardcover returned an invalid books response');

  const result: HardcoverBooks = {
    count: books.length,
    books,
    updatedAt: new Date().toISOString(),
  };
  await env.HARDCOVER_BOOKS.put(BOOKS_KEY, JSON.stringify(result));
  return result;
}
