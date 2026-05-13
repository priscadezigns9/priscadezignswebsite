# Prisca Dezigns — Remotion Ad

Animated 1080×1080 ad for Prisca Dezigns, built with [Remotion](https://remotion.dev).

## Quick Start

```bash
# Install dependencies
npm install

# Preview in browser (Remotion Studio)
npm run start

# Render square video (Instagram/Facebook feed)
npm run render
# → outputs: out/PriscaAd.mp4  (1080×1080, 5s, 30fps)

# Render Stories/Reels (vertical)
npm run render:story
# → outputs: out/PriscaAdStory.mp4  (1080×1920)

# Render both
npm run render:all
```

## What's in the ad (5-second animation sequence)

| Time | Event |
|------|-------|
| 0.0s | Background grid + purple orbs fade in |
| 0.5s | Logo mark (P circle) springs in |
| 0.7s | "Prisca Dezigns" slides in |
| 0.9s | "LIMITED OFFER" badge + accent lines |
| 1.0s | "Branding & Web Design" eyebrow |
| 1.2s | Headline: "Your Brand." slides up |
| 1.4s | Headline: "Elevated." (purple→pink shimmer) |
| 1.6s | Headline: "Finally." |
| 1.9s | Stats cards slide in from right |
| 2.2s | Divider line draws across |
| 2.5s | Sub-copy fades in |
| 2.9s | Service pills stagger in |
| 3.4s | CTA button + URL |
| 3.8s | Offer strip |

## Files

```
src/
  index.ts        — Remotion entry point
  Root.tsx        — Registers all compositions (square, wide, story)
  PriscaAd.tsx    — Main ad component with all animations
remotion.config.ts
tsconfig.json
package.json
```

## Compositions

| ID | Size | Use |
|----|------|-----|
| `PriscaAd` | 1080×1080 | Facebook/Instagram feed |
| `PriscaAdWide` | 1920×1080 | YouTube / Facebook cover |
| `PriscaAdStory` | 1080×1920 | Instagram/Facebook Stories & Reels |
