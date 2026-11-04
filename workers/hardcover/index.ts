import { emptyYearActivity, renderYearActivitySvg, type YearActivityHistory } from '../../src/utils/yearActivity.ts';
import { BOOKS_KEY, collectReadingSnapshot, type Env, type HardcoverBooks, YEAR_READS_KEY } from './collector.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
      'X-Content-Type-Options': 'nosniff',
      ...corsHeaders,
      ...init.headers,
    },
  });
}

export default {
  async scheduled(_event: unknown, env: Env) {
    // Keep the previous successful value if Hardcover is temporarily unavailable.
    await collectReadingSnapshot(env);
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return jsonResponse({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'GET, HEAD, OPTIONS' } });
    }

    const pathname = new URL(request.url).pathname;
    const booksPath = '/api/books/currently-reading/giraycoskun';
    const yearPath = '/api/books/read-this-year/giraycoskun.svg';
    if (pathname !== booksPath && pathname !== yearPath) {
      return jsonResponse({ error: 'Not found' }, { status: 404 });
    }

    if (pathname === yearPath) {
      const stored = await env.HARDCOVER_BOOKS.get<YearActivityHistory>(YEAR_READS_KEY, 'json');
      const now = new Date();
      const current = stored?.year === now.getUTCFullYear() ? stored : emptyYearActivity('giraycoskun', now);
      const svg = renderYearActivitySvg(current, {
        title: 'Hardcover books read this year',
        unit: 'books read',
        accent: '#7c3aed',
        darkAccent: '#a78bfa',
        snapshot: current !== stored,
      }, now);
      return new Response(request.method === 'HEAD' ? null : svg, {
        headers: {
          'Content-Type': 'image/svg+xml; charset=utf-8',
          'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
          'X-Content-Type-Options': 'nosniff',
          'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
          ...corsHeaders,
        },
      });
    }

    const books = await env.HARDCOVER_BOOKS.get<HardcoverBooks>(BOOKS_KEY, 'json');
    if (!books) return jsonResponse({ error: 'Books have not been collected yet' }, { status: 503 });
    return new Response(request.method === 'HEAD' ? null : JSON.stringify(books), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
        'X-Content-Type-Options': 'nosniff',
        ...corsHeaders,
      },
    });
  },
};
