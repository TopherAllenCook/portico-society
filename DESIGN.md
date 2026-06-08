---
name: Verve MD Design System
description: Editorial terracotta design system for a home services marketing agency.
---

# Design System: Verve MD

## 1. Overview

**Creative North Star: "The Trade Journal"**

Verve MD occupies the register of a specialized trade publication for home services: warm, authoritative, and specific. The aesthetic is editorial restraint: thin rules, generous whitespace, warm ivory surfaces, and a single committed terracotta accent. Typography and real trade photography do the heavy lifting. Motion is choreographed and purposeful, never decorative.

The brand is warm without being soft. Terracotta (`oklch(51% 0.145 38)`) reads as authority and confidence rather than contractor red-and-yellow or startup cream. Fraunces, a high-contrast optical serif, carries the display voice. System-ui handles body copy and UI labels. System mono handles eyebrow tags and metadata.

**Key Characteristics:**
- Sand and ivory warm surfaces, never cold clinical white
- Terracotta cinnabar as the single committed accent — data, CTAs, structural emphasis
- Warm charcoal ink for dark sections
- Fraunces display serif + system-ui body + system mono
- Scroll-driven reveals with exponential ease-out curves
- Thin horizontal rules as structural dividers — never side-stripe borders

## 2. Colors

### Core Tokens (defined in `app/globals.css` `@theme`)

| Token | Value | Usage |
|---|---|---|
| `--color-ivory` | `oklch(95% 0.016 82)` | Primary light surface, default page background |
| `--color-ink` | `oklch(14% 0.012 50)` | Dark sections, hero, footer background |
| `--color-cinnabar` | `oklch(51% 0.145 38)` | Terracotta — CTAs, data emphasis, accent |
| `--color-cinnabar-dark` | `oklch(41% 0.12 38)` | Cinnabar hover/active state |
| `--color-cinnabar-pale` | `oklch(93% 0.020 62)` | Warm blush tint (reserved for subtle highlights) |
| `--color-cinnabar-on-dark` | `oklch(72% 0.13 38)` | Cinnabar at AA contrast on ink backgrounds |
| `--color-cta-surface` | `oklch(20% 0.014 50)` | Warm dark card surface for CTA sections |
| `--color-stone` | `oklch(90% 0.014 78)` | Warm light gray — alternating section background |
| `--color-stone-mid` | `oklch(72% 0.010 65)` | Warm mid-tone (dividers, decorative) |
| `--color-sand` | `oklch(87% 0.026 82)` | Kraft/sand — editorial accent background (calculator) |

### Decorative Non-Text Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-ink-rule` | `oklch(14% 0.012 50 / 0.1)` | Rules and dividers on light surfaces |
| `--color-ink-faint` | `oklch(14% 0.012 50 / 0.08)` | Very subtle dividers on light |
| `--color-ink-ghost` | `oklch(14% 0.012 50 / 0.06)` | Ghost-level separators |
| `--color-ink-icon` | `oklch(14% 0.012 50 / 0.35)` | Icons on light surfaces |
| `--color-ivory-subtle` | `oklch(95% 0.016 82 / 0.07)` | Borders on dark surfaces |
| `--color-ivory-dim` | `oklch(95% 0.016 82 / 0.12)` | Decorative on dark |
| `--color-ivory-muted` | `oklch(95% 0.016 82 / 0.25)` | Borders on dark |
| `--color-ivory-glow` | `oklch(95% 0.016 82 / 0.6)` | Focus rings on dark surfaces |

### Text Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-body-text` | `oklch(38% 0.008 50)` | Body prose on light surfaces |
| `--color-label-text` | `oklch(42% 0.008 55)` | Eyebrow labels, meta on light surfaces |
| `--color-ink-muted` | `oklch(55% 0.006 55)` | Muted display text on light (large text only) |
| `--color-body-text-on-dark` | `oklch(79% 0.008 70)` | Body prose on ink/cta-surface backgrounds |
| `--color-label-text-on-dark` | `oklch(65% 0.006 65)` | Labels/meta on dark backgrounds |

### Color Rules

**On ivory, stone, or sand (light) backgrounds:** Use `--color-body-text` or `--color-label-text` for all text. Use `--color-ink-muted` only for large decorative display text. Never set text color via raw oklch values.

**On ink or cta-surface (dark) backgrounds:** Use `--color-body-text-on-dark` for body, `--color-label-text-on-dark` for labels, `--color-ivory` for headings.

**Cinnabar on dark:** Use `--color-cinnabar-on-dark` — base cinnabar fails AA against ink at small sizes.

**Focus rings on dark surfaces:** Use `--color-ivory-glow`.
**Focus rings on light surfaces:** Use `--color-cinnabar`.
**Focus rings on cinnabar surfaces:** Use `--color-ivory`.

### Section Background Rhythm

| Section | Background |
|---|---|
| NavVerve | `ink` gradient (fixed overlay) |
| HeroVerve | `ink` |
| LogoStripVerve | `ink` |
| PainPointsVerve | `ivory` |
| ResultsVerve | `ink` |
| PackagesOverviewVerve | `ivory` |
| CalculatorVerve | `sand` |
| AIToolsVerve | `stone` |
| AEOBlockVerve | `ink` |
| TestimonialsVerve | `stone` |
| WhoWeWorkWithVerve | `ivory` |
| BottomCTAVerve | `cta-surface` |
| FooterVerve | `ink` |

No two identical consecutive surfaces.

## 3. Typography

### Fonts

```css
--font-display: var(--font-fraunces), Georgia, serif;
--font-body:    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
--font-mono:    ui-monospace, 'SF Mono', 'Cascadia Code', monospace;
```

One Google Font request: Fraunces (optical size axis, latin subset). Body and mono use the system stack.

### Scale Tokens

```css
--text-display:  clamp(3rem, 8vw, 6.5rem);
--text-headline: clamp(2rem, 4vw, 3.25rem);
--text-title:    clamp(1.125rem, 2vw, 1.5rem);
--text-body:     1.0625rem;
--text-label:    0.75rem;
```

### Usage Rules

- **Display** (`font-display font-semibold`, `letterSpacing: '-0.03em'`): hero headline, section headings, data callouts.
- **Body** (`font-body`, `lineHeight: 1.65`, `maxWidth: 48–68ch`): all prose.
- **Label** (`font-mono text-xs font-medium uppercase tracking-[0.14–0.18em]`): eyebrows, metadata, form labels, calculator labels.
- **Tabular numerals** (`font-display font-semibold tabular-nums`): calculator output values, stat numbers.

## 4. Layout

### Container

`mx-auto max-w-5xl` with `px-6 py-24 lg:px-16 lg:py-32`. Tighter on dense sections: `py-20`.

### Grid Patterns

- Two-column calculator: `lg:grid-cols-2` split by a `borderTop` rule
- Three-column pricing: `md:grid-cols-3 gap-4`
- Two-column testimonials: featured full-width ink card + `md:grid-cols-2` supporting pair
- Three-stat hero row: `sm:flex-row sm:gap-12`
- À la carte table: `grid-cols-[1fr_auto]` label + price

### Structural Dividers

Items separated by `borderTop: var(--color-ink-rule)` horizontal rules on light surfaces. No card borders on content grids — borders only on CTA surfaces and form containers.

## 5. Motion

### Easing

```css
--ease-expo:  cubic-bezier(0.16, 1, 0.3, 1);
--ease-quart: cubic-bezier(0.25, 1, 0.5, 1);
```

No bounce or elastic. All transitions ease-out exponential.

### Scroll Reveal

CSS-driven via `[data-reveal]` and `[data-reveal-soft]` attributes.
- `data-reveal`: full visibility:hidden → visible transition (hides from AT until in view)
- `data-reveal-soft`: opacity-only (headings remain in AT heading tree before scroll)
- Duration: 0.85s ease-expo
- `prefers-reduced-motion`: pending state bypassed entirely

### Hero Entrance

`requestAnimationFrame` triggers a single `useState` toggle on mount. Staggered delays (0ms, 100ms, 220ms, 340ms, 460ms) on each element. Uses `opacity + translateY(1.5rem)` — no layout properties animated.

### Calculator

No animation — values update synchronously via `useMemo`. `aria-live="polite"` on output cells for screen reader announcement.

### Marquee

`animation: marquee 40s linear infinite` applied only inside `@media (prefers-reduced-motion: no-preference)`.

## 6. Accessibility Standards

- WCAG 2.1 AA target on all text
- All interactive elements have `focus-visible:outline` with explicit token-based outline color
- Mobile nav: Escape key closes, `aria-expanded` on trigger, `aria-label` on button
- `[data-reveal]` uses `visibility: hidden` to prevent invisible-but-focusable elements before scroll
- `prefers-reduced-motion` respected in all animated components
- `aria-live="polite"` + `aria-atomic="true"` on live calculator outputs
- Inline form validation with `aria-describedby` linking fields to error messages
- `role="alert"` on server-side error messages
- All major sections have `aria-labelledby` pointing to their visible heading

## 7. Components

### CTAButton

```tsx
<CTAButton href="/audit" label="Get Free Audit" variant="primary" />
// variants: primary | secondary | ghost
// primary: cinnabar bg, ivory text
// secondary: ivory-muted border, ivory text (for dark surfaces)
// ghost: body-text color, ink hover (for light surfaces)
```

### CalculatorVerve

Live ad-spend ROI calculator. Four inputs: monthly ad budget, target cost per lead, lead close rate, average job value. `useMemo` computes projected leads, new jobs per month, monthly revenue, and return on ad spend, plus a break-even CPL strip. Background `--color-sand`. Inputs use bottom-rule-only style with Fraunces font.

## 8. Absolute Bans

- Side-stripe borders (border-left/right > 1px as accent)
- Gradient text (background-clip: text + gradient)
- Glassmorphism decoratively
- Hero-metric template (big number SaaS stat grid)
- Identical card grids
- Modal as first thought
- `#000` or `#fff` — tint every neutral toward brand hue (chroma 0.005–0.016)
- Raw `oklch()` values inline in component files — always use CSS variable tokens
- Em dashes or `--` in copy
- Bounce or elastic easing
- `outline: none` without a replacement focus style
