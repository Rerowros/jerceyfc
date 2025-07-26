
# Copilot Instructions for AI Agents

## Overview
This is a static portfolio site built with Astro and Tailwind CSS. There is **no backend/server code**; all logic is client-side or static. The project is organized for clarity and maintainability, with a focus on reusable components, theme/language switching, and smooth SPA-like navigation.

## Architecture & Structure
- **Pages:** All routes are `.astro` files in `src/pages/`. Main entry: `src/pages/index.astro`. Subroutes (e.g., `/projects`) are folders with their own `index.astro`.
- **Components:** UI is split into small, reusable `.astro` components in `src/components/` (e.g., `Header.astro`, `Hero.astro`, `ProjectCard.astro`). Import using relative paths.
- **Layouts:** Shared layout logic in `src/layouts/` (see `Layout.astro`). Layout manages `<html>`, `<head>`, theme, and language attributes. All pages use this layout.
- **Styles:** Tailwind CSS is the main styling tool. Global and custom styles are in `src/styles/` (`global.css`, `gos.css`). Tailwind config: `tailwind.config.js`.
- **Static Assets:** Images and icons are in `public/`. SVG icons are often `.astro` components for easy reuse.
- **Data:** Project data is a typed array in `src/data/projects.ts`, imported into pages/components.

## Key Patterns & Conventions
- **Component Usage:** Always import components with relative paths (e.g., `import Header from '../components/Header.astro'`).
- **Styling:** Use Tailwind utility classes in `.astro` files. For custom styles, import CSS from `src/styles/`.
- **Theme System:** Theme palettes are defined via CSS variables in `global.css` under `:root[data-theme=...]`. Theme switching uses classes and transitions (e.g., `.theme-sun-enter`, `.theme-moon-leave`). Theme is set via localStorage and `<html>` attributes. See `theme-init.js` and `Layout.astro` for implementation.
- **Language Switch:** Bilingual text uses `<span class="lang-ru">...</span><span class="lang-en">...</span>`. The `<html>` tag and body classes control language. See `Layout.astro` for logic.
- **SPA Navigation:** Uses `<ClientRouter />` from `astro:transitions` for smooth page transitions. Re-initialize scroll animations on `astro:page-load` (see inline script in `Layout.astro`).
- **Scroll Animations:** Elements with `.scroll-animate` are animated via IntersectionObserver (see inline script in `Layout.astro`).

## Developer Workflows
- **Build:** Run `npm run build` to generate static files.
- **Dev Server:** Run `npm run dev` for local development with hot reload.
- **Preview:** Run `npm run preview` to serve the built site locally.
- **No tests:** There are no automated tests or test runners configured.

## Integration Points & External Dependencies
- **Astro:** Static site generator. Config: `astro.config.mjs`.
- **Tailwind CSS:** Utility-first CSS. Config: `tailwind.config.js`.
- **Fonts:** Uses Inter from Google Fonts (see `<head>` in `Layout.astro`).
- **Icons:** SVGs in `public/` and as `.astro` components.

## Examples
- Add a new page: create `src/pages/about.astro`.
- Add a new component: create `src/components/Foo.astro` and import it in a page or layout.
- Update global styles: edit `src/styles/global.css`.
- Add a new theme: extend CSS variables in `global.css` under `:root[data-theme=...]`.
- Add a new project: update `src/data/projects.ts` and use `<ProjectCard project={p} />` in a page/component.

## Key Files & Directories
- `src/pages/` — main routes
- `src/components/` — UI building blocks
- `src/layouts/` — shared layouts
- `src/styles/` — CSS and Tailwind
- `src/data/` — TypeScript data
- `public/` — static assets
- `astro.config.mjs` — Astro config
- `tailwind.config.js` — Tailwind config
- `tsconfig.json` — TypeScript config

---
If any conventions or workflows are unclear, request clarification or examples from the user.
