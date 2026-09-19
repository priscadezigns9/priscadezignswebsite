"""
Convert all dead ASIN direct links to Amazon search links (never 404).
Also rebuilds niche pages and deploys changed files.
"""
import json, urllib.request, urllib.error, urllib.parse, time, base64, os

WORKSPACE = '/app/workspace/66a7cb29-e253-456c-9bc0-7a027f5b3922/f01e5bf5-d543-4a86-92a9-b8f6da449c65'
TOKEN = os.environ.get("GITHUB_PAT", "[GITHUB_TOKEN_REDACTED]")
REPO = "priscadezigns9/priscadezignswebsite"
TAG = "priscadezigns-20"
H = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

DEAD_ASINS = {
    "B08WT12LVQ","B0BNZ5JBHK","B09VXNMWGP","B0CW1BFKY5",
    "B08MJBR9NW","B0BXRR6H8P",
    "B000BQ7FLA",
    "B071Z5R4TL",
    "B01NAL9OFF","B07PVCVBN7","B07B7TJ359","B07XVWZNTB","B07SLKXQTQ","B09C17CYVT",
    "B083XMFMF7",
    "B086PT5XNK","B003BYJAT0","B01MSY7IXI",
    "B078LNQCSB",
    "B00BKLTH1O",
}

def search_link(name):
    # Use product name as search query
    q = name.replace("'", "").replace("®", "").replace("™", "")
    # trim to key words (first 6 words)
    words = q.split()[:6]
    return f"https://www.amazon.com/s?k={urllib.parse.quote(' '.join(words))}&tag={TAG}"

def api(method, path, body=None):
    url = f"https://api.github.com{path}"
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", f"Bearer {TOKEN}")
    req.add_header("Content-Type", "application/json")
    req.add_header("Accept", "application/vnd.github+json")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())

def get_sha(repo_path):
    try:
        d = api("GET", f"/repos/{REPO}/contents/{repo_path}")
        return d.get("sha")
    except:
        return None

def deploy_file(local_path, repo_path, message):
    sha = get_sha(repo_path)
    with open(local_path, "rb") as f:
        content = base64.b64encode(f.read()).decode()
    payload = {"message": message, "content": content}
    if sha:
        payload["sha"] = sha
    try:
        result = api("PUT", f"/repos/{REPO}/contents/{repo_path}", payload)
        commit = result.get('commit', {}).get('sha', '?')[:10]
        print(f"  DEPLOYED {repo_path} [{commit}]")
        return True
    except urllib.error.HTTPError as e:
        print(f"  FAILED {repo_path}: {e.code} {e.read()[:80]}")
        return False

# Fix product_data.json
os.chdir(WORKSPACE)
with open("product_data.json") as f:
    pdata = json.load(f)

fixed_count = 0
affected_slugs = set()

for slug, products in pdata.items():
    for p in products:
        asin = p.get("asin")
        if asin in DEAD_ASINS:
            old_link = p.get("link", "")
            p["link"] = search_link(p.get("name", asin))
            print(f"FIXED [{slug}] {asin}: {p['name'][:40]}")
            fixed_count += 1
            affected_slugs.add(slug)

print(f"\nFixed {fixed_count} links across {len(affected_slugs)} slugs: {sorted(affected_slugs)}")

with open("product_data.json", "w") as f:
    json.dump(pdata, f, indent=2)

# Rebuild affected niche pages
import subprocess
result = subprocess.run(["python3", "rebuild_local.py"], capture_output=True, text=True, timeout=60)
print("\nRebuild:", result.stdout.strip().split("\n")[-1])

# Deploy each affected page
print("\nDeploying affected pages...")
for slug in sorted(affected_slugs):
    local = f"site/{slug}/index.html"
    if os.path.exists(local):
        deploy_file(local, f"{slug}/index.html", f"Fix dead Amazon links in {slug}")
        time.sleep(0.5)

print("\nAll done!")
