# MY_RULES.md - Your Rules

## EMPIRE PRODUCT & ASSET PROTOCOL (MANDATORY)

### 1. Amazon Asset Migration (Permanent Storage)
- **NEVER** rely solely on external Amazon `images-na` or `m.media-amazon` URLs for long-term production.
- **MANDATORY:** Every new product added to a shop must have its primary visual uploaded to the corresponding niche folder in `EMPIRE_AMAZON_PRODUCT_PHOTOS` on Google Drive.
- **Workflow:**
    1. Identify Product/ASIN.
    2. Download High-Res Image.
    3. Convert to WebP (Quality 80, Max Width 1200px).
    4. Upload to Drive: `EMPIRE_AMAZON_PRODUCT_PHOTOS/<niche>/<ASIN>_<Name>.webp`.
    5. Use the Drive permanent link (or the `m.media-amazon` fallback) in the HTML.

### 2. Product Refresh & Trending Rules
- **Monthly Rotation:** At least 3 products per niche should be rotated monthly to keep the shop "trending."
- **ASIN Validation:** Before adding a product, perform a `HEAD` check on the image. If Content-Length is 9 bytes → **REJECT**.
- **Change Logging:** Every product change must be logged in `SITE_CHANGELOG.md` under a `## [] SHOP UPDATE — <NICHE>` heading.

### 3. SEO & Geotagging
- Every new shop or index page must include the Port of Spain, TT geotags and updated Open Graph metadata.
