# Empire Memory — Updated 2026-05-10 21:54 AST

## Active Websites (All 200 OK as of 21:29 AST)
- **priscadezigns.org/** — homepage (Prisca Dezigns master)
- **priscadezigns.org/prisca-dezigns/** — master brand page
- **priscadezigns.org/vela/** — Vela platform page
- **priscadezigns.org/orbyt/** — Orbyt platform page
- **priscadezigns.org/karjov/** — Karjov platform page
- **priscadezigns.org/writx/** — Writx platform page
- **priscadezigns.org/trogon/** — Trogon marketing page
- **priscadezigns.org/seamritedesigns/** — Seamrite Designs (fashion/art)
- **priscadezigns.org/nehneh/** — NehNeh art section
- **trogon-app.vercel.app** — Trogon SaaS app (live)
- 16 affiliate niche pages (dreaming-anime, atelier-gaming, sole-prestige, verdant-co, the-watch-list, peak-fit, the-escapist, paw-vault, quiet-luxury, glow-protocol, essence-elite, prime-land-network, tech-scout, the-autodrome, couture-gallery, the-way-made-known)

## Trogon App — Current Status
- **Live at:** trogon-app.vercel.app
- **Stack:** Supabase (auth + DB) + Vercel (static hosting)
- **Auth methods:** Email/password, Google, Facebook (in progress), Apple, Wallet
- **Facebook OAuth status:** Consumer app created (App ID: 1631501404705), Live mode
  - Supabase callback URI added
  - Site URL: https://trogon-app.vercel.app
  - Redirect URL: https://trogon-app.vercel.app/app.html
  - sb-fix.js v3 deployed (real key + getSession fallback + onAuthStateChange re-registration)
  - PENDING: Prisca to confirm Facebook login works end-to-end
- **SUPABASE_ANON_KEY:** Real publishable key in place (sb_publishable_UicuMabi...)
- **GROQ_KEY:** Placeholder — team org access issue, cannot generate key yet
- **FB App ID in code:** 1631501404705
- **Supabase project:** sazhdnqzaqpqcralmthh.supabase.co

## Trogon Files (GitHub: priscadezigns9/trogon-app)
- app.html — main Trogon app
- index.html — loader (sets localStorage keys, redirects to app.html)
- sb-fix.js — v3: real Supabase key, getSession fallback, onAuthStateChange
- autoconfig.js — patches FB App ID and signInWithFacebook()
- keys.js — key injection
- privacy.html, data-deletion.html — required for Facebook developer app

## Empire Automations
- **FB/IG daily posting (daily_poster.py):** Managed in separate chat — active
- **Token refresh:** Managed in separate chat — active
- **Midnight audit:** Managed in separate chat — active
- **Prospect WhatsApp monitoring:** Cron active — checks every ~15 min
  - 14 prospects: Advance Printing, Beauty In Full Salon, Furniture Factory, CLR Photography, Fashion Therapy Boutique, Trini Cakez, Rakeebs Gourmet, DP Cakery, Emerald Designs, Macon Group TT, Urban Fitness, Makeda Jones Photography, Domain Realtors, Glam by Abbey
  - No replies received as of 21:54 AST today
- **Empire memory backup:** Cron — fires periodically, updates Drive

## Brands — Finalized and Locked
- Prisca Dezigns — Purple and Black — Logo + website LOCKED
- Dreaming Anime — Orange and Black — Logo + branding LOCKED
- Seamrite Designs / NehNeh — Pink and Black — Logo + website LOCKED
- RIDDIM — White on Deep Black — Logo LOCKED

## Design Direction — Future Platforms (LOCKED)
- Aesthetic: Dark, premium, Remotion-inspired (remotion.dev as benchmark)
- High contrast typography, clean grids, generous whitespace
- Subtle gradients and glows on accent elements
- Monospace/code + strong sans-serif headings
- Smooth, purposeful animations — entrance, hover states, scroll reveals
- Apply to all future platform builds

## Pending / In Progress
- Trogon Facebook login — confirm end-to-end with Prisca testing
- RIDDIM app build — design locked, dev not started
- Parallel platform build strategy — one chat per platform, one at a time to start
- WhatsApp prospect replies — monitor continuously, respond on approval
- Groq API key — pending Prisca resolving team org access

## Scope Rules (This Chat)
- IN SCOPE: Trogon dev, SaaS platform builds, design work, flyers
- OUT OF SCOPE: NehNeh automation, daily_poster.py, FB token refresh, Pinterest

## Key IDs and URLs
- GitHub (websites): priscadezigns9/priscadezignswebsite
- GitHub (Trogon): priscadezigns9/trogon-app
- Supabase project: sazhdnqzaqpqcralmthh.supabase.co
- Facebook Business App ID (posting): 1322108873124078
- Facebook Consumer App ID (Trogon login): 1631501404705
- Trogon live URL: https://trogon-app.vercel.app
- UK WhatsApp (business): +447576505652

## Non-Negotiable Rules
- No regional mentions (Trinidad/Caribbean) in any client-facing content
- All brands global-first
- Never bulk-push to /site/ pages without verifying content first
- Always backup before editing any existing page
- One pull, all edits, one push per file per task
- Logos are LOCKED — never substitute
