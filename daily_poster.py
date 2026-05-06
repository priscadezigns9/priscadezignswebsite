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
    "NehNeh":             "nehneh",
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
BRANDS = {
    "Verdant Co.":       {"id":"1140265212494782","token":"EAASyc3W8qO4BRW1e8wVa8X2GYUazKZBe737aKfBd1WRDNBNceum1iSCPcF0UtuiKTNTSPvjkWygHiQ30qcwzLa8GZAROoUaCS5ozqWcfF1zIC6TnY8dJW4WgRtlvhRjApwCbZCAOdoQDjZBmjoma5DlyZAUnOYPdwxC4RthnmUFzo5jjzYJE6NfMzOQjNhYHgiqQOzcCC","niche":"eco","tag":"VerdantCo","aff":"priscadezigns-20"},
    "The Watch List":    {"id":"1072926889242673","token":"EAASyc3W8qO4BRTmOzkTn0QDRV2xQK1JnEJDvCz02MpGeIRi2eqpNPIpE2PO73W3mXdOd0hFIQdgJe0GwOEBs6PKG5WrI9947gTmHsKWpeJG2gz0WcwmYBsjdEVhZBsm2ZAxY39liGBKy4wEhNfAzwZBsSjjZBm6lPL5jBq1NlOjtMmbZC1zTfTT7G7rUaGXKHD1ZCYhZCON","niche":"watches","tag":"TheWatchList","aff":"priscadezigns-20"},
    "Sole Prestige":     {"id":"1094645483734682","token":"EAASyc3W8qO4BRQfYn9XWkX7ZCtyWSe5j0LTabrpGwEnSpF2zurItyxkpLnI6FYJjncvMdoTuFHXfOm4bZBhgqyQaluY3Ipv5XYpFpNWzjLVZCgWZBoMofo0lowVb1eEVgVMXLEpEhgvPWtV6zNZBQ9wgRnmkXolfRN4jz2LNXVDsGCVltO0h9mAGbWdPbU8OpbEsBgsA3","niche":"sneakers","tag":"SolePrestige","aff":"priscadezigns-20"},
    "Atelier Gaming":    {"id":"1046777931860791","token":"EAASyc3W8qO4BRUX1ay5Y9wIrZCS6M882TtbqUkYdFB8HRr0mL2ZAAZA8sE5h2JWBaQGdq4S3PV9jWKCTTOuzPabGFUbZBfWv65I9FFD6gJn95p1Dv8118oIeqDsrHJD3FgGCERdhUK8XyweM8gGR5WndtGSjSEyqAlg7LozOgMtuMgrIl856plFnnzqomA9ZCuunYmRZCD","niche":"gaming","tag":"AtelierGaming","aff":"priscadezigns-20"},
    "Couture Gallery":   {"id":"1100955549767016","token":"EAASyc3W8qO4BRTgeinNcjAkQiBMmPvjImZAL8cW2BUvoGi82r9hkq64Wvn664cAVZAwShZCrZBPTj3pSUL4nrqxsbRZCpbRbl5uaXLAUKaOamx8ZA1i4nZCZBg3ZCVXaGQ3P3nHZCEHzxvDUBCjjtk4TzhHWs3SK9ToDFZB9sG9GTtnlaioEqQ52pJVa70lSnA06CkvVA5SiDYo","niche":"purses_bags","tag":"CoutureGallery","aff":"priscadezigns-20"},  # PURSES & BAGS STRICTLY
    "The Autodrome":     {"id":"1124569194075808","token":"EAASyc3W8qO4BReQuThEdKst1liUVm00DCxZC0EVadLkywrNZB1yeSMsZBhVmZCvyquqgc5pYhuxLBSoTRwEN2bJZAhLJmNVmgBWcHWMDPyKg5qnP1CW6VbXVvtfQoEMzTq0hkzfChZA2ryKWc8MuRjbKEWClJdidgnsbht8Gtmi3s8pVYPPtwcQUebMkjvTbzUK1K47tss","niche":"automotive","tag":"TheAutodrome","aff":"priscadezigns-20"},
    "Peak Fit":          {"id":"1164177383439575","token":"EAASyc3W8qO4BRdaTOp0I8UBeXIafjoYml8xd4O2jm6vVHV4hKdiWtnhUmtUkx5eR2RkicnwQ3s5rPvdDrzCvzgZAkX0eCCHt04US0sLStIWS3Gt1pGZASAhIVMzu3N4u7izmIHJEy5CFSIZB4jVIHDIOVk9vKzV1jffd7qcHYJw3zqlgEPHb6BJPQweEJP5MvxKh8A3","niche":"fitness","tag":"PeakFit","aff":"priscadezigns-20"},
    "The Escapist":      {"id":"1057947180740345","token":"EAASyc3W8qO4BRZASlKcNRGBRSphyb8otSqyjwPZBi3Wfu0MEILR2ZA42DfParVfbL2261otPRhySZBQm4WYkPByOCJSGce8Bq1dtet7Kx4QBttAtYYLPW4HjHPZBP4sN9MhqFKuI7cIB3F1ChxPzIHAOqbJnBdBGoMSY9wEs16VrcCI84GOt3jnWC9VseuW3hQD7GQNye","niche":"travel","tag":"TheEscapist","aff":"priscadezigns-20"},
    "Paw Vault":         {"id":"1159923583861215","token":"EAASyc3W8qO4BRb0b2j91C9MfDYb9cWYEKeqFYz0lJewNXnbb4uOO8pu6lf2fumH9TuoMC8M8HI0AhTZBhDftpmbWLSmYONyRuzTMPpXiIwl3xAB7m163MhLkNC3MyVo0VxlOzbaw1hFnJ8ZCwwq0nIJ0ILk1KQSjgSPos1EGEM3i5cNQZB1Jrlwrs1rFEJI347y9vZCI","niche":"pets","tag":"PawVault","aff":"priscadezigns-20"},
    "Quiet Luxury":      {"id":"1116678858189788","token":"EAASyc3W8qO4BRRYCr1UgDsGhZCgsHviO3sXYrEsyJuiAEWWS2CYkxGulxn35mHSsZBn8nXq3dQxSuio3aKA6HJiDQKRF0DplVamSif4tZC2gBns5hf6NIBj1ZALX2AZAOWES9xtOCt4ZBITEJTonmbrvWkkXeY43s72t8uDjZBmRZCCL8PlOqD2ZBK6yJbdAO66JcTN3wI6kh","niche":"homedecor","tag":"QuietLuxury","aff":"priscadezigns-20"},  # HOME DECOR STRICTLY
    "Glow Protocol":     {"id":"1127727907088536","token":"EAASyc3W8qO4BRVRRAHTI8Leea9OZCsTv8iYnOh07PMh2wTwrFdAcRDhNZB89omC7ui3w0GxBgP3YRxd5aXwuO0OAam1eWwS2gCZCoFoRHvLUQLO7a10rwlzTqUIiaIWo5kqRwgpoZBFJgYVhS0uXgad10JZADWhOot6ZCKTYwptf3aZBu0vKCRqUn7BG25Ey8TsZBYmJbxS3","niche":"skincare","tag":"GlowProtocol","aff":"priscadezigns-20"},
    "Essence Elite":     {"id":"1096637680199435","token":"EAASyc3W8qO4BRe4rg11WGv9JRGmHFs3T99o9ZCpPKFdP4OEvQFD60AZBjFufsTWArfURaWMIHqZBY75LxNoLXtef4IuRT4W1lUXwBbSZAVtZChWYlwmqSskDgbUZBGoefUsDL3v0fzBOZBSCzq9vgHAs6fTO9ziOZA388OLOCRgxGmY0Pxc5NfqvA4ThjTqn4ftMjnBfhIxr","niche":"fragrance","tag":"EssenceElite","aff":"priscadezigns-20"},
    "Prime Land Network":{"id":"1131532363373441","token":"EAASyc3W8qO4BRbLibHwGekwT0cRRC39KveflpPAPZCpIyMqQnadRLnqZBZBFUFPx1nUnW9Q9tp7ZCFvCXwEWjNxdr5zvt8WpTAUbZCm6pznFZCJ2ZBXFrg0mnIvXeZCfEBNOfEKUyYyGj2ZBbGpQ8Ss88PV64c8e4NzLKZBDYJyeG2h6JRvpP9xJwFaWenHN6pP1LXLyJ8hxee","niche":"realestate","tag":"PrimeLandNetwork","aff":"priscadezigns-20"},
    "The Tech Scout HQ": {"id":"1124620534060229","token":"EAASyc3W8qO4BRQAYXZBgBD1MyhAyQZAdNGHMi8d09EakYwsF4LPG9dxq6X1R3pxR4JZAd7a4C15J8ZAUBGzoOcBgIIkddZB4gSMffOO5JjZC9iEPDPhycTaO7IHgPwamAUPJuVpHljtp1OBWFTeGEfu4h0QE62VWmxxjqUettdcV1eGsYWbed5xXxhgp1oG7kkJP1KVKxY","niche":"tech","tag":"TechScoutHQ","aff":"priscadezigns-20"},
    "Dreaming Anime":    {"id":"294045870456760", "token":"EAASyc3W8qO4BRe36VPYHcmqe1nZB9QVe6fxRVpM8fKO5vkZCsUGymVNmnf0U427BTx72c4CAZB86uCEZA95V52QkhS7W26KWmN7MWtRwFGENz1R1ZBQ6FsI3Lvaoq71TyZA7gWOXNgntENPudUSgxyY5pTnMD6sHEg76mJHITlFwfUVoeGxWPsjB7pyCTnNIqNlhYkx4bp","niche":"anime","tag":"DreamingAnime","aff":"dreaminganime-20"},
        "The Way Made Known": {"id":"1142116855643947","token":"EAASyc3W8qO4BRYZAFcSxx1ZBmmcFOViM8ZC38xziDQ5hC7J2VZA8QVmivNWV0seMdIWisZA0j7yN2ZCMIzaxlZB3ezrhnVHL6VlLwGcHJ0rXd0HN6HMFdEJDBxxN42ploTWWEE2xy5XBVr903wUBg4gSPHlPBUDUAsTVcHP7xAErOu9VgEQo4CZCkRZBPwuE6zvfDcy4ZClwGb","niche":"christian","tag":"WayMadeKnown","aff":"priscadezigns-20"},
        "Prisca Dezigns": {"id":"106662059098517","token":"EAASyc3W8qO4BRbKjjVESnDECWFMQhHbzicElw0YnvOZBDEIZBHA7Qduj98k4gO1rFdm7Bi5klTo03hPg8w6sxhhThxl2K7L8i2A3nZCe63DFQZC8QmiVWQumDtxlQcB00Xv0j7jhhMumGGuC7AZBQxUZCOsqZAnluTArVZC8pqh9USyrOeWnUrhFZAMD6HXzZAo63SF4jB7X0ZD","niche":"design","tag":"PriscaDezigns","aff":"priscadezigns-20"},
        "NehNeh": {"id":"2455413671137234","token":"EAASyc3W8qO4BRVQnaq7X0jOZBoEQkKQ8gOhEvY6ow95JZAMgZA75X6SfZCyuNFlszpZCobuDZC0Qzf9bAcoeZA9wkqJv4QXPlGTbf69ysZA2ZByOfDtulRPzuV4jijtYvRYW5WZB0MOQ0DGu4uN9ZCcqk5Br6xUNmZCkZBCJI6dDvFj5j6oN4mEZAaZACIgLR9e75EWfPU02LZASEuvH","niche":"fashion","tag":"NehNeh","aff":"priscadezigns-20"},
}

# ── CAPTION TEMPLATES BY NICHE ──
CAPTIONS = {
    "eco":        ["🌿 Every small choice matters. Shop sustainable today — link in bio 🔗 #VerdantCo #EcoLiving #Sustainable","♻️ Your home. Your values. Shop the green edit now. #VerdantCo #GreenLiving","🌱 Because the planet deserves better — and so do you. Shop now 🔗 #VerdantCo #EcoFriendly","💚 Swap smarter. Live greener. See what's trending in eco living this week 🔗 #VerdantCo"],
    "watches":    ["⌚ Timeless. Iconic. Built to outlast trends. Shop luxury timepieces — link in bio 🔗 #TheWatchList #LuxuryWatch","👑 The right watch says everything without saying a word. Shop now 🔗 #TheWatchList #WatchOfTheDay","🏆 Investment pieces that never go out of style. Shop the edit 🔗 #TheWatchList #WatchCollector","✨ Crafted for those who appreciate the art of time. #TheWatchList #LuxuryTimepieces"],
    "sneakers":   ["👟 Fresh drops just landed. Shop now before they sell out — link in bio 🔗 #SolePrestige #Sneakers","🔥 The heat is real. New kicks just dropped 👟 Shop via link in bio #SolePrestige #SneakerHead","💎 Exclusive. Limited. Yours. Grab your pair now 🔗 #SolePrestige #PremiumSneakers","🚀 Step up your game. The freshest sneakers, curated for you 🔗 #SolePrestige"],
    "gaming":     ["🎮 Level up your setup. Shop gaming gear — link in bio 🔗 #AtelierGaming #GamingSetup","⚡ Your gear should match your skill. Shop now 🔗 #AtelierGaming #GamerLife","🏆 Dominate every session. Premium gaming gear curated for champions 🔗 #AtelierGaming","🎯 Play harder. Play smarter. Shop the Atelier Gaming collection 🔗 #AtelierGaming #Gaming"],
    "purses_bags": ["👜 The bag that says everything without a word. Shop luxury purses — link in bio 🔗 #CoutureGallery #LuxuryBags","💎 A great bag is an investment. Shop the Couture Gallery edit now 🔗 #CoutureGallery #DesignerBags","✨ New arrivals just dropped — purses worth every penny. Shop now 🔗 #CoutureGallery #Handbags","👛 From totes to clutches — the edit for those who know. Shop now 🔗 #CoutureGallery #LuxuryFashion"],
    "automotive": ["🏎️ Built for the road. Built for you. Shop car accessories — link in bio 🔗 #TheAutodrome #CarCulture","⚡ Your car deserves the best. Shop premium auto gear 🔗 #TheAutodrome #AutoLovers","🚗 Drive in style. Shop the latest automotive finds 🔗 #TheAutodrome #CarLife","🔧 Upgrade your ride today. Best gear, best prices 🔗 #TheAutodrome"],
    "fitness":    ["💪 No excuses. Just results. Shop fitness gear — link in bio 🔗 #PeakFit #Fitness","🏋️ Your grind deserves the best equipment. Shop now 🔗 #PeakFit #WorkoutGear","🔥 Train harder. Recover faster. Live better. Shop PeakFit 🔗 #PeakFit #GymLife","⚡ Elite performance starts with elite gear. Shop now 🔗 #PeakFit #FitnessGoals"],
    "travel":     ["✈️ The world is waiting. Shop travel essentials — link in bio 🔗 #TheEscapist #TravelLife","🌍 Adventure doesn't wait. Pack smart, travel light 🔗 #TheEscapist #Wanderlust","🏖️ Your next escape is one click away. Shop travel gear 🔗 #TheEscapist #TravelGram","🗺️ Luxury travel deals, curated just for you. Explore now 🔗 #TheEscapist"],
    "pets":       ["🐾 Your pet deserves the best. Shop premium pet products — link in bio 🔗 #PawVault #PetLovers","🐶 Because they give you everything. Give them the best 🔗 #PawVault #DogsOfInstagram","🐱 Spoil them a little (or a lot). Shop Paw Vault 🔗 #PawVault #CatsOfInstagram","❤️ Happy pets, happy home. Shop the full collection 🔗 #PawVault #PetCare"],
    "homedecor":  ["🏡 Your home should feel like a luxury retreat. Shop now — link in bio 🔗 #QuietLuxury #HomeDecor","✨ Understated elegance for every room. Shop the collection 🔗 #QuietLuxury #InteriorDesign","🕯️ Create your sanctuary. Shop Quiet Luxury home essentials 🔗 #QuietLuxury #HomeInspo","🏠 Less is more. Shop minimal luxury decor now 🔗 #QuietLuxury #MinimalistHome"],
    "skincare":   ["✨ Glow from within. Shop premium skincare — link in bio 🔗 #GlowProtocol #Skincare","💆 Your skin deserves a ritual, not a routine. Shop now 🔗 #GlowProtocol #SkinCareRoutine","🌟 Science-backed. Results-driven. Shop Glow Protocol 🔗 #GlowProtocol #GlowUp","💎 Luxury skincare that actually works. Shop now 🔗 #GlowProtocol #BeautyRoutine"],
    "fragrance":  ["🌸 A scent that leaves a lasting impression. Shop now — link in bio 🔗 #EssenceElite #Fragrance","✨ Wear confidence. Shop premium fragrances 🔗 #EssenceElite #Perfume","💎 Your signature scent is waiting. Shop the collection 🔗 #EssenceElite #LuxuryFragrance","🌹 Because how you smell is how you're remembered. Shop now 🔗 #EssenceElite"],
    "realestate": ["🏡 Your next investment starts here. Browse listings — link in bio 🔗 #PrimeLandNetwork #RealEstate","💰 Smart investors act early. See today's best property deals 🔗 #PrimeLandNetwork","🔑 Find your dream property. Verified listings, real opportunities 🔗 #PrimeLandNetwork #PropertyInvestment","🏘️ Land is the one thing they stopped making. Invest smart 🔗 #PrimeLandNetwork"],
    "tech":       ["📱 The best tech, curated. Shop now — link in bio 🔗 #TechScoutHQ #TechGadgets","⚡ Smarter tools for smarter people. Shop the latest tech 🔗 #TechScoutHQ #Technology","🔬 Innovation that fits in your hands. Shop now 🔗 #TechScoutHQ #Gadgets","💻 Level up your tech game. The best gadgets reviewed and linked 🔗 #TechScoutHQ"],
    "anime":      ["⚡ The culture never sleeps. Shop anime merch — link in bio 🔗 #DreamingAnime #Anime","🎌 Wear your passion. Shop exclusive anime collections 🔗 #DreamingAnime #AnimeLife","🌸 For the ones who bleed the culture. Shop now 🔗 #DreamingAnime #OtakuLife","🔥 New drops just hit. Shop the Dreaming Anime collection 🔗 #DreamingAnime #AnimeMerch"],
    "selfcare":   ["💆 You deserve to feel your best. Shop self-care essentials — link in bio 🔗 #Selfly #SelfCare","🌸 Invest in yourself daily. Shop now 🔗 #Selfly #WellBeing","✨ Glow up, inside and out. Shop Selfly 🔗 #Selfly #PersonalDevelopment","💪 Self-care isn't selfish. It's essential. Shop now 🔗 #Selfly"],
    "workspace":  ["🖥️ Build the workspace of your dreams. Shop now — link in bio 🔗 #Deskwell #HomeOffice","⚡ Your environment shapes your output. Upgrade your desk setup 🔗 #Deskwell #WorkFromHome","💼 Work smarter. Look better doing it. Shop Deskwell 🔗 #Deskwell #DeskSetup","✨ The best setups start here. Shop premium workspace gear 🔗 #Deskwell"],
    "food":       ["🍽️ Caribbean flavours, global reach. Shop Pantriq — link in bio 🔗 #Pantriq #CaribbeanFood","🌶️ Cook with confidence. Get the best Caribbean ingredients & recipes 🔗 #Pantriq #FoodLovers","🥘 Your kitchen deserves the best. Shop Pantriq now 🔗 #Pantriq #HomeCooking","🍳 From our kitchen to yours. Shop Caribbean essentials 🔗 #Pantriq"],
}

# ── POST TYPES ──
# post_type: "text" | "photo" | "video"
SCHEDULE = [
    {"hour": 8,  "type": "text"},
    {"hour": 11, "type": "photo"},
    {"hour": 14, "type": "photo"},
    {"hour": 19, "type": "video"},
]

def post_to_facebook(page_id, token, message, link=None, photo_url=None):
    """Post text or photo to a Facebook page."""
    if not page_id or not token:
        return {"error": "No page ID or token"}

    if photo_url:
        # Photo post
        endpoint = f"https://graph.facebook.com/v19.0/{page_id}/photos"
        payload = {"url": photo_url, "caption": message, "access_token": token}
    else:
        # Text/link post
        endpoint = f"https://graph.facebook.com/v19.0/{page_id}/feed"
        payload = {"message": message, "access_token": token}
        if link:
            payload["link"] = link

    data = urllib.parse.urlencode(payload).encode()
    req = urllib.request.Request(endpoint, data=data, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")

    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            resp = json.loads(r.read())
            return resp
    except urllib.error.HTTPError as e:
        return {"error": e.read().decode()[:200]}
    except Exception as e:
        return {"error": str(e)}

def post_to_instagram(ig_id, token, caption, image_url):
    """Post a photo to Instagram Business account via Graph API (two-step: create container → publish)."""
    if not ig_id or not token or not image_url:
        return {"error": "Missing ig_id, token, or image_url"}

    try:
        # Step 1: Create media container
        container_url = f"https://graph.facebook.com/v19.0/{ig_id}/media"
        payload1 = urllib.parse.urlencode({
            "image_url": image_url,
            "caption": caption,
            "access_token": token,
        }).encode()
        req1 = urllib.request.Request(container_url, data=payload1, method="POST")
        req1.add_header("Content-Type", "application/x-www-form-urlencoded")
        with urllib.request.urlopen(req1, timeout=30) as r:
            container = json.loads(r.read())

        container_id = container.get("id")
        if not container_id:
            return {"error": f"Container failed: {container}"}

        # Step 2: Publish the container
        publish_url = f"https://graph.facebook.com/v19.0/{ig_id}/media_publish"
        payload2 = urllib.parse.urlencode({
            "creation_id": container_id,
            "access_token": token,
        }).encode()
        req2 = urllib.request.Request(publish_url, data=payload2, method="POST")
        req2.add_header("Content-Type", "application/x-www-form-urlencoded")
        with urllib.request.urlopen(req2, timeout=30) as r:
            result = json.loads(r.read())
        return result

    except urllib.error.HTTPError as e:
        return {"error": e.read().decode()[:300]}
    except Exception as e:
        return {"error": str(e)}

def post_reel_to_instagram(ig_id, token, video_path, caption):
    """Post a video as an Instagram Reel (two-step: upload container → publish).
    Requires a publicly accessible video URL — we upload to a temp host first.
    For Drive videos, we use the Facebook video upload endpoint to get a public URL.
    """
    try:
        import subprocess

        # Step 1: Get a public URL for the video via Facebook's resumable upload
        # Upload video to FB as unpublished to get a shareable URL
        upload_url = f"https://graph.facebook.com/v19.0/{ig_id}/media"

        # For IG Reels we need a public video_url
        # Upload file to a temp endpoint using multipart
        with open(video_path, "rb") as vf:
            video_data = vf.read()

        # Use Facebook's video upload to get hosted URL
        boundary = "IGReelBoundary"
        body = (
            f"--{boundary}\r\n"
            f'Content-Disposition: form-data; name="media_type"\r\n\r\nREELS\r\n'
            f"--{boundary}\r\n"
            f'Content-Disposition: form-data; name="caption"\r\n\r\n{caption}\r\n'
            f"--{boundary}\r\n"
            f'Content-Disposition: form-data; name="access_token"\r\n\r\n{token}\r\n'
            f"--{boundary}\r\n"
            f'Content-Disposition: form-data; name="video_url"\r\n\r\n'
        ).encode()

        # For local files, we need to upload via multipart
        # IG Reels API requires video_url (public) or upload_type=resumable
        # Use resumable upload protocol
        init_url = f"https://graph.facebook.com/v19.0/{ig_id}/media"
        init_payload = urllib.parse.urlencode({
            "media_type": "REELS",
            "upload_type": "resumable",
            "caption": caption,
            "access_token": token,
        }).encode()
        req_init = urllib.request.Request(init_url, data=init_payload, method="POST")
        req_init.add_header("Content-Type", "application/x-www-form-urlencoded")
        with urllib.request.urlopen(req_init, timeout=30) as r:
            init_result = json.loads(r.read())

        container_id = init_result.get("id")
        upload_endpoint = init_result.get("uri")

        if not container_id or not upload_endpoint:
            return {"error": f"Reel init failed: {init_result}"}

        # Step 2: Upload video bytes to the upload endpoint
        req_upload = urllib.request.Request(upload_endpoint, data=video_data, method="POST")
        req_upload.add_header("Authorization", f"OAuth {token}")
        req_upload.add_header("Content-Type", "video/mp4")
        req_upload.add_header("offset", "0")
        req_upload.add_header("file_size", str(len(video_data)))
        with urllib.request.urlopen(req_upload, timeout=120) as r:
            upload_result = json.loads(r.read())

        if not upload_result.get("success"):
            return {"error": f"Reel upload failed: {upload_result}"}

        # Step 3: Publish the reel
        pub_url = f"https://graph.facebook.com/v19.0/{ig_id}/media_publish"
        pub_payload = urllib.parse.urlencode({
            "creation_id": container_id,
            "access_token": token,
        }).encode()
        req_pub = urllib.request.Request(pub_url, data=pub_payload, method="POST")
        req_pub.add_header("Content-Type", "application/x-www-form-urlencoded")
        with urllib.request.urlopen(req_pub, timeout=30) as r:
            result = json.loads(r.read())
        return result

    except urllib.error.HTTPError as e:
        return {"error": e.read().decode()[:300]}
    except Exception as e:
        return {"error": str(e)}

def get_caption(niche):
    caps = CAPTIONS.get(niche, ["Check out our latest collection — link in bio 🔗"])
    return random.choice(caps)

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

def get_ai_image_url(niche_keyword, style="product"):
    try:
        import json as _json
        with open("photo_library.json") as f:
            library = _json.load(f)
        niche_map = {
            "eco": "verdant-co", "watches": "the-watch-list", "sneakers": "sole-prestige",
            "gaming": "atelier-gaming", "fashion": "couture-gallery", "fragrance": "essence-elite",
            "skincare": "glow-protocol", "fitness": "peak-fit", "travel": "the-escapist",
            "pets": "paw-vault", "luxury": "quiet-luxury", "realestate": "prime-land-network",
            "tech": "tech-scout", "automotive": "the-autodrome", "christian": "the-way-made-known",
            "selfcare": "nehneh", "food": "pantriq", "workspace": "selfly",
        }
        slug = niche_map.get(niche_keyword.lower(), niche_keyword)
        photos = library.get(slug, [])
        if photos:
            from datetime import datetime
            idx = datetime.now().timetuple().tm_yday % len(photos)
            return photos[idx]["url"]
    except Exception:
        pass
    return "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg"


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

def find_ig_safe_image(brand_name, preferred_url):
    """Return a reliable Instagram-safe image URL.
    Brand-specific rules:
    - Dreaming Anime: anime merch product images only, NO stock photos
    - Prisca Dezigns: purple brand images (Pexels design/tech)
    - All others: Amazon product image first, Picsum niche fallback — NO Unsplash
    """
    brand_lower = brand_name.lower().strip()

    # PRISCA DEZIGNS — purple brand images only
    if "prisca" in brand_lower:
        return get_prisca_brand_image()

    # DREAMING ANIME — anime product images only, no stock
    if "dreaming anime" in brand_lower or "anime" in brand_lower:
        # Only use actual anime product images from catalog
        slug = BRAND_TO_SLUG.get(brand_name, "dreaming-anime")
        try:
            with open("product_data.json") as f:
                pdata = json.load(f)
            products = [p for p in pdata.get(slug, []) if p.get("image","").startswith("http")]
            if products:
                import random
                return random.choice(products)["image"]
        except Exception:
            pass
        # If no product images, use preferred (Amazon product) URL only
        if preferred_url and preferred_url.startswith("http") and "amazon" not in preferred_url.lower() and is_safe_image_url(preferred_url):
            return preferred_url
        return preferred_url  # Amazon product image — best we have

    # ALL OTHER BRANDS — Amazon product image first, Picsum fallback (NO Unsplash)
    slug = BRAND_TO_SLUG.get(brand_name, "")

    candidates = []
    if preferred_url and preferred_url.startswith("http"):
        candidates.append(preferred_url)

    if slug:
        try:
            with open("product_data.json") as f:
                pdata = json.load(f)
            for p in pdata.get(slug, []):
                img = p.get("image", "")
                if img and img.startswith("http") and img not in candidates:
                    candidates.append(img)
        except Exception:
            pass

    # Try each candidate — accept IG ratio range (0.5–1.91)
    for url in candidates:
        try:
            ratio = get_image_ratio(url)
            if ratio and 0.5 <= ratio <= 1.91:
                return url
        except Exception:
            continue

    # Picsum fallback by niche (deterministic, reliable, NO Unsplash)
    niche_map = {
        "verdant": "eco", "watch": "watches", "sole": "sneakers",
        "atelier": "gaming", "couture": "fashion", "essence": "fragrance",
        "glow": "skincare", "peak": "fitness", "escapist": "travel",
        "paw": "pets", "quiet": "luxury", "selfly": "skincare",
        "prime land": "real estate", "tech scout": "tech",
        "pantriq": "food", "autodrome": "automotive", "deskwell": "workspace",
        "way made known": "christian", "nehneh": "fashion",
    }
    for key, niche in niche_map.items():
        if key in brand_lower:
            return get_ai_image_url(niche)

    return get_ai_image_url("luxury")

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

    caption = get_caption(niche)
    aff_link = get_affiliate_link(aff, niche)
    ig_result = ""  # populated for photo posts that hit Instagram

    if post_type == "text":
        # Plain text post with affiliate link
        message = caption + f"\n\nShop here: {aff_link}"
        result = post_to_facebook(page_id, token, message)

    elif post_type == "photo":
        # Post with caption — photo posting requires an actual image URL
        # Using a relevant placeholder from Unsplash (free, no auth needed)
        photo_keywords = {
            "eco": "sustainable+living", "watches": "luxury+watch", "sneakers": "sneakers",
            "gaming": "gaming+setup", "fashion": "fashion+style", "automotive": "luxury+car",
            "fitness": "gym+workout", "travel": "travel+adventure", "pets": "cute+pet",
            "homedecor": "home+decor", "skincare": "skincare", "fragrance": "perfume+bottle",
            "realestate": "luxury+home", "tech": "technology+gadget", "anime": "anime+art",
            "selfcare": "self+care", "workspace": "desk+setup", "food": "caribbean+food",
        }
        kw = photo_keywords.get(niche, niche)

        # Try to use a real product from product_data.json
        product_used = None
        try:
            with open("product_data.json") as pf:
                pdata = json.load(pf)
            slug = BRAND_TO_SLUG.get(brand_name, "")
            products = pdata.get(slug, [])
            # Pick a product with a real image; rotate by day
            day_idx = datetime.now().timetuple().tm_yday
            real_products = [p for p in products if p.get("image") and p.get("link")]
            if real_products:
                product_used = real_products[day_idx % len(real_products)]
                photo_url = product_used["image"]
                aff_link = product_used["link"]
                caption = (
                    f"✨ {product_used['name']}\n\n"
                    f"💵 ${product_used.get('price', 0):.2f} USD  |  "
                    f"TT${round(product_used.get('price', 0) * RATE, 2):.2f} TTD\n\n"
                    f"🛒 Shop now → {aff_link}\n\n"
                    f"#{''.join(tag.split())} #AmazonFinds #ShopNow"
                )
            else:
                # NO Unsplash — use Picsum niche fallback
                photo_url = get_ai_image_url(niche)
        except Exception:
            photo_url = get_ai_image_url(niche)

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
            f"🎬 Watch this and tell us what you think!\n\n"
            f"{caption}\n\n"
            f"👉 Shop now: {aff_link}\n\n"
            f"#{''.join(tag.split())} #Reels #Video"
        )
        result = post_to_facebook(page_id, token, video_caption)
    else:
        return f"❌ {brand_name} — unknown post_type: {post_type}"

    if "id" in result:
        return f"✅ {brand_name} [{post_type}] FB:{result['id']}{ig_result}"
    else:
        return f"❌ {brand_name} [{post_type}] FAILED — {result.get('error','unknown')}"

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
    return results

if __name__ == "__main__":
    # Auto-refresh tokens at start of every run
    refresh_tokens_from_credential()

    post_type = sys.argv[1] if len(sys.argv) > 1 else "text"
    group_index = int(sys.argv[2]) if len(sys.argv) > 2 else None
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
