import { WATCHLIST_USERNAME } from './watchlist.ts';

export interface DiaryFilm {
  title: string;
  year: number;
  watchedDate: string;
  rating: number | null;
  url: string;
  posterUrl: string;
}

export interface DiarySnapshot {
  username: string;
  updatedAt: string;
  films: DiaryFilm[];
}

export const DIARY_URL = `https://letterboxd.com/${WATCHLIST_USERNAME}/diary/`;
export const DIARY_RSS_URL = `https://letterboxd.com/${WATCHLIST_USERNAME}/rss/`;
export const DIARY_LIMIT = 4;

const decodeXml = (value: string) => value.replace(/&#(x[\da-f]+|\d+);|&(amp|lt|gt|quot|apos);/gi, (match, numeric, named) => {
  if (numeric) {
    const codePoint = Number.parseInt(numeric.startsWith('x') ? numeric.slice(1) : numeric, numeric.startsWith('x') ? 16 : 10);
    return Number.isSafeInteger(codePoint) ? String.fromCodePoint(codePoint) : match;
  }
  return ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" } as Record<string, string>)[named.toLowerCase()] ?? match;
});

function tag(item: string, name: string): string | null {
  const match = item.match(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${name}>`, 'i'));
  return match ? decodeXml(match[1].trim()) : null;
}

/** Parse the public RSS representation of diary entries, which includes full-size posters. */
export function parseDiaryFeed(xml: string): DiaryFilm[] {
  if (!new RegExp(`<link>https:\\/\\/letterboxd\\.com\\/${WATCHLIST_USERNAME}\\/<\\/link>`, 'i').test(xml)) {
    throw new Error('Letterboxd did not return the expected public diary feed');
  }

  const films = [...xml.matchAll(/<item>\s*([\s\S]*?)\s*<\/item>/gi)].flatMap(([, item]) => {
    const title = tag(item, 'letterboxd:filmTitle');
    const yearText = tag(item, 'letterboxd:filmYear');
    const watchedDate = tag(item, 'letterboxd:watchedDate');
    const ratingText = tag(item, 'letterboxd:memberRating');
    const url = tag(item, 'link');
    const posterUrl = item.match(/<description>[\s\S]*?<img\s+src="([^"]+)"/i)?.[1];
    const year = Number(yearText);
    const rating = ratingText === null ? null : Number(ratingText);

    const valid = title && title.length <= 200
      && Number.isInteger(year) && year >= 1870 && year <= 2200
      && watchedDate && /^\d{4}-\d{2}-\d{2}$/.test(watchedDate) && !Number.isNaN(Date.parse(watchedDate))
      && (rating === null || (Number.isFinite(rating) && rating >= 0.5 && rating <= 5 && rating * 2 % 1 === 0))
      && url?.startsWith(`https://letterboxd.com/${WATCHLIST_USERNAME}/film/`)
      && posterUrl?.startsWith('https://a.ltrbxd.com/resized/');

    if (!valid || !title || !watchedDate || !url || !posterUrl) return [];
    return [{ title, year, watchedDate, rating, url, posterUrl: decodeXml(posterUrl) }];
  }).slice(0, DIARY_LIMIT);

  if (films.length !== DIARY_LIMIT) throw new Error(`Expected at least ${DIARY_LIMIT} valid diary entries`);
  return films;
}
