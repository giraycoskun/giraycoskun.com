import snapshot from '../../src/data/watchlistSnapshot.json' with { type: 'json' };
import { DIARY_RSS_URL, parseDiaryFeed, type DiarySnapshot } from '../../src/utils/diary.ts';
import { parseWatchlistCount, recordCount, WATCHLIST_URL, type WatchlistHistory } from '../../src/utils/watchlist.ts';

export interface Env {
  WATCHLIST: {
    get<T>(key: string, type: 'json'): Promise<T | null>;
    put(key: string, value: string): Promise<void>;
  };
}

export const HISTORY_KEY = 'watchlist:giraycoskun:v1';
export const DIARY_KEY = 'diary:giraycoskun:v1';

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
