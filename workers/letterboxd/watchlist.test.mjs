import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseDiaryFeed } from '../../src/utils/diary.ts';
import { parseWatchlistCount, recordCount, renderWatchlistSvg } from '../../src/utils/watchlist.ts';
import { recordYearActivity, renderYearActivitySvg } from '../../src/utils/yearActivity.ts';
import worker from './index.ts';
import { collectDiary, collectWatchlist, collectYearlyDiary, DIARY_KEY, HISTORY_KEY, parseYearlyDiaryCount, YEAR_DIARY_KEY } from './collector.ts';
import diarySnapshot from '../../src/data/diarySnapshot.json' with { type: 'json' };
import snapshot from '../../src/data/watchlistSnapshot.json' with { type: 'json' };

const html = (count, heading = count) => `<head><meta content="https://letterboxd.com/giraycoskun/watchlist/" property="og:url"></head><body class="screen-member-child-page watchlist wide"><div class="cols-2 js-watchlist-content" data-num-entries="${count}"><span class="js-watchlist-count">${heading}&nbsp;films</span></div></body>`;
const observation = (date, count = 97) => ({ username: 'giraycoskun', updatedAt: `${date}T06:00:00.000Z`, history: [{ date, count }] });
function storage(value = null, expectedKey = HISTORY_KEY) {
  const writes = [];
  return { writes, WATCHLIST: {
    async get(key) { assert.equal(key, expectedKey); return value; },
    async put(key, json) { assert.equal(key, expectedKey); writes.push(JSON.parse(json)); },
  } };
}

const feedItem = (index, overrides = '') => `<item><link>https://letterboxd.com/giraycoskun/film/film-${index}/</link><letterboxd:watchedDate>2026-10-${17 - index}</letterboxd:watchedDate><letterboxd:filmTitle>Film ${index} &amp; Friends</letterboxd:filmTitle><letterboxd:filmYear>202${index}</letterboxd:filmYear><letterboxd:memberRating>${index + 1}.0</letterboxd:memberRating><description><![CDATA[<p><img src="https://a.ltrbxd.com/resized/film-poster/${index}.jpg?v=test"/></p>]]></description>${overrides}</item>`;
const diaryFeed = (items = Array.from({ length: 4 }, (_, index) => feedItem(index)).join('')) => `<?xml version="1.0"?><rss><channel><link>https://letterboxd.com/giraycoskun/</link>${items}</channel></rss>`;
const yearDiary = (count, year = 2026) => `<html><body class="screen-member-child-page diary films-diary wide" data-owner="giraycoskun"><p>Giray has logged ${count.toLocaleString('en-US')} ${count === 1 ? 'entry' : 'entries'} for films during ${year}.</p><table id="diary-table"><tr class="diary-entry-row"><td><a href="/giraycoskun/diary/films/for/${year}/10/01/">1</a></td></tr></table></body></html>`;

test('extracts verified totals from the current page shape including zero and thousands', () => {
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

test('seeded history has 89 estimates and one observed day, and real observations replace estimates', () => {
  assert.equal(snapshot.history.length, 90);
  assert.equal(snapshot.history.filter(point => point.estimated).length, 89);
  assert.ok(snapshot.history.every(point => point.count === 97));
  assert.equal(snapshot.history[0].date, '2026-07-17');
  const updated = recordCount(snapshot, 98, new Date('2026-10-14T18:00:00Z'));
  assert.deepEqual(updated.history.at(-1), { date: '2026-10-14', count: 98 });
  const svg = renderWatchlistSvg(snapshot, new Date('2026-10-14'));
  assert.doesNotMatch(svg, /backfill/i);
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

test('parses and validates the four latest diary entries', () => {
  const films = parseDiaryFeed(diaryFeed());
  assert.equal(films.length, 4);
  assert.equal(films[0].title, 'Film 0 & Friends');
  assert.equal(films[0].watchedDate, '2026-10-17');
  assert.equal(films[3].rating, 4);
  assert.throws(() => parseDiaryFeed('<rss><channel></channel></rss>'));
  assert.throws(() => parseDiaryFeed(diaryFeed(feedItem(0))));
});

test('diary collector stores only a complete, verified feed', async () => {
  const env = storage(null, DIARY_KEY);
  const result = await collectDiary(env, new Date('2026-10-18T06:00:00Z'), async (url, options) => {
    assert.equal(url, 'https://letterboxd.com/giraycoskun/rss/');
    assert.equal(options.redirect, 'manual');
    return new Response(diaryFeed(), { headers: { 'Content-Type': 'application/rss+xml' } });
  });
  assert.equal(result.updatedAt, '2026-10-18T06:00:00.000Z');
  assert.equal(env.writes.length, 1);
  assert.equal(env.writes[0].films.length, 4);
  await assert.rejects(collectDiary(env, new Date(), async () => new Response(diaryFeed(), { headers: { 'Content-Type': 'text/html' } })));
  assert.equal(env.writes.length, 1);
});

test('yearly diary parser verifies the owner and variable year before accepting totals', () => {
  assert.equal(parseYearlyDiaryCount(yearDiary(123), 2026), 123);
  assert.equal(parseYearlyDiaryCount(yearDiary(1), 2026), 1);
  const empty = `<body class="diary films-diary" data-owner="giraycoskun"><p>Giray hasn’t logged any entries for films during 2026.</p></body>`;
  assert.equal(parseYearlyDiaryCount(empty, 2026), 0);
  const singlePage = `<body class="diary films-diary" data-owner="giraycoskun"><table><tr class="diary-entry-row"><td><a href="/giraycoskun/diary/films/for/2026/10/01/">1</a></td></tr><tr class="diary-entry-row"><td>2</td></tr></table></body>`;
  assert.equal(parseYearlyDiaryCount(singlePage, 2026), 2);
  for (const page of ['<html>Challenge</html>', yearDiary(12).replace('giraycoskun', 'someone'), yearDiary(12, 2025)]) {
    assert.throws(() => parseYearlyDiaryCount(page, 2026));
  }
});

test('yearly diary collector records one observation using the current UTC year', async () => {
  const env = storage(null, YEAR_DIARY_KEY);
  const now = new Date('2026-11-04T06:00:00Z');
  const result = await collectYearlyDiary(env, now, async (url, options) => {
    assert.equal(url, 'https://letterboxd.com/giraycoskun/diary/films/for/2026/');
    assert.equal(options.redirect, 'manual');
    return new Response(yearDiary(123), { headers: { 'Content-Type': 'text/html;charset=utf-8' } });
  });
  assert.equal(result.year, 2026);
  assert.deepEqual(result.history, [{ date: '2026-11-04', count: 123 }]);
  assert.equal(env.writes.length, 1);
});

test('year activity history resets at New Year and renders an accessible cumulative SVG', () => {
  const first = recordYearActivity(null, 'giraycoskun', 12, new Date('2026-12-31T06:00:00Z'));
  const next = recordYearActivity(first, 'giraycoskun', 1, new Date('2027-01-01T06:00:00Z'));
  assert.equal(next.year, 2027);
  assert.deepEqual(next.history, [{ date: '2027-01-01', count: 1 }]);
  const svg = renderYearActivitySvg(next, { title: 'Films watched', unit: 'films watched', accent: '#000', darkAccent: '#fff' }, new Date('2027-01-01'));
  assert.match(svg, /Films watched: 1 films watched in 2027/);
  assert.match(svg, /Jan/);
  assert.doesNotMatch(svg, /NaN|Infinity/);
});

test('SVG connects observations across missing days, labels every y-axis value and handles single, flat and stale history', () => {
  const data = observation('2026-10-10', 96);
  data.history.push({ date: '2026-10-11', count: 97 }, { date: '2026-10-14', count: 99 });
  const svg = renderWatchlistSvg(data, new Date('2026-10-14'));
  const path = svg.match(/<path d="([^"]*)"/)[1];
  assert.equal((path.match(/M/g) ?? []).length, 1);
  assert.equal((path.match(/L/g) ?? []).length, 2);
  assert.doesNotMatch(svg, /[+-]\d+ since/);
  assert.deepEqual([...svg.matchAll(/class="muted y-tick" font-size="14">(\d+)<\/text>/g)].map(match => Number(match[1])), [94, 95, 96, 97, 98, 99, 100, 101]);
  assert.match(svg, /Last successful update/);
  assert.match(renderWatchlistSvg(observation('2026-10-14'), new Date('2026-10-14')), /r="4"/);
  assert.match(renderWatchlistSvg(observation('2025-10-14'), new Date('2026-10-14')), /No recent observations/);
  const flat = observation('2026-10-13');
  flat.history.push({ date: '2026-10-14', count: 97 });
  assert.doesNotMatch(renderWatchlistSvg(flat, new Date('2026-10-14')), /NaN|Infinity/);
});

test('SVG grows with y-axis labels and keeps wide ranges readable', () => {
  const now = new Date('2026-10-14');
  const flat = renderWatchlistSvg(observation('2026-10-14', 97), now);
  const data = observation('2026-10-10', 96);
  data.history.push({ date: '2026-10-14', count: 99 });
  const growing = renderWatchlistSvg(data, now);
  const height = svg => Number(svg.match(/viewBox="0 0 480 (\d+)"/)[1]);
  assert.ok(height(growing) > height(flat));

  for (const count of [99, 9999, 1000000]) {
    data.history[1].count = count;
    const svg = renderWatchlistSvg(data, now);
    const ticks = [...svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)" text-anchor="end" class="muted y-tick" font-size="14">(\d+)<\/text>/g)];
    assert.ok(ticks.length >= 2 && ticks.length <= 10);
    for (let index = 1; index < ticks.length; index++) {
      assert.ok(Number(ticks[index - 1][2]) - Number(ticks[index][2]) >= 28);
    }
    for (const tick of ticks) {
      assert.ok(Number(tick[1]) - tick[3].length * 9 >= 24, 'labels fit inside the SVG');
    }
    assert.doesNotMatch(svg, /NaN|Infinity/);
  }
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

test('public diary endpoint serves JSON with CORS and a checked-in fallback', async () => {
  const env = storage(null, DIARY_KEY);
  const response = await worker.fetch(new Request('https://worker.test/diary.json'), env);
  assert.equal(response.headers.get('Content-Type'), 'application/json; charset=utf-8');
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), '*');
  assert.deepEqual(await response.json(), diarySnapshot);
  assert.equal(await (await worker.fetch(new Request('https://worker.test/diary.json', { method: 'HEAD' }), env)).text(), '');
});

test('public yearly diary endpoint serves an SVG fallback and HEAD', async () => {
  const env = storage(null, YEAR_DIARY_KEY);
  const response = await worker.fetch(new Request('https://worker.test/watched-this-year.svg'), env);
  assert.equal(response.headers.get('Content-Type'), 'image/svg+xml; charset=utf-8');
  assert.match(await response.text(), /Awaiting first observation/);
  assert.equal(await (await worker.fetch(new Request('https://worker.test/watched-this-year.svg', { method: 'HEAD' }), env)).text(), '');
});
