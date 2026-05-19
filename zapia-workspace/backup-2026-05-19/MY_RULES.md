# MY_RULES.md - Your Rules

## Image/Post Workflow (MANDATORY)

1. Generate or pull image from news/events/anime site
2. Add text overlay (orange for Dreaming Anime) + round brand logo
3. Upload to Google Drive → send the Drive link to Prisca via **WhatsApp (18683424101)** for approval — DO NOT POST without approval
4. On approval → post to Facebook
5. Immediately after FB post → upload to Pinterest (brand's own board)
6. After Pinterest → DELETE from Drive (no reuse ever)

## Batch Approval Workflow (MANDATORY)

- When sending a batch of images for approval, send each Drive link via WhatsApp individually labeled by brand
- When Prisca approves ALL: delete unapproved images from Drive, then generate a CSV of approved images for Pinterest scheduling
- CSV columns: brand, filename, drive_link, pinterest_board, date_generated
- Never post anything not explicitly approved

## Video Workflow — Dreaming Anime

- Pull video clip from anime news/events source
- Add orange text overlay related to the clip + round Dreaming Anime logo
- Send for approval before posting
- Same post → Pinterest → delete flow as images

## Scheduling Rule

- Max 1 custom/generated image per niche per day
- Aim for at least 2 posts/day across the empire from the backlog
- The second daily slot (was: video) = photo post for all niches EXCEPT Dreaming Anime
- Dreaming Anime second slot = video when available, photo otherwise
- Spread existing unposted images across the week — do not dump multiple in one day

## Dreaming Anime Daily Image

- Pull from: Crunchyroll news, Anime News Network, MyAnimeList, or similar
- Source: anime news, episode previews, cover art, events
- Overlay: orange text related to the news/event + round Dreaming Anime logo
- Semi-transparent text so the source image shows through
- Send for approval before any posting

## Pinterest

- Every brand/niche has its OWN Pinterest board
- Post to the brand's specific board after FB posting
- Pinterest token lives at {{credential:pinterest-token}} — needs periodic refresh

## Social Post Image Font Standard (MANDATORY)
- Font: Montserrat-Bold.ttf (located at fonts/Montserrat-Bold.ttf in workspace)
- Headline: start at 80pt, auto-shrink using getlength() until fits within 92% of image width
- Subline: start at 38pt, auto-shrink if needed
- Band height: 220px at bottom, black fill (0,0,0,200)
- Logo: 120px round crop, top-right corner
- Always wipe watermark zone: bottom-right 320x70px → fill black
- Image size: 768x768px standard

## General Rules

- Never reuse an image once posted
- Never post without Prisca's approval on custom/generated images
- Always add the brand's logo to social posts
- WhatsApp Business Stories not currently supported
- Existing daily_poster.py schedule overlapping with custom posts is fine
- GitHub repo: priscadezigns9/priscadezignswebsite
- Amazon affiliate tag: priscadezigns-20
