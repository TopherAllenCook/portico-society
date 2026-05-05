<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

---
name: Portico Society
description: Precision marketing for luxury service providers.
---

# Design System: Portico Society

## 1. Overview

**Creative North Star: "The Antiquarian Provocateur"**

Portico Society borrows its visual authority from heritage institutions — the weight of architectural stone, the restraint of a private museum catalog, the permanence of something built to last — and then uses that authority to challenge the status quo of how luxury brands market themselves. The surface has the gravity of terracotta and aged parchment. The voice has the edge of a provocation. Neither quality apologizes for the other.

Color is committed: the oxidized terracotta signature carries 30–60% of key surfaces rather than appearing sparingly as an accent. This is not a neutral palette with a color wink. The brand commits to its hue the way a terracotta vessel commits to its material. On field sections, hero surfaces, and typographic moments, the color is the brand. Supporting neutrals are warm parchment and deep inkwell near-black — never pure white, never pure black.

Typography is a deliberate pairing: a high-contrast sculptural serif (thin strokes, dramatic weight differential, classical optical presence) carries display and headline weight. A warm humanist sans handles body, captions, and UI text — approachable enough to read, restrained enough not to compete. Motion is choreographed and purposeful: scroll-driven sequences, orchestrated entrances, elements that arrive with presence rather than simply appearing. Every animation is load-bearing. No decoration.

**Key Characteristics:**
- Committed oxidized terracotta as identity signal, not accent
- Warm parchment and deep near-black as supporting neutrals
- Sculptural editorial serif + warm humanist sans pairing
- Choreographed scroll-driven motion with exponential ease-out curves
- Light theme — editorial daylight, not dark
- Architectural restraint in layout with precise rhythmic spacing
- Provocative in copy, restrained in ornament

## 2. Colors: The Terracotta Authority Palette

One signature color that does not hide. The rest of the palette exists to support it.

### Primary
- **Oxidized Terracotta** ([to be resolved during implementation]): The committed brand signal. Rich, earthy red-orange pulled toward brown — the color of aged clay, sun-weathered stone, and Pompeian fresco. Used on hero fields, full-bleed section backgrounds, and high-emphasis interactive elements. Carries 30–60% of the surface on identity-forward pages. Desaturates slightly toward deep brown at the dark end of its tonal range; lightens toward warm sand at the pale end.

### Neutral
- **Aged Parchment** ([to be resolved during implementation]): The primary background surface. Warm cream with a faint terracotta tint — not white, not beige, not cream from a tube. Carries the same editorial stillness as uncoated paper stock in a well-designed catalog.
- **Inkwell** ([to be resolved during implementation]): The primary text color. Deep near-black with a warm cast, referencing iron-gall ink. Never pure `#000`. Used for body text, headlines, and structural chrome.
- **Stone** ([to be resolved during implementation]): A mid-tone warm neutral for dividers, borders, and secondary surface containers. The space between parchment and inkwell.

### Named Rules
**The Committed Terracotta Rule.** The primary color is not an accent. On any surface where Portico Society is asserting its brand identity — heroes, section breaks, marquee statements — the terracotta carries the surface. Its rarity is not the point; its presence is. Do not reduce it to a button highlight.

**The No White Rule.** No surface uses pure white or pure black. Every neutral is tinted toward the terracotta hue — even if the chroma is imperceptible at 0.005. Tinting is the signal that the palette is a system, not a default.

## 3. Typography: The Editorial Authority Pair

**Display Font:** A high-contrast sculptural serif with dramatic thin-to-thick stroke differential — Cormorant Garamond, Canela, or equivalent optical quality. Light to Regular weight; hierarchy through size, not weight inflation.

**Body Font:** A warm humanist sans with open apertures and legible stroke contrast — Freight Sans, Untitled Sans, or equivalent. Regular and Medium weights only; never bold for body copy.

**Character:** The display serif carries the authority of print — it signals the institution, not the startup. The humanist sans grounds it in readability without softening the brand into approachability. The pairing reads as an agency that has taste and expects its clients to share it.

### Hierarchy
- **Display** (Light, `clamp(3rem, 8vw, 6rem)`, line-height 0.95–1.0): Major hero statements, above-fold headlines. Set wide. Let the thin strokes breathe.
- **Headline** (Light-Regular, `clamp(1.75rem, 4vw, 3rem)`, line-height 1.05–1.1): Section headers, campaign statements, service names.
- **Title** (Medium sans, `clamp(1rem, 2vw, 1.375rem)`, line-height 1.2): Subheadings, card titles, navigation anchors.
- **Body** (Regular sans, `1rem`, line-height 1.65, max 68ch): Running prose, service descriptions, case study body. Never exceed 68 characters per line.
- **Label** (Medium sans, `0.75rem`, letter-spacing 0.08em, uppercase): Tags, metadata, form labels, category markers.

### Named Rules
**The Serif Sovereignty Rule.** The display serif is used for statements of substance only — headlines, hero copy, section titles. It does not appear in navigation, buttons, labels, or UI chrome. The moment the serif appears in a button, it becomes decoration. Reserve it for authority.

**The Weight Ceiling Rule.** The humanist sans never exceeds Medium weight in body contexts. Bold weight is reserved for pull-quote emphasis only — and even then, only in the display serif. Bold sans reads as urgency; this brand is not urgent.

## 4. Elevation

Portico Society is flat by default. Surfaces rest at the same plane; shadows do not appear at rest. Depth is created through tonal layering (parchment on parchment, terracotta on stone) rather than through casting light. This is the choice of confidence: shadows suggest things need to be lifted; tonal layering suggests surfaces are simply where they belong.

Ambient diffuse shadows appear only as response to state — hover on interactive elements, focus on form fields — never as decoration. When they appear, they are warm-cast (terracotta hue in the shadow color) and never pure grey.

Motion is the primary elevation signal. Elements entering the viewport, sections revealing on scroll, transitions between states — these create perceived depth through time, not through shadow. The choreography is the architecture.

### Shadow Vocabulary
- **Hover lift** ([to be resolved]): Applied on interactive card hover and primary button hover. Warm diffuse shadow, never purely grey. Paired with a subtle upward translate.
- **Focus halo** ([to be resolved]): Applied on keyboard focus. Terracotta-tinted ring — never the browser default blue.

### Named Rules
**The Flat-At-Rest Rule.** Every surface is flat at rest. Shadows are not structural; they are behavioral. If a shadow appears when nothing is happening, it is wrong.

## 5. Components

[Components will be documented in the first scan-mode run of `/impeccable document` once implementation begins.]

## 6. Do's and Don'ts

### Do:
- **Do** lead with a point of view in every copy block. Portico Society provokes before it persuades — the first sentence should challenge an assumption, not introduce the company.
- **Do** use the terracotta as a field color on hero and identity-asserting sections. Committed means committed — 30–60% of the surface on brand pages.
- **Do** build scroll-driven entrances that feel purposeful. Each sequence should feel like a reveal, not an animation. Exponential ease-out curves only (ease-out-quart, ease-out-expo).
- **Do** hold the editorial serif for statements of substance only. Display headlines, section titles, campaign copy. Never in buttons, labels, or navigation.
- **Do** tint every neutral toward the terracotta hue, even at imperceptible chroma. The palette is a system.
- **Do** write copy that assumes the reader already understands luxury. Luxury clients do not need the category explained to them.
- **Do** maintain WCAG 2.1 AA contrast on all text, even on terracotta fields. The brand's authority cannot be at the expense of legibility.

### Don't:
- **Don't** use loud luxury signals: no flashy gold accents, no ornamental filigree, no ostentatious wealth markers. That aesthetic signals insecurity, not taste.
- **Don't** produce typical agency portfolio patterns: no "We are a creative studio" hero copy in large type, no neon-on-dark backgrounds, no identical case study grids with icon + headline + text, no floating icons.
- **Don't** use gradient text (background-clip: text with a gradient fill). Prohibited. Use a single solid color; emphasis through weight or size.
- **Don't** use side-stripe borders (border-left or border-right greater than 1px as a colored accent). Never. Rewrite with full borders, background tints, or leading numbers.
- **Don't** reach for a modal when an inline or progressive treatment exists. Modals are lazy; this brand is considered.
- **Don't** animate layout properties (width, height, top, left, margin, padding). Animate transform and opacity only.
- **Don't** produce SaaS or tech agency aesthetics: no gradient hero backgrounds, no floating product UI screenshots at angles, no "Scale your growth" copy patterns, no HubSpot-adjacent visual language.
- **Don't** use pure `#000` or `#fff` anywhere. Every neutral is tinted. The no-white rule is not negotiable.
- **Don't** use bold weight humanist sans for body or UI text. It reads as urgency. This brand is certain, not urgent.
