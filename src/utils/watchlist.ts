export interface WatchlistPoint {
  date: string;
  count: number;
  estimated?: boolean;
}

export interface WatchlistHistory {
  username: string;
  updatedAt: string;
  history: WatchlistPoint[];
}

export const WATCHLIST_USERNAME = 'giraycoskun';
export const WATCHLIST_URL = `https://letterboxd.com/${WATCHLIST_USERNAME}/watchlist/`;
export const LETTERBOXD_PROFILE_URL = `https://letterboxd.com/${WATCHLIST_USERNAME}/`;
export const HISTORY_DAYS = 365;
const DAY_MS = 86_400_000;

/** Only accept the total on the owner's unfiltered watchlist, never poster counts. */
export function parseWatchlistCount(html: string): number {
  if (!new RegExp(`<body\\b[^>]*data-owner=["']${WATCHLIST_USERNAME}["']`, 'i').test(html)) {
    throw new Error('Letterboxd did not return the expected public watchlist');
  }
  const container = html.match(/<div\b(?=[^>]*\bclass=["'][^"']*\bjs-watchlist-content\b[^"']*["'])[^>]*\bdata-num-entries=["'](\d+)["'][^>]*>/i);
  const heading = html.match(/<span\b[^>]*\bclass=["'][^"']*\bjs-watchlist-count\b[^"']*["'][^>]*>\s*([\d,]+)(?:&nbsp;|\s)+films?\s*<\/span>/i);
  if (!container || !heading) throw new Error('Watchlist total missing; refusing to record zero');
  const count = Number(container[1]);
  if (!Number.isSafeInteger(count) || count < 0 || count !== Number(heading[1].replaceAll(',', ''))) {
    throw new Error('Watchlist totals are invalid or disagree');
  }
  return count;
}

export function recordCount(previous: WatchlistHistory, count: number, now: Date): WatchlistHistory {
  if (!Number.isSafeInteger(count) || count < 0) throw new Error('Invalid watchlist count');
  const date = now.toISOString().slice(0, 10);
  const cutoff = new Date(Date.parse(date) - (HISTORY_DAYS - 1) * DAY_MS).toISOString().slice(0, 10);
  const points = new Map(previous.history
    .filter(point => point.date >= cutoff && point.date <= date)
    .map(point => [point.date, point]));
  points.set(date, { date, count });
  return {
    username: WATCHLIST_USERNAME,
    updatedAt: now.toISOString(),
    history: [...points.values()].sort((a, b) => a.date.localeCompare(b.date)).slice(-HISTORY_DAYS),
  };
}

const escapeXml = (value: string) => value.replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
}[char]!));

/** Small SVG shared by the build-time snapshot and the live Worker. */
export function renderWatchlistSvg(data: WatchlistHistory, now = new Date(), snapshot = false): string {
  const end = Date.parse(now.toISOString().slice(0, 10));
  const start = end - 89 * DAY_MS;
  const points = data.history.filter(point => Date.parse(point.date) >= start && Date.parse(point.date) <= end);
  const latest = data.history.at(-1);
  const count = latest?.count.toLocaleString('en-US') ?? '—';
  const values = points.map(point => point.count);
  const minimum = Math.max(0, Math.min(...values, latest?.count ?? 0) - 2);
  const maximum = Math.max(...values, latest?.count ?? 0) + 2;
  const x = (date: string) => 48 + ((Date.parse(date) - start) / (89 * DAY_MS)) * 408;
  const y = (value: number) => 208 - ((value - minimum) / (maximum - minimum)) * 96;
  // Move instead of drawing across missing observations.
  const path = points.map((point, i) => {
    const consecutive = i > 0 && Date.parse(point.date) - Date.parse(points[i - 1].date) === DAY_MS;
    return `${consecutive ? 'L' : 'M'}${x(point.date).toFixed(2)},${y(point.count).toFixed(2)}`;
  }).join(' ');
  const dateLabel = (ms: number) => new Date(ms).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const stale = now.getTime() - Date.parse(data.updatedAt) > 2 * DAY_MS;
  const hasBackfill = points.some(point => point.estimated);
  const status = snapshot ? 'Snapshot' : stale ? 'Last successful update' : 'Updated';
  const updated = `${status}: ${data.updatedAt.slice(0, 10)}`;
  const description = `${count} films to watch. ${updated}. Last 90 days; gaps mean missing observations.`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 280" role="img" aria-labelledby="title description">
  <title id="title">Letterboxd watchlist: ${count} films</title>
  <desc id="description">${escapeXml(description)}</desc>
  <style>
    :root { color-scheme: light dark; }
    text { font-family: system-ui, sans-serif; fill: #111827; }
    .muted { fill: #4b5563; } .grid { stroke: #d1d5db; } .line { stroke: #047857; } .dot { fill: #047857; }
    @media (prefers-color-scheme: dark) { text { fill: #f3f4f6; } .muted { fill: #d1d5db; } .grid { stroke: #4b5563; } .line { stroke: #34d399; } .dot { fill: #34d399; } }
  </style>
  <text x="24" y="43" font-size="40" font-weight="700">${count}<tspan dx="10" font-size="18" font-weight="400" class="muted">films</tspan></text>
  <text x="456" y="39" text-anchor="end" font-size="16" class="muted">90 days</text>
  ${[minimum, maximum].map(value => `<line x1="48" x2="456" y1="${y(value)}" y2="${y(value)}" class="grid" stroke-dasharray="3 5"/><text x="38" y="${y(value) + 5}" text-anchor="end" class="muted" font-size="14">${value}</text>`).join('')}
  <path d="${path}" fill="none" class="line" stroke-width="2.5" stroke-dasharray="${hasBackfill ? '5 4' : 'none'}" stroke-linecap="round" stroke-linejoin="round"/>
  ${points.filter(point => !point.estimated).map(point => `<circle cx="${x(point.date).toFixed(2)}" cy="${y(point.count).toFixed(2)}" r="${points.length === 1 ? 4 : 2}" class="dot"><title>${point.date}: ${point.count} films</title></circle>`).join('')}
  ${points.length === 0 ? '<text x="252" y="153" text-anchor="middle" class="muted" font-size="16">No recent observations</text>' : ''}
  <text x="48" y="233" class="muted" font-size="16">${dateLabel(start)}</text>
  <text x="456" y="233" text-anchor="end" class="muted" font-size="16">${dateLabel(end)}</text>
  <text x="24" y="266" class="muted" font-size="16">${escapeXml(updated)}</text>
</svg>`;
}
