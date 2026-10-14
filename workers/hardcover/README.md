# Hardcover Worker

This Worker fetches Giray's currently-reading books from the official Hardcover
GraphQL API once per day and stores the successful result in Workers KV. The
browser only reads the cached JSON; the Hardcover API token never reaches the
client.

## Setup

1. Create a KV namespace and put its ID in `wrangler.jsonc`:

   ```sh
   pnpm exec wrangler kv namespace create HARDCOVER_BOOKS --config workers/hardcover/wrangler.jsonc
   ```

2. Add the Hardcover API token as a Worker secret:

   ```sh
   pnpm exec wrangler secret put HARDCOVER_API_TOKEN --config workers/hardcover/wrangler.jsonc
   ```

3. Deploy the Worker:

   ```sh
   pnpm exec wrangler deploy --config workers/hardcover/wrangler.jsonc
   ```

4. Set `PUBLIC_HARDCOVER_WORKER_URL` in the site build environment to the
   deployed Worker URL, then rebuild the Astro site.

The daily Cron runs at **06:00 UTC**. To test locally:

```sh
pnpm exec wrangler dev --config workers/hardcover/wrangler.jsonc --test-scheduled
curl "http://localhost:8787/cdn-cgi/local/scheduled"
```
