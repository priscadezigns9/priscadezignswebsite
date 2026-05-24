import base64, json, sys

def process(slug, ig, fb):
    with open(f'{slug}_raw.html', 'r') as f: html = f.read()
    ig_svg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>'
    fb_svg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>'
    social_snippet = f'''<div class="social-nav" style="display:flex; gap:12px; align-items:center; margin-left:15px; border-left:1px solid rgba(255,255,255,0.1); padding-left:15px;">
<a href="{ig}" target="_blank" style="color:inherit; opacity:0.6; transition:opacity 0.2s; display:flex; align-items:center;" aria-label="Instagram">{ig_svg}</a>
<a href="{fb}" target="_blank" style="color:inherit; opacity:0.6; transition:opacity 0.2s; display:flex; align-items:center;" aria-label="Facebook">{fb_svg}</a></div>'''
    
    if '</header>' in html:
        new_html = html.replace('</header>', social_snippet + '</header>')
    elif '</ul>' in html:
        new_html = html.replace('</ul>', '</ul>' + social_snippet)
    else:
        print(f"Skipping {slug}")
        return

    sha = open(f'{slug}_sha.txt').read().strip()
    payload = {"message": f"feat: Add socials to {slug} nav", "content": base64.b64encode(new_html.encode()).decode(), "sha": sha}
    with open(f'{slug}_payload.json', 'w') as f:
        json.dump(payload, f)

if __name__ == "__main__":
    process("nehneh", "https://www.instagram.com/nehneh_pd/", "https://www.facebook.com/share/1BWZkieFXy/")
    process("seamritedesigns", "https://www.instagram.com/seamritedesigns2023/", "https://www.facebook.com/share/2455413671137234/")
    process("prime-land-network", "https://www.instagram.com/primelandnet/", "https://www.facebook.com/share/1DyFNu56x4/")
