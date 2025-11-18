export type PostMeta = {
  title: string;
  slug: string;
  date: string; // ISO date
  description: string;
  tags: string[];
  coverImage?: string;
  excerpt: string;
  author?: {
    name: string;
    avatar?: string;
  };
  readingTime?: string;
};

export type Hike = {
  title: string;
  distance: number;
  elevation: number;
  embedSrc?: string; // optional fallback
  stravaId?: string | number;
  tags?: string[];
  region: string;
  year: number;
  season: string;
  images?: string[]; // added images
  date?: string; // ISO date when the hike was added
};