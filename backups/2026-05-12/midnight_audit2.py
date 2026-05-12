import json, urllib.request, urllib.error, sys
from datetime import datetime, timezone, timedelta

with open("/app/state/f01e5bf5-d543-4a86-92a9-b8f6da449c65/work/fb_page_tokens.json") as f:
    pages = json.load(f)

AST = timezone(timedelta(hours=-4))
now = datetime.now(AST)
since_ts = int((now - timedelta(hours=24)).timestamp())

results = {}
expired = []

for page_name, info in pages.items():
    if not isinstance(info, dict):
        continue
    page_id = info.get("id") or info.get("page_id", "")
    token = info.get("access_token") or info.get("token", "")
    if not page_id or not token:
        results[page_name] = {"count": 0, "status": "missing_token"}
        continue

    url = (f"https://graph.facebook.com/v19.0/{page_id}/posts"
           f"?fields=id,created_time&since={since_ts}&limit=100"
           f"&access_token={token}")
    try:
        req = urllib.request.Request(url)
        r = urllib.request.urlopen(req, timeout=10)
        data = json.loads(r.read())
        count = len(data.get("data", []))
        results[page_name] = {"count": count, "status": "ok", "id": page_id}
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        if "190" in body or "OAuthException" in body:
            results[page_name] = {"count": 0, "status": "token_expired", "id": page_id}
            expired.append(page_name)
        else:
            results[page_name] = {"count": 0, "status": f"http_{e.code}", "id": page_id, "body": body[:100]}
    except Exception as ex:
        results[page_name] = {"count": 0, "status": str(ex)[:60], "id": page_id}

print(json.dumps({"results": results, "expired": expired, "checked_at": now.isoformat()}, indent=2))
