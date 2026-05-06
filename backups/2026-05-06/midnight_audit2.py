import json, urllib.request, urllib.error, time
from datetime import datetime, timezone, timedelta

WS = "/app/workspace/66a7cb29-e253-456c-9bc0-7a027f5b3922/f01e5bf5-d543-4a86-92a9-b8f6da449c65"

with open(f"{WS}/fb_page_tokens.json") as f:
    pages = json.load(f)

since = int((datetime.now(timezone.utc) - timedelta(hours=24)).timestamp())
results = {}
expired = []

for name, info in pages.items():
    pid = info['id']
    token = info['access_token']
    # Use fields that actually exist
    url = f"https://graph.facebook.com/v19.0/{pid}/feed?fields=id,created_time&since={since}&limit=50&access_token={token}"
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read())
        if 'error' in data:
            err = data['error']
            if err.get('code') in [190, 102, 4, 17]:
                expired.append(name)
                results[name] = {'count': 0, 'status': 'TOKEN_EXPIRED', 'id': pid}
            else:
                results[name] = {'count': 0, 'status': f"API_ERR({err.get('code')}): {err.get('message','?')[:60]}", 'id': pid}
        else:
            posts = data.get('data', [])
            results[name] = {'count': len(posts), 'status': 'OK', 'id': pid}
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        try:
            err_data = json.loads(body)
            err = err_data.get('error', {})
            code = err.get('code', 0)
            msg = err.get('message', body[:80])
            if code in [190, 102]:
                expired.append(name)
                results[name] = {'count': 0, 'status': 'TOKEN_EXPIRED', 'id': pid}
            else:
                results[name] = {'count': 0, 'status': f"HTTP{e.code}({code}): {msg[:60]}", 'id': pid}
        except:
            results[name] = {'count': 0, 'status': f"HTTP{e.code}: {body[:60]}", 'id': pid}
    except Exception as e:
        results[name] = {'count': 0, 'status': f'EXC: {str(e)[:60]}', 'id': pid}
    time.sleep(0.3)

print("=== 24H POST AUDIT ===")
under4 = []
for name, r in sorted(results.items(), key=lambda x: x[1]['count']):
    flag = " *** NEEDS_CATCHUP" if r['count'] < 4 and r['status'] == 'OK' else ""
    exp = " *** TOKEN_EXPIRED" if r['status'] == 'TOKEN_EXPIRED' else ""
    err = f"  [{r['status']}]" if r['status'] not in ('OK','TOKEN_EXPIRED') else ""
    print(f"  {r['count']:2d} | {name}{flag}{exp}{err}")
    if r['count'] < 4 and r['status'] == 'OK':
        under4.append((name, r['count']))

print(f"\nNeeds catchup: {len(under4)}")
for n, c in under4:
    print(f"  {n}: {c}/4 posts")
print(f"Expired/invalid tokens: {len(expired)}")
for p in expired:
    print(f"  {p}")

with open(f"{WS}/audit_results_midnight.json", "w") as f:
    json.dump({'results': results, 'under4': under4, 'expired': expired, 'since': since}, f, indent=2)
print("\nDone.")
