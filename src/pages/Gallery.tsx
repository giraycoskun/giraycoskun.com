import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { galleryData, galleryRandom, gallerySlice, getUnsplashUrl } from "../data/gallery";
import type { GalleryImage } from "../data/gallery";
import { Link } from "react-router-dom";



function Gallery({ limit, tag, random }: { limit?: number; tag?: string, random?: boolean } = {}) {
  const images = useMemo(() => {
    if (typeof limit === "number" || typeof tag === "string") {
      return random
        ? galleryRandom(limit ?? galleryData.length, tag)
        : gallerySlice(limit ?? galleryData.length, tag);
    }
    return galleryData;
  }, [limit, tag, random]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const imageRefs = useRef<(HTMLElement | null)[]>([]);

  const setImageRef = useCallback((el: HTMLElement | null, index: number) => {
    imageRefs.current[index] = el;
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0", 10);
            setVisibleImages((prev) => new Set(prev).add(index));
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [images.length]);

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
        <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100 text-center">
          Gallery
        </h1>
      </Link>
      {/* Masonry Grid with varied sizes */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {images.map((img: GalleryImage, i: number) => {
            const thumbnailUrl = getUnsplashUrl(img.unsplashId);
            const isVisible = visibleImages.has(i);
            
            return (
              <figure
                key={i}
                ref={(el) => setImageRef(el, i)}
                data-index={i}
                className="relative group cursor-pointer overflow-hidden rounded-lg mb-4 aspect-4/3 bg-gray-200 dark:bg-gray-800"
                onClick={() => open(i)}
              >
                {isVisible ? (
                  <img
                    src={thumbnailUrl}
                    alt={img.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-pulse text-gray-400">Loading...</div>
                  </div>
                )}
                {/* Hover overlay with caption */}
                {isVisible && (
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <figcaption className="p-4 w-full">
                      <p className="text-white font-medium text-sm md:text-base">
                        {img.alt}
                      </p>
                    </figcaption>
                  </div>
                )}
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
              {images[openIndex].date && (
                <p className="text-sm md:text-base text-white/70 mt-2">
                  {new Date(images[openIndex].date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}

export default Gallery;
