# D'Panyard - Trinidad's Business Directory

D'Panyard is a comprehensive business directory for Trinidad and Tobago, designed to connect both formal and informal businesses with local clients.

## Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Database/Auth:** Supabase
- **Payments:** <!-- <!-- Stripe removed. Empire uses PayPal + Crypto + Payoneer only --> removed. Empire uses PayPal + Crypto + Payoneer only --> (Integration Ready)

## Setup Instructions

### 1. Supabase Configuration
1. Create a new project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** and run the contents of `schema.sql`.
3. Go to **Project Settings > API**.
4. Copy your `Project URL` and `anon public key`.
5. Open `config/supabase.js` and update the constants:
   ```javascript
   const SUPABASE_URL = 'https://your-project-ref.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key';
   ```

### 2. Deployment
This project is built to be hosted on **GitHub Pages** or any static hosting service (Netlify, Vercel, etc.).

#### GitHub Pages:
1. Push this repository to GitHub.
2. Go to **Settings > Pages**.
3. Select the branch and folder (usually `main` and `/`).
4. Click Save. Your site will be live at `https://<username>.github.io/<repo-name>/landing/index.html`.

## Features
- **Real-time Search:** Filter businesses by category, district, or keyword.
- **Business Registration:** Multi-step onboarding for new businesses.
- **Profiles:** Detailed business pages with reviews and direct WhatsApp integration.
- **Inquiry System:** Customers can send messages directly to business owners.
- **Mobile First:** Fully responsive design optimized for mobile users in Trinidad.

## Local Development
Simply open `landing/index.html` in your browser. No local server is required as it uses the Supabase CDN and client-side logic.


