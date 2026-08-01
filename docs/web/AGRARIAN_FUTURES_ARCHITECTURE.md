# Agrarian Futures Web Architecture

## Boundary

The web interface is an additive presentation layer inside `MelodicBloom/philly-civic-ai`. Existing Markdown personas, grant materials, and context sources remain canonical knowledge artifacts. The React application does not silently convert proposals, candidate partners, simulated telemetry, or editorial claims into accepted evidence.

## Runtime

- Vite + React single-page application
- Tailwind CSS v3 LTS for compatibility with the supplied utility vocabulary and typography plugin
- Lucide React icons
- Hash-addressable views: `#sitemap`, `#article`, `#diagram`, `#interactive`
- Static Vercel-compatible build in `dist/`

## Validation layers

1. ESLint validates JavaScript and React hook usage.
2. Vite creates the production bundle and source map.
3. `scripts/visual-audit.mjs` opens every primary view at mobile, tablet, and desktop dimensions.
4. The audit records screenshots, browser errors, page errors, visibility, content completeness, and unintended overflow.
5. `scripts/termux-visual-validate.sh` uses Termux's system Chromium and writes all evidence into `visual-artifacts/` inside the repository, avoiding Android `/tmp` permission assumptions.

## Evidence labels

The current UI includes editorial and policy hypotheses. Copy should retain distinctions among:

- live or verified evidence
- simulated telemetry
- proposed governance mechanisms
- candidate partners or research targets
- narrative framing

Before public policy publication, quantitative claims should be moved into source-backed records with citation, jurisdiction, date, unit, method, uncertainty, and review status.
