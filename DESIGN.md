---
name: APSAD Lebanon
description: Warm, patrician heritage-preservation brand site — antique gold on limestone, serif-led, motion-rich
colors:
  antique-gold: "#AE8E5B"
  cedar-brown: "#794A2A"
  limestone-white: "#FBFAF9"
  plaster: "#F4F2F1"
  umber-ink: "#1C1917"
  stone-gray: "#78726D"
  hairline: "#E7E5E4"
  night-umber: "#141110"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(3.75rem, 10vw, 8rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    letterSpacing: "0.2em"
rounded:
  none: "0px"
spacing:
  section: "6rem"
  gutter: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.antique-gold}"
    textColor: "#FFFFFF"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  button-outline:
    backgroundColor: "{colors.limestone-white}"
    textColor: "{colors.umber-ink}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
---

# Design System: APSAD Lebanon

## 1. Overview

**Creative North Star: "The Sursock Salon"**

The reception room of a Beirut heritage mansion on Sursock Street — APSAD's literal address. Limestone walls, antique gold leaf catching late light, dark cedar wood, and the quiet confidence of an institution that has been receiving guests since 1960. The interface addresses patrons as peers: it never pleads, never shouts, never decorates for decoration's sake. Photography of the sites does the emotional work; typography and gold do the framing.

This system explicitly rejects the **generic charity template** (donate-button urgency, progress bars), **tourism-board gloss** (saturated postcard energy), the **dusty museum archive** (walls of text, parchment kitsch), and **startup/SaaS modernism** (gradients, rounded play). See PRODUCT.md.

**Key Characteristics:**
- Square-cornered everything — the geometry of cut stone
- Serif display at architectural scale (up to 8rem), sans body in quiet restraint
- Antique gold as a scarce material, not a paint bucket
- Full-bleed site photography with dark scrims; sections that invert to near-black
- A film-grain overlay (2.8% opacity) giving every page a printed-matter texture
- Choreographed motion: staggered entrances, Ken Burns heroes, split-text reveals, marquee bands

## 2. Colors

A warm two-hue world — gold and brown on limestone — where color signals material (stone, wood, gilt), never mood-of-the-week.

### Primary
- **Antique Gold** (#AE8E5B / `hsl(37 34% 52%)`, CSS `--primary`): the gilded accent — primary buttons, kicker labels, active nav states, selection tint. It reads as gold leaf on the limestone ground; keep it scarce so it stays precious.

### Secondary
- **Cedar Brown** (#794A2A / `hsl(24 48% 32%)`, CSS `--accent`): deep reddish wood for hover states and important links; the darker, structural sibling of the gold.

### Neutral
- **Limestone White** (#FBFAF9 / `hsl(40 20% 98%)`, CSS `--background`): the body ground — warm-tinted near-white.
- **Plaster** (#F4F2F1 / `--secondary`) and **Hairline** (#E7E5E4 / `--border`): surface tint and 1px rules.
- **Umber Ink** (#1C1917 / `--foreground`): body text, and the background of `.section-dark` inverted sections.
- **Stone Gray** (#78726D / `--muted-foreground`): captions and secondary copy. ⚠ At ~4.4:1 on Limestone White it sits just under WCAG AA for body sizes — use for large/short text only, or darken when it carries paragraphs.
- **Night Umber** (#141110): the `.dark` theme ground.

### Named Rules
**The Gold-Leaf Rule.** Antique Gold covers at most 10% of any viewport — buttons, labels, rules, one highlighted word. Gold spread wide turns patina into paint.
**The Inversion Rule.** Contrast between sections comes from full tonal inversion (`.section-dark`, Umber Ink ground), never from pastel section tints.

## 3. Typography

**Display Font:** Playfair Display (with Georgia, serif)
**Body Font:** DM Sans (with system-ui, sans-serif)

**Character:** A high-contrast transitional serif at architectural scale over a geometric-humanist sans kept deliberately quiet — the engraved lintel above, the museum caption below.

### Hierarchy
- **Display** (700, clamp 3.75–8rem / `text-6xl`→`text-9xl`, line-height 0.9, tracking tight): hero statements only; one per page.
- **Headline** (700, ~2.25–3rem / `text-4xl md:text-5xl`, 1.15): section openers, always serif.
- **Title** (500–700, 1.25rem / `text-xl`): card titles, sub-sections; serif or sans by context.
- **Body** (400, 1rem–1.125rem, 1.65): max measure ~65ch; Umber Ink or Stone Gray (see contrast warning).
- **Label** (500, 13px, tracking 0.2–0.35em, uppercase): kickers, marquee items, nav; the only all-caps voice.

### Named Rules
**The One-Lintel Rule.** One serif display statement per viewport. Stacked display sizes compete like two carved inscriptions on one façade.

## 4. Elevation

Flat, like masonry. Depth comes from tonal inversion (light limestone vs. near-black umber sections), 1px hairlines, image scrims (`bg-black/55`), and the global film grain — not from drop shadows. Shadows are effectively absent from the system; shadcn defaults that carry them (popover, dialog) keep only the minimum needed to separate overlays.

### Named Rules
**The Stone-Doesn't-Float Rule.** No decorative box-shadows on cards, buttons, or sections. If a surface must separate, invert it or rule it off with Hairline.

## 5. Components

### Buttons
- **Shape:** perfectly square corners (`--radius: 0`)
- **Primary:** Antique Gold fill, white text, `h-10 px-4` (`h-11 px-8` large); hover dims to 90%
- **Outline:** 1px Hairline border on Limestone; hover fills Cedar Brown with light text
- **Hover / Focus:** color transitions only; `focus-visible` ring in gold (`--ring`)
- **Ghost / Link:** quiet variants for nav and inline actions; link underlines offset 4px

### Cards / Containers
- **Corner Style:** square (0px)
- **Background:** white (`--card`) on Limestone ground; Umber surfaces inside `.section-dark`
- **Shadow Strategy:** none — hairline borders per the Stone-Doesn't-Float Rule
- **Internal Padding:** 1.5rem+

### Inputs / Fields
- **Style:** 1px Hairline stroke, Limestone ground, square corners, `h-10`
- **Focus:** 2px gold ring with offset
- **Error:** destructive red (#EF4444 family) reserved exclusively for form validation

### Navigation
- Fixed header over hero imagery, label-typography links (13px tracked caps), gold active state, sheet-based mobile menu. Footer in inverted umber with columned sitemap.

### Signature Components
- **Marquee band:** full-width inverted strip of tracked uppercase phrases scrolling at constant speed (`translateX(-50%)` loop).
- **Split-text reveal:** headlines enter word-by-word with `cubic-bezier(0.16, 1, 0.3, 1)` staggering.
- **Ken Burns hero:** full-bleed photograph slow-zooming from 1.08→1 over 20s under a 55% black scrim.
- **Film grain:** fixed SVG turbulence overlay at 2.8% opacity, z-40, pointer-events none — the whole site reads as printed matter.
- **Custom cursor:** dot-follower on pointer-fine devices.

## 6. Do's and Don'ts

### Do:
- **Do** keep every corner square; `--radius` stays 0rem everywhere.
- **Do** let full-bleed site photography carry heroes, with scrims ≥55% black before setting light text on it.
- **Do** honor `prefers-reduced-motion` for every new animation (global kill-switch already exists in `globals.css`).
- **Do** use tonal inversion (`.section-dark`) to pace long pages — limestone, umber, limestone.
- **Do** address the reader as a patron: "Join the association", never "Donate now!!" urgency mechanics.

### Don't:
- **Don't** build the "generic charity template" — no donation progress bars, no crisis-photography guilt, no floating donate ribbons (PRODUCT.md anti-reference).
- **Don't** drift into "tourism-board gloss" — no saturated postcard filters or exclamation-mark copy (PRODUCT.md anti-reference).
- **Don't** ship the "dusty museum archive" — no parchment textures, no 12-paragraph walls of unbroken text (PRODUCT.md anti-reference).
- **Don't** import "startup/SaaS modernism" — no gradients on text or buttons, no rounded-2xl cards, no glassmorphism (PRODUCT.md anti-reference).
- **Don't** use Stone Gray (#78726D) for long body copy on Limestone — it fails 4.5:1; step down to Umber Ink.
- **Don't** add colored side-stripe borders, gradient text, or icon-in-rounded-square headers — banned outright.
