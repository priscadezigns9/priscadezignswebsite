"""
Daily Image Generator — runs at 8AM AST
Generates one social post image per empire brand using niche_products_photos.json,
uploads each to Google Drive (Empire Backups > Brand Social Posts > YYYY-MM-DD),
then sends a WhatsApp message to Prisca with all Drive preview links for approval.

Approval workflow:
- Prisca replies: APPROVE [Brand] or REJECT [Brand]
- approved_images.json is updated accordingly
- daily_poster.py only posts brands with approved=true for today
"""

import json, os, urllib.request, urllib.parse, subprocess
from datetime import date, datetime

TODAY = date.today().isoformat()
NOW = datetime.now().strftime("%H:%M AST")

BRANDS = [
    "Atelier Gaming",
    "Glow Protocol",
    "Essence Elite",
    "Peak Fit",
    "Sole Prestige",
    "Quiet Luxury",
    "The Watch List",
    "The Autodrome",
    "The Escapist",
    "Verdant Co.",
    "Paw Vault",
    "Couture Gallery",
    "Dreaming Anime",
    "Prime Land Network",
]

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
    "Prime Land Network": "prime-land-network",
    "The Autodrome":      "the-autodrome",
}

# Google Drive folder IDs
DRIVE_ROOT = "1n9470_JxCe5H9-xFQZsNhzh7uj7vPsAc"  # Brand Social Posts — Empire 2026

APPROVED_FILE = "approved_images.json"
PHOTOS_FILE = "niche_products_photos.json"

WHATSAPP_NUMBER = "18683424101"


def get_todays_image_url(brand_name):
    """Get today's product image URL for a brand from niche_products_photos.json"""
    slug = BRAND_TO_SLUG.get(brand_name, brand_name.lower().replace(" ", "-").replace(".", ""))
    try:
        with open(PHOTOS_FILE) as f:
            photos_data = json.load(f)
    except Exception as e:
        print(f"  Could not load {PHOTOS_FILE}: {e}")
        return None, None

    products = photos_data.get(slug, [])
    if not products:
        print(f"  No products found for slug: {slug}")
        return None, None

    day_num = date.today().timetuple().tm_yday
    product_idx = day_num % len(products)
    product = products[product_idx]

    images = product.get("images", [])
    if not images:
        # Try top-level image field
        img = product.get("image", "")
        if img:
            return img, product.get("name", "")
        return None, None

    hour_slot = datetime.now().hour
    photo_idx = (day_num * 7 + hour_slot) % len(images)
    return images[photo_idx], product.get("name", "")


def download_image(url, dest_path):
    """Download image from URL to local path."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as r:
            data = r.read()
        with open(dest_path, "wb") as f:
            f.write(data)
        return True
    except Exception as e:
        print(f"  Download failed: {e}")
        return False


def upload_to_drive(local_path, filename, parent_folder_id):
    """Upload file to Google Drive using gog drive upload. Returns file ID or None."""
    try:
        result = subprocess.run(
            ["gog", "drive", "upload", local_path,
             "--name", filename,
             "--parent", parent_folder_id],
            capture_output=True, text=True, timeout=60
        )
        output = result.stdout + result.stderr
        print(f"  Drive upload output: {output[:200]}")
        # Parse file ID from output
        for line in output.split("\n"):
            if "drive.google.com" in line or "ID:" in line or "id:" in line.lower():
                # Extract ID
                import re
                ids = re.findall(r'[A-Za-z0-9_-]{25,}', line)
                if ids:
                    return ids[0]
        return None
    except Exception as e:
        print(f"  Drive upload error: {e}")
        return None


def get_drive_link(file_id):
    return f"https://drive.google.com/file/d/{file_id}/view"


def send_whatsapp(message):
    """Send WhatsApp message via wpp-cli."""
    try:
        result = subprocess.run(
            ["wpp-cli", "send", WHATSAPP_NUMBER, message],
            capture_output=True, text=True, timeout=30
        )
        return result.returncode == 0
    except Exception as e:
        print(f"  WhatsApp send error: {e}")
        return False


def main():
    print(f"\n=== Image Approval Generator — {TODAY} {NOW} ===\n")

    # Load or create approved_images.json — reset today's entries
    try:
        with open(APPROVED_FILE) as f:
            approved_data = json.load(f)
    except Exception:
        approved_data = {}

    # Create dated Drive subfolder for today's images
    # Try to create subfolder under Brand Social Posts folder
    dated_folder_id = DRIVE_ROOT  # fallback: upload to root social posts folder

    os.makedirs("/tmp/empire_imgs", exist_ok=True)

    results = []  # list of (brand_name, image_url, drive_link, success)

    for brand_name in BRANDS:
        print(f"\n[{brand_name}]")

        # Get today's image URL
        img_url, product_name = get_todays_image_url(brand_name)
        if not img_url:
            print(f"  ⚠️  No image URL found — skipping")
            results.append((brand_name, None, None, False))
            continue

        print(f"  Image URL: {img_url[:80]}")

        # Download image
        slug = BRAND_TO_SLUG.get(brand_name, brand_name.lower().replace(" ", "-").replace(".", ""))
        local_path = f"/tmp/empire_imgs/{slug}_{TODAY}.jpg"
        if not download_image(img_url, local_path):
            print(f"  ⚠️  Could not download image")
            results.append((brand_name, img_url, None, False))
            continue

        # Upload to Drive
        filename = f"{brand_name} — Post {TODAY}.jpg"
        file_id = upload_to_drive(local_path, filename, dated_folder_id)

        if file_id:
            drive_link = get_drive_link(file_id)
            print(f"  ✅ Uploaded to Drive: {drive_link}")
        else:
            # Still use the direct image URL for approval even if Drive upload failed
            drive_link = img_url
            print(f"  ⚠️  Drive upload failed — using direct image URL")

        # Register in approved_images.json as pending (approved=false)
        approved_data[brand_name] = {
            "date": TODAY,
            "approved": False,
            "image_url": img_url,
            "drive_url": drive_link,
            "product": product_name or ""
        }

        results.append((brand_name, img_url, drive_link, True))

    # Save updated approved_images.json
    with open(APPROVED_FILE, "w") as f:
        json.dump(approved_data, f, indent=2)
    print(f"\n✅ Saved approved_images.json with {len(results)} brands pending approval")

    # Build WhatsApp approval message
    lines = [f"🎨 *Daily Social Images Ready — {TODAY}*", f"Review and reply APPROVE or REJECT for each:\n"]

    for brand_name, img_url, drive_link, success in results:
        if success and drive_link:
            lines.append(f"*{brand_name}*\n{drive_link}\n")
        elif img_url:
            lines.append(f"*{brand_name}*\n{img_url}\n")
        else:
            lines.append(f"*{brand_name}* — ⚠️ no image generated\n")

    lines.append("Reply: *APPROVE [Brand Name]* or *REJECT [Brand Name]*")
    lines.append("Example: APPROVE Atelier Gaming")
    lines.append(f"\nPhoto posts scheduled for 11AM AST. Approve by 10:30AM.")

    message = "\n".join(lines)
    print(f"\n=== Sending WhatsApp approval request ===")
    print(message[:500])

    ok = send_whatsapp(message)
    if ok:
        print("\n✅ WhatsApp approval request sent!")
    else:
        print("\n❌ WhatsApp send failed")

    print(f"\n=== Done. {sum(1 for _,_,_,s in results if s)}/{len(BRANDS)} images ready for approval ===")


if __name__ == "__main__":
    main()
