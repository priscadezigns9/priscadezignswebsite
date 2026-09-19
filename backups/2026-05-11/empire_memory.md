# Empire Memory — Prisca Dezigns
*Last updated: Mon 2026-05-11 21:54 AST*

---

## 🌐 Website Status
- **Domain:** priscadezigns.org (GitHub Pages — repo: priscadezigns9/priscadezignswebsite)
- **Total pages:** 25 live (all returning 200 OK as of 21:30 AST)
- **Pages live:**
  `/` | `/prisca-dezigns/` | `/vela/` | `/orbyt/` | `/karjov/` | `/writx/` | `/trogon/` | `/seamritedesigns/` | `/nehneh/` | `/dreaming-anime/` | `/atelier-gaming/` | `/sole-prestige/` | `/verdant-co/` | `/the-watch-list/` | `/peak-fit/` | `/the-escapist/` | `/paw-vault/` | `/quiet-luxury/` | `/glow-protocol/` | `/essence-elite/` | `/prime-land-network/` | `/tech-scout/` | `/the-autodrome/` | `/couture-gallery/` | `/the-way-made-known/`
- **NOT yet built:** `/safron/` — Safron brand exists (vision board in Drive) but no page. Homepage has "Coming soon" card.
- **Clasp:** Lives at `/clasp-books/` (not `/clasp/`)
- **Riddim:** Coming soon card on homepage — no page built yet

---

## 🏢 Brand Directory

### Core Agency
- **Prisca Dezigns** — digital agency, branding, web design, social media management. Master brand.
- **Seamrite Designs (formerly NehNeh)** — fashion & art brand. Pink & black. Two-section site: fashion (top) + art (bottom/NehNeh).

### SaaS Platforms
- **Vela** — social scheduling / content calendar SaaS. Cyan/navy.
- **Orbyt** — AI-powered ad targeting SaaS. Blue/purple.
- **Karjov** — analytics/reporting SaaS. Gold/dark.
- **Writx** — AI writing assistant SaaS. Rose/dark.
- **Trogon** — business management / client portal SaaS. (Supabase auth, Vercel deployment)
- **Clarev** — Healthcare SaaS (originally Medova). Teal/navy, HIPAA, EHR, billing. ($49/$99/custom pricing)
- **Linkup** — professional networking platform (LinkedIn competitor). Dark navy #070B14, electric blue #0066FF, Barlow 800. Tagline: "Connect. Grow. Get Hired."
- **Panyard** — Caribbean music & events discovery. Mango/gold/green. "Cook the culture. Spend smart."
- **Clasp** — data entry / spreadsheet management service. White bg, Excel green (#1D6F42). Lives at `/clasp-books/`
- **Deskwell** — (page exists, details TBC)
- **Safron** — brand identity only (vision board in Drive, amber #F59E0B). No web page yet.
- **Riddim** — music discovery app. Icon: vinyl record. Wordmark: bold 900-weight. Black (#0A0A0F)/white. Coming soon.

### Affiliate Niche Pages (15 pages)
Verdant Co | The Watch List | Sole Prestige | Atelier Gaming | Couture Gallery | The Autodrome | Peak Fit | The Escapist | Paw Vault | Quiet Luxury | Glow Protocol | Essence Elite | Prime Land Network | The Tech Scout HQ | The Way Made Known (faith/devotional — NO affiliate products)

### Dreaming Anime
- Anime content brand. Orange & black. 6-product affiliate rotation (continuous, no same photo twice in a row).

---

## 📘 Brand Identity Rules (LOCKED)
- **Dreaming Anime** — Orange & Black ✅ FINALIZED
- **Prisca Dezigns** — Purple & Black ✅ FINALIZED
- **Seamrite Designs (NehNeh)** — Hot Pink (#FF007F) & Black ✅ FINALIZED
- **Wordmark fonts:** Gistesy (Prisca) + Belliza (DEZIGNS) — LOCKED
- **No regional mentions** — NEVER use "Trinidad", "Caribbean" in any client-facing content. Global-first always.
- **Aesthetic for future platforms:** Dark, premium, Remotion-inspired. Dark bg, high contrast, clean grid, subtle glows, monospace + strong sans-serif.

---

## 📱 Facebook Pages (18 total)
**Tokens:** Long-lived page tokens stored in `fb_page_tokens.json` (GitHub repo). Never-expiring (expires_at = 0).

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

**Posting schedule:** 8AM, 11AM, 2PM, 7PM AST daily (4 posts/day minimum per page)
**Minimums:** All pages = 4 posts/day. The Way Made Known = faith content only, no affiliate products.

**FB Audit — 21:52 AST (Mon 2026-05-11):**
- ✅ Dreaming Anime: 4/4 compliant
- ❌ Prisca Dezigns: 1/4 (deficit: 3)
- ❌ Seamrite Designs: 1/4 (deficit: 3)
- ❌ The Way Made Known: 2/4 (deficit: 2)
- ❌ All 14 affiliate pages: 3/4 (deficit: 1 each — evening post slot likely missed)

---

## 🤖 Automations

### daily_poster.py (server-side)
- Fires at 8AM, 11AM, 2PM, 7PM AST via cron
- Downloads fresh fb_page_tokens.json + niches from GitHub each run
- Posts affiliate products (photo + caption) in 6-day rotation — no repeated photo same product consecutive day
- Staggered: one group every 15 min to avoid simultaneous API flood
- Bug fixed 2026-05-11: accepts both `id` and `page_id` keys in tokens JSON
- Bug fixed 2026-05-11: silent missing photo file error
- Bug fixed 2026-05-11: fb_page_tokens.json key renamed "Seamrite Designs" (was "alicemohammed / NehNeh") — now all 18 pages match niches correctly

### midnight_audit2.py (server-side)
- Runs nightly, checks all pages, logs to memory

### Website Audit Cron (Zapia)
- Checks all 25 pages HTTP status every 30 min
- Silent if 200 OK, notifies Prisca on any failure

### FB Audit Cron (Zapia)
- Checks post counts every 30 min
- Silent if compliant, notifies Prisca on deficit

### WhatsApp Prospect Check (Zapia)
- Checks inbound messages every 30 min from all 14 prospect numbers + personal number
- Reports any new replies for Prisca to approve before responding

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

### Sheet Format
Columns: Date | Description | Business/Payee | Type | Category | Payment Method | Amount (TT$) | Receipt Kept?

### Flow
1. Prisca sends receipt photo
2. Extract: date, vendor, amount, category, currency
3. Append row to correct tracker (above totals/unverified section, after last dated entry)
4. Upload photo to correct receipts folder: `YYYY-MM-DD_Vendor_Amount.jpg`
5. Confirm to Prisca with extracted details

---

## 📲 WhatsApp Outreach

### Business Number (UK): +447576505652
- Outreach sent May 10 to 14 prospects — NO follow-ups until they reply first (LOCKED RULE)
- No inbound replies as of 21:52 AST Mon 2026-05-11

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

---

## 🔧 Pending Tasks

### HIGH PRIORITY
1. **FB posting deficit** — 17/18 pages below 4-post minimum today. Evening post slot appears to have missed or not fired. Catch-up needed.
2. **SVG icon upgrade — 3 pages pending** (payloads ready in workspace):
   - Clarev → push_clarev.json
   - Trogon → push_trogon.json
   - Prisca Dezigns → push_priscadezigns.json
3. **Safron page** — needs to be built when Prisca is ready (brand identity exists in Drive)

### MEDIUM PRIORITY
4. **Trogon:** Groq API key placeholder (gsk_placeholder) — needs real key from team/Groq account
5. **TikTok App resubmission** — fix /legal/terms/ and /legal/privacy/ pages, then resubmit
6. **NehNeh wrongly-posted content** — Verdant Co composting captions were posted to NehNeh FB page (key mismatch bug, now fixed). Prisca to manually delete those posts.
7. **Raider** — Prisca mentioned a new product/feature concept. Awaiting brief.

### DESIGN
8. **Pinterest image direction LOCKED** — all future brand promo images/reels must follow:
   - Dark dramatic backgrounds (deep black, purple/blue cinematic gradients)
   - 3D rendered characters/objects (bold, expressive)
   - BIG bold uppercase typography with accent word highlights
   - Glassmorphism service pill badges
   - Logo top-right, contact footer bar
   - Applies to: Writx, Karjov, Vela, Clasp, Orbyt, Prisca Dezigns
   - Pinterest reference folder: Drive ID `1mURMX-BjHy4ZlevWFAUbqoLTRnZZVLIo` (16 images)

---

## 🖼️ Promo Assets (current)

### Reels (Drive)
- Prisca Dezigns Reel v4: `1XJInSQZA2AztmUtUELjth-18oepla7dY`
- Seamrite Reel 1 v4: `1bRSSzzwRVOtqIjj0UmJ4ESBVre5lerN9`
- Seamrite Reel 2 v4: `15Qp-oEQ4b-phxpZfgXY3Z8UDa6ahJFP9`
- Seamrite Reel 3 v4: `1mmowxF3BT4CccQDMBoeKL-3k9xyXkvJD`
- NehNeh Reel v4: `1pK0Ie2lF8JQjVi4jCd87XrWgG4_i_yGe`

### Promo Image Folders
- Writx: `1LBubfjPzrzD4amy9SIOeIEUnZPxKp3CE`
- Orbyt: `1-mZFQWapGVa9WElK6dfD0wWOR4kl3m9Y`
- Karjov: `1HdvO0v0OyuZBjtvAhUW9dM8GsD6ryApA`
- Vela: `19GGHjeriEaqeXXHqB9Xap1u68Cok-3V-`

### Master Logo
- File: `media/1778428022219.jpg` (workspace) + `logos/prisca-dezigns-logo.png` (GitHub)
- Black bg, purple circle, "Prisca" cursive + "DEZIGNS" caps underneath — NEVER substitute

---

## 🧠 Key Rules (summary)
- No regional mentions (no "Trinidad", "Caribbean") in any client-facing content
- Global-first positioning always
- No follow-up WA messages to prospects until they reply first
- WA messages to Prisca: 6AM–6PM AST only
- No double posting — empire automation runs in one dedicated chat only
- No rebuilds / UI changes without explicit instruction
- Competitor research MANDATORY before any design work
- Clarev = Healthcare SaaS (NOT client portal). Client portal product needs a new name from Prisca.
- Linkup = professional networking (LinkedIn competitor). Name locked.
- Seamrite Designs = fashion/art, pink & black, NehNeh is the art section within same site.
- The Way Made Known = faith/devotional content ONLY. No affiliate products ever.
- NehNeh/Seamrite = fashion & art only. NO skincare, beauty, or health products.
