#!/usr/bin/env python3
"""Daily SEO & health audit for priscadezigns.org.
Exits non-zero (and prints a report) when problems are found."""

import re
import sys
import urllib.request

SITE = "https://priscadezigns.org"
problems = []
warnings = []


def fetch(url, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": "PriscaAuditBot/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return 0, str(e)


# ---- 1. Homepage up & healthy ----
status, html = fetch(SITE + "/")
if status != 200:
    problems.append(f"Homepage returned HTTP {status} — SITE MAY BE DOWN")
    print("\n".join("- " + p for p in problems))
    sys.exit(1)

# ---- 2. Unrendered credential placeholders (the bug that broke the lead form) ----
if "{{credential" in html or "{{secret" in html:
    problems.append("Unrendered credential placeholder found in homepage source — lead form is likely BROKEN")

# ---- 3. Supabase URL/key project mismatch ----
url_ref = re.search(r'https://([a-z0-9]+)\.supabase\.co', html)
key_match = re.search(r'eyJ[A-Za-z0-9_-]+\.([A-Za-z0-9_-]+)\.', html)
if url_ref and key_match:
    import base64
    try:
        payload = key_match.group(1)
        payload += "=" * (-len(payload) % 4)
        decoded = base64.urlsafe_b64decode(payload).decode()
        key_ref = re.search(r'"ref"\s*:\s*"([a-z0-9]+)"', decoded)
        if key_ref and key_ref.group(1) != url_ref.group(1):
            problems.append(
                f"Supabase project mismatch: URL project '{url_ref.group(1)}' vs key project '{key_ref.group(1)}' — form submissions will FAIL")
    except Exception:
        pass

# ---- 4. Homepage SEO essentials ----
checks = {
    "meta description": r'name=["\']description["\']',
    "og:title": r'property=["\']og:title["\']',
    "og:image": r'property=["\']og:image["\']',
    "canonical tag": r'rel=["\']canonical["\']',
    "JSON-LD structured data": r'application/ld\+json',
}
for label, pattern in checks.items():
    if not re.search(pattern, html, re.I):
        warnings.append(f"Homepage missing {label}")

# ---- 5. robots.txt & sitemap present ----
for path in ("/robots.txt", "/sitemap.xml"):
    s, _ = fetch(SITE + path)
    if s != 200:
        problems.append(f"{path} returned HTTP {s}")

# ---- 6. Every sitemap URL resolves ----
s, sitemap = fetch(SITE + "/sitemap.xml")
urls = []
if s == 200:
    urls = re.findall(r"<loc>([^<]+)</loc>", sitemap)
    for u in urls:
        code, _ = fetch(u)
        if code != 200:
            problems.append(f"Sitemap URL broken: {u} -> HTTP {code}")

# ---- Report ----
print(f"# Daily Audit — {SITE}")
print(f"\nSitemap URLs checked: {len(urls) if s == 200 else 'n/a'}")
if problems:
    print(f"\n## 🚨 Problems ({len(problems)})")
    print("\n".join("- " + p for p in problems))
if warnings:
    print(f"\n## ⚠️ Warnings ({len(warnings)})")
    print("\n".join("- " + w for w in warnings))
if not problems and not warnings:
    print("\n✅ All checks passed.")

sys.exit(1 if problems else 0)
