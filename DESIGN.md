---
name: Verve Clinic Marketing
description: AI visibility and patient acquisition marketing for longevity, concierge, and aesthetic medicine practices.
---

# Design System: Verve

## 1. Overview

**Creative North Star: "The Trade Journal"**

Verve occupies the register of a specialized financial or medical trade publication — the kind a practice owner reads twice. The aesthetic is editorial restraint: thin rules, generous whitespace, warm ivory surfaces, and a single committed accent color. Typography does the heavy lifting. Motion is choreographed and purposeful, not decorative.

The brand is warm without being soft. Cinnabar red-orange reads as authority and urgency rather than healthcare or startup. Fraunces — a high-contrast optical serif with swash variants — carries the display voice. The system sans (SF Pro / system-ui) handles body copy and UI labels. SF Mono / system mono handles eyebrow tags and metadata.

**Key Characteristics:**
- Ivory warm near-white as default surface — never cold clinical white
- Cinnabar (`oklch(42% 0.10 54)`) as the single committed accent — used on data, CTAs, and structural emphasis
- Stone (`oklch(91% 0.006 60)`) as a mid-surface for contrast sections
- Ink (`oklch(14% 0.006 30)`) as near-black for dark sections
- Fraunces display serif + system-ui body + system mono
- Scroll-driven reveals with exponential ease-out curves
- Thin horizontal rules as structural dividers — never side-stripe borders

## 2. Colors

### Core Tokens (defined in `app/globals.css` `@theme`)

| Token | Value | Usage |
|---|---|---|
| `--color-ivory` | `oklch(97% 0.008 75)` | Primary light surface, hero, footer |
| `--color-ink` | `oklch(14% 0.006 30)` | Dark sections, primary headings, near-black |
| `--color-cinnabar` | `oklch(42% 0.10 54)` | Data points, CTAs, structural emphasis |
| `--color-cinnabar-on-dark` | `oklch(70% 0.13 54)` | Cinnabar at AA contrast on ink backgrounds |
| `--color-cinnabar-pale` | `oklch(94% 0.024 65)` | Light cinnabar tint (reserved) |
| `--color-stone` | `oklch(91% 0.006 60)` | Mid-surface for contrast alternation |
| `--color-stone-mid` | `oklch(72% 0.006 55)` | Dividers, mid-tones |
| `--color-cta-surface` | `oklch(20% 0.012 40)` | BeginCTA dark surface (warmer than ink) |
| `--color-body-text` | `oklch(40% 0.006 30)` | Body prose on light surfaces — 5.97:1 vs ivory, 5.11:1 vs stone |
| `--color-label-text` | `oklch(42% 0.006 30)` | Eyebrow labels, mono tags on light surfaces — 5.4:1 vs ivory, 4.8:1 vs stone |

### Color Rules

**On ivory or stone (light) backgrounds:** Use `--color-body-text` or `--color-label-text` for all text. Never use `oklch(14% 0.006 30 / <opacity>)` for text — alpha-composited opacity fails WCAG AA below opacity 1.0.

**On ink or cta-surface (dark) backgrounds:** Semi-transparent ivory is acceptable. `oklch(97% 0.008 75 / 0.45)` and above passes WCAG AA against ink.

**Cinnabar on dark:** Use `var(--color-cinnabar-on-dark)` for small cinnabar text on dark backgrounds. Base cinnabar fails AA against ink at small sizes.

**Decorative non-text:** Thin rules use `oklch(14% 0.006 30 / 0.1)` on light, `oklch(97% 0.008 75 / 0.12)` on dark. No contrast requirement.

### Section Backgrounds

| Section | Background |
|---|---|
| Hero | `--color-ivory` |
| PhotoBand | `--color-cinnabar` |
| CostOfInvisibility | `--color-stone` |
| WhatWeEngineer | `--color-ivory` |
| Categories | `--color-stone` |
| HowWeWork | `--color-ivory` |
| SelectedWork | `--color-ink` |
| EngagementPaths | `--color-ink` |
| BeginCTA | `--color-cta-surface` |
| Footer | `--color-ivory` |

Rhythm: ivory → cinnabar → stone → ivory → stone → ivory → ink → ink → dark → ivory. Never two identical consecutive surfaces.

## 3. Typography

### Fonts

```css
--font-display: var(--font-fraunces), Georgia, serif;
--font-body:    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
--font-mono:    ui-monospace, 'SF Mono', 'Cascadia Code', monospace;
```

One Google Font request: Fraunces (`opsz` axis, `latin` subset). Body and mono use the system stack.

### Scale Tokens

```css
--text-display:  clamp(3rem, 8vw, 6.5rem);
--text-headline: clamp(2rem, 4vw, 3.25rem);
--text-title:    clamp(1.125rem, 2vw, 1.5rem);
--text-body:     1.0625rem;
--text-label:    0.75rem;
```

### Usage Rules

- **Display** (`font-display italic font-normal`): hero headline, cinnabar feature statements, major display moments. Never in nav or buttons.
- **Headline** (`font-display font-normal`, `letterSpacing: '-0.025em'`): section headings, phase titles, category names.
- **Body** (`font-body font-light`, `lineHeight: 1.65`, `maxWidth: 48–68ch`): all prose. Never bold.
- **Label** (`font-mono text-xs font-medium uppercase tracking-[0.14–0.18em]`): eyebrows, metadata, form labels.
- **Italic accent** (`font-display italic font-normal`): editorial pull quotes, confrontation lines. The Fraunces swash italic is the brand's literary signature.

## 4. Layout

### Container

`mx-auto max-w-5xl` with `px-6 py-24 lg:px-16 lg:py-36`. Nav uses `max-w-7xl`.

### Grid Patterns

- Two-column standard: `grid-cols-1 lg:grid-cols-2 lg:gap-24`
- Number-left stat rows: `grid-cols-1 lg:grid-cols-[auto_1fr] lg:gap-20`
- HowWeWork: `grid-cols-1 lg:grid-cols-[13rem_1fr]`

### No Cards

Items are separated by thin horizontal `borderTop` rules, not card containers. `border: 1px solid` appears only in BeginCTA blockquote and form-submitted state.

## 5. Motion

### Easing

```css
--ease-expo:  cubic-bezier(0.16, 1, 0.3, 1);
--ease-quart: cubic-bezier(0.25, 1, 0.5, 1);
```

No bounce or elastic. All transitions ease-out exponential.

### RevealOnScroll

CSS-driven via `[data-reveal]` attribute. Pending: `visibility: hidden; opacity: 0; transform: translateY(1.25rem)`. Done: transitions to visible over 0.85s. `prefers-reduced-motion` skips the pending state entirely.

### AnimatedStat

IntersectionObserver triggers RAF cubic-eased count-up (0 → value, 1200–1400ms). Jumps to final value immediately under reduced motion.

### Marquee

`animation: marquee 40s linear infinite` applied only via `@media (prefers-reduced-motion: no-preference)`.

## 6. Accessibility

- WCAG 2.1 AA target on all text
- All interactive elements have `focus-visible:outline` rings
- Mobile nav: focus trap, Escape closes, aria-modal, role=dialog
- RevealOnScroll uses `visibility: hidden` (not just opacity 0) to prevent invisible-but-focusable elements
- prefers-reduced-motion respected in all animated components
- AnimatedStat uses `aria-hidden` on numeral + `sr-only` sibling with full text
- Semantic landmarks: header, nav, main, footer, section with aria-label

## 7. Absolute Bans

- Side-stripe borders (border-left/right > 1px as accent)
- Gradient text (background-clip: text + gradient)
- Glassmorphism decoratively
- Hero-metric template (big number grid)
- Identical card grids
- Modal as first thought
- `#000` or `#fff` — tint every neutral toward brand hue
- Opacity-based ink text on light backgrounds — use solid tokens instead
- Bold weight humanist sans in body or UI
- Em dashes or `--` in copy
- Bounce or elastic easing
