export interface YearActivityPoint {
  date: string;
  count: number;
}

export interface YearActivityHistory {
  username: string;
  year: number;
  updatedAt: string;
  history: YearActivityPoint[];
}

const DAY_MS = 86_400_000;

export function emptyYearActivity(username: string, now = new Date()): YearActivityHistory {
  return {
    username,
    year: now.getUTCFullYear(),
    updatedAt: now.toISOString(),
    history: [],
  };
}

export function recordYearActivity(
  previous: YearActivityHistory | null,
  username: string,
  count: number,
  now = new Date(),
): YearActivityHistory {
  if (!Number.isSafeInteger(count) || count < 0) throw new Error('Invalid yearly activity count');
  const date = now.toISOString().slice(0, 10);
  const year = now.getUTCFullYear();
  const start = `${year}-01-01`;
  const points = new Map((previous?.year === year ? previous.history : [])
    .filter(point => point.date >= start && point.date <= date)
    .map(point => [point.date, point]));
  points.set(date, { date, count });
  return {
    username,
    year,
    updatedAt: now.toISOString(),
    history: [...points.values()].sort((a, b) => a.date.localeCompare(b.date)),
  };
}

const escapeXml = (value: string) => value.replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
}[char]!));

interface YearActivitySvgOptions {
  title: string;
  unit: string;
  accent: string;
  darkAccent: string;
  snapshot?: boolean;
}

/** Render a cumulative count chart across the calendar year. */
export function renderYearActivitySvg(
  data: YearActivityHistory,
  options: YearActivitySvgOptions,
  now = new Date(),
): string {
  const year = data.year;
  const start = Date.UTC(year, 0, 1);
  const end = Date.UTC(year + 1, 0, 1) - DAY_MS;
  const today = Math.min(Math.max(Date.parse(now.toISOString().slice(0, 10)), start), end);
  const points = data.history.filter(point => {
    const time = Date.parse(point.date);
    return Number.isFinite(time) && time >= start && time <= today && Number.isSafeInteger(point.count) && point.count >= 0;
  });
  const latest = points.at(-1);
  const count = latest ? latest.count.toLocaleString('en-US') : '—';
  const maximumValue = Math.max(1, ...points.map(point => point.count));
  const roughStep = maximumValue / 4;
  const magnitude = 10 ** Math.floor(Math.log10(Math.max(1, roughStep)));
  const step = [1, 2, 5, 10].find(value => value * magnitude >= roughStep)! * magnitude;
  const maximum = Math.max(step, Math.ceil(maximumValue / step) * step);
  const ticks = Array.from({ length: Math.round(maximum / step) + 1 }, (_, index) => index * step);
  const plotLeft = Math.max(48, String(maximum).length * 9 + 32);
  const plotRight = 616;
  const plotTop = 92;
  const plotBottom = 244;
  const width = plotRight - plotLeft;
  const x = (date: string) => plotLeft + ((Date.parse(date) - start) / (end - start)) * width;
  const y = (value: number) => plotBottom - (value / maximum) * (plotBottom - plotTop);
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${x(point.date).toFixed(2)},${y(point.count).toFixed(2)}`).join(' ');
  const xTicks = [
    { time: Date.UTC(year, 0, 1), label: 'Jan', anchor: 'start' },
    { time: Date.UTC(year, 3, 1), label: 'Apr', anchor: 'middle' },
    { time: Date.UTC(year, 6, 1), label: 'Jul', anchor: 'middle' },
    { time: Date.UTC(year, 9, 1), label: 'Oct', anchor: 'middle' },
    { time: end, label: 'Dec', anchor: 'end' },
  ];
  const stale = now.getTime() - Date.parse(data.updatedAt) > 2 * DAY_MS;
  const status = options.snapshot ? 'Awaiting live data' : stale ? 'Last successful update' : 'Updated';
  const updated = `${status}: ${data.updatedAt.slice(0, 10)}`;
  const description = latest
    ? `${count} ${options.unit} in ${year}. Cumulative daily observations through ${latest.date}.`
    : `No ${options.unit} observations are available for ${year} yet.`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="300" viewBox="0 0 640 300" role="img" aria-labelledby="title description">
  <title id="title">${escapeXml(options.title)}: ${count} ${escapeXml(options.unit)} in ${year}</title>
  <desc id="description">${escapeXml(description)}</desc>
  <style>
    :root { color-scheme: light dark; }
    text { font-family: system-ui, sans-serif; fill: #111827; }
    .muted { fill: #4b5563; } .grid { stroke: #d1d5db; } .line { stroke: ${options.accent}; } .dot { fill: ${options.accent}; }
    @media (prefers-color-scheme: dark) { text { fill: #f3f4f6; } .muted { fill: #d1d5db; } .grid { stroke: #4b5563; } .line { stroke: ${options.darkAccent}; } .dot { fill: ${options.darkAccent}; } }
  </style>
  <text x="24" y="43" font-size="40" font-weight="700">${count}<tspan dx="10" font-size="18" font-weight="400" class="muted">${escapeXml(options.unit)}</tspan></text>
  <text x="616" y="39" text-anchor="end" font-size="16" class="muted">${year}</text>
  ${ticks.map(value => `<line x1="${plotLeft}" x2="${plotRight}" y1="${y(value)}" y2="${y(value)}" class="grid" stroke-dasharray="3 5"/><text x="${plotLeft - 10}" y="${y(value) + 5}" text-anchor="end" class="muted" font-size="14">${value}</text>`).join('')}
  ${path ? `<path d="${path}" fill="none" class="line" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
  ${points.map(point => `<circle cx="${x(point.date).toFixed(2)}" cy="${y(point.count).toFixed(2)}" r="${points.length === 1 ? 4 : 2}" class="dot"><title>${point.date}: ${point.count} ${escapeXml(options.unit)}</title></circle>`).join('')}
  ${points.length === 0 ? `<text x="${(plotLeft + plotRight) / 2}" y="${(plotTop + plotBottom) / 2}" text-anchor="middle" class="muted" font-size="16">Awaiting first observation</text>` : ''}
  ${xTicks.map(tick => `<text x="${plotLeft + ((tick.time - start) / (end - start)) * width}" y="270" text-anchor="${tick.anchor}" class="muted" font-size="14">${tick.label}</text>`).join('')}
  <text x="24" y="292" class="muted" font-size="14">${escapeXml(updated)}</text>
</svg>`;
}
