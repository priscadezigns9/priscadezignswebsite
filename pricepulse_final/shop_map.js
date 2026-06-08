const SHOP_MAP = [
  { keywords: ["electronics", "tech", "laptop", "phone", "camera", "computer", "tablet", "audio"], name: "Tech Scout HQ", url: "https://priscadezigns.org/thetechscouthq/shop/" },
  { keywords: ["shoe", "sneaker", "boot", "heel", "footwear", "sandal"], name: "Sole Prestige", url: "https://priscadezigns.org/soleprestige/shop/" },
  { keywords: ["fitness", "gym", "protein", "supplement", "yoga", "exercise", "workout"], name: "Peak Fit", url: "https://priscadezigns.org/peakfit/shop/" },
  { keywords: ["skincare", "serum", "moisturizer", "beauty", "makeup", "face", "cosmetic"], name: "Glow Protocol", url: "https://priscadezigns.org/glowprotocol/shop/" },
  { keywords: ["pet", "dog", "cat", "fish", "bird", "animal", "leash", "kibble"], name: "Paw Vault", url: "https://priscadezigns.org/pawvault/shop/" },
  { keywords: ["home", "decor", "furniture", "candle", "pillow", "curtain", "rug"], name: "Quiet Luxury", url: "https://priscadezigns.org/quietluxury/shop/" },
  { keywords: ["watch", "timepiece", "wrist"], name: "The Watch List", url: "https://priscadezigns.org/thewatchlist/shop/" },
  { keywords: ["car", "auto", "vehicle", "tire", "motor", "automotive", "engine"], name: "The Autodrome", url: "https://priscadezigns.org/theautodrome/shop/" },
  { keywords: ["perfume", "fragrance", "cologne", "scent"], name: "Essence Elite", url: "https://priscadezigns.org/essenceelite/shop/" },
  { keywords: ["bag", "purse", "handbag", "fashion", "clothing", "dress", "shirt"], name: "Couture Gallery", url: "https://priscadezigns.org/couturegallery/shop/" }
];

function getRecommendedShop(title) {
  if (!title) return null;
  const lowerTitle = title.toLowerCase();
  for (const shop of SHOP_MAP) {
    if (shop.keywords.some(keyword => lowerTitle.includes(keyword))) {
      return shop;
    }
  }
  return null;
}
