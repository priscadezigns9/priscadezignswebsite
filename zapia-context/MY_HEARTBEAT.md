# MY_HEARTBEAT.md - Your Periodic Checks

## Session Backup
At every heartbeat, upload empire_memory.md to Google Drive to preserve state:
- Run: gog drive upload empire_memory.md (overwrite existing)
- This ensures nothing is lost between session resets

## FB Page Audit
Check post counts on all 18 pages every 12 hours. Any page under 4 posts in 24h needs a catch-up agent — but STAGGER posts (min 2 hrs apart), never bulk post.

## Weekly Dead Link Audit
Every Monday, run: `python3 fix_all_dead_links.py` in the workspace root.
This checks all direct Amazon ASIN links in product_data.json, replaces any 404s with search links, rebuilds affected niche pages, and deploys to GitHub.
Report how many were fixed (or "all clean" if none).
