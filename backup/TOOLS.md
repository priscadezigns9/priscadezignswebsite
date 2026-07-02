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
