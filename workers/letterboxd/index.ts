import snapshot from '../../src/data/watchlistSnapshot.json' with { type: 'json' };
import diarySnapshot from '../../src/data/diarySnapshot.json' with { type: 'json' };
import type { DiarySnapshot } from '../../src/utils/diary.ts';
import { renderWatchlistSvg, type WatchlistHistory } from '../../src/utils/watchlist.ts';
import { collectDiary, collectWatchlist, DIARY_KEY, HISTORY_KEY, type Env } from './collector.ts';

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=3600',
  'Access-Control-Allow-Origin': '*',
  'X-Content-Type-Options': 'nosniff',
};

export default {
  async scheduled(_event: unknown, env: Env) {
    // Run independently so a temporary failure in one source does not prevent the other update.
    const results = await Promise.allSettled([collectWatchlist(env), collectDiary(env)]);
    const failures = results.filter(result => result.status === 'rejected');
    if (failures.length) throw new AggregateError(failures.map(result => result.reason), 'One or more Letterboxd collections failed');
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    const path = new URL(request.url).pathname;
    if (path !== '/watchlist.svg' && path !== '/diary.json') return new Response('Not found', { status: 404 });
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    if (path === '/diary.json') {
      try {
        const stored = await env.WATCHLIST.get<DiarySnapshot>(DIARY_KEY, 'json');
        return new Response(request.method === 'HEAD' ? null : JSON.stringify(stored ?? diarySnapshot), { headers: JSON_HEADERS });
      } catch (error) {
        console.error('Unable to read diary snapshot', error);
        return new Response(request.method === 'HEAD' ? null : JSON.stringify(diarySnapshot), {
          headers: { ...JSON_HEADERS, 'Cache-Control': 'no-store' },
        });
      }
    }
    try {
      const stored = await env.WATCHLIST.get<WatchlistHistory>(HISTORY_KEY, 'json');
      return new Response(request.method === 'HEAD' ? null : renderWatchlistSvg(stored ?? snapshot, new Date(), !stored), {
        headers: {
          'Content-Type': 'image/svg+xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'X-Content-Type-Options': 'nosniff',
          'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
        },
      });
    } catch (error) {
      console.error('Unable to read watchlist history', error);
      return new Response(request.method === 'HEAD' ? null : renderWatchlistSvg(snapshot, new Date(), true), {
        headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'no-store' },
      });
    }
  },
};
