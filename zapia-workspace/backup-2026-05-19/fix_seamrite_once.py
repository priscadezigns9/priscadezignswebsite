from PIL import Image, ImageDraw, ImageFont

FONT_BOLD = 'fonts/Montserrat-Bold.ttf'

def load_font(size):
    return ImageFont.truetype(FONT_BOLD, size)

def fit_font(text, max_width, start_size):
    for size in range(start_size, 20, -1):
        f = load_font(size)
        if f.getlength(text) <= max_width:
            return f, size
    return load_font(20), 20

# Reload the background (fresh Pollinations image — no overlays yet)
# Since the bg already has overlays baked in, re-generate from scratch
import requests, urllib.parse
from io import BytesIO

print('Fetching fresh background...')
prompt = 'elegant fashion atelier fabric bolts rich jewel tones draped wooden worktable sewing tools measuring tape scissors warm studio lighting luxurious textile 8k no text no watermark'
encoded = urllib.parse.quote(prompt)
url = f'https://image.pollinations.ai/prompt/{encoded}?model=flux&width=768&height=768&seed=506'
r = requests.get(url, timeout=90)
img = Image.open(BytesIO(r.content)).convert('RGB')
img = img.resize((768, 768), Image.LANCZOS)
print(f'Got background: {img.size}')

w, h = img.size
max_w = int(w * 0.92)

# Wipe watermark zone
ImageDraw.Draw(img).rectangle([(w-320, h-70), (w, h)], fill=(0,0,0))

img_rgba = img.convert('RGBA')
overlay = Image.new('RGBA', img_rgba.size, (0,0,0,0))
d = ImageDraw.Draw(overlay)

band_h = 220
band = Image.new('RGBA', (w, band_h), (0,0,0,200))
overlay.paste(band, (0, h-band_h), band)

fb, _ = fit_font('CUSTOM SEWING', max_w, 80)
fs, _ = fit_font('MADE WITH PRECISION', max_w, 38)

d.text((w//2, h-band_h+70),  'CUSTOM SEWING',       font=fb, fill=(255,255,255,255), anchor='mm')
d.text((w//2, h-band_h+168), 'MADE WITH PRECISION',  font=fs, fill=(255,255,255,235), anchor='mm')

result = Image.alpha_composite(img_rgba, overlay)

# Paste the Seamrite logo ONCE — transparent version, top-right
logo = Image.open('logos_today/seamritedesigns_transparent.png')
lw, lh = logo.size
result.paste(logo, (w - lw - 15, 15), logo)

result.convert('RGB').save('social_posts/today/seamritedesigns.jpg', 'JPEG', quality=93)
print('Saved — single logo, no overlap')
