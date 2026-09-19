# Prisca Dezigns — Zapia AI Handoff Guide
*Last updated: 2026-05-06 06:01 AST*

## Who This Is For
If you're starting a new Zapia account and want to restore full context
of everything built with Prisca, start here.

---

## About Prisca

- **Name:** Prisca
- **Location:** Trinidad & Tobago (AST timezone, UTC-4)
- **WhatsApp:** +1 868 342 4101
- **Email:** priscadezigns9@gmail.com
- **GitHub:** priscadezigns9
- **Domain registrar:** Namecheap (priscadezigns.org)
- **Main site:** https://priscadezigns.org
- **GitHub repo:** https://github.com/priscadezigns9/priscadezignswebsite

---

## The Empire

Prisca is building a Caribbean AI SaaS empire — one platform per industry.

### 18 SaaS Platforms (all live)
| Slug | Industry | App |
|------|----------|-----|
| /xavrin/ | Security | /xavrin/app/ |
| /varen/ | Real Estate | /varen/app/ |
| /clarev/ | Healthcare | /clarev/app/ |
| /builven/ | Construction | /builven/app/ |
| /drovon/ | Logistics | /drovon/app/ |
| /trovren/ | Education | /trovren/app/ |
| /stamven/ | Fitness | /stamven/app/ |
| /ledra/ | Accounting | /ledra/app/ |
| /merka/ | Retail | /merka/app/ |
| /zelvon/ | Car Rental | /zelvon/app/ |
| /trovrix/ | HR | /trovrix/app/ |
| /zelrix/ | Agriculture | /zelrix/app/ |
| /covrel/ | Insurance | /covrel/app/ |
| /vorel/ | Call Centre | /vorel/app/ |
| /drovrex/ | Oil & Gas | /drovrex/app/ |
| /polis/ | Government | /polis/app/ |
| /lunel/ | Hospitality | /lunel/app/ |
| /verdra/ | Legal | /verdra/app/ |

### 5 Core Service Brands
- Vela — Web Design (/vela/)
- Orbyt — App Development (/orbyt/)
- Karjov — Business Automation (/karjov/)
- Govern — Social Media (/govern/)
- Writx — Copywriting (/writx/)

### 18 Affiliate Stores (Amazon)
The Autodrome, Dreaming Anime, Deskwell, Sole Prestige, Atelier Gaming,
Peak Fit, Paw Vault, Quiet Luxury, Selfly, Pantriq, Verdant Co,
Glow Protocol, The Watch List, The Escapist, Tech Scout,
Prime Land Network, Essence Elite, Couture Gallery

### Other Brands
Neh Neh (fashion — /nehneh/), Seamrite Designs (clothing customization)

---

## Key Systems Running

### Facebook Auto-Posting
- 18 pages, 4 posts/day each (text 8AM, photo 11AM, photo 2PM, video 7PM AST)
- Script: `daily_poster.py` in workspace root
- Tokens stored as credential `facebook-user-token` (expires ~60 days)
- Page tokens auto-refreshed from user token at start of each post run
- **Token refresh needed:** Go to developers.facebook.com/tools/explorer
  → Generate token with pages_manage_posts, pages_read_engagement, pages_show_list
  → Exchange for long-lived token using App ID + App Secret

### Site Audits
- Every 2 hours: checks 3 random niche affiliate pages for broken images/links
- Weekly (Monday 9AM): dead link scan via GitHub Actions

### Nightly Backup
- Midnight AST: `backup_to_github.py` pushes all key files to /backups/[date]/
- Also: empire_memory.md → Google Drive after every session

### Anime Daily Clip (Dreaming Anime)
- Daily at 10AM AST: `anime_daily_clip.py`
- Sources clips from animetwixtor.com, uploads to Google Drive folder

---

## Credentials Needed (not stored here for security)
- **Facebook App ID + App Secret** — for token exchange
- **Facebook user token** — stored as `facebook-user-token` credential in Zapia
- **GitHub PAT** — for repo deployments (stored in scripts)
- **Google account** — connected via Zapia Google Services
- **Pinterest API** — credential `pinterest-api`
- **PayPal merchant:** QXE9PL58QPU9L

---

## How to Restore Context in a New Zapia Account

1. Share this file with your new Zapia account
2. Tell Zapia: "Read my handoff guide and restore full context"
3. Zapia will load: USER.md, MY_RULES.md, MY_HEARTBEAT.md, empire_memory.md
4. Reconnect credentials: Google, Facebook, GitHub
5. Resume from where you left off

---

## Files in This Backup Folder

| File | Purpose |
|------|---------|
| USER.md | Prisca's profile and preferences |
| MY_RULES.md | Operating rules (posting, backups, etc.) |
| MY_HEARTBEAT.md | Periodic checks Zapia runs automatically |
| MY_SOUL.md | Personality/communication style notes |
| TOOLS.md | Tool configs and API details |
| empire_memory.md | Master memory — full empire state |
| memory/*.md | Daily session logs |
| handoff.md | This file |

---

*This backup is maintained automatically. Last updated: 2026-05-06 06:01 AST*
