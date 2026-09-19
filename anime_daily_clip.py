#!/usr/bin/env python3
"""
Anime Daily Clip Fetcher
========================
Every day:
1. Check what anime is trending (animetwixtor.com latest posts)
2. Pick the best clip that hasn't been used yet
3. Download it (via Google Drive or direct link)
4. Upload to Dreaming Anime Drive folder (1jRm7LZV7H_ZMFYDThO-zsNakAL75nWVO)
5. Log it so we don't repeat

Run via cron daily at 6AM AST (before the 8AM post cycle).
"""

import subprocess, json, os, re, time, urllib.request, urllib.error, tempfile, shutil
from datetime import datetime

WORKSPACE   = "/app/workspace/66a7cb29-e253-456c-9bc0-7a027f5b3922/f01e5bf5-d543-4a86-92a9-b8f6da449c65"
DRIVE_FOLDER = "1jRm7LZV7H_ZMFYDThO-zsNakAL75nWVO"   # Dreaming Anime folder
LOG_FILE    = f"{WORKSPACE}/anime_clip_log.json"
CACHE_DIR   = f"{WORKSPACE}/dreaming_anime/cache"
os.makedirs(CACHE_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}

# ── Trending anime list (updated weekly; mix of current season + evergreen) ──
# Priority order: most trending first. Script picks the first one with a clip available.
TRENDING_ANIME = [
    # Spring 2026 current season
    "witch hat atelier", "re zero", "daemons shadow realm", "classroom elite",
    "reincarnated slime", "dr stone", "dorohedoro",
    # Ongoing evergreens
    "one piece", "jujutsu kaisen", "demon slayer", "naruto", "attack on titan",
    "my hero academia", "dragon ball", "solo leveling", "chainsaw man",
    "bleach", "vinland saga", "hunter x hunter", "fullmetal alchemist",
]

def load_log():
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE) as f:
            return json.load(f)
    return {"used_urls": [], "used_titles": []}

def save_log(log):
    with open(LOG_FILE, "w") as f:
        json.dump(log, f, indent=2)

def fetch_html(url):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"  fetch error {url}: {e}")
        return ""

def scrape_animetwixtor_posts():
    """Get all post URLs from animetwixtor.com (pages 1-3)."""
    posts = []
    for page in [1, 2, 3]:
        url = "https://animetwixtor.com/" if page == 1 else f"https://animetwixtor.com/page/{page}/"
        html = fetch_html(url)
        if not html:
            continue
        found = re.findall(r'href="(https://animetwixtor\.com/[a-z0-9\-]+/)"', html)
        SKIP = {"category", "author", "page", "feed", "wp-json", "tag", "categories", "search", "contact", "about", "privacy"}
        for u in found:
            slug = u.rstrip("/").split("/")[-1]
            if u not in posts and not any(s in slug for s in SKIP) and u != "https://animetwixtor.com/":
                posts.append(u)
        time.sleep(0.5)
    return posts

def scrape_animeworldtwixtor_posts():
    """Get recent post URLs from animeworldtwixtor.com."""
    posts = []
    html = fetch_html("https://www.animeworldtwixtor.com/anime-clips-raw/")
    if html:
        found = re.findall(r'href="(https://(?:www\.)?animeworldtwixtor\.com/[a-z0-9\-]+/)"', html)
        for u in found:
            if u not in posts and "category" not in u and "author" not in u and "page" not in u:
                posts.append(u)
    return posts

def score_post(url, title, log):
    """Score a post: higher = more relevant & trending. Returns (score, anime_name)."""
    if url in log.get("used_urls", []):
        return -1, ""
    url_lower = url.lower()
    title_lower = (title or "").lower()
    combined = url_lower + " " + title_lower
    
    for i, anime in enumerate(TRENDING_ANIME):
        keywords = anime.split()
        if all(kw in combined for kw in keywords):
            # Higher score for more trending (lower index = more trending)
            score = len(TRENDING_ANIME) - i + 10
            # Bonus for 4K
            if "4k" in combined:
                score += 5
            # Bonus for recent (in URL slug suggests recent)
            return score, anime
    return 0, ""

def extract_drive_link(html):
    """Extract Google Drive file ID from page HTML."""
    # Match various Drive URL patterns
    patterns = [
        r'drive\.google\.com/file/d/([A-Za-z0-9_\-]{20,})',
        r'drive\.google\.com/open\?id=([A-Za-z0-9_\-]{20,})',
        r'drive\.google\.com/uc\?id=([A-Za-z0-9_\-]{20,})',
        r'docs\.google\.com/file/d/([A-Za-z0-9_\-]{20,})',
    ]
    for pat in patterns:
        m = re.search(pat, html)
        if m:
            return m.group(1)
    return None

def download_drive_file(file_id, dest_path):
    """Download a Google Drive file by ID using gog CLI."""
    print(f"  Downloading Drive file: {file_id}")
    result = subprocess.run(
        ["gog", "drive", "download", file_id, "--output", dest_path],
        capture_output=True, text=True, timeout=300
    )
    if result.returncode == 0 and os.path.exists(dest_path):
        size = os.path.getsize(dest_path)
        print(f"  Downloaded: {size // (1024*1024)}MB")
        return True
    # Fallback: wget/curl with Drive export URL
    print(f"  gog download failed, trying direct...")
    try:
        dl_url = f"https://drive.google.com/uc?export=download&id={file_id}&confirm=t"
        subprocess.run(
            ["curl", "-L", "-o", dest_path, dl_url],
            timeout=300, check=True
        )
        if os.path.exists(dest_path) and os.path.getsize(dest_path) > 100000:
            return True
    except Exception as e:
        print(f"  Direct download error: {e}")
    return False

def upload_to_drive(local_path, filename):
    """Upload file to Dreaming Anime Drive folder."""
    print(f"  Uploading {filename} to Drive folder...")
    result = subprocess.run(
        ["gog", "drive", "upload", local_path,
         "--parent", DRIVE_FOLDER,
         "--name", filename],
        capture_output=True, text=True, timeout=300
    )
    if result.returncode == 0:
        print(f"  ✅ Uploaded to Drive: {filename}")
        return True
    else:
        print(f"  ❌ Upload failed: {result.stderr[:200]}")
        return False

def find_and_download_clip():
    """Main logic: find best trending clip, download, upload to Drive."""
    log = load_log()
    today = datetime.now().strftime("%Y-%m-%d")
    
    # Check if already ran today
    if log.get("last_run") == today:
        print(f"Already fetched a clip today ({today}). Skipping.")
        return False
    
    print(f"🎌 Anime Daily Clip — {today}")
    print("Scraping clip sites...")
    
    # Gather all posts from both sites
    all_posts = []
    posts_at  = scrape_animetwixtor_posts()
    posts_awt = scrape_animeworldtwixtor_posts()
    print(f"  animetwixtor.com: {len(posts_at)} posts")
    print(f"  animeworldtwixtor.com: {len(posts_awt)} posts")
    all_posts = posts_at + posts_awt
    
    if not all_posts:
        print("❌ No posts found. Aborting.")
        return False
    
    # Score all posts to find best trending clip
    candidates = []
    for url in all_posts:
        # Quick title guess from URL slug
        slug_title = url.rstrip("/").split("/")[-1].replace("-", " ")
        score, anime = score_post(url, slug_title, log)
        if score > 0:
            candidates.append((score, url, anime))
    
    candidates.sort(reverse=True)
    print(f"  {len(candidates)} relevant candidates found")
    
    if not candidates:
        print("❌ No new relevant clips found today.")
        return False
    
    # Try top candidates until one works
    for score, post_url, anime in candidates[:5]:
        print(f"\n🎯 Trying: {post_url}")
        print(f"   Anime: {anime} | Score: {score}")
        
        html = fetch_html(post_url)
        if not html:
            continue
        
        drive_id = extract_drive_link(html)
        if not drive_id:
            print("   No Drive link found, skipping...")
            continue
        
        # Build filename: anime_name_YYYY-MM-DD.mp4
        safe_anime = anime.replace(" ", "_")
        filename = f"{safe_anime}_{today}.mp4"
        dest = os.path.join(CACHE_DIR, filename)
        
        # Download it
        success = download_drive_file(drive_id, dest)
        if not success:
            print("   Download failed, trying next...")
            continue
        
        # Upload to Dreaming Anime Drive folder
        uploaded = upload_to_drive(dest, filename)
        if uploaded:
            # Log it
            log["used_urls"].append(post_url)
            log["used_titles"].append(filename)
            log["last_run"] = today
            log.setdefault("history", []).append({
                "date": today,
                "anime": anime,
                "source": post_url,
                "file": filename,
                "drive_id": drive_id
            })
            save_log(log)
            
            # Clean up local cache (keep Drive as source of truth)
            try:
                os.remove(dest)
            except:
                pass
            
            print(f"\n✅ Done! Today's clip: {filename}")
            print(f"   Source: {post_url}")
            return True
        else:
            # Remove failed download
            try:
                os.remove(dest)
            except:
                pass
    
    print("\n❌ Could not download any clip today. Will retry tomorrow.")
    return False

if __name__ == "__main__":
    find_and_download_clip()
