# LinkedIn Accelerator — Design Handoff

A one-page sales site for the **LinkedIn Personal Brand Accelerator** (a 12-week ColdIQ program). Live page is at `index.html`. Built to match ColdIQ's visual language — clean white, technical sans, dark CTAs, blue accent.

This doc is for a designer who'll refine craft and polish. It explains the design system already in place, what each section does, and where the rough edges are.

---

## How to view

- **Live**: [https://coldiq-linkedin-content-system.vercel.app](https://coldiq-linkedin-content-system.vercel.app) (the old `linkedin-accelerator-snowy.vercel.app` 308-forwards here)
- **Local**: clone the repo, `node serve.mjs` from project root, visit `http://localhost:3000/`

---

## Design system (already coded)

### Color tokens
| Token | Hex | Use |
|---|---|---|
| `--text` | `#0B0B0C` | Primary text, dark backgrounds, primary CTA fill |
| `--text-2` | `#3A3A3D` | Body paragraph text |
| `--text-muted` | `#6A6A6E` | Captions, metadata, secondary copy |
| `--text-soft` | `#9C9CA0` | Faintest text, dividers |
| `--bg` | `#FFFFFF` | Page background |
| `--bg-tint` | `#F7F6F2` | Section tint (warm off-white, NOT pure gray) |
| `--bg-soft` | `#FAFAF8` | Card backgrounds |
| `--bg-dark` | `#0B0B0C` | Dark sections (orbital container, GTM, Final-CTA-Investment) |
| `--border` | `#E7E6E1` | Default border |
| `--border-2` | `#D8D7D1` | Hover state border |
| `--blue` | `#1F4DFF` | Accent (badges, link hover, phase 1, primary "fix" indicator) |
| `--coral` | `#FF5A1F` | Accent (phase 2, "diagnose" state, callout border, callout eyebrow) |
| `--mint-deep` | `#2E8A5A` | Phase 3, "re-grade" state, "success" |
| `--lavender / phase-4` | `#6B4FE0` | Phase 4, "fix" state |
| `--lemon / Phase 5 accent` | `#F2C94C` | Phase 5 ABM, fifth orbital trace |

### Typography
- **Geist** (Google Fonts) — primary sans for everything. Weights used: 400, 500, 600
- **Geist Mono** — labels, badges, stats, captions, micro-copy. Weights: 400, 500
- No serifs (intentionally — earlier draft used Instrument Serif italic for pull quotes; removed in the ColdIQ-only pass)

Type scale (from `.display` to `.caption`) is defined in the `<style>` block at the top of `index.html`. Most clamps follow `clamp(min, vw, max)` pattern for fluid type.

### Spacing & radius
- Section padding: `clamp(72px, 9vw, 128px)` vertical
- Container: `max-width: 1200px`, `padding: 0 28px`
- Radius scale: `--r-sm: 6px`, `--r-md: 10px`, `--r-lg: 16px`, `--r-xl: 24px`

### Components

| Component | Class | Notes |
|---|---|---|
| Pill badge | `.badge` (+ `.blue` / `.mint`) | Has a 6px colored dot before the label. Use for section labels. |
| Dark primary CTA | `.btn .btn-primary` | Black fill, white text, 10px radius. Has `.btn-arrow` for trailing arrow. |
| Outlined secondary CTA | `.btn .btn-secondary` | Transparent fill, dark border. Hover inverts to black. |
| Mono skill chip | `.phase-skill` | Used inside stepper week panels and GTM section. |

---

## Page structure (10 sections)

1. **Hero** — Two-column. Left: typewriter headline ("Run your LinkedIn brand on the [cycling phrase]") + lede + dual CTAs. Right: ColdIQ Influencer Playbook image (16 team-member profiles, bottom 7% clipped via CSS to hide the credit pill).
2. **Problem ⇒ Solution** (`#stack`) — Two-column visual layout. Left: 4 problem cells in a 2×2 grid (Ghostwriter, ChatGPT solo, In-house hire, Course or playbook). Center: white circle with arrow icon (the "becomes" connector). Right: square dark orbital diagram with "THE FIX · ONE SYSTEM" badge.
3. **12-Week Map / Stepper** (`#map`) — React shadcn stepper with 13 step indicators (PRE / W1-W12), each color-coded by phase. Clicking a step swaps the content panel below (NOT auto-scrolling — by design).
4. **Phase 5 GTM Loop** (`#gtm`) — Dark section, two-column. Left: full-aspect EGC playbook PNG + "BUILT BY AN OUTBOUND SHOP" callout block with 3 mini-stats. Right: header + 5-node compounding loop diagram (animated colored arcs flow around the ring) + skill tags.
5. **Quality Loop** — Two-column. Left: 5-dimension rubric list with colored numbered chips (matching node colors on the right). Right: 5-circle Quality Loop SVG diagram with a sequential ping-pulse animation (each node "pings" outward in turn around the loop) + a static "PASS GATE 38/50" mint pill at the center.
6. **Deliverables** ("What you leave with") — Two-column. Left: 13 deliverable items in a 2-col compact grid + italic closer. Right (sticky): Claude-for-content GIF + mono caption + dark "After Week 12" callout with the ownership message.
7. **Team + Proof** (`#proof`) — Header → 4-stat strip (581 / +27 / +$151K / 275K+) → 11 LinkedIn post cards in a 3-col masonry grid. Soheil's portrait card spans 2 rows in the middle column. Each card shows shot + author + 3-stat metric strip + outcome.
8. **FAQ** (`#faq`) — 8-item accordion. JSON-LD `FAQPage` schema in `<head>` for Google rich results.
9. **Final CTA** — Centered. "The next step" badge + single sentence + dual CTAs. Subway-map echo faintly visible at the very bottom (sits below the buttons via `bottom: -180px; z-index: -1`).

---

## Interactive elements (React islands)

There are **three React mounts** inside the static HTML, all built into one `dist-orbital/orbital.js` bundle by Vite. Source lives in `src/main.tsx` and `components/ui/*.tsx`. To rebuild: `npm run build:orbital`.

| Mount div | Component | Notes |
|---|---|---|
| `#hero-typewriter` | `Typewriter` (framer-motion) | Cycles through 4 phrases inside the hero H1 |
| `#ai-stack-orbital` | `RadialOrbitalTimeline` | Section 2 right column. Auto-rotates. Click any node to expand a card with description, system weight, connected layers. |
| `#twelve-week-stepper` | shadcn `Stepper` | Section 3. 13 step indicators with colored separators that turn black when completed. |

Brand logos in the orbital come from `react-icons/si` (Claude, Gemini, Figma) + custom inline SVGs (Apify, Clay) defined in `src/main.tsx`.

---

## Animations / motion details

| Where | Effect | Timing |
|---|---|---|
| Orbital diagram | Auto-rotation of 6 nodes around hub, with z-index depth | Continuous, 50ms step |
| Orbital hub | Gradient pulse (purple → blue → teal) | 2s ease-in-out infinite |
| Orbital active node | Scale up 1.5x + white background swap when clicked | 300ms |
| GTM compounding loop | 5 colored arcs (blue, coral, mint, purple, gold) chase around the ring with staggered delays (1.4s apart) | 7s linear infinite |
| GTM center label | Soft outward glow pulse | 4s ease-in-out infinite |
| Quality Loop | Sequential ping-pulse outward from each of the 5 nodes (Draft → Grade → Diagnose → Fix → Re-grade), in node color | 7s ease-out infinite, 1.4s delay between nodes |
| Quality PASS GATE | Gentle hold-pulse synced to loop cycle | 7s ease-in-out infinite |
| Section reveal | Fade + 14px translate-up on scroll into view | 700ms cubic-bezier |
| Hover on nav links / CTAs | Subtle color shift + slight Y-translate on primary buttons | 250ms |

---

## Areas the designer might want to polish

These are honest rough edges I'd flag:

1. **Hero playbook image clipping.** The source image (`brand_assets/coldiq-playbook.jpeg`) has a "Michel Lieben | coldiq.com" credit pill at the bottom that we hide via `clip-path: inset(0 0 7% 0)` + `transform: scale(1.075)`. Crude. A clean re-export of the playbook image without the credit pill would be cleaner than the CSS hack.
2. **EGC engine PNG aspect ratio.** It's a tall 9:16 portrait. Inside the GTM section's left column, it dominates vertically and tends to push the column taller than the right side, even with the callout block underneath. A landscape-oriented version might balance better.
3. **Orbital component visual.** The purple/blue/teal gradient hub is from the original component demo. It looks slightly toy-like compared to the rest of the page's restraint. Could be reworked to match ColdIQ's palette (e.g., solid coral with subtle inner glow, or a different gradient stop).
4. **Quality Loop SVG sizing.** On wide viewports, the circle SVG fits but the surrounding card has noticeable empty space at the very top/bottom. Could either grow the SVG more or reduce card padding.
5. **Proof card screenshots.** The 11 LinkedIn post screenshots have different native resolutions (some 1696×888, some 2258×1288, one portrait 562×1498). We use CSS `object-fit: cover` + `transform: scale(1.035)` to trim thin black border artifacts. Some post screenshots show LinkedIn UI chrome that could be cropped tighter for visual consistency.
6. **GTM loop nodes.** Each loop-node has a colored top-border + colored step number. The card itself stays white. A designer might want to introduce subtle colored backgrounds or icon glyphs per node for more visual differentiation at a glance.
7. **Mobile layout.** All sections collapse to single-column at 840px / 900px breakpoints. The orbital becomes harder to interact with on touch. Worth a designer pass for tap targets and the side-by-side problem→orbital layout on phones (currently arrow rotates 90° to point down — works but could be more elegant).
8. **Typography rhythm.** Section h2 sizes vary intentionally (`.display` clamp on hero/CTA, `.h1` on most sections, `.h2` on sub-heads). A designer might want to tighten the scale to feel more disciplined.

---

## File map

```
index.html       ← the page (single file, all CSS inline)
serve.mjs                        ← local dev server (node serve.mjs → :3000)
package.json                     ← contains `build:orbital` script
vite.config.ts                   ← orbital bundle config
tailwind.config.ts               ← shadcn theme tokens for React island
src/
  main.tsx                       ← React entry: mounts typewriter, orbital, stepper
  globals.css                    ← Tailwind directives + shadcn CSS vars
components/ui/
  badge.tsx
  button.tsx
  card.tsx
  radial-orbital-timeline.tsx
  stepper.tsx
  typewriter.tsx
lib/utils.ts                     ← cn() helper
dist-orbital/                    ← BUILT React bundle (committed for static hosting)
  orbital.js                     (~325 KB / ~106 KB gzipped)
  orbital.css                    (~23 KB / ~5 KB gzipped)
brand_assets/
  coldiq-logo.svg                ← nav + favicon
  coldiq-playbook.jpeg           ← hero right column image
  egc-engine.png                 ← EGC playbook (in GTM section)
  system-overview.gif            ← Claude-for-content animated infographic
  post-*.png                     ← 11 real LinkedIn post screenshots used in Proof
```

---

## SEO

- `<title>`: "LinkedIn Personal Brand Accelerator · ColdIQ · AI content system for B2B founders"
- `<meta description>`: short pitch
- Single `<h1>` (hero only); rest are `<h2>` (some styled with `.display` class)
- `FAQPage` JSON-LD schema in `<head>`
- All H2s carry keyword phrases ("LinkedIn engagement," "outbound pipeline," "B2B post," "content system," etc.)
- One canonical anchor structure: `#top`, `#stack`, `#map`, `#gtm`, `#proof`, `#faq`

---

## Voice rules (for any copy revision)

- **Em-dashes**: 0 in user-facing copy (was 14+ in early drafts). Don't add them back without a strong reason.
- **"Not X. Not Y." parallel structure**: only ONE instance allowed on the page (currently in Section 2 / Problem). Don't add another.
- **No rhetorical reveals** ("You are not X anymore. You are Y.") and no chained rhetorical poetry ("X creates Y. Y feeds Z. Z does W.").
- **Triplet lists**: kept at flat-list level only (e.g., the team-stats h2 "24 voices. 275K+ followers. One content system."). No parallel-structure triplets like "Same X. Same Y. Same Z."
- **Lede < 30 words** per section. **Body paragraphs < 50 words**. Tighter is better.
- **State proof stats once** per page (275K, 24 voices, $151K MRR all live in the Team+Proof section only).
- "Claude" not "Claude Code" in voice copy (clients use Claude chat, not Claude Code terminal). Exception: real LinkedIn post titles in proof grid that literally contain "Claude Code" — those are factual and stay.

---

## Open questions for the designer

- Is the orbital hub's purple/blue/teal gradient too generic-AI? Should it switch to ColdIQ's palette (coral, deep blue, off-black)?
- Should the EGC playbook PNG get a landscape rework to balance GTM column heights more cleanly?
- The Quality Loop sequential ping-pulse vs. GTM continuous arc-flow — does the contrast read clearly, or do both diagrams feel "the same kind of animation" to a fresh viewer?
- Should the post-card metrics strip be more visually expressive (icons next to numbers, color-coded by metric type)?
- The hero playbook image: clean re-export, or keep the CSS clip-path hack?

Drop comments inline on the live page (any review tool like Figma Branch / Penpot / a Loom walkthrough is fine), or annotate this doc directly.
