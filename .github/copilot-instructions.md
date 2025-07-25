# Copilot Instructions for AI Agents

## Overview
This is an Astro-based static site. The project is strictly static (no backend/server code) and relies on Astro conventions with custom organization for components and styles. Tailwind CSS is the main styling tool.

## Architecture & Structure
- **Pages:** All routes are `.astro` files in `src/pages/`. Main entry: `src/pages/index.astro`. Subroutes (e.g., `/projects`) are folders with their own `index.astro`.
- **Components:** Reusable UI elements in `src/components/` (e.g., `Header.astro`, `Hero.astro`, `Projects.astro`, `ProjectCard.astro`). Import with relative paths.
- **Layouts:** Shared layout logic in `src/layouts/` (e.g., `Layout.astro`). Layout handles `<html>`, `<head>`, theme, and language logic.
- **Styles:** Global and container-specific styles in `src/styles/` (`global.css`, `container.css`, `gos.css`). Tailwind is configured via `tailwind.config.js` and used via utility classes in `.astro` files.
- **Static Assets:** Images and icons go in `public/` (SVG icons as `.astro` components).
- **Data:** Project data is in `src/data/projects.ts` as a typed array, imported into pages/components.

## Patterns & Conventions
- **Component Usage:** UI is split into small `.astro` components. Import with relative paths (e.g., `import Header from '../components/Header.astro'`).
- **Styling:** Use Tailwind utility classes. For custom styles, import CSS from `src/styles/`.
- **Theme System:** Theme palettes are defined via CSS variables in `global.css` (see `:root[data-theme=...]`). Theme switching uses classes and transitions (e.g., `.theme-sun-enter`, `.theme-moon-leave`). Palette and theme are set via localStorage and `<html>` attributes.
- **Language Switch:** Language toggling is handled via `.lang-en`, `.lang-ru` classes and the `lang` attribute on `<html>`. Use `<span class="lang-ru">...</span><span class="lang-en">...</span>` for bilingual text.

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
If any conventions or workflows are unclear, please request clarification or examples from the user.
