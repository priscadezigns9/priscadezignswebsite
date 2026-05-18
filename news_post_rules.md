## DAILY NEWS POST RULE (2026-05-18 — NON-NEGOTIABLE)
- Every brand must have at least 1 post per day based on the LATEST news or events in its niche
- Use the brand news/event prompt (not the product prompt) to generate the background image
- After generating the background, use PIL to overlay:
  1. The actual news headline (bold, brand font, centered or upper third)
  2. A short subline or date (smaller font, lower third)
  3. Brand logo watermark (bottom-right or top-right, ~10-15% size)
- Headline text must be SHORT — max 8 words on the image. Full story goes in the caption.
- News sources per brand:
  - Tech Scout HQ: The Verge, TechCrunch, Ars Technica, Wired
  - Dreaming Anime: Crunchyroll News, Anime News Network, Anime Corner weekly rankings
  - Atelier Gaming: IGN, Kotaku, PlayStation Blog, Xbox News
  - Glow Protocol: Allure, Byrdie, Into The Gloss
  - Essence Elite: Fragrantica news, Basenotes, brand press rooms
  - The Watch List: Hodinkee, WatchPro, brand press rooms
  - The Autodrome: Motor Trend, Car and Driver, F1.com
  - The Escapist: Conde Nast Traveler, Lonely Planet, Travel + Leisure
  - All others: web_search (time_period=week) for top niche news

## TEXT OVERLAY RULE FOR NEWS IMAGES (2026-05-18 — NON-NEGOTIABLE)
- NEVER post a news/event background image without text overlay
- A blank background with no text is NOT a post — it must have headline + subline + logo
- Text overlay must include: headline + subline (source or date) + logo watermark

## TEXT SIZE STANDARD (match Pinterest inspo folder — NON-NEGOTIABLE)
- HEADLINE: 80–100px bold on 800x800 image — large enough to read as a thumbnail
- SUBLINE: 36–44px regular
- SOURCE/DATE: 24–28px light
- Logo: 12–15% of image width, top-right or bottom-right
- Word wrap: MANDATORY — measure each word, build lines that fit within (width - 80px)
- If single word wider than image: reduce font size until it fits
- NO words cut off at edge — ever
- Test boundaries before saving — reject if any text overflows
- NEVER use PIL default font — always load a real TTF font
