import React from "react";
import type { PostMeta } from "../data/types";

export const meta: PostMeta = {
  title: "Develop Server Landing Page",
  slug: "develop-server-landing-page",
  date: "2025-11-26",
  description:
    "Developing a landing page for home server using React, Vite and TypeScript; serving via Nginx and systemd.",
  tags: ["developer", "react", "typescript", "nginx", "systemd"],
  coverImageUrl: "https://small-surf-407.linkyhost.com/?raw=true",
  author: {
    name: "Giray Coskun",
    avatar:
      "https://avatars.githubusercontent.com/u/37620872?s=400&u=3b9d821e80e76abc209441bc88b128956e77cbd2&v=4",
  },
  readingTime: "6 min",
  excerpt: "Developing a landing page for home server using React, Vite and TypeScript; serving via Nginx and systemd.",
};

export const Post: React.FC<{ className?: string }> = ({ className }) => (
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

        <div className="flex flex-1 gap-2 flex-wrap p-4">
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
          <li><a href="#development" className="hover:underline">Development</a></li>
          <li><a href="#setup-commands" className="hover:underline">Setup Commands</a></li>
        </ul>
      </div>
    </section>

    <div className="prose lg:prose-lg prose-neutral mx-auto mt-8 text-black dark:text-gray-100 leading-relaxed">
      <section>
        <h2 id="intro" className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 leading-tight">
          Intro
        </h2>
        <p className="text-base md:text-lg text-black dark:text-gray-200 leading-relaxed max-w-prose">
          I have a home server that I use for various personal projects and services. I decided to develop a landing page using React, Vite, and TypeScript. In this post, I'll share my experience and some notes on the development process.
        </p>
      </section>

        <section>
        <h2 id="development" className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 leading-tight">
          Step:1 Development
        </h2>
        <p className="text-base md:text-lg text-black dark:text-gray-200 leading-relaxed max-w-prose mb-2">
          I started by setting up a new React project using Vite for fast development and TypeScript for type safety. The landing page features links to the various services and projects hosted on my server mostly.
        </p>
         <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Install dependencies:</p>
            <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">cd landing-page && npm install</code>
            </pre>
          </div>
        </section>

        <section>
        <h2 id="setup-commands" className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 leading-tight">
          Step:2 Setup Commands
        </h2>
        <p className="text-base md:text-lg text-black dark:text-gray-200 leading-relaxed max-w-prose mb-4">
          Here are the essential commands used to set up and configure the project:
        </p>
        
        <div className="not-prose space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Initialize the project:</p>
            <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">npm create vite@latest landing-page -- --template react-ts</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Install dependencies:</p>
            <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">cd landing-page && npm install</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Build for production:</p>
            <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">npm run build</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Configure Nginx:</p>
            <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">sudo nano /etc/nginx/sites-available/landing-page</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Enable site and restart Nginx:</p>
            <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">sudo ln -s /etc/nginx/sites-available/landing-page /etc/nginx/sites-enabled/{"\n"}sudo systemctl restart nginx</code>
            </pre>
          </div>
        </div>
        </section>

    </div>

    <footer className="mt-12 border-t border-gray-100 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div className="opacity-90 text-black dark:text-gray-300">Tags: {meta.tags.join(", ") || "—"}</div>
        <div className="text-right text-black dark:text-gray-300">Photo credits: ChatGPT • {meta.author?.name} • {new Date(meta.date).toLocaleDateString()}</div>
      </div>
    </footer>
  </article>
);
