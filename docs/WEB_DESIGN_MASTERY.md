# WEB DESIGN MASTERY — Reference Guide
## Prisca Dezigns Empire · Master Knowledge Document
### Last Updated: May 2026

---

> **Purpose:** This is the definitive reference document guiding all website designs produced by Prisca Dezigns. Every decision — color, type, layout, animation, code — should trace back to a principle found here.

---

## TABLE OF CONTENTS

1. [COLOR THEORY](#1-color-theory)
2. [TYPOGRAPHY](#2-typography)
3. [LAYOUT & SPACING](#3-layout--spacing)
4. [UI DESIGN PATTERNS & TRENDS (2025)](#4-ui-design-patterns--trends-2025)
5. [BRAND-SPECIFIC DESIGN RULES](#5-brand-specific-design-rules-for-prisca-dezigns-empire)
6. [CSS TECHNIQUES (MODERN)](#6-css-techniques-modern)
7. [WEBSITE PERFORMANCE & ACCESSIBILITY](#7-website-performance--accessibility)
8. [VISION BOARD STANDARDS](#8-vision-board-standards-for-prisca-dezigns-agency)

---

## 1. COLOR THEORY

### 1.1 Color Wheel Basics

The color wheel is the designer's foundation. Every harmonious palette traces back to geometric relationships on this wheel.

**Primary Colors:** Red (`#FF0000`), Blue (`#0000FF`), Yellow (`#FFFF00`)
**Secondary Colors:** Orange, Green, Violet — formed by mixing primaries
**Tertiary Colors:** Red-Orange, Yellow-Orange, Yellow-Green, Blue-Green, Blue-Violet, Red-Violet

**Key Terms:**
- **Hue** — the pure color (red, blue, purple)
- **Tint** — hue + white added (lighter)
- **Shade** — hue + black added (darker)
- **Tone** — hue + gray added (muted)
- **Saturation** — intensity/purity of a color
- **Luminance/Value** — how light or dark a color is

**HSL (Hue, Saturation, Lightness)** is the most useful model for web design:
```css
/* Purple base */
hsl(270, 70%, 50%)  /* base purple */
hsl(270, 70%, 70%)  /* tint — lighter */
hsl(270, 70%, 30%)  /* shade — darker */
hsl(270, 40%, 50%)  /* tone — muted */
```

---

### 1.2 Color Harmonies

#### **Monochromatic**
Single hue, varied lightness/saturation. Safe, elegant, sophisticated.
```
Base: #7B2FBE (purple)
Tint 1: #A855F7
Tint 2: #C084FC
Tint 3: #E9D5FF
Shade 1: #5B21B6
Shade 2: #3B0764
```
✅ Best for: luxury brands, editorial design, minimal SaaS

#### **Analogous**
3–5 adjacent colors on the wheel. Harmonious, natural, calm.
```
Purple → Violet → Blue-Violet
#7B2FBE → #6D28D9 → #4C1D95
```
✅ Best for: creative agencies, portfolios, lifestyle brands

#### **Complementary**
Two colors directly opposite on the wheel. High contrast, vibrant.
```
Purple (#7B2FBE) + Yellow-Green (#A3E635)
```
⚠️ Use complementary pairs for accents only — never as equal-weight pairings for backgrounds/text. Too much creates visual tension.

#### **Split-Complementary**
Base color + two colors adjacent to its complement. More nuanced than straight complementary.
```
Purple (#7B2FBE) + Yellow (#FACC15) + Yellow-Green (#A3E635)
```
✅ Best for: colorful marketing sites, event brands

#### **Triadic**
Three colors evenly spaced (120° apart). Dynamic, balanced.
```
Purple (#7B2FBE) + Red-Orange (#EF4444) + Green (#22C55E)
```
⚠️ Works best when one color dominates (60%) and the others accent (20%/20%)

#### **Tetradic / Square**
Four colors evenly spaced (90° apart). Rich, complex — hard to balance.
Use sparingly, usually for illustration-heavy or gaming brands.

---

### 1.3 Building Brand Palettes

The **60-30-10 Rule:**
- **60%** — Dominant/background color (neutral: black, white, dark gray)
- **30%** — Secondary color (main brand hue)
- **10%** — Accent color (pop, CTA, highlight)

**Complete Palette Architecture:**

| Token | Purpose | Example (Purple Brand) |
|-------|---------|----------------------|
| `--color-bg` | Page background | `#0A0A0F` |
| `--color-surface` | Card background | `#12121A` |
| `--color-surface-2` | Elevated card | `#1A1A26` |
| `--color-border` | Dividers, outlines | `#2A2A3D` |
| `--color-primary` | Main brand hue | `#8B5CF6` |
| `--color-primary-light` | Hover/glow variant | `#A78BFA` |
| `--color-primary-dark` | Pressed state | `#7C3AED` |
| `--color-accent` | CTA, highlights | `#E879F9` (fuchsia) |
| `--color-text-primary` | Headings | `#F8F8FF` |
| `--color-text-secondary` | Body text | `#C4C4D4` |
| `--color-text-muted` | Captions, labels | `#6B6B8A` |
| `--color-success` | Positive states | `#22C55E` |
| `--color-warning` | Alerts | `#F59E0B` |
| `--color-error` | Errors | `#EF4444` |

---

### 1.4 Color Psychology for Brands

#### 🟣 Purple
**Signals:** Luxury, wisdom, royalty, creativity, spirituality, mystery, ambition  
**Brand personality:** Premium, imaginative, sophisticated  
**When to use:** High-end services, creative agencies, tech brands wanting to feel premium without the coldness of pure black  
**When to AVOID:** Healthcare (can feel unclean), fast food, budget brands  

**Purple Tint/Shade Derivation from `#8B5CF6`:**
```
#8B5CF6  — Base (Violet 500)
#A78BFA  — Tint 1 (Violet 400) — hover states, secondary buttons
#C4B5FD  — Tint 2 (Violet 300) — disabled states, subtle highlights
#EDE9FE  — Tint 3 (Violet 100) — light backgrounds, light mode surfaces
#7C3AED  — Shade 1 (Violet 600) — pressed buttons, active links
#6D28D9  — Shade 2 (Violet 700) — dark emphasis
#4C1D95  — Shade 3 (Violet 900) — darkest text on light bg
```

**Glow effect on dark bg:**
```css
.purple-glow {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.4),
              0 0 60px rgba(139, 92, 246, 0.2);
}
```

#### 🩷 Pink / Fuchsia
**Signals:** Boldness, energy, fun, feminine power, youth, playfulness, disruption  
**Brand personality:** Confident, unapologetic, expressive  
**Fuchsia specifically:** Modern luxury — used by high-fashion brands and bold digital products  
**When to use:** Fashion tech, entertainment, lifestyle brands targeting Gen Z/millennials  

**Fuchsia Scale from `#E879F9`:**
```
#FAE8FF  — Fuchsia 100 (light bg tint)
#F0ABFC  — Fuchsia 300 (soft highlight)
#E879F9  — Fuchsia 400 (base)
#D946EF  — Fuchsia 500 (primary action)
#A21CAF  — Fuchsia 800 (deep, dark mode)
```

**Use fuchsia as an accent color against purple backgrounds** — creates a vibrant, premium glow effect:
```css
.accent-glow {
  background: #D946EF;
  box-shadow: 0 0 30px rgba(217, 70, 239, 0.5);
}
```

#### ⬛ Black / Dark
**Signals:** Power, premium, sophistication, mystery, authority, elegance  
**Important nuance:** Pure `#000000` black is harsh online — use near-black instead  
**Recommended dark backgrounds:**
```
#0A0A0F  — Almost black with purple undertone (Prisca Dezigns' base)
#0D0D1A  — Dark with blue-violet undertone
#111118  — Neutral very dark
#1A1A1A  — Pure near-black (minimal brands)
```
**When to use:** SaaS platforms, luxury brands, agencies wanting to convey premium quality

#### ⬜ White / Light
**Signals:** Cleanliness, simplicity, trust, openness, minimalism  
**Recommended light backgrounds:**
```
#FFFFFF  — Pure white (clinical, use sparingly)
#FAFAFA  — Soft white (most websites)
#F8F7FF  — White with purple undertone (light mode for purple brands)
#F5F0FF  — Very light lavender bg
```
**When to use:** Editorial brands, coaching/wellness, productivity tools, portfolios

---

### 1.5 Dark Mode Color Rules

#### Minimum Contrast Ratios (WCAG 2.2)
- **Normal text (< 18px):** 4.5:1 minimum (AA), 7:1 (AAA)
- **Large text (≥ 18px bold or ≥ 24px):** 3:1 minimum (AA), 4.5:1 (AAA)
- **UI components & icons:** 3:1 minimum (AA)

**Testing tools:** Contrast Checker (WebAIM), Browser DevTools accessibility panel

#### How to Derive Dark Mode Palettes from Light Mode

The principle: DON'T just invert colors — this creates jarring results. Instead, **reassign roles**.

| Light Mode Token | Light Value | Dark Mode Value | Logic |
|-----------------|-------------|-----------------|-------|
| `--bg` | `#FFFFFF` | `#0A0A0F` | Swap background |
| `--surface` | `#F5F0FF` | `#12121A` | Invert elevation |
| `--text-primary` | `#1A0533` | `#F8F8FF` | Swap text |
| `--text-secondary` | `#4B3568` | `#C4C4D4` | Muted middle |
| `--primary` | `#7C3AED` | `#8B5CF6` | Slightly lighter — glow better |
| `--border` | `#E2D9F0` | `#2A2A3D` | Subtle dividers |

#### Surface Layer System (Dark Mode)
Build depth through layered elevation:
```css
:root[data-theme="dark"] {
  --color-bg:        #0A0A0F;   /* Base — page background */
  --color-surface-0: #0F0F18;   /* Ground level cards */
  --color-surface-1: #14141F;   /* Normal cards */
  --color-surface-2: #1A1A2C;   /* Elevated / modal cards */
  --color-surface-3: #22223A;   /* Dropdowns, tooltips */
  --color-surface-hover: #26263E; /* Interactive hover state */
  --color-border:    #2E2E45;   /* Subtle borders */
  --color-border-strong: #4A4A6A; /* Emphasized borders */
}
```

**Key Rule:** Each elevation level is approximately 5-8% lighter in HSL lightness than the one below it. Never use pure black or fully transparent overlays.

---

### 1.6 Common Mistakes to Avoid

1. **Using pure black (`#000000`) backgrounds** — use near-black with a brand undertone
2. **Using pure white (`#FFFFFF`) text on dark backgrounds** — use `#F8F8FF` or `#EFEFFF` for softer feel
3. **Too many colors** — stick to 2-3 brand hues max. More = chaos
4. **Low contrast on colored backgrounds** — always check text against every bg it appears on
5. **Using purple text on red backgrounds (or any complementary combo)** — chromatic vibration makes text unreadable
6. **Not defining a neutral scale** — every palette needs grays/neutrals to breathe
7. **Ignoring dark mode undertones** — dark gray with brand hue undertone feels intentional; neutral dark gray feels lazy
8. **Relying only on color for state indication** — add icons or text labels too (colorblind users)
9. **Saturating dark surfaces** — on dark mode, reduce saturation as surfaces get lighter (not increase it)
10. **Making accent colors the background** — accents should be used sparingly: CTAs, icons, highlighted text

---

## 2. TYPOGRAPHY

### 2.1 Type Scale (Modular Scale)

A modular scale creates mathematical harmony between type sizes. Pick a base size (usually 16px) and a ratio.

**Common Ratios:**
- **1.25 (Major Third)** — subtle, great for text-heavy content (blogs, docs, SaaS)
- **1.333 (Perfect Fourth)** — balanced, most versatile for marketing sites
- **1.5 (Perfect Fifth)** — dramatic, great for landing pages and portfolios
- **1.618 (Golden Ratio)** — very dramatic, use only for hero-centric designs

**Scale Example using 1.333 (Perfect Fourth), Base 16px:**

| Level | Size | CSS Variable | Usage |
|-------|------|-------------|-------|
| xs | 12px | `--text-xs` | Captions, labels, legal |
| sm | 14px | `--text-sm` | Secondary body, metadata |
| base | 16px | `--text-base` | Primary body text |
| md | 21px | `--text-md` | Large body, lead text |
| lg | 28px | `--text-lg` | H3, section titles |
| xl | 37px | `--text-xl` | H2 |
| 2xl | 50px | `--text-2xl` | H1 |
| 3xl | 66px | `--text-3xl` | Display / Hero headline |
| 4xl | 88px | `--text-4xl` | Hero jumbo (landing pages) |

**CSS implementation with fluid scaling:**
```css
:root {
  --text-xs:   clamp(10px, 1.5vw, 12px);
  --text-sm:   clamp(12px, 2vw, 14px);
  --text-base: clamp(14px, 2.5vw, 16px);
  --text-md:   clamp(18px, 3vw, 21px);
  --text-lg:   clamp(22px, 4vw, 28px);
  --text-xl:   clamp(28px, 5vw, 37px);
  --text-2xl:  clamp(36px, 6vw, 50px);
  --text-3xl:  clamp(44px, 8vw, 66px);
  --text-4xl:  clamp(52px, 10vw, 88px);
}
```

---

### 2.2 Font Pairing Rules

**The Core Principle:** Pair fonts that contrast in personality but harmonize in mood.

**Rules:**
1. **Never pair two display/decorative fonts** — one must be the "workhorse" (body-friendly)
2. **Serif + Sans-Serif** — classic, always works
3. **Display + Neutral** — expressive headline + legible body
4. **Match the "era"** — don't pair geometric modern with ornate Victorian
5. **Limit to 2 fonts max** (3 only if you need a mono for code)
6. **Use font weight variation BEFORE adding a third font**

**Weight as hierarchy tool:**
```
H1: Font A, Weight 800
H2: Font A, Weight 700  
H3: Font A, Weight 600
Body: Font B, Weight 400
Strong/Bold: Font B, Weight 600
Caption: Font B, Weight 400, smaller size
```

---

### 2.3 Font Weights and Hierarchy

| Weight | Name | Typical Use |
|--------|------|------------|
| 100 | Thin | Display text only, large sizes |
| 200 | ExtraLight | Elegant subtitles |
| 300 | Light | Captions, secondary info |
| 400 | Regular | Body text |
| 500 | Medium | Emphasized body, nav links |
| 600 | SemiBold | Subheadings, card titles |
| 700 | Bold | H2, H3, buttons |
| 800 | ExtraBold | H1, hero headlines |
| 900 | Black/Heavy | Display text, impact statements |

**Golden Rule:** Headlines should be at least 2-3 weight levels above body text. If body is 400, headline should be 700+.

---

### 2.4 Line Height, Letter Spacing, Paragraph Width Rules

#### Line Height (Leading)
```css
/* Display text — tight */
.display { line-height: 1.0 to 1.1; }

/* Headlines */
.heading { line-height: 1.2 to 1.3; }

/* Subheadings */
.subheading { line-height: 1.3 to 1.4; }

/* Body text — generous for readability */
.body { line-height: 1.5 to 1.7; }

/* Long-form article text */
.article { line-height: 1.7 to 1.8; }
```

#### Letter Spacing (Tracking)
```css
/* Display / Heroes — tight */
.display { letter-spacing: -0.03em to -0.02em; }

/* Headlines */
.heading { letter-spacing: -0.02em to 0em; }

/* Body */
.body { letter-spacing: 0em to 0.01em; }

/* Uppercase labels, buttons, nav — always add tracking */
.label-uppercase { letter-spacing: 0.08em to 0.15em; }
```

#### Paragraph Width (Measure)
- **Optimal:** 60–75 characters per line (approximately 45–75ch in CSS)
- **Too narrow:** < 45 characters — choppy reading experience
- **Too wide:** > 85 characters — eye fatigue

```css
.article-body {
  max-width: 65ch;  /* ~65 characters wide */
}

.narrow-column {
  max-width: 45ch;
}

.wide-content {
  max-width: 75ch;
}
```

---

### 2.5 Best Font Pairs for Different Brand Personalities

#### 🖤 Luxury / Editorial
**Pair: Cormorant Garamond + Jost**
- Cormorant Garamond (Display, 300/400) — headlines
- Jost (Regular, Medium) — body text
- Character: Old money elegance meets modern sensibility
- Use for: High-fashion, fine dining, luxury products, editorial blogs
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

h1, h2 { font-family: 'Cormorant Garamond', serif; font-weight: 300; letter-spacing: -0.02em; }
body    { font-family: 'Jost', sans-serif; font-weight: 400; }
```

#### 💻 Tech / Modern
**Pair: Space Grotesk + Inter**
- Space Grotesk (Bold/ExtraBold) — headlines, hero text
- Inter (Regular/Medium) — body, UI elements
- Character: Technical precision with a distinct personality
- Use for: SaaS platforms, tech startups, developer tools
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap');

h1, h2, h3 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; }
body, p, li { font-family: 'Inter', sans-serif; font-weight: 400; }
```

#### 💪 Bold / Athletic
**Pair: Oswald + Barlow**
- Oswald (Bold/Heavy) — condensed impact headlines
- Barlow (Regular/Medium) — readable body
- Character: Power, speed, intensity
- Use for: Sports brands, fitness apps, streetwear, gaming
```css
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap');

h1, h2 { font-family: 'Oswald', sans-serif; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; }
body    { font-family: 'Barlow', sans-serif; font-weight: 400; }
```

#### 🎨 Playful / Friendly
**Pair: Nunito + DM Sans**
- Nunito (ExtraBold/Black) — rounded, approachable headlines
- DM Sans (Regular/Medium) — clean, modern body
- Character: Joyful but professional
- Use for: Education platforms, community apps, kid-adjacent brands, wellness
```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

h1, h2 { font-family: 'Nunito', sans-serif; font-weight: 800; }
body    { font-family: 'DM Sans', sans-serif; font-weight: 400; }
```

#### 🏦 Classic / Trust
**Pair: IBM Plex Serif + IBM Plex Sans**
- IBM Plex Serif (Regular/Bold) — authoritative headlines
- IBM Plex Sans (Regular) — clean, reliable body
- Character: Institutional trust with a modern sensibility
- Use for: Finance, legal tech, healthcare, enterprise SaaS
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

h1, h2, h3 { font-family: 'IBM Plex Serif', serif; font-weight: 600; }
body        { font-family: 'IBM Plex Sans', sans-serif; font-weight: 400; }
```

#### 🔮 Premium Dark/Purple Brand (Prisca Dezigns House Style)
**Pair: Syne + DM Sans**
- Syne (ExtraBold) — headline with futuristic personality
- DM Sans (Regular/Medium) — clean body
- Alternative: **Plus Jakarta Sans + Inter** for maximum legibility
```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500&display=swap');
```

---

### 2.6 2025 Typography Trends

1. **Oversized / Kinetic Typography** — Hero headlines at 80-120px, sometimes animated letter by letter
2. **Variable Fonts** — One font file, infinite weight/width variations — use `font-variation-settings`
3. **Fluid Typography with clamp()** — Smooth scaling between mobile and desktop without breakpoints
4. **Serif Revival** — Editorial brands returning to elegant serif fonts (Playfair, Cormorant, Freight)
5. **Type as Texture/Hero Art** — Giant background text, text masks, outlined letters
6. **Tight Tracking on Display Text** — Condensed, bold headlines at -0.03em to -0.05em
7. **Mixed Weight within a Sentence** — "Your brand *deserves* better" with italic emphasis mid-sentence
8. **Monospace Accents** — Code-style mono fonts for tech detail, data display (JetBrains Mono, IBM Plex Mono)

---

## 3. LAYOUT & SPACING

### 3.1 The 8px Grid System

**Everything should be divisible by 8 (or 4 for sub-units).**

This creates visual consistency that feels "right" even when users can't name why.

**The Scale:**
```
4px   — micro gap (between icon and label, inline elements)
8px   — small gap (tight card padding, small spacing)
16px  — base unit (standard gap, button padding horizontal)
24px  — medium spacing (card padding, section internal gap)
32px  — standard block spacing
40px  — comfortable section gap
48px  — larger section gap
64px  — section separator (mobile)
80px  — section separator (tablet)
96px  — section separator (desktop)
128px — hero-level vertical padding
```

**CSS Implementation:**
```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
}
```

---

### 3.2 Visual Hierarchy

The 5 tools of visual hierarchy (in order of impact):

1. **SIZE** — The biggest element commands first attention. Hero headline should be 4-6x the body text size
2. **WEIGHT** — Bold text pops against regular text. Use strategic bolding, not excessive
3. **COLOR** — Accent color draws the eye. Use your brand accent on the single most important element on a page
4. **POSITION** — Top-left to bottom-right reading pattern (F-pattern and Z-pattern scanning)
5. **WHITESPACE** — Space around an element elevates it. Isolate your most important elements with breathing room

**Hierarchy Checklist for Every Page:**
- [ ] Is there a single, clear H1?
- [ ] Does the primary CTA stand out from everything else?
- [ ] Are H2s noticeably smaller than H1 but bigger than H3?
- [ ] Is body text comfortable to read (not fighting with headings)?
- [ ] Does the page have one "loudest" element per section?

---

### 3.3 Bento Grid Layout

**What it is:** Inspired by Japanese lunch boxes, a Bento grid arranges content into asymmetric rectangular compartments of varying sizes — creating visual rhythm without chaos.

**Why it works in 2025:**
- Feels organized and modern
- Works naturally on mobile (stack vertically)
- Each cell can have its own content type (text, image, video, chart)
- Apple, Notion, Linear all use it prominently

**Anatomy of a Bento Grid:**
```
┌─────────────────────┬───────────┐
│                     │           │
│   HERO / FEATURE    │  STAT 1   │
│   (col-span-2)      │           │
├────────────┬────────┼───────────┤
│            │        │           │
│  FEATURE 2 │  F3    │  STAT 2   │
│            │        │           │
└────────────┴────────┴───────────┘
```

**CSS Grid Implementation:**
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: 16px;
}

.bento-hero {
  grid-column: span 2;
  grid-row: span 2;
}

.bento-tall {
  grid-row: span 2;
}

.bento-wide {
  grid-column: span 2;
}

/* Mobile — all cards full width */
@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
  .bento-hero, .bento-tall, .bento-wide {
    grid-column: span 1;
    grid-row: span 1;
  }
}
```

**Best Practices:**
- Keep 4-8 cells per grid section
- Use `border-radius: 16px` to 24px on cards
- Consistent gap (16px or 24px)
- Let one cell be dramatically larger than the rest
- Use `overflow: hidden` on grid items for clean image containment

---

### 3.4 Hero Section Best Practices

**Above-the-fold is your first (and sometimes only) impression. You have 3-5 seconds.**

**Must-Haves in Every Hero:**
1. **Headline** — Clear, benefit-driven, ≤ 10 words ideally
2. **Subheadline** — Expands on headline, addresses the "so what?" — 1-2 sentences
3. **Primary CTA** — One button. Make it obvious. Never two equal-weight CTAs
4. **Visual** — Product screenshot, illustration, or strong background image/video
5. **Trust signal** (optional but powerful) — "Trusted by 10,000+ creators" or logos

**Layout Patterns:**
- **Left-text / Right-visual** — Most common, high conversion
- **Center-aligned** — Works for simple SaaS, portfolios, bold statements
- **Full-bleed background** — Immersive, works for editorial and luxury brands
- **Split-screen** — Two equal halves, good for comparison/choice-driven brands

**2025 Hero Trends:**
- Extremely large display typography (80-120px headlines)
- Kinetic / animated text (letters animate in on load)
- Gradient mesh backgrounds (aurora/noise effect)
- Scroll-triggered reveals (content fades in as user scrolls)
- Interactive backgrounds (particle systems, 3D elements)

**Performance Note:** Hero images should be:
- Max 200-400KB for background images
- Use `loading="eager"` (not lazy) for the hero image
- Use `fetchpriority="high"` attribute
- Serve WebP format

---

### 3.5 Card Design Patterns

**Standard Card Anatomy:**
```
┌────────────────────────────┐
│  [Image or icon area]       │
├────────────────────────────┤
│  Tag/Category               │
│  Card Title (H3 weight)     │
│  Description text (body)    │
│  [CTA link or button]       │
└────────────────────────────┘
```

**Card CSS Base (Dark Theme):**
```css
.card {
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.15),
              0 0 0 1px rgba(139, 92, 246, 0.1);
}
```

**Card Variants:**
1. **Feature Card** — Large, full-width, hero content
2. **Stat Card** — Small, single number/metric
3. **Testimonial Card** — Quote, avatar, name
4. **Product Card** — Image dominant, price, CTA
5. **Blog Card** — Thumbnail, date, title, excerpt

---

### 3.6 Section Padding Rules

**Desktop:**
```css
.section {
  padding-top: 96px;    /* --space-24 */
  padding-bottom: 96px;
}

.section--large {
  padding-top: 128px;   /* --space-32 */
  padding-bottom: 128px;
}

.container {
  max-width: 1200px;  /* or 1280px */
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
}
```

**Tablet (768px–1024px):**
```css
@media (max-width: 1024px) {
  .section { padding-top: 80px; padding-bottom: 80px; }
  .container { padding-left: 32px; padding-right: 32px; }
}
```

**Mobile (< 768px):**
```css
@media (max-width: 768px) {
  .section { padding-top: 64px; padding-bottom: 64px; }
  .container { padding-left: 20px; padding-right: 20px; }
}
```

---

### 3.7 Responsive / Mobile-First Principles

**Mobile-First means writing CSS for mobile FIRST, then adding complexity for larger screens:**

```css
/* Mobile BASE (no media query needed) */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Tablet */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}
```

**Standard Breakpoints (2025):**
```css
/* Mobile first breakpoints */
--bp-sm:  480px;   /* Large phones */
--bp-md:  768px;   /* Tablets */
--bp-lg:  1024px;  /* Small desktop / large tablet */
--bp-xl:  1280px;  /* Desktop */
--bp-2xl: 1536px;  /* Wide desktop */
```

**Mobile Design Rules:**
- Minimum touch target: 44x44px (Apple HIG) / 48x48px (Material Design)
- Thumb zone: Center-bottom of screen is easiest to reach
- Single column layouts for all primary content on mobile
- Bottom navigation for apps (not top nav)
- Font minimum: 14px for body, 12px for captions
- No hover-only interactions — every hover state must have a touch equivalent

---

## 4. UI DESIGN PATTERNS & TRENDS (2025)

### 4.1 Glassmorphism

**What it is:** Frosted glass effect — translucent surfaces with blur, subtle borders, and transparency. Creates depth on layered, colorful backgrounds.

**When to use:** Modals, floating cards, nav bars, dashboard widgets, hero overlays

**When NOT to use:** On plain white/black backgrounds (the effect needs a colorful background behind it to show), body text containers (readability suffers)

**CSS Implementation:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);       /* light bg: rgba(255,255,255,0.7) */
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Purple-tinted glass (Prisca Dezigns style) */
.glass-purple {
  background: rgba(139, 92, 246, 0.08);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;
}
```

**Key Parameters:**
- `blur()`: 8px = light, 12px = standard, 20px+ = heavy
- Background opacity: 0.05-0.15 for dark mode, 0.5-0.85 for light mode
- Border: 1px with 10-20% opacity white or brand color
- Always provide fallback for browsers without `backdrop-filter` support

**Performance warning:** Heavy use of `backdrop-filter` tanks performance on mobile. Use on maximum 2-3 elements per page.

---

### 4.2 Neubrutalism (Neo-Brutalism)

**What it is:** A digital interpretation of architectural brutalism — raw, unapologetic, expressive. Bold borders, heavy shadows, flat bright colors, intentionally "broken" design rules.

**Characteristics:**
- Thick, solid borders (2-4px) in black or dark color
- Offset box shadows (not blurred — hard shadow, offset 4-8px)
- High-contrast, saturated colors (lime, hot pink, electric yellow)
- Simple shapes, no gradients in the purest form
- Almost "hand-made" feel

**CSS Implementation:**
```css
.neubrutalist-card {
  background: #FAFAFA;
  border: 3px solid #000000;
  border-radius: 8px;           /* slight radius or 0px */
  box-shadow: 6px 6px 0px #000000;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.neubrutalist-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0px #000000;
}

/* Neubrutalist button */
.neu-btn {
  background: #FFE500;          /* electric yellow or brand color */
  border: 2px solid #000000;
  border-radius: 6px;
  box-shadow: 4px 4px 0px #000000;
  font-weight: 700;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.neu-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #000000;
}

.neu-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #000000;
}
```

**When to use:** Creative agencies, portfolio sites, edgy startups, cultural brands, Gen Z-targeted products  
**When to AVOID:** Finance, healthcare, enterprise, luxury

---

### 4.3 Dark Mode Design

**2025 Reality:** Dark mode is now expected on all premium digital products. 58%+ of users prefer dark mode.

**Dark Mode Design Principles:**
1. **Don't just invert** — Completely rethink the color hierarchy for dark contexts
2. **Elevation through lightness** — Higher surfaces = slightly lighter (see Section 1.5)
3. **Desaturate slightly at high elevations** — Prevents neon-glow effect on light surfaces
4. **Glows replace shadows** — In dark mode, colored glows work better than dark box shadows
5. **Images need dark treatment** — Consider dark overlays on hero images, dark-mode illustration variants

**Dark Mode Glow System:**
```css
/* Subtle ambient glow for primary elements */
.primary-glow {
  box-shadow: 0 0 0 1px rgba(139, 92, 246, 0.3),
              0 4px 16px rgba(139, 92, 246, 0.2);
}

/* Strong CTA glow */
.cta-glow {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.5),
              0 0 60px rgba(139, 92, 246, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Fuchsia accent glow */
.accent-glow {
  box-shadow: 0 0 20px rgba(217, 70, 239, 0.4),
              0 0 40px rgba(217, 70, 239, 0.15);
}
```

---

### 4.4 Micro-interactions & Animations

**What are micro-interactions:** Small, purposeful animations triggered by user actions that provide feedback, guide attention, and delight users.

**The 4 Parts of a Micro-interaction:**
1. **Trigger** — What starts it (click, hover, scroll, load)
2. **Rules** — What happens (button changes color, icon spins)
3. **Feedback** — Visual/audio/haptic response
4. **Loops & Modes** — Does it repeat? Does it end?

**Key Micro-interactions to Implement:**
- **Button hover/press:** Scale + color shift + shadow
- **Input focus:** Border highlight + label float up
- **Success state:** Checkmark animation + green flash
- **Loading state:** Skeleton screens or spinner
- **Toggle switch:** Smooth slide + color change
- **Navigation hover:** Underline slides in
- **Card hover:** Lift + shadow + border glow
- **Scroll reveal:** Elements fade/slide in as they enter viewport

**CSS Examples:**
```css
/* Button micro-interaction */
.btn {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.45);
}

.btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
}

/* Floating label input */
.input-group {
  position: relative;
}

.input-label {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  transition: all 0.2s ease;
  font-size: var(--text-base);
  color: var(--color-text-muted);
  pointer-events: none;
}

.input-field:focus ~ .input-label,
.input-field:not(:placeholder-shown) ~ .input-label {
  top: 0;
  font-size: var(--text-xs);
  color: var(--color-primary);
  background: var(--color-surface-1);
  padding: 0 4px;
}

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Animation Duration Guidelines:**
- Micro (hover, click): 150-200ms
- Small transitions: 200-300ms
- Page transitions: 300-500ms
- Reveals/entrances: 400-600ms
- Loading/progress: 800ms+ (match actual load time)
- Never exceed 600ms for UI feedback (feels sluggish)

---

### 4.5 Bento Box Layouts

*(See Section 3.3 for technical implementation)*

**Why Bento is Dominant in 2025:**
- Apple popularized it in their product pages (macOS Ventura launch)
- Notion, Linear, Vercel all use Bento for feature showcases
- Works brilliantly for feature comparison, stats, portfolios
- Naturally responsive — stacks cleanly on mobile

**Content that works in Bento cells:**
- Large stat number + label
- App screenshot with caption
- Short testimonial quote
- Icon + feature description
- Short video loop
- Mini chart/graph
- Tag cloud

---

### 4.6 Gradient Techniques

#### **Mesh Gradients / Aurora Effect**
Organic, multi-point gradients that look like light through water.
```css
.aurora-bg {
  background: 
    radial-gradient(ellipse at 20% 50%, rgba(120, 40, 200, 0.6) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(217, 70, 239, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
    #0A0A0F;
}
```

#### **Noise / Grain Texture Overlay**
Adds texture to gradients, preventing the "too digital" look:
```css
.noise-overlay {
  position: relative;
}

.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise pattern */
  opacity: 0.04;
  pointer-events: none;
}
```

#### **Gradient Text**
```css
.gradient-text {
  background: linear-gradient(135deg, #8B5CF6 0%, #E879F9 50%, #A78BFA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

#### **Border Gradients**
```css
.gradient-border {
  position: relative;
  border-radius: 16px;
  background: var(--color-surface-1);
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(135deg, #8B5CF6, #E879F9);
  -webkit-mask: linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

---

### 4.7 3D Elements & Depth

**2025 Approach:** Subtle depth and dimension — not full 3D renders, but tasteful depth cues.

**Techniques:**
1. **Perspective tilt on hover** — Cards tilt on mouse position
2. **Layered parallax** — Background/mid/foreground elements move at different speeds
3. **CSS 3D transforms** — `perspective`, `rotateX()`, `rotateY()`
4. **Spline / Three.js embedded 3D** — For hero backgrounds
5. **Depth of field** — Blur elements in "background" layer

```css
/* Card 3D tilt effect (via JavaScript mouse tracking) */
.card-3d {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

/* Applied via JS based on mouse position */
/* card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)` */
```

---

### 4.8 Dynamic / AI-Personalized UI

**Emerging in 2025:**
- Hero section copy changes based on referral source
- Color themes adapt to user preferences
- Content reorders based on browsing behavior
- AI-generated personalized product recommendations shown in the hero

**Implementation approach:**
- CSS variables controlled by JavaScript allow instant theme switching
- `prefers-color-scheme` media query for automatic dark/light mode
- URL parameters for campaign-specific hero text
- Local storage for remembering user preferences

---

## 5. BRAND-SPECIFIC DESIGN RULES (for Prisca Dezigns Empire)

### 5.1 Purple & Black Brands (Prisca Dezigns, Trovren, Qrovix, etc.)

**Identity:** Premium, powerful, innovative, mysterious-yet-clear

#### Exact CSS Variable Structure:
```css
/* Prisca Dezigns Dark Theme */
:root {
  /* Core palette */
  --pd-purple-50:  #FAF5FF;
  --pd-purple-100: #F3E8FF;
  --pd-purple-200: #E9D5FF;
  --pd-purple-300: #D8B4FE;
  --pd-purple-400: #C084FC;
  --pd-purple-500: #A855F7;
  --pd-purple-600: #9333EA;
  --pd-purple-700: #7E22CE;
  --pd-purple-800: #6B21A8;
  --pd-purple-900: #581C87;
  --pd-purple-950: #3B0764;

  /* Fuchsia accent */
  --pd-fuchsia-400: #E879F9;
  --pd-fuchsia-500: #D946EF;
  --pd-fuchsia-600: #C026D3;

  /* Semantic tokens — DARK MODE */
  --color-bg:           #080810;
  --color-surface-0:    #0D0D1A;
  --color-surface-1:    #12121F;
  --color-surface-2:    #18182A;
  --color-surface-3:    #1F1F35;
  --color-surface-hover:#252540;
  --color-border:       #2A2A42;
  --color-border-focus: var(--pd-purple-600);

  --color-primary:       var(--pd-purple-500);
  --color-primary-hover: var(--pd-purple-400);
  --color-primary-dark:  var(--pd-purple-600);
  --color-accent:        var(--pd-fuchsia-500);
  --color-accent-hover:  var(--pd-fuchsia-400);

  --color-text-primary:   #F0EEFF;
  --color-text-secondary: #B8B0D8;
  --color-text-muted:     #6B6485;

  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error:   #EF4444;

  /* Shadows & Glows */
  --glow-primary: 0 0 20px rgba(168, 85, 247, 0.4), 0 0 60px rgba(168, 85, 247, 0.15);
  --glow-accent:  0 0 20px rgba(217, 70, 239, 0.4), 0 0 60px rgba(217, 70, 239, 0.15);
  --shadow-card:  0 4px 24px rgba(0, 0, 0, 0.4);
  --shadow-elevated: 0 8px 40px rgba(0, 0, 0, 0.5);
}
```

#### Tint/Shade Derivation Rules:
When creating new tints from `#A855F7` (purple-500):
- Add white in 10% increments in HSL lightness for tints
- Add black in 10% increments in HSL lightness for shades
- Adjust saturation slightly (reduce 5-10% as it gets lighter, maintain for darker)

#### Glow Effects on Dark Backgrounds:
```css
/* CTA Button with glow */
.btn-primary {
  background: linear-gradient(135deg, #A855F7, #9333EA);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  padding: 14px 28px;
  box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4);
  transition: all 0.25s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #C084FC, #A855F7);
  box-shadow: 0 8px 32px rgba(168, 85, 247, 0.6),
              0 0 0 1px rgba(168, 85, 247, 0.3);
  transform: translateY(-2px);
}

/* Accent CTA */
.btn-accent {
  background: linear-gradient(135deg, #D946EF, #C026D3);
  box-shadow: 0 4px 20px rgba(217, 70, 239, 0.45);
}

/* Outline variant */
.btn-outline {
  background: transparent;
  border: 1px solid var(--pd-purple-600);
  color: var(--pd-purple-400);
  box-shadow: inset 0 0 0 0 rgba(168, 85, 247, 0);
  transition: all 0.25s ease;
}

.btn-outline:hover {
  border-color: var(--pd-purple-500);
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.3),
              inset 0 0 16px rgba(168, 85, 247, 0.1);
  color: white;
}
```

---

### 5.2 Dark Tech Brands (SaaS Platforms)

**Identity:** Precise, reliable, modern, powerful

#### Card Elevation System:
```css
/* Level 0 — Base content area */
.card-l0 { background: #0F0F18; border: 1px solid #1E1E2E; }

/* Level 1 — Standard feature cards */
.card-l1 { background: #141420; border: 1px solid #252535; }

/* Level 2 — Highlighted / Featured cards */
.card-l2 { 
  background: #1A1A2C; 
  border: 1px solid #323250; 
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

/* Level 3 — Modal / Overlay */
.card-l3 { 
  background: #20202E; 
  border: 1px solid #3A3A5C;
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.6);
}
```

#### Accent Color Usage Rules:
- **Accent on interactive elements only** — links, buttons, active states, icons
- **Max 10% of page visual weight** should be the accent color
- **Never use accent for decorative background fills** — use surface colors
- **Accent glow only on CTAs and primary interactive elements**

#### CTA Button Design:
```css
/* Primary CTA — high visibility */
.saas-cta-primary {
  background: linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%);
  color: #FFFFFF;
  border-radius: 8px;
  padding: 16px 32px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.01em;
  border: none;
  cursor: pointer;
  position: relative;
  box-shadow: 0 4px 20px rgba(109, 40, 217, 0.4);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.saas-cta-primary:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.55);
}

/* Secondary CTA */
.saas-cta-secondary {
  background: rgba(139, 92, 246, 0.1);
  color: #A78BFA;
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 8px;
  padding: 15px 31px;  /* 1px less to account for border */
}
```

---

### 5.3 Light / Editorial Brands (Quiet Luxury, Deskwell, Writx, etc.)

**Identity:** Thoughtful, calm, premium, intentional

#### When to Use Dark Mode Toggle:
- **Always offer it** for productivity/writing tools (eye strain)
- **Default to system preference** using `prefers-color-scheme`
- **Never force dark mode** on editorial/luxury brands (breaks the light aesthetic)

#### Typography Choices:
- Headlines: Cormorant Garamond (300-400 weight) or Playfair Display
- Body: DM Sans, Jost, or Source Serif Pro
- Accents: Same serif as headline but italic

#### Whitespace Philosophy:
```css
/* Quiet luxury section spacing — more is more */
.editorial-section {
  padding-top: 120px;
  padding-bottom: 120px;
}

/* Editorial container — narrow and focused */
.editorial-container {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 40px;
}

/* Generous paragraph spacing */
.editorial-body p {
  margin-bottom: 1.75em;
  line-height: 1.85;
  font-size: 18px;
  max-width: 65ch;
}
```

**Key rules for editorial/luxury:**
- Never center-align large blocks of body text
- Use thin dividers (1px, 20% opacity) instead of section padding alone
- Generous margins — if in doubt, add more white space
- Imagery should breathe — don't crop too tight
- Color pops should be rare and meaningful (1-2 per page max)

---

### 5.4 Bold / Cultural Brands (Neh Neh, Panyard, Dreaming Anime, etc.)

**Identity:** Expressive, energetic, community-driven, unapologetic

#### High Contrast Approaches:
```css
/* Example: Caribbean cultural brand */
:root {
  --cultural-bg: #0D0D0D;
  --cultural-surface: #161616;
  --cultural-primary: #FF4800;    /* Vibrant orange */
  --cultural-secondary: #FFD600;  /* Electric yellow */
  --cultural-accent: #00E5FF;     /* Cyan pop */
  --cultural-text: #FAFAFA;
}

/* High contrast section — make it LOUD */
.cultural-hero {
  background: var(--cultural-bg);
  color: var(--cultural-text);
}

.cultural-headline {
  font-size: clamp(52px, 10vw, 120px);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 0.95;
  color: var(--cultural-primary);
}
```

#### Energy Without Chaos:
1. **One "loud" element per section** — not every element screaming
2. **Use whitespace as rest beats** — like music, silences make the loud parts hit harder
3. **Bold type + photography** — let strong imagery do the heavy lifting
4. **Color blocks** — large solid-color sections, not busy gradients everywhere
5. **Grid discipline** — even chaotic energy should have underlying alignment

#### Cultural Design Signals:
- **Caribbean (Panyard):** Warm yellows, oranges, rhythmic repetition in patterns, steel drum influence, vibrant but structured
- **Anime (Dreaming Anime):** Dark mode, neon accents (cyan/magenta), bold Japanese-inspired typography, dramatic lighting effects
- **West African-diaspora (Neh Neh):** Earth tones + vibrant jewel tones, Afrobeat rhythm in layout flow, pattern-forward design
- **Sports/Music culture:** Oversized type, grainy textures, black & white photography + color pop overlays

---

## 6. CSS TECHNIQUES (MODERN)

### 6.1 CSS Custom Properties (Variables) for Theming

```css
/* =============================================
   DESIGN SYSTEM FOUNDATION
   ============================================= */

:root {
  /* === SPACING === */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* === BORDER RADIUS === */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-full: 9999px;

  /* === TRANSITIONS === */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in:      cubic-bezier(0.4, 0, 1, 1);
  --ease-out:     cubic-bezier(0, 0, 0.2, 1);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);  /* bouncy */

  --duration-fast:   150ms;
  --duration-normal: 250ms;
  --duration-slow:   400ms;

  /* === Z-INDEX SCALE === */
  --z-below:   -1;
  --z-base:     0;
  --z-raised:   10;
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-overlay:  300;
  --z-modal:    400;
  --z-toast:    500;
  --z-top:      999;
}

/* Theme switching */
[data-theme="light"] {
  --color-bg: #FAFAFA;
  --color-text: #111118;
  /* etc... */
}

[data-theme="dark"] {
  --color-bg: #0A0A0F;
  --color-text: #F0EEFF;
  /* etc... */
}
```

---

### 6.2 CSS Grid vs Flexbox — When to Use Which

| Situation | Use | Reason |
|-----------|-----|--------|
| Page layout, complex 2D grids | **Grid** | True 2D control |
| Bento layouts | **Grid** | `grid-area`, `span` control |
| Card rows | **Grid** | Equal height cells |
| Navigation bar items | **Flexbox** | 1D row alignment |
| Centering an element | **Flexbox** | `justify-content + align-items` |
| Form layouts | **Grid** | Label/input column alignment |
| Component internals (button content) | **Flexbox** | Icon + text alignment |
| Responsive sidebars | **Grid** | `grid-template-columns: 250px 1fr` |

```css
/* === GRID: Page section with sidebar === */
.page-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* === FLEXBOX: Navigation === */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

/* === GRID: Feature cards === */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}
```

---

### 6.3 backdrop-filter for Glassmorphism

```css
/* Full glassmorphism component */
.glass {
  /* Background with transparency */
  background: rgba(10, 10, 15, 0.6);  /* dark */
  /* background: rgba(255, 255, 255, 0.7); light */
  
  /* The magic blur */
  backdrop-filter: blur(16px) saturate(160%) brightness(1.1);
  -webkit-backdrop-filter: blur(16px) saturate(160%) brightness(1.1);
  
  /* Subtle border for definition */
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Depth */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.06);
  
  border-radius: var(--radius-xl);
}

/* Fallback for browsers without backdrop-filter */
@supports not (backdrop-filter: blur(1px)) {
  .glass {
    background: rgba(10, 10, 15, 0.9);
  }
}
```

---

### 6.4 CSS Animations and Transitions

```css
/* =============================================
   KEYFRAME ANIMATIONS
   ============================================= */

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Slide up & fade in */
@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Scale in */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}

/* Pulse glow */
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
  50%       { box-shadow: 0 0 40px rgba(139, 92, 246, 0.7); }
}

/* Shimmer (loading skeleton) */
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}

/* Float (hero elements) */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}

/* Usage examples */
.hero-badge { animation: slideUpFade 0.6s var(--ease-out) 0.1s both; }
.hero-title { animation: slideUpFade 0.6s var(--ease-out) 0.2s both; }
.hero-sub   { animation: slideUpFade 0.6s var(--ease-out) 0.3s both; }
.hero-cta   { animation: slideUpFade 0.6s var(--ease-out) 0.4s both; }

.cta-primary { animation: pulseGlow 3s ease-in-out infinite; }
.floating-card { animation: float 4s ease-in-out infinite; }

/* Skeleton loading */
.skeleton {
  background: linear-gradient(90deg, 
    var(--color-surface-1) 25%, 
    var(--color-surface-3) 50%, 
    var(--color-surface-1) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 6.5 Gradient Text Technique

```css
/* Basic gradient text */
.gradient-text {
  background: linear-gradient(135deg, #A855F7 0%, #EC4899 50%, #F59E0B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Prevent clip cutting on ascenders/descenders */
  padding-bottom: 0.1em;
  display: inline-block;
}

/* Purple to fuchsia (Prisca Dezigns signature) */
.gradient-pd {
  background: linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Animated gradient text */
.gradient-animated {
  background: linear-gradient(270deg, #8B5CF6, #E879F9, #A855F7, #6D28D9);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease infinite;
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

---

### 6.6 Scroll Behavior and Scroll-Triggered Animations

```css
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Scroll snap for hero sections or carousels */
.scroll-container {
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

.scroll-section {
  scroll-snap-align: start;
  height: 100vh;
}
```

**JavaScript Intersection Observer for reveal animations:**
```javascript
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);  // remove after first reveal
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => observer.observe(el));
```

**Staggered reveal for lists:**
```javascript
document.querySelectorAll('.stagger-item').forEach((el, i) => {
  el.style.animationDelay = `${i * 0.1}s`;
  el.classList.add('reveal');
});
```

---

### 6.7 Container Queries

Container queries let components respond to their parent's size — not the viewport. Game-changer for reusable design systems.

```css
/* Define a containment context */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* Component adapts to its container */
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* When card container is wide enough, go horizontal */
@container card (min-width: 480px) {
  .card {
    flex-direction: row;
    align-items: center;
  }
  
  .card-image {
    width: 200px;
    flex-shrink: 0;
  }
}

/* When very wide */
@container card (min-width: 720px) {
  .card-title {
    font-size: var(--text-xl);
  }
}
```

---

## 7. WEBSITE PERFORMANCE & ACCESSIBILITY

### 7.1 Core Web Vitals (Google's Performance Standards)

| Metric | What it measures | Good | Needs Work | Poor |
|--------|-----------------|------|-----------|------|
| **LCP** (Largest Contentful Paint) | How fast the main content loads | < 2.5s | 2.5-4s | > 4s |
| **INP** (Interaction to Next Paint) | Response time to user input | < 200ms | 200-500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | Visual stability (no jumping) | < 0.1 | 0.1-0.25 | > 0.25 |
| **FCP** (First Contentful Paint) | First thing visible | < 1.8s | 1.8-3s | > 3s |
| **TTFB** (Time to First Byte) | Server response time | < 800ms | 800-1800ms | > 1800ms |

**Improving LCP:**
- Use `fetchpriority="high"` on hero images
- Preload critical fonts: `<link rel="preload" as="font">`
- Use WebP or AVIF image formats
- Eliminate render-blocking resources

**Preventing CLS:**
- Always set width and height on images and videos
- Reserve space for embeds and iframes
- Avoid injecting content above existing content
- Use `font-display: optional` or `swap` for font loading

---

### 7.2 Color Contrast Accessibility (WCAG 2.2)

**Contrast Ratio Requirements:**
- **Normal text (< 18px or < 14px bold):** 4.5:1 (AA) | 7:1 (AAA)
- **Large text (≥ 18px or ≥ 14px bold):** 3:1 (AA) | 4.5:1 (AAA)
- **UI Components (borders, icons, inputs):** 3:1 (AA)

**Key examples for Prisca Dezigns palette:**
```
White (#FFFFFF) on Dark bg (#0A0A0F): ratio ≈ 19:1 ✅ AAA
#F0EEFF on #0A0A0F: ratio ≈ 17:1 ✅ AAA
#A855F7 on #0A0A0F: ratio ≈ 5.5:1 ✅ AA (barely — not for small body text)
#8B5CF6 on #0A0A0F: ratio ≈ 4.2:1 ⚠️ Fails AA for small text
#C084FC on #0A0A0F: ratio ≈ 8.1:1 ✅ AAA

RULE: Never use mid-purple as body text on dark bg. Use light purple (300-200) or white.
```

**Testing tools:**
- WebAIM Contrast Checker (webaim.org/resources/contrastchecker)
- Chrome DevTools Accessibility panel
- axe DevTools browser extension

---

### 7.3 Font Loading Optimization

```html
<!-- Step 1: Preconnect to font origin -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Step 2: Preload the most critical font file -->
<link rel="preload" 
      href="/fonts/SpaceGrotesk-Bold.woff2" 
      as="font" 
      type="font/woff2" 
      crossorigin>

<!-- Step 3: Load with display=swap to prevent FOIT -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
```

```css
/* Self-hosted font (fastest option) */
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;  /* show fallback immediately, swap when loaded */
}

/* Use system font stack as fallback that closely matches your font */
body {
  font-family: 'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, 
               'Segoe UI', sans-serif;
}
```

**Variable Fonts (best performance):**
```css
/* One file handles all weights */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}
```

---

### 7.4 Image Optimization

**Format Priority (smallest to largest for same quality):**
1. **AVIF** — Best compression, newer (Chrome, Firefox, Safari 16+)
2. **WebP** — Great compression, universal support
3. **PNG** — Lossless, for logos/icons with transparency
4. **JPEG** — Photos only, no transparency

```html
<!-- Modern responsive image with format fallback -->
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" 
       alt="Descriptive alt text here"
       width="1200" 
       height="675"
       loading="eager"
       fetchpriority="high">
</picture>

<!-- Below-fold images: lazy load -->
<img src="feature.webp" 
     alt="Feature description" 
     width="600" 
     height="400"
     loading="lazy">
```

**Size targets:**
- Hero images: < 200KB (WebP), < 150KB (AVIF)
- Feature/section images: < 100KB
- Thumbnails/cards: < 40KB
- Icons: SVG (scalable, < 5KB)

---

## 8. VISION BOARD STANDARDS (for Prisca Dezigns Agency)

### 8.1 What a Professional Vision Board Contains

A vision board (also called a mood board or style tile) for client presentations must include:

1. **Color Palette** — Exact hex/HSL values, named by role (primary, secondary, accent, bg, text)
2. **Typography Showcase** — Font names, weights, size hierarchy, sample text
3. **Mood Photography** — 4-8 images that capture the desired brand feeling
4. **Texture/Pattern Samples** — Gradients, grain, geometric elements
5. **UI Component Previews** — Buttons, cards, nav bars in brand style
6. **Inspiration References** — Screenshots of brands/sites with similar energy (not direct copies)
7. **Tone Words** — 5-7 adjectives that define the brand feeling
8. **Logo Placement** — Show how the logo looks within the system

---

### 8.2 Layout Structure

**Professional Vision Board Layout (A3 or 16:9 digital):**

```
┌──────────────────────────────────────────────────────────┐
│  [BRAND NAME]    [Tagline]               [Date / Round]  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  MOOD IMAGES (3-4 images, varying sizes)                 │
│                                                          │
├───────────────────┬──────────────────────────────────────┤
│                   │                                      │
│  COLOR PALETTE    │  TYPOGRAPHY SHOWCASE                 │
│  ● Primary        │  Display Font Name — Heading Sample  │
│  ● Secondary      │  Body Font Name — Body sample text   │
│  ● Accent         │  Mono/Accent — Label Sample          │
│  ● Surface        │                                      │
│  ● Text light     │                                      │
│  ● Text dark      │                                      │
├───────────────────┴──────────────────────────────────────┤
│                                                          │
│  UI PREVIEW — button styles, card, nav, icons           │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  TONE WORDS: [word] [word] [word] [word] [word]          │
└──────────────────────────────────────────────────────────┘
```

**File standards:**
- Deliver as PDF (print-ready) + PNG (screen share)
- Resolution: 300dpi for print, 150dpi for screen
- Size: A3 (420×297mm) or 1920×1080px (digital)
- Figma frame = recommended source

---

### 8.3 Color Extraction Rules (From Real Brand Source)

**The Right Way to Extract Brand Colors:**

1. **Source the highest-resolution brand asset** — logo, flagship product image, key marketing visual
2. **Extract using eyedropper** — pick the dominant, secondary, and accent colors
3. **Refine in HSL** — adjust saturation and lightness for web usability (not always straight from source)
4. **Build the full scale** — from the source color, generate the 50-950 tint/shade scale
5. **Test against your background** — extracted colors must meet contrast requirements

**Common extraction scenarios:**

**Scenario: Logo is purple `#6B21A8`**
→ This is a dark shade (purple-800). 
→ For dark mode, use `#A855F7` (purple-500) as the "active" primary — lighter reads better on dark bg.
→ For light mode, `#7E22CE` (purple-700) gives proper contrast on white.

**Do NOT:**
- Extract from compressed JPEG (color accuracy is compromised)
- Use social media thumbnail crops
- Sample from screenshots (gamma/monitor shift)
- Force the extracted color if it fails WCAG contrast — adjust lightness, never hue

---

### 8.4 How to Select Mood Images

**The wrong way:** Pick "pretty pictures" that feel loosely related  
**The right way:** Match dominant hue, lighting character, and emotional register

**Decision Framework:**

1. **Dominant hue must echo the brand palette**
   - Purple/dark brand → images with dramatic purple, blue-violet, or deep moody tones
   - Warm/cultural brand → golden light, amber tones, rich earth colors
   - Editorial/white brand → overexposed whites, clean shadows, architectural lines

2. **Lighting character must match brand energy**
   - Luxury: low-key lighting, deep shadows, single light source
   - Tech/SaaS: dark studio lighting, interface glow, screen reflections
   - Wellness/Editorial: soft natural light, diffused, airy
   - Cultural/Bold: high contrast, dramatic, vivid saturation

3. **Subject matter should tell the story without being literal**
   - Don't use a laptop for a SaaS tool's vision board (too literal)
   - Do use abstract tech textures, architectural details, or motion-blurred city shots

4. **Avoid clichés:**
   - ❌ Handshakes (corporate cliché)
   - ❌ Smiling headset-wearing woman (call center cliché)
   - ❌ Generic stock team-at-laptop photos
   - ✅ Environmental textures, material close-ups, geometry, motion, culture, craft

5. **Consistent aspect ratios** — pick a grid (1:1, 16:9, or 4:5) and stick to it in the board layout

---

### 8.5 Typography Presentation Standards

**How to present fonts on a vision board:**

1. **Show the brand name in the display font** — at large size (60-80px equivalent)
2. **Show the full Latin alphabet** in your headline font (Aa Bb Cc...) — demonstrates character quality
3. **Show a sample headline** — something brand-relevant, 5-10 words
4. **Show body text** — a short paragraph at reading size
5. **Show a UI label** — "LEARN MORE →" or "GET STARTED" to show how it looks in buttons
6. **Identify the font explicitly** — name, foundry, Google Fonts or Adobe, weight used

**Hierarchy sample template:**
```
DISPLAY — Space Grotesk ExtraBold 800
H1 — Build Something That Matters
H2 — Features Designed for Creators
H3 — Everything you need in one place
Body — DM Sans Regular 400 — Clear, readable body text that works 
       across all devices and browsers for maximum reach.
Label — GET STARTED → 
Caption — Available on iOS & Android
```

**Font pairing do's on vision boards:**
- Contrast the headline and body fonts visually (weight, style, family)
- Show both fonts at multiple weights
- If using Google Fonts, provide the Google Fonts link for client handoff
- If using paid fonts, note license terms in the board notes

---

## APPENDIX: QUICK REFERENCE CHEAT SHEETS

### A. Contrast Ratio Quick Test
- White on `#0A0A0F` → 19:1 ✅ AAA
- `#F0EEFF` on `#0A0A0F` → ~17:1 ✅ AAA  
- `#C084FC` on `#0A0A0F` → ~8:1 ✅ AAA
- `#A855F7` on `#0A0A0F` → ~5.5:1 ✅ AA (large text only for smaller sizes)
- `#8B5CF6` on `#0A0A0F` → ~4.2:1 ❌ Fails AA for body text — lighten it

### B. Font Personality Quick Match
| Brand Vibe | Headline | Body |
|-----------|---------|------|
| Luxury | Cormorant Garamond | Jost |
| SaaS/Tech | Space Grotesk | Inter |
| Creative Agency | Syne | DM Sans |
| Bold/Cultural | Oswald | Barlow |
| Wellness | Playfair Display | Source Sans |
| Editorial | Libre Baskerville | Libre Franklin |
| Minimalist | DM Serif Display | DM Sans |

### C. Standard Animation Easing Values
```css
--ease-snappy:  cubic-bezier(0.4, 0, 0.2, 1);   /* Material Design standard */
--ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1); /* overshoot effect */
--ease-gentle:  cubic-bezier(0.25, 0.1, 0.25, 1);  /* natural motion */
--ease-sharp:   cubic-bezier(0.4, 0, 0.6, 1);       /* quick in, quick out */
```

### D. Purple Brand Gradient Recipes
```css
/* Hero gradient bg (dark) */
background: radial-gradient(ellipse at 30% 40%, rgba(109, 40, 217, 0.5) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 60%, rgba(217, 70, 239, 0.3) 0%, transparent 50%),
            #080810;

/* CTA button gradient */
background: linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #A855F7 100%);

/* Gradient text purple → fuchsia */
background: linear-gradient(90deg, #A855F7 0%, #D946EF 100%);

/* Card border gradient */
background: linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(217, 70, 239, 0.3));
```

### E. The "Does This Design Work?" Checklist
- [ ] Is the primary CTA the most visually prominent interactive element?
- [ ] Can I read all body text easily (contrast check passed)?
- [ ] Does the page work on a 375px wide phone screen?
- [ ] Does every font maintain its hierarchy at mobile sizes?
- [ ] Are all hover states mirrored with touch states?
- [ ] Are images set to defined dimensions (no CLS)?
- [ ] Does the design work without custom fonts loaded (fallback state)?
- [ ] Is there a clear visual flow from top to bottom?
- [ ] Does the hero section answer: What is this? Who is it for? What do I do next?
- [ ] Have I used `prefers-reduced-motion` to respect user animation preferences?

---

*Document compiled by Zapia AI Research Agent for Prisca Dezigns*  
*Sources: Penpot Color Theory Guide, Elegant Themes Typography 2025, EcommerceWebDesign.agency Bento Grids, Contra Design Trends 2025, OnecodeSDoft UI Trends, WebAIM WCAG Standards, DepositPhotos Web Design Trends 2025*  
*Last updated: May 2026*
