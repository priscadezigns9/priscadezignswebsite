import re, json, base64

with open('site_index_current.html', 'r', encoding='utf-8') as f:
    html = f.read()

ig_svg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>'
fb_svg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>'

social_snippet = f'''<div class="topnav-socials" style="display:flex; gap:12px; align-items:center; margin-left:20px; border-left:1px solid rgba(255,255,255,0.1); padding-left:20px;">
<a href="https://www.facebook.com/PriscaDezigns" target="_blank" style="color:#fff; opacity:0.6; transition:opacity 0.2s; display:flex; align-items:center;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6" aria-label="Facebook">{fb_svg}</a>
<a href="https://www.instagram.com/priscadezigns/" target="_blank" style="color:#fff; opacity:0.6; transition:opacity 0.2s; display:flex; align-items:center;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6" aria-label="Instagram">{ig_svg}</a>
</div>'''

old_nav = re.search(r'(<nav class="topnav">.*?)</nav>', html, re.DOTALL)
if old_nav:
    nav_content = old_nav.group(1)
    new_nav = nav_content + social_snippet + '</nav>'
    html = html.replace(old_nav.group(0), new_nav)
    print("✓ Re-injected socials to current site version")
else:
    print("✗ Nav not found in current version")

with open('site_index_current_socials.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('site_index_current_sha.txt', 'r') as f:
    sha = f.read().strip()

payload = {
    "message": "feat: Add Prisca Dezigns social links (FB/IG) to site topnav",
    "content": base64.b64encode(html.encode('utf-8')).decode('ascii'),
    "sha": sha
}

with open('payload_site_nav_socials_current.json', 'w') as f:
    json.dump(payload, f)

print("✓ Prepared updated payload")
