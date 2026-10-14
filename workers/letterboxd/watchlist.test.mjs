import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseWatchlistCount, recordCount, renderWatchlistSvg } from '../../src/utils/watchlist.ts';
import worker from './index.ts';
import { collectWatchlist, HISTORY_KEY } from './collector.ts';
import snapshot from '../../src/data/watchlistSnapshot.json' with { type: 'json' };

const html = (count, heading = count) => `<body data-owner="giraycoskun"><div class="cols-2 js-watchlist-content" data-num-entries="${count}"><span class="js-watchlist-count">${heading}&nbsp;films</span></div></body>`;
const observation = (date, count = 97) => ({ username: 'giraycoskun', updatedAt: `${date}T06:00:00.000Z`, history: [{ date, count }] });
function storage(value = null) {
  const writes = [];
  return { writes, WATCHLIST: {
    async get(key) { assert.equal(key, HISTORY_KEY); return value; },
    async put(key, json) { assert.equal(key, HISTORY_KEY); writes.push(JSON.parse(json)); },
  } };
}

test('extracts verified totals including zero and thousands, ignoring poster counts', () => {
  assert.equal(parseWatchlistCount(html(97)), 97);
  assert.equal(parseWatchlistCount(html(1234, '1,234')), 1234);
  assert.equal(parseWatchlistCount(html(0)), 0);
});

test('rejects challenges, wrong profiles, missing totals and conflicting totals', () => {
  for (const page of ['<html>Challenge</html>', html(97).replace('giraycoskun', 'another-user'), html(97).replace('js-watchlist-count', 'poster-count'), html(97, 96)]) {
    assert.throws(() => parseWatchlistCount(page));
  }
});

test('replaces the same UTC day and keeps precisely the last 365 calendar days', () => {
  const previous = observation('2025-10-14');
  previous.history.push({ date: '2025-10-15', count: 90 }, { date: '2026-10-14', count: 96 });
  const next = recordCount(previous, 97, new Date('2026-10-14T12:00:00Z'));
  assert.deepEqual(next.history, [{ date: '2025-10-15', count: 90 }, { date: '2026-10-14', count: 97 }]);
  assert.equal(next.updatedAt, '2026-10-14T12:00:00.000Z');
  assert.equal(previous.history.length, 3);
  const full = { ...previous, history: Array.from({ length: 400 }, (_, i) => ({ date: new Date(Date.UTC(2026, 9, 14 - i)).toISOString().slice(0, 10), count: 97 })) };
  assert.equal(recordCount(full, 98, new Date('2026-10-14')).history.length, 365);
});

test('collector writes one observation only after a successful verified fetch', async () => {
  const env = storage(observation('2026-10-13', 96));
  const result = await collectWatchlist(env, new Date('2026-10-14T06:00:00Z'), async (url, options) => {
    assert.equal(url, 'https://letterboxd.com/giraycoskun/watchlist/');
    assert.equal(options.redirect, 'manual');
    return new Response(html(97), { headers: { 'Content-Type': 'text/html;charset=utf-8' } });
  });
  assert.equal(env.writes.length, 1);
  assert.deepEqual(result.history.slice(-2), [{ date: '2026-10-13', count: 96 }, { date: '2026-10-14', count: 97 }]);
  assert.equal(result.history.length, 90);
  assert.equal(result.history[0].estimated, true);
});

test('backfill has 89 estimated days and one observed day, and real observations replace estimates', () => {
  assert.equal(snapshot.history.length, 90);
  assert.equal(snapshot.history.filter(point => point.estimated).length, 89);
  assert.ok(snapshot.history.every(point => point.count === 97));
  assert.equal(snapshot.history[0].date, '2026-07-17');
  const updated = recordCount(snapshot, 98, new Date('2026-10-14T18:00:00Z'));
  assert.deepEqual(updated.history.at(-1), { date: '2026-10-14', count: 98 });
  const svg = renderWatchlistSvg(snapshot, new Date('2026-10-14'));
  assert.match(svg, /backfilled/);
  assert.match(svg, /stroke-dasharray="5 4"/);
});

test('blocked, malformed and timed-out fetches leave history untouched', async () => {
  const env = storage(observation('2026-10-13'));
  for (const response of [new Response(null, { status: 302, headers: { Location: '/login/' } }), new Response('blocked', { status: 403 }), new Response('Challenge', { headers: { 'Content-Type': 'text/html' } }), new Response(html(97), { headers: { 'Content-Type': 'application/json' } })]) {
    await assert.rejects(collectWatchlist(env, new Date(), async () => response));
  }
  await assert.rejects(collectWatchlist(env, new Date(), async () => { throw new Error('timeout'); }));
  assert.equal(env.writes.length, 0);
});

test('SVG preserves gaps, shows real change and handles single, flat and stale history', () => {
  const data = observation('2026-10-10', 96);
  data.history.push({ date: '2026-10-11', count: 97 }, { date: '2026-10-14', count: 99 });
  const svg = renderWatchlistSvg(data, new Date('2026-10-14'));
  const path = svg.match(/<path d="([^"]*)"/)[1];
  assert.equal((path.match(/M/g) ?? []).length, 2);
  assert.equal((path.match(/L/g) ?? []).length, 1);
  assert.match(svg, /\+3 since 2026-10-10/);
  assert.match(svg, /Last successful update/);
  assert.match(renderWatchlistSvg(observation('2026-10-14'), new Date('2026-10-14')), /r="4"/);
  assert.match(renderWatchlistSvg(observation('2025-10-14'), new Date('2026-10-14')), /No recent observations/);
  const flat = observation('2026-10-13');
  flat.history.push({ date: '2026-10-14', count: 97 });
  assert.doesNotMatch(renderWatchlistSvg(flat, new Date('2026-10-14')), /NaN|Infinity/);
});

test('public handler serves SVG and HEAD, rejects writes, and falls back when uninitialized', async () => {
  const env = storage();
  const response = await worker.fetch(new Request('https://worker.test/watchlist.svg'), env);
  assert.equal(response.headers.get('Content-Type'), 'image/svg+xml; charset=utf-8');
  assert.match(await response.text(), /Snapshot: 2026-10-14/);
  assert.equal((await worker.fetch(new Request('https://worker.test/watchlist.svg', { method: 'POST' }), env)).status, 405);
  assert.equal((await worker.fetch(new Request('https://worker.test/unknown'), env)).status, 404);
  assert.equal(await (await worker.fetch(new Request('https://worker.test/watchlist.svg', { method: 'HEAD' }), env)).text(), '');
  assert.equal(env.writes.length, 0);
});
