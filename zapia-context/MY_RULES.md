# MY_RULES.md - Your Rules

## Facebook Posting Rules
- NEVER post multiple posts to the same page in bulk/at the same time — it's a red flag to Facebook
- **4 posts per day per page:** 1 text post, 2 photo posts, 1 video — every single day
- All 4 daily posts per page must be STAGGERED throughout the day, minimum 2 hours apart
- Ideal schedule: 8AM, 11AM, 2PM, 7PM (AST) — spread across morning, midday, afternoon, evening
- When scheduling daily posts, use individual cron jobs per post per page with proper time gaps
- If catch-up is needed (page missed posts), still stagger — never dump multiple posts at once

## Backup Rules
- **AUTOMATIC BACKUP after EVERY change** — no exceptions
- After any update to empire_memory.md or daily_poster.py, immediately:
  1. Upload new version to Google Drive
  2. Delete the previous version from Drive
- Only 2 files should ever exist in Drive root: latest empire_memory.md + latest daily_poster.py
- This ensures Drive always has the current state and never accumulates old files

## General Rules
- Corrections your human has made
- Patterns you've noticed
- Workflows that work well
- Things to avoid
