# Verve MD brand assets

Wordmark + square mark + LinkedIn banner. Hand-built SVG, exported to retina PNG via Playwright. No AI image generation here, because wordmarks need typography to be exact.

These match the live site (vervemd.com): the cinematic cream / charcoal / teal system, with a little orange, set in Space Grotesk + Chivo Mono.

## Preview

Run the app and open [/brand](http://localhost:3000/brand) for the full brand guide: logo, color, typography, design language, voice, and downloads.

## Files

| File | Use |
|---|---|
| `wordmark-light.svg/.png` | Default. Cream or stone background. |
| `wordmark-dark.svg/.png` | On charcoal or photographic dark backgrounds. |
| `wordmark-mono.svg/.png` | One-color contexts: embossing, fax, monochrome print. |
| `mark.svg/.png` | Avatar / favicon / app icon. 1:1. |
| `favicon-512.png` | 512×512 PNG ready for the `app/favicon.ico` workflow. |
| `linkedin-banner.svg/.png` | 1584×396, personal-profile cover. |
| `linkedin-banner-company.png` | 1128×191, company-page cover (right column crops out). |

## Re-export PNGs

```bash
npm run brand:export
```

Headless Chromium renders each SVG with Space Grotesk + Chivo Mono loaded from Google Fonts, then screenshots at 2x–8x scale.

## Typography

- **Display + body**: Space Grotesk (weights 400–700). Loaded as a Next font via `app/layout.tsx` (`--font-display-family`).
- **Labels + captions**: Chivo Mono (weights 400–500), uppercase with ~0.14em tracking (`--font-mono-family`).

## Palette (hex, for non-CSS contexts like Canva / Figma)

| Token | Hex | Role |
|---|---|---|
| Cream | `#F3ECDA` | Primary background (light sections) |
| Charcoal | `#1F2624` | Primary text + dark sections |
| Teal | `#1F9E93` | Primary accent |
| Teal deep | `#117A70` | Accent text on cream (contrast) |
| Orange | `#EF6A2C` | Secondary accent. A little only. |
| Stone | `#E3D9C1` | Secondary surface + dividers |

CSS variables in `app/globals.css` are the source of truth.

## LinkedIn banner positioning

The banner ships with: *"Get found in AI search. Answer every call. Book more jobs."*

Other voice-aligned alternates (edit the tagline line in `linkedin-banner.svg`):

- *"The marketing department for home service businesses."*
- *"Stop renting leads. Own your pipeline."*
- *"AI search, paid media, and 24/7 lead capture."*

After editing the SVG, run `npm run brand:export` to regenerate the PNG.

## Hard rules

- The wordmark dot is always orange. That is the one place orange appears in the logo.
- Orange is a secondary accent only: the wordmark dot, button square bullets, the icon hover blink, the hero ember. Never large blocks or body text.
- Teal is the primary accent. On cream surfaces, use **teal deep** (`#117A70`) for text-level contrast.
- These are Verve MD assets only. Utah Photo Co and CCP live elsewhere.
