
import React from "react";
import type { PostMeta } from "../data/types";
import { getGalleryImageById } from "../data/gallery";

export const meta: PostMeta = {
  title: "Schellschlicht Hike Trail Notes",
  slug: "schellschlicht-trail-notes",
  date: "2025-11-15",
  description:
    "Trail notes and tips from my Schellschlicht hike in Garmisch-Partenkirchen.",
  tags: ["hike", "trail-notes"],
  coverImage:
    getGalleryImageById("schellschlicht-summit-view"),
  author: {
    name: "Giray Coskun",
    avatar:
      "https://avatars.githubusercontent.com/u/37620872?s=400&u=3b9d821e80e76abc209441bc88b128956e77cbd2&v=4",
  },
  readingTime: "1 min",
  excerpt: "Trail notes and tips from my Schellschlicht hike in Garmisch-Partenkirchen.",
};

export const HikePost: React.FC<{ className?: string }> = ({ className }) => (
  <article className={`max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-10 ${className ?? ""} text-black dark:text-gray-100`}>
    <header>
      {/* author avatar and tags ABOVE the cover image */}
      <div className="mb-4 flex items-center justify-between rounded border-2 border-amber-600 dark:border-amber-500">
        <div className="flex items-center gap-3 p-2">
          {meta.author?.avatar && (
            <img
              src={meta.author.avatar}
              alt={meta.author.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
          )}
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{meta.author?.name}</div>
            <div className="text-sm text-black dark:text-gray-300 mt-0.5">{meta.readingTime}</div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap p-4">
          {meta.tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full shadow-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {meta.coverImage && (
        <figure className="mb-6">
          <img
            src={meta.coverImage}
            alt={meta.title}
            className="w-full rounded-lg object-cover h-56 md:h-64 lg:h-72"
            loading="eager"
          />
          <figcaption className="mt-3 text-sm text-black dark:text-gray-300">
            Schellschlicht mountain trail — photo by {meta.author?.name} (Unsplash)
          </figcaption>
        </figure>
      )}

      {/* author & tags are displayed above the cover image; keep this block for accessibility/fallback */}
      <div className="sr-only">
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            {meta.author?.avatar && (
              <img
                src={meta.author.avatar}
                alt={meta.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div className="text-center">
              <div className="font-medium text-gray-900">{meta.author?.name}</div>
              <div className="text-black">
                <time dateTime={meta.date}>{new Date(meta.date).toLocaleDateString()}</time>
                {" • "}{meta.readingTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* Contents */}
    <section className="mb-8 max-w-prose mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Contents</h3>
        <ul className="mt-2 pl-4 list-disc text-sm text-black dark:text-gray-300">
            <li><a href="#intro" className="hover:underline">Intro</a></li>
            <li><a href="#notes" className="hover:underline">How to Arrive</a></li>
            <li><a href="#equipment" className="hover:underline">Equipment and Technical Challenges</a></li>
        </ul>
      </div>
    </section>

    <div className="prose lg:prose-lg prose-neutral mx-auto mt-8 text-black dark:text-gray-100 leading-relaxed">
      <section>
        <h2 id="intro" className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 leading-tight">
          Intro
        </h2>
        <p className="text-base md:text-lg text-black dark:text-gray-200 leading-relaxed max-w-prose">
          This is a spring to fall hike in the Bavarian Alps near Garmisch-Partenkirchen. The summit is just over 2000 meters anddirectly accross Zugspitze, offering views of beautiful Garmisch-Paternkirchen to Austria as part of the Ammergau Alps.
        </p>
      </section>

      <section>
        <h2 id="notes" className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-4 leading-tight">
          How to Arrive
        </h2>
        <p className="text-base md:text-lg text-black dark:text-gray-200 leading-relaxed max-w-prose">
          There is a <a href="https://maps.app.goo.gl/CVaSDCyVcLyo3HZQ6" className="font-semibold text-red-400 underline">parking lot</a> at the base of the trailhead, but it is also accessible via train RB 60 from Munich.
        </p>
      </section>

      <section>
        <h2 id="notes" className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-4 leading-tight">
          Equipment and Technical Challenges
        </h2>
      </section>

      <section>
        <h2 id="notes" className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-4 leading-tight">
          Useful Links
        </h2>
        <ul>
            <li><a href="https://en.wikipedia.org/wiki/Ammergau_Alps" className="font-semibold text-indigo-900">Ammergau Alps - Wikipedia &rarr; </a> important to know terrain!</li>
            <li><a href="https://www.alpine-bergtouren.de/touren/bergtour-schellschlicht-ueberschreitung-ammergauer-alpen.php" className="font-semibold text-indigo-900">Alpine-Bergtouren.de &rarr; </a> A good reference of difficulty.</li>
        </ul>
      </section>

    </div>

    <footer className="mt-12 border-t border-gray-100 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div className="opacity-90 text-black dark:text-gray-300">Tags: {meta.tags.join(", ") || "—"}</div>
        <div className="text-right text-black dark:text-gray-300">Photo credits: Unsplash • {meta.author?.name} • {new Date(meta.date).toLocaleDateString()}</div>
      </div>
    </footer>
  </article>
);
