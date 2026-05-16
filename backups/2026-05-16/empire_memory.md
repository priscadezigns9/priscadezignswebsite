# Empire Memory — Prisca Dezigns
*Last updated: Thu 2026-05-14 21:54 AST*

---

## 🌐 Website Status
- **Domain:** priscadezigns.org (GitHub Pages — repo: priscadezigns9/priscadezignswebsite)
- **Total pages:** 30+ live
- **Pages live (as of 2026-05-14):**
  `/` | `/prisca-dezigns/` | `/velloq/` | `/moblync/` | `/karjov/` | `/cupyx/` | `/trogon/` | `/seamritedesigns/` | `/nehneh/` | `/dreaming-anime/` | `/dreaming-anime/shop/` | `/atelier-gaming/` | `/sole-prestige/` | `/verdant-co/` | `/the-watch-list/` | `/peak-fit/` | `/the-escapist/` | `/paw-vault/` | `/quiet-luxury/` | `/glow-protocol/` | `/essence-elite/` | `/prime-land-network/` | `/tech-scout/` | `/the-autodrome/` | `/couture-gallery/` | `/the-way-made-known/` | `/riddiim/` | `/rowcell/` | `/calalloo/` | `/dpanyard/` | `/clarev/`

- **Affiliate brands redirect:** `/affiliate-brands/` → redirects to `/dreaming-anime/shop/`
- **NOT yet built:** `/safron/` — brand identity in Drive, no page yet. Also `/clasp-books/` may be stale (now renamed Rowcell)

### Name/Path Updates (LOCKED 2026-05-14)
- Vela → **Velloq** (path: `/velloq/`)
- Orbyt → **Moblync** (path: `/moblync/`)
- Writx → **Cupyx** (path: `/cupyx/`)
- Clasp → **Rowcell** (path: `/rowcell/`)
- Riddim → **Riddiim** (path: `/riddiim/`)
- Callaloo → **Calalloo** (path: `/calalloo/`)
- Panyard → **D' PanYard** (path: `/dpanyard/`)

---

## 🏢 Brand Directory

### Core Agency
- **Prisca Dezigns** — digital agency, branding, web design, social media management. Master brand. Purple & black.
- **Seamrite Designs (NehNeh)** — CLIENT BRAND (Alice Mohamed). Fashion & art. Hot Pink & Black. Two-section site.

### SaaS Platforms
- **Velloq** (formerly Vela) — social scheduling / content calendar SaaS. Cyan/navy.
- **Moblync** (formerly Orbyt) — AI-powered app design tool. Blue/purple.
- **Karjov** — analytics/reporting SaaS. Gold/dark. Full page built 2026-05-14.
- **Cupyx** (formerly Writx) — AI writing assistant SaaS. Rose/dark. Step cards fixed 2026-05-14.
- **Trogon** — business management / client portal SaaS. BI Dashboard section added 2026-05-14.
- **Clarev** — Healthcare SaaS. Teal/navy, HIPAA, EHR, billing. ($49/$99/custom pricing)
- **Rowcell** (formerly Clasp) — data/sheets management tool. Dark green brand.
- **Riddiim** (formerly Riddim) — music discovery app. "The Record Room" redesign live 2026-05-14. Black/white, vinyl aesthetic. Domain: riddiim.
- **Calalloo** (formerly Callaloo) — "The Pinterest of Caribbean food." Visual recipe app, location-aware. Pinterest discovery layer live 2026-05-14 — vibe filter bar, masonry grid, trending section, ingredient CTA.
- **D' PanYard** (formerly Panyard) — LOCAL SERVICES MARKETPLACE. Like Facebook Marketplace + Thumbtack. Customers find local service providers by area.
- **Safron** — brand identity only (vision board in Drive, amber #F59E0B). No page yet.

### Affiliate Niche Pages (15 pages)
Verdant Co | The Watch List | Sole Prestige | Atelier Gaming | Couture Gallery | The Autodrome | Peak Fit | The Escapist | Paw Vault | Quiet Luxury | Glow Protocol | Essence Elite | Prime Land Network | The Tech Scout HQ | The Way Made Known (faith/devotional — NO affiliate products)

### Dreaming Anime
- Anime content brand. Orange & black. "The Panel" full manga redesign live 2026-05-14.
- Affiliate shop at `/dreaming-anime/shop/` — live 2026-05-14.
- Dark mode toggle added 2026-05-14.

---

## 📘 Brand Identity Rules (LOCKED)
- **Dreaming Anime** — Orange & Black ✅ FINALIZED. The Panel aesthetic.
- **Prisca Dezigns** — Purple & Black ✅ FINALIZED. Gistesy + Belliza fonts locked.
- **Seamrite Designs (NehNeh)** — Hot Pink (#FF007F) & Black ✅ FINALIZED.
- **D' PanYard** — Red #E01B24 + White + Deep Navy #0D1B2A. Sora 800 + Inter. NO orange.
- **Wordmark fonts:** Gistesy (Prisca) + Belliza (DEZIGNS) — LOCKED
- **No regional mentions** — NEVER use "Trinidad", "Caribbean" in any client-facing content. Global-first always.
- **Future platforms aesthetic:** Dark, premium, Remotion-inspired. Dark bg, high contrast, clean grid, subtle glows, monospace + strong sans-serif.

---

## 📱 Facebook Pages (18 total)
**Tokens:** Long-lived page tokens stored in `fb_page_tokens.json` (GitHub repo). Never-expiring.

| Page | Page ID |
|---|---|
| Prisca Dezigns | 106662059098517 |
| Dreaming Anime | 294045870456760 |
| Seamrite Designs (NehNeh) | 2455413671137234 |
| Verdant Co. | 1140265212494782 |
| The Way Made Known | 1142116855643947 |
| The Watch List | 1072926889242673 |
| Sole Prestige | 1094645483734682 |
| Atelier Gaming | 1046777931860791 |
| Couture Gallery | 1100955549767016 |
| The Autodrome | 1124569194075808 |
| Peak Fit | 1164177383439575 |
| The Escapist | 1057947180740345 |
| Paw Vault | 1159923583861215 |
| Quiet Luxury | 1116678858189788 |
| Glow Protocol | 1127727907088536 |
| Essence Elite | 1096637680199435 |
| Prime Land Network | 1131532363373441 |
| The Tech Scout HQ | 1124620534060229 |

**Posting schedule:** 8AM, 11AM, 2PM, 7PM AST daily
**Limits:** Empire pages = 4 posts/day MAX & MIN. Seamrite Designs = 2 posts/day MAX & MIN.
**No catch-up batches** — if a slot is missed, wait for next scheduled slot.

---

## 🤖 Automations

### daily_poster.py (server-side)
- Fires at 8AM, 11AM, 2PM, 7PM AST via cron
- Downloads fresh fb_page_tokens.json + niches from GitHub each run
- Posts affiliate products (photo + caption) in 6-day rotation — no repeated photo consecutive day
- Staggered: one group every 15 min to avoid simultaneous API flood
- Bug fixed 2026-05-11: accepts both `id` and `page_id` keys in tokens JSON

### midnight_audit2.py (server-side)
- Runs nightly, checks all pages, logs to memory

### Website Audit Cron (Zapia)
- Checks all pages HTTP status every 30 min
- Silent if 200 OK, notifies Prisca on any failure

### FB Audit Cron (Zapia)
- Checks post counts every 30 min
- Silent if compliant, notifies Prisca on deficit

### WhatsApp Prospect Check (Zapia)
- Checks inbound messages every 30 min from all 14 prospect numbers + personal number
- NO reports from personal number (18683424101) after 9 PM AST
- Reports new replies for Prisca to approve before responding

### Empire Memory Backup Cron (Zapia)
- Fires nightly — updates empire_memory.md and uploads to Drive (file ID: 1xvlHIaM5ui1meFyS7Aeas4X7wiFLQV1u)

### GitHub Backup (nightly)
- Backs up: empire_memory.md, daily_poster.py, fb_page_tokens.json, midnight_audit2.py, ig_accounts.json, anime_clip_log.json
- Destination: priscadezigns9/priscadezignswebsite/backups/YYYY-MM-DD/

---

## 💰 Receipt Tracking

### Google Sheets Trackers
- **Prisca Dezigns Income & Expense Tracker 2026:** `1IaKo7XuLbx4op4RwaeHc0k7G2ezuTCgtLODwyJ85h1A`
- **Seamrite Designs Income & Expense Tracker 2026:** `1xXUFk3OeJQGBW2OC35-A66uCYXWtCK7m_sMbymkQocs`

### Receipt Photo Folders (Drive)
- **Prisca Dezigns Business Receipts 2025-2026:** `1jd2919lRSqVXUj514N81yqw3Nncr3sMR`
- **Seamrite Designs Business Receipts 2025-2026:** `1W8aOUZa3Vjs5tRbw3f_PaxQegr6JpwoR`

---

## 📲 WhatsApp Outreach

### Business Number (UK): +447576505652
- Outreach sent May 10 to 14 prospects — NO follow-ups until they reply first (LOCKED RULE)

### Prospect Numbers (Batch 1)
- 18687063018 — Advance Printing
- 18682706666 — Beauty In Full Salon
- 18687528936 — The Furniture Factory
- 18683263393 — CLR Photography
- 18682986308 — Fashion Therapy Boutique

### Prospect Numbers (Batch 2)
- 18683341515 — Trini Cakez
- 18684945624 — Rakeeb's Gourmet Bake Shop
- 18686851832 — DP Cakery
- 18687791632 — Emerald Designs
- 18686226601 — Macon Group TT
- 18687481271 — Urban Fitness
- 18686851644 — Makeda Jones Photography
- 18682842003 — Domain Realtors
- 18684678979 — Glam by Abbey

### Personal Number: 18683424101
- Checked for unknown inbound messages (possible client leads)
- NOT reported after 9 PM AST

---

## 🔧 Pending Tasks

### HIGH PRIORITY
1. **Translate fix sweep** — in progress 2026-05-14 evening. All empire pages getting new working translate dropdown (click → 10-language list → Google Translate opens page translated). Old broken Google widget being removed from all pages.
2. **Safron page** — needs to be built when Prisca is ready (brand identity exists in Drive)

### MEDIUM PRIORITY
3. **Trogon:** Groq API key placeholder (gsk_placeholder) — needs real key from Groq account
4. **TikTok App resubmission** — fix /legal/terms/ and /legal/privacy/ pages, then resubmit
5. **Clarev + D' PanYard cards** on /platforms/ page — still missing
6. **Rowcell PNG/JPG wordmark export** — still pending (needs browser render)
7. **SVG icon upgrades for Clarev, Trogon, Prisca Dezigns** — payloads ready in workspace (push_clarev.json, push_trogon.json, push_priscadezigns.json)

### TRADING (NEW 2026-05-14)
8. **Risk Per Trade:** $200 (4%). Lot sizes must reflect this.
9. **S&P500 levels:** 4-digit format to match cTrader feed (e.g. 7211.40)
10. **Entry:** Clean retest of 8:15 AM candle midpoint on 5m chart at 9:30 AM or after
11. **Hard stop:** 11:00 AM AST. Max 2 trades/day. Power 2 filter.

---

## 🖼️ Promo Assets

### Reels (Drive)
- Prisca Dezigns Reel v4: `1XJInSQZA2AztmUtUELjth-18oepla7dY`
- Seamrite Reel 1 v4: `1bRSSzzwRVOtqIjj0UmJ4ESBVre5lerN9`
- Seamrite Reel 2 v4: `15Qp-oEQ4b-phxpZgXY3Z8UDa6ahJFP9`
- Seamrite Reel 3 v4: `1mmowxF3BT4CccQDMBoeKL-3k9xyXkvJD`
- NehNeh Reel v4: `1pK0Ie2lF8JQjVi4jCd87XrWgG4_i_yGe`

### Master Logo
- File: `media/1778428022219.jpg` (workspace) + `logos/prisca-dezigns-logo.png` (GitHub)
- Black bg, purple circle, "Prisca" cursive + "DEZIGNS" caps underneath — NEVER substitute

### Pinterest Design Direction (LOCKED)
- Dark dramatic backgrounds (deep black, purple/blue cinematic gradients)
- 3D rendered characters/objects (bold, expressive)
- BIG bold uppercase typography with accent word highlights
- Glassmorphism service pill badges
- Logo top-right, contact footer bar
- Reference folder: Drive ID `1mURMX-BjHy4ZlevWFAUbqoLTRnZZVLIo` (16 images)

---

## 🧠 Key Rules (summary)
- No regional mentions (no "Trinidad", "Caribbean") in any client-facing content
- Global-first positioning always
- No follow-up WA messages to prospects until they reply first
- No double posting — empire automation runs in one dedicated chat only
- No rebuilds / UI changes without explicit instruction
- Competitor research MANDATORY before any design work
- Course review MANDATORY before any new project/feature build
- Clarev = Healthcare SaaS. NOT client portal.
- D' PanYard = LOCAL SERVICES MARKETPLACE. NOT food/recipe. NOT professional networking.
- Calalloo = "Pinterest of Caribbean food" — visual recipe discovery, location-aware.
- Seamrite/NehNeh = fashion & art CLIENT brand. NO skincare, beauty, health products.
- The Way Made Known = faith/devotional ONLY. No affiliate products.

---

## 📅 Session Log

### 2026-05-12
- Affiliate brands page: replaced 17 broken SVG logos with real PNGs
- Rowcell: nav fix (white-on-white), doubled anchor fix, wordmark 1.7rem
- Float buttons: overlap fix on 25 pages
- Trogon Business Plan live at /trogon/business-plan/
- Cupyx: CSS fallback wordmark for nav logo
- New Prisca Dezigns FB ad at /prisca-dezigns/ad/

### 2026-05-13
- All 25 pages 200 OK (confirmed 20:59 + 21:32 AST)
- All 18 FB pages 4+ posts/24h compliant
- Full GitHub backup pushed to backups/2026-05-13/

### 2026-05-14 (tonight)
- **Riddiim** — Full "The Record Room" redesign live. Vinyl/tape aesthetic, dark premium.
- **Dreaming Anime** — Full "The Panel" manga redesign. Orange/black, panel grid layout.
- **Dreaming Anime Shop** — New page built. Affiliate brand links moved here from affiliate-brands page.
- **Affiliate brands** — Now redirects to /dreaming-anime/shop/
- **Dark mode** — Added to Dreaming Anime main + shop pages. LocalStorage persisted.
- **Calalloo** — Pinterest discovery layer: vibe filter bar (8 categories), masonry recipe grid (12 cards), trending section, ingredient CTA banner. Nav link fixed /callaloo/ → /calalloo/.
- **Rowcell** — AI Insights section + wordmark fix
- **Trogon** — BI Dashboard section added
- **Karjov** — Full page built from scratch
- **Cupyx** — Step cards spacing fixed
- **Translate fix** — All empire pages: old broken Google widget replaced with working dropdown (10 languages, opens Google Translate in new tab). In progress as of 21:54 AST.
- **Trading rules confirmed:** $200/trade (4% risk), 4-digit S&P500 format, 8:15 AM 5m candle midpoint entry, 11 AM AST hard stop, max 2 trades/day.

## Session Update — 2026-05-15 Evening

### Dreaming Anime — Full Destination Rebuild (LIVE)
- Nav updated: Anime / Manga / News / Cosplay / Creators / Blog / Newsletter / Shop Now
- New sections added: Breaking News, Manga Hub, Cosplay Hub, Fan Content, Creator Hub, Seasonal Chart
- Ticker updated with Spring 2026 anime: Witch Hat Atelier, Re:ZERO S4, Blue Lock, etc.
- Strategy locked: cosplay hub, fan content (fan manga/art/edits), creator toolkit, mood-based AI discovery
- Commit: 853afe23ba

### Affiliate Brands Page Fix
- Dreaming Anime card fixed: now has Visit Website + Shop buttons (Shop goes to /dreaming-anime/shop/)
- Commit: 26063f5049

### FB Daily Post Audit (10PM AST)
- 0 pages hit 4-post target today
- 7 pages: 1-2 posts (under target)
- 11 pages: 0 posts including Dreaming Anime, Prisca Dezigns, Seamrite Designs
- Alert sent to WhatsApp 18683424101

### Brand Kits Status
- Complete: Atelier Gaming, Couture Gallery, Essence Elite, Pantriq, Paw Vault, Prime Land Network, Sole Prestige, The Autodrome, The Escapist, The Watch List
- Missing (to build): Verdant Co, Peak Fit, Quiet Luxury, Glow Protocol, Tech Scout, Shelfly, Dreaming Anime (destination strategy saved)
- Niche research agent still running for 6 missing brands

### GitHub Backup (22:02 AST)
All 6 files pushed to backups/2026-05-15/ OK
