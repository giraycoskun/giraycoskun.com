import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import posts from './blog/posts'; // Import your blog posts data
import { Gallery } from "./Gallery"; // import shared gallery data
 

type Hike = {
  title: string;
  distance: number;
  elevation: number;
  embedSrc: string;
  tags?: string[];
  region: string;
  year: number;
  season: string;
  images?: { src: string; alt?: string }[]; // added images
};
  
const hikes: Hike[] = [
  {
    title: 'Aueralm Loop',
    distance: 11.65, // in km
    elevation: 563, // in meters
    embedSrc: 'https://connect.garmin.com/modern/activity/embed/20929483967',
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
    distance: 8.2,
    elevation: 310,
    embedSrc: 'https://connect.garmin.com/modern/activity/embed/20458773353',
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

// Helper component for the stat cards
function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-4xl font-bold text-indigo-600">
        {value}
        <span className="text-lg font-normal text-gray-600 ml-1">{unit}</span>
      </p>
    </div>
  );
}

function HikeTrack({ hike }: { hike: Hike }) {
  const [openImg, setOpenImg] = useState<string | null>(null);

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col min-h-0">
      <div className="p-6 shrink-0">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          {hike.title}
        </h3>

        <span className="text-sm font-medium text-gray-500 mb-2 block">
          Region: <span className="text-gray-700">{hike.region}</span>
        </span>

        {/* small image thumbnails (if any) */}
        {hike.images?.length ? (
          <div className="flex items-center gap-2 mb-4">
            {hike.images.slice(0, 3).map((img) => (
              <button
                key={img.src}
                onClick={() => setOpenImg(img.src)}
                className="w-20 h-14 rounded overflow-hidden shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label={`Open image ${img.alt ?? hike.title}`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}

            {hike.images.length > 3 && (
              <span className="text-xs text-gray-500 ml-2">+{hike.images.length - 3} more</span>
            )}
          </div>
        ) : null}

        {/* --- Individual Stats --- */}
        <div className="flex space-x-6 mb-4">
          <p>
            <span className="font-bold text-gray-800">{hike.distance}</span>
            <span className="text-gray-600 ml-1">km</span>
          </p>
          <p>
            <span className="font-bold text-gray-800">{hike.elevation}</span>
            <span className="text-gray-600 ml-1">m</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {hike.tags?.map((t) => (
            <span key={t} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* --- Media area (embed) — increased height so Garmin embeds render properly --- */}
      <div className="bg-gray-100 relative grow min-h-[360px] md:min-h-[520px] overflow-hidden">
        <iframe
          src={hike.embedSrc}
          title={hike.title}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer"
          className="w-full h-full border-0"
        />

        {/* fallback / affordance to open original if embed doesn't render */}
        <div className="absolute right-3 top-3">
          <a
            href={hike.embedSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-white/90 text-gray-800 px-2 py-1 rounded shadow-sm hover:bg-white"
          >
            Open on Garmin
          </a>
        </div>
      </div>

      {/* image lightbox (per-card) */}
      {openImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setOpenImg(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img src={openImg} alt="Preview" className="w-full h-auto rounded-lg shadow-lg" />
            <button
              onClick={() => setOpenImg(null)}
              className="absolute -top-3 -right-3 bg-white text-gray-800 rounded-full p-2 shadow focus:outline-none"
              aria-label="Close"
            >
              ✕
            </button>
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
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">My Hikes</h1>

      {/* --- Top Stats Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          label="Total Distance"
          value={totalDistance.toFixed(1)} // Format to 1 decimal place
          unit="km"
        />
        <StatCard
          label="Total Elevation"
          value={totalElevation.toLocaleString()} // Adds commas for thousands
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
          <label className="block text-sm text-gray-700 mb-1">Tag</label>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="rounded border-gray-200 px-3 py-2 bg-white"
          >
            {allTags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Region</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="rounded border-gray-200 px-3 py-2 bg-white"
          >
            {allRegions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1}-{endIndex} of {filteredHikes.length} matching tracks
          </p>
        </div>
      </div>

      {/* --- Hike List Section --- */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Tracks</h2>
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
          className="px-3 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-40"
        >
          Previous
        </button>

        {/* simple page indicators */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => goTo(n)}
              className={`px-3 py-2 rounded ${n === page ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border'}`}
            >
              {n}
            </button>
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={page === totalPages}
          className="px-3 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* --- Hiking-related blog posts --- */}
      {(() => {
        const hikingPosts = posts.filter((p) => (p.tags || []).includes('hiking'));

        return (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Hiking Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hikingPosts.length ? (
                hikingPosts.map((p) => (
                  <article className="bg-white rounded-lg shadow p-4" key={p.slug}>
                    <h3 className="text-lg font-semibold">
                      <Link to={`/blog/${p.slug}`} className="text-emerald-600 hover:underline">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{p.date}</p>
                    <p className="mt-2 text-sm text-gray-700">{p.excerpt}</p>
                  </article>
                ))
              ) : (
                <p className="text-sm text-gray-500">No hiking posts yet.</p>
              )}
            </div>
          </section>
        );
      })()}

      {/* --- Gallery Section (aggregated) --- */}
      <Gallery sliceNumber={6} filterTag='hike'/>
    </div>
  );
}

export default Hikes;
