import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker from './index.ts';
import { archiveCompletedReadingYear, BOOKS_KEY, collectReadingSnapshot, YEAR_READS_KEY, yearReadsArchiveKey } from './collector.ts';

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

test('collector fetches current books and seeds this-year weekly history in one year-aware GraphQL request', async () => {
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
      user_books_aggregate: { aggregate: { count: 2 } },
      yearly_books: [
        { user_book_reads: [{ finished_at: '2026-01-02' }] },
        { user_book_reads: [{ finished_at: '2026-10-31' }] },
      ],
    } });
  });
  assert.equal(result.books.count, 1);
  assert.equal(result.yearlyReads.history.length, 45);
  assert.deepEqual(result.yearlyReads.history[0], { date: '2026-01-04', count: 1 });
  assert.deepEqual(result.yearlyReads.history.at(-1), { date: '2026-11-04', count: 2 });
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

test('completed Hardcover years are archived and served from a permanent gallery endpoint', async () => {
  const completed = {
    username: 'giraycoskun',
    year: 2026,
    updatedAt: '2026-12-31T06:00:00.000Z',
    history: [{ date: '2026-12-31', count: 52 }],
  };
  const env = storage({ [YEAR_READS_KEY]: completed });
  assert.deepEqual(await archiveCompletedReadingYear(env, new Date('2027-01-01T06:00:00Z')), completed);
  assert.equal(env.writes[0][0], yearReadsArchiveKey(2026));

  const response = await worker.fetch(new Request('https://worker.test/api/books/read-in/2026/giraycoskun.svg'), env);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Hardcover books read in 2026: 52 books read in 2026/);
});
