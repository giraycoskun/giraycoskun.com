import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker from './index.ts';
import { BOOKS_KEY, collectReadingSnapshot, YEAR_READS_KEY } from './collector.ts';

function storage(initial = {}) {
  const values = new Map(Object.entries(initial));
  const writes = [];
  return {
    writes,
    HARDCOVER_API_TOKEN: 'test-token',
    HARDCOVER_BOOKS: {
      async get(key) { return values.get(key) ?? null; },
      async put(key, value) { const parsed = JSON.parse(value); values.set(key, parsed); writes.push([key, parsed]); },
    },
  };
}

test('collector fetches current books and this-year reads in one year-aware GraphQL request', async () => {
  const env = storage();
  const now = new Date('2026-11-04T06:00:00Z');
  const result = await collectReadingSnapshot(env, now, async (url, options) => {
    assert.equal(url, 'https://api.hardcover.app/v1/graphql');
    assert.equal(options.headers.Authorization, 'Bearer test-token');
    const body = JSON.parse(options.body);
    assert.deepEqual(body.variables, { username: 'giraycoskun', yearStart: '2026-01-01', nextYearStart: '2027-01-01' });
    assert.match(body.query, /user_book_reads: \{ finished_at:/);
    return Response.json({ data: {
      user_books: [{ book: { title: 'Book', slug: 'book', image: null } }],
      user_books_aggregate: { aggregate: { count: 7 } },
    } });
  });
  assert.equal(result.books.count, 1);
  assert.deepEqual(result.yearlyReads.history, [{ date: '2026-11-04', count: 7 }]);
  assert.deepEqual(env.writes.map(([key]) => key), [BOOKS_KEY, YEAR_READS_KEY]);
});

test('collector rejects an invalid yearly count without replacing cached data', async () => {
  const env = storage();
  await assert.rejects(collectReadingSnapshot(env, new Date('2026-11-04'), async () => Response.json({ data: {
    user_books: [], user_books_aggregate: { aggregate: { count: null } },
  } })));
  assert.equal(env.writes.length, 0);
});

test('worker serves the yearly Hardcover SVG and supports HEAD', async () => {
  const env = storage();
  const response = await worker.fetch(new Request('https://worker.test/api/books/read-this-year/giraycoskun.svg'), env);
  assert.equal(response.headers.get('Content-Type'), 'image/svg+xml; charset=utf-8');
  assert.match(await response.text(), /Awaiting first observation/);
  const head = await worker.fetch(new Request('https://worker.test/api/books/read-this-year/giraycoskun.svg', { method: 'HEAD' }), env);
  assert.equal(await head.text(), '');
});
