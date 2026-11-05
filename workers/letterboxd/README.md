# Letterboxd card

A separate Cloudflare Worker collects the public watchlist total, the four latest
diary entries, and the current UTC year's diary total every day at **06:00 UTC**.
The Astro homepage embeds its `/watchlist.svg` and `/watched-this-year.svg` charts
and fetches `/diary.json` to refresh the checked-in diary snapshot. No React, chart
package, or daily Pages build is needed.

The deployed chart is at
<https://giraycoskun-letterboxd.giraycoskun-dev.workers.dev/watchlist.svg>.
The diary snapshot is at the same origin under `/diary.json`.
The annual activity graph is at the same origin under `/watched-this-year.svg`.
Completed years are retained under `/watched-in/{year}.svg` for the gallery.
The `giraycoskun-com` Pages project has `PUBLIC_LETTERBOXD_WORKER_URL` set for
production and preview builds. Pushing `main` deploys the production site.

## Data and limits

- The `watchlist:giraycoskun:v1` KV key holds the last successful update and
  `{ date: "YYYY-MM-DD", count: number }` observations.
- The `diary:giraycoskun:v1` key holds four entries parsed from the public
  Letterboxd RSS feed: title, year, watched date, rating, link, and poster URL.
- The `diary-year:giraycoskun:v1` key holds cumulative calendar-week snapshots for
  the current year. The collector derives the year from its run date, follows every
  page of Letterboxd's matching `/diary/films/for/{year}/` diary, and rebuilds the
  history from each entry's watched date.
- At most one annual-activity point per calendar week; a rerun replaces the current week's point.
- Watchlist collection retains the latest **365 calendar days** (at most 365
  points). Its chart shows the last **90 calendar days**, with gaps for missed days.
- A failed fetch, non-HTML response, wrong profile, missing total, or conflicting
  total throws without writing. The existing observation and its timestamp remain.
  Pruning occurs on the next successful collection, so outages preserve good data.
- Collection begins with the verified **97-film snapshot from 2026-10-14**.
  At the owner's request, the preceding 89 days (starting 2026-07-17) are filled
  with the same count and marked `estimated: true`. The chart uses a dashed line
  while estimates are visible. Actual observations override estimates; gaps after
  setup stay empty.
- Annual histories reset automatically on January 1. A new installation backfills
  January through today from the public diary's dated entries on its first successful
  collection, so missed scheduled runs do not leave gaps or fabricate observations.
- Before the first collection of a new year, the completed prior year is copied to
  a permanent archive key. The gallery discovers completed years in the browser and
  adds both yearly activity plots without requiring another site build.
- HTTP reads never scrape Letterboxd or write KV. SVG and JSON responses are
  browser-cacheable for one hour. The JSON endpoint allows cross-origin reads and
  exposes only already-public diary data. No public collection endpoint exists.
- Dated bundled watchlist and recent-diary snapshots are used if KV is empty or
  unavailable. The watchlist chart is explicitly labeled “Snapshot”; live data
  over 48 hours old says “Last successful update.” The annual graph displays an
  awaiting-data state until its first successful collection.
- Keep this on **Workers Free**: two fixed collection requests plus the current
  year's paginated diary requests, and at most three KV writes per day,
  plus chart traffic. Free quotas are shared with your other Workers: 100,000 Worker
  requests/day; KV 100,000 reads/day, 1,000 writes/day, 1 GB storage. Quota exhaustion
  can make the widget unavailable. Do not enable a paid plan for this feature.

Sources: [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/),
[KV pricing](https://developers.cloudflare.com/kv/platform/pricing/),
[Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/).

## Local development

Use Node **22.23.4+ or 24+** for the native TypeScript tests and Wrangler, and run from
the repository root:

```sh
pnpm install
pnpm watchlist:check
pnpm watchlist:dev
```

The checked-in binding has `remote: true`, so local scheduled runs write to the
production KV namespace. Set `remote: false` in your local configuration to use
isolated local KV instead.
In another terminal, trigger the local scheduled handler and inspect all responses:

```sh
curl 'http://localhost:8787/__scheduled?cron=0+6+*+*+*'
curl -f http://localhost:8787/watchlist.svg
curl -f http://localhost:8787/diary.json
curl -f http://localhost:8787/watched-this-year.svg
```

To seed the production annual history immediately from all current-year diary
pages, run the Worker on Cloudflare's network (which is less likely to receive the
Letterboxd challenge shown to command-line clients) and trigger it once:

```sh
pnpm exec wrangler dev --remote --config workers/letterboxd/wrangler.jsonc --test-scheduled
curl 'http://localhost:8787/__scheduled?cron=0+6+*+*+*'
```

This is a real production-KV write because the binding is remote. Stop the dev
process after the scheduled request completes.

To preview the live widget, set `PUBLIC_LETTERBOXD_WORKER_URL=http://localhost:8787`
in the root `.env`, then run `pnpm dev`. Without that variable, Astro generates a
static SVG from [the verified snapshot](../../src/data/watchlistSnapshot.json).
The card also renders [the dated diary snapshot](../../src/data/diarySnapshot.json),
while the annual graph displays an awaiting-data state. These still work in local
development and Pages previews before Worker setup.

## Deploy on the free tier

The Worker is deployed separately; the existing Cloudflare Pages build remains `pnpm build`.

1. Authenticate with `pnpm exec wrangler login` and confirm the selected account uses
   **Workers Free**. No Letterboxd credentials are required.
2. The existing namespace is already configured in [wrangler.jsonc](./wrangler.jsonc).
   For a new account only, run `pnpm watchlist:kv:create` and replace its namespace ID.
3. Run `pnpm watchlist:deploy`. This installs the daily Cron Trigger and prints the
   Worker's `https://giraycoskun-letterboxd.<subdomain>.workers.dev` URL.
4. Open `<worker-url>/watchlist.svg`, `<worker-url>/diary.json`, and
   `<worker-url>/watched-this-year.svg`. Until the first successful scheduled run,
   the existing endpoints return bundled snapshots and the annual graph shows an
   awaiting-data state. Check Cron Trigger
   events/logs after the first run: fetching from a local machine does not prove
   Letterboxd accepts Cloudflare IPs.
5. In **Cloudflare Pages → Settings → Variables and Secrets**, add the public build
   variable `PUBLIC_LETTERBOXD_WORKER_URL` with the Worker origin (no path). Redeploy
   Pages once to activate the live image. Add it to preview builds too if desired.

Subsequent watchlist and diary updates appear without rebuilding Pages. The Worker
URL is public and is not a secret. Browser dark-mode preferences also apply inside
the SVG.

If Letterboxd blocks the deployed collector, keep the dated snapshot and inspect the
scheduled error. Do not treat a challenge page as an empty watchlist. The parser
requires the canonical profile URL and both the watchlist container total and visible
heading total to agree; the diary collector requires four complete RSS entries.
Markup changes may require updating a parser. Check changes with `pnpm watchlist:check`
and `pnpm build`; bundle-check with:

```sh
pnpm exec wrangler deploy --dry-run --config workers/letterboxd/wrangler.jsonc
```
