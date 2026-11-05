import { emptyYearActivity, renderYearActivitySvg, type YearActivityHistory } from '../../src/utils/yearActivity.ts';
import { archiveCompletedReadingYear, BOOKS_KEY, collectReadingSnapshot, type Env, type HardcoverBooks, YEAR_READS_KEY, yearReadsArchiveKey } from './collector.ts';

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
    // Preserve the completed prior year before the current-year key is replaced.
    await archiveCompletedReadingYear(env);
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
    const archiveMatch = pathname.match(/^\/api\/books\/read-in\/(\d{4})\/giraycoskun\.svg$/);
    if (pathname !== booksPath && pathname !== yearPath && !archiveMatch) {
      return jsonResponse({ error: 'Not found' }, { status: 404 });
    }

    if (pathname === yearPath || archiveMatch) {
      const now = new Date();
      const archivedYear = archiveMatch ? Number(archiveMatch[1]) : null;
      const stored = archivedYear === null
        ? await env.HARDCOVER_BOOKS.get<YearActivityHistory>(YEAR_READS_KEY, 'json')
        : await env.HARDCOVER_BOOKS.get<YearActivityHistory>(yearReadsArchiveKey(archivedYear), 'json')
          ?? await env.HARDCOVER_BOOKS.get<YearActivityHistory>(YEAR_READS_KEY, 'json');
      if (archivedYear !== null && stored?.year !== archivedYear) {
        return jsonResponse({ error: 'Archived year not found' }, { status: 404 });
      }
      const activity = archivedYear === null && stored?.year !== now.getUTCFullYear()
        ? emptyYearActivity('giraycoskun', now)
        : stored!;
      const svg = renderYearActivitySvg(activity, {
        title: archivedYear === null ? 'Hardcover books read this year' : `Hardcover books read in ${archivedYear}`,
        unit: 'books read',
        accent: '#7c3aed',
        darkAccent: '#a78bfa',
        snapshot: archivedYear === null && activity !== stored,
        archived: archivedYear !== null,
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
