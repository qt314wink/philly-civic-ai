# Agrarian Futures Interface

This branch adds the Agrarian Futures policy interface without replacing Philly Civic AI's existing Markdown knowledge base.

## Local development

```bash
npm install
npm run dev
```

## Production validation

```bash
npm run validate
npm run preview
```

## Termux visual validation

```bash
pkg update
pkg install nodejs-lts git curl x11-repo chromium
bash scripts/termux-visual-validate.sh
```

The first run creates `package-lock.json` because this repository previously had no Node application. Commit that generated lockfile before merging so CI can move from the guarded bootstrap path to `npm ci` only.

Artifacts are written to `visual-artifacts/`:

- `audit.json`
- `preview.log`
- screenshots for `sitemap`, `article`, `diagram`, and `interactive`
- mobile, tablet, and desktop viewport folders

Use `CHROMIUM_BIN=/custom/path` when Termux exposes Chromium at a nonstandard location. Add additional Chromium flags through `TERMUX_CHROMIUM_ARGS` only when required by the device.
