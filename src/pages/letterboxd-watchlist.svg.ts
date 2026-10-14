import snapshot from '../data/watchlistSnapshot.json';
import { renderWatchlistSvg } from '../utils/watchlist';

export function GET() {
  return new Response(renderWatchlistSvg(snapshot, new Date(), true), {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
}
