import snapshot from '../../src/data/watchlistSnapshot.json' with { type: 'json' };
import { parseWatchlistCount, recordCount, WATCHLIST_URL, type WatchlistHistory } from '../../src/utils/watchlist.ts';

export interface Env {
  WATCHLIST: {
    get<T>(key: string, type: 'json'): Promise<T | null>;
    put(key: string, value: string): Promise<void>;
  };
}

export const HISTORY_KEY = 'watchlist:giraycoskun:v1';

export async function collectWatchlist(env: Env, now = new Date(), fetcher: typeof fetch = fetch) {
  const response = await fetcher(WATCHLIST_URL, {
    headers: { Accept: 'text/html', 'User-Agent': 'GirayWatchlist/1.0 (+https://giraycoskun.com)' },
    signal: AbortSignal.timeout(20_000),
    redirect: 'manual',
  });
  if (!response.ok) throw new Error(`Letterboxd returned HTTP ${response.status}`);
  if (!response.headers.get('Content-Type')?.includes('text/html')) throw new Error('Expected Letterboxd HTML');
  const count = parseWatchlistCount(await response.text());
  const previous = await env.WATCHLIST.get<WatchlistHistory>(HISTORY_KEY, 'json') ?? snapshot;
  // Seed requested backfill on existing installations too; recorded values win.
  const next = recordCount({ ...previous, history: [...snapshot.history, ...previous.history] }, count, now);
  await env.WATCHLIST.put(HISTORY_KEY, JSON.stringify(next));
  return next;
}
