# AGENTS.md

## Commands
- **Install**: `pnpm install`
- **Dev**: `pnpm dev` (localhost:4321)
- **Build/typecheck**: `pnpm build` (run after changes to verify correctness)
- **Preview**: `pnpm preview`
- No test framework configured.

## Architecture
Astro 5.x static site with file-based routing. Pages in `src/pages/`, reusable components in `src/components/`, single layout in `src/layouts/Layout.astro`. Static data as TypeScript modules in `src/data/` with types in `src/data/types.ts`. Blog content collections in `src/content/blog/`. Utilities in `src/utils/`. Global styles in `src/styles/global.css`. Integrations: React (sparingly), TailwindCSS 4.x (via Vite plugin), sitemap.

## Code Style
- Prefer Astro components over React for static content.
- Component naming: PascalCase (e.g., `Header.astro`). Pages: kebab-case. Data files: camelCase.
- Styling: TailwindCSS utility classes with dark mode (`dark:` prefix). Scoped `<style>` tags allowed in `.astro` files.
- Data flow: import static data from `src/data/` directly into pages (no client-side fetching).
- TypeScript with strict config (`astro/tsconfigs/strict`). JSX uses `react-jsx`.
- Use `pnpm` as the package manager.
- Wrap page content in `<Layout title="..." description="...">`.
- See `.github/copilot-instructions.md` for detailed conventions and common task guides.
