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

## Chatbot Sync Rule (CRITICAL — 2026-07-06)
**ALL chatbots across priscadezigns.org must always reflect the same STEPS and flows.**
- **Pricing in chatbots is ALLOWED.** Package cards can show name, description, and pricing. Client template chatbots follow the client's preference.
- The master chatbot logic lives in `/chatbot.js` (root) — this is the single source of truth for the main site.
- The template shop chatbot lives in `/templates/chatbot.js` — separate scope, do not cross-contaminate.
- Any page with an **inline chatbot script** (like services/index.html) must be converted to load `/chatbot.js` externally.
- When any chatbot change is made (new flows, removed features), check ALL of the following:
  1. `/index.html` (inline STEPS — check if it still has any; convert to external if so)
  2. `/chatbot.js` (root shared)
  3. `/services/index.html` (external — auto-synced via `/chatbot.js`)
  4. Any other page with an inline chatbot found via: `grep -rn "const STEPS"`
- **Known pages with inline chatbots:** `index.html` (main site)
- **Known external chatbot pages:** `services/index.html` → loads `/chatbot.js`
- **Template shop chatbot:** `/templates/chatbot.js` — managed separately
