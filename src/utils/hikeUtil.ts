import type { Hike } from '../data/types';

/**
 * Calculate total distance from all hikes
 */
export function calculateTotalDistance(hikes: Hike[]): number {
  return hikes.reduce((sum, hike) => sum + hike.distance, 0);
}

/**
 * Calculate total elevation gain from all hikes
 */
export function calculateTotalElevation(hikes: Hike[]): number {
  return hikes.reduce((sum, hike) => sum + hike.elevation, 0);
}

/**
 * Get all unique tags from hikes
 */
export function getAllTags(hikes: Hike[]): string[] {
  const tags = new Set<string>();
  hikes.forEach(hike => {
    hike.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get all unique regions from hikes
 */
export function getAllRegions(hikes: Hike[]): string[] {
  const regions = new Set<string>();
  hikes.forEach(hike => {
    if (hike.region) {
      regions.add(hike.region);
    }
  });
  return Array.from(regions).sort();
}

/**
 * Filter hikes by tag and region
 */
export function filterHikes(
  hikes: Hike[],
  selectedTag?: string,
  selectedRegion?: string
): Hike[] {
  return hikes.filter(hike => {
    const tagMatch = !selectedTag || selectedTag === 'All' || (hike.tags || []).includes(selectedTag);
    const regionMatch = !selectedRegion || selectedRegion === 'All' || hike.region === selectedRegion;
    return tagMatch && regionMatch;
  });
}

/**
 * Group hikes by year
 */
export function groupHikesByYear(hikes: Hike[]): Record<number, Hike[]> {
  return hikes.reduce((acc, hike) => {
    const year = hike.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(hike);
    return acc;
  }, {} as Record<number, Hike[]>);
}

/**
 * Get hike statistics for a specific year
 */
export function getYearStats(hikes: Hike[], year: number): {
  count: number;
  totalDistance: number;
  totalElevation: number;
} {
  const yearHikes = hikes.filter(h => h.year === year);
  return {
    count: yearHikes.length,
    totalDistance: calculateTotalDistance(yearHikes),
    totalElevation: calculateTotalElevation(yearHikes),
  };
}
