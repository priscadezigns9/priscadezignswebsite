# Prayerblock - Faith + Productivity

Prayerblock is a sovereign productivity tool built for Christians to organize their lives around scripture, prayer, and faith goals. It's designed to feel like a leather-bound journal meets a modern app.

## Features

- **Daily Planner:** Time-blocked schedule with a daily "Anchor Verse".
- **Prayer Tracker:** Log and track answered prayers.
- **Gratitude Journal:** Daily 3-line gratitude practice.
- **Goal Setting:** Track faith, personal, and ministry objectives.
- **Scripture Memory (Pro):** Spaced-repetition flashcard system for memorizing verses.
- **Daily Devotionals (Pro):** Curated 3-minute spiritual reflections.
- **Community Prayer Wall (Pro):** Anonymous shared prayer requests with real-time updates.

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend/Database:** Supabase (Auth + PostgreSQL)
- **Design:** Forest Green (#1A3A2A), Gold (#C9A84C), Cream (#F8F4E8)
- **Fonts:** Georgia (Headings), Inter (UI)

## Setup

1. **Supabase Schema:** Run the contents of `schema.sql` in your Supabase SQL Editor.
2. **Configuration:** Update `shared/app.js` with your `SUPABASE_URL` and `SUPABASE_KEY`.
3. **Deployment:** Host the files on any static site hosting (Vercel, Netlify, GitHub Pages).

## Payment Stack

<!-- <!-- Stripe removed. Empire uses PayPal + Crypto + Payoneer only --> removed. Empire uses PayPal + Crypto + Payoneer only -->
- **PayPal:** Integrated button for subscription management.
- **Crypto:** ERC-20 Support (Wallet: `0xcef857e82c306b3d0f2db080e7794f4bb376049e`).
- **Payoneer:** Supported for manual billing.

---
An **Orcinos** Product. Part of the **Priscion Empire**.


