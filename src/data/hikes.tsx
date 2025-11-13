import type { Hike } from './types';

export const hikes: Hike[] = [
  {
    title: 'Aueralm Loop',
    distance: 11.65,
    elevation: 562,
    // Garmin embed removed — use Strava embed id instead
    stravaId: '16394630411',
    tags: ['easy', 'winter'],
    region: 'Tegernsee',
    year: 2025,
    season: 'autumn',
    images: [
      { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop', alt: 'Aueralm trail' },
      { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop', alt: 'Summit' },
      { src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop', alt: 'Lake view' },
    ],
  },
  {
    title: 'Herzogstand - Heimgarten Loop',
    distance: 15.9,
    elevation: 1232,
    stravaId: '15891094903',
    tags: ['moderate'],
    region: 'Kochelsee - Walchensee',
    year: 2025,
    season: 'autumn',
    images: [
      { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop', alt: 'Ridge view' },
      { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop', alt: 'Rocky ridge' },
    ],
  },
  // Add more hikes here
];
