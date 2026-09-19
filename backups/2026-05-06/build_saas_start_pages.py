"""
Build /start/ intake forms for all 18 SaaS platforms.
Each is styled to match its brand and asks industry-relevant questions.
"""
import os, base64, json, subprocess, time

WORKSPACE = '/app/workspace/66a7cb29-e253-456c-9bc0-7a027f5b3922/f01e5bf5-d543-4a86-92a9-b8f6da449c65'
TOKEN = os.environ.get("GITHUB_PAT", "[GITHUB_TOKEN_REDACTED]")
REPO = "priscadezigns9/priscadezignswebsite"

SAAS = [
    {
        "slug": "xavrin", "name": "Xavrin", "industry": "Security",
        "tagline": "Security, Simplified.",
        "font_head": "Space+Grotesk:wght@700;800", "font_body": "Inter:wght@300;400;500;600",
        "font_head_name": "Space Grotesk", "font_body_name": "Inter",
        "accent": "#00C2FF", "bg": "#040B14", "text": "#E8F4FD", "muted": "#E8F4FD99",
        "border": "#00C2FF22", "card_bg": "#081828",
        "eyebrow": "Security Platform",
        "form_title": "Protect your business.",
        "form_sub": "Tell us about your security needs — we'll set up your Xavrin environment within 24 hours.",
        "extra_fields": [
            ("Industry / Business Type", "select", ["Retail", "Finance", "Healthcare", "Government", "Hospitality", "Other"]),
            ("Number of Locations", "select", ["1", "2–5", "6–20", "20+"]),
            ("Main Security Concern", "textarea", "e.g. Access control, CCTV monitoring, staff tracking, incident reporting..."),
        ],
        "package_label": "Plan",
        "packages": ["Starter — $99/mo (1 site, 5 users)", "Business — $249/mo (5 sites, 25 users)", "Enterprise — Custom pricing", "Just exploring for now"]
    },
    {
        "slug": "varen", "name": "Varen", "industry": "Real Estate",
        "tagline": "Real Estate, Reimagined.",
        "font_head": "Playfair+Display:wght@700;800", "font_body": "Inter:wght@300;400;500",
        "font_head_name": "Playfair Display", "font_body_name": "Inter",
        "accent": "#C9A96E", "bg": "#0A0A0A", "text": "#F5F0E8", "muted": "#F5F0E888",
        "border": "#C9A96E22", "card_bg": "#111111",
        "eyebrow": "Real Estate Platform",
        "form_title": "List smarter, close faster.",
        "form_sub": "Get your Varen account set up — built for Caribbean real estate professionals.",
        "extra_fields": [
            ("Agent or Agency?", "select", ["Independent Agent", "Small Agency (1–5 agents)", "Medium Agency (6–20)", "Large Agency (20+)"]),
            ("Primary Market", "select", ["Trinidad & Tobago", "Jamaica", "Barbados", "Guyana", "Other Caribbean"]),
            ("What do you need most?", "textarea", "e.g. Property listings, lead management, client CRM, virtual tours..."),
        ],
        "package_label": "Plan",
        "packages": ["Agent — $79/mo (1 agent, 50 listings)", "Agency — $199/mo (10 agents, unlimited listings)", "Enterprise — Custom", "Just exploring"]
    },
    {
        "slug": "clarev", "name": "Clarev", "industry": "Healthcare",
        "tagline": "Healthcare, Clarified.",
        "font_head": "DM+Serif+Display:ital,wght@0,400", "font_body": "Inter:wght@300;400;500;600",
        "font_head_name": "DM Serif Display", "font_body_name": "Inter",
        "accent": "#2ECC8A", "bg": "#050F0A", "text": "#EAF7F1", "muted": "#EAF7F199",
        "border": "#2ECC8A22", "card_bg": "#081510",
        "eyebrow": "Healthcare Platform",
        "form_title": "Modern care, managed simply.",
        "form_sub": "Set up your Clarev clinic profile — appointments, records, and billing in one place.",
        "extra_fields": [
            ("Clinic Type", "select", ["General Practice", "Dental", "Specialist", "Pharmacy", "Hospital", "Other"]),
            ("Number of Practitioners", "select", ["1", "2–5", "6–15", "15+"]),
            ("Key Challenge", "textarea", "e.g. Appointment scheduling, patient records, billing, staff management..."),
        ],
        "package_label": "Plan",
        "packages": ["Solo — $89/mo (1 practitioner)", "Clinic — $229/mo (up to 10)", "Hospital — Custom", "Just exploring"]
    },
    {
        "slug": "builven", "name": "Builven", "industry": "Construction",
        "tagline": "Build Smarter.",
        "font_head": "Barlow+Condensed:wght@700;800", "font_body": "Barlow:wght@300;400;500;600",
        "font_head_name": "Barlow Condensed", "font_body_name": "Barlow",
        "accent": "#F5A623", "bg": "#0D0A05", "text": "#FAF3E0", "muted": "#FAF3E099",
        "border": "#F5A62322", "card_bg": "#150F06",
        "eyebrow": "Construction Platform",
        "form_title": "Every project, on track.",
        "form_sub": "Tell us about your construction business — we'll configure Builven for your workflow.",
        "extra_fields": [
            ("Company Size", "select", ["Solo contractor", "Small team (2–10)", "Medium (11–50)", "Large (50+)"]),
            ("Project Types", "select", ["Residential", "Commercial", "Infrastructure", "Mixed"]),
            ("Biggest Pain Point", "textarea", "e.g. Project tracking, subcontractor management, invoicing, materials, scheduling..."),
        ],
        "package_label": "Plan",
        "packages": ["Starter — $99/mo (3 active projects)", "Pro — $249/mo (unlimited projects)", "Enterprise — Custom", "Just exploring"]
    },
    {
        "slug": "drovon", "name": "Drovon", "industry": "Logistics",
        "tagline": "Logistics, On Command.",
        "font_head": "Space+Grotesk:wght@700;800", "font_body": "Inter:wght@300;400;500",
        "font_head_name": "Space Grotesk", "font_body_name": "Inter",
        "accent": "#FF6B35", "bg": "#080808", "text": "#F5F5F5", "muted": "#F5F5F599",
        "border": "#FF6B3522", "card_bg": "#101010",
        "eyebrow": "Logistics Platform",
        "form_title": "Move more. Manage less.",
        "form_sub": "Set up your Drovon fleet and delivery operations — we'll have you running within 24 hours.",
        "extra_fields": [
            ("Fleet Size", "select", ["1–5 vehicles", "6–20", "21–100", "100+"]),
            ("Operation Type", "select", ["Last-mile delivery", "Freight", "Courier", "Food delivery", "Mixed"]),
            ("Top Challenge", "textarea", "e.g. Route optimization, driver tracking, delivery confirmation, customer notifications..."),
        ],
        "package_label": "Plan",
        "packages": ["Starter — $129/mo (up to 10 drivers)", "Growth — $299/mo (up to 50)", "Enterprise — Custom", "Just exploring"]
    },
    {
        "slug": "trovren", "name": "Trovren", "industry": "Education",
        "tagline": "Education, Elevated.",
        "font_head": "Nunito:wght@700;800;900", "font_body": "Nunito:wght@300;400;500;600",
        "font_head_name": "Nunito", "font_body_name": "Nunito",
        "accent": "#7C4DFF", "bg": "#07050F", "text": "#EEE8FF", "muted": "#EEE8FF99",
        "border": "#7C4DFF22", "card_bg": "#0D0A1A",
        "eyebrow": "Education Platform",
        "form_title": "Teach, track, transform.",
        "form_sub": "Set up your Trovren school profile — built for Caribbean educational institutions.",
        "extra_fields": [
            ("Institution Type", "select", ["Primary School", "Secondary School", "University / College", "Tutoring Centre", "Online Education", "Other"]),
            ("Number of Students", "select", ["Under 100", "100–500", "500–2000", "2000+"]),
            ("Priority Feature", "textarea", "e.g. Attendance tracking, grade management, parent portal, online classes, fee collection..."),
        ],
        "package_label": "Plan",
        "packages": ["Starter — $99/mo (up to 200 students)", "School — $299/mo (up to 1000)", "Institution — Custom", "Just exploring"]
    },
    {
        "slug": "stamven", "name": "Stamven", "industry": "Fitness",
        "tagline": "Fitness, Managed.",
        "font_head": "Bebas+Neue", "font_body": "Inter:wght@300;400;500;600",
        "font_head_name": "Bebas Neue", "font_body_name": "Inter",
        "accent": "#E63946", "bg": "#080808", "text": "#F5F5F5", "muted": "#F5F5F599",
        "border": "#E6394622", "card_bg": "#101010",
        "eyebrow": "Fitness Platform",
        "form_title": "Run your gym smarter.",
        "form_sub": "Get Stamven set up for your fitness business — memberships, classes, trainers, all in one place.",
        "extra_fields": [
            ("Facility Type", "select", ["Gym / Fitness Centre", "Yoga / Pilates Studio", "Martial Arts", "CrossFit Box", "Personal Training", "Other"]),
            ("Active Members", "select", ["Under 50", "50–200", "200–500", "500+"]),
            ("Key Need", "textarea", "e.g. Membership management, class scheduling, trainer tracking, payment processing..."),
        ],
        "package_label": "Plan",
        "packages": ["Starter — $79/mo (up to 100 members)", "Studio — $179/mo (up to 500)", "Enterprise — Custom", "Just exploring"]
    },
    {
        "slug": "ledra", "name": "Ledra", "industry": "Accounting",
        "tagline": "Books, Balanced.",
        "font_head": "Cormorant+Garamond:wght@600;700", "font_body": "Inter:wght@300;400;500;600",
        "font_head_name": "Cormorant Garamond", "font_body_name": "Inter",
        "accent": "#1A8C5B", "bg": "#060A08", "text": "#EAF4EE", "muted": "#EAF4EE99",
        "border": "#1A8C5B22", "card_bg": "#090F0B",
        "eyebrow": "Accounting Platform",
        "form_title": "Your numbers, handled.",
        "form_sub": "Set up your Ledra workspace — invoicing, expenses, payroll, and reporting built for the Caribbean.",
        "extra_fields": [
            ("Business Type", "select", ["Sole Trader", "SME (under 20 staff)", "Medium Business (20–100)", "Accounting Firm", "Other"]),
            ("Currency / Market", "select", ["TTD (Trinidad & Tobago)", "JMD (Jamaica)", "BBD (Barbados)", "USD", "Multi-currency"]),
            ("What do you need?", "textarea", "e.g. Invoicing, expense tracking, payroll, tax reports, bank reconciliation, client portal..."),
        ],
        "package_label": "Plan",
        "packages": ["Solo — $59/mo (1 user, 50 invoices/mo)", "Business — $149/mo (5 users, unlimited)", "Firm — Custom", "Just exploring"]
    },
    {
        "slug": "merka", "name": "Merka", "industry": "Retail",
        "tagline": "Retail, Reinvented.",
        "font_head": "Space+Grotesk:wght@700;800", "font_body": "Inter:wght@300;400;500",
        "font_head_name": "Space Grotesk", "font_body_name": "Inter",
        "accent": "#FF3366", "bg": "#08080A", "text": "#F8F4FF", "muted": "#F8F4FF99",
        "border": "#FF336622", "card_bg": "#0F0F12",
        "eyebrow": "Retail Platform",
        "form_title": "Sell more. Stress less.",
        "form_sub": "Set up your Merka store — inventory, POS, and customer management all in one.",
        "extra_fields": [
            ("Store Type", "select", ["Physical Store", "Online Store", "Both", "Market / Pop-up"]),
            ("Product Categories", "select", ["Fashion / Apparel", "Food & Beverage", "Electronics", "Health & Beauty", "Home Goods", "Mixed"]),
            ("Key Need", "textarea", "e.g. POS system, inventory tracking, online orders, loyalty program, staff management..."),
        ],
        "package_label": "Plan",
        "packages": ["Starter — $89/mo (1 location)", "Multi-store — $229/mo (up to 5)", "Enterprise — Custom", "Just exploring"]
    },
    {
        "slug": "zelvon", "name": "Zelvon", "industry": "Car Rental",
        "tagline": "Drive Your Fleet.",
        "font_head": "Barlow+Condensed:wght@700;800", "font_body": "Barlow:wght@300;400;500;600",
        "font_head_name": "Barlow Condensed", "font_body_name": "Barlow",
        "accent": "#00B4D8", "bg": "#040C12", "text": "#E8F6FA", "muted": "#E8F6FA99",
        "border": "#00B4D822", "card_bg": "#07141C",
        "eyebrow": "Car Rental Platform",
        "form_title": "Your fleet, fully managed.",
        "form_sub": "Set up Zelvon for your rental operation — bookings, maintenance, payments in one dashboard.",
        "extra_fields": [
            ("Fleet Size", "select", ["1–5 vehicles", "6–20", "21–50", "50+"]),
            ("Rental Type", "select", ["Daily rentals", "Long-term leasing", "Corporate fleet", "Mixed"]),
            ("Top Need", "textarea", "e.g. Online booking, vehicle tracking, maintenance scheduling, payment processing, damage reporting..."),
        ],
        "package_label": "Plan",
        "packages": ["Starter — $99/mo (up to 10 vehicles)", "Fleet — $249/mo (up to 50)", "Enterprise — Custom", "Just exploring"]
    },
    {
        "slug": "trovrix", "name": "Trovrix", "industry": "HR",
        "tagline": "People, Powered.",
        "font_head": "DM+Sans:wght@700;800", "font_body": "DM+Sans:wght@300;400;500;600",
        "font_head_name": "DM Sans", "font_body_name": "DM Sans",
        "accent": "#6C63FF", "bg": "#07070F", "text": "#EEEEFF", "muted": "#EEEEFF99",
        "border": "#6C63FF22", "card_bg": "#0D0D1A",
        "eyebrow": "HR Platform",
        "form_title": "Build a better team.",
        "form_sub": "Set up Trovrix for your HR operations — hiring, payroll, and performance management simplified.",
        "extra_fields": [
            ("Company Size", "select", ["1–10 employees", "11–50", "51–200", "200+"]),
            ("Industry", "select", ["Retail / Hospitality", "Finance", "Healthcare", "Government", "Tech", "Other"]),
            ("Priority", "textarea", "e.g. Recruitment, onboarding, payroll, leave management, performance reviews, compliance..."),
        ],
        "package_label": "Plan",
        "packages": ["Starter — $79/mo (up to 25 employees)", "Business — $199/mo (up to 100)", "Enterprise — Custom", "Just exploring"]
    },
    {
        "slug": "zelrix", "name": "Zelrix", "industry": "Agriculture",
        "tagline": "Farm Smarter.",
        "font_head": "Nunito:wght@700;800;900", "font_body": "Nunito:wght@300;400;500;600",
        "font_head_name": "Nunito", "font_body_name": "Nunito",
        "accent": "#5DBB63", "bg": "#060C06", "text": "#EBF5EB", "muted": "#EBF5EB99",
        "border": "#5DBB6322", "card_bg": "#0A100A",
        "eyebrow": "Agriculture Platform",
        "form_title": "Your farm, your data.",
        "form_sub": "Set up Zelrix for your agricultural operation — crop management, workers, and supply chain simplified.",
        "extra_fields": [
            ("Farm Type", "select", ["Crop farming", "Livestock", "Mixed farming", "Aquaculture", "Agri-business / Distribution"]),
            ("Farm Size", "select", ["Small (under 5 acres)", "Medium (5–50 acres)", "Large (50–500 acres)", "Commercial (500+ acres)"]),
            ("Key Challenge", "textarea", "e.g. Crop tracking, worker management, inventory, supply chain, weather alerts, compliance..."),
        ],
        "package_label": "Plan",
        "packages": ["Starter — $69/mo (1 farm)", "Growth — $169/mo (up to 5 farms)", "Enterprise — Custom", "Just exploring"]
    },
    {
        "slug": "covrel", "name": "Covrel", "industry": "Insurance",
        "tagline": "Coverage, Covered.",
        "font_head": "Cormorant+Garamond:wght@600;700", "font_body": "Inter:wght@300;400;500;600",
        "font_head_name": "Cormorant Garamond", "font_body_name": "Inter",
        "accent": "#2563EB", "bg": "#050810", "text": "#EAF0FF", "muted": "#EAF0FF99",
        "border": "#2563EB22", "card_bg": "#080C18",
        "eyebrow": "Insurance Platform",
        "form_title": "Policies managed, claims sorted.",
        "form_sub": "Set up your Covrel workspace — built for Caribbean insurance brokers and underwriters.",
        "extra_fields": [
            ("Organisation Type", "select", ["Insurance Broker", "Underwriter", "Agency", "Corporate Risk Team"]),
            ("Lines of Business", "select", ["Motor", "Property", "Life & Health", "Marine", "Mixed"]),
            ("Top Need", "textarea", "e.g. Policy management, claims processing, client portal, renewals, compliance reporting..."),
        ],
        "package_label": "Plan",
        "packages": ["Starter — $149/mo (1 broker, 200 policies)", "Agency — $399/mo (unlimited)", "Enterprise — Custom", "Just exploring"]
    },
    {
        "slug": "vorel", "name": "Vorel", "industry": "Call Centre",
        "tagline": "Every Call, Handled.",
        "font_head": "Space+Grotesk:wght@700;800", "font_body": "Inter:wght@300;400;500",
        "font_head_name": "Space Grotesk", "font_body_name": "Inter",
        "accent": "#00D4AA", "bg": "#050C0A", "text": "#E8FBF6", "muted": "#E8FBF699",
        "border": "#00D4AA22", "card_bg": "#081410",
        "eyebrow": "Call Centre Platform",
        "form_title": "Run your team, not your phone.",
        "form_sub": "Set up Vorel for your contact centre — routing, scripts, reporting, and quality management built in.",
        "extra_fields": [
            ("Team Size", "select", ["1–10 agents", "11–50", "51–200", "200+"]),
            ("Call Type", "select", ["Inbound only", "Outbound only", "Blended"]),
            ("Key Need", "textarea", "e.g. Call routing, IVR, agent scripting, real-time monitoring, quality scoring, CRM integration..."),
        ],
        "package_label": "Plan",
        "packages": ["Starter — $129/mo (up to 10 agents)", "Business — $349/mo (up to 50)", "Enterprise — Custom", "Just exploring"]
    },
    {
        "slug": "drovrex", "name": "Drovrex", "industry": "Oil & Gas",
        "tagline": "Field Operations, Streamlined.",
        "font_head": "Barlow+Condensed:wght@700;800", "font_body": "Barlow:wght@300;400;500;600",
        "font_head_name": "Barlow Condensed", "font_body_name": "Barlow",
        "accent": "#F59E0B", "bg": "#080600", "text": "#FDF8EE", "muted": "#FDF8EE99",
        "border": "#F59E0B22", "card_bg": "#100C02",
        "eyebrow": "Oil & Gas Platform",
        "form_title": "Every field, every asset.",
        "form_sub": "Set up Drovrex for your energy operations — inspection logs, asset tracking, and compliance reporting.",
        "extra_fields": [
            ("Operation Type", "select", ["Upstream (Exploration & Production)", "Midstream (Transport & Storage)", "Downstream (Refining & Distribution)", "Oilfield Services"]),
            ("Team Size", "select", ["Under 50", "50–200", "200–1000", "1000+"]),
            ("Priority Feature", "textarea", "e.g. Asset management, inspection logs, HSE compliance, maintenance scheduling, incident reporting..."),
        ],
        "package_label": "Plan",
        "packages": ["Starter — $299/mo", "Business — $799/mo", "Enterprise — Custom", "Just exploring"]
    },
    {
        "slug": "polis", "name": "Polis", "industry": "Government",
        "tagline": "Government, Modernised.",
        "font_head": "DM+Serif+Display:ital,wght@0,400", "font_body": "Inter:wght@300;400;500;600",
        "font_head_name": "DM Serif Display", "font_body_name": "Inter",
        "accent": "#1D4ED8", "bg": "#05080F", "text": "#EBF1FF", "muted": "#EBF1FF99",
        "border": "#1D4ED822", "card_bg": "#080C18",
        "eyebrow": "Government Platform",
        "form_title": "Better services. Less paperwork.",
        "form_sub": "Set up Polis for your government department — case management, citizen services, and compliance built in.",
        "extra_fields": [
            ("Department Type", "select", ["Municipal / Local Government", "National Ministry", "Regulatory Body", "Public Utility", "Other"]),
            ("Country", "select", ["Trinidad & Tobago", "Jamaica", "Barbados", "Guyana", "Other Caribbean"]),
            ("Main Goal", "textarea", "e.g. Citizen case management, permit processing, inter-department communication, public reporting, digital forms..."),
        ],
        "package_label": "Plan",
        "packages": ["Department — $499/mo", "Ministry — $1,499/mo", "National — Custom", "Just exploring"]
    },
    {
        "slug": "lunel", "name": "Lunel", "industry": "Hospitality",
        "tagline": "Hospitality, Perfected.",
        "font_head": "Cormorant+Garamond:wght@600;700", "font_body": "Inter:wght@300;400;500;600",
        "font_head_name": "Cormorant Garamond", "font_body_name": "Inter",
        "accent": "#C9A96E", "bg": "#080600", "text": "#FBF7F0", "muted": "#FBF7F099",
        "border": "#C9A96E22", "card_bg": "#100E08",
        "eyebrow": "Hospitality Platform",
        "form_title": "Every guest, a great experience.",
        "form_sub": "Set up Lunel for your property — reservations, housekeeping, F&B, and guest management in one system.",
        "extra_fields": [
            ("Property Type", "select", ["Hotel", "Boutique / Guesthouse", "Villa / Resort", "Airbnb / Short-term rental", "Restaurant with rooms", "Other"]),
            ("Number of Rooms / Units", "select", ["1–10", "11–30", "31–100", "100+"]),
            ("Key Need", "textarea", "e.g. Booking management, housekeeping, front desk, restaurant POS, guest messaging, reporting..."),
        ],
        "package_label": "Plan",
        "packages": ["Property — $149/mo (up to 20 rooms)", "Hotel — $399/mo (up to 100 rooms)", "Resort — Custom", "Just exploring"]
    },
    {
        "slug": "verdra", "name": "Verdra", "industry": "Legal",
        "tagline": "Law, Organised.",
        "font_head": "Cormorant+Garamond:wght@600;700", "font_body": "Inter:wght@300;400;500;600",
        "font_head_name": "Cormorant Garamond", "font_body_name": "Inter",
        "accent": "#8B5E3C", "bg": "#080604", "text": "#F5F0E8", "muted": "#F5F0E899",
        "border": "#8B5E3C22", "card_bg": "#100E08",
        "eyebrow": "Legal Platform",
        "form_title": "Your practice, under control.",
        "form_sub": "Set up Verdra for your firm — case management, client billing, and document management built for Caribbean law.",
        "extra_fields": [
            ("Practice Type", "select", ["Solo Practitioner", "Small Firm (2–10)", "Medium Firm (11–50)", "Corporate Legal Team"]),
            ("Specialisation", "select", ["Commercial / Corporate", "Family Law", "Criminal", "Property / Conveyancing", "Mixed / General Practice"]),
            ("Top Need", "textarea", "e.g. Case tracking, document management, time billing, client portal, court deadlines, compliance..."),
        ],
        "package_label": "Plan",
        "packages": ["Solo — $99/mo", "Firm — $299/mo (up to 10 attorneys)", "Enterprise — Custom", "Just exploring"]
    },
]


def build_html(s):
    # Build options for extra fields
    extra_html = ""
    for label, ftype, opts_or_placeholder in s["extra_fields"]:
        extra_html += f'\n  <div class="field"><label>{label}</label>'
        if ftype == "select":
            extra_html += f'\n    <select><option value="">Select...</option>'
            for o in opts_or_placeholder:
                extra_html += f'<option>{o}</option>'
            extra_html += '</select>'
        elif ftype == "textarea":
            extra_html += f'\n    <textarea placeholder="{opts_or_placeholder}"></textarea>'
        elif ftype == "text":
            extra_html += f'\n    <input type="text" placeholder="{opts_or_placeholder}"/>'
        extra_html += '</div>'

    packages_html = "<option value=''>Select a plan...</option>"
    for p in s["packages"]:
        packages_html += f"<option>{p}</option>"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Get Started — {s['name']}</title>
<meta name="robots" content="noindex"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family={s['font_head']}&family={s['font_body']}&display=swap"/>
<style>
*{{margin:0;padding:0;box-sizing:border-box}}
body{{background:{s['bg']};color:{s['text']};font-family:'{s['font_body_name']}',sans-serif;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:60px 24px 80px}}
a{{text-decoration:none;color:inherit}}
:root{{--accent:{s['accent']};--bg:{s['bg']};--text:{s['text']};--muted:{s['muted']};--border:{s['border']};--card:{s['card_bg']}}}

.top{{display:flex;align-items:center;justify-content:space-between;width:100%;max-width:560px;margin-bottom:48px}}
.nav-logo{{font-family:'{s['font_head_name']}',sans-serif;font-size:1.1rem;font-weight:700;color:var(--accent)}}
.back{{font-size:0.8rem;color:var(--muted);transition:color 0.2s}}
.back:hover{{color:var(--text)}}

.card{{width:100%;max-width:560px;background:var(--card);border:1px solid var(--border);padding:44px 40px}}
.card-eyebrow{{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:3px;color:var(--accent);margin-bottom:14px}}
.card h1{{font-family:'{s['font_head_name']}',sans-serif;font-size:2rem;font-weight:700;color:var(--text);margin-bottom:8px;line-height:1.1}}
.card p.sub{{color:var(--muted);font-size:0.88rem;margin-bottom:36px;line-height:1.65}}

.field{{margin-bottom:20px}}
label{{display:block;font-size:0.72rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:7px}}
input,textarea,select{{width:100%;background:{s['bg']};border:1px solid var(--border);padding:12px 14px;color:var(--text);font-family:'{s['font_body_name']}',sans-serif;font-size:0.9rem;outline:none;transition:border-color 0.2s;-webkit-appearance:none;border-radius:0}}
input:focus,textarea:focus,select:focus{{border-color:var(--accent)}}
textarea{{resize:vertical;min-height:100px;line-height:1.6}}
select option{{background:{s['bg']}}}
.row{{display:grid;grid-template-columns:1fr 1fr;gap:14px}}

.divider{{height:1px;background:var(--border);margin:28px 0}}

.submit{{width:100%;background:var(--accent);color:{s['bg']};border:none;padding:16px;font-family:'{s['font_head_name']}',sans-serif;font-size:1rem;font-weight:700;cursor:pointer;transition:all 0.2s;letter-spacing:0.3px;margin-top:8px}}
.submit:hover{{opacity:0.88;transform:translateY(-1px)}}

.note{{font-size:0.75rem;color:var(--muted);text-align:center;margin-top:14px;line-height:1.6}}

@media(max-width:480px){{.card{{padding:28px 20px}}.row{{grid-template-columns:1fr}}}}
</style>
</head>
<body>

<div class="top">
  <a class="nav-logo" href="/{s['slug']}/">{s['name']}</a>
  <a class="back" href="/{s['slug']}/">← Back</a>
</div>

<div class="card">
  <div class="card-eyebrow">{s['eyebrow']}</div>
  <h1>{s['form_title']}</h1>
  <p class="sub">{s['form_sub']}</p>

  <div class="row">
    <div class="field"><label>Your Name *</label><input type="text" placeholder="Full name"/></div>
    <div class="field"><label>WhatsApp *</label><input type="tel" placeholder="+1 868 000 0000"/></div>
  </div>
  <div class="field"><label>Email Address *</label><input type="email" placeholder="you@example.com"/></div>
  <div class="field"><label>Organisation / Business Name</label><input type="text" placeholder="Optional"/></div>
  <div class="field">
    <label>{s['package_label']} *</label>
    <select>{packages_html}</select>
  </div>{extra_html}
  <div class="field"><label>How did you find us?</label>
    <select><option value="">Select...</option><option>Facebook</option><option>Instagram</option><option>Google</option><option>Referral</option><option>Other</option></select>
  </div>

  <div class="divider"></div>
  <button class="submit">Submit →</button>
  <p class="note">We'll reach out within 2 hours to confirm your details and get you set up.</p>
</div>

</body>
</html>"""


def github_deploy(path, content, message):
    url = f"https://api.github.com/repos/{REPO}/contents/{path}"
    # Check if file exists to get sha
    result = subprocess.run(
        ["curl", "-sf", url, "-H", f"Authorization: token {TOKEN}", "-H", "Accept: application/vnd.github.v3+json"],
        capture_output=True, text=True
    )
    sha = ""
    try:
        existing = json.loads(result.stdout)
        sha = existing.get("sha", "")
    except:
        pass

    encoded = base64.b64encode(content.encode()).decode()
    payload = {"message": message, "content": encoded}
    if sha:
        payload["sha"] = sha

    result = subprocess.run(
        ["curl", "-sf", "-X", "PUT", url,
         "-H", f"Authorization: token {TOKEN}",
         "-H", "Accept: application/vnd.github.v3+json",
         "-H", "Content-Type: application/json",
         "-d", json.dumps(payload)],
        capture_output=True, text=True
    )
    try:
        r = json.loads(result.stdout)
        return "commit" in r or "content" in r
    except:
        return False


built = []
failed = []

for s in SAAS:
    slug = s["slug"]
    html = build_html(s)

    # Save locally
    os.makedirs(f"{WORKSPACE}/site/{slug}/start", exist_ok=True)
    local_path = f"{WORKSPACE}/site/{slug}/start/index.html"
    with open(local_path, "w") as f:
        f.write(html)

    # Deploy to GitHub
    gh_path = f"site/{slug}/start/index.html"
    ok = github_deploy(gh_path, html, f"Add /start/ intake form for {s['name']} ({s['industry']})")
    if ok:
        built.append(slug)
        print(f"✅ {slug} ({s['industry']})")
    else:
        failed.append(slug)
        print(f"❌ {slug} — deploy failed")
    time.sleep(0.4)

print(f"\nDone. Built: {len(built)}, Failed: {len(failed)}")
if failed:
    print("Failed:", failed)
