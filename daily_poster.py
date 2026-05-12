"""
EmpireDesk Daily Content Poster
Runs 4x per day per brand — text, photo, photo, video
Schedule: 8AM, 11AM, 2PM, 7PM AST
"""
import json, sys, random, urllib.request, urllib.parse, urllib.error, re, os
from datetime import datetime

import os as _os_
_SCRIPT_DIR = _os_.path.dirname(_os_.path.abspath(__file__))

def _path(fname):
    """Resolve a filename relative to the script directory (works from any cwd)."""
    p = _os_.path.join(_SCRIPT_DIR, fname)
    return p if _os_.path.exists(p) else fname

RATE = 6.80

# Brand name → site slug mapping  (must match keys in BRANDS exactly)
BRAND_TO_SLUG = {
    "Verdant Co.":        "verdant-co",
    "The Watch List":     "the-watch-list",
    "Sole Prestige":      "sole-prestige",
    "Atelier Gaming":     "atelier-gaming",
    "Couture Gallery":    "couture-gallery",
    "Essence Elite":      "essence-elite",
    "Glow Protocol":      "glow-protocol",
    "Peak Fit":           "peak-fit",
    "Dreaming Anime":     "dreaming-anime",
    "The Escapist":       "the-escapist",
    "Paw Vault":          "paw-vault",
    "Quiet Luxury":       "quiet-luxury",
    "The Way Made Known": "the-way-made-known",  # Christian content
    "Prime Land Network": "prime-land-network",
    "The Tech Scout HQ":  "tech-scout",       # fixed: was "Tech Scout"
    "Seamrite Designs":             "seamrite-designs",
    "The Autodrome":      "the-autodrome",
    "Prisca Dezigns":     "prisca-dezigns",
}

# Instagram Business Account IDs (loaded from ig_accounts.json)
def _load_ig_ids():
    try:
        with open(_path("ig_accounts.json")) as f:
            accounts = json.load(f)
        return {a["page_name"].strip(): a["ig_id"] for a in accounts}
    except Exception:
        return {}

IG_IDS = _load_ig_ids()

def refresh_tokens_from_credential():
    """Auto-refresh all page tokens using the stored FB user token credential."""
    try:
        import subprocess
        result = subprocess.run(
            ["curl", "-sf",
             "https://graph.facebook.com/me/accounts?limit=100",
             "-H", "Authorization: Bearer {{credential:facebook-user-token}}"],
            capture_output=True, text=True, timeout=15
        )
        data = json.loads(result.stdout)
        pages = data.get("data", [])
        if not pages:
            return False
        updated = {}
        for p in pages:
            updated[p["name"]] = {"id": p["id"], "access_token": p["access_token"]}
        with open(_path("fb_page_tokens.json"), "w") as f:
            json.dump(updated, f, indent=2)
        # Reload IG accounts with fresh tokens
        if os.path.exists("ig_accounts.json"):
            with open(_path("ig_accounts.json")) as f:
                ig = json.load(f)
            for acc in ig:
                pname = acc["page_name"].strip()
                if pname in updated:
                    acc["token"] = updated[pname]["access_token"]
            with open(_path("ig_accounts.json"), "w") as f:
                json.dump(ig, f, indent=2)
        return True
    except Exception:
        return False

def add_product_to_niche_page(slug, product, deploy=False):
    """Inject a product card into the niche page and optionally deploy."""
    path = f"site/{slug}/index.html"
    if not os.path.exists(path):
        return False
    with open(path) as f:
        html = f.read()
    name = product.get("name", "")
    if name in html:
        return False  # already there
    price_usd = product.get("price", 0)
    price_ttd = round(price_usd * RATE, 2)
    link = product.get("link", "#")
    image = product.get("image", "")
    img_html = (
        f'<img src="{image}" alt="{name}" class="product-img" loading="lazy">'
        if image else '<div class="img-fallback">🛍️</div>'
    )
    card = (
        f'<a href="{link}" target="_blank" rel="noopener" class="product-card">'
        f'<div class="product-img-wrap">{img_html}</div>'
        f'<div class="product-info">'
        f'<h3 class="product-name">{name}</h3>'
        f'<div class="product-prices">'
        f'<span class="price-usd">${price_usd:.2f}</span>'
        ''
        f'</div><span class="buy-btn">Shop on Amazon →</span>'
        f'</div></a>'
    )
    grid_match = re.search(r'<div class="products-grid"[^>]*>', html)
    if not grid_match:
        return False
    insert_at = grid_match.end()
    html = html[:insert_at] + '\n' + card + '\n' + html[insert_at:]
    with open(path, 'w') as f:
        f.write(html)
    if deploy:
        os.system("python3 gh_deploy.py")
    return True

# ── BRAND DATA ──
def _load_brands():
    """Load brand configs from fb_page_tokens.json at runtime (tokens never hardcoded)."""
    try:
        with open(_path('fb_page_tokens.json')) as f:
            raw = json.load(f)
    except Exception:
        return {}
    brands = {}
    for name, v in raw.items():
        if not isinstance(v, dict):
            continue
        page_id = v.get('id', '') or v.get('page_id', '')
        token = v.get('access_token', '')
        # Derive niche from brand name
        niche_map = {
            'Verdant Co': 'eco', 'The Way Made Known': 'faith', 'The Watch List': 'watches',
            'Sole Prestige': 'sneakers', 'Atelier Gaming': 'gaming', 'Couture Gallery': 'fashion',
            'The Autodrome': 'cars', 'Peak Fit': 'fitness', 'The Escapist': 'travel',
            'Paw Vault': 'pets', 'Quiet Luxury': 'luxury', 'Glow Protocol': 'skincare',
            'Essence Elite': 'beauty', 'Prime Land Network': 'realestate',
            'The Tech Scout HQ': 'tech', 'Dreaming Anime': 'anime',
            'Prisca Dezigns': 'agency', 'Seamrite Designs': 'fashion_art',
        }
        tag_map = {
            'Verdant Co': 'VerdantCo', 'The Way Made Known': 'TheWayMadeKnown',
            'The Watch List': 'TheWatchList', 'Sole Prestige': 'SolePrestige',
            'Atelier Gaming': 'AtelierGaming', 'Couture Gallery': 'CoutureGallery',
            'The Autodrome': 'TheAutodrome', 'Peak Fit': 'PeakFit',
            'The Escapist': 'TheEscapist', 'Paw Vault': 'PawVault',
            'Quiet Luxury': 'QuietLuxury', 'Glow Protocol': 'GlowProtocol',
            'Essence Elite': 'EssenceElite', 'Prime Land Network': 'PrimeLandNetwork',
            'The Tech Scout HQ': 'TechScout', 'Dreaming Anime': 'DreamingAnime',
            'Prisca Dezigns': 'PriscaDezigns', 'Seamrite Designs': 'SeamriteDesigns',
        }
        # Match by partial name
        matched_name = None
        for k in niche_map:
            if k.lower() in name.lower() or name.lower() in k.lower():
                matched_name = k
                break
        if not matched_name:
            matched_name = name
        niche = niche_map.get(matched_name, 'general')
        tag = tag_map.get(matched_name, name.replace(' ',''))
        brands[matched_name] = {
            'id': page_id, 'token': token,
            'niche': niche, 'tag': tag, 'aff': 'priscadezigns-20'
        }
    return brands

BRANDS = _load_brands()


# ── CAPTION TEMPLATES BY NICHE ──
# 10+ per niche, product-specific placeholders supported via {name} and {price}
CAPTIONS = {
    "eco": [
        "🌿 {name} — because sustainable living shouldn’t mean sacrificing quality. Link in bio 🔗 #VerdantCo #EcoLiving",
        "♻️ Swap one thing. Make it count. {name} is the smarter choice for your home. #VerdantCo #GreenHome",
        "🌱 Your home reflects your values. {name} — shop the eco edit. Link in bio 🔗 #VerdantCo #Sustainable",
        "💪 Good for you. Better for the planet. {name} — shop now. #VerdantCo #EcoFriendly",
        "🌍 Every small switch adds up. Today’s pick: {name}. Shop via link in bio 🔗 #VerdantCo",
        "🍃 We curated it so you don’t have to. {name} — live greener, feel better. #VerdantCo #EcoLiving",
        "💰 Eco-friendly AND budget-smart? Yes. {name} at ${price}. Shop now 🔗 #VerdantCo",
        "✨ {name} — the kind of upgrade your home AND the planet will thank you for. #VerdantCo",
        "🏡 Thoughtful living starts here. {name} — link in bio. #VerdantCo #GreenLiving",
        "♻️ This one’s for the intentional ones. {name} — shop sustainable today. #VerdantCo",
    ],
    "watches": [
        "⌚ {name} — because the right watch speaks before you do. Shop now 🔗 #TheWatchList",
        "👑 Timeless. Iconic. {name} — investment pieces that never go out of style. #TheWatchList",
        "🏆 {name} — crafted for those who understand the art of time. Link in bio 🔗 #TheWatchList",
        "✨ The wrist never lies. {name} at ${price} — shop the edit. #TheWatchList #LuxuryWatch",
        "💼 A great watch is worth more than it costs. {name} — shop now. #TheWatchList",
        "👑 Dress the wrist right. {name} — curated luxury, real prices. Link in bio 🔗 #TheWatchList",
        "⌚ Today’s pick: {name}. If you know, you know. Shop now. #TheWatchList #WatchCollector",
        "💪 Built to outlast trends. {name} — a piece worth wearing every day. #TheWatchList",
        "✨ Legacy on your wrist. {name} — shop the collection. #TheWatchList #LuxuryTimepieces",
        "🏆 This is the one. {name} at ${price}. Shop before it’s gone. 🔗 #TheWatchList",
    ],
    "sneakers": [
        "👟 {name} just landed. Clean, fresh, yours. Shop now 🔗 #SolePrestige",
        "🔥 {name} — the heat is real. Grab your pair before they’re gone. #SolePrestige",
        "💡 Every step matters. Step in {name}. Shop via link in bio 🔗 #SolePrestige",
        "💰 {name} at ${price}. Premium kicks, real price. Link in bio. #SolePrestige #Sneakers",
        "👑 Curated for those who take their sole seriously. Today: {name}. #SolePrestige",
        "🔥 New drop: {name}. First come, first served. Shop now 🔗 #SolePrestige #SneakerHead",
        "⚡ Your outfit needs the right foundation. {name} — shop it. #SolePrestige",
        "👟 Not just sneakers. A statement. {name} — link in bio. #SolePrestige #PremiumSneakers",
        "🏆 The best pairs sell out fast. {name} is live — act now. 🔗 #SolePrestige",
        "💪 {name} — comfort, style, culture. Shop the full collection. #SolePrestige",
    ],
    "gaming": [
        "🎮 {name} — your setup deserves better. Shop now 🔗 #AtelierGaming",
        "⚡ Elite gear for elite players. {name} at ${price}. Link in bio. #AtelierGaming",
        "🏆 Winners don’t settle for average gear. {name} — shop it. #AtelierGaming",
        "🎯 Play harder. Play smarter. {name} — upgrade your station today. 🔗 #AtelierGaming",
        "💥 {name} just dropped into the collection. Your setup will never be the same. #AtelierGaming",
        "🖥️ The right gear makes the difference. Today’s pick: {name}. #AtelierGaming #GamingSetup",
        "🎮 Gear check. {name} at ${price} — worth every cent. Shop now. 🔗 #AtelierGaming",
        "⚡ Built for performance. {name} — dominate every session. #AtelierGaming #GamerLife",
        "👑 We curate so you can focus on the game. Today: {name}. #AtelierGaming",
        "🏆 No excuses when your setup is this good. {name} — link in bio. #AtelierGaming",
    ],
    "automotive": [
        "🏎️ {name} — because your car deserves the same attention you give it. Shop now 🔗 #TheAutodrome",
        "⚡ Upgrade your ride. {name} at ${price}. Link in bio. #TheAutodrome #CarCulture",
        "🚗 The best cars have the best accessories. Today: {name}. Shop it. #TheAutodrome",
        "🔧 {name} — quality gear for serious drivers. Shop now 🔗 #TheAutodrome",
        "🏆 Drive it. Love it. Equip it right. {name} — link in bio. #TheAutodrome #AutoLovers",
        "💥 New in the collection: {name}. Your car will thank you. 🔗 #TheAutodrome",
        "⚡ {name} — performance-grade, daily-driver approved. Shop now. #TheAutodrome",
        "🚗 Every great ride starts with great gear. {name} at ${price}. #TheAutodrome #CarLife",
        "🏎️ Built for the road. Built for you. {name} — shop the edit. 🔗 #TheAutodrome",
        "🔧 Serious drivers shop serious gear. Today’s pick: {name}. #TheAutodrome",
    ],
    "fitness": [
        "💪 {name} — the gear that matches your grind. Shop now 🔗 #PeakFit",
        "🔥 No excuses. Just results. {name} at ${price}. Link in bio. #PeakFit",
        "🏋️ Train harder. Recover faster. {name} — shop it. #PeakFit #WorkoutGear",
        "⚡ Elite performance starts with the right equipment. {name} — link in bio. 🔗 #PeakFit",
        "🏆 Your body puts in the work. Give it the best tools. {name}. #PeakFit",
        "💪 {name} — because average gear gets average results. Shop now. #PeakFit #GymLife",
        "🔥 Today’s pick: {name} at ${price}. Add it to your gym bag. 🔗 #PeakFit",
        "🏋️ Built for people who take fitness seriously. {name} — shop the collection. #PeakFit",
        "⚡ The best workouts start before you even hit the gym. {name} — link in bio. #PeakFit",
        "💪 {name} — curated for every level, every goal. Shop now. 🔗 #PeakFit",
    ],
    "travel": [
        "✈️ {name} — pack smart, travel light. Shop now 🔗 #TheEscapist",
        "🌍 Adventure-ready. {name} at ${price}. Link in bio. #TheEscapist #TravelLife",
        "🏖️ Your next trip deserves the right gear. {name} — shop it. #TheEscapist",
        "🧳 The explorers who pack smart, travel better. {name} — link in bio. 🔗 #TheEscapist",
        "✨ {name} — because great travel starts with great prep. Shop now. #TheEscapist",
        "🌍 New in the collection: {name}. Whether you’re near or far, this one’s worth it. #TheEscapist",
        "✈️ Every escape starts here. {name} at ${price}. Shop the edit. 🔗 #TheEscapist",
        "🧳 We scout the best travel gear so you don’t have to. Today: {name}. #TheEscapist",
        "🏖️ Wanderlust approved. {name} — link in bio. #TheEscapist #Wanderlust",
        "🌍 {name} — built for the ones who’d rather explore than stay. Shop now. 🔗 #TheEscapist",
    ],
    "pets": [
        "🐾 {name} — because your pet gives you everything. Give them the best. Shop now 🔗 #PawVault",
        "🐶 Spoil them a little. {name} at ${price}. Link in bio. #PawVault #DogsOfInstagram",
        "🐱 Premium pet care, curated. {name} — shop it. #PawVault #CatsOfInstagram",
        "❤️ Happy pets, happy home. {name} — link in bio. 🔗 #PawVault",
        "🐾 They can’t shop for themselves. You can. {name} — shop now. #PawVault #PetCare",
        "🐶 Today’s pick for your best friend: {name} at ${price}. Shop it. 🔗 #PawVault",
        "🐱 Because they deserve the same quality you do. {name} — link in bio. #PawVault",
        "🐾 The best pet products, all in one place. Today: {name}. Shop now. #PawVault",
        "❤️ {name} — trusted, reviewed, and pet-approved. Shop the full collection. 🔗 #PawVault",
        "🐶 Premium care for every breed, every size. {name} — shop now. #PawVault #PetLovers",
    ],
    "homedecor": [
        "🏡 {name} — understated elegance for every room. Shop now 🔗 #QuietLuxury",
        "✨ Less is more. {name} at ${price}. The minimal luxury edit. #QuietLuxury",
        "🕯️ Create your sanctuary. {name} — link in bio. #QuietLuxury #HomeDecor",
        "🏠 Your home should feel like a retreat. {name} — shop it. #QuietLuxury #InteriorDesign",
        "✨ {name} — refined, intentional, beautiful. Shop now. 🔗 #QuietLuxury",
        "🏡 The details make the space. Today’s pick: {name}. #QuietLuxury #HomeInspo",
        "🕯️ Quiet luxury isn’t a trend — it’s a standard. {name} at ${price}. #QuietLuxury",
        "✨ {name} — because your home deserves the same care you put into yourself. Shop now. #QuietLuxury",
        "🏠 Curated for the ones who live with intention. {name} — link in bio. 🔗 #QuietLuxury",
        "🕯️ {name} — elevate any room, effortlessly. Shop the collection. #QuietLuxury",
    ],
    "skincare": [
        "✨ {name} — your skin deserves a ritual, not just a routine. Shop now 🔗 #GlowProtocol",
        "🌟 Science-backed. Results-driven. {name} at ${price}. Link in bio. #GlowProtocol",
        "💦 Glow from within. {name} — shop it. #GlowProtocol #Skincare",
        "💎 Luxury skincare that actually works. {name} — link in bio. 🔗 #GlowProtocol",
        "✨ Your skin is an investment. {name} — invest right. Shop now. #GlowProtocol",
        "🌟 Today’s protocol pick: {name} at ${price}. Add it to your routine. 🔗 #GlowProtocol",
        "💦 The glow-up starts here. {name} — shop the full routine. #GlowProtocol #SkinCareRoutine",
        "✨ {name} — because healthy skin is always in. Shop now. #GlowProtocol #GlowUp",
        "🌟 Real ingredients. Real results. {name} — link in bio. 🔗 #GlowProtocol",
        "💦 Skincare that speaks for itself. Today: {name}. Shop now. #GlowProtocol #BeautyRoutine",
    ],
    "fragrance": [
        "🌸 {name} — a scent that stays. Shop now 🔗 #EssenceElite",
        "✨ Wear confidence. {name} at ${price}. Link in bio. #EssenceElite #Perfume",
        "🌹 Your signature scent is waiting. {name} — shop it. #EssenceElite",
        "💎 {name} — because how you smell is part of how you’re remembered. Link in bio. 🔗 #EssenceElite",
        "🌸 Premium fragrance, premium impression. {name} — shop now. #EssenceElite #LuxuryFragrance",
        "✨ Today’s pick: {name} at ${price}. Smell like you mean it. 🔗 #EssenceElite",
        "🌹 A great scent is the invisible accessory. {name} — shop the collection. #EssenceElite",
        "💎 {name} — curated for those with a taste for the finer things. Shop now. #EssenceElite",
        "🌸 The right fragrance changes everything. Today: {name}. Link in bio. 🔗 #EssenceElite",
        "✨ {name} — wear it like a second skin. Shop now. #EssenceElite #Fragrance",
    ],
    "realestate": [
        "🏡 {name} — your next investment starts here. Shop now 🔗 #PrimeLandNetwork",
        "💰 Smart investors act early. {name} at ${price}. Link in bio. #PrimeLandNetwork",
        "🔑 {name} — land is the one thing they stopped making. Invest smart. #PrimeLandNetwork",
        "🏘️ {name} — verified listings, real opportunities. Link in bio. 🔗 #PrimeLandNetwork",
        "🏡 Build wealth one property at a time. Today’s pick: {name}. #PrimeLandNetwork",
        "💰 {name} — the right tools for the right investment. Shop now. 🔗 #PrimeLandNetwork",
        "🔑 The best investments aren’t on the stock market. {name} — explore it. #PrimeLandNetwork",
        "🏘️ Your empire starts with the right land. Today: {name}. Link in bio. 🔗 #PrimeLandNetwork",
        "🏡 {name} — built for those who think long-term. Shop the edit. #PrimeLandNetwork",
        "💰 Property is power. {name} — take the first step. Link in bio. 🔗 #PrimeLandNetwork",
    ],
    "tech": [
        "📱 {name} — the best tech, no noise. Shop now 🔗 #TechScoutHQ",
        "⚡ Smarter tools for smarter people. {name} at ${price}. Link in bio. #TechScoutHQ",
        "🔬 {name} — reviewed, curated, linked. Shop it. #TechScoutHQ #Gadgets",
        "💻 Innovation that fits in your hands. {name} — link in bio. 🔗 #TechScoutHQ",
        "⚡ Level up your tech game. Today’s pick: {name}. #TechScoutHQ #TechGadgets",
        "📱 {name} at ${price} — worth every dollar. Shop now. 🔗 #TechScoutHQ",
        "🔬 We scout so you don’t have to. {name} — shop the collection. #TechScoutHQ",
        "💻 {name} — because great tech makes everything easier. Link in bio. 🔗 #TechScoutHQ",
        "⚡ The gadget your setup is missing. {name} — shop now. #TechScoutHQ #Technology",
        "📱 Today from the Scout: {name} at ${price}. Don’t sleep on this one. 🔗 #TechScoutHQ",
    ],
    "anime": [
        "{name} just dropped. The culture never waits. Shop now #DreamingAnime #Anime",
        "Wear your passion. {name} — shop the collection. #DreamingAnime #AnimeLife",
        "For the ones who live and breathe it. {name} at ${price}. Shop now #DreamingAnime",
        "New in the collection: {name}. Link in bio #DreamingAnime #AnimeMerch",
        "{name} — because the culture deserves representation. Shop it. #DreamingAnime #OtakuLife",
        "The grail is real. {name} — shop before it’s gone. #DreamingAnime",
        "{name} — carry the culture everywhere you go. Shop now. #DreamingAnime #Anime",
        "Built for fans, by fans. Today’s pick: {name}. Link in bio #DreamingAnime",
        "{name} at ${price}. The collection grows. Shop the edit. #DreamingAnime #AnimeFan",
        "Your collection isn’t complete. {name} just changed that. Shop now. #DreamingAnime",
    ],
    "selfcare": [
        "🌼 {name} — invest in yourself daily. Shop now 🔗 #Shelfly",
        "🌸 You deserve to feel your best. {name} at ${price}. Link in bio. #Shelfly",
        "✨ Self-care isn’t selfish — it’s essential. {name} — shop it. #Shelfly #SelfCare",
        "💪 {name} — glow up, inside and out. Link in bio. 🔗 #Shelfly",
        "🌼 The best version of you starts here. Today’s pick: {name}. #Shelfly",
        "🌸 {name} at ${price} — worth it. Every single time. Shop now. 🔗 #Shelfly",
        "✨ When you take care of yourself, everything else follows. {name} — link in bio. #Shelfly",
        "💪 {name} — curated for the ones who prioritise themselves. Shop now. #Shelfly",
        "🌼 Small rituals. Big results. Today: {name}. Link in bio. 🔗 #Shelfly #WellBeing",
        "🌸 {name} — because you’re worth the investment. Shop the collection. #Shelfly",
    ],
    "workspace": [
        "🖥️ {name} — because your environment shapes your output. Shop now 🔗 #Deskwell",
        "⚡ Build the workspace of your dreams. {name} at ${price}. Link in bio. #Deskwell",
        "💼 {name} — work smarter, look better doing it. Shop it. #Deskwell #HomeOffice",
        "🖥️ The right setup changes everything. {name} — link in bio. 🔗 #Deskwell",
        "⚡ Upgrade your desk. Upgrade your output. Today: {name}. #Deskwell #DeskSetup",
        "💼 {name} at ${price} — the piece your setup was missing. Shop now. 🔗 #Deskwell",
        "🖥️ {name} — premium workspace gear for people who take their work seriously. #Deskwell",
        "⚡ Less clutter. More focus. {name} — shop the edit. Link in bio. 🔗 #Deskwell",
        "💼 Great work starts with a great space. Today’s pick: {name}. #Deskwell #WorkFromHome",
        "🖥️ {name} — your desk should inspire you. Shop now. 🔗 #Deskwell",
    ],
    "food": [
        "🍴 {name} — Caribbean flavours, no compromise. Shop now 🔗 #Pantriq",
        "🌶️ Cook with confidence. {name} at ${price}. Link in bio. #Pantriq #CaribbeanFood",
        "🍚 {name} — from our kitchen to yours. Shop it. #Pantriq #HomeCooking",
        "🍴 Your kitchen deserves the best. {name} — link in bio. 🔗 #Pantriq",
        "🌶️ Good food starts with good ingredients. Today: {name}. #Pantriq #FoodLovers",
        "🍚 {name} at ${price} — the pantry essential you didn’t know you needed. Shop now. 🔗 #Pantriq",
        "🍴 {name} — because Caribbean cooking deserves Caribbean-quality tools. #Pantriq",
        "🌶️ Stock the pantry right. {name} — shop the collection. Link in bio. 🔗 #Pantriq",
        "🍚 Today’s kitchen pick: {name}. Cook better, eat better. #Pantriq #CaribbeanKitchen",
        "🍴 {name} — the staple your kitchen has been missing. Shop now. 🔗 #Pantriq",
    ],
    "purses_bags": [
        "👜 {name} — the bag that says everything without a word. Shop now 🔗 #CoutureGallery",
        "💎 A great bag is an investment. {name} at ${price}. Link in bio. #CoutureGallery",
        "✨ {name} — from totes to clutches, the edit for those who know. #CoutureGallery #LuxuryBags",
        "👛 New arrivals: {name} — shop now before it’s gone. 🔗 #CoutureGallery",
        "👜 {name} — carry luxury everywhere you go. Shop the collection. #CoutureGallery",
        "💎 Designer curation done right. Today: {name} at ${price}. Link in bio. 🔗 #CoutureGallery",
        "✨ {name} — because the right bag completes every look. Shop now. #CoutureGallery #DesignerBags",
        "👛 {name} — timeless pieces for the woman who knows her worth. 🔗 #CoutureGallery",
        "👜 Today’s pick: {name}. The investment your wardrobe needs. #CoutureGallery #Handbags",
        "✨ {name} at ${price} — curated luxury, real prices. Shop now. 🔗 #CoutureGallery",
    ],
}


# Editorial/niche tip content — rotated daily, no product name/price
# Used for text posts to provide VALUE, not just product dumps
def _load_niche_tips():
    try:
        # Use absolute path relative to this script so it works from any working directory
        import os as _os
        _script_dir = _os.path.dirname(_os.path.abspath(__file__))
        _tips_path = _os.path.join(_script_dir, "niche_tips.json")
        # Fallback: also try cwd
        if not _os.path.exists(_tips_path):
            _tips_path = "niche_tips.json"
        with open(_tips_path) as f:
            return json.load(f)
    except Exception:
        return {}
NICHE_TIPS = _load_niche_tips()


# ═══════════════════════════════════════════════════════════════════════════════
# PRISCA DEZIGNS — 4-POST MARKETING SYSTEM
# Post type 1 (photo)  : Promo image for a sub-brand (rotating daily)
# Post type 2 (text)   : Pain-point hook for a sub-brand
# Post type 3 (text)   : Social proof / result for a sub-brand
# Post type 4 (text)   : Direct CTA — free digital audit
# The sub-brand rotates every day: Vela→Writx→Karjov→Orbyt→Clasp→Clarev→repeat
# ═══════════════════════════════════════════════════════════════════════════════

PD_SUB_BRANDS = ["Vela", "Writx", "Karjov", "Orbyt", "Clasp"]  # Clarev excluded — still building

# Promo image Drive direct-download links (one per sub-brand)
PD_PROMO_IMAGES = {
    "Vela":   "https://drive.google.com/uc?export=download&id=1lnUdo9Z46YGcXFtNK9PC82qjvCxoYs1N",
    "Writx":  "https://drive.google.com/uc?export=download&id=1t-UlkcuAwEsgy0OqPdgAW1bgyFJwaMaM",
    "Karjov": "https://drive.google.com/uc?export=download&id=1gwMrm5S4kyBaPTsjq5l7tMWe8XKg0WKz",
    "Orbyt":  "https://drive.google.com/uc?export=download&id=13ME0ePC_91ub1c2r1netfXhuooQJ1OTA",
    "Clasp":  "https://drive.google.com/uc?export=download&id=1Rh3Hrxr-6Ezzelogjtg6KEnyBXmWXD5Q",
    "Clarev": "https://drive.google.com/uc?export=download&id=1Rh3Hrxr-6Ezzelogjtg6KEnyBXmWXD5Q",  # fallback to Clasp until Clarev image is made
}

PD_PAIN_POINTS = {
    "Vela": [
        "Your website is your 24/7 salesperson. If it is slow, outdated or hard to navigate, it is losing you clients right now. Vela builds professional websites that convert — fast, clean, and built for your market. Link in bio. #PriscaDezigns #VelaWeb",
        "Most small business websites look like they were built in 2015. Your competition upgraded. Have you? Vela delivers modern, high-converting websites — ready in days, not months. #PriscaDezigns #WebDesign",
        "If a potential client can not find you online, they find your competitor instead. Vela puts you front and centre — with a website built to turn visitors into paying clients. #PriscaDezigns #VelaWeb",
    ],
    "Writx": [
        "You spend hours writing captions, emails, and ad copy that nobody reads. Writx does it in 60 seconds — high-converting copy for every platform, every time. #PriscaDezigns #WritxCopy",
        "Bad copy costs you clients. Good copy makes them buy. Writx writes the words that make your brand impossible to ignore — ads, emails, captions, landing pages. Link in bio. #PriscaDezigns #Copywriting",
        "The difference between a post that gets ignored and one that gets clicks? The words. Writx writes copy that sells — delivered in 24 hours. #PriscaDezigns #WritxCopy",
    ],
    "Karjov": [
        "Every WhatsApp message that goes unanswered for more than 5 minutes is a lead you are losing. Karjov replies instantly, 24/7 — so you never miss a client again. #PriscaDezigns #KarjovAI",
        "You cannot be online 24 hours a day. Karjov can. WhatsApp automation that replies to leads, qualifies prospects, and books appointments while you sleep. #PriscaDezigns #WhatsAppAutomation",
        "Your competitors are responding to clients in seconds. If you are still replying manually on WhatsApp, you are already behind. Karjov fixes that. #PriscaDezigns #KarjovAI",
    ],
    "Orbyt": [
        "Your business idea deserves more than a basic website. Orbyt designs and builds mobile apps — the kind users actually open every day. From concept to App Store in 30 days. #PriscaDezigns #OrbytApp",
        "An app puts your brand in your client's pocket. Orbyt builds mobile apps for businesses ready to go beyond social media — clean, fast, and built to scale. #PriscaDezigns #MobileApp",
        "The brands people stay loyal to are the ones on their home screen. Orbyt builds the app that keeps your clients coming back. #PriscaDezigns #OrbytApp",
    ],
    "Clasp": [
        "You are still copying data manually into spreadsheets. Clasp automates the whole thing — raw data in, clean report out, zero manual work. #PriscaDezigns #ClaspApp",
        "Spreadsheet chaos is costing you hours every week. Clasp turns messy data into clean, automated reports — so you can focus on running your business. #PriscaDezigns #ClaspApp",
        "If you are spending more than 30 minutes a week on spreadsheets, Clasp will give you that time back. Automated reports, zero formulas. #PriscaDezigns #ClaspApp",
    ],
    "Clarev": [
        "Your client portal should not be a WhatsApp thread. Clarev gives your clients a professional dashboard — projects, invoices, files, and updates in one clean space. #PriscaDezigns #Clarev",
        "Professional service businesses run on trust. Clarev gives your clients a branded portal where they can track everything — no more chasing you on WhatsApp. #PriscaDezigns #Clarev",
        "Clients who can see their project progress in real time are happier clients. Clarev makes that happen. #PriscaDezigns #Clarev",
    ],
}

PD_SOCIAL_PROOF = {
    "Vela": [
        "A client came to us with zero online presence. Within 7 days, Vela had their website live — and they booked 3 new clients in the first week from Google alone. Your website can do the same. Link in bio. #PriscaDezigns #VelaWeb",
        "One of our Vela clients increased their enquiry rate by 3x within a month of launching their new site. Same business. Same offer. Better website. That is the difference. #PriscaDezigns",
        "We built a Vela site for a local service business and within 2 weeks they stopped relying on WhatsApp to get new clients. The website does it for them now. #PriscaDezigns #WebDesign",
    ],
    "Writx": [
        "A client's Facebook ad was getting zero clicks. We rewrote the copy with Writx. The next run? 4x more click-throughs, same budget. Words are the most underrated growth tool. #PriscaDezigns #WritxCopy",
        "One email subject line rewritten by Writx took a client's open rate from 18% to 41%. The product did not change. The words did. #PriscaDezigns #Copywriting",
        "A boutique client was posting daily with barely any engagement. We rewrote their captions with Writx. Next post hit 3x their usual reach. Copy is everything. #PriscaDezigns",
    ],
    "Karjov": [
        "A client was losing leads every night because nobody was available to reply on WhatsApp after 6pm. Karjov now handles every enquiry instantly — they have not missed a lead since. #PriscaDezigns #KarjovAI",
        "One of our Karjov clients went from manually handling 50+ WhatsApp messages a day to zero — the automation qualifies leads, answers FAQs, and books calls without them lifting a finger. #PriscaDezigns",
        "A beauty business using Karjov booked 12 new appointments in the first weekend — all through automated WhatsApp replies while the owner was off. That is what automation does. #PriscaDezigns",
    ],
    "Orbyt": [
        "We built an Orbyt app for a fitness brand and their client retention jumped 40% — because clients had a reason to open the app every day. A website visits. An app stays. #PriscaDezigns",
        "One of our Orbyt clients went from managing everything through WhatsApp to having a fully branded app with bookings, payments, and a client feed. Same business. Completely different experience. #PriscaDezigns",
        "An Orbyt app we built for a local service brand got 500 downloads in 30 days with zero paid ads. The product was great — we just gave it the right platform. #PriscaDezigns",
    ],
    "Clasp": [
        "A client was spending 4 hours every Monday building weekly reports from scratch. Clasp automated the whole thing. Now it takes 30 seconds. Same data, zero effort. #PriscaDezigns #ClaspApp",
        "One of our Clasp clients eliminated three manual spreadsheets and the errors that came with them. Clean data, automated weekly — and they have not touched a formula since. #PriscaDezigns",
        "A business owner told us they used to dread Mondays because of report prep. After Clasp, they said it is the easiest part of their week. That is what automation should feel like. #PriscaDezigns",
    ],
    "Clarev": [
        "A Clarev client told us their clients stopped calling to ask for project updates the week after they launched the portal. Clients had everything they needed in one place. #PriscaDezigns",
        "One agency using Clarev reduced their back-and-forth client messages by 70% in the first month. Fewer questions, happier clients, more time to do actual work. #PriscaDezigns",
        "A consultant we set up on Clarev said it made their business feel 10x more professional overnight. Same service, completely different client experience. #PriscaDezigns",
    ],
}

PD_AUDIT_CTAS = [
    "We offer a free digital audit for businesses ready to grow. No cost. No commitment. Just an honest look at what is holding your online presence back — and what we would do to fix it. DM us or tap the link in bio. #PriscaDezigns #FreeAudit",
    "Not sure where your business stands online? We will tell you — for free. Our digital audit covers your website, social presence, and automation gaps. Book yours today. #PriscaDezigns",
    "The brands winning online right now are not the biggest ones. They are the ones with the right tools. Start with a free audit and find out exactly what yours needs. Link in bio. #PriscaDezigns",
    "We work with businesses across every industry to build websites, automate WhatsApp, write copy that converts, and launch apps. It all starts with a free audit. DM us. #PriscaDezigns",
    "Free digital audit — we look at your website, your WhatsApp response rate, your content, and your online visibility. Then we tell you exactly what to fix. No charge. No catch. #PriscaDezigns",
    "If your business is not growing as fast as it should online, the answer is usually one of three things: no website, no automation, or no copy. We fix all three. Free audit — link in bio. #PriscaDezigns",
]

def get_pd_sub_brand_today():
    """Return today's featured sub-brand (rotates daily through 6 brands)."""
    from datetime import date
    idx = date.today().timetuple().tm_yday % len(PD_SUB_BRANDS)
    return PD_SUB_BRANDS[idx]

def get_pd_post(slot):
    """
    Return (text, photo_url) for a Prisca Dezigns post.
    slot: 1=promo image, 2=pain point, 3=social proof, 4=audit CTA
    """
    from datetime import date as _d
    day = _d.today().timetuple().tm_yday
    sub = get_pd_sub_brand_today()

    intros = {
        "Vela":   ("Your website. Built to convert.\n\n"
                   "Vela builds professional websites that convert visitors into clients.\n\n"
                   "Link in bio: priscadezigns.org/vela\n#PriscaDezigns #VelaWeb #WebDesign"),
        "Writx":  ("Words that make people buy.\n\n"
                   "Writx delivers high-converting copy for ads, emails, captions and landing pages in 24h.\n\n"
                   "Link in bio: priscadezigns.org/writx\n#PriscaDezigns #WritxCopy #Copywriting"),
        "Karjov": ("Reply fast. Convert more.\n\n"
                   "Karjov automates your WhatsApp. Instant replies, lead qualification, booking. 24/7.\n\n"
                   "Link in bio: priscadezigns.org/karjov\n#PriscaDezigns #KarjovAI #WhatsAppAutomation"),
        "Orbyt":  ("Your app idea. Launched.\n\n"
                   "Orbyt designs and builds mobile apps from concept to App Store in 30 days.\n\n"
                   "Link in bio: priscadezigns.org/orbyt\n#PriscaDezigns #OrbytApp #MobileApp"),
        "Clasp":  ("Raw data in. Clean sheets out.\n\n"
                   "Clasp automates your spreadsheets. No formulas, no manual work, just results.\n\n"
                   "Link in bio: priscadezigns.org/clasp\n#PriscaDezigns #ClaspApp #Automation"),
        "Clarev": ("Your client portal. Done properly.\n\n"
                   "Clarev gives clients a branded dashboard with projects, invoices, and updates.\n\n"
                   "Link in bio: priscadezigns.org/clarev\n#PriscaDezigns #Clarev #ClientPortal"),
    }

    if slot == 1:
        img_url = PD_PROMO_IMAGES.get(sub, PD_PROMO_IMAGES["Clasp"])
        txt = intros.get(sub, intros["Clasp"])
        return txt, img_url
    elif slot == 2:
        options = PD_PAIN_POINTS.get(sub, PD_PAIN_POINTS["Vela"])
        return options[day % len(options)], None
    elif slot == 3:
        options = PD_SOCIAL_PROOF.get(sub, PD_SOCIAL_PROOF["Vela"])
        return options[day % len(options)], None
    elif slot == 4:
        return PD_AUDIT_CTAS[day % len(PD_AUDIT_CTAS)], None
    return "Check out our latest services at priscadezigns.org #PriscaDezigns", None



def get_caption(niche, product=None):
    """Return a caption rotated by day-of-year so it never repeats within 10 days.
    Injects {name} and {price} from the product dict if provided."""
    from datetime import date
    caps = CAPTIONS.get(niche, ["Check out our latest pick — link in bio 🔗"])
    idx = date.today().timetuple().tm_yday % len(caps)
    cap = caps[idx]
    if product:
        name  = product.get("name", "").strip()
        price = product.get("price", "")
        # Truncate very long product names
        if len(name) > 60:
            name = name[:57] + "..."
        cap = cap.replace("{name}", name).replace("{price}", str(price))
    else:
        # Strip placeholders if no product passed
        import re as _re
        cap = _re.sub(r"\{name\}", "our latest pick", cap)
        cap = _re.sub(r"\\${price}", "", cap).strip()
    return cap

def post_to_facebook(page_id, token, message, photo_url=None, video_path=None):
    """Post to a Facebook page. Returns dict with 'id' on success or 'error' on failure."""
    base = "https://graph.facebook.com/v19.0"
    if photo_url:
        url = f"{base}/{page_id}/photos"
        payload = urllib.parse.urlencode({"url": photo_url, "caption": message, "access_token": token}).encode()
    else:
        url = f"{base}/{page_id}/feed"
        payload = urllib.parse.urlencode({"message": message, "access_token": token}).encode()
    try:
        req = urllib.request.Request(url, data=payload, method="POST")
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        try:
            return json.loads(body)
        except Exception:
            return {"error": {"message": body[:200]}}
    except Exception as ex:
        return {"error": {"message": str(ex)}}


def post_to_instagram(ig_id, token, caption, image_url):
    """Post a photo to Instagram via Graph API. Returns dict with 'id' on success."""
    base = "https://graph.facebook.com/v19.0"
    # Step 1: create media container
    container_url = f"{base}/{ig_id}/media"
    payload = urllib.parse.urlencode({
        "image_url": image_url,
        "caption": caption,
        "access_token": token
    }).encode()
    try:
        req = urllib.request.Request(container_url, data=payload, method="POST")
        with urllib.request.urlopen(req, timeout=30) as resp:
            container = json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        try:
            return json.loads(body)
        except Exception:
            return {"error": {"message": body[:200]}}
    except Exception as ex:
        return {"error": {"message": str(ex)}}

    if "id" not in container:
        return container

    # Step 2: publish container
    publish_url = f"{base}/{ig_id}/media_publish"
    pub_payload = urllib.parse.urlencode({
        "creation_id": container["id"],
        "access_token": token
    }).encode()
    try:
        req2 = urllib.request.Request(publish_url, data=pub_payload, method="POST")
        with urllib.request.urlopen(req2, timeout=30) as resp2:
            return json.loads(resp2.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        try:
            return json.loads(body)
        except Exception:
            return {"error": {"message": body[:200]}}
    except Exception as ex:
        return {"error": {"message": str(ex)}}


def get_affiliate_link(aff_tag, keyword):
    query = urllib.parse.quote(keyword)
    return f"https://www.amazon.com/s?k={query}&tag={aff_tag}"

def get_image_ratio(url):
    """Return width/height ratio for a JPEG/PNG, or None on failure. Reads minimal bytes."""
    try:
        import struct
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=8) as r:
            header = r.read(512)
        # JPEG: find SOF0/SOF2 marker (FF C0 / FF C2)
        for i in range(len(header) - 8):
            if header[i] == 0xFF and header[i+1] in (0xC0, 0xC2):
                h = struct.unpack(">H", header[i+5:i+7])[0]
                w = struct.unpack(">H", header[i+7:i+9])[0]
                if h > 0:
                    return w / h
        # PNG: 8-byte sig + IHDR (4+4+4+4=16 bytes)
        if header[:8] == b'\x89PNG\r\n\x1a\n':
            w = struct.unpack(">I", header[16:20])[0]
            h = struct.unpack(">I", header[20:24])[0]
            if h > 0:
                return w / h
    except Exception:
        pass
    return None

def make_square_crop(local_path):
    """Crop image to square (center crop) and save as _ig.jpg. Returns new local path or None."""
    try:
        from PIL import Image
        import io
        img = Image.open(local_path).convert("RGB")
        w, h = img.size
        s = min(w, h)
        left = (w - s) // 2
        top = (h - s) // 2
        cropped = img.crop((left, top, left + s, top + s))
        out_path = local_path.replace(".jpg", "_ig.jpg")
        cropped.save(out_path, "JPEG", quality=85)
        return out_path
    except Exception:
        return None

def is_safe_image_url(url):
    """Reject YouTube thumbnails and other non-original image sources."""
    if not url:
        return False
    blocked = ['ytimg.com', 'youtube.com', 'youtu.be', 'emg1', 'external-ord']
    return not any(b in url for b in blocked)

def get_product_for_brand(brand_name, advance_photo=True):
    """Return (product_dict, image_url) for the brand using the photo rotation system.
    - Product cycles on a N-day basis (N = products in niche)
    - Photo for each product cycles through all available Amazon images, one per cycle
    - advance_photo=True increments the photo counter (call once per actual post)
    """
    from datetime import date
    PHOTOS_FILE = "niche_products_photos.json"
    slug = BRAND_TO_SLUG.get(brand_name, "")
    if not slug:
        slug = brand_name.lower().replace(" ", "-").replace(".", "").replace("&", "and")

    try:
        with open(PHOTOS_FILE) as f:
            photos_data = json.load(f)
    except Exception as e:
        return None  # photo rotation file not present — skip silently

    products = photos_data.get(slug, [])
    if not products:
        return None

    # Which product is up today
    day_num = date.today().timetuple().tm_yday
    product_idx = day_num % len(products)
    product = products[product_idx]

    # Which photo — stateless: driven by day + hour so it varies each post slot
    from datetime import datetime as _dt
    images = product.get("images", [])

    if not images:
        return product  # fallback — return product without image override

    hour_slot = _dt.now().hour
    photo_idx = (day_num * 7 + hour_slot) % len(images)
    image_url = images[photo_idx]
    # advance_photo param kept for API compatibility but no longer writes state

    # Return a product dict compatible with existing code
    result = dict(product)
    result["image"] = image_url
    return result

def get_ai_image_url(niche_keyword, style="product"):
    """DEPRECATED fallback — only used if niche_products.json is unavailable.
    Tries to return any product image for the niche rather than Picsum."""
    NICHE_PRODUCTS_FILE = "niche_products.json"
    try:
        with open(NICHE_PRODUCTS_FILE) as f:
            all_products = json.load(f)
        # Map niche keyword to a slug
        slug_map = {
            "eco": "verdant-co", "watches": "the-watch-list", "sneakers": "sole-prestige",
            "gaming": "atelier-gaming", "fashion": "couture-gallery", "fragrance": "essence-elite",
            "skincare": "glow-protocol", "fitness": "peak-fit", "anime": "dreaming-anime",
            "travel": "the-escapist", "pets": "paw-vault", "luxury": "quiet-luxury",
            "food": "pantriq", "real estate": "prime-land-network", "tech": "tech-scout",
            "workspace": "deskwell", "automotive": "the-autodrome", "selfcare": "shelfly",
        }
        slug = slug_map.get(niche_keyword.lower(), "")
        if slug:
            from datetime import date
            products = [p for p in all_products.get(slug, []) if p.get("image")]
            if products:
                idx = date.today().timetuple().tm_yday % len(products)
                return products[idx]["image"]
    except Exception:
        pass
    return ""

def find_ig_safe_image(brand_name, preferred_url):
    """Return the real product image for this brand (day-rotated from niche_products.json).
    Falls back to preferred_url only if no scraped products exist.
    Zero Picsum, zero stock photos — always niche-specific real product images.
    GUARD: never use a non-Amazon image for affiliate/niche brands."""
    # Always try to get a real product image first
    product = get_product_for_brand(brand_name)
    if product and product.get("image"):
        img = product["image"]
        # Hard guard: must be an Amazon image for niche brands
        if "amazon.com" in img or "media-amazon" in img:
            return img

    # Fall back to preferred_url only if it's a real Amazon product image
    if preferred_url and preferred_url.startswith("http"):
        # HARD GUARD: only allow Amazon product images for niche pages
        if "amazon.com" in preferred_url or "media-amazon" in preferred_url:
            try:
                ratio = get_image_ratio(preferred_url)
                if ratio and 0.5 <= ratio <= 1.91:
                    return preferred_url
            except Exception:
                pass
            return preferred_url
        # Non-Amazon URLs are blocked for niche/affiliate brands
        print(f"[GUARD] Blocked non-Amazon image for {brand_name}: {preferred_url[:60]}")
        return ""

    return ""

def get_dreaming_anime_video():
    """Pull next video from Dreaming Anime Google Drive folder.
    Drive folder ID: 1jRm7LZV7H_ZMFYDThO-zsNakAL75nWVO
    Downloads the next unposted video to local cache and returns path.
    Tracks which videos have been posted in dreaming_anime_posted.json.
    """
    import subprocess

    DRIVE_FOLDER = "1jRm7LZV7H_ZMFYDThO-zsNakAL75nWVO"
    POSTED_LOG = "dreaming_anime_posted.json"
    CACHE_DIR = "dreaming_anime/cache"
    os.makedirs(CACHE_DIR, exist_ok=True)

    # Load posted log
    try:
        with open(POSTED_LOG) as f:
            posted = json.load(f)
    except Exception:
        posted = []

    # List videos in Drive folder
    try:
        result = subprocess.run(
            ["gog", "drive", "ls", "--parent", DRIVE_FOLDER, "--max", "50", "--json"],
            capture_output=True, text=True, timeout=15
        )
        files = json.loads(result.stdout)
        if isinstance(files, dict):
            files = files.get("files", files.get("data", []))
        videos = [f for f in files if isinstance(f, dict) and f.get("name", "").endswith(".mp4") and f.get("id") not in posted]
    except Exception:
        videos = []

    if not videos:
        return None

    # Pick next video (oldest first)
    video = videos[0]
    file_id = video["id"]
    file_name = video["name"].split("/")[-1]  # handle full path names
    local_path = os.path.join(CACHE_DIR, file_name)

    # Download if not already cached
    if not os.path.exists(local_path):
        try:
            dl = subprocess.run(
                ["gog", "drive", "download", file_id, "--output", local_path],
                capture_output=True, text=True, timeout=120
            )
            if dl.returncode != 0:
                return None
        except Exception:
            return None

    # Mark as posted
    posted.append(file_id)
    with open(POSTED_LOG, "w") as f:
        json.dump(posted, f)

    return local_path

def get_prisca_brand_image():
    """Return a purple-branded Prisca Dezigns image URL.
    Uses brand-consistent purple gradient image hosted reliably."""
    # Prisca Dezigns brand purple images — curated from reliable sources
    purple_images = [
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=1080",
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=1080",
        "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?w=1080",
        "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?w=1080",
        "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?w=1080",
    ]
    import random
    return random.choice(purple_images)


def run_post(brand_name, post_type):
    """Execute one post for a brand."""
    brand = BRANDS.get(brand_name) or BRANDS.get(brand_name.strip())
    if not brand:
        # Try case-insensitive match
        brand = next((v for k, v in BRANDS.items() if k.strip().lower() == brand_name.strip().lower()), None)
    if not brand:
        return f"Brand not found: {brand_name}"

    page_id = brand["id"]
    token = brand["token"]
    niche = brand["niche"]
    tag = brand["tag"]
    aff = brand["aff"]

    if not page_id or not token:
        return f"Skipping {brand_name} — no page token"

    # ── PRISCA DEZIGNS OVERRIDE — 4-slot marketing system ──────────────────
    if "prisca" in brand_name.lower():
        # Map post_type to slot: text=pain point or social proof or CTA, photo=promo image
        from datetime import date as _date
        day = _date.today().timetuple().tm_yday
        hour = datetime.now().hour
        # Slot assignment by time of day (4 posts/day):
        # 08:00 → slot 1 (promo image)
        # 11:00 → slot 2 (pain point)
        # 14:00 → slot 3 (social proof)
        # 19:00 → slot 4 (audit CTA)
        if post_type == "photo" or hour < 10:
            slot = 1
        elif hour < 13:
            slot = 2
        elif hour < 17:
            slot = 3
        else:
            slot = 4

        pd_text, pd_image = get_pd_post(slot)
        if pd_image:
            result = post_to_facebook(page_id, token, pd_text, photo_url=pd_image)
        else:
            result = post_to_facebook(page_id, token, pd_text)
        status = "✅" if "id" in result else "❌"
        sub = get_pd_sub_brand_today()
        return f"{status} Prisca Dezigns [slot {slot} — {sub}] FB:{result.get('id', result.get('error','?'))}"
    # ── END PRISCA DEZIGNS OVERRIDE ─────────────────────────────────────────

    # Get today's product for this brand from the live site (niche_products.json)
    product_used = get_product_for_brand(brand_name)
    if product_used:
        aff_link  = product_used.get("link") or get_affiliate_link(aff, niche)
        photo_url = product_used.get("image", "")
    else:
        aff_link  = get_affiliate_link(aff, niche)
        photo_url = ""

    caption   = get_caption(niche, product_used)
    ig_result = ""  # populated for photo posts that hit Instagram

    if post_type == "text":
        # Text posts use NICHE_TIPS (editorial value content, not product promotion)
        from datetime import date as _date
        tips = NICHE_TIPS.get(niche, NICHE_TIPS.get("eco", ["Follow for daily niche content."]))
        tip_idx = _date.today().timetuple().tm_yday % len(tips)
        # Rotate through different tips for each of the 3 text posts per day
        hour_offset = datetime.now().hour // 4  # shifts tip index by time of day
        tip_text = tips[(tip_idx + hour_offset) % len(tips)]
        result = post_to_facebook(page_id, token, tip_text)

    elif post_type == "photo":
        # photo_url already set above from the real product image
        # DREAMING ANIME — override: try video first, then anime merch product image
        if "dreaming" in brand_name.lower() or "anime" in brand_name.lower():
            video_path = get_dreaming_anime_video()
            if video_path:
                # Post video to Facebook
                result = post_to_facebook(page_id, token, caption, video_path=video_path)
                # Post as Reel to Instagram
                ig_id = IG_IDS.get(brand_name) or next(
                    (v for k, v in IG_IDS.items() if k.strip() == brand_name.strip()), None
                )
                if ig_id:
                    reel_result = post_reel_to_instagram(ig_id, token, video_path, caption)
                    ig_result = f" | IG Reel={'✅' if 'id' in reel_result else '❌ '+str(reel_result.get('error','?'))[:60]}"
                else:
                    ig_result = " | IG=⏭️ no ig_id"
                return f"{'✅' if 'id' in result else '❌'} {brand_name} [video] FB:{result.get('id', result.get('error','?'))}{ig_result}"
            # No video available — fall through to product image post

        # PRISCA DEZIGNS — override: purple brand image
        if "prisca" in brand_name.lower():
            photo_url = get_prisca_brand_image()

        result = post_to_facebook(page_id, token, caption, photo_url=photo_url)

        # Also post to Instagram — find a product image with valid aspect ratio (0.8–1.91)
        ig_id = IG_IDS.get(brand_name) or next(
            (v for k, v in IG_IDS.items() if k.strip() == brand_name.strip()), None
        )
        if ig_id:
            ig_photo_url = find_ig_safe_image(brand_name, photo_url)
            if ig_photo_url:
                ir = post_to_instagram(ig_id, token, caption, ig_photo_url)
                ig_result = f" | IG={'✅' if 'id' in ir else '❌ '+str(ir.get('error','?'))[:80]}"
            else:
                ig_result = " | IG=⏭️ no valid ratio image"

        # Sync to niche page immediately after posting
        if product_used and "id" in result:
            slug = BRAND_TO_SLUG.get(brand_name, "")
            if slug:
                add_product_to_niche_page(slug, product_used, deploy=True)

    elif post_type == "video":
        # Video post — for now post as text with video emoji (real video upload needs file)
        video_caption = (
            f"Watch this and tell us what you think!\n\n"
            f"{caption}\n\n"
            f"Shop now: {aff_link}\n\n"
            f"#{''.join(tag.split())} #Reels #Video"
        )
        result = post_to_facebook(page_id, token, video_caption)
    else:
        return f"❌ {brand_name} — unknown post_type: {post_type}"

    if "id" in result:
        return f"✅ {brand_name} [{post_type}] FB:{result['id']}{ig_result}"
    else:
        return f"❌ {brand_name} [{post_type}] FAILED — {result.get('error','unknown')}"

def purge_duplicate_posts():
    """Scan all brand FB pages for duplicate posts within the last 2 hours.
    Deletes the newer duplicate automatically. Logs every deletion.
    Called at the END of every posting session as a safety sweep."""
    import time as _t
    from datetime import datetime, timedelta, timezone

    deleted_total = 0
    cutoff = datetime.now(timezone.utc) - timedelta(hours=2)

    for brand_name, brand in BRANDS.items():
        page_id = brand.get("id")
        token   = brand.get("token")
        if not page_id or not token:
            continue
        try:
            import urllib.request as _ur, urllib.parse as _up
            params = _up.urlencode({
                "fields": "id,message,created_time",
                "limit": "15",
                "access_token": token
            })
            url = f"https://graph.facebook.com/v19.0/{page_id}/posts?{params}"
            with _ur.urlopen(_ur.Request(url, headers={"User-Agent":"Mozilla/5.0"}), timeout=10) as r:
                posts = json.loads(r.read()).get("data", [])
        except Exception:
            continue

        seen = {}
        for post in posts:
            # Only check posts from the last 2 hours
            try:
                created = datetime.fromisoformat(post["created_time"].replace("Z", "+00:00"))
            except Exception:
                continue
            if created < cutoff:
                continue

            key = (post.get("message") or "")[:80].strip()
            pid = post["id"]
            if key in seen:
                # Duplicate found — delete the newer one (current iteration)
                try:
                    del_params = _up.urlencode({"access_token": token})
                    del_req = _ur.Request(
                        f"https://graph.facebook.com/v19.0/{pid}",
                        method="DELETE",
                        headers={"User-Agent":"Mozilla/5.0"}
                    )
                    del_req.full_url = f"https://graph.facebook.com/v19.0/{pid}?{del_params}"
                    with _ur.urlopen(del_req, timeout=10) as dr:
                        result = json.loads(dr.read())
                    if result.get("success"):
                        deleted_total += 1
                        print(f"[DEDUP-SWEEP] Deleted duplicate on {brand_name}: {pid}")
                except Exception as e:
                    print(f"[DEDUP-SWEEP] Failed to delete {pid} on {brand_name}: {e}")
                _t.sleep(0.3)
            else:
                seen[key] = pid

    if deleted_total:
        print(f"[DEDUP-SWEEP] Total duplicates deleted: {deleted_total}")
    else:
        print(f"[DEDUP-SWEEP] No duplicates found.")
    return deleted_total


def run_all(post_type):
    """Post to all brands for a given post type slot."""
    results = []
    for brand_name, data in BRANDS.items():
        if not data["id"]:
            results.append(f"⏭️ {brand_name} — no FB page yet")
            continue
        result = run_post(brand_name, post_type)
        results.append(result)
        print(result)
    # Safety sweep — purge any duplicates that slipped through
    purge_duplicate_posts()
    return results

def run_group(post_type, group_index):
    """Post to a specific group of brands (for staggered scheduling).
    Groups of 3 pages each, 5 mins apart — avoids bursting all 18 at once.
    group_index: 0–4 (0=first 3 brands, 1=next 3, etc.)
    """
    active_brands = [(name, data) for name, data in BRANDS.items() if data["id"]]
    start = group_index * 3
    end = start + 3
    group = active_brands[start:end]
    results = []
    for brand_name, data in group:
        result = run_post(brand_name, post_type)
        results.append(result)
        print(result)
    # Safety sweep after each group
    purge_duplicate_posts()
    return results

if __name__ == "__main__":
    # Auto-refresh tokens at start of every run
    refresh_tokens_from_credential()

    post_type = sys.argv[1] if len(sys.argv) > 1 else "text"
    group_index = int(sys.argv[2]) if len(sys.argv) > 2 else None

    # ── DEDUPLICATION LOCK ──────────────────────────────────────────────────
    # Prevent the same slot from posting twice within a 20-minute window.
    import time as _time
    slot_key = f"{post_type}_{group_index}_{datetime.now().strftime('%Y-%m-%d_%H')}"
    lock_file = f"/tmp/poster_lock_{slot_key}.lock"
    run_log   = "poster_run_log.json"

    # Load run log
    try:
        with open(run_log) as _f:
            _runs = json.load(_f)
    except Exception:
        _runs = {}

    # Check if this exact slot already ran in the last 20 minutes
    _last_run = _runs.get(slot_key, 0)
    if _time.time() - _last_run < 1200:  # 20 minutes
        print(f"⚠️  DUPLICATE RUN BLOCKED — slot '{slot_key}' already ran {int(_time.time()-_last_run)}s ago. Exiting.")
        sys.exit(0)

    # Check lockfile (belt-and-suspenders)
    if os.path.exists(lock_file):
        lock_age = _time.time() - os.path.getmtime(lock_file)
        if lock_age < 1200:
            print(f"⚠️  LOCK FILE EXISTS — slot '{slot_key}' is already running or ran {int(lock_age)}s ago. Exiting.")
            sys.exit(0)

    # Acquire lock
    open(lock_file, 'w').close()
    _runs[slot_key] = _time.time()
    try:
        with open(run_log, 'w') as _f:
            json.dump(_runs, _f)
    except Exception:
        pass
    # ── END DEDUPLICATION LOCK ──────────────────────────────────────────────

    if group_index is not None:
        print(f"\n=== Running {post_type.upper()} posts — Group {group_index} ===")
        print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M AST')}\n")
        results = run_group(post_type, group_index)
    else:
        print(f"\n=== Running {post_type.upper()} posts for all brands ===")
        print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M AST')}\n")
        results = run_all(post_type)
    passed = sum(1 for r in results if r.startswith("✅"))
    failed = sum(1 for r in results if r.startswith("❌"))
    print(f"\n=== Done: {passed} posted, {failed} failed ===")
