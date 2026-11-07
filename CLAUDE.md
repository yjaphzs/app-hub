# CLAUDE.md

Guidance for Claude Code (and other AI agents) working in this repository.

## What this is

**App Hub** is a one-page launcher for my web apps, GWA Calculator and Expense Tracker.
Live at <https://app-hub.yjaphzs.xyz>. It has no accounts and no backend.

- **Stack:** Vite 7 single-page app, React 19, TypeScript, Tailwind CSS v4, shadcn/ui
  (radix-nova style), `motion` for entrance animations, `vaul` for phone bottom sheets.
- **Output:** `npm run build` writes `build/`. GitHub Pages serves it from the `gh-pages` branch.
- **Look:** the same tokens as the two apps (amber primary, the same surfaces, a 0.625rem
  radius), with Roboto and Martian Mono self-hosted through `@fontsource-variable`. Use the
  tokens (`primary`, `muted-foreground`, …); never hard-code amber in new UI.

## Hard rules

- **Size and focus:** at most **200 lines of code per file** under `src/` (blank lines and
  comments excluded), one responsibility per file. ESLint `max-lines` enforces it as an error.
  `src/components/ui/**` and tests are exempt.
- **Copy:** no em dashes ("—") in user-facing text. En dashes only in number ranges.
- **Package manager:** `npm` only.
- **Claims about the apps** (descriptions, tags, perks, image stickers) must match what the
  apps actually do. GWA Calculator has no service worker, so don't call it offline-capable;
  Expense Tracker is a PWA and does work offline.

## Commands

| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Build (`build/`) | `npm run build` |
| Preview the build | `npm run preview` |
| Lint (includes the 200-line rule) | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Unit tests (Vitest, pure logic) | `npm test` |

Run lint, typecheck, and tests before committing; the deploy workflow runs them too.

## Layout

- `src/App.tsx` composes the page: `SiteHeader`, `Hero`, the app grid, `Perks`, `SiteFooter`.
- `src/components/layout/`: the header, the footer, and the Ko-fi link (matching the apps).
- `src/components/home/`: the hero and the "Every app comes with" perks.
- `src/components/apps/`: `AppCard`, `AppDetails` (a `ResponsiveDialog`), `ScreenshotStrip`.
- `src/components/appearance/`: the Appearance dialog (mode, color schemes, custom accent).
- `src/components/shared/responsive-dialog.tsx`: a bottom sheet below 768px, a dialog above.
- `src/data/apps.ts`: every app's name, URL, copy, tags, icon, card art, and screenshots.
  **To add an app, add an entry here** plus its images in `src/assets/images/<id>/`.

## Color schemes

Ported from the apps (`src/lib/appearance/`), saved on this device only:

- `schemes.ts` / `derive-scheme.ts` derive the accent tokens from one seed color with WCAG
  checks (`color.test.ts`). Amber is the default and lives in `index.css`.
- `scheme-store.ts` applies a scheme (a `<style>` plus `data-scheme` on `<html>`), recolors the
  tab icon (`favicon.ts`), and saves it under the `app_hub_scheme*` keys.
- The header logo is an SVG (`components/layout/brand-mark.tsx`) colored by `--logo-tile` and
  `--logo-mark`: the accent on black, swapped when the accent is too dark for black (Black in
  light mode). Keep its paths in step with `favicon.ts`.
- Light/dark/system lives in `components/theme-provider.tsx` (key `app-hub-theme`).
- `prepaint-script.ts` restores both before the first paint. `vite.config.ts` injects it at the
  top of `<head>`, so nothing flashes. Keep it in step with the keys in `scheme-keys.ts`
  (`prepaint-script.test.ts` runs it against a fake page).

## Images

- Card art: `src/assets/images/<id>/card.webp`, 1200 × 900.
- Screenshots: `screenshots/screenshot1-6.webp`, 780 × 1526 (390 × 763 phone screens at 2x).
- Share image: `public/og-image.jpg`, 1200 × 630, JPEG for social sites.

They are made from real screens of each app with seeded demo data. Keep the sizes and
formats when you replace them, and keep the screenshot `alt` text in `apps.ts` accurate.

## Deployment

See the README's Deployment section. Pushes to `main` deploy. The custom domain needs a
`CNAME` record `app-hub` → `yjaphzs.github.io` at the DNS host (Namecheap) and the domain set
in the repo's Pages settings.

## Conventions

- Named exports (except `App`), kebab-case file names, 2-space indentation, no semicolons,
  double quotes (Prettier: `npm run format`).
- Accessible by default: `aria-label` on icon-only buttons, 44px tap targets on phones, and
  respect reduced motion (`MotionConfig reducedMotion="user"`, `motion-safe:` / `motion-reduce:`).
- Commits: [Conventional Commits](https://www.conventionalcommits.org/), `type(scope): summary`.
