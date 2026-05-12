# Trogon — Managed Service Architecture (LOCKED PLAN)
*Saved: 2026-05-12 — do not lose this, restore after every session reset*

## Vision
Trogon = one brand, two tiers:
- **Self-serve** ($18/mo Pro, $45/mo Agency) — DIY social media scheduling tool
- **Managed** ($299–$999/mo) — fully automated, done-for-you daily posting (like what I do for Prisca's 18 pages, sold as a product)

The managed tier is **automated via server**, not manually run by Prisca or by me in this workspace. It scales to 50+ clients without memory or overlap issues.

## Build Phases

### Phase 1 — Client Onboarding Flow (Trogon app)
- Client signs up and selects a managed plan
- Connects FB/IG via OAuth
- Picks niche and content style preferences
- Tokens and config saved to their client profile in Supabase

### Phase 2 — Automated Posting Engine
- Extend daily_poster.py to loop through all client configs
- Each client has their own niche, rotation, and posting schedule
- AI generates captions per client niche automatically
- One script handles N clients — scales infinitely on the server
- Zero additional memory usage in Zapia workspace

### Phase 3 — Client Dashboard
- Clients log into Trogon to see post history, schedule, analytics
- Optional: clients can approve/reject posts before they go live
- Admin view for Prisca to see all clients at once

### Phase 4 — Monitoring and Auto-Recovery
- Nightly audit checks all client pages (same as empire audit)
- Expired tokens and failed posts auto-detected and fixed
- Prisca only notified if something cannot be resolved automatically
- Zapia acts as supervisor — not the posting engine

## Key Architecture Principle
- The SERVER does the posting (daily_poster.py extended for clients)
- Zapia does the monitoring and exception handling only
- No client data lives in Zapia workspace memory
- 50 clients = 50 entries in a config file, zero additional cognitive load on Zapia
- Proof of concept already exists: Prisca's 18 pages running fully automated

## Current Status (as of 2026-05-12)
- Trogon app: live at trogon-app.vercel.app
- Auth fix: auth-patch.js pushed to GitHub, login being tested
- Stripe: test mode wired (Pro $18/mo, Agency $45/mo payment links created)
- Managed tier: architecture designed, build not yet started
- Next steps: finish login fix -> Phase 1 client onboarding flow -> Phase 2 posting engine

## Stripe Products (Test Mode)
- Product ID: prod_UVIHSaNulf2flu (Trogon Pro)
- Pro Monthly: price_1TWHrFAMv4m0Sek52XTOvHNj ($18/mo)
- Pro Annual: price_1TWHrFAMv4m0Sek5loDA0NGL ($168/yr)
- Agency Monthly: price_1TWHrGAMv4m0Sek5coTmU7lL ($45/mo)
- Agency Annual: price_1TWHrIAMv4m0Sek58LvOl97d ($432/yr)
- Publishable key: pk_test_51TThVGAMv4m0Sek5hBJhktQeqJEYkjo372cScIjQc7R9BcW2U0WZdURF9O0x4xEUMcbMdUAuyx04pS1jAQrPSjMZ00U0JXvkmj

## Supabase
- Project ID: sazhdnqzaqpqcralmthh
- App URL: https://trogon-app.vercel.app
- Repo: priscadezigns9/trogon-app
