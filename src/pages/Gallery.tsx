import { useEffect, useState } from "react";
import { galleryData, gallerySlice, getUnsplashUrl } from "../data/gallery";
import type { GalleryImage } from "../data/gallery";
import { Link } from "react-router-dom";



export function Gallery({ limit, tag }: { limit?: number; tag?: string } = {}) {
  const images =
    typeof limit === "number" || typeof tag === "string"
      ? gallerySlice(limit ?? galleryData.length, tag)
      : galleryData;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + images.length) % images.length
        );
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex, images.length]);

  useEffect(() => {
    document.body.style.overflow = openIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  const open = (i: number) => setOpenIndex(i);
  const close = () => setOpenIndex(null);
  const prev = () =>
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );
  const next = () =>
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <main className="container mx-auto px-2 py-12 max-w-7xl">
      <Link to="/gallery">
        <h1 className="text-4xl font-bold mb-12 text-gray-900 text-center">
          Gallery
        </h1>
      </Link>
      {/* Masonry Grid with varied sizes */}
      <div className="w-full">
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4">
          {images.map((img: GalleryImage, i: number) => {
            const thumbnailUrl = getUnsplashUrl(img.unsplashId);
            
            return (
              <figure
                key={i}
                className="relative group break-inside-avoid cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02] mb-4"
                onClick={() => open(i)}
              >
                <img
                  src={thumbnailUrl}
                  alt={img.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {/* Hover overlay with caption */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <figcaption className="p-4 w-full">
                    <p className="text-white font-medium text-sm md:text-base">
                      {img.alt}
                    </p>
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Lightbox modal */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 md:left-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 md:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <figure
            className="max-w-[180vw] max-h-[180vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getUnsplashUrl(images[openIndex].unsplashId)}
              alt={images[openIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <figcaption className="mt-4 text-center">
              <h3 className="text-lg md:text-xl font-medium text-white/90">
                {images[openIndex].alt}
              </h3>
            </figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
