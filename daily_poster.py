"""
EmpireDesk Daily Content Poster
Runs 4x per day per brand — text, photo, photo, video
Schedule: 8AM, 11AM, 2PM, 7PM AST
"""
import json, sys, random, urllib.request, urllib.parse, urllib.error, re, os
from datetime import datetime

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
    "Seamrite Designs": "seamrite-designs",
    "The Autodrome":      "the-autodrome",
    "Prisca Dezigns":     "prisca-dezigns",
}

# Instagram Business Account IDs (loaded from ig_accounts.json)
def _load_ig_ids():
    try:
        with open("ig_accounts.json") as f:
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
        with open("fb_page_tokens.json", "w") as f:
            json.dump(updated, f, indent=2)
        # Reload IG accounts with fresh tokens
        if os.path.exists("ig_accounts.json"):
            with open("ig_accounts.json") as f:
                ig = json.load(f)
            for acc in ig:
                pname = acc["page_name"].strip()
                if pname in updated:
                    acc["token"] = updated[pname]["access_token"]
            with open("ig_accounts.json", "w") as f:
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
        with open('fb_page_tokens.json') as f:
            raw = json.load(f)
    except Exception:
        return {}
    brands = {}
    for name, v in raw.items():
        if not isinstance(v, dict):
            continue
        page_id = v.get('id', '')
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
    "agency": [
        "Your brand is your first impression. Make it count.\n\nWe design websites, build brand identities and manage social media for businesses ready to grow.\n\nVisit priscadezigns.org\n\n#PriscaDezigns #Branding #WebDesign #DigitalAgency",
        "Behind every successful brand is a strategy.\n\nAt Prisca Dezigns, we build brands that attract the right clients and convert them.\n\nServices: Web Design · Branding · Social Media\n\npriscadezigns.org\n\n#PriscaDezigns #BrandStrategy #WebDesign",
        "Your website should work for you 24/7.\n\nWe build fast, professional websites that turn visitors into clients.\n\nReady to elevate your brand? Visit priscadezigns.org\n\n#PriscaDezigns #WebDesign #DigitalMarketing #Branding",
        "Consistency builds trust. Trust builds clients.\n\nWe manage your social media so your brand shows up professionally every single day.\n\npriscadezigns.org\n\n#PriscaDezigns #SocialMediaManagement #ContentStrategy",
        "A strong brand identity sets you apart from everyone else in your industry.\n\nLogos · Colour palettes · Typography · Brand guidelines — we handle it all.\n\npriscadezigns.org\n\n#PriscaDezigns #BrandIdentity #LogoDesign",
        "Your competitors are online. Your clients are online. Your brand should be too.\n\nPrisca Dezigns — full-service digital agency.\n\npriscadezigns.org\n\n#PriscaDezigns #DigitalAgency #BusinessGrowth #Branding",
        "We don't just build websites. We build businesses.\n\nEvery site we deliver is fast, mobile-ready and designed to convert.\n\npriscadezigns.org\n\n#PriscaDezigns #WebDesign #ConversionDesign #DigitalAgency",
        "Social media done right takes time, strategy and consistency.\n\nLet us handle it. You focus on running your business.\n\npriscadezigns.org\n\n#PriscaDezigns #SocialMediaManagement #DigitalMarketing",
        "From logo to launch — we take your brand from idea to execution.\n\nBranding · Web Design · Social Media · Content\n\npriscadezigns.org\n\n#PriscaDezigns #BrandLaunch #DigitalAgency #Branding",
        "Professional branding isn't a luxury. It's what separates businesses that grow from ones that stay stuck.\n\npriscadezigns.org\n\n#PriscaDezigns #Branding #WebDesign #BusinessGrowth",
        "Your brand story matters. We help you tell it.\n\nWebsite design and social media management that reflects who you really are.\n\npriscadezigns.org\n\n#PriscaDezigns #BrandStorytelling #DigitalAgency",
        "Great design builds credibility before you say a word.\n\nLet Prisca Dezigns build your brand the right way.\n\npriscadezigns.org\n\n#PriscaDezigns #LogoDesign #Branding #WebDesign",
    ],
    "fashion_art": [
        "Fashion is self-expression made visible. Wear what makes you feel most like yourself.\n\nSeamrite Designs — where fashion meets art.\n\n#SeamriteDesigns #FashionArt #WearableArt #StyleInspiration",
        "The most versatile piece in any wardrobe is confidence. Everything else is a supporting act.\n\nSeamrite Designs — curated fashion for the bold.\n\n#SeamriteDesigns #FashionForward #StyleQuotes",
        "Art in fashion: the boundary between wearable and collectible is where the most interesting things happen.\n\nExplore the collection at priscadezigns.org/seamritedesigns/\n\n#SeamriteDesigns #FashionArt #ArtisticFashion",
        "A signature look is more powerful than a constantly shifting wardrobe. Own your aesthetic.\n\nSeamrite Designs — fashion with intention.\n\n#SeamriteDesigns #OwnYourStyle #FashionIdentity",
        "Texture mixing is the easiest way to make a simple outfit look intentional and considered.\n\nShop the edit at priscadezigns.org/seamritedesigns/\n\n#SeamriteDesigns #FashionTips #StyleHacks",
        "Every garment tells a story. The question is — what does yours say?\n\nSeamrite Designs — fashion as art.\n\n#SeamriteDesigns #FashionStory #WearableArt",
        "The best outfits are the ones that feel like you even before you look in the mirror.\n\nExplore the collection at priscadezigns.org/seamritedesigns/\n\n#SeamriteDesigns #StyleAuthenticity #FashionArt",
        "Creativity lives in the details — the stitching, the silhouette, the story behind every piece.\n\nSeamrite Designs — where craft meets culture.\n\n#SeamriteDesigns #FashionDesign #ArtisanFashion",
        "Style is not about what you wear. It is about how you wear it.\n\nSeamrite Designs — fashion for every version of you.\n\n#SeamriteDesigns #StyleInspo #FashionArt",
        "What you wear is how you present yourself to the world without saying a word.\n\nMake it count — priscadezigns.org/seamritedesigns/\n\n#SeamriteDesigns #FashionStatement #WearableArt",
        "Great art makes you feel something. Great fashion does the same.\n\nSeamrite Designs — curated at the intersection of both.\n\n#SeamriteDesigns #ArtMeetsFashion #StyleCulture",
        "Colour, cut, and confidence. The three things every great outfit needs.\n\nSeamrite Designs — shop at priscadezigns.org/seamritedesigns/\n\n#SeamriteDesigns #FashionTips #StyleForward",
    ],
    "eco": [
        "🌿 {name} — because sustainable living shouldn’t mean sacrificing quality. priscadezigns.org/verdant-co/ #VerdantCo #EcoLiving",
        "♻️ Swap one thing. Make it count. {name} is the smarter choice for your home. #VerdantCo #GreenHome",
        "🌱 Your home reflects your values. {name} — shop the eco edit. priscadezigns.org/verdant-co/ #VerdantCo #Sustainable",
        "💪 Good for you. Better for the planet. {name} — shop now. #VerdantCo #EcoFriendly",
        "🌍 Every small switch adds up. Today’s pick: {name}. Shop at priscadezigns.org/verdant-co/ #VerdantCo",
        "🍃 We curated it so you don’t have to. {name} — live greener, feel better. #VerdantCo #EcoLiving",
        "💰 Eco-friendly AND budget-smart? Yes. {name} at ${price}. Shop now 🔗 #VerdantCo",
        "✨ {name} — the kind of upgrade your home AND the planet will thank you for. #VerdantCo",
        "🏡 Thoughtful living starts here. {name} — priscadezigns.org/verdant-co/ #VerdantCo #GreenLiving",
        "♻️ This one’s for the intentional ones. {name} — shop sustainable today. #VerdantCo",
    ],
    "watches": [
        "⌚ {name} — because the right watch speaks before you do. Shop at priscadezigns.org/the-watch-list/ #TheWatchList",
        "👑 Timeless. Iconic. {name} — investment pieces that never go out of style. #TheWatchList",
        "🏆 {name} — crafted for those who understand the art of time. priscadezigns.org/the-watch-list/ #TheWatchList",
        "✨ The wrist never lies. {name} at ${price} — shop the edit. #TheWatchList #LuxuryWatch",
        "💼 A great watch is worth more than it costs. {name} — shop now. #TheWatchList",
        "👑 Dress the wrist right. {name} — curated luxury, real prices. priscadezigns.org/the-watch-list/ #TheWatchList",
        "⌚ Today’s pick: {name}. If you know, you know. Shop now. #TheWatchList #WatchCollector",
        "💪 Built to outlast trends. {name} — a piece worth wearing every day. #TheWatchList",
        "✨ Legacy on your wrist. {name} — shop at priscadezigns.org/seamritedesigns/ #TheWatchList #LuxuryTimepieces",
        "🏆 This is the one. {name} at ${price}. Shop before it’s gone. 🔗 #TheWatchList",
    ],
    "sneakers": [
        "👟 {name} just landed. Clean, fresh, yours. Shop now 🔗 #SolePrestige",
        "🔥 {name} — the heat is real. Grab your pair before they’re gone. #SolePrestige",
        "💡 Every step matters. Step in {name}. priscadezigns.org/sole-prestige/ #SolePrestige",
        "💰 {name} at ${price}. Premium kicks, real price. priscadezigns.org/sole-prestige/ #SolePrestige #Sneakers",
        "👑 Curated for those who take their sole seriously. Today: {name}. #SolePrestige",
        "🔥 New drop: {name}. First come, first served. Shop now 🔗 #SolePrestige #SneakerHead",
        "⚡ Your outfit needs the right foundation. {name} — shop it. #SolePrestige",
        "👟 Not just sneakers. A statement. {name} — priscadezigns.org/sole-prestige/ #SolePrestige #PremiumSneakers",
        "🏆 The best pairs sell out fast. {name} is live — act now. 🔗 #SolePrestige",
        "💪 {name} — comfort, style, culture. Shop the full collection. #SolePrestige",
    ],
    "gaming": [
        "🎮 {name} — your setup deserves better. Shop at priscadezigns.org/atelier-gaming/ #AtelierGaming",
        "⚡ Elite gear for elite players. {name} at ${price}. priscadezigns.org/atelier-gaming/ #AtelierGaming",
        "🏆 Winners don’t settle for average gear. {name} — shop it. #AtelierGaming",
        "🎯 Play harder. Play smarter. {name} — upgrade your station today. 🔗 #AtelierGaming",
        "💥 {name} just dropped into the collection. Your setup will never be the same. #AtelierGaming",
        "🖥️ The right gear makes the difference. Today’s pick: {name}. #AtelierGaming #GamingSetup",
        "🎮 Gear check. {name} at ${price} — worth every cent. Shop now. 🔗 #AtelierGaming",
        "⚡ Built for performance. {name} — dominate every session. #AtelierGaming #GamerLife",
        "👑 We curate so you can focus on the game. Today: {name}. #AtelierGaming",
        "🏆 No excuses when your setup is this good. {name} — priscadezigns.org/atelier-gaming/ #AtelierGaming",
    ],
    "automotive": [
        "🏎️ {name} — because your car deserves the same attention you give it. Shop now 🔗 #TheAutodrome",
        "⚡ Upgrade your ride. {name} at ${price}. priscadezigns.org/the-autodrome/ #TheAutodrome #CarCulture",
        "🚗 The best cars have the best accessories. Today: {name}. Shop it. #TheAutodrome",
        "🔧 {name} — quality gear for serious drivers. Shop now 🔗 #TheAutodrome",
        "🏆 Drive it. Love it. Equip it right. {name} — priscadezigns.org/the-autodrome/ #TheAutodrome #AutoLovers",
        "💥 New in the collection: {name}. Your car will thank you. 🔗 #TheAutodrome",
        "⚡ {name} — performance-grade, daily-driver approved. Shop now. #TheAutodrome",
        "🚗 Every great ride starts with great gear. {name} at ${price}. #TheAutodrome #CarLife",
        "🏎️ Built for the road. Built for you. {name} — shop the edit. 🔗 #TheAutodrome",
        "🔧 Serious drivers shop serious gear. Today’s pick: {name}. #TheAutodrome",
    ],
    "fitness": [
        "💪 {name} — the gear that matches your grind. Shop at priscadezigns.org/peak-fit/ #PeakFit",
        "🔥 No excuses. Just results. {name} at ${price}. priscadezigns.org/peak-fit/ #PeakFit",
        "🏋️ Train harder. Recover faster. {name} — shop it. #PeakFit #WorkoutGear",
        "⚡ Elite performance starts with the right equipment. {name} — priscadezigns.org/peak-fit/ #PeakFit",
        "🏆 Your body puts in the work. Give it the best tools. {name}. #PeakFit",
        "💪 {name} — because average gear gets average results. Shop now. #PeakFit #GymLife",
        "🔥 Today’s pick: {name} at ${price}. Add it to your gym bag. 🔗 #PeakFit",
        "🏋️ Built for people who take fitness seriously. {name} — shop at priscadezigns.org/seamritedesigns/ #PeakFit",
        "⚡ The best workouts start before you even hit the gym. {name} — priscadezigns.org/peak-fit/ #PeakFit",
        "💪 {name} — curated for every level, every goal. Shop now. 🔗 #PeakFit",
    ],
    "travel": [
        "✈️ {name} — pack smart, travel light. Shop now 🔗 #TheEscapist",
        "🌍 Adventure-ready. {name} at ${price}. priscadezigns.org/the-escapist/ #TheEscapist #TravelLife",
        "🏖️ Your next trip deserves the right gear. {name} — shop it. #TheEscapist",
        "🧳 The explorers who pack smart, travel better. {name} — priscadezigns.org/the-escapist/ #TheEscapist",
        "✨ {name} — because great travel starts with great prep. Shop now. #TheEscapist",
        "🌍 New in the collection: {name}. Whether you’re near or far, this one’s worth it. #TheEscapist",
        "✈️ Every escape starts here. {name} at ${price}. Shop the edit. 🔗 #TheEscapist",
        "🧳 We scout the best travel gear so you don’t have to. Today: {name}. #TheEscapist",
        "🏖️ Wanderlust approved. {name} — priscadezigns.org/the-escapist/ #TheEscapist #Wanderlust",
        "🌍 {name} — built for the ones who’d rather explore than stay. Shop now. 🔗 #TheEscapist",
    ],
    "pets": [
        "🐾 {name} — because your pet gives you everything. Give them the best. Shop now 🔗 #PawVault",
        "🐶 Spoil them a little. {name} at ${price}. priscadezigns.org/paw-vault/ #PawVault #DogsOfInstagram",
        "🐱 Premium pet care, curated. {name} — shop it. #PawVault #CatsOfInstagram",
        "❤️ Happy pets, happy home. {name} — priscadezigns.org/paw-vault/ #PawVault",
        "🐾 They can’t shop for themselves. You can. {name} — shop now. #PawVault #PetCare",
        "🐶 Today’s pick for your best friend: {name} at ${price}. Shop it. 🔗 #PawVault",
        "🐱 Because they deserve the same quality you do. {name} — priscadezigns.org/paw-vault/ #PawVault",
        "🐾 The best pet products, all in one place. Today: {name}. Shop now. #PawVault",
        "❤️ {name} — trusted, reviewed, and pet-approved. Shop the full collection. 🔗 #PawVault",
        "🐶 Premium care for every breed, every size. {name} — shop now. #PawVault #PetLovers",
    ],
    "homedecor": [
        "🏡 {name} — understated elegance for every room. Shop now 🔗 #QuietLuxury",
        "✨ Less is more. {name} at ${price}. The minimal luxury edit. #QuietLuxury",
        "🕯️ Create your sanctuary. {name} — priscadezigns.org/quiet-luxury/ #QuietLuxury #HomeDecor",
        "🏠 Your home should feel like a retreat. {name} — shop it. #QuietLuxury #InteriorDesign",
        "✨ {name} — refined, intentional, beautiful. Shop now. 🔗 #QuietLuxury",
        "🏡 The details make the space. Today’s pick: {name}. #QuietLuxury #HomeInspo",
        "🕯️ Quiet luxury isn’t a trend — it’s a standard. {name} at ${price}. #QuietLuxury",
        "✨ {name} — because your home deserves the same care you put into yourself. Shop now. #QuietLuxury",
        "🏠 Curated for the ones who live with intention. {name} — priscadezigns.org/quiet-luxury/ #QuietLuxury",
        "🕯️ {name} — elevate any room, effortlessly. Shop the collection. #QuietLuxury",
    ],
    "skincare": [
        "✨ {name} — your skin deserves a ritual, not just a routine. Shop at priscadezigns.org/glow-protocol/ #GlowProtocol",
        "🌟 Science-backed. Results-driven. {name} at ${price}. priscadezigns.org/glow-protocol/ #GlowProtocol",
        "💦 Glow from within. {name} — shop it. #GlowProtocol #Skincare",
        "💎 Luxury skincare that actually works. {name} — priscadezigns.org/glow-protocol/ #GlowProtocol",
        "✨ Your skin is an investment. {name} — invest right. Shop now. #GlowProtocol",
        "🌟 Today’s protocol pick: {name} at ${price}. Add it to your routine. 🔗 #GlowProtocol",
        "💦 The glow-up starts here. {name} — shop the full routine. #GlowProtocol #SkinCareRoutine",
        "✨ {name} — because healthy skin is always in. Shop now. #GlowProtocol #GlowUp",
        "🌟 Real ingredients. Real results. {name} — priscadezigns.org/glow-protocol/ #GlowProtocol",
        "💦 Skincare that speaks for itself. Today: {name}. Shop now. #GlowProtocol #BeautyRoutine",
    ],
    "fragrance": [
        "🌸 {name} — a scent that stays. Shop at priscadezigns.org/essence-elite/ #EssenceElite",
        "✨ Wear confidence. {name} at ${price}. priscadezigns.org/essence-elite/ #EssenceElite #Perfume",
        "🌹 Your signature scent is waiting. {name} — shop it. #EssenceElite",
        "💎 {name} — because how you smell is part of how you’re remembered. priscadezigns.org/essence-elite/ #EssenceElite",
        "🌸 Premium fragrance, premium impression. {name} — shop now. #EssenceElite #LuxuryFragrance",
        "✨ Today’s pick: {name} at ${price}. Smell like you mean it. 🔗 #EssenceElite",
        "🌹 A great scent is the invisible accessory. {name} — shop at priscadezigns.org/seamritedesigns/ #EssenceElite",
        "💎 {name} — curated for those with a taste for the finer things. Shop now. #EssenceElite",
        "🌸 The right fragrance changes everything. Today: {name}. priscadezigns.org/essence-elite/ #EssenceElite",
        "✨ {name} — wear it like a second skin. Shop now. #EssenceElite #Fragrance",
    ],
    "realestate": [
        "🏡 {name} — your next investment starts here. Shop now 🔗 #PrimeLandNetwork",
        "💰 Smart investors act early. {name} at ${price}. priscadezigns.org/prime-land-network/ #PrimeLandNetwork",
        "🔑 {name} — land is the one thing they stopped making. Invest smart. #PrimeLandNetwork",
        "🏘️ {name} — verified listings, real opportunities. priscadezigns.org/prime-land-network/ #PrimeLandNetwork",
        "🏡 Build wealth one property at a time. Today’s pick: {name}. #PrimeLandNetwork",
        "💰 {name} — the right tools for the right investment. Shop now. 🔗 #PrimeLandNetwork",
        "🔑 The best investments aren’t on the stock market. {name} — explore it. #PrimeLandNetwork",
        "🏘️ Your empire starts with the right land. Today: {name}. priscadezigns.org/prime-land-network/ #PrimeLandNetwork",
        "🏡 {name} — built for those who think long-term. Shop the edit. #PrimeLandNetwork",
        "💰 Property is power. {name} — take the first step. priscadezigns.org/prime-land-network/ #PrimeLandNetwork",
    ],
    "tech": [
        "📱 {name} — the best tech, no noise. Shop now 🔗 #TechScoutHQ",
        "⚡ Smarter tools for smarter people. {name} at ${price}. priscadezigns.org/tech-scout/ #TechScoutHQ",
        "🔬 {name} — reviewed, curated, linked. Shop it. #TechScoutHQ #Gadgets",
        "💻 Innovation that fits in your hands. {name} — priscadezigns.org/tech-scout/ #TechScoutHQ",
        "⚡ Level up your tech game. Today’s pick: {name}. #TechScoutHQ #TechGadgets",
        "📱 {name} at ${price} — worth every dollar. Shop now. 🔗 #TechScoutHQ",
        "🔬 We scout so you don’t have to. {name} — shop at priscadezigns.org/seamritedesigns/ #TechScoutHQ",
        "💻 {name} — because great tech makes everything easier. priscadezigns.org/tech-scout/ #TechScoutHQ",
        "⚡ The gadget your setup is missing. {name} — shop now. #TechScoutHQ #Technology",
        "📱 Today from the Scout: {name} at ${price}. Don’t sleep on this one. 🔗 #TechScoutHQ",
    ],
    "anime": [
        "{name} just dropped. The culture never waits. Shop now #DreamingAnime #Anime",
        "Wear your passion. {name} — shop at priscadezigns.org/seamritedesigns/ #DreamingAnime #AnimeLife",
        "For the ones who live and breathe it. {name} at ${price}. Shop now #DreamingAnime",
        "New in the collection: {name}. priscadezigns.org/dreaming-anime/ #DreamingAnime #AnimeMerch",
        "{name} — because the culture deserves representation. Shop it. #DreamingAnime #OtakuLife",
        "The grail is real. {name} — shop before it’s gone. #DreamingAnime",
        "{name} — carry the culture everywhere you go. Shop now. #DreamingAnime #Anime",
        "Built for fans, by fans. Today’s pick: {name}. priscadezigns.org/dreaming-anime/ #DreamingAnime",
        "{name} at ${price}. The collection grows. Shop the edit. #DreamingAnime #AnimeFan",
        "Your collection isn’t complete. {name} just changed that. Shop now. #DreamingAnime",
    ],
    "selfcare": [
        "🌼 {name} — invest in yourself daily. Shop now 🔗 #Shelfly",
        "🌸 You deserve to feel your best. {name} at ${price}. shop now. #Shelfly",
        "✨ Self-care isn’t selfish — it’s essential. {name} — shop it. #Shelfly #SelfCare",
        "💪 {name} — glow up, inside and out. shop now. 🔗 #Shelfly",
        "🌼 The best version of you starts here. Today’s pick: {name}. #Shelfly",
        "🌸 {name} at ${price} — worth it. Every single time. Shop now. 🔗 #Shelfly",
        "✨ When you take care of yourself, everything else follows. {name} — shop now. #Shelfly",
        "💪 {name} — curated for the ones who prioritise themselves. Shop now. #Shelfly",
        "🌼 Small rituals. Big results. Today: {name}. shop now. 🔗 #Shelfly #WellBeing",
        "🌸 {name} — because you’re worth the investment. Shop the collection. #Shelfly",
    ],
    "workspace": [
        "🖥️ {name} — because your environment shapes your output. Shop now 🔗 #Deskwell",
        "⚡ Build the workspace of your dreams. {name} at ${price}. shop now. #Deskwell",
        "💼 {name} — work smarter, look better doing it. Shop it. #Deskwell #HomeOffice",
        "🖥️ The right setup changes everything. {name} — shop now. 🔗 #Deskwell",
        "⚡ Upgrade your desk. Upgrade your output. Today: {name}. #Deskwell #DeskSetup",
        "💼 {name} at ${price} — the piece your setup was missing. Shop now. 🔗 #Deskwell",
        "🖥️ {name} — premium workspace gear for people who take their work seriously. #Deskwell",
        "⚡ Less clutter. More focus. {name} — shop the edit. shop now. 🔗 #Deskwell",
        "💼 Great work starts with a great space. Today’s pick: {name}. #Deskwell #WorkFromHome",
        "🖥️ {name} — your desk should inspire you. Shop now. 🔗 #Deskwell",
    ],
    "food": [
        "🍴 {name} — Caribbean flavours, no compromise. Shop now 🔗 #Pantriq",
        "🌶️ Cook with confidence. {name} at ${price}. shop now. #Pantriq #CaribbeanFood",
        "🍚 {name} — from our kitchen to yours. Shop it. #Pantriq #HomeCooking",
        "🍴 Your kitchen deserves the best. {name} — shop now. 🔗 #Pantriq",
        "🌶️ Good food starts with good ingredients. Today: {name}. #Pantriq #FoodLovers",
        "🍚 {name} at ${price} — the pantry essential you didn’t know you needed. Shop now. 🔗 #Pantriq",
        "🍴 {name} — because Caribbean cooking deserves Caribbean-quality tools. #Pantriq",
        "🌶️ Stock the pantry right. {name} — shop at priscadezigns.org/seamritedesigns/ shop now. 🔗 #Pantriq",
        "🍚 Today’s kitchen pick: {name}. Cook better, eat better. #Pantriq #CaribbeanKitchen",
        "🍴 {name} — the staple your kitchen has been missing. Shop now. 🔗 #Pantriq",
    ],
    "purses_bags": [
        "👜 {name} — the bag that says everything without a word. Shop at priscadezigns.org/couture-gallery/ #CoutureGallery",
        "💎 A great bag is an investment. {name} at ${price}. priscadezigns.org/couture-gallery/ #CoutureGallery",
        "✨ {name} — from totes to clutches, the edit for those who know. #CoutureGallery #LuxuryBags",
        "👛 New arrivals: {name} — shop now before it’s gone. 🔗 #CoutureGallery",
        "👜 {name} — carry luxury everywhere you go. Shop the collection. #CoutureGallery",
        "💎 Designer curation done right. Today: {name} at ${price}. priscadezigns.org/couture-gallery/ #CoutureGallery",
        "✨ {name} — because the right bag completes every look. Shop now. #CoutureGallery #DesignerBags",
        "👛 {name} — timeless pieces for the woman who knows her worth. 🔗 #CoutureGallery",
        "👜 Today’s pick: {name}. The investment your wardrobe needs. #CoutureGallery #Handbags",
        "✨ {name} at ${price} — curated luxury, real prices. Shop at priscadezigns.org/couture-gallery/ #CoutureGallery",
    ],
}


# Editorial/niche tip content — rotated daily, no product name/price
# Used for text posts to provide VALUE, not just product dumps
def _load_niche_tips():
    try:
        with open("niche_tips.json") as f:
            return json.load(f)
    except Exception:
        return {}
NICHE_TIPS = _load_niche_tips()


def get_caption(niche, product=None):
    """Return a caption rotated by day-of-year so it never repeats within 10 days.
    Injects {name} and {price} from the product dict if provided."""
    from datetime import date
    caps = CAPTIONS.get(niche, ["Check out our latest pick — shop now"])
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
    import email.mime.multipart, email.mime.base, email.mime.text
    base = "https://graph.facebook.com/v19.0"

    if video_path and os.path.exists(video_path):
        # Upload video file to FB /videos endpoint (multipart)
        import mimetypes, http.client, uuid
        url_video = f"{base}/{page_id}/videos"
        boundary = uuid.uuid4().hex
        with open(video_path, "rb") as vf:
            video_data = vf.read()
        filename = os.path.basename(video_path)
        body = (
            f"--{boundary}\r\n"
            f'Content-Disposition: form-data; name="access_token"\r\n\r\n{token}\r\n'
            f"--{boundary}\r\n"
            f'Content-Disposition: form-data; name="description"\r\n\r\n{message}\r\n'
            f"--{boundary}\r\n"
            f'Content-Disposition: form-data; name="source"; filename="{filename}"\r\n'
            f'Content-Type: video/mp4\r\n\r\n'
        ).encode() + video_data + f"\r\n--{boundary}--\r\n".encode()
        try:
            req = urllib.request.Request(
                url_video, data=body, method="POST",
                headers={"Content-Type": f"multipart/form-data; boundary={boundary}"}
            )
            with urllib.request.urlopen(req, timeout=120) as resp:
                return json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            body_err = e.read().decode()
            try:
                return json.loads(body_err)
            except Exception:
                return {"error": {"message": body_err[:200]}}
        except Exception as ex:
            return {"error": {"message": str(ex)}}

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
        print(f"Photo rotation load error: {e}")
        return None

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

def post_reel_to_instagram(ig_id, token, video_path, caption):
    """Upload a local video file as an Instagram Reel via Graph API.
    Returns dict with 'id' on success or 'error' on failure."""
    import uuid, os
    base = "https://graph.facebook.com/v19.0"

    if not video_path or not os.path.exists(video_path):
        return {"error": {"message": "video_path missing or not found"}}

    # Step 1: create media container for reel
    container_url = f"{base}/{ig_id}/media"
    payload = urllib.parse.urlencode({
        "media_type": "REELS",
        "caption": caption,
        "share_to_feed": "true",
        "access_token": token
    }).encode()
    # We need to upload the video file itself — IG Reels requires a video_url (hosted URL)
    # Upload to FB first to get a hosted URL, then use that for IG
    # For now: upload to IG using multipart (video upload endpoint)
    boundary = uuid.uuid4().hex
    with open(video_path, "rb") as vf:
        video_data = vf.read()
    filename = os.path.basename(video_path)
    body = (
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="access_token"\r\n\r\n{token}\r\n'
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="caption"\r\n\r\n{caption}\r\n'
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="media_type"\r\n\r\nREELS\r\n'
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="share_to_feed"\r\n\r\ntrue\r\n'
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="video"; filename="{filename}"\r\n'
        f'Content-Type: video/mp4\r\n\r\n'
    ).encode() + video_data + f"\r\n--{boundary}--\r\n".encode()
    try:
        req = urllib.request.Request(
            f"{base}/{ig_id}/media", data=body, method="POST",
            headers={"Content-Type": f"multipart/form-data; boundary={boundary}"}
        )
        with urllib.request.urlopen(req, timeout=180) as resp:
            container = json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body_err = e.read().decode()
        try:
            return json.loads(body_err)
        except Exception:
            return {"error": {"message": body_err[:200]}}
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
        body_err = e.read().decode()
        try:
            return json.loads(body_err)
        except Exception:
            return {"error": {"message": body_err[:200]}}
    except Exception as ex:
        return {"error": {"message": str(ex)}}


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

    # ── HARD POST CAP — fail-CLOSED, date-based (updated 2026-05-16) ────────
    from datetime import date as _date, timezone as _tz, timedelta as _td, datetime as _dt
    _is_seamrite = ("seamrite" in brand_name.lower() or
                    "nehneh" in brand_name.lower() or
                    "neh neh" in brand_name.lower())
    MAX_DAILY = 2 if _is_seamrite else 4
    try:
        # Use midnight-to-now window (local date) for reliable counting
        _midnight_utc = _dt.combine(_date.today(), _dt.min.time()).replace(tzinfo=_tz.utc)
        _since_ts = int(_midnight_utc.timestamp()) - 4*3600  # 4h offset for AST (UTC-4)
        _cap_url = (
            f"https://graph.facebook.com/v19.0/{page_id}/published_posts"
            f"?fields=id,created_time&since={_since_ts}&limit=50&access_token={token}"
        )
        _cap_req = urllib.request.Request(_cap_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(_cap_req, timeout=10) as _r:
            _cap_data = json.loads(_r.read())
        _posts_today = len(_cap_data.get("data", []))
        if _posts_today >= MAX_DAILY:
            return f"⏭️ {brand_name} — CAPPED ({_posts_today}/{MAX_DAILY} posts today — skipped)"
    except Exception as _cap_e:
        # Fail CLOSED — if we can't verify the count, skip rather than over-post
        return f"⏭️ {brand_name} — cap check failed ({_cap_e}) — skipped to avoid over-posting"
    # ── END CAP CHECK ────────────────────────────────────────────────────────

    # Get today's product for this brand from the live site (niche_products.json)
    product_used = get_product_for_brand(brand_name)
    if product_used:
        aff_link  = product_used.get("link") or get_affiliate_link(aff, niche)
        photo_url = product_used.get("image", "")
    else:
        aff_link  = get_affiliate_link(aff, niche)
        photo_url = ""

    # GUARD: Prisca Dezigns and Seamrite Designs NEVER use product/niche captions
    if niche in ("agency", "fashion_art"):
        caption = get_caption(niche, None)
    else:
        caption = get_caption(niche, product_used)
    ig_result = ""  # populated for photo posts that hit Instagram

    if post_type == "text":
        # AGENCY/FASHION_ART pages use their own CAPTIONS, not NICHE_TIPS
        if niche in ("agency", "fashion_art"):
            tips = CAPTIONS.get(niche, ["Visit priscadezigns.org"])
        else:
            tips = NICHE_TIPS.get(niche, NICHE_TIPS.get("eco", ["Follow for daily niche content."]))
        from datetime import date as _date
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
