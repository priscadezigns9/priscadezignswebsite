# Captio AI - Professional Social Media Caption Generator

Captio AI is a powerful Chrome extension designed for social media managers, creators, and entrepreneurs. Generate high-fidelity captions for any image on the web using a robust template engine or OpenAI's GPT-4o-mini.

## Features
- **Contextual Integration:** Right-click any image to generate a caption instantly.
- **Multi-Platform Support:** Tailored captions for Instagram, Threads, Facebook, Twitter, and LinkedIn.
- **Tone Selection:** Choose from Professional, Hype, Inspirational, Luxury, or Spiritual.
- **AI-Powered:** Connect your OpenAI API key for unique, context-aware captions using GPT-4o-mini.
- **High-Quality Templates:** 125+ hand-crafted templates for offline/no-key usage.
- **Hashtag Generator:** Instant relevant hashtags for every tone.
- **Character Counter:** Real-time enforcement of platform limits.
- **Privacy First:** Your API key is stored securely in your browser's sync storage.

## Installation (Developer Mode)
1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the `captio_ai_final` directory.

## Submission to Chrome Web Store
1. Compress the contents of the `captio_ai_final` directory into a ZIP file (excluding any `.git` or system files).
2. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
3. Click **New Item** and upload the ZIP file.
4. Fill in the required metadata, screenshots, and privacy policy.
5. Submit for review.

## Tech Specs
- **Manifest Version:** 3
- **Language:** JavaScript, HTML5, CSS3
- **Storage:** chrome.storage.sync (settings), chrome.storage.local (usage tracking)
- **API:** OpenAI Chat Completions (GPT-4o-mini)

---
Built by Prisca Dezigns Software Division.
