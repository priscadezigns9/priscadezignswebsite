# Sierra Chatbot Intake — Design Specification

## 1. Visual Theme & Atmosphere
A focused extension of the existing Prisca Dezigns customer-relations page: calm luxury, confident, private, and operational. The page should feel like a guided onboarding conversation, not a generic contact form. Primary atmosphere: deep plum field, warm gold signal, frosted white panels, restrained motion.

## 2. Color Palette & Roles
- `--bg`: #210038 — deep plum page field
- `--panel`: rgba(255,255,255,.12) — frosted panel
- `--panel-strong`: #ffffff — input surface
- `--ink`: #241034 — input text
- `--muted`: rgba(255,255,255,.70) — supporting text
- `--gold`: #d6b35a — action/accent
- `--gold-soft`: #f4e7bc — accent wash
- `--line`: rgba(255,255,255,.18) — borders
- `--danger`: #ffb4b4 — validation

## 3. Typography Rules
Use Inter with system sans fallback. Eyebrows uppercase with letter-spacing; hero uses clamp(2.2rem, 6vw, 4.8rem); body 1rem/1.65; labels .76rem/1.2. Keep copy short and precise.

## 4. Component Stylings
- Header: minimal back link and progress/status marker.
- Hero: headline, one-sentence explanation, plan context.
- Form sections: numbered cards, one primary question per line, generous spacing.
- Inputs: white background, plum text, 12px radius, gold focus ring.
- Buttons: gold filled primary, translucent secondary; visible hover/focus/disabled states.
- Summary card: selected plan and privacy note.
- Success state: clear confirmation and next-step expectation.

## 5. Layout Principles
Max-width 920px; 16px mobile gutters, 32px desktop gutters; single-column form with two-column rows at 720px+. Sections use 24–32px vertical rhythm. Required fields are marked with `*` and plain-language helper text.

## 6. Depth & Elevation
Panels use subtle shadow `0 24px 70px rgba(0,0,0,.22)` and 14px backdrop blur. Avoid excessive glow; use one gold focus accent.

## 7. Animation & Interaction
L1: fade/translate-up entrance for hero and section cards; 180–260ms hover transitions. Respect `prefers-reduced-motion`. No scroll-jacking, heavy assets, or auto-playing media.

## 8. Do's and Don'ts
- Do separate business audit from implementation intake.
- Do make chatbot-only scope explicit.
- Do collect approved business knowledge and escalation rules.
- Do explain that the client reviews answers before launch.
- Do keep the form scannable and saveable only on submit.
- Don't promise voice, WhatsApp, email, CRM, or booking unless selected and agreed.
- Don't collect passwords or unnecessary sensitive personal information.
- Don't hide pricing scope or the next step.
- Don't use a generic “submit” label; use a clear setup-intent label.

## 9. Responsive Behavior
At <=720px use one column, 44px minimum touch targets, 16px inputs, and sticky bottom action only when appropriate. At <=480px reduce hero spacing and keep the confirmation summary readable without horizontal overflow. Keyboard focus must remain visible.
