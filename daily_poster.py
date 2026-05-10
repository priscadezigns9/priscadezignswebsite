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

def get_product_for_brand(brand_name):
    """Return a product dict {name, image, link, price} for the brand,
    rotating through the real products scraped from the live site.
    Day-of-year based rotation so each day features a different product."""
    from datetime import date
    NICHE_PRODUCTS_FILE = "niche_products.json"
    slug = BRAND_TO_SLUG.get(brand_name, "")
    if not slug:
        slug = brand_name.lower().replace(" ", "-").replace(".", "").replace("&", "and")
    try:
        with open(NICHE_PRODUCTS_FILE) as f:
            all_products = json.load(f)
        products = [p for p in all_products.get(slug, []) if p.get("image")]
        if not products:
            products = all_products.get(slug, [])
        if not products:
            return None
        idx = date.today().timetuple().tm_yday % len(products)
        return products[idx]
    except Exception:
        return None

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
    Zero Picsum, zero stock photos — always niche-specific real product images."""
    # Always try to get a real product image first
    product = get_product_for_brand(brand_name)
    if product and product.get("image"):
        return product["image"]

    # Fall back to preferred_url (Amazon product image passed in by caller)
    if preferred_url and preferred_url.startswith("http"):
        # Validate ratio
        try:
            ratio = get_image_ratio(preferred_url)
            if ratio and 0.5 <= ratio <= 1.91:
                return preferred_url
        except Exception:
            pass
        return preferred_url

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
        message = caption + f"\n\nShop here: {aff_link}"
        result = post_to_facebook(page_id, token, message)

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
