const SHOP_MAP = {
    "electronics": "https://priscadezigns.org/thetechscouthq/shop/",
    "shoes": "https://priscadezigns.org/soleprestige/shop/",
    "fitness": "https://priscadezigns.org/peakfit/shop/",
    "beauty": "https://priscadezigns.org/glowprotocol/shop/",
    "pets": "https://priscadezigns.org/pawvault/shop/",
    "home": "https://priscadezigns.org/quietluxury/shop/",
    "watches": "https://priscadezigns.org/thewatchlist/shop/",
    "cars": "https://priscadezigns.org/theautodrome/shop/",
    "fashion": "https://priscadezigns.org/couturegallery/shop/",
    "fragrance": "https://priscadezigns.org/essenceelite/shop/"
};

const CATEGORY_KEYWORDS = {
    "electronics": ["laptop", "phone", "monitor", "keyboard", "mouse", "camera", "tech", "gadget", "gpu", "cpu"],
    "shoes": ["sneakers", "boots", "sandals", "shoes", "footwear", "runners"],
    "fitness": ["gym", "workout", "protein", "dumbbells", "yoga", "fitness", "supplements"],
    "beauty": ["skincare", "serum", "cream", "makeup", "beauty", "dermatology"],
    "pets": ["dog", "cat", "pet", "kibble", "leash", "aquarium"],
    "home": ["decor", "furniture", "lamp", "cushion", "rug", "kitchen"],
    "watches": ["watch", "timepiece", "rolex", "casio", "seiko", "chronograph"],
    "cars": ["car", "automotive", "oil", "wax", "tire", "parts"],
    "fashion": ["clothing", "shirt", "pants", "dress", "luxury", "purse", "bag"],
    "fragrance": ["perfume", "cologne", "scent", "fragrance"]
};

if (typeof module !== 'undefined') {
    module.exports = { SHOP_MAP, CATEGORY_KEYWORDS };
}
