import os

BASE = "/app/state/f01e5bf5-d543-4a86-92a9-b8f6da449c65/work/sites"

BRAND_MAP = {
    "atelier-gaming":     {"name": "Atelier Gaming",       "email": "atelier@priscadezigns.org",         "accent": "#00FF88", "bg": "#0a0a0a"},
    "calalloo":           {"name": "Calalloo",              "email": "calalloo@priscadezigns.org",         "accent": "#FF6B00", "bg": "#0a0a0a"},
    "couture-gallery":    {"name": "Couture Gallery",       "email": "couturegallery@priscadezigns.org",   "accent": "#C9A96E", "bg": "#0a0a0a"},
    "cupyx":              {"name": "Cupyx",                 "email": "cupyx@priscadezigns.org",            "accent": "#FF2D78", "bg": "#0a0a0a"},
    "deskwell":           {"name": "Deskwell",              "email": "deskdwell@priscadezigns.org",        "accent": "#4A9EFF", "bg": "#0a0a0a"},
    "dreaminganime":      {"name": "Dreaming Anime",        "email": "dreaminganime@priscadezigns.org",    "accent": "#FF4500", "bg": "#000"},
    "essence-elite":      {"name": "Essence Elite",         "email": "essenceelite@priscadezigns.org",     "accent": "#D4AF37", "bg": "#0a0a0a"},
    "glowprotocol":       {"name": "Glow Protocol",         "email": "glowprotocol@priscadezigns.org",     "accent": "#FF6B9D", "bg": "#0a0a0a"},
    "karjov":             {"name": "Karjov",                "email": "karjov@priscadezigns.org",           "accent": "#7B2FFF", "bg": "#0a0a0a"},
    "moblync":            {"name": "Moblync",               "email": "moblync@priscadezigns.org",          "accent": "#00D4FF", "bg": "#0a0a0a"},
    "pantriq":            {"name": "Pantriq",               "email": "pantriq@priscadezigns.org",          "accent": "#FF8C00", "bg": "#0a0a0a"},
    "paw-vault":          {"name": "Paw Vault",             "email": "pawvault@priscadezigns.org",         "accent": "#4CAF50", "bg": "#0a0a0a"},
    "peak-fit":           {"name": "Peak Fit",              "email": "peakfit@priscadezigns.org",          "accent": "#FF3D00", "bg": "#0a0a0a"},
    "prime-land-network": {"name": "Prime Land Network",    "email": "primelandnetwork@priscadezigns.org", "accent": "#1E90FF", "bg": "#0a0a0a"},
    "quietluxury":        {"name": "Quiet Luxury",          "email": "quietluxury@priscadezigns.org",      "accent": "#C9A96E", "bg": "#0f0f0f"},
    "riddiim":            {"name": "Riddiim",               "email": "riddiim@priscadezigns.org",          "accent": "#FF1493", "bg": "#0a0a0a"},
    "rowcell":            {"name": "Rowcell",               "email": "rowcell@priscadezigns.org",          "accent": "#00BCD4", "bg": "#0a0a0a"},
    "shelfly":            {"name": "Shelfly",               "email": "shefly@priscadezigns.org",           "accent": "#9C27B0", "bg": "#0a0a0a"},
    "sole-prestige":      {"name": "Sole Prestige",         "email": "soleprestige@priscadezigns.org",     "accent": "#FF6B00", "bg": "#0a0a0a"},
    "tech-scout":         {"name": "The Tech Scout HQ",     "email": "thetechscouthq@priscadezigns.org",   "accent": "#00E5FF", "bg": "#0a0a0a"},
    "the-autodrome":      {"name": "The Autodrome",         "email": "theautorome@priscadezigns.org",      "accent": "#FF3D00", "bg": "#0a0a0a"},
    "the-escapist":       {"name": "The Escapist",          "email": "escapist@priscadezigns.org",         "accent": "#00BFA5", "bg": "#0a0a0a"},
    "the-watch-list":     {"name": "The Watch List",        "email": "thewatchlist@priscadezigns.org",     "accent": "#C9A96E", "bg": "#0a0a0a"},
    "velloq":             {"name": "Velloq",                "email": "velloq@priscadezigns.org",           "accent": "#7B2FFF", "bg": "#0a0a0a"},
    "verdant-co":         {"name": "Verdant Co.",           "email": "verdantco@priscadezigns.org",        "accent": "#4CAF50", "bg": "#0a0a0a"},
}

def build_newsletter_html(brand_name, accent, bg, email):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{brand_name} — Newsletter</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: {bg};
      color: #fff;
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }}
    .container {{ max-width: 560px; width: 100%; text-align: center; }}
    .eyebrow {{
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 6px;
      text-transform: uppercase;
      color: {accent};
      margin-bottom: 24px;
      display: block;
    }}
    h1 {{
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2.4rem, 8vw, 4rem);
      font-weight: 800;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: -2px;
      margin-bottom: 20px;
    }}
    .sub {{
      color: #aaa;
      font-size: 1.05rem;
      line-height: 1.7;
      margin-bottom: 40px;
      max-width: 460px;
      margin-left: auto;
      margin-right: auto;
    }}
    form {{ display: flex; flex-direction: column; gap: 16px; }}
    input {{
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 6px;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      padding: 16px 20px;
      width: 100%;
      outline: none;
      transition: border-color 0.2s;
    }}
    input::placeholder {{ color: #666; }}
    input:focus {{ border-color: {accent}; }}
    button {{
      background: {accent};
      border: none;
      border-radius: 6px;
      color: #000;
      cursor: pointer;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.85rem;
      font-weight: 800;
      letter-spacing: 4px;
      padding: 18px;
      text-transform: uppercase;
      transition: opacity 0.2s;
      width: 100%;
    }}
    button:hover {{ opacity: 0.85; }}
    .back-link {{
      display: inline-block;
      margin-top: 36px;
      color: #555;
      font-size: 0.85rem;
      text-decoration: none;
      letter-spacing: 2px;
      text-transform: uppercase;
      transition: color 0.2s;
    }}
    .back-link:hover {{ color: {accent}; }}
    .success-msg {{
      display: none;
      color: {accent};
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      margin-top: 20px;
      letter-spacing: 2px;
    }}
  </style>
</head>
<body>
  <div class="container">
    <span class="eyebrow">Stay In The Loop</span>
    <h1>{brand_name}<br>Newsletter</h1>
    <p class="sub">Get the latest signals, drops, and intel from {brand_name} delivered straight to your inbox. No noise. Just the alpha.</p>
    <form id="newsletter-form" action="https://formsubmit.co/{email}" method="POST">
      <input type="hidden" name="_subject" value="New Newsletter Subscriber — {brand_name}">
      <input type="hidden" name="_captcha" value="false">
      <input type="hidden" name="_next" value="?subscribed=1">
      <input type="text" name="name" placeholder="Your Name" required autocomplete="name">
      <input type="email" name="email" placeholder="Your Email Address" required autocomplete="email">
      <button type="submit">Subscribe Now</button>
    </form>
    <p class="success-msg" id="success-msg">You're in. Welcome to the inner circle.</p>
    <a href="../" class="back-link">Back to {brand_name}</a>
  </div>
  <script>
    const p = new URLSearchParams(window.location.search);
    if (p.get('subscribed') === '1') {{
      document.getElementById('newsletter-form').style.display = 'none';
      document.getElementById('success-msg').style.display = 'block';
    }}
  </script>
</body>
</html>"""

created = []
for slug, info in BRAND_MAP.items():
    brand_dir = os.path.join(BASE, slug)
    if not os.path.isdir(brand_dir):
        print(f"SKIP (no dir): {slug}")
        continue
    newsletter_dir = os.path.join(brand_dir, "newsletter")
    os.makedirs(newsletter_dir, exist_ok=True)
    html = build_newsletter_html(info["name"], info["accent"], info["bg"], info["email"])
    out_path = os.path.join(newsletter_dir, "index.html")
    with open(out_path, "w") as f:
        f.write(html)
    created.append(slug)
    print(f"OK {slug}/newsletter/index.html")

print(f"\nTotal: {len(created)}")
