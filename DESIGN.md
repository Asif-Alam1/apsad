---
name: APSAD Lebanon
description: Chiaroscuro heritage brand site — gilded nocturne and limestone daylight, lapidary serif, choreographed motion
colors:
  gold-leaf: "#CFA968"
  bronze: "#8A6B34"
  cedar: "#66401F"
  night-umber: "#121009"
  candle-ivory: "#EDE7DC"
  smoke: "#B3A894"
  limestone: "#F8F7F4"
  umber-ink: "#201B17"
  stone-gray: "#635B54"
  plaster: "#EDEAE6"
  hairline-day: "#DFDAD4"
  hairline-night: "#2E271F"
typography:
  display:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "clamp(2.25rem, 6.5vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "0.06em"
  headline:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "clamp(2rem, 3.6vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.03em"
  title:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.42em"
rounded:
  none: "0px"
spacing:
  section: "clamp(6rem, 10vw, 9rem)"
  gutter: "1.5rem"
components:
  button-gold:
    backgroundColor: "{colors.gold-leaf}"
    textColor: "{colors.night-umber}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-bronze:
    backgroundColor: "{colors.bronze}"
    textColor: "{colors.limestone}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-ghost-night:
    backgroundColor: "transparent"
    textColor: "{colors.candle-ivory}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
---

# Design System: APSAD Lebanon

## 1. Overview

**Creative North Star: "The Sursock Salon, by Candlelight and by Day"**

A chiaroscuro world built around APSAD's real address — a Beirut heritage
mansion on Sursock Street. The home page and the gallery are the **nocturne**:
a candlelit palace where photography glows out of near-black umber and gold
leaf carries the type. The Association and Get Involved pages are the
**daylight**: limestone reading rooms with umber ink. The inversion — night
into day into night — is the design; both registers share one lapidary voice.

Every letter behaves as if cut into stone: Marcellus (the Trajan-inscription
letterform) for display and labels, EB Garamond for text. There is no
sans-serif anywhere. Motion is choreographed, not decorated: an opening
curtain, inertial scroll, characters carving in, a scroll-driven horizontal
timeline with a live year ticker.

This system explicitly rejects the **generic charity template**,
**tourism-board gloss**, the **dusty museum archive**, and **startup/SaaS
modernism** (see PRODUCT.md).

**Key Characteristics:**
- Chiaroscuro pacing: drenched night-umber surfaces alternating with limestone daylight
- Fully serif: Marcellus caps + EB Garamond text; zero sans, zero bold synthesis
- Gold by night (#CFA968), bronze by day (#8A6B34) — the primary itself inverts
- Square corners everywhere (radius 0); depth from tonal inversion, never shadows
- Film grain at 2.8% over everything; 1px hairline rules as the only ornament
- Signature motion: preloader curtain, Lenis inertial scroll, char-carve reveals, pointer-parallax hero, clip-path image unveilings, labeled cursor

## 2. Colors

Two rooms, one palette: night materials (umber, candle ivory, gold leaf) and day materials (limestone, umber ink, bronze). CSS source of truth: HSL custom properties in `src/app/globals.css` (`:root` = daylight, `.section-dark`/`.dark` = nocturne, `.section-light` = daylight island inside a nocturne page).

### Primary
- **Gold Leaf** (#CFA968 / `hsl(38 52% 63%)`, nocturne `--primary`): buttons, kickers, nav accents, timeline nodes and ticker on dark grounds. 7.9:1 on Night Umber — safe even for body sizes.
- **Bronze** (#8A6B34 / `hsl(35 45% 37%)`, daylight `--primary`): the same voice struck in daylight — 4.9:1 on Limestone, passes AA at label sizes.

### Secondary
- **Cedar** (#66401F / `hsl(24 48% 27%)`, daylight `--accent`): deep wood for hovers and important links.

### Neutral
- **Night Umber** (#121009 / `hsl(26 20% 6%)`): the nocturne ground; hero base drops to `hsl(26 20% 4%)`.
- **Candle Ivory** (#EDE7DC / `hsl(40 30% 91%)`): nocturne text.
- **Smoke** (#B3A894 / `hsl(36 14% 68%)`): nocturne secondary text (~8.7:1).
- **Limestone** (#F8F7F4 / `hsl(40 12% 97%)`): daylight ground. **Plaster** (#EDEAE6): daylight surface tint.
- **Umber Ink** (#201B17 / `hsl(24 12% 11%)`): daylight text.
- **Stone Gray** (#635B54 / `hsl(25 9% 35%)`): daylight secondary text (≥7:1).
- **Hairlines**: #DFDAD4 by day, #2E271F by night — always 1px.

### Named Rules
**The Inversion Rule.** Section contrast comes from full tonal inversion (nocturne ↔ limestone), never pastel tints. The chiaroscuro rhythm on the home page is: night, night, night, day, day, day, night, night.
**The Gold-Is-Light Rule.** Gold behaves like light, not paint: type, hairlines, nodes, small fills. Never large gold surfaces.

## 3. Typography

**Display Font:** Marcellus (with Georgia, serif) — single weight 400
**Body Font:** EB Garamond (with Georgia, serif) — with true italics

**Character:** Roman inscription over manuscript. Marcellus is the lapidary voice (all display, headings, labels, buttons — usually uppercase, tracked wide); EB Garamond is the reading voice (body, quotes in italic). `font-synthesis-weight: none` is enforced globally — Marcellus is never faux-bolded.

### Hierarchy
- **Display** (400, clamp 2.25–5.5rem, 1.04, +0.06em, UPPERCASE): one per page; carved in character by character.
- **Headline** (400, clamp 2–3.25rem, 1.1, +0.03em, UPPERCASE): section openers.
- **Title** (400, 1.25–1.5rem): row headings, card titles — sentence case.
- **Body** (400, 1.0625–1.125rem, 1.65): EB Garamond; base body size is 17px because Garamond runs small; quotes set italic at clamp(1.4–2.75rem).
- **Label** (400, 10–12px, +0.22–0.42em, UPPERCASE, Marcellus): kickers, nav, buttons, marquee.

### Named Rules
**The One-Lintel Rule.** One display statement per viewport.
**The Carve Rule.** Display type enters like an inscription: per-character rise from blur (`CharReveal`), 26–34ms stagger, expo ease.

## 4. Elevation

Flat, like masonry. Depth comes from tonal inversion, image scrims (gradient washes of the ground color at 0.5–0.85 alpha), 1px hairlines, and the global film grain. No decorative box-shadows anywhere; overlays (dialogs, sheets) keep only shadcn's minimum separation.

### Named Rules
**The Stone-Doesn't-Float Rule.** No drop shadows on cards, buttons, or sections — invert or rule off instead.

## 5. Components

### Buttons
- **Shape:** square (0px), h-[52px] hero / h-10–12 chrome, Marcellus 11–12px caps +0.22–0.25em
- **Gold (nocturne primary):** Gold Leaf fill, Night Umber text; hover lightens to `hsl(38 52% 70%)`
- **Bronze (daylight primary):** Bronze fill, Limestone text; hover 90%
- **Ghost (nocturne):** 1px ivory/35% border, transparent, ivory text; hover ivory/10 wash
- **Focus:** 2px ring in the ground's primary (`--ring`)
- Hero and finale CTAs wrap in `Magnetic` (cursor-attracted)

### Cards / Containers
Ruled rows beat cards. Lists (aims, affiliations, regions, privileges) are hairline-ruled rows with Marcellus lead + Garamond note. Where surfaces exist (gallery lightbox panel) they are flat with hairline borders, square corners.

### Inputs / Fields
1px hairline stroke, ground-colored fill, square, h-10+; gold/bronze focus ring; destructive red reserved for validation.

### Navigation
Fixed transparent header; gains a 92% ground-color blur bar after 50px scroll. Route-aware chrome: nocturne pages (home, gallery) get ivory/gold chrome, daylight pages get ink/bronze. Gold 2px scroll-progress bar. Mobile: full nocturne sheet with 2xl Marcellus links.

### Signature Components
- **Preloader curtain** (`ui/preloader.tsx`): once per session — APSAD carves in gold on black, hairline draws, curtain lifts (1.05s expo). Dispatches `apsad:preloader-done`; the hero holds its entrance for it.
- **Lenis inertial scroll** (`ui/smooth-scroll.tsx`): duration 1.15, expo easing; disabled under reduced motion.
- **CharReveal** (`ui/char-reveal.tsx`): per-character carve-in for display type.
- **Pointer-parallax hero**: photograph drifts −14px against cursor, type +7px with it, over Ken Burns.
- **The Record timeline** (`home/restoration-timeline.tsx`): 300vh sticky section driving a horizontal track; gold-node thread, alternating entries, live gold year ticker (1960→2016), progress hairline. Falls back to a scroll-snap strip on touch/reduced-motion with a "Drag" cursor label.
- **ParallaxImage** (`ui/parallax-image.tsx`): scroll parallax + first-view clip-path unveiling (inset 14%/8% → 0 over 1.2s) with a settle from scale 1.12.
- **Labeled cursor** (`ui/cursor-follower.tsx`): blend-difference dot; grows ×2.8 over interactives; morphs into a 76px gold disc with tracked caps over `[data-cursor-label]` ("View" on gallery cards, "Drag" on the timeline strip).
- **Marquee band**: trilingual (FR/EN/AR) gold tracked caps on the nocturne.
- **Film grain**: fixed SVG turbulence at 2.8%, `z-index: var(--z-grain)`.

Semantic z-scale (globals.css): grain 30 < header 40 < overlays 50 < cursor 60 < preloader 70.

## 6. Do's and Don'ts

### Do:
- **Do** keep every corner square; `--radius` stays 0rem.
- **Do** guard every animation with `prefers-reduced-motion` (global kill-switch exists; each JS component also checks `matchMedia` — follow that pattern).
- **Do** write scrim/overlay alphas as `hsla(h,s%,l%,a)` arbitrary values — Tailwind's `/NN` slash opacity silently fails on non-standard steps and arbitrary hsl values in this setup.
- **Do** pace long pages by inversion: nocturne → limestone → nocturne.
- **Do** address the reader as a patron: "Become a Member", never donation-urgency mechanics.
- **Do** use real content from the apsad.net record (dates, places, names) — never invented milestones.

### Don't:
- **Don't** build the "generic charity template" — no progress bars, crisis photography, or floating donate ribbons (PRODUCT.md anti-reference).
- **Don't** drift into "tourism-board gloss" — no saturated postcard filters or exclamation copy (PRODUCT.md anti-reference).
- **Don't** ship the "dusty museum archive" — no parchment textures or unbroken text walls (PRODUCT.md anti-reference).
- **Don't** import "startup/SaaS modernism" — no gradient text, rounded cards, or glassmorphism (PRODUCT.md anti-reference).
- **Don't** apply `font-bold` to Marcellus — one weight exists; synthesis is disabled and would look broken.
- **Don't** introduce a sans-serif; the fully-serif stack is the identity.
- **Don't** add a second scroll-hijacked section — The Record is the one and only.
