import { emptyYearActivity, renderYearActivitySvg } from '../utils/yearActivity';

export function GET() {
  const now = new Date();
  return new Response(renderYearActivitySvg(emptyYearActivity('giraycoskun', now), {
    title: 'Letterboxd films watched this year',
    unit: 'films watched',
    accent: '#047857',
    darkAccent: '#34d399',
    snapshot: true,
  }, now), { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
}
