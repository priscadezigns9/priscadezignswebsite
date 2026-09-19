# Nurasen Neural Defense

Quantum-Secure Signal Inspection by **Priscion Empire**.

## Features
- **Real-time Page Scanner**: Detects trackers, phishing URLs, and insecure connections.
- **Threat Levels**: Visual indicator (SAFE/WARNING/DANGER) in the extension popup.
- **Auto-Block**: Hardcoded blocklist for common malicious domains using `declarativeNetRequest`.
- **Global Stats**: Track your security footprint across the web.

## Installation (Developer Mode)
1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in top right).
4. Click **Load unpacked** and select the `nurasen_extension` folder.

## Project Structure
- `manifest.json`: Extension metadata (MV3).
- `background.js`: Service worker for stats and badge updates.
- `content.js`: Page analysis script.
- `popup.html/css/js`: Main extension UI.
- `options.html/js`: Settings and Pro upgrade page.
- `rules.json`: Declarative blocklist rules.

## Brand Guidelines
- **Primary Color**: #00FFFF (Cyan)
- **Background**: #000000 (Black)
- **Typography**: Inter (900 weight for headers)

## Monetization
Upgrade to **Nurasen Pro** ($5.99/month) for:
- Auto-blocking of 10k+ trackers
- VPN Leak Detection
- Real-time Phishing API Integration

Visit [priscadezigns.org/nurasen/pro](https://priscadezigns.org/nurasen/pro) to upgrade.
