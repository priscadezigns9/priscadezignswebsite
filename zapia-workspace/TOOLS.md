# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- API keys and services you use
- SSH hosts and aliases  
- Project-specific configurations
- Environment-specific notes
- Anything unique to your setup

## Examples

```markdown
### API Services
- Weather API: OpenWeatherMap (key in env)
- Search: Serper (key in env)

### SSH
- home-server → 192.168.1.100, user: admin

### Projects
- Main project: ~/projects/my-app
- Documentation: ~/docs
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

## Google Drive — Business Asset Access (Active 2026-05-22)

The business Drive (`priscadezigns9@gmail.com`) is NOT directly connected.
Access is via **shared folders** — priscadezigns shares folders to `priscillanarine@gmail.com`,
which I access via `gog drive ls --parent <folder_id>`.

Share notifications come through Gmail (`priscillanarine@gmail.com`) from `drive-shares-dm-noreply@google.com`.
The folder ID is in the email link: `drive.google.com/drive/folders/<FOLDER_ID>`.

**DO NOT use files from the personal Drive root. Only use files from shared business folders.**

### Known Shared Folders (as of 2026-05-22)
| Folder Name | ID |
|---|---|
| Dreaming Anime - 2025-05-23 | 1s6GIyMZmkh7zsXui76QLYXynkGEaayMi |
| Business Documents | 12IDGpdzbs1Tc9oteY94r5esflC0vCEWv |
| Pinterest Photos | 1mURMX-BjHy4ZlevWFAUbqoLTRnZZVLIo |
| Magazine_Assets | 1rEqvnLHSrXvdi8mIoESkaOBYZXX3gsC5 |
| Backups — Site HTML | 1fDHsWzbb2DluZocTLhsOH1jsUb91HdCc |
| Empire Backups | 1LkQgeIYHSWsGJ14wonuLOBJeQamWYL4d |
| 2026-05-20 | 1l9ug1ezYkbSWe4QBFb81QjDoXCvaF67n |
| Brand Kits — Empire 2026 | 1EQ50BM5wpMNI68eRwplYTjIDM-Y2ferW |
| FB/IG Photos | 1bj5DemfdtolDJS0xMaaq1Mv1oRJVqaXk |
| videos | 1l-xbk8t1CI6kc9xxcIy7jYfRx4RVsRbt |

To check for newly shared folders: `gog gmail search "shared an item with you" --limit 10`

## Authenticated Services

Skills that connect to external APIs or CLIs use credentials managed through the `credentials` tool.

### HTTP APIs (curl)
Use `{{credential:NAME}}` as a placeholder for credential values in curl commands:

    curl -s https://api.example.com/endpoint \
      -H "Authorization: Bearer {{credential:my-api}}" \
      -d '{"query": "hello"}'

The placeholder is securely resolved at execution time. Credentials are bound to their registered base URL — they can only be used in curl commands targeting that URL.

For complex API processing, use curl for the authenticated call and pipe to python for processing:

    curl -s https://api.example.com/data \
      -H "Authorization: Bearer {{credential:my-api}}" | \
      python3 -c "import json, sys; data = json.load(sys.stdin); print(data['result'])"

### CLI Tools
CLI credentials are injected automatically as environment variables. When you run a registered CLI command, the credential is available in the configured env var without any special syntax.

---

Add whatever helps you do your job. This is your cheat sheet.

## Expense Tracker
- **Sheet (Prisca Dezigns):** Prisca Dezigns — Income & Expense Tracker 2026
- **Sheet ID (Prisca):** 1IaKo7XuLbx4op4RwaeHc0k7G2ezuTCgtLODwyJ85h1A
- **Sheet (Seamrite Designs):** ✅ SEAMRITE TRACKER 2026 - FINAL OFFICIAL
- **Sheet ID (Seamrite):** 1_ZdsPJ-rj6JRcQLJQoUZfpuvSNNLmceRrgaSWwzCjqs
- **Link (Seamrite):** https://docs.google.com/spreadsheets/d/1vXWPVe5czQaQeHGMbAdLwzk-THfDHMk8emcU6v8PijM/edit
- **Monitor:** Subscriptions + First Citizens, Scotiabank, Eastern Credit Union bank alerts
- **Sources:** Gmail (priscillanarine@gmail.com) + Outlook
- **Logging:** Append row via Sheets API on every Radar cycle
