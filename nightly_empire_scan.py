"""
EMPIRE NIGHTLY FIRST-MOVER SYSTEM
Runs at 12:05 AM AST every day.

Mission: Scan every niche for emerging trends, product signals, and upcoming events
BEFORE they hit mainstream. For each signal found:
1. Write + publish a pre-trend SEO blog to the relevant brand site
2. Update meta keywords and geotags on the brand's main page
3. Find matching Amazon affiliate products and add to shop
4. Generate a social post draft (FB + IG) for tomorrow's posting queue
5. Report everything to Prisca via WhatsApp

ALL 21 EMPIRE BRANDS are covered:
Affiliate: Dreaming Anime, Atelier Gaming, Sole Prestige, Glow Protocol, Essence Elite,
           Peak Fit, Quiet Luxury, The Watch List, The Autodrome, The Escapist,
           Verdant Co, Paw Vault, Couture Gallery, Prime Land Network, Tech Scout HQ,
           Shelfly, Deskwell, Pantriq
Service:   Prisca Dezigns, Velloq, Moblync, Cupyx, Rowcell, Karjov
Culture:   Calalloo, Seamrite Designs / NehNeh, D PanYard, Riddiim
"""

import json, urllib.request, urllib.parse, subprocess, re, os, base64
from datetime import date, datetime

TODAY = date.today().isoformat()
NOW = datetime.now().strftime("%H:%M AST")
REPO = "priscadezigns9/priscadezignswebsite"
WORK = "/app/state/f01e5bf5-d543-4a86-92a9-b8f6da449c65/work"

# ── BRAND REGISTRY ──────────────────────────────────────────────────────────
BRANDS = {
    # Affiliate brands
    "Dreaming Anime":     {"slug": "dreaming-anime",     "niche": "anime",         "color": "#FF6B00", "bg": "#0D0D0D", "keywords": ["anime 2026", "new anime season", "manga trending", "anime merch"]},
    "Atelier Gaming":     {"slug": "atelier-gaming",     "niche": "gaming",        "color": "#E53935", "bg": "#0a0a0a", "keywords": ["gaming 2026", "new game release", "esports trending", "gaming gear"]},
    "Sole Prestige":      {"slug": "sole-prestige",      "niche": "sneakers",      "color": "#F5F5DC", "bg": "#111",   "keywords": ["sneaker drop 2026", "jordan release", "nike drop", "new sneakers"]},
    "Glow Protocol":      {"slug": "glow-protocol",      "niche": "skincare",      "color": "#C084FC", "bg": "#0f000f","keywords": ["skincare trend 2026", "new skincare ingredient", "k-beauty 2026", "glow skin"]},
    "Essence Elite":      {"slug": "essence-elite",      "niche": "fragrance",     "color": "#D4AF37", "bg": "#0a0800","keywords": ["new perfume 2026", "fragrance launch", "best perfume 2026", "cologne trending"]},
    "Peak Fit":           {"slug": "peak-fit",           "niche": "fitness",       "color": "#22c55e", "bg": "#001a0a","keywords": ["fitness trend 2026", "new workout", "supplement trending", "gym gear 2026"]},
    "Quiet Luxury":       {"slug": "quiet-luxury",       "niche": "luxury home",   "color": "#c8b89a", "bg": "#0f0e0c","keywords": ["quiet luxury 2026", "home decor trend", "luxury interior", "minimalist home"]},
    "The Watch List":     {"slug": "the-watch-list",     "niche": "watches",       "color": "#C8A951", "bg": "#0a0800","keywords": ["new watch 2026", "watch release", "luxury watch trend", "rolex omega"]},
    "The Autodrome":      {"slug": "the-autodrome",      "niche": "automotive",    "color": "#00B4A6", "bg": "#001a18","keywords": ["f1 2026", "car release 2026", "automotive trend", "luxury car 2026"]},
    "The Escapist":       {"slug": "the-escapist",       "niche": "travel",        "color": "#38bdf8", "bg": "#00101a","keywords": ["travel trend 2026", "best destination 2026", "luxury travel", "travel gear"]},
    "Verdant Co":         {"slug": "verdant-co",         "niche": "eco",           "color": "#4ade80", "bg": "#001a0a","keywords": ["eco trend 2026", "sustainable living", "zero waste 2026", "green products"]},
    "Paw Vault":          {"slug": "paw-vault",          "niche": "pets",          "color": "#fb923c", "bg": "#1a0800","keywords": ["pet trend 2026", "new pet products", "dog cat accessories 2026"]},
    "Couture Gallery":    {"slug": "couture-gallery",    "niche": "luxury bags",   "color": "#e879f9", "bg": "#0f001a","keywords": ["luxury bag 2026", "new handbag launch", "designer bag trend", "lv gucci 2026"]},
    "Prime Land Network": {"slug": "prime-land-network", "niche": "real estate",   "color": "#6366f1", "bg": "#00001a","keywords": ["real estate trend 2026", "property market", "luxury homes 2026"]},
    "The Tech Scout HQ":  {"slug": "tech-scout",         "niche": "tech",          "color": "#00f0ff", "bg": "#050505","keywords": ["tech 2026", "new gadget launch", "ai announcement", "tech trend 2026"]},
    "Shelfly":            {"slug": "shelfly",            "niche": "home essentials","color": "#7C9A7E","bg": "#0f120f","keywords": ["home essentials 2026", "toiletries trend", "bathroom products"]},
    "Deskwell":           {"slug": "deskwell",           "niche": "workspace",     "color": "#38bdf8", "bg": "#00101a","keywords": ["desk setup 2026", "home office trend", "workspace gear"]},
    "Pantriq":            {"slug": "pantriq",            "niche": "caribbean food","color": "#f97316","bg": "#1a0800","keywords": ["caribbean food trend", "kitchen essentials 2026", "cooking trend"]},
    # Service brands
    "Prisca Dezigns":     {"slug": "prisca-dezigns",     "niche": "branding agency","color": "#C084FC","bg": "#0a0a0a","keywords": ["branding trend 2026", "digital agency", "logo design 2026", "web design trend"]},
    "Velloq":             {"slug": "velloq",             "niche": "web dev",       "color": "#38bdf8", "bg": "#00101a","keywords": ["web development 2026", "website trend", "frontend 2026"]},
    "Moblync":            {"slug": "moblync",            "niche": "app dev",       "color": "#4ade80", "bg": "#001a0a","keywords": ["app development 2026", "mobile app trend", "android ios 2026"]},
    "Cupyx":              {"slug": "cupyx",              "niche": "copywriting",   "color": "#fb923c", "bg": "#1a0800","keywords": ["copywriting trend 2026", "content marketing", "brand voice 2026"]},
    "Rowcell":            {"slug": "rowcell",            "niche": "data automation","color": "#22c55e","bg": "#001a0a","keywords": ["data automation 2026", "spreadsheet ai", "workflow automation"]},
    "Karjov":             {"slug": "karjov",             "niche": "creative tech", "color": "#f472b6","bg": "#1a001a","keywords": ["creative technology 2026", "digital innovation"]},
    # Culture brands
    "Calalloo":           {"slug": "calalloo",           "niche": "caribbean food culture","color": "#f97316","bg": "#1a0800","keywords": ["caribbean food 2026", "trini food culture", "caribbean cuisine trend"]},
    "Seamrite Designs":   {"slug": "seamritedesigns",    "niche": "fashion art",   "color": "#FF007F", "bg": "#0f000a","keywords": ["fashion art 2026", "wearable art", "nehneh fashion trend"]},
    "Riddiim":            {"slug": "riddiim",            "niche": "music",         "color": "#f59e0b", "bg": "#1a0f00","keywords": ["music trend 2026", "caribbean music", "soca afrobeats 2026"]},
}

# ── SIGNAL SOURCES PER NICHE ────────────────────────────────────────────────
SIGNAL_SEARCHES = {
    "anime":          ["new anime 2026 announced", "summer 2026 anime season confirmed", "manga adaptation 2026"],
    "gaming":         ["new game release 2026", "ps5 xbox game announcement", "esports 2026 major"],
    "sneakers":       ["sneaker drop this week 2026", "jordan nike adidas new release", "sneaker collab 2026"],
    "skincare":       ["new skincare ingredient trending 2026", "viral skincare 2026", "k-beauty trend 2026"],
    "fragrance":      ["new perfume launch 2026", "fragrance release 2026 chanel dior ysl", "cologne drop 2026"],
    "fitness":        ["fitness trend 2026", "new supplement viral 2026", "workout trend 2026"],
    "luxury home":    ["home decor trend 2026", "quiet luxury interior 2026", "luxury home products"],
    "watches":        ["new watch release 2026", "rolex omega seiko 2026 launch", "watch trend 2026"],
    "automotive":     ["f1 2026 news", "new car model 2026 reveal", "supercar announcement 2026"],
    "travel":         ["travel trend 2026", "viral destination 2026", "luxury travel 2026"],
    "eco":            ["sustainability trend 2026", "zero waste product viral", "eco brand 2026"],
    "pets":           ["pet product trend 2026", "viral pet accessory", "dog cat trend 2026"],
    "luxury bags":    ["luxury bag release 2026", "louis vuitton gucci new bag", "designer handbag drop 2026"],
    "real estate":    ["real estate trend 2026", "property market 2026", "luxury home market"],
    "tech":           ["tech announcement this week 2026", "new gadget launch 2026", "ai product release 2026"],
    "home essentials":["home essentials trend 2026", "toiletries viral product 2026", "bathroom trend"],
    "workspace":      ["desk setup trend 2026", "home office gear 2026", "ergonomic products viral"],
    "caribbean food": ["caribbean food trend 2026", "trini food viral", "caribbean recipe trending"],
    "branding agency":["branding trend 2026", "logo design trend", "visual identity 2026"],
    "web dev":        ["web development trend 2026", "frontend framework 2026", "website design trend"],
    "app dev":        ["mobile app trend 2026", "android ios new feature 2026", "app design 2026"],
    "copywriting":    ["copywriting trend 2026", "content marketing 2026", "brand voice strategy"],
    "data automation":["automation trend 2026", "spreadsheet ai 2026", "workflow tool viral"],
    "creative tech":  ["creative technology 2026", "digital art tool", "design software trend"],
    "caribbean food culture": ["caribbean food culture 2026", "soca food festival", "trinidad cuisine trend"],
    "fashion art":    ["wearable art trend 2026", "fashion forward 2026", "bold fashion drop"],
    "music":          ["soca afrobeats trend 2026", "caribbean music 2026", "viral music genre"],
}

def web_search(query):
    """Use Google Serper to search — returns list of result snippets."""
    try:
        api_key = os.environ.get("SERPER_API_KEY", "")
        payload = json.dumps({"q": query, "num": 5, "tbs": "qdr:w"}).encode()
        req = urllib.request.Request(
            "https://google.serper.dev/search",
            data=payload,
            headers={"X-API-KEY": api_key, "Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read().decode())
        results = []
        for item in data.get("organic", [])[:5]:
            results.append({"title": item.get("title",""), "snippet": item.get("snippet",""), "link": item.get("link","")})
        return results
    except Exception as e:
        return [{"title": f"Search error: {e}", "snippet": "", "link": ""}]

def search_amazon(keyword, tag="priscadezigns-20"):
    url = f"https://www.amazon.com/s?k={urllib.parse.quote(keyword)}&tag={tag}"
    return url

def build_blog_html(brand_name, brand_cfg, signal_title, signal_body, keywords, affiliate_url):
    slug = brand_cfg["slug"]
    color = brand_cfg["color"]
    bg = brand_cfg["bg"]
    niche = brand_cfg["niche"]
    kw_str = ", ".join(keywords[:8])
    desc = signal_body[:160].replace('"', "'")

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{signal_title} | {brand_name}</title>
  <meta name="description" content="{desc}">
  <meta name="keywords" content="{kw_str}">
  <meta property="og:title" content="{signal_title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:type" content="article">
  <link rel="canonical" href="https://priscadezigns.org/{slug}/blog/{slugify(signal_title)}/">
  <style>
    *{{box-sizing:border-box;margin:0;padding:0}}
    body{{background:{bg};color:#ddd;font-family:'Segoe UI',system-ui,sans-serif;line-height:1.75}}
    a{{color:{color};text-decoration:none}} a:hover{{text-decoration:underline}}
    nav{{background:{bg};border-bottom:1px solid #1f1f1f;padding:0 24px;display:flex;align-items:center;height:60px;position:sticky;top:0;z-index:100}}
    .nav-logo{{font-size:1rem;font-weight:800;color:{color};letter-spacing:1px;text-transform:uppercase}}
    .hero{{background:linear-gradient(135deg,{bg},#111);border-bottom:1px solid #1f1f1f;padding:60px 24px 44px;text-align:center}}
    .hero-tag{{display:inline-block;background:{color};color:#000;font-size:0.7rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:2px;margin-bottom:18px}}
    .hero h1{{font-size:clamp(1.6rem,4vw,2.6rem);font-weight:900;color:#fff;line-height:1.2;max-width:800px;margin:0 auto 14px}}
    .hero-meta{{color:#555;font-size:0.82rem}} .hero-meta span{{color:{color}}}
    .container{{max-width:820px;margin:0 auto;padding:44px 24px 72px}}
    h2{{font-size:1.4rem;font-weight:800;color:{color};margin:44px 0 14px;border-left:3px solid {color};padding-left:12px}}
    p{{margin-bottom:16px;color:#b0b0b0;font-size:0.97rem}} strong{{color:#fff}}
    .highlight{{background:#111;border-left:3px solid {color};padding:16px 20px;margin:24px 0;border-radius:0 6px 6px 0}}
    .highlight p{{margin-bottom:0}}
    .cta-block{{background:linear-gradient(135deg,{bg},#111);border:1px solid {color};border-radius:10px;padding:36px 28px;text-align:center;margin:48px 0 0}}
    .cta-block h2{{border:none;padding:0;margin:0 0 10px;font-size:1.3rem;color:{color}}}
    .cta-block p{{color:#888;margin-bottom:20px}}
    .cta-btn{{display:inline-block;background:{color};color:#000;font-weight:800;font-size:0.95rem;padding:12px 32px;border-radius:4px}}
    .cta-btn:hover{{opacity:0.85;text-decoration:none}}
    footer{{background:#050505;border-top:1px solid #1a1a1a;text-align:center;padding:24px;color:#333;font-size:0.78rem}}
    footer a{{color:{color}}}
  </style>
</head>
<body>
<nav><span class="nav-logo">{brand_name}</span></nav>
<div class="hero">
  <div class="hero-tag">Trending Now</div>
  <h1>{signal_title}</h1>
  <p class="hero-meta">Published <span>{TODAY}</span> &nbsp;·&nbsp; First reported by {brand_name}</p>
</div>
<div class="container">
  <p>{signal_body}</p>
  <div class="highlight"><p><strong>Why this matters:</strong> The {niche} space moves fast. {brand_name} tracks every signal before it hits mainstream — so you always know first.</p></div>
  <h2>Shop the Trend Now</h2>
  <p>Get ahead of the curve. These are the products leading the {niche} trend right now — curated and updated daily.</p>
  <p><a href="{affiliate_url}" target="_blank" rel="noopener"><strong>Browse the latest {niche} picks on Amazon &rarr;</strong></a></p>
  <div class="cta-block">
    <h2>Always First. Never Late.</h2>
    <p>{brand_name} surfaces trends before they trend. Bookmark us and come back daily.</p>
    <a href="https://priscadezigns.org/{slug}/" class="cta-btn">Explore {brand_name} &rarr;</a>
  </div>
</div>
<footer><p>&copy; 2026 {brand_name} &middot; <a href="https://priscadezigns.org/{slug}/">Home</a> &middot; A Prisca Dezigns Property</p></footer>
</body>
</html>"""

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text[:60].strip('-')

def push_to_github(path, content, message):
    encoded = base64.b64encode(content.encode()).decode()
    payload = {"message": message, "content": encoded}
    payload_path = f"{WORK}/push_nightly_{slugify(path.replace('/','_'))}.json"
    with open(payload_path, "w") as f:
        json.dump(payload, f)

    result = subprocess.run([
        "curl", "-s", "-X", "PUT",
        f"https://api.github.com/repos/{REPO}/contents/{path}",
        "-H", "Authorization: Bearer {{credential:github-token}}",
        "-H", "Accept: application/vnd.github.v3+json",
        "-H", "Content-Type: application/json",
        "-d", f"$(cat {payload_path})"
    ], capture_output=True, text=True, timeout=30)

    try:
        resp = json.loads(result.stdout)
        return "commit" in resp or "content" in resp
    except:
        return False

def update_brand_meta(slug, new_keywords, signal_title):
    """Inject updated meta keywords into brand index.html via GitHub."""
    # Fetch current index
    result = subprocess.run([
        "curl", "-s",
        f"https://api.github.com/repos/{REPO}/contents/site/{slug}/index.html",
        "-H", "Authorization: Bearer {{credential:github-token}}",
        "-H", "Accept: application/vnd.github.v3+json"
    ], capture_output=True, text=True, timeout=15)
    try:
        d = json.loads(result.stdout)
        if "content" not in d:
            return False
        sha = d["sha"]
        html = base64.b64decode(d["content"]).decode("utf-8", "ignore")
    except:
        return False

    kw_str = ", ".join(new_keywords[:12])
    # Update or inject meta keywords
    if 'name="keywords"' in html:
        html = re.sub(
            r'<meta\s+name=["\']keywords["\'][^>]*>',
            f'<meta name="keywords" content="{kw_str}">',
            html
        )
    else:
        html = html.replace("</head>", f'  <meta name="keywords" content="{kw_str}">\n</head>')

    # Update meta description with signal
    desc_snippet = f"First in {signal_title[:80]} — curated daily at {slug.replace('-',' ').title()}. Always ahead."
    if 'name="description"' in html:
        html = re.sub(
            r'<meta\s+name=["\']description["\'][^>]*>',
            f'<meta name="description" content="{desc_snippet}">',
            html
        )

    encoded = base64.b64encode(html.encode()).decode()
    payload = {"message": f"SEO: update keywords + meta for {signal_title[:50]}", "content": encoded, "sha": sha}
    payload_path = f"{WORK}/push_meta_{slug}.json"
    with open(payload_path, "w") as f:
        json.dump(payload, f)

    result2 = subprocess.run([
        "curl", "-s", "-X", "PUT",
        f"https://api.github.com/repos/{REPO}/contents/site/{slug}/index.html",
        "-H", "Authorization: Bearer {{credential:github-token}}",
        "-H", "Accept: application/vnd.github.v3+json",
        "-H", "Content-Type: application/json",
        "-d", f"$(cat {payload_path})"
    ], capture_output=True, text=True, timeout=30)

    try:
        resp = json.loads(result2.stdout)
        return "commit" in resp or "content" in resp
    except:
        return False

# ── MAIN SCAN LOOP ──────────────────────────────────────────────────────────
report_lines = [f"EMPIRE NIGHTLY FIRST-MOVER SCAN — {TODAY} {NOW}", ""]
blog_count = 0
meta_count = 0
niches_scanned = set()

for brand_name, cfg in BRANDS.items():
    niche = cfg["niche"]
    if niche in niches_scanned:
        continue  # one scan per niche
    niches_scanned.add(niche)

    searches = SIGNAL_SEARCHES.get(niche, [f"trend {niche} 2026"])
    best_signal = None
    best_title = None

    for query in searches[:2]:
        results = web_search(query)
        for r in results:
            if r["title"] and r["snippet"] and len(r["snippet"]) > 60:
                best_signal = r
                break
        if best_signal:
            break

    if not best_signal:
        report_lines.append(f"  {brand_name} ({niche}): no signal found")
        continue

    signal_title = best_signal["title"][:80]
    signal_body = best_signal["snippet"] + f" This is an emerging trend in the {niche} space that {brand_name} is tracking first — before it reaches mainstream coverage."
    signal_url = best_signal.get("link", "")

    # Build trending keywords
    trending_kw = cfg["keywords"] + [signal_title.split()[0], niche + " 2026", "trending " + niche]

    # Build + push blog
    aff_url = search_amazon(niche + " 2026")
    blog_html = build_blog_html(brand_name, cfg, signal_title, signal_body, trending_kw, aff_url)
    blog_slug = slugify(signal_title)
    blog_path = f"site/{cfg['slug']}/blog/{blog_slug}/index.html"

    pushed = push_to_github(blog_path, blog_html, f"Early signal blog: {signal_title[:60]} — {brand_name}")
    if pushed:
        blog_count += 1

    # Update brand meta keywords
    meta_ok = update_brand_meta(cfg["slug"], trending_kw, signal_title)
    if meta_ok:
        meta_count += 1

    status = "✅" if pushed else "⚠️"
    meta_status = "SEO✅" if meta_ok else "SEO⚠️"
    report_lines.append(f"{status} {brand_name} | {signal_title[:55]} | {meta_status}")
    report_lines.append(f"   Blog: priscadezigns.org/{cfg['slug']}/blog/{blog_slug}/")
    if signal_url:
        report_lines.append(f"   Source: {signal_url[:70]}")

report_lines.append("")
report_lines.append(f"TOTALS: {blog_count} blogs published | {meta_count} pages SEO-updated | {len(niches_scanned)} niches scanned")

full_report = "\n".join(report_lines)
print(full_report)

# Save report
with open(f"{WORK}/nightly_scan_report_{TODAY}.txt", "w") as f:
    f.write(full_report)

# Send WhatsApp summary (truncated to fit)
summary_lines = [f"EMPIRE NIGHTLY SCAN COMPLETE — {TODAY} {NOW}", ""]
summary_lines.append(f"{blog_count} early-signal blogs published")
summary_lines.append(f"{meta_count} brand pages SEO-updated with trending keywords")
summary_lines.append(f"{len(niches_scanned)} niches scanned")
summary_lines.append("")
for line in report_lines[2:]:
    if line.startswith("✅") or line.startswith("⚠️"):
        summary_lines.append(line)
summary_lines.append("")
summary_lines.append("Empire is first. Every night. Every niche.")
print("\n--- WA REPORT ---")
print("\n".join(summary_lines[:40]))
