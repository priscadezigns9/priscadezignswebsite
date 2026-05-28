# USER.md - User Profile

Canonical identity (name, location, country, language, timezone) lives in
Account Context — no need to duplicate it here. This file is for things
Account can't capture: how the user communicates, what they care about,
who's in their life.

## Communication Preferences

(How they like to be talked to: brief vs. chatty, formal vs. casual, emoji use, humor, jargon tolerance.)

- **Style:** organic and luxurious for Atelier Gaming. Minimalist, evocative, and high-fidelity.
- **Technical level:** unknown
- **Language/Location:** English (Trinidad). Do not use Spanish based on timezone.

## Preferences

- **Logo Selection:** Finalized the "Neural Nexus" mark (Option A) as the primary brand logo for Prisca Dezigns.
- **Brand Consistency:** All affiliate logos on the network page are standardized to a 1:1 square aspect ratio with 12px rounded corners.
- **Prime Land Network:** Removed the "Partnership" / "Connecting Serious Buyers" section from the homepage.
- **UI Aesthetic:** Ivory UI is strictly for the main `priscadezigns.org` site and brand hub. Individual brands have their own specific identities:
  - **Calalloo:** "Pinterest of food". Warm Cream (#FFF8F0), Harvest Orange (#E87722), Deep Brown (#1A0D00). Typography: Fraunces (Headings) & Inter (Body). Local ingredient sourcing & nutrition tracker focus.
  - **D' PanYard:** Red (#E01B24), White (#FFFFFF), Deep Navy (#0D1B2A). Typography: Sora (Headings) & Inter (Body). Direct WhatsApp contact buttons.
  - **Dreaming Anime:** Vivid Orange (#FF6B2B), Deep Black (#0A0A0A). Typography: Space Grotesk & Inter.
  - **Atelier Gaming:** Premium gaming media & lifestyle brand. Void Black (#0A0A0F), Crimson Red (#E63946), Electric Blue (#457B9D). Typography: Cormorant Garamond & Space Grotesk.
  - **The Autodrome:** Luxury Automotive Lab. Teal (#00B4A6) and Red (#C0392B) accents, High-Performance Dark UI (#050508 background). Typography: Bebas Neue (Headings) & Inter (Body).
  - Standardized logos (Neural Nexus mark, Synaptic Lattice wordmark).
  - Square aspect ratio (1:1) for affiliate brand logos in grids.
  - No "Alpha Signal" branding (deprecated).
  - All brand card links redirect to `zapia.com`.
  - Logo formats: SVG (primary), PNG, JPG.
- **Domain Strategy:** Dreaming Anime is the ONLY brand with its own dedicated domain (`dreaminganime.com`). All other brands use `site.zapia.com` URL redirects. The complete mapping is stored in `DOMAINS.md`.
- **Payment Strategy:** Use the US Payoneer account exclusively for all global platform transactions. Local bank details (Scotia/First Citizens) are deprecated for the Laboratory.
- **Payoneer Account Details (Citibank):**
  - **Beneficiary Name:** Prisca Dezigns
  - **Bank:** Citibank
  - **Bank Address:** 111 Wall Street, New York, NY 10043, USA
  - **Routing (ABA):** 031100209
  - **Account Number:** 70580060002427728
  - **Account Type:** CHECKING
  - **SWIFT Code:** CITIUS33
  - **Status:** Verified (2026-05-27)
- **Account:** Has a US account with Payoneer (added 2026-05-25).
- **Central Brain Index (Network Integrity):**
  - **The Root Hub:** `https://priscadezigns.org/` is the Ivory UI minimalist hub. 
  - **Brand Hosting:** Brands are hosted either at the root (`/brand-name/`) or under `/site/brand-name/`. See `DOMAINS.md` for the canonical mapping.
  - **UI Protection Protocol:**
    - **Atelier Gaming:** Void Black (#0A0A0F) Editorial.
    - **The Autodrome:** High-Performance Dark (#050508) & Teal/Red.
    - **Peak Fit:** High-Fidelity Fitness Dark.
    - **Dreaming Anime:** Vivid Orange (#FF6B2B) & Deep Black.
    - **Verdant Co:** Botanical High-End Greenery.
    - **Luxury Brands (Escapist, Watch List, Sole Prestige):** Unique High-Fidelity magazine layouts.
    - **Seamrite Designs:** Artistic Fashion & Studio Supplies. Pink/Black High-Contrast UI.
  - **Strict Rule (UI LOCK)**: No subagent may apply the Ivory UI (tan/serif) to these brands. Overwriting a unique UI with Ivory UI is a violation of the Neural Context. All protected brands are listed in `UI_LOCK.md`.
- **Speculative Research Strategy:**
  - Focus: Trends, Products, Reveals, News.
  - Engagement: Punchy hooks, comparison questions, high-fidelity design details.
  - Timing: AI-optimized windows (Global Sessions A, B, or C).

## Infrastructure & Security
- **GitHub PAT:** The current active token is `github-pat-laboratory-deploy-v7`. It is used for all repository operations (logos, deployments, blog posts).
- **Security Rule:** Any leaked token is automatically revoked by GitHub. If a push fails with 401, provision a new one and update all scripts using the `v{N+1}` versioning scheme.

## Relationships

(People in their life who come up in conversation — family, friends, colleagues. Include nicknames they use for people.)

## About Them

- Has a US account with Payoneer (added 2026-05-25).
- Calalloo vision: A food app for foodies and fitness freaks. Not a laboratory.
