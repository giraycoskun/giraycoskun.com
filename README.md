# giraycoskun.com

Personal website built with Astro 5.x and TailwindCSS 4.x. The site is statically generated and includes pages for work, hikes, gallery, and a paginated/tagged blog.

## Tech Stack

- Astro 5.x (static site generation + file-based routing)
- TailwindCSS 4.x (via Vite plugin)
- TypeScript (strict config)
- React integration available for isolated interactive use
- `@astrojs/sitemap` for sitemap generation
- `pnpm` for package management

## Local Setup

### Prerequisites

- Node.js 20+
- pnpm

### Install

```sh
pnpm install
```

### Run in Development

```sh
pnpm dev
```

Starts Astro dev server at `http://localhost:4321`.

### Build and Typecheck

```sh
pnpm build
```

Build output is generated in `dist/`.

### Preview Production Build

```sh
pnpm preview
```

## Project Structure

```text
/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable Astro UI components
│   ├── content/blog/        # Blog markdown content collection
│   ├── data/                # Typed static data modules
│   ├── layouts/             # Shared layout (Layout.astro)
│   ├── pages/               # Route files
│   ├── styles/              # Global styles (Tailwind entry)
│   └── utils/               # Utilities (e.g., blog helpers)
├── astro.config.mjs         # Astro + integrations config
└── package.json
```

## Routing Overview

- `/` Home
- `/work` Work history and projects
- `/hikes` Hike records and trail details
- `/gallery` Photography gallery
- `/blog` Paginated blog index
- `/blog/[slug]` Blog post detail
- `/blog/tag/[tag]` Tag archive pages

## Content and Data Model

- Blog posts live in `src/content/blog/*.md`.
- Static structured content lives in `src/data/`:
  - `types.ts`: shared TypeScript types
  - `gallery.ts`: gallery image metadata
  - `hikes.ts`: hike records and related links
- Data is imported directly into Astro pages/components at build time (no client-side data fetching).

## Conventions

- Prefer Astro components for static content.
- Use PascalCase for components (e.g., `Header.astro`).
- Use kebab-case for page filenames/routes.
- Wrap page content in `Layout.astro` with page `title` and `description`.
- Use Tailwind utility classes, including `dark:` variants for dark mode styling.

## Configuration Notes

- Site URL is configured as `https://giraycoskun.com` in `astro.config.mjs`.
- Remote image loading is allowed for `images.unsplash.com`.
- Integrations enabled:
  - `@astrojs/react`
  - `@astrojs/sitemap`
