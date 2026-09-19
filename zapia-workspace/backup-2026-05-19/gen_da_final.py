"""
Dreaming Anime — Mushoku Tensei S3 Key Visual as background
Breaking News template, big bold text with real font
"""
import requests
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO

FONT_BOLD = 'fonts/Montserrat-Bold.ttf'

def load_font(size):
    return ImageFont.truetype(FONT_BOLD, size)

def round_logo(logo_path, size=120):
    logo = Image.open(logo_path).convert('RGBA').resize((size, size), Image.LANCZOS)
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size, size), fill=255)
    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    out.paste(logo, (0, 0), mask)
    return out

# Download the Mushoku Tensei S3 key visual (actual news image)
print('Downloading Mushoku Tensei S3 key visual...')
img_url = 'https://a.storyblok.com/f/178900/1064x1504/7a71ba6ea7/mushoku-tensei-jobless-reincarnation-season-3-key-visual.jpg'
r = requests.get(img_url, timeout=30)
img = Image.open(BytesIO(r.content)).convert('RGB')
print(f'Downloaded: {img.size}')

# Center-crop to square
w_orig, h_orig = img.size
side = min(w_orig, h_orig)
left = (w_orig - side) // 2
img = img.crop((left, 0, left + side, side))
img = img.resize((768, 768), Image.LANCZOS)

w, h = img.size

# Download DA logo from GitHub
print('Downloading DA logo...')
logo_url = 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/logos/dreaming-anime.jpg'
lr = requests.get(logo_url, timeout=20)
logo_img = Image.open(BytesIO(lr.content)).convert('RGBA')
logo_img.save('logos_today/dreaming_anime_github.png')

# Build overlay — Breaking News template
img_rgba = img.convert('RGBA')
overlay = Image.new('RGBA', img_rgba.size, (0, 0, 0, 0))
d = ImageDraw.Draw(overlay)

# TOP orange banner — "BREAKING NEWS"
banner_h = 130
banner = Image.new('RGBA', (w, banner_h), (180, 65, 0, 230))
overlay.paste(banner, (0, 0), banner)

f_breaking = load_font(72)
f_sub      = load_font(30)
f_topic    = load_font(52)
f_detail   = load_font(34)

# "BREAKING NEWS" on banner
d.text((w//2, banner_h//2), 'BREAKING NEWS', font=f_breaking, fill=(255, 255, 255, 255), anchor='mm')

# Bottom band
band_h = 220
band = Image.new('RGBA', (w, band_h), (0, 0, 0, 210))
overlay.paste(band, (0, h - band_h), band)

d.text((w//2, h - band_h + 75),  'MUSHOKU TENSEI S3',       font=f_topic,  fill=(255, 140, 0, 255), anchor='mm')
d.text((w//2, h - band_h + 155), 'KEY VISUAL REVEALED — JULY 5', font=f_detail, fill=(255, 255, 255, 235), anchor='mm')

result = Image.alpha_composite(img_rgba, overlay)

# Round DA logo — bottom right
logo = round_logo('logos_today/dreaming_anime_github.png', size=110)
result.paste(logo, (w - 130, h - 130), logo)

out = 'social_posts/today/dreaming-anime-news.jpg'
result.convert('RGB').save(out, 'JPEG', quality=93)
print(f'Saved: {out}')
