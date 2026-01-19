export type PostMeta = {
  title: string;
  slug: string;
  date: string; // ISO date
  description: string;
  tags: string[];
  coverImage?: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  readingTime?: string;
  draft?: boolean;
};

export type Hike = {
  title: string;
  distance: number;
  elevation: number;
  stravaId?: string | number;
  tags?: string[];
  region: string;
  year: number;
  season: string;
  images?: string[];
  date?: string;
  wanderLogId?: string;
  blogSlug?: string;
};

export type GalleryImage = {
  id: string;
  unsplashId: string;
  alt: string;
  tags: string[];
  date?: string;
};
