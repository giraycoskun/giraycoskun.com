import snapshot from '../../src/data/watchlistSnapshot.json' with { type: 'json' };
import diarySnapshot from '../../src/data/diarySnapshot.json' with { type: 'json' };
import type { DiarySnapshot } from '../../src/utils/diary.ts';
import { renderWatchlistSvg, type WatchlistHistory } from '../../src/utils/watchlist.ts';
import { emptyYearActivity, renderYearActivitySvg, type YearActivityHistory } from '../../src/utils/yearActivity.ts';
import { archiveCompletedDiaryYear, collectDiary, collectWatchlist, collectYearlyDiary, DIARY_KEY, HISTORY_KEY, type Env, YEAR_DIARY_KEY, yearDiaryArchiveKey } from './collector.ts';

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=3600',
  'Access-Control-Allow-Origin': '*',
  'X-Content-Type-Options': 'nosniff',
};

export default {
  async scheduled(_event: unknown, env: Env) {
    // Preserve the completed prior year before the current-year key is replaced.
    await archiveCompletedDiaryYear(env);
    // Run independently so a temporary failure in one source does not prevent the other update.
    const results = await Promise.allSettled([collectWatchlist(env), collectDiary(env), collectYearlyDiary(env)]);
    const failures = results.filter(result => result.status === 'rejected');
    if (failures.length) throw new AggregateError(failures.map(result => result.reason), 'One or more Letterboxd collections failed');
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    const path = new URL(request.url).pathname;
    const archiveMatch = path.match(/^\/watched-in\/(\d{4})\.svg$/);
    if (path !== '/watchlist.svg' && path !== '/diary.json' && path !== '/watched-this-year.svg' && !archiveMatch) {
      return new Response('Not found', { status: 404 });
    }
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
    if (path === '/watched-this-year.svg' || archiveMatch) {
      const now = new Date();
      try {
        const archivedYear = archiveMatch ? Number(archiveMatch[1]) : null;
        const stored = archivedYear === null
          ? await env.WATCHLIST.get<YearActivityHistory>(YEAR_DIARY_KEY, 'json')
          : await env.WATCHLIST.get<YearActivityHistory>(yearDiaryArchiveKey(archivedYear), 'json')
            ?? await env.WATCHLIST.get<YearActivityHistory>(YEAR_DIARY_KEY, 'json');
        if (archivedYear !== null && stored?.year !== archivedYear) {
          return new Response('Archived year not found', { status: 404 });
        }
        const activity = archivedYear === null && stored?.year !== now.getUTCFullYear()
          ? emptyYearActivity('giraycoskun', now)
          : stored!;
        const svg = renderYearActivitySvg(activity, {
          title: archivedYear === null ? 'Letterboxd films watched this year' : `Letterboxd films watched in ${archivedYear}`,
          unit: 'films watched',
          accent: '#047857',
          darkAccent: '#34d399',
          snapshot: archivedYear === null && activity !== stored,
          archived: archivedYear !== null,
        }, now);
        return new Response(request.method === 'HEAD' ? null : svg, {
          headers: {
            'Content-Type': 'image/svg+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'X-Content-Type-Options': 'nosniff',
            'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
          },
        });
      } catch (error) {
        console.error('Unable to read yearly diary history', error);
        if (archiveMatch) return new Response('Unable to read archived year', { status: 503 });
        return new Response(request.method === 'HEAD' ? null : renderYearActivitySvg(emptyYearActivity('giraycoskun', now), {
          title: 'Letterboxd films watched this year', unit: 'films watched', accent: '#047857', darkAccent: '#34d399', snapshot: true,
        }, now), { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'no-store' } });
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
