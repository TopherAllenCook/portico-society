# Verve MD brand assets

Wordmark + LinkedIn banner + mark. Hand-built SVG, exported to retina PNG via Playwright. No AI image generation here, because wordmarks need typography to be exact.

## Preview

Run the app and open [/brand](http://localhost:3000/brand). Shows every asset with the right background, plus the palette swatches.

## Files

| File | Use |
|---|---|
| `wordmark-light.svg/.png` | Default. Ivory or sand background. |
| `wordmark-dark.svg/.png` | On charcoal, deep terracotta, or photographic dark. |
| `wordmark-mono.svg/.png` | One-color contexts: embossing, fax, monochrome print. |
| `mark.svg/.png` | Avatar / favicon / app icon. 1:1. |
| `favicon-512.png` | 512×512 PNG ready for `app/favicon.ico` workflow. |
| `linkedin-banner.svg/.png` | 1584×396, personal-profile cover. |
| `linkedin-banner-company.png` | 1128×191, company-page cover (right pillar column crops out). |

## Re-export PNGs

```bash
npm run brand:export
```

Headless Chromium renders each SVG with Fraunces loaded from Google Fonts, screenshots at 2x–8x scale.

## Typography

- **Display**: Fraunces (opsz variable), weights 500–700. Loaded as Next font via `app/layout.tsx`.
- **Body**: system sans (`-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif`).
- **Mono**: `ui-monospace, 'SF Mono'`.

## Palette (hex, for non-CSS contexts like Canva / Figma)

| Token | Hex | Role |
|---|---|---|
| Ink | `#211c18` | Primary text + dark surfaces |
| Ivory | `#f1ead9` | Primary background |
| Cinnabar | `#a14823` | Accent. Use sparingly. |
| Cinnabar pale | `#d68d63` | Accent on dark surfaces |
| Sand | `#e6d9b8` | Editorial accent block |
| Stone | `#e0d8c8` | Section dividers |

CSS variables in `app/globals.css` are the source of truth.

## LinkedIn banner taglines

The banner ships with: *"Brand strategy for longevity, concierge, and aesthetic medicine."*

Other voice-aligned alternates if you want to swap (edit `linkedin-banner.svg` line ~38):

- *"The AI Audit. Then the brand."*
- *"Brand strategy for clinics that compound."*
- *"Visibility, voice, and verve for premium medicine."*
- *"Restraint over abundance."*

After editing the SVG, run `npm run brand:export` to regenerate the PNG.

## Hard rules

- Cinnabar is reserved for the `MD` in the wordmark, the dot on the mark, and accents — never large blocks of body text.
- No wedding-photography brand assets in this tree. See [memory/feedback_wedding_domain_separation.md](../../memory/feedback_wedding_domain_separation.md).
- These are VerveMD assets only. Utah Photo Co lives elsewhere.
