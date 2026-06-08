# Dricil AI - Marketing at the speed of thought

Dricil is a fully autonomous AI-powered digital marketing agency. It manages social media, email campaigns, blogs, and ads for businesses without any human intervention.

## Brand Identity
- **Name:** Dricil
- **Domain:** dricil.com
- **Colors:** Teal (#008080), Dark Navy (#0A1E3C), Accent (#00C9A7)
- **Engine:** OpenAI GPT-4o

## Architecture
- **Frontend:** HTML5, CSS3, Vanilla JS
- **Database:** Supabase (PostgreSQL)
- **AI Core:** `content-engine/generator.js` powered by `shared/api.js` (OpenAI GPT-4o)
- **Payment Stack:** PayPal, Crypto (ERC-20), Payoneer (No Stripe)

## Packages
- **Starter ($297/mo):** 15 posts, 3 platforms, SEO audit.
- **Growth ($597/mo):** 30 posts, 5 platforms, emails, blogs, ads, competitor monitoring.
- **Sovereign ($1,200/mo):** 60 posts, all platforms, priority AI optimization.

## File Structure
- `landing/`: Marketing landing page.
- `onboarding/`: Client intake form.
- `dashboard/`: Client management portal.
- `admin/`: Internal agency dashboard.
- `content-engine/`: AI generation logic.
- `shared/`: Styles, API clients, and common logic.
- `schema.sql`: Database schema for Supabase.

## Deployment
1. Import `schema.sql` into Supabase.
2. Configure `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `shared/app.js`.
3. Configure `OPENAI_API_KEY` in `shared/api.js`.
4. Deploy the files to your static hosting provider (e.g., Vercel, Netlify, or Priscion CDN).

---
&copy; 2026 Priscion Empire. Built for sovereign marketing.
