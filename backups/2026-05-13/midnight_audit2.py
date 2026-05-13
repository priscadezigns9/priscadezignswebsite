import json, requests, datetime, sys

tokens = json.load(open('/app/state/f01e5bf5-d543-4a86-92a9-b8f6da449c65/work/fb_page_tokens.json'))

since_ts = int((datetime.datetime.utcnow() - datetime.timedelta(hours=24)).timestamp())
results = {}

for page_name, token in tokens.items():
    clean_token = token.strip()
    try:
        url = "https://graph.facebook.com/v19.0/me/feed"
        params = {
            "fields": "id,created_time",
            "limit": "20",
            "since": str(since_ts),
            "access_token": clean_token
        }
        r = requests.get(url, params=params, timeout=10)
        data = r.json()
        if 'error' in data:
            err = data['error']
            code = err.get('code', 0)
            if code in [190, 102, 463, 467]:
                results[page_name] = {'count': 0, 'token_ok': False, 'error': f"TOKEN_EXPIRED ({code})"}
            else:
                results[page_name] = {'count': 0, 'token_ok': True, 'error': err.get('message','')[:80]}
        else:
            posts = data.get('data', [])
            results[page_name] = {'count': len(posts), 'token_ok': True}
    except Exception as e:
        results[page_name] = {'count': 0, 'token_ok': True, 'error': str(e)[:60]}

print(json.dumps(results, indent=2))
