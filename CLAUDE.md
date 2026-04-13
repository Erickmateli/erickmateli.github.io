# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run build:dev    # Dev-mode build
npm run lint         # ESLint
npm run test         # Run unit tests (Vitest)
npm run test:watch   # Vitest watch mode
npm run preview      # Preview production build
```

Playwright E2E tests are configured in `playwright.config.ts` and `playwright-fixture.ts`.

## Architecture

This is a **Vite + React + TypeScript** personal portfolio site for a Product Designer/Frontend Engineer.

**Stack:** React 18, TypeScript, Vite (SWC), React Router v6, Tailwind CSS, shadcn/ui (Radix UI), TanStack React Query, Vitest, Playwright.

### Routing (`App.tsx`)

```
/                          → Index (home/landing page)
/case-study/aspin          → FeaturedCaseStudy (hardcoded page)
/case-study/yellow-pages   → YellowPagesCaseStudy (hardcoded page)
/case-study/:slug          → CaseStudyDetail (data-driven from lib/caseStudies.ts)
```

Featured case studies (Aspin, Yellow Pages) have their own dedicated page components rather than using the dynamic route. New featured case studies follow this pattern.

### Case Study Data (`src/lib/caseStudies.ts`)

Case studies are stored as a TypeScript const array. Each entry has: `slug`, `number`, `title`, `subtitle`, `context`, `problem`, `role`, `approach[]`, `solution[]`, `outcome[]`, `reflection`, `images[]`. The dynamic route (`CaseStudyDetail.tsx`) looks up by slug.

Featured case studies have dedicated card components in `src/components/portfolio/` (e.g., `FeaturedCaseStudyCard.tsx`, `FeaturedYellowPagesCard.tsx`) rendered in `CaseStudiesSection.tsx`.

### Styling

- Tailwind CSS with custom design tokens defined as CSS variables in `src/index.css`
- Color system uses HSL variables: `--primary`, `--secondary`, `--accent`, `--muted`, `--card`, etc.
- Fonts: **DM Serif Display** (serif headings) + **Inter** (sans-serif body)
- Dark mode via Tailwind `class` strategy
- Custom animations: `fade-up`, `accordion-up/down`
- Container max-width: 1400px

### Component Organization

- `src/components/portfolio/` — domain-specific portfolio components (sections, cards, nav)
- `src/components/ui/` — shadcn/ui primitives (do not modify these manually; use shadcn CLI to add/update)
- `src/hooks/` — custom hooks (`use-mobile.tsx`, `use-toast.ts`)

### TypeScript Config

`noImplicitAny: false` and `strictNullChecks: false` — the project uses loose type checking intentionally.
