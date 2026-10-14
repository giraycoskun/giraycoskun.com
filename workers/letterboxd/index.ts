import snapshot from '../../src/data/watchlistSnapshot.json' with { type: 'json' };
import { renderWatchlistSvg, type WatchlistHistory } from '../../src/utils/watchlist.ts';
import { collectWatchlist, HISTORY_KEY, type Env } from './collector.ts';

export default {
  async scheduled(_event: unknown, env: Env) {
    // Throw on failure so Cloudflare records it; never overwrite good history.
    await collectWatchlist(env);
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname !== '/watchlist.svg') return new Response('Not found', { status: 404 });
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
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
