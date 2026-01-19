# GitHub Copilot Instructions for Astro Project

## Project Overview
This is a personal website built with Astro 5.x, using file-based routing and static generation. The architecture prioritizes simplicity, clean code, and maintainability by using Astro components over React where possible.

## Architecture

### Directory Structure
- **src/pages/**: File-based routing - each `.astro` file becomes a page route
	- `index.astro` - Homepage with hero, gallery preview, profile card
	- `blog-index.astro` - Blog listing page
	- `gallery.astro` - Photo gallery from hikes and travels
	- `hikes.astro` - Hiking trail records with Strava integration
	- `work.astro` - Professional experience and projects

- **src/components/**: Reusable Astro components
	- `Header.astro` - Navigation header with mobile menu
	- `Footer.astro` - Footer with social links
	- Components are pure Astro (not React) for better performance

- **src/layouts/**: Page layout templates
	- `Layout.astro` - Base layout with Header/Footer, handles meta tags and SEO

- **src/data/**: Static data modules (TypeScript)
	- `types.ts` - TypeScript interfaces for PostMeta, Hike, GalleryImage
	- `gallery.ts` - Gallery image data with Unsplash integration
	- `hikes.ts` - Hiking trail data with Strava and Wanderlog links
	- Data is imported directly into pages at build time (static generation)

- **src/utils/**: Utility functions
	- `blogUtil.ts` - Reading time calculation

- **src/styles/**: Global styles
	- `global.css` - TailwindCSS imports and global styles

## Developer Workflows
- **Installation**: `pnpm install`
- **Development**: `pnpm dev` (localhost:4321)
- **Building**: `pnpm build` (outputs to `./dist/`)
- **Previewing**: `pnpm preview` (preview production build)

## Project Conventions

### File Naming
- Astro components: PascalCase (e.g., `Header.astro`, `Layout.astro`)
- Pages: kebab-case (e.g., `blog-index.astro`, `work.astro`)
- Data files: camelCase (e.g., `gallery.ts`, `hikes.ts`)

### Component Patterns
- **Prefer Astro components** over React for static content
- Use Astro's component script (`---`) for data fetching and logic
- Astro components have zero JavaScript by default (better performance)
- TailwindCSS for styling with dark mode support (`dark:` prefix)

### Data Flow
- Static data lives in `src/data/` as TypeScript modules
- Import data directly into page components
- No client-side fetching needed - data is embedded at build time
- Example: `import { galleryData } from '../data/gallery';`

## Integration Points

### External Services
- **Unsplash**: Gallery images via `https://images.unsplash.com/photo-{unsplashId}`
- **Strava**: Hike activity embeds using activity IDs
- **Spotify**: Playlist embeds for music section
- **Social Links**: GitHub, LinkedIn, Gmail, Instagram in Footer

### Styling
- **TailwindCSS 4.x** via Vite plugin
- Dark mode classes: `dark:bg-gray-900`, `dark:text-gray-100`
- Global styles in `src/styles/global.css`
- Component styles can be scoped with `<style>` tags in `.astro` files

## Key Dependencies
- **Astro 5.x**: Core framework with React integration
- **@astrojs/react**: React integration (used sparingly)
- **TailwindCSS 4.x**: Utility-first CSS framework
- **pnpm**: Package manager

## Common Tasks

### Adding a New Page
1. Create `src/pages/your-page.astro`
2. Import Layout: `import Layout from '../layouts/Layout.astro';`
3. Wrap content in `<Layout title="..." description="...">`

### Adding New Data
1. Define TypeScript types in `src/data/types.ts`
2. Create data file in `src/data/` (e.g., `projects.ts`)
3. Export array or functions to access data
4. Import and use in pages

### Styling Patterns
- Container: `container mx-auto px-6 py-12`
- Cards: `bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6`
- Buttons: `text-emerald-600 hover:underline`
- Responsive grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

## Important Notes
- The `react/` folder contains legacy React code - **do not use it**
- All new development should use Astro components in `src/`
- Build output goes to `dist/` (gitignored)
- Static assets go in `public/` directory