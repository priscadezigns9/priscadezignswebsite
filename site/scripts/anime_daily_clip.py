import requests
from bs4 import BeautifulSoup
import re, json, os, subprocess, base64, urllib.request

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36'}
WORK = '/app/state/f01e5bf5-d543-4a86-92a9-b8f6da449c65/work'
TOKEN = os.environ.get('GH_TOKEN', '')  # Set GH_TOKEN env var at runtime
DRIVE_FOLDER = '1jRm7LZV7H_ZMFYDThO-zsNakAL75nWVO'


def embed_clip_on_page(clip_data):
    """
    Updates the Dreaming Anime page with the new featured clip.
    - Fetches current index.html from GitHub
    - Replaces the featured clip iframe, title, date, and download link
    - Archives the previous featured clip into the clips-archive grid
    - Pushes the updated page back to GitHub
    """
    import re as _re, json as _json, base64 as _base64, subprocess as _subprocess, os as _os
    from datetime import datetime

    REPO = 'priscadezigns9/priscadezignswebsite'
    FILE_PATH = 'site/dreaming-anime/index.html'

    new_drive_id = clip_data.get('drive_id', '')
    new_title = clip_data.get('title', 'Anime Twixtor Clip')
    new_date = clip_data.get('date') or datetime.now().strftime('%B %-d, %Y')

    if not new_drive_id:
        print("[embed_clip_on_page] No drive_id in clip_data — skipping embed.")
        return

    print(f"\n[embed_clip_on_page] Fetching current page from GitHub...")

    # Fetch current page via curl (credential resolved in bash tool context)
    fetch_result = _subprocess.run(
        ['curl', '-s',
         f'https://api.github.com/repos/{REPO}/contents/{FILE_PATH}',
         '-H', 'Authorization: Bearer {{credential:github-token}}',
         '-H', 'Accept: application/vnd.github.v3+json'],
        capture_output=True, text=True, timeout=30
    )

    try:
        api_data = _json.loads(fetch_result.stdout)
    except Exception as e:
        print(f"[embed_clip_on_page] Failed to parse API response: {e}")
        return

    current_sha = api_data.get('sha')
    if not current_sha:
        print(f"[embed_clip_on_page] Could not get SHA. Response: {fetch_result.stdout[:300]}")
        return

    try:
        html = _base64.b64decode(api_data['content']).decode('utf-8')
    except Exception as e:
        print(f"[embed_clip_on_page] Failed to decode HTML: {e}")
        return

    print(f"[embed_clip_on_page] Got page ({len(html)} bytes), SHA: {current_sha[:12]}...")

    # --- Extract current featured clip details before replacing ---
    old_drive_id_match = _re.search(
        r'id="clip-iframe-main"[^>]*src="https://drive\.google\.com/file/d/([^/]+)/preview"',
        html
    )
    old_title_match = _re.search(
        r'id="clip-title-main"[^>]*>([^<]+)<',
        html
    )
    old_date_match = _re.search(
        r'id="clip-date-main"[^>]*>([^<]+)<',
        html
    )

    old_drive_id = old_drive_id_match.group(1) if old_drive_id_match else None
    old_title = old_title_match.group(1).strip() if old_title_match else 'Previous Clip'
    old_date = old_date_match.group(1).strip() if old_date_match else ''

    print(f"[embed_clip_on_page] Old clip: '{old_title}' | Drive ID: {old_drive_id}")
    print(f"[embed_clip_on_page] New clip: '{new_title}' | Drive ID: {new_drive_id}")

    # --- Replace iframe src (drive ID) ---
    html = _re.sub(
        r'(id="clip-iframe-main"[^>]*src="https://drive\.google\.com/file/d/)[^/]+(\/preview")',
        rf'\g<1>{new_drive_id}\g<2>',
        html
    )

    # --- Replace title text ---
    html = _re.sub(
        r'(id="clip-title-main"[^>]*>)[^<]+(<)',
        rf'\g<1>{new_title}\g<2>',
        html
    )

    # --- Replace date text ---
    html = _re.sub(
        r'(id="clip-date-main"[^>]*>)[^<]+(<)',
        rf'\g<1>{new_date}\g<2>',
        html
    )

    # --- Replace download link drive ID in href ---
    html = _re.sub(
        r'(id="clip-download-main"[^>]*href="https://drive\.google\.com/file/d/)[^/]+(\/view")',
        rf'\g<1>{new_drive_id}\g<2>',
        html
    )

    # --- Build archive card for the old clip ---
    if old_drive_id:
        archive_card = (
            '<div style="background:#111;border:1px solid rgba(255,107,0,0.15);border-radius:12px;overflow:hidden;">\n'
            '  <div style="position:relative;padding-bottom:56.25%;height:0;">\n'
            f'    <iframe src="https://drive.google.com/file/d/{old_drive_id}/preview"'
            ' style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allowfullscreen></iframe>\n'
            '  </div>\n'
            '  <div style="padding:14px 16px;display:flex;justify-content:space-between;align-items:center;">\n'
            '    <div>\n'
            f'      <p style="font-weight:700;color:#fff;font-size:.88rem;margin-bottom:2px;">{old_title}</p>\n'
            f'      <p style="font-size:.72rem;color:rgba(255,255,255,0.35);">{old_date}</p>\n'
            '    </div>\n'
            f'    <a href="https://drive.google.com/file/d/{old_drive_id}/view" target="_blank"'
            ' style="color:#FF6B00;font-size:.78rem;font-weight:700;text-decoration:none;">Download \u2193</a>\n'
            '  </div>\n'
            '</div>\n'
            '      '
        )
        archive_marker = '<!-- Archive clips injected by daily script -->'
        if archive_marker in html:
            html = html.replace(archive_marker, archive_card + archive_marker, 1)
            print("[embed_clip_on_page] Archive card inserted.")
        else:
            print("[embed_clip_on_page] Archive marker not found — card not inserted.")
    else:
        print("[embed_clip_on_page] No old drive_id found — skipping archive card.")

    # --- Encode and build payload ---
    content_b64 = _base64.b64encode(html.encode('utf-8')).decode('utf-8')
    payload = _json.dumps({
        "message": f"Daily Clip Update: {new_title} ({new_date})",
        "content": content_b64,
        "sha": current_sha
    })

    # Write payload to file for reference
    payload_path = _os.path.join(WORK, 'embed_clip_payload.json')
    with open(payload_path, 'w') as pf:
        pf.write(payload)

    print(f"[embed_clip_on_page] Pushing updated page to GitHub ({len(payload)} bytes)...")

    # Push via curl subprocess (credential resolved in bash tool context)
    push_result = _subprocess.run(
        ['curl', '-s', '-X', 'PUT',
         f'https://api.github.com/repos/{REPO}/contents/{FILE_PATH}',
         '-H', 'Authorization: Bearer {{credential:github-token}}',
         '-H', 'Content-Type: application/json',
         '-d', payload],
        capture_output=True, text=True, timeout=60
    )

    try:
        push_resp = _json.loads(push_result.stdout)
        if 'commit' in push_resp:
            commit_sha = push_resp['commit']['sha']
            print(f"[embed_clip_on_page] Page updated! Commit: {commit_sha[:12]}")
        else:
            print(f"[embed_clip_on_page] Push error: {push_result.stdout[:400]}")
    except Exception as e:
        print(f"[embed_clip_on_page] Parse error: {e} | Output: {push_result.stdout[:300]}")


# ============================================================
# MAIN EXECUTION
# ============================================================

# 1. Scrape front page
r = requests.get('https://animetwixtor.com', headers=headers, timeout=15)
soup = BeautifulSoup(r.text, 'html.parser')

posts = []
for article in soup.find_all(['article', 'div'], class_=re.compile(r'post|entry|card|item', re.I))[:10]:
    title_el = article.find(['h1','h2','h3'])
    link_el = article.find('a', href=re.compile(r'animetwixtor\.com/.+'))
    date_el = article.find(['time','span'], class_=re.compile(r'date|time|publish', re.I))
    if title_el and link_el:
        posts.append({
            'title': title_el.get_text(strip=True),
            'url': link_el['href'],
            'date': date_el.get_text(strip=True) if date_el else ''
        })

print(f"Found {len(posts)} posts on animetwixtor.com")
for p in posts[:5]:
    print(f"  - {p['title']} | {p['date']}")

if not posts:
    print("ERROR: No posts found")
    exit(1)

top = posts[0]
print(f"\nTop post: {top['title']}")
print(f"URL: {top['url']}")

# 2. Fetch the post page to find download links
r2 = requests.get(top['url'], headers=headers, timeout=15)
soup2 = BeautifulSoup(r2.text, 'html.parser')

all_links = [l['href'] for l in soup2.find_all('a', href=True)]
drive_links = [l for l in all_links if 'drive.google' in l]
mega_links = [l for l in all_links if 'mega.nz' in l]
mp4_links = [l for l in all_links if '.mp4' in l.lower()]
iframes = [i.get('src','') for i in soup2.find_all('iframe', src=True)]

print(f"\nGoogle Drive links: {drive_links[:3]}")
print(f"Mega links: {mega_links[:3]}")
print(f"MP4 links: {mp4_links[:3]}")
print(f"Iframes: {iframes[:3]}")

# 3. Try to download via yt-dlp from the post URL
out_file = os.path.join(WORK, 'anime_clip_today.mp4')
print(f"\nAttempting yt-dlp download from: {top['url']}")

yt_result = subprocess.run(
    ['python3', '-m', 'yt_dlp', top['url'], '-o', out_file,
     '--max-filesize', '100M', '--no-playlist', '-q', '--no-warnings'],
    capture_output=True, text=True, timeout=90
)
print("yt-dlp stdout:", yt_result.stdout[:300])
print("yt-dlp stderr:", yt_result.stderr[:300])

# Check if file was created
clip_file = None
for ext in ['.mp4', '.webm', '.mkv']:
    candidate = out_file.replace('.mp4', ext)
    if os.path.exists(candidate) and os.path.getsize(candidate) > 10000:
        clip_file = candidate
        break
# Also check with yt-dlp auto naming
for f in os.listdir(WORK):
    if f.startswith('anime_clip_today') and os.path.getsize(os.path.join(WORK, f)) > 10000:
        clip_file = os.path.join(WORK, f)
        break

if clip_file:
    print(f"\nDownloaded: {clip_file} ({os.path.getsize(clip_file)/1024/1024:.1f} MB)")
else:
    print("\nDirect download failed. Reporting result without file upload.")
    print(json.dumps({'title': top['title'], 'url': top['url'], 'status': 'found_no_download'}))
    exit(0)

# 4. Upload to Google Drive using gog CLI
print(f"\nUploading to Drive folder {DRIVE_FOLDER}...")
drive_name = f"Dreaming Anime \u2014 {top['title']} \u2014 {top['date'] or 'Today'}.mp4"
upload_result = subprocess.run(
    ['gog', 'drive', 'upload', clip_file, '--parent', DRIVE_FOLDER, '--name', drive_name],
    capture_output=True, text=True, timeout=120
)
print("Upload stdout:", upload_result.stdout[:500])
print("Upload stderr:", upload_result.stderr[:200])

result = {
    'title': top['title'],
    'url': top['url'],
    'file': clip_file,
    'drive_name': drive_name,
    'upload_ok': upload_result.returncode == 0
}

# Try to extract drive_id from upload output
drive_id = None
try:
    upload_data = json.loads(upload_result.stdout)
    drive_id = upload_data.get('id') or upload_data.get('fileId') or upload_data.get('drive_id')
except Exception:
    # Try regex on stdout
    m = re.search(r'"id"\s*:\s*"([A-Za-z0-9_-]{20,})"', upload_result.stdout)
    if m:
        drive_id = m.group(1)

result['drive_id'] = drive_id
print(json.dumps(result))

# 5. Auto-embed the new clip on the Dreaming Anime page
if upload_result.returncode == 0 and drive_id:
    embed_clip_on_page(result)
else:
    print("Skipping page embed — upload did not succeed or no drive_id found.")
