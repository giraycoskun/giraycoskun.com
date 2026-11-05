import snapshot from '../../src/data/watchlistSnapshot.json' with { type: 'json' };
import { DIARY_RSS_URL, parseDiaryFeed, type DiarySnapshot } from '../../src/utils/diary.ts';
import { parseWatchlistCount, recordCount, WATCHLIST_URL, type WatchlistHistory } from '../../src/utils/watchlist.ts';
import { seedYearActivity, type YearActivityHistory } from '../../src/utils/yearActivity.ts';

export interface Env {
  WATCHLIST: {
    get<T>(key: string, type: 'json'): Promise<T | null>;
    put(key: string, value: string): Promise<void>;
  };
}

export const HISTORY_KEY = 'watchlist:giraycoskun:v1';
export const DIARY_KEY = 'diary:giraycoskun:v1';
export const YEAR_DIARY_KEY = 'diary-year:giraycoskun:v1';
export const yearDiaryArchiveKey = (year: number) => `diary-year:giraycoskun:${year}:v1`;
export const LETTERBOXD_USERNAME = 'giraycoskun';

export const yearlyDiaryUrl = (year: number, page = 1) =>
  `https://letterboxd.com/${LETTERBOXD_USERNAME}/diary/films/for/${year}/${page === 1 ? '' : `page/${page}/`}`;

export async function archiveCompletedDiaryYear(env: Env, now = new Date()): Promise<YearActivityHistory | null> {
  const previous = await env.WATCHLIST.get<YearActivityHistory>(YEAR_DIARY_KEY, 'json');
  if (!previous || previous.year >= now.getUTCFullYear()) return null;
  await env.WATCHLIST.put(yearDiaryArchiveKey(previous.year), JSON.stringify(previous));
  return previous;
}

const requestOptions = (accept: string): RequestInit => ({
  headers: { Accept: accept, 'User-Agent': 'GirayLetterboxd/1.0 (+https://giraycoskun.com)' },
  // Creating timeout signals at module scope is forbidden by the Workers runtime.
  signal: AbortSignal.timeout(20_000),
  redirect: 'manual',
});

export async function collectWatchlist(env: Env, now = new Date(), fetcher: typeof fetch = fetch) {
  const response = await fetcher(WATCHLIST_URL, requestOptions('text/html'));
  if (!response.ok) throw new Error(`Letterboxd returned HTTP ${response.status}`);
  if (!response.headers.get('Content-Type')?.includes('text/html')) throw new Error('Expected Letterboxd HTML');
  const count = parseWatchlistCount(await response.text());
  const previous = await env.WATCHLIST.get<WatchlistHistory>(HISTORY_KEY, 'json') ?? snapshot;
  // Seed requested backfill on existing installations too; recorded values win.
  const next = recordCount({ ...previous, history: [...snapshot.history, ...previous.history] }, count, now);
  await env.WATCHLIST.put(HISTORY_KEY, JSON.stringify(next));
  return next;
}

export async function collectDiary(env: Env, now = new Date(), fetcher: typeof fetch = fetch): Promise<DiarySnapshot> {
  const response = await fetcher(DIARY_RSS_URL, requestOptions('application/rss+xml, application/xml'));
  if (!response.ok) throw new Error(`Letterboxd diary feed returned HTTP ${response.status}`);
  const contentType = response.headers.get('Content-Type') ?? '';
  if (!contentType.includes('xml') && !contentType.includes('rss')) throw new Error('Expected Letterboxd RSS');
  const next: DiarySnapshot = {
    username: 'giraycoskun',
    updatedAt: now.toISOString(),
    films: parseDiaryFeed(await response.text()),
  };
  await env.WATCHLIST.put(DIARY_KEY, JSON.stringify(next));
  return next;
}

const attribute = (tag: string, name: string) => tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'))?.[1];

function validateYearlyDiary(html: string): void {
  const body = html.match(/<body\b[^>]*>/i)?.[0] ?? '';
  const classes = attribute(body, 'class')?.split(/\s+/) ?? [];
  if (attribute(body, 'data-owner') !== LETTERBOXD_USERNAME || !classes.includes('diary') || !classes.includes('films-diary')) {
    throw new Error('Letterboxd did not return the expected public diary');
  }
}

/** Extract the total from the public, year-filtered diary without mistaking a challenge for zero. */
export function parseYearlyDiaryCount(html: string, year: number): number {
  if (!Number.isInteger(year) || year < 2011 || year > 9999) throw new Error('Invalid diary year');
  validateYearlyDiary(html);

  const text = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/&#(?:39|x27);|&apos;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ');
  const total = text.match(new RegExp(`has logged\\s+([\\d,]+)\\s+entr(?:y|ies)\\s+for films during\\s+${year}\\b`, 'i'));
  if (total) {
    const count = Number(total[1].replaceAll(',', ''));
    if (Number.isSafeInteger(count) && count >= 0) return count;
  }
  if (new RegExp(`(?:hasn['’]t|haven['’]t) logged any entr(?:y|ies) for films during\\s+${year}\\b`, 'i').test(text)) return 0;

  // For a single-page year, the verified diary rows themselves are an exact fallback.
  const yearPath = `/${LETTERBOXD_USERNAME}/diary/films/for/${year}/`;
  const hasYearLinks = html.includes(yearPath);
  const rows = html.match(/<tr\b[^>]*\bclass=["'][^"']*\bdiary-entry-row\b[^"']*["'][^>]*>/gi) ?? [];
  const hasNextPage = new RegExp(`${yearPath.replaceAll('/', '\\/')}page\\/2\\/`, 'i').test(html);
  if (hasYearLinks && rows.length > 0 && !hasNextPage) return rows.length;
  throw new Error('Letterboxd yearly diary total is missing');
}

/** Extract one exact watched date from every diary row on a year page. */
export function parseYearlyDiaryDates(html: string, year: number): string[] {
  if (!Number.isInteger(year) || year < 2011 || year > 9999) throw new Error('Invalid diary year');
  validateYearlyDiary(html);
  const rows = html.match(/<tr\b[^>]*\bclass=["'][^"']*\bdiary-entry-row\b[^"']*["'][^>]*>[\s\S]*?<\/tr>/gi) ?? [];

  return rows.map(row => {
    const match = row.match(new RegExp(`href=["']\\/${LETTERBOXD_USERNAME}\\/[^"']*\\/${year}\\/(\\d{1,2})\\/(\\d{1,2})\\/["']`, 'i'));
    if (!match) throw new Error('Letterboxd diary row is missing its watched date');
    const month = Number(match[1]);
    const day = Number(match[2]);
    const time = Date.UTC(year, month - 1, day);
    const parsed = new Date(time);
    if (parsed.getUTCFullYear() !== year || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day) {
      throw new Error('Letterboxd diary row has an invalid watched date');
    }
    return parsed.toISOString().slice(0, 10);
  });
}

export async function collectYearlyDiary(env: Env, now = new Date(), fetcher: typeof fetch = fetch): Promise<YearActivityHistory> {
  const year = now.getUTCFullYear();
  const response = await fetcher(yearlyDiaryUrl(year), requestOptions('text/html'));
  if (!response.ok) throw new Error(`Letterboxd yearly diary returned HTTP ${response.status}`);
  if (!response.headers.get('Content-Type')?.includes('text/html')) throw new Error('Expected Letterboxd yearly diary HTML');
  const firstPage = await response.text();
  const count = parseYearlyDiaryCount(firstPage, year);
  const dates = parseYearlyDiaryDates(firstPage, year);

  for (let page = 2; dates.length < count; page += 1) {
    if (page > 100) throw new Error('Letterboxd yearly diary has too many pages');
    const pageResponse = await fetcher(yearlyDiaryUrl(year, page), requestOptions('text/html'));
    if (!pageResponse.ok) throw new Error(`Letterboxd yearly diary page ${page} returned HTTP ${pageResponse.status}`);
    if (!pageResponse.headers.get('Content-Type')?.includes('text/html')) throw new Error('Expected Letterboxd yearly diary HTML');
    const pageDates = parseYearlyDiaryDates(await pageResponse.text(), year);
    if (pageDates.length === 0) throw new Error(`Letterboxd yearly diary page ${page} is empty`);
    dates.push(...pageDates);
  }
  if (dates.length !== count) throw new Error('Letterboxd yearly diary dates do not match its total');

  const next = seedYearActivity(LETTERBOXD_USERNAME, dates, now);
  await env.WATCHLIST.put(YEAR_DIARY_KEY, JSON.stringify(next));
  return next;
}
