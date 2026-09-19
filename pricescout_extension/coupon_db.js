const COUPON_DB = {
    "amazon.com": ["SAVE10", "PRISCION20", "SCOUT5", "AMZN2026"],
    "ebay.com": ["EBAY10", "POWERSELL", "COLLECT20", "VINTAGE5"],
    "etsy.com": ["HANDMADE10", "ARTISAN20", "ETSYLOVE", "PRISCIONSET"],
    "walmart.com": ["WALMART20", "GROCERY5", "BACKTOSCHOOL", "ROLLBACK"],
    "bestbuy.com": ["TECH10", "GEEKSQUAD", "BESTBUY20", "MEMBER15"],
    "nike.com": ["JUSTDOIT", "SWOOSH10", "RUNNER20"],
    "adidas.com": ["STRIPES20", "ULTRABOOST", "ADIDAS5"],
    "target.com": ["BULLSEYE", "TARGET10", "SAVE5"],
    "newegg.com": ["EGGHEAD", "BUILDPC", "NEWEGG20"],
    "zappos.com": ["ZAPPOS10", "FASTSHIP", "COZYFOOT"],
    "overstock.com": ["HOME5", "FURNISH20", "OVERSTOCK10"],
    "wayfair.com": ["MYWAY", "HOME15", "WAYFAIR20"],
    "macys.com": ["MACYS10", "STYLE20", "FASHION5"],
    "sephora.com": ["GLOW10", "BEAUTY5", "SEPHORA20"],
    "ulta.com": ["ULTA10", "GLAM20", "SAVEBIG"],
    "chewy.com": ["PAW10", "PUPPY20", "CHEWY5"],
    "petco.com": ["PETCO10", "FISH20", "AQUARIUM"],
    "homedepot.com": ["BUILD10", "HOMEFIX", "DEPOT5"],
    "lowes.com": ["LOWES10", "PROJECT20", "GARDEN5"]
};

// Add generic ones to fill up to 50+
const GENERIC_COUPONS = ["SAVE10", "SAVE20", "PRISCION", "WELCOME10", "FREESHIP", "DISCOUNT", "SUMMER20", "WINTER20", "DEAL", "COUPON"];

if (typeof module !== 'undefined') {
    module.exports = { COUPON_DB, GENERIC_COUPONS };
}
