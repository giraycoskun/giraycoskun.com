import { emptyYearActivity, renderYearActivitySvg } from '../utils/yearActivity';

export function GET() {
  const now = new Date();
  return new Response(renderYearActivitySvg(emptyYearActivity('giraycoskun', now), {
    title: 'Hardcover books read this year',
    unit: 'books read',
    accent: '#7c3aed',
    darkAccent: '#a78bfa',
    snapshot: true,
  }, now), { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
}
