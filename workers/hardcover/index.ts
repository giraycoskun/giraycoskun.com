import { BOOKS_KEY, collectCurrentlyReading, type Env, type HardcoverBooks } from './collector.ts';

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
    await collectCurrentlyReading(env);
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return jsonResponse({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'GET, HEAD, OPTIONS' } });
    }

    const pathname = new URL(request.url).pathname;
    if (pathname !== '/api/books/currently-reading/giraycoskun') {
      return jsonResponse({ error: 'Not found' }, { status: 404 });
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
