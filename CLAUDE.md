# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build, then scripts/route-pages.mjs (per-route HTML + sitemap)
npm run build:dev    # Dev-mode build
npm run lint         # ESLint
npm run test         # Run unit tests (Vitest)
npm run test:watch   # Vitest watch mode
npm run preview      # Preview production build
```

Playwright E2E tests are configured in `playwright.config.ts` and `playwright-fixture.ts`.

Deployed to GitHub Pages by `.github/workflows/deploy.yml` on push to `main`. EmailJS keys come from repo secrets (`VITE_EMAILJS_*`); locally they come from `.env` (gitignored).

## Architecture

**Vite + React + TypeScript** portfolio for a Senior Product Designer with a frontend background.

**Stack:** React 18, TypeScript, Vite (SWC), React Router v6, Tailwind CSS, lucide-react icons, Vitest, Playwright. Analytics: PostHog (lazy-loaded) and EmailJS notifications.

### Routing (`App.tsx`)

```
/                               → Index (home)
/case-study/yellow-pages        → YellowPagesCaseStudy
/case-study/aspin               → FeaturedCaseStudy (ASPIN)
/case-study/aspin-marketplace   → AspinMarketplaceCaseStudy (tabbed)
/dev/case-study-kit             → dev-only preview of the case study blocks (not in production builds)
```

Case study pages are lazy-loaded. Route changes scroll to the top, or to `#hash` targets. When adding a case study:
1. Add the page and route in `App.tsx`.
2. Add it to `src/lib/case-study-meta.ts` (order drives "Next case study").
3. Add its card to the `caseStudies` list in `src/components/portfolio/CaseStudiesSection.tsx`.
4. Add its title, description and share image to `scripts/route-pages.mjs` (link previews + sitemap), with a 1200×630 image in `public/og/`.

### Case study structure

Every case study uses the same skeleton: hero → `CaseStudySummary` (TL;DR, reading time, Role/Team/Timeline/Status/Outcome) → hero screenshot → numbered chapters → `CaseStudyEnd` (next case study, contact, footer).

Shared blocks live in `src/components/case-study/`: `Chapter`, `ProblemCards`, `ProcessStepper`, `DecisionCards`, `BeforeAfterSlider`, `StatCounters`, `Takeaways`, `Reveal`, `ReadingProgress`; hooks in `motion.ts`. The Marketplace page shows one chapter per tab, driven by the URL hash.

### Content rules

- Numbers must match the CV (`public/Erick_Mateli_Senior_Product_Designer.pdf`).
- Screenshots of real platforms must have personal and partner details blurred before they're added.
- Contact links (email, LinkedIn, resume) are set in `src/lib/links.ts`.

### Analytics

- `src/lib/analytics.ts` loads PostHog after the page is idle and skips bots; use `capture()`.
- `src/lib/track-event.ts` sends every event to PostHog and an EmailJS notification.
- `src/components/portfolio/ContactForm.tsx` sends enquiries with the EmailJS template in `VITE_EMAILJS_CONTACT_TEMPLATE_ID` (variables: from_name, reply_to, company, enquiry_type, message, page, time). Without it, the form opens a pre-filled email instead.
- `src/hooks/use-visit-notification.ts` sends one visit email per session.

### Styling

- Tailwind CSS with design tokens as HSL CSS variables in `src/index.css` (`--primary`, `--muted-foreground`, etc.). `--muted-foreground` is tuned to pass WCAG AA on `--background` and `--card`.
- Fonts: **DM Serif Display** (headings) + **Inter** (body), loaded in `index.html`.
- Respect `prefers-reduced-motion` (handled globally in `index.css` and in `motion.ts`).

### TypeScript Config

`noImplicitAny: false` and `strictNullChecks: false` — the project uses loose type checking intentionally.
