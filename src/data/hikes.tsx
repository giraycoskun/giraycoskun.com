import type { Hike } from './types';

export const hikes: Hike[] = [
  // #TODO: Add more hikes
  {
    title: 'Schellschlicht Hike',
    distance: 15.46,
    elevation: 1339,
    stravaId: '16465587384',
    tags: ['moderate'],
    region: 'Garmisch-Partenkirchen',
    year: 2025,
    season: 'autumn',
    images: [
      { src: 'https://images.unsplash.com/photo-1763469595015-2222aa32ea01?q=80&w=1200&auto=format&fit=crop', alt: 'Mountain trail' },
      { src: 'https://images.unsplash.com/photo-1763469716176-94fa9eb2d252?q=80&w=1200&auto=format&fit=crop', alt: 'Ridge Trail' },
      { src: 'https://images.unsplash.com/photo-1763469762647-def023cb33d3?q=80&w=1200&auto=format&fit=crop', alt: 'Summit View' },
    ],
    date: '2025-10-15',
  },
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
    ],
  }  
];
