"""
Daily backup script — pushes all key config/script files to GitHub /backups/ folder.
Automatically strips secrets/tokens before pushing (GitHub secret scanning protection).
Run via cron every night at midnight AST.
"""
import json, base64, subprocess, os, re, time
from datetime import datetime, timezone, timedelta

TOKEN = "[GITHUB_TOKEN_REDACTED]"
REPO = "priscadezigns9/priscadezignswebsite"
WORKSPACE = "/app/workspace/66a7cb29-e253-456c-9bc0-7a027f5b3922/f01e5bf5-d543-4a86-92a9-b8f6da449c65"

# AST = UTC-4
now = datetime.now(timezone(timedelta(hours=-4)))
date_str = now.strftime("%Y-%m-%d")
timestamp = now.strftime("%Y-%m-%d %H:%M AST")

# Files to back up
BACKUP_FILES = [
    "empire_memory.md",
    "daily_poster.py",
    "product_data.json",
    "fb_page_tokens.json",
    "backup_to_github.py",
    "fix_all_dead_links.py",
    "midnight_audit2.py",
    "build_saas_start_pages.py",
    "ig_accounts.json",
    "anime_clip_log.json",
]

# Patterns to redact before pushing (GitHub secret scanning blocks these)
SECRET_PATTERNS = [
    (r'ghp_[A-Za-z0-9]{36}', '[GITHUB_TOKEN_REDACTED]'),
    (r'EAA[A-Za-z0-9]{50,}', '[FB_TOKEN_REDACTED]'),
    (r'"access_token":\s*"[^"]{50,}"', '"access_token": "[REDACTED]"'),
    (r'"token":\s*"EAA[^"]*"', '"token": "[REDACTED]"'),
]

def redact_secrets(content_str):
    for pattern, replacement in SECRET_PATTERNS:
        content_str = re.sub(pattern, replacement, content_str)
    return content_str

def api_call(method, path, data=None):
    cmd = ["curl", "-s", "-X", method,
           f"https://api.github.com{path}",
           "-H", f"Authorization: token {TOKEN}",
           "-H", "Accept: application/vnd.github.v3+json",
           "-H", "Content-Type: application/json"]
    if data:
        cmd += ["-d", json.dumps(data)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    try:
        return json.loads(r.stdout)
    except:
        return {"_raw": r.stdout[:200]}

def backup_file(local_name, dest_path):
    local_path = os.path.join(WORKSPACE, local_name)
    if not os.path.exists(local_path):
        return False, "not found locally"

    # Read file
    try:
        with open(local_path, "r", encoding="utf-8", errors="replace") as f:
            content_str = f.read()
        # Redact secrets for safe storage
        content_str = redact_secrets(content_str)
        content_bytes = content_str.encode("utf-8")
    except Exception as e:
        return False, f"read error: {e}"

    encoded = base64.b64encode(content_bytes).decode()

    # Check if file already exists (need SHA to update)
    existing = api_call("GET", f"/repos/{REPO}/contents/{dest_path}")
    sha = existing.get("sha", "")

    payload = {
        "message": f"Backup {local_name} — {timestamp}",
        "content": encoded,
    }
    if sha:
        payload["sha"] = sha

    result = api_call("PUT", f"/repos/{REPO}/contents/{dest_path}", payload)
    if "commit" in result or "content" in result:
        return True, "ok"
    else:
        msg = result.get("message", str(result))[:80]
        return False, msg

# Run backups
print(f"=== Daily GitHub Backup — {timestamp} ===")
success = []
failed = []
skipped = []

for fname in BACKUP_FILES:
    dest = f"backups/{date_str}/{fname}"
    ok, msg = backup_file(fname, dest)
    if ok:
        success.append(fname)
        print(f"  ✅ {fname}")
    elif msg == "not found locally":
        skipped.append(fname)
        print(f"  — {fname} (not found, skipping)")
    else:
        failed.append((fname, msg))
        print(f"  ❌ {fname} — {msg}")
    time.sleep(0.35)

# Write manifest
manifest = {
    "timestamp": timestamp,
    "date": date_str,
    "backed_up": success,
    "skipped": skipped,
    "failed": [f for f, _ in failed],
    "total_success": len(success),
    "note": "Secrets (tokens) are redacted in backed-up files. Originals remain local only."
}
manifest_json = json.dumps(manifest, indent=2)
encoded = base64.b64encode(manifest_json.encode()).decode()
manifest_path = f"backups/{date_str}/manifest.json"
existing = api_call("GET", f"/repos/{REPO}/contents/{manifest_path}")
sha = existing.get("sha", "")
payload = {"message": f"Backup manifest — {timestamp}", "content": encoded}
if sha:
    payload["sha"] = sha
api_call("PUT", f"/repos/{REPO}/contents/{manifest_path}", payload)

print(f"\n✅ Backed up {len(success)}/{len(BACKUP_FILES) - len(skipped)} files → github.com/{REPO}/tree/main/backups/{date_str}/")
if skipped:
    print(f"   Skipped (not found): {', '.join(skipped)}")
if failed:
    print(f"   ❌ Failed: {', '.join(f for f,_ in failed)}")
