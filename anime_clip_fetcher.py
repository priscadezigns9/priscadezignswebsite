#!/usr/bin/env python3
"""
anime_clip_fetcher.py
Fetches trending anime clips from YouTube, updates anime_clip_log.json,
and regenerates the /dreaming-anime/clips/index.html page on GitHub.

Runs daily via cron. Searches YouTube for the top trending anime clip
of the day, extracts the video ID, appends it to the log, and pushes
an updated clips page with all logged clips embedded.
"""

import json, base64, urllib.request, urllib.parse, datetime, re, time, sys, os

# ── CONFIG ──────────────────────────────────────────────────────────
REPO        = "priscadezigns9/priscadezignswebsite"
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")  # injected via credential
LOG_PATH    = "anime_clip_log.json"
CLIPS_PATH  = "site/dreaming-anime/clips/index.html"
LOGO_URL    = "https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/logos/dreaming-anime.jpg"
AFFILIATE   = "priscadezigns-20"
MAX_CLIPS   = 20  # cap page at 20 clips

# Anime series → merch search term + fandom tag
ANIME_META = {
    "naruto":          {"tag": "Naruto",          "merch": "naruto+merchandise",          "emoji": "🍜"},
    "demon slayer":    {"tag": "Demon Slayer",     "merch": "demon+slayer+merchandise",    "emoji": "⚔️"},
    "one piece":       {"tag": "One Piece",        "merch": "one+piece+merchandise",       "emoji": "🏴‍☠️"},
    "jujutsu kaisen":  {"tag": "Jujutsu Kaisen",   "merch": "jujutsu+kaisen+merchandise",  "emoji": "🔥"},
    "dragon ball":     {"tag": "Dragon Ball",      "merch": "dragon+ball+z+merchandise",   "emoji": "⚡"},
    "attack on titan": {"tag": "Attack on Titan",  "merch": "attack+on+titan+merchandise", "emoji": "🗡️"},
    "my hero academia":{"tag": "My Hero Academia", "merch": "my+hero+academia+merchandise","emoji": "🦸"},
    "haikyuu":         {"tag": "Haikyuu",          "merch": "haikyuu+merchandise",         "emoji": "🏐"},
    "bleach":          {"tag": "Bleach",           "merch": "bleach+anime+merchandise",    "emoji": "🌑"},
    "chainsaw man":    {"tag": "Chainsaw Man",     "merch": "chainsaw+man+merchandise",    "emoji": "🪚"},
}

DEFAULT_META = {"tag": "Anime", "merch": "anime+merchandise", "emoji": "🎌"}

# ── HELPERS ──────────────────────────────────────────────────────────

def gh_get(path):
    url = f"https://api.github.com/repos/{REPO}/contents/{path}"
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    })
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read())

def gh_put(path, content_bytes, message, sha=None):
    url = f"https://api.github.com/repos/{REPO}/contents/{path}"
    payload = {
        "message": message,
        "content": base64.b64encode(content_bytes).decode()
    }
    if sha:
        payload["sha"] = sha
    data = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, method="PUT", headers={
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    })
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read())

def search_youtube_trending_anime():
    """Search YouTube for today's trending anime clip and return video info."""
    # Rotating search queries by day of year to vary results
    doy = datetime.date.today().timetuple().tm_yday
    queries = [
        "anime best fight scene 2024 HD",
        "naruto vs sasuke best moments",
        "demon slayer best animation 4K",
        "one piece luffy gear 5 moments",
        "jujutsu kaisen best fights HD",
        "dragon ball z iconic moments",
        "attack on titan epic scenes",
        "anime twixtor best clips 2024",
        "bleach thousand year blood war best moments",
        "chainsaw man best scenes HD",
        "anime fight compilation 2024",
        "demon slayer hinokami kagura HD",
        "naruto pain arc best moments",
        "one piece zoro best moments HD",
        "my hero academia deku best fights",
    ]
    query = queries[doy % len(queries)]
    encoded = urllib.parse.quote(query)
    search_url = f"https://www.youtube.com/results?search_query={encoded}&sp=CAMSAhAB"  # sorted by view count

    req = urllib.request.Request(search_url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            html = r.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"YouTube search failed: {e}")
        return None

    # Extract video IDs from YouTube search results page
    video_ids = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
    titles    = re.findall(r'"title":\{"runs":\[\{"text":"([^"]+)"', html)

    if not video_ids:
        print("No video IDs found in search results")
        return None

    # Return first result
    vid_id = video_ids[0]
    title  = titles[0] if titles else query.replace("+", " ").title()

    return {"video_id": vid_id, "title": title, "query": query}

def detect_anime(title):
    """Detect which anime series a clip title belongs to."""
    title_lower = title.lower()
    for key, meta in ANIME_META.items():
        if key in title_lower:
            return key, meta
    return "anime", DEFAULT_META

def load_clip_log():
    try:
        d = gh_get(LOG_PATH)
        content = base64.b64decode(d["content"]).decode()
        data = json.loads(content)
        sha = d["sha"]
        # Migrate old format
        if "clips" not in data:
            data["clips"] = []
        return data, sha
    except Exception as e:
        print(f"Log load error: {e}")
        return {"clips": [], "used_urls": [], "used_titles": [], "drive_file_ids": []}, None

def build_clips_page(clips):
    """Build the full clips page HTML with all clips embedded."""

    # Build clip cards HTML
    cards_html = ""
    for clip in clips[-MAX_CLIPS:][::-1]:  # newest first, max 20
        vid_id   = clip.get("video_id", "")
        title    = clip.get("title", "Anime Clip")
        anime_key= clip.get("anime_key", "anime")
        meta     = ANIME_META.get(anime_key, DEFAULT_META)
        tag      = meta["tag"]
        merch    = meta["merch"]
        emoji    = meta["emoji"]
        date_str = clip.get("date", "")
        af_link  = f"https://www.amazon.com/s?k={merch}&tag={AFFILIATE}"
        data_attr= anime_key.replace(" ", "-")

        cards_html += f"""
      <!-- {title} -->
      <div class="clip-card" data-anime="{data_attr}">
        <div class="video-wrapper">
          <iframe src="https://www.youtube.com/embed/{vid_id}?rel=0&modestbranding=1" title="{title}" allowfullscreen loading="lazy"></iframe>
          <div class="video-watermark">
            <img src="{LOGO_URL}" alt="Dreaming Anime">
            <span>DREAMING ANIME</span>
          </div>
        </div>
        <div class="clip-info">
          <div class="clip-tags"><span class="clip-tag hot">🔥 Trending</span><span class="clip-tag">{tag}</span></div>
          <div class="clip-title">{title}</div>
          <div class="clip-meta">{emoji} {tag} · Added {date_str}</div>
          <div class="clip-actions">
            <a href="{af_link}" class="btn-merch" target="_blank" rel="noopener">🛒 Shop {tag} Merch</a>
            <a href="#" class="btn-share" onclick="shareClip(this)">Share</a>
          </div>
        </div>
      </div>"""

    # Coming soon slot
    cards_html += """
      <div class="clip-card coming-soon-card" data-anime="all">
        <div class="icon">⚡</div>
        <h3>New Clip Tomorrow</h3>
        <p>Daily trending clips added every 24 hours</p>
        <a href="/dreaming-anime/blog/" style="font-size:12px;color:var(--orange);font-weight:700;margin-top:4px;">Read the Blog →</a>
      </div>"""

    total = len(clips[-MAX_CLIPS:])

    # Build filter buttons for detected anime
    detected_anime = list({c.get("anime_key","anime").replace(" ","-") for c in clips})
    filter_btns = '<button class="filter-btn active" onclick="filterClips(\'all\', this)">All</button>\n'
    anime_labels = {
        "naruto":"Naruto","demon-slayer":"Demon Slayer","one-piece":"One Piece",
        "jujutsu-kaisen":"JJK","dragon-ball":"Dragon Ball","attack-on-titan":"AOT",
        "my-hero-academia":"MHA","haikyuu":"Haikyuu","bleach":"Bleach",
        "chainsaw-man":"Chainsaw Man","anime":"Other"
    }
    for ak in detected_anime:
        label = anime_labels.get(ak, ak.replace("-"," ").title())
        filter_btns += f'    <button class="filter-btn" onclick="filterClips(\'{ak}\', this)">{label}</button>\n'

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Anime Clips — Dreaming Anime</title>
  <meta name="description" content="Watch the hottest trending anime clips. Epic fights, iconic moments, and viral scenes — all in one place. Curated daily by Dreaming Anime.">
  <meta property="og:title" content="Anime Clips — Dreaming Anime">
  <meta property="og:description" content="The best trending anime clips, curated daily. Epic battles, iconic scenes, viral moments.">
  <meta property="og:image" content="{LOGO_URL}">
  <meta property="og:url" content="https://priscadezigns.org/dreaming-anime/clips/">
  <link rel="canonical" href="https://priscadezigns.org/dreaming-anime/clips/">
  <style>
    :root {{
      --orange: #FF6B00;
      --orange-dim: rgba(255,107,0,0.15);
      --bg: #0a0a0a;
      --bg-tint: #111111;
      --bg-card: #161616;
      --border: rgba(255,107,0,0.2);
      --text: #ffffff;
      --text-muted: rgba(255,255,255,0.55);
      --font: 'Segoe UI', system-ui, -apple-system, sans-serif;
    }}
    *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{ background: var(--bg); color: var(--text); font-family: var(--font); line-height: 1.6; }}
    a {{ color: inherit; text-decoration: none; }}
    nav {{
      position: sticky; top: 0; z-index: 100;
      background: rgba(10,10,10,0.95); backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      padding: 0 40px; height: 64px;
      display: flex; align-items: center; justify-content: space-between; gap: 20px;
    }}
    .nav-logo img {{ height: 40px; width: 40px; object-fit: cover; border-radius: 50%; }}
    .nav-links {{ display: flex; list-style: none; gap: 28px; }}
    .nav-links a {{ font-size: 14px; font-weight: 500; color: var(--text-muted); transition: color 0.2s; }}
    .nav-links a:hover, .nav-links a.active {{ color: var(--orange); }}
    .nav-cta {{ background: var(--orange); color: #fff; font-size: 13px; font-weight: 700; padding: 9px 20px; border-radius: 6px; white-space: nowrap; transition: opacity 0.2s; }}
    .nav-cta:hover {{ opacity: 0.85; }}
    .hero {{ background: linear-gradient(160deg, #0a0a0a 0%, #1a0a00 50%, #0a0a0a 100%); border-bottom: 1px solid var(--border); padding: 72px 40px 56px; text-align: center; }}
    .hero-eyebrow {{ font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--orange); margin-bottom: 16px; }}
    .hero h1 {{ font-size: clamp(36px, 6vw, 64px); font-weight: 900; line-height: 1.05; margin-bottom: 16px; letter-spacing: -1px; }}
    .hero h1 span {{ color: var(--orange); }}
    .hero p {{ font-size: 17px; color: var(--text-muted); max-width: 560px; margin: 0 auto 28px; }}
    .badge-row {{ display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }}
    .badge {{ background: var(--orange-dim); border: 1px solid var(--border); color: var(--orange); font-size: 12px; font-weight: 700; padding: 5px 14px; border-radius: 20px; letter-spacing: 0.5px; }}
    .ticker {{ background: var(--orange); color: #fff; padding: 10px 0; overflow: hidden; white-space: nowrap; }}
    .ticker-inner {{ display: inline-flex; animation: ticker 30s linear infinite; }}
    .ticker-item {{ font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding-right: 80px; }}
    @keyframes ticker {{ 0% {{ transform: translateX(0); }} 100% {{ transform: translateX(-33.33%); }} }}
    .filter-bar {{ background: var(--bg-tint); border-bottom: 1px solid var(--border); padding: 16px 40px; display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }}
    .filter-bar span {{ font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-right: 4px; }}
    .filter-btn {{ background: transparent; border: 1px solid var(--border); color: var(--text-muted); font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 20px; cursor: pointer; transition: all 0.2s; }}
    .filter-btn:hover, .filter-btn.active {{ background: var(--orange); border-color: var(--orange); color: #fff; }}
    .clips-section {{ max-width: 1280px; margin: 0 auto; padding: 48px 40px; }}
    .section-header {{ display: flex; align-items: baseline; gap: 12px; margin-bottom: 32px; }}
    .section-header h2 {{ font-size: 22px; font-weight: 800; }}
    .section-header .count {{ font-size: 13px; color: var(--text-muted); }}
    .clips-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 28px; }}
    .clip-card {{ background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; transition: transform 0.2s, border-color 0.2s; }}
    .clip-card:hover {{ transform: translateY(-4px); border-color: var(--orange); }}
    .video-wrapper {{ position: relative; padding-bottom: 56.25%; height: 0; background: #000; }}
    .video-wrapper iframe {{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }}
    .video-watermark {{ position: absolute; bottom: 10px; right: 10px; z-index: 10; pointer-events: none; opacity: 0.85; display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.6); border-radius: 20px; padding: 4px 10px 4px 4px; }}
    .video-watermark img {{ height: 28px; width: 28px; object-fit: cover; border-radius: 50%; }}
    .video-watermark span {{ font-size: 11px; font-weight: 700; color: #fff; letter-spacing: 0.5px; }}
    .clip-info {{ padding: 16px 18px 18px; }}
    .clip-tags {{ display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }}
    .clip-tag {{ font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--orange); background: var(--orange-dim); border-radius: 4px; padding: 3px 8px; }}
    .clip-tag.hot {{ background: rgba(255,50,50,0.15); color: #ff5050; }}
    .clip-title {{ font-size: 16px; font-weight: 700; margin-bottom: 6px; line-height: 1.3; }}
    .clip-meta {{ font-size: 12px; color: var(--text-muted); margin-bottom: 14px; }}
    .clip-actions {{ display: flex; gap: 10px; align-items: center; }}
    .btn-merch {{ background: var(--orange); color: #fff; font-size: 12px; font-weight: 700; padding: 8px 16px; border-radius: 6px; transition: opacity 0.2s; white-space: nowrap; }}
    .btn-merch:hover {{ opacity: 0.85; }}
    .btn-share {{ font-size: 12px; color: var(--text-muted); border: 1px solid var(--border); padding: 8px 14px; border-radius: 6px; transition: all 0.2s; cursor: pointer; background: transparent; }}
    .btn-share:hover {{ color: var(--orange); border-color: var(--orange); }}
    .coming-soon-card {{ background: var(--bg-card); border: 2px dashed var(--border); border-radius: 12px; padding: 48px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }}
    .coming-soon-card .icon {{ font-size: 36px; margin-bottom: 4px; }}
    .coming-soon-card h3 {{ font-size: 16px; font-weight: 700; }}
    .coming-soon-card p {{ font-size: 13px; color: var(--text-muted); max-width: 200px; }}
    .merch-banner {{ background: linear-gradient(135deg, #1a0800 0%, #2d1200 100%); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 56px 40px; text-align: center; }}
    .merch-banner h2 {{ font-size: clamp(24px, 4vw, 40px); font-weight: 900; margin-bottom: 12px; }}
    .merch-banner h2 span {{ color: var(--orange); }}
    .merch-banner p {{ font-size: 16px; color: var(--text-muted); margin-bottom: 28px; max-width: 500px; margin-left: auto; margin-right: auto; }}
    .btn-orange {{ background: var(--orange); color: #fff; font-size: 15px; font-weight: 700; padding: 14px 36px; border-radius: 8px; display: inline-block; transition: opacity 0.2s; }}
    .btn-orange:hover {{ opacity: 0.85; }}
    footer {{ background: #050505; border-top: 1px solid var(--border); padding: 32px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }}
    .footer-brand {{ display: flex; align-items: center; gap: 10px; }}
    .footer-brand img {{ height: 32px; width: 32px; object-fit: cover; border-radius: 50%; }}
    .footer-brand span {{ font-size: 14px; font-weight: 700; }}
    .footer-links {{ display: flex; gap: 20px; flex-wrap: wrap; }}
    .footer-links a {{ font-size: 13px; color: var(--text-muted); transition: color 0.2s; }}
    .footer-links a:hover {{ color: var(--orange); }}
    .footer-copy {{ font-size: 12px; color: var(--text-muted); width: 100%; text-align: center; border-top: 1px solid var(--border); padding-top: 20px; margin-top: 8px; }}
    @media (max-width: 768px) {{
      nav {{ padding: 0 20px; }}
      .nav-links {{ display: none; }}
      .hero {{ padding: 48px 20px 40px; }}
      .filter-bar {{ padding: 14px 20px; }}
      .clips-section {{ padding: 32px 20px; }}
      .clips-grid {{ grid-template-columns: 1fr; }}
      .merch-banner {{ padding: 40px 20px; }}
      footer {{ padding: 24px 20px; flex-direction: column; align-items: flex-start; }}
    }}
  </style>
</head>
<body>
  <nav>
    <a href="/dreaming-anime/" class="nav-logo">
      <img src="{LOGO_URL}" alt="Dreaming Anime">
    </a>
    <ul class="nav-links">
      <li><a href="/dreaming-anime/#merch">Merch</a></li>
      <li><a href="/dreaming-anime/#anime-of-month">Anime of Month</a></li>
      <li><a href="/dreaming-anime/#series">Series</a></li>
      <li><a href="/dreaming-anime/clips/" class="active">Clips</a></li>
      <li><a href="/dreaming-anime/blog/">Blog</a></li>
    </ul>
    <a href="/dreaming-anime/shop/" class="nav-cta">Shop Merch</a>
  </nav>

  <section class="hero">
    <p class="hero-eyebrow">⚡ Daily Trending · Curated by Dreaming Anime</p>
    <h1>Anime <span>Clips</span><br>That Hit Different</h1>
    <p>Epic fights, iconic moments, and viral scenes — the best trending anime clips, updated daily.</p>
    <div class="badge-row">
      <span class="badge">🔥 Trending Now</span>
      <span class="badge">⚡ Updated Daily</span>
      <span class="badge">🎌 All Fandoms</span>
      <span class="badge">📺 YouTube Embeds</span>
    </div>
  </section>

  <div class="ticker">
    <div class="ticker-inner">
      <span class="ticker-item">Naruto · One Piece · Demon Slayer · Jujutsu Kaisen · Dragon Ball · Attack on Titan · My Hero Academia · Haikyuu · NEW CLIPS EVERY DAY ⚡</span>
      <span class="ticker-item">Naruto · One Piece · Demon Slayer · Jujutsu Kaisen · Dragon Ball · Attack on Titan · My Hero Academia · Haikyuu · NEW CLIPS EVERY DAY ⚡</span>
      <span class="ticker-item">Naruto · One Piece · Demon Slayer · Jujutsu Kaisen · Dragon Ball · Attack on Titan · My Hero Academia · Haikyuu · NEW CLIPS EVERY DAY ⚡</span>
    </div>
  </div>

  <div class="filter-bar">
    <span>Filter:</span>
    {filter_btns}
  </div>

  <section class="clips-section">
    <div class="section-header">
      <h2>🔥 Trending Clips</h2>
      <span class="count" id="clip-count">{total} clip{'s' if total != 1 else ''} this week</span>
    </div>
    <div class="clips-grid" id="clips-grid">
      {cards_html}
    </div>
  </section>

  <section class="merch-banner">
    <h2>Love the Anime?<br><span>Own the Merch.</span></h2>
    <p>Figures, plushies, apparel, and collectibles from every fandom — curated and Amazon-verified.</p>
    <a href="/dreaming-anime/shop/" class="btn-orange">🛒 Browse All Merch →</a>
  </section>

  <footer>
    <div class="footer-brand">
      <img src="{LOGO_URL}" alt="Dreaming Anime">
      <span>Dreaming Anime</span>
    </div>
    <div class="footer-links">
      <a href="/dreaming-anime/">Home</a>
      <a href="/dreaming-anime/clips/">Clips</a>
      <a href="/dreaming-anime/blog/">Blog</a>
      <a href="/dreaming-anime/shop/">Shop</a>
      <a href="/dreaming-anime/blog/privacy.html">Privacy</a>
    </div>
    <p class="footer-copy">© 2026 Dreaming Anime · Part of the Prisca Dezigns Empire · Affiliate Disclosure: We earn from qualifying Amazon purchases.</p>
  </footer>

  <script>
    function filterClips(anime, btn) {{
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cards = document.querySelectorAll('#clips-grid .clip-card');
      let count = 0;
      cards.forEach(card => {{
        const cardAnime = card.getAttribute('data-anime');
        if (anime === 'all' || cardAnime === anime) {{
          card.style.display = '';
          if (cardAnime !== 'all') count++;
        }} else {{
          card.style.display = 'none';
        }}
      }});
      document.getElementById('clip-count').textContent = anime === 'all'
        ? '{total} clips this week'
        : count + ' clip' + (count !== 1 ? 's' : '') + ' found';
    }}
    function shareClip(btn) {{
      const card = btn.closest('.clip-card');
      const title = card.querySelector('.clip-title').textContent;
      if (navigator.share) {{
        navigator.share({{ title: title + ' — Dreaming Anime', url: window.location.href }});
      }} else {{
        navigator.clipboard.writeText(window.location.href).then(() => {{
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = 'Share', 2000);
        }});
      }}
    }}
  </script>
</body>
</html>"""


def run():
    print(f"[{datetime.datetime.now()}] Anime clip fetcher starting...")

    # 1. Search YouTube for today's trending clip
    result = search_youtube_trending_anime()
    if not result:
        print("No YouTube result found. Exiting.")
        return

    vid_id = result["video_id"]
    title  = result["title"]
    print(f"Found: {title} ({vid_id})")

    # 2. Load existing log
    log, log_sha = load_clip_log()
    clips = log.get("clips", [])

    # Check for duplicates
    existing_ids = {c.get("video_id") for c in clips}
    if vid_id in existing_ids:
        print(f"Already logged: {vid_id}. Exiting.")
        return

    # 3. Detect anime
    anime_key, meta = detect_anime(title)

    # 4. Append to log
    today = datetime.date.today().isoformat()
    clips.append({
        "video_id":  vid_id,
        "title":     title,
        "anime_key": anime_key,
        "date":      today,
        "query":     result["query"]
    })
    log["clips"] = clips

    # 5. Push updated log
    log_bytes = json.dumps(log, indent=2).encode()
    try:
        gh_put(LOG_PATH, log_bytes, f"Add anime clip: {title[:50]}", sha=log_sha)
        print(f"Log updated: {len(clips)} total clips")
    except Exception as e:
        print(f"Log push failed: {e}")
        return

    # 6. Rebuild clips page
    page_html = build_clips_page(clips)

    # Get current SHA of clips page
    try:
        d = gh_get(CLIPS_PATH)
        clips_sha = d["sha"]
    except:
        clips_sha = None

    try:
        gh_put(CLIPS_PATH, page_html.encode(), f"Update clips page: added {title[:40]}", sha=clips_sha)
        print(f"Clips page updated with {len(clips)} clips")
    except Exception as e:
        print(f"Clips page push failed: {e}")
        return

    print(f"Done. New clip live: {title}")


if __name__ == "__main__":
    run()
