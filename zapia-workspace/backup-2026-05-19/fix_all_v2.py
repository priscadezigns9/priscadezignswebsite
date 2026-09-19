"""
Final fix v2 — measure text width accurately using getlength(), not getbbox().
Auto-shrink until text truly fits within 92% of image width.
"""
from PIL import Image, ImageDraw, ImageFont

FONT_BOLD = 'fonts/Montserrat-Bold.ttf'
LOGOS = 'logos_today/'

def load_font(size):
    return ImageFont.truetype(FONT_BOLD, size)

def fit_font(text, max_width, start_size=82):
    for size in range(start_size, 24, -1):
        f = load_font(size)
        w = f.getlength(text)
        if w <= max_width:
            return f, size
    return load_font(24), 24

def round_logo(logo_path, size=120):
    try:
        logo = Image.open(logo_path).convert('RGBA').resize((size, size), Image.LANCZOS)
        mask = Image.new('L', (size, size), 0)
        ImageDraw.Draw(mask).ellipse((0, 0, size, size), fill=255)
        out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        out.paste(logo, (0, 0), mask)
        return out
    except Exception as e:
        print(f'  Logo err: {e}')
        return None

def apply_overlay(img, headline, subline, color, logo_file, logo_is_transparent=False):
    w, h = img.size
    max_w = int(w * 0.92)
    band_h = 220

    ImageDraw.Draw(img).rectangle([(w - 320, h - 70), (w, h)], fill=(0, 0, 0))

    img_rgba = img.convert('RGBA')
    overlay  = Image.new('RGBA', img_rgba.size, (0, 0, 0, 0))
    d        = ImageDraw.Draw(overlay)

    band = Image.new('RGBA', (w, band_h), (0, 0, 0, 200))
    overlay.paste(band, (0, h - band_h), band)

    fb, hs = fit_font(headline, max_w, start_size=82)
    fs, ss = fit_font(subline,  max_w, start_size=40)

    d.text((w // 2, h - band_h + 70),  headline, font=fb, fill=color + (255,),       anchor='mm')
    d.text((w // 2, h - band_h + 168), subline,  font=fs, fill=(255, 255, 255, 235), anchor='mm')

    result = Image.alpha_composite(img_rgba, overlay)

    if logo_is_transparent:
        logo = Image.open(logo_file)
        lw, lh = logo.size
        result.paste(logo, (w - lw - 15, 15), logo)
    else:
        logo = round_logo(logo_file, size=120)
        if logo:
            result.paste(logo, (w - 140, 15), logo)

    print(f'  Headline: {hs}pt ({int(load_font(hs).getlength(headline))}px / {max_w}px max) | Subline: {ss}pt')
    return result.convert('RGB')

brands = [
    ('cupyx.jpg',           'CREATIVE DIGITAL',    'DESIGNS THAT CONVERT',      (232, 121, 160), 'cupyx.png',                       False),
    ('velloq.jpg',          'DIGITAL BRANDING',    'STAND OUT ONLINE',           (0, 212, 255),   'velloq.png',                      False),
    ('essence-elite.jpg',   'TOP SCENTS',          'BEST FRAGRANCES OF 2026',   (212, 160, 100), 'essence_elite.png',               False),
    ('peak-fit.jpg',        'FITNESS TRENDS',      'BEST WORKOUT GEAR 2026',    (255, 140, 0),   'peak_fit.png',                    False),
    ('seamritedesigns.jpg', 'CUSTOM SEWING',       'MADE WITH PRECISION',       (255, 255, 255), 'seamritedesigns_transparent.png', True),
    ('rowcell.jpg',         'SMART DATA TOOLS',    'SPREADSHEETS, SORTED',      (22, 163, 74),   'rowcell_logo.png',                False),
    ('dreaming-anime.jpg',  'ANIME NEWS',          "RE:ZERO S4 IS HERE",        (255, 140, 0),   'dreaming_anime.png',              False),
]

for fname, headline, subline, color, logo, transparent in brands:
    print(f'\n{fname}:')
    img = Image.open(f'social_posts/today/{fname}').convert('RGB')
    result = apply_overlay(img, headline, subline, color, LOGOS + logo, transparent)
    result.save(f'social_posts/today/{fname}', 'JPEG', quality=93)

print('\nALL DONE')
