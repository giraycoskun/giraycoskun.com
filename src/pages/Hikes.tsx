import { useEffect, useState } from 'react';
import posts from '../data/posts'; // Import your blog posts data
import { Gallery } from "./Gallery"; // import shared gallery data
import BlogPostCard from "../components/BlogPostCard";
import { hikes } from '../data/hikes';
import type { Hike } from '../data/types';
import { getGalleryImageById } from '../data/gallery';

// Helper component for the stat cards
function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1 text-4xl font-bold text-indigo-600 dark:text-indigo-400">
        {value}
        <span className="text-lg font-normal text-gray-600 dark:text-gray-400 ml-1">{unit}</span>
      </p>
    </div>
  );
}

function HikeTrack({ hike }: { hike: Hike }) {
  const [openImgIndex, setOpenImgIndex] = useState<number | null>(null);

  // Convert image IDs to full objects with Unsplash URLs
  const images = hike.images?.map(id => {
    const url = getGalleryImageById(id);
    const fullUrl = getGalleryImageById(id);
    return url ? { id, src: url, fullSrc: fullUrl, alt: id } : null;
  }).filter(Boolean) as Array<{ id: string; src: string; fullSrc: string; alt: string }>;

  useEffect(() => {
    // load strava embed script once when a hike with stravaId is rendered
    if (!hike.stravaId) return;
    const src = 'https://strava-embeds.com/embed.js';
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    } else {
      const ev = new Event('load');
      window.dispatchEvent(ev);
    }
  }, [hike.stravaId]);

  const goToPrevImage = () => {
    if (openImgIndex === null || !images?.length) return;
    setOpenImgIndex((prev) => (prev! - 1 + images.length) % images.length);
  };

  const goToNextImage = () => {
    if (openImgIndex === null || !images?.length) return;
    setOpenImgIndex((prev) => (prev! + 1) % images.length);
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col min-h-0">
      <div className="p-6 shrink-0">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {hike.title}
        </h3>

        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
          Region: <span className="text-gray-700 dark:text-gray-300">{hike.region}</span>
        </span>

        {/* small image thumbnails (if any) */}
        {images?.length ? (
          <div className="flex items-center gap-2 mb-4">
            {images.slice(0, 3).map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setOpenImgIndex(idx)}
                className="w-20 h-14 rounded overflow-hidden shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label={`Open image ${img.alt ?? hike.title}`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}

            {images.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">+{images.length - 3} more</span>
            )}
          </div>
        ) : null}

        {/* --- Individual Stats --- */}
        <div className="flex space-x-6 mb-4">
          <p>
            <span className="font-bold text-gray-800 dark:text-gray-200">{hike.distance}</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">km</span>
          </p>
          <p>
            <span className="font-bold text-gray-800 dark:text-gray-200">{hike.elevation}</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">m</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {hike.tags?.map((t) => (
            <span key={t} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* --- Media area (Strava embed) --- */}
      <div className="bg-gray-100 dark:bg-gray-700 relative grow min-h-[520px] overflow-hidden">
        {hike.stravaId ? (
          <div className="w-full h-full flex items-center justify-center p-6">
            <div
              className="strava-embed-placeholder w-full h-full"
              data-embed-type="activity"
              data-embed-id={String(hike.stravaId)}
              data-style="standard"
              data-from-embed="false"
            />
            {/* fallback link */}
            <div className="absolute right-3 top-3">
              <a
                href={`https://www.strava.com/activities/${hike.stravaId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 px-2 py-1 rounded shadow-sm hover:bg-white dark:hover:bg-gray-800"
              >
                Open on Strava
              </a>
            </div>
          </div>
        ) : hike.embedSrc ? (
          // fallback to any embedSrc (kept for backwards compatibility)
          <>
            <iframe
              src={hike.embedSrc}
              title={hike.title}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer"
              className="w-full h-full border-0"
            />
            <div className="absolute right-3 top-3">
              <a
                href={hike.embedSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 px-2 py-1 rounded shadow-sm hover:bg-white dark:hover:bg-gray-800"
              >
                Open original
              </a>
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">No embed or photos available</div>
        )}
      </div>

      {/* image lightbox (per-card) with navigation */}
      {openImgIndex !== null && images && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setOpenImgIndex(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images[openImgIndex].fullSrc || images[openImgIndex].src} 
              alt={images[openImgIndex].alt || "Preview"} 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
            
            {/* Close button */}
            <button
              onClick={() => setOpenImgIndex(null)}
              className="absolute -top-3 -right-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full p-2 shadow focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Previous button */}
            {images.length > 1 && (
              <button
                onClick={goToPrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full p-3 shadow focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Previous image"
              >
                ←
              </button>
            )}

            {/* Next button */}
            {images.length > 1 && (
              <button
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full p-3 shadow focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Next image"
              >
                →
              </button>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              {openImgIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function Hikes() {
  // --- Calculate Totals ---
  const totalDistance = hikes.reduce((sum, hike) => sum + hike.distance, 0);
  const totalElevation = hikes.reduce((sum, hike) => sum + hike.elevation, 0);
  const totalHikes = hikes.length;

  // --- Filter state ---
  const allTags = ['All', ...Array.from(new Set(hikes.flatMap((h) => h.tags || [])))];
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  // gather regions from data (dedupe + keep "All")
  const allRegions = ['All', ...Array.from(new Set(hikes.map((h) => h.region).filter(Boolean)))];

  // pagination (button based)
  const PAGE_SIZE = 6;
  const [page, setPage] = useState(1);

  // compute filtered list
  const filteredHikes = hikes.filter((h) => {
    const tagMatch = selectedTag === 'All' || (h.tags || []).includes(selectedTag);
    const regionMatch = selectedRegion === 'All' || h.region === selectedRegion;
    return tagMatch && regionMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredHikes.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = Math.min(filteredHikes.length, page * PAGE_SIZE);
  const paginated = filteredHikes.slice(startIndex, endIndex);

  // reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedTag, selectedRegion]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const goTo = (n: number) => setPage(() => Math.min(Math.max(1, n), totalPages));

  return (
    <div className="container mx-auto px-6 py-12 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">My Hikes</h1>
        <a
          href="https://trails.giraycoskun.com/trails"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white px-4 py-2 rounded shadow"
        >
          Go to Trails →
        </a>
      </div>

      {/* --- Top Stats Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          label="Total Distance"
          value={totalDistance.toFixed(1)}
          unit="km"
        />
        <StatCard
          label="Total Elevation"
          value={totalElevation.toLocaleString()}
          unit="m"
        />
        <StatCard
          label="Total Hikes"
          value={totalHikes.toString()}
          unit="tracks"
        />
      </div>

      {/* --- Filters --- */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-8">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Tag</label>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="rounded border-gray-200 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {allTags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Region</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="rounded border-gray-200 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {allRegions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1}-{endIndex} of {filteredHikes.length} matching tracks
          </p>
        </div>
      </div>

      {/* --- Hike List Section --- */}
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">All Tracks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {paginated.map((hike) => (
          <HikeTrack key={`${hike.title}-${hike.year}`} hike={hike} />
        ))}
      </div>

      {/* Pagination controls (buttons) */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={goPrev}
          disabled={page === 1}
          className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-40"
        >
          Previous
        </button>

        {/* simple page indicators */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => goTo(n)}
              className={`px-3 py-2 rounded ${n === page ? 'bg-emerald-600 dark:bg-emerald-700 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border dark:border-gray-700'}`}
            >
              {n}
            </button>
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={page === totalPages}
          className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* --- Hiking-related blog posts --- */}
      {(() => {
        const hikingPosts = posts.filter((p) => (p.tags || []).includes('hike'));

        return (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Hiking Blog</h2>
            {hikingPosts.length ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hikingPosts.slice(0, 6).map((p, i) => (
                  <BlogPostCard
                    key={p.slug}
                    post={p}
                    featured={i === 0}
                    onTagClick={() => {
                      /* optional: implement tag filter/navigation if needed */
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No hiking posts yet.</p>
            )}
          </section>
        );
      })()}

      {/* --- Gallery Section (aggregated) --- */}
      <Gallery limit={8} tag="hike" />
    </div>
  );
}

export default Hikes;
