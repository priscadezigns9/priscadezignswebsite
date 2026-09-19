import re, json, base64

COUNTRY_SUFFIX = (
    ", Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, "
    "Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, "
    "Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, "
    "Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh"
)

content = open('/app/state/209c6fcc-e405-4df2-a33b-ebe034e274ab/work/seo_full_50.py').read()

# Each keywords value is a long single-quoted string on its own line (may wrap)
# Pattern: 'keywords': 'VALUE',
# They are multiline strings but in single quotes spanning exactly one dict key

# Use a greedy match across lines
pattern = r"('keywords':\s*')(.*?)(',\s*\n\s*'og_title')"
def replace_kw(m):
    return m.group(1) + m.group(2).rstrip() + COUNTRY_SUFFIX + m.group(3)

new_content = re.sub(pattern, replace_kw, content, flags=re.DOTALL)

changed = content.count("'keywords':") 
print(f"Keywords blocks: {changed}")

# Verify counts
matches = re.findall(r"'keywords':\s*'(.*?)',\s*\n\s*'og_title'", new_content, re.DOTALL)
for i, m in enumerate(matches):
    kws = [k.strip() for k in m.split(',')]
    print(f"Brand {i+1}: {len(kws)} keywords")

open('/app/state/209c6fcc-e405-4df2-a33b-ebe034e274ab/work/seo_full_50.py', 'w').write(new_content)
print("\nDone. seo_full_50.py updated.")
