from PIL import Image, ImageDraw, ImageFont
import requests
from io import BytesIO

FONT_BOLD = 'fonts/Montserrat-Bold.ttf'
LOGOS = 'logos_today/'

def load_font(size):
    return ImageFont.truetype(FONT_BOLD, size)

def fit_font(text, max_width, start_size):
    for size in range(start_size, 20, -1):
        f = load_font(size)
        if f.getlength(text) <= max_width:
            return f, size
    return load_font(20), 20

def square_logo(logo_path, size=110):
    """Keep logo as square (not circle) — correct for Rowcell's grid icon."""
    logo = Image.open(logo_path).convert('RGBA').resize((size, size), Image.LANCZOS)
    return logo

def round_logo(logo_path, size=110):
    logo = Image.open(logo_path).convert('RGBA').resize((size, size), Image.LANCZOS)
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size, size), fill=255)
    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    out.paste(logo, (0, 0), mask)
    return out

def apply_overlay(img, headline, subline, color, logo_file, use_square_logo=False, logo_is_transparent=False):
    w, h = img.size
    max_w = int(w * 0.92)
    band_h = 220

    ImageDraw.Draw(img).rectangle([(w - 320, h - 70), (w, h)], fill=(0, 0, 0))

    img_rgba = img.convert('RGBA')
    overlay  = Image.new('RGBA', img_rgba.size, (0, 0, 0, 0))
    d        = ImageDraw.Draw(overlay)

    band = Image.new('RGBA', (w, band_h), (0, 0, 0, 200))
    overlay.paste(band, (0, h - band_h), band)

    fb, hs = fit_font(headline, max_w, start_size=80)
    fs, ss = fit_font(subline,  max_w, start_size=38)

    d.text((w // 2, h - band_h + 70),  headline, font=fb, fill=color + (255,),       anchor='mm')
    d.text((w // 2, h - band_h + 168), subline,  font=fs, fill=(255, 255, 255, 235), anchor='mm')

    result = Image.alpha_composite(img_rgba, overlay)

    if use_square_logo:
        logo = square_logo(logo_file, size=110)
    elif logo_is_transparent:
        logo = Image.open(logo_file)
        lw, lh = logo.size
        result.paste(logo, (w - lw - 15, 15), logo)
        print(f'  Headline: {hs}pt | Subline: {ss}pt')
        return result.convert('RGB')
    else:
        logo = round_logo(logo_file, size=110)

    if logo:
        result.paste(logo, (w - 125, 15), logo)

    print(f'  Headline: {hs}pt | Subline: {ss}pt')
    return result.convert('RGB')

# ── Rowcell — square logo (not circle) ───────────────────────────────────────
print('Rowcell:')
img = Image.open('social_posts/today/rowcell.jpg').convert('RGB')
result = apply_overlay(img, 'SMART DATA TOOLS', 'SPREADSHEETS, SORTED', (22, 163, 74), LOGOS + 'rowcell_logo.png', use_square_logo=True)
result.save('social_posts/today/rowcell.jpg', 'JPEG', quality=93)

# ── Dreaming Anime News — Mushoku Tensei with corrected layout ────────────────
print('\nDreaming Anime (Mushoku Tensei news):')
img_url = 'https://a.storyblok.com/f/178900/1064x1504/7a71ba6ea7/mushoku-tensei-jobless-reincarnation-season-3-key-visual.jpg'
r = requests.get(img_url, timeout=30)
img = Image.open(BytesIO(r.content)).convert('RGB')
w_orig, h_orig = img.size
side = min(w_orig, h_orig)
left = (w_orig - side) // 2
img = img.crop((left, 0, left + side, side))
img = img.resize((768, 768), Image.LANCZOS)

w, h = img.size

# Download DA logo
logo_url = 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/logos/dreaming-anime.jpg'
lr = requests.get(logo_url, timeout=20)
da_logo = Image.open(BytesIO(lr.content)).convert('RGBA')
da_logo.save(LOGOS + 'dreaming_anime_github.png')

# Top orange banner — BREAKING NEWS
img_rgba = img.convert('RGBA')
overlay = Image.new('RGBA', img_rgba.size, (0, 0, 0, 0))
d = ImageDraw.Draw(overlay)

banner_h = 130
banner = Image.new('RGBA', (w, banner_h), (180, 65, 0, 230))
overlay.paste(banner, (0, 0), banner)

f_breaking = load_font(72)
f_topic    = load_font(52)
f_detail   = load_font(34)

# Fit BREAKING NEWS text
max_w = int(w * 0.88)
if load_font(72).getlength('BREAKING NEWS') > max_w:
    f_breaking, _ = fit_font('BREAKING NEWS', max_w, 72)

d.text((w//2, banner_h//2), 'BREAKING NEWS', font=f_breaking, fill=(255, 255, 255, 255), anchor='mm')

# Bottom band — keep text away from logo area (logo is top-right)
band_h = 220
band = Image.new('RGBA', (w, band_h), (0, 0, 0, 210))
overlay.paste(band, (0, h - band_h), band)

# Auto-fit bottom text
fb2, _ = fit_font('MUSHOKU TENSEI S3', int(w * 0.88), 52)
fs2, _ = fit_font('KEY VISUAL REVEALED — JULY 5', int(w * 0.88), 34)

d.text((w//2, h - band_h + 75),  'MUSHOKU TENSEI S3',           font=fb2, fill=(255, 140, 0, 255),    anchor='mm')
d.text((w//2, h - band_h + 158), 'KEY VISUAL REVEALED — JULY 5', font=fs2, fill=(255,255,255,235),    anchor='mm')

result = Image.alpha_composite(img_rgba, overlay)

# Round DA logo — bottom-right corner (not top, to avoid overlapping banner text)
da_logo_round = round_logo(LOGOS + 'dreaming_anime_github.png', size=100)
result.paste(da_logo_round, (w - 120, h - 120), da_logo_round)

result.convert('RGB').save('social_posts/today/dreaming-anime-news.jpg', 'JPEG', quality=93)
print('  Saved dreaming-anime-news.jpg')

print('\nDONE')
