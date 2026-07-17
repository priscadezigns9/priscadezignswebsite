| Brand | Primary Niche | Broad Spectrum Search Signals |
| :--- | :--- | :--- |
| **The Autodrome** | Luxury Vehicles | Ferrari, Lamborghini, Bugatti newsrooms, luxury supercar marketplace, official reveals. |
| **Dreaming Anime** | Anime Media | High-fidelity animation trailers, studio production news, otaku culture signals. |
| **NehNeh** | Art/Fashion | High-fidelity Caribbean art, ancestral authenticity, custom clothing, artistic sewing. |

## Active Social Deployment (LOCKED - July 1, 2026)
Only the following three brands are authorized for social deployment. All others are strictly **OFF-LINE** or **Website-Only**.

1. **The Autodrome** (Immediate Relay)
2. **Dreaming Anime** (Live News)
3. **NehNeh** (1 Daily Post)

## Session Mapping (Updated)
All previous Alpha/Bravo/Charlie/Delta mappings for secondary brands are **PURGED**. 

- **Autodrome Window:** 24/7 Detection (Immediate).
- **Anime Window:** 24/7 News Curation.
- **NehNeh Window:** Once daily (Target 11:00 AST).


## Confirmed Automation Stack (2026-07-01)
Full pipeline + AI stack for Prisca Dezigns client service tiers.

### The Rule: Audit client first, then assign the right tier.

### Email Automation Stack:
- Pipeline: Make.com (small-mid) → n8n self-hosted (enterprise)
- AI Brain: Claude API (small-mid) → Gemini 2.5 Pro (enterprise/high volume)
- Door: Gmail (free, already their inbox)

### WhatsApp Automation Stack:
- Pipeline: Make.com (small-mid) → n8n (enterprise)
- AI Brain: Claude API (small-mid) → Gemini 2.5 Pro (enterprise)
- Door: Z-API (small ~20-30 USD/mo) → WATI (mid ~49 USD/mo) → 360dialog (enterprise ~60 EUR/mo)

### Pipeline Options by Scale:
| Pipeline | Use Case |
| Make.com | Small to mid clients — free tier up to 1,000 tasks/mo |
| n8n (self-hosted) | Enterprise — unlimited tasks, fixed server cost ~20 USD/mo |
| Zapier | Avoid — same as Make.com but more expensive |

### AI Brain Options by Scale:
| AI | Use Case |
| Claude API | Small-mid — best tone, most natural replies |
| GPT-4o API | Mid — widest Make.com integrations |
| Gemini 2.5 Pro | Enterprise — handles 100+ emails/day, Google native |

### Client Audit Process:
1. Audit their website, email volume, WhatsApp volume
2. Assign tier (Website only / Website+WA / Website+WA+Email)
3. Pick pipeline and AI based on their size
4. Build → test → hand off

## Supabase Project Map
| Project Name | Project ID | Credential | Purpose |
| :--- | :--- | :--- | :--- |
| **Prisca Dezigns** | `sazhdnqzaqpqcralmthh` | `supabase-trogon-admin` | Main project — outreach_leads, client_leads |
| **Old/Wrong** | `sktpjacowqaedddtrhuz` | none | Do NOT use — was old homepage reference |

## Supabase PAT
- Credential: `supabase-pat`
- Base URL: `https://api.supabase.com`
- Use for: running SQL via `/v1/projects/{id}/database/query`

## Prisca Dezigns Tables
| Table | Purpose |
| :--- | :--- |
| `outreach_leads` | 166 B2B outreach records for email campaigns |
| `client_leads` | Website lead form submissions (name, email, package, brand, created_at) |

## GitHub — Prisca Dezigns Website
- Repo: `priscadezigns9/priscadezignswebsite`
- Credential: `github_pat_sovereign_v5`
- Live site: `https://priscadezigns.org`
- Local working copy: `/app/state/348c474f-a208-44c4-8f27-8fce3e8d6785/work/index.html`
- Authoritative restore base: `index_fixed.html` (full desktop UI intact)
- Push method: GET sha first, build JSON payload, PUT via API

## ImprovMX
- Credential: `improvmx-api`
- Account email: `priscillanarine@gmail.com`
- Auth: Basic — `api:KEY` base64 encoded = `YXBpOnNrX2YyZTZmNDg2Mzc4NzRlODhhOGMyODU1MjgyNTc3MjRj`
- Status: `hello@priscadezigns.org` → `priscadezigns9@gmail.com` (ACTIVE)

## Gmail Send — Critical Rule (2026-07-04)
**NEVER use `--body "$(cat file)"` — shell substitution does NOT expand inside the gog tool.**
**ALWAYS use `--body-file "/absolute/path/to/file"` for sending from a file.**
Example: `gog gmail send --to "email@email.com" --subject "Subject" --body-file "/app/state/.../work/body_combo_send.txt"`

## Drew (Technical Lead) Configuration
- Primary Closer for all Prisca Dezigns & Evolve Mobility leads.
- Script & Pricing locked in DREW_SALES_BATTLE_CARD.md.
