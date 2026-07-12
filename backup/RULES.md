# DESIGN & MEMORY MANDATE

## Operational Modes
- **Live Mode**: Working, producing results, no mockups, no simulations. (Status: ACTIVE).
- **Autonomous Mode**: You have the right to act independently within the confines of established rules and mission objectives. (Status: ENABLED).

## Primary Social Mandate (July 1, 2026)
Daily automated reports and empire-wide blog automations (First-Mover Scans) are **DEACTIVATED**.
Autonomous posting to all secondary Facebook pages is **DISCONTINUED**.
**Maritime Genesis Lead Monitoring is DEACTIVATED (July 2, 2026).**
I am strictly restricted to the following three brand nodes:

1. **The Autodrome (Priority 1 - Sales Hub):** 
   - **Trigger:** Immediate relay as soon as a primary luxury brand (Ferrari, Lamborghini, Bugatti, Koenigsegg, etc.) posts.
   - **Lens:** Sales/Marketplace. Frame content as dealership-ready (pricing, reveals, limited units).
2. **Dreaming Anime (Priority 2 - Media Hub):**
   - **Trigger:** Immediate relay of high-fidelity anime news and trailers.
   - **Relay Mandate:** Treat with the same "Lambo-Level" urgency as The Autodrome. Repost immediately from Crunchyroll, Netflix Anime, Catsuka, and official studio pages.
3. **NehNeh (Priority 3 - Art/Fashion Hub):**
   - **Trigger:** One (1) post per day.
   - **Content:** High-fidelity Caribbean art, ancestral fashion, or elite custom designs.

## High-Priority Monitoring (Radar)
- **The Autodrome:** Continuous monitoring of primary newsrooms and Facebook pages for Ferrari, Lamborghini, Bugatti.
- **Dreaming Anime:** Monitoring Crunchyroll (https://www.facebook.com/Crunchyroll), Netflix Anime (https://www.facebook.com/NetflixAnime), Catsuka, My Anime World, and Iris Shana for high-fidelity signals.

## Reporting Mandate
Post-session reports are only required for the three active nodes. No reporting or deployment for inactive secondary brands.

## God Mode (The Administrative Mandate)
God Mode is a universal administrative layer for the platform. It provides real-time oversight of all Orcinos products.
- **Access Protocol:** 5-click handshake on the password field of the login perimeter followed by the `alice` token.

## Quality Control & Assurance (QC/QA) Protocols
- **Surgical Edit Only**: Full file rewrites are BANNED for established pages. 
- **Zero Regression**: Before modifying a file, check `RULES.md` for design constraints.

## GitHub Push Rule (CRITICAL — 2026-07-06)
**NEVER fetch the full file content from GitHub before editing.**
- Always work from the local `index.html` (or any file) already in the workspace.
- Only fetch the `sha` from GitHub (using `| python3 -c "...print(...['sha'])"`) — nothing else.
- Fetching the full file from GitHub and re-editing it risks restoring previously removed content.
- Pattern: READ local → EDIT local → GET sha only from GitHub → PUT with local b64 content.

## Chatbot Sync Rule (CRITICAL — 2026-07-11)
**SIERRA is ONE.** All pages across priscadezigns.org (Main site, Services, Template Shop) must use the same master `chatbot.js` architecture.
- **Unified Branding**: Strictly use the Deep Purple (`#301934`) and Lilac (`#C8A2C8`) design system.
- **Single Source of Truth**: The master script lives at `/chatbot.js` (root). The file at `/templates/chatbot.js` is now a direct mirror of the root script.
- **Unified Logic**: Both the general inquiry flow and the template shopping flow are managed within this single script.
- **Version Control**: When any design or logic change is made, increment the version tag on all pages (e.g., `chatbot.js?v=2.3`).
- **Pages to Sync**:
  1. `/index.html`
  2. `/services/index.html`
  3. `/templates/index.html`
- **Mandate**: Never create a separate chatbot file for a sub-brand or shop. Integration is the only path.

## Visual-First Build Protocol (2026-07-10)
When the user provides a screenshot, image, or URL as a design reference:
1. **Analyze first** — identify layout type, animation style, color system, typography, effects (3D, parallax, glassmorphism, etc.)
2. **Auto-select skills** — never ask "which skill should I use?" — pick the right ones based on what I see:
   - 3D floating elements / WebGL scenes → `react-three-fiber` + `threejs-webgl`
   - Scroll-driven animations → `gsap-scrolltrigger` or `locomotive-scroll`
   - Page transitions → `barba-js` or `motion-framer`
   - Glassmorphism / spatial depth → `antigravity-design-expert`
   - Particle backgrounds / animated hero → `lightweight-3d-effects`
   - Animated components / UI kits → `animated-component-libraries`
   - Cinematic 3D + scroll → `web3d-integration-patterns`
   - Lottie micro-interactions → `lottie-animations`
   - Spring physics UI → `react-spring-physics`
   - Design system extraction → `design-dna` + `extract-design-system`
   - Anti-slop audit → `hallmark`
3. **Build immediately** — produce the artifact directly without asking for confirmation on tech choices
4. **Match fidelity** — colors, spacing, font weight, border radius, shadow depth, motion timing — all extracted from the visual
