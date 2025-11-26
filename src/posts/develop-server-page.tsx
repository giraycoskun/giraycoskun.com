import React from "react";
import type { PostMeta } from "../data/types";

export const meta: PostMeta = {
  title: "Develop Server Landing Page",
  slug: "develop-server-landing-page",
  date: "2025-11-26",
  description:
    "Developing a landing page for home server using React, Vite and TypeScript; serving via Nginx and systemd.",
  tags: ["developer", "react", "typescript", "nginx"],
  coverImageUrl: "https://small-surf-407.linkyhost.com/?raw=true",
  author: {
    name: "Giray Coskun",
    avatar:
      "https://avatars.githubusercontent.com/u/37620872?s=400&u=3b9d821e80e76abc209441bc88b128956e77cbd2&v=4",
  },
  excerpt:
    "Developing a landing page for home server using React, Vite and TypeScript; serving via Nginx and systemd.",
};

export const Post: React.FC<{ className?: string }> = ({ className }) => (
  <article
    className={`max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-5 ${
      className ?? ""
    } text-black dark:text-gray-100`}
  >
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
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {meta.author?.name}
            </div>
            <div className="text-sm text-black dark:text-gray-300 mt-0.5">
              {meta.readingTime}
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 p-4">
          <div className="flex flex-wrap gap-2">
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
      </div>

      <figure className="mb-6">
        <img
          src={meta.coverImageUrl}
          alt={meta.title}
          className="w-full rounded-lg object-cover"
          loading="eager"
        />
        <figcaption className="mt-3 text-sm text-black dark:text-gray-300">
          Project with React, Typescript and Vite — photo by ChatGPT
        </figcaption>
      </figure>

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
              <div className="font-medium text-gray-900">
                {meta.author?.name}
              </div>
              <div className="text-black">
                <time dateTime={meta.date}>
                  {new Date(meta.date).toLocaleDateString()}
                </time>
                {" • "}
                {meta.readingTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* Contents */}
    <section className="mb-8 max-w-prose mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Contents
        </h3>
        <ul className="mt-2 pl-4 list-disc text-sm text-black dark:text-gray-300">
          <li>
            <a href="#intro" className="hover:underline">
              Intro
            </a>
          </li>
          <li>
            <a href="#development" className="hover:underline">
              Step:1 Development
            </a>
          </li>
          <li>
            <a href="#setup-commands" className="hover:underline">
              Step:2 How to Build via Github Webhooks
            </a>
          </li>
          <li>
            <a href="#deployment" className="hover:underline">
              Step:3 How to Deploy in Nginx on Home Server
            </a>
          </li>
        </ul>
      </div>
    </section>

    <div className="prose lg:prose-lg prose-neutral mx-auto mt-8 text-black dark:text-gray-100 leading-relaxed">
      <section>
        <h2
          id="intro"
          className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 leading-tight"
        >
          Intro
        </h2>
        <p className="text-base md:text-lg text-black dark:text-gray-200 leading-relaxed max-w-prose">
          I have a home server that I use for various personal projects and host
          open source services like jellyfin, linkding etc. I decided to develop
          a landing page for this server and in this post, I'll share my
          experience and some notes on the development process. The project is
          developed via React, Vite, and TypeScript. I have chosen React because
          well, I like and have some experience with it. I have never used Vite
          previously, but it has beed quite fast to test and build the project
          and did not face any issues so far. I ahve also never used Typescript
          but I ahve been writing Python with types, thus wanted to give it a
          try for javascript as well. Project is built and served via Nginx on
          my home server. I also wanted a Continuos Build setup, but Jenkis was
          too heavy for this small project, thusI have a small Express.js app
          that listens to GitHub webhooks and triggers a build bash script which
          is run as a systemd service.
        </p>

        

        {/* GitHub project card */}
        <div className="mt-6">
          <a
            href="https://github.com/giraycoskun/server.giraycoskun.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
            aria-label="Open server.giraycoskun.dev on GitHub"
          >
            <div className="flex items-center justify-start gap-4">
              <div className="shrink-0">
                {/* GitHub mark */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-10 h-10 text-gray-900 dark:text-gray-100"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53 0-.26-.01-1-.01-1.93-3.06.67-3.71-1.48-3.71-1.48-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.67.08-.67 1.09.08 1.66 1.12 1.66 1.12.97 1.66 2.54 1.18 3.16.9.1-.7.38-1.18.69-1.45-2.44-.28-5-1.22-5-5.44 0-1.2.43-2.18 1.12-2.95-.11-.28-.49-1.41.11-2.94 0 0 .9-.29 2.95 1.12a10.2 10.2 0 012.69-.36c.91 0 1.82.12 2.69.36 2.05-1.41 2.95-1.12 2.95-1.12.6 1.53.22 2.66.11 2.94.7.77 1.12 1.75 1.12 2.95 0 4.23-2.56 5.16-5.01 5.43.39.33.74.98.74 1.98 0 1.43-.01 2.58-.01 2.93 0 .3.19.64.76.53C19.11 20.73 22.25 16.61 22.25 11.75 22.25 5.48 17.27.5 12 .5z" />
                </svg>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  giraycoskun/server.giraycoskun.dev
                </h4>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section>
        <h2
          id="development"
          className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 leading-tight"
        >
          Step:1 Development
        </h2>
        <p className="text-base md:text-lg text-black dark:text-gray-200 leading-relaxed max-w-prose mb-2">
          The project development set-up via <a href="https://pnpm.io/" className="font-semibold text-blue-600 dark:text-blue-400">pnpm</a> version 10.21.0. 
        </p>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Initialize project:
          </p>
          <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">pnpm create vite@latest my-app --template react</code>
          </pre>
          <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mt-1">
            <code className="text-sm">pnpm install</code>
          </pre>
        </div>
      </section>

      <section>
        <h2
          id="build"
          className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 leading-tight"
        >
          Step:2 How to Build via Github Webhooks
        </h2>
        <p className="text-base md:text-lg text-black dark:text-gray-200 leading-relaxed max-w-prose mb-4">
          Here are the essential commands used to set up and configure the
          project:
        </p>

      </section>

      <section>
        <h2
          id="deployment"
          className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 leading-tight"
        >
          Step:3 How to Deploy in Nginx on Home Server
        </h2>
        <p className="text-base md:text-lg text-black dark:text-gray-200 leading-relaxed max-w-prose mb-4">
          Here are
        </p>

      </section>
    </div>

    <footer className="mt-12 border-t border-gray-100 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div className="opacity-90 text-black dark:text-gray-300">
          Tags: {meta.tags.join(", ") || "—"}
        </div>
        <div className="text-right text-black dark:text-gray-300">
          Photo credits: ChatGPT • {meta.author?.name} •{" "}
          {new Date(meta.date).toLocaleDateString()}
        </div>
      </div>
    </footer>
  </article>
);
