# Hartaly — Your 2 AM Calm.

An AI-powered mental wellness platform designed for warmth, privacy, and evidence-based support. Part of the Orcinos/Prisca Dezigns Empire.

## Features

- **Hartaly Chat**: GPT-4o powered AI coach trained in CBT and mindfulness.
- **Mood Tracker**: Visual heatmap and slider for daily emotional logging.
- **Guided Journal**: AI-generated prompts based on user mood data.
- **CBT Toolkit**: 50 evidence-based exercises for various mental health challenges.
- **Breathing Room**: 6 breathing techniques with CSS animations and audio cues.
- **Crisis Protocol**: Automated crisis detection and direct help resource integration.

## Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (Vanilla)
- **Database/Auth**: Supabase
- **AI Engine**: OpenAI GPT-4o
- **Payment Strategy**: PayPal, Payoneer, Crypto (ERC-20: 0xcef857e82c306b3d0f2db080e7794f4bb376049e)

## Installation & Setup

1. **Supabase**: Run `schema.sql` in your Supabase SQL editor.
2. **API Keys**: Update `shared/app.js` with your `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `OPENAI_API_KEY`.
3. **Deploy**: Upload the `hartaly/` directory to any static hosting provider (Vercel, Netlify, GitHub Pages, or Priscion Sovereign Nodes).

## Crisis Protocol
Hartaly is NOT a crisis intervention service. If crisis language is detected, the AI will immediately stop coaching and provide international hotline numbers.

---
© 2026 Hartaly. Built by the Priscion AI Architect.
