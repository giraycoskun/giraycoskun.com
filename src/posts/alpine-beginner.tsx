import React from "react";
import type { PostMeta } from "../data/types";
import { getGalleryImageById } from "../data/gallery";

export const meta: PostMeta = {
  title: "Alpine Beginner Notes",
  slug: "alpine-beginner-notes",
  date: "2025-11-13",
  description:
    "Notes and photos from a day hike exploring coastal ridgelines and forests.",
  tags: ["hike", "guide"],
  coverImage: getGalleryImageById("hiking-gear-winter-tegernsee") ?? 
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
  author: {
    name: "Giray Coskun",
    avatar:
      "https://avatars.githubusercontent.com/u/37620872?s=400&u=3b9d821e80e76abc209441bc88b128956e77cbd2&v=4",
  },
  readingTime: "6 min",
  excerpt: "A coastal loop hike with stunning ocean views and forest trails.",
};

export const HikePost: React.FC<{ className?: string }> = ({ className }) => (
  <article className={`max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-10 ${className ?? ""}`}>
    <header>
      {/* author avatar and tags ABOVE the cover image */}
      <div className="mb-4 flex items-center justify-between rounded border-2 border-amber-600">
        <div className="flex items-center gap-3 p-2">
          {meta.author?.avatar && (
            <img
              src={meta.author.avatar}
              alt={meta.author.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
          )}
          <div>
            <div className="font-medium text-gray-900">{meta.author?.name}</div>
            <div className="text-sm text-gray-500 mt-0.5">{meta.readingTime}</div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap p-4">
          {meta.tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full shadow-sm"
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
          <figcaption className="mt-3 text-sm text-gray-600">
            Coastal ridgeline at golden hour — photo by {meta.author?.name} (Unsplash)
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
              <div className="text-gray-500">
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
        <ul className="mt-2 pl-4 list-disc text-sm text-gray-700 dark:text-gray-300">
          <li><a href="#intro" className="hover:underline">Intro</a></li>
          <li><a href="#notes" className="hover:underline">Notes</a></li>
        </ul>
      </div>
    </section>

    <div className="prose lg:prose-lg dark:prose-invert mx-auto mt-8">
      <section>
        <h2 id="intro" className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 leading-tight">
          Intro
        </h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-prose">
          As an hiker beginner, I want to take notes for the future.
        </p>
      </section>

      <section>
        <h2 id="equipment" className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 leading-tight">
          Equipment
        </h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-prose">
          Basic hiking gear including sturdy boots, layered clothing, a backpack with water and snacks, a map or GPS device, sunscreen, and a first aid kit.
        </p>
        <ul className="mt-3 pl-5 list-disc space-y-1 text-gray-700 dark:text-gray-300">
          <li>Footwear: waterproof boots with good traction</li>
          <li>Layers: moisture‑wicking base, insulating mid‑layer, wind/rain shell</li>
          <li>Navigation: paper map + compass or GPS (offline maps)</li>
          <li>Hydration & food: 2L water, electrolytes, calorie‑dense snacks</li>
          <li>Sun protection: hat, sunglasses, SPF 30+</li>
          <li>Safety: small first‑aid kit, whistle, multi‑tool, emergency blanket</li>
          <li>Lighting: headlamp with spare batteries</li>
        </ul>
        <h3 id="winter-equipment" className="text-xl md:text-2xl font-serif font-semibold text-gray-600 dark:text-gray-100 mt-8 mb-4 leading-tight">
          Winter Equipment
        </h3>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-prose">
          Cold and slippery conditions require extra gear for warmth and traction.
        </p>
        <ul className="mt-3 pl-5 list-disc space-y-1 text-gray-700 dark:text-gray-300">
          <li>Insulated, waterproof boots + wool socks (carry a spare pair)</li>
          <li>Traction: microspikes or light crampons; snowshoes if deep snow</li>
          <li>Trekking poles with snow baskets; gaiters to keep snow out</li>
          <li>Layering: wool/synthetic base, fleece mid‑layer, insulated puffy, hard shell</li>
          <li>Extremities: beanie, neck gaiter, waterproof mitts + liner gloves</li>
          <li>Thermos with hot drink; extra high‑calorie snacks</li>
          <li>Emergency: bivy sack or space blanket, fire starter, backup power bank</li>
        </ul>
        <p className="mt-3 text-sm text-amber-700 dark:text-amber-300">
          Check weather and avalanche reports, and turn back if conditions worsen.
        </p>
      </section>

      <section>
        <h2 id="notes" className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-4 leading-tight">
          Notes
        </h2>
        <ul className="pl-5 space-y-2">
          <li className="text-gray-700 dark:text-gray-300 leading-relaxed">Wildflowers are abundant in late spring; expect muddy sections after rain.</li>
          <li className="text-gray-700 dark:text-gray-300 leading-relaxed">Dogs allowed but leash is recommended on the ridge.</li>
          <li className="text-gray-700 dark:text-gray-300 leading-relaxed">Parking can fill on weekends — arrive early.</li>
        </ul>
      </section>
    </div>

    <footer className="mt-12 border-t border-gray-100 pt-6 text-sm text-gray-500">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div className="opacity-90">Tags: {meta.tags.join(", ") || "—"}</div>
        <div className="text-right">Photo credits: Unsplash • {meta.author?.name} • {new Date(meta.date).toLocaleDateString()}</div>
      </div>
    </footer>
  </article>
);
