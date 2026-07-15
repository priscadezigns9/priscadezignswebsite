# STANDARD OPERATING PROCEDURE
## SOP-AI-003 | Website Chat AI Automation

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-AI-003 |
| **Title** | Website Chat AI Automation |
| **Department** | AI Automation Division — Prisca Dezigns |
| **Parent Document** | SOP-AI-000 General AI Services Master Framework |
| **Version** | 1.0 |
| **Effective Date** | 2026-07-15 |
| **Review Date** | 2027-01-15 |
| **Owner** | Lead Strategist — Prisca Dezigns |
| **Classification** | Internal — Controlled Document |
| **Status** | Active |

---

## 1. PURPOSE

This SOP governs the design, deployment, operation, quality assurance, and compliance of AI-powered website chat automation services delivered by Prisca Dezigns. This covers the Sierra-class AI chatbot embedded on client websites and the Prisca Dezigns master site. It is subordinate to SOP-AI-000 and must be read alongside that master document.

---

## 2. SCOPE

This SOP applies to:
- AI chatbots embedded on client websites (any domain)
- The Prisca Dezigns master chatbot (Sierra) at priscadezigns.org
- Lead capture forms driven by AI conversation flows
- Website chat-to-CRM integrations
- All tiers delivering website chat: Tier 1, Tier 2, Tier 3, and Tier 4

---

## 3. LEGAL AND REGULATORY FRAMEWORK

### 3.1 Trinidad and Tobago
| Law | Website Chat-Specific Obligation |
|---|---|
| **Data Protection Act, 2011** | Any data collected via chat (name, email, phone) is personal data. Cookie consent and chat data consent required before collection begins. |
| **Electronic Transactions Act, Chap. 22:06** | Chat interactions are electronic communications. Chat logs constitute electronic records. |
| **Consumer Protection and Safety Act** | No deceptive AI personas, no false product or pricing claims via chatbot. |

### 3.2 International
| Law / Standard | Website Chat-Specific Obligation |
|---|---|
| **GDPR (EU) 2016/679** | Cookie consent banner required before chat widget loads if collecting data from EU visitors. Data minimisation — only collect what is necessary. |
| **ePrivacy Directive (EU)** | Chat session cookies require prior informed consent for EU users. |
| **WCAG 2.1 AA** | Chat widget must be keyboard navigable, screen reader compatible, and meet colour contrast standards. |
| **ISO 9001:2015** | Documented design and development process for chatbot build, testing, and delivery. |
| **ISO/IEC 27001:2022** | Chat logs containing personal data must be encrypted at rest and in transit. |
| **ISO/IEC 42001:2023** | AI chatbot must operate within defined, documented, and auditable parameters. Transparency about AI nature required. |

---

## 4. CHATBOT TIERS

### Tier 1 — Basic (Website Only)
- Static FAQ responses only
- Lead capture form (name, email, message)
- Email notification to client on new lead
- No AI brain — rule-based decision tree

### Tier 2 — AI-Powered Chat (Website + WhatsApp Bridge)
- AI brain (Claude API) handles natural language queries
- Qualification flow (budget, service, timeline)
- Lead logged to Supabase and optionally forwarded to WhatsApp
- Escalation to human via WhatsApp handoff

### Tier 3 — Full Inbox Integration
- AI handles website chat and email simultaneously
- Unified conversation history per contact
- CRM-connected — full contact profile built across interactions

### Tier 4 — Enterprise
- Multi-agent orchestration (chatbot, voice, email unified)
- Proactive chat triggers (exit intent, time on page, scroll depth)
- Full analytics dashboard
- Custom AI persona per client brand

---

## 5. APPROVED TECHNOLOGY STACK

| Component | Tool | Notes |
|---|---|---|
| Chat Widget — Prisca Dezigns | Custom Sierra (chatbot.js) | Deep Purple and Lilac design system |
| Chat Widget — Client Sites | Custom-branded Sierra build | Per Chatbot Sync Rule — one master script |
| AI Brain — Tier 2/3 | Claude API | Best tone, natural conversation |
| AI Brain — Tier 4 | Gemini 2.5 Pro | High volume enterprise |
| Pipeline | Make.com (small/mid) / n8n (enterprise) | Per client tier |
| Database | Supabase (client-isolated project) | RLS enforced — no cross-client data |
| Credential Storage | Prisca Dezigns encrypted vault | API keys never in client-facing code |

---

## 6. IMPLEMENTATION PROCESS

### Phase 1 — Discovery and Audit (Days 1–3)
- [ ] Audit client's website (URL, platform: WordPress, Webflow, custom HTML)
- [ ] Review current contact or inquiry method (form, phone, email)
- [ ] Identify top 10 questions customers ask (from client's knowledge)
- [ ] Identify escalation contacts (who gets notified when lead is captured)
- [ ] Confirm client's notification preference (email, WhatsApp, both)
- [ ] Determine tier based on client budget and need

### Phase 2 — Agreement and Legal (Days 3–5)
- [ ] Issue and obtain signed Service Agreement
- [ ] Issue and obtain signed Data Processing Agreement (DPA)
- [ ] Issue and obtain signed Acceptable Use Policy (AUP)
- [ ] Confirm privacy policy on client's website covers chatbot data collection — update if missing
- [ ] Confirm cookie consent mechanism in place if EU audience is served
- [ ] Document data flow: chat input → Supabase → client notification

### Phase 3 — Configuration (Days 5–10)
- [ ] Build AI knowledge base from client-supplied materials (FAQs, service list, pricing if approved)
- [ ] Configure AI persona: name, tone, greeting, banned topics, escalation phrases
- [ ] Build conversation flow:
  - Greeting message (must include AI disclosure)
  - Qualification questions
  - Lead capture (name, email, phone, inquiry type)
  - Escalation branch (human request or out-of-scope topic)
  - Closing message with next step
- [ ] Build Supabase table for client leads (client_leads schema minimum: id, name, email, phone, inquiry, created_at, reviewed)
- [ ] Connect lead capture to client notification (email or WhatsApp)
- [ ] Embed widget on client's website (script tag injection or platform plugin)
- [ ] Apply version tag to chatbot.js embed (e.g. chatbot.js?v=1.0)

### Phase 4 — Internal Testing (Days 10–12)
- [ ] Test minimum 20 conversation scenarios:
  - Standard inquiry (product / service / pricing)
  - Qualification flow (budget, timeline)
  - Lead capture completion
  - Human escalation request
  - Out-of-scope question
  - Abusive or inappropriate message
  - After-hours message
  - WCAG accessibility check (keyboard navigation, screen reader)
  - Mobile responsive check
  - Page load speed impact check (widget must not add more than 200ms to load time)
- [ ] Verify all leads logged correctly in Supabase
- [ ] Verify client notifications fire correctly
- [ ] Score all 20 interactions — minimum 90% pass rate required

### Phase 5 — Client UAT (Days 12–17)
- [ ] Provide client with staging URL for testing
- [ ] Client tests chat on their own site
- [ ] Collect written feedback
- [ ] Make approved adjustments (log each change, increment version if prompt changed)
- [ ] Obtain client sign-off before go-live

### Phase 6 — Go-Live (Day 17+)
- [ ] Deploy to production website
- [ ] Confirm widget loads on all target pages
- [ ] Confirm lead capture active and notifications firing
- [ ] Apply version tag to production embed
- [ ] Activate monitoring (error alerts, lead volume baseline)
- [ ] Schedule first monthly audit (30 days from go-live)

---

## 7. AI AGENT OPERATING STANDARDS

### 7.1 Conversation Standards
- First message must include AI disclosure: "Hi, I am [Name], [Client Brand]'s virtual assistant."
- Maximum response delay: 3 seconds for AI reply
- Maximum 3 unanswered messages before offering human escalation
- If user has not replied after 10 minutes: send one follow-up then close session
- Lead must only be logged after minimum: name AND one contact method (email or phone)

### 7.2 Prohibited Chatbot Behaviours
- Claiming to be human
- Quoting prices not in the approved knowledge base
- Making guarantees or commitments not authorised by the client
- Collecting sensitive personal data (government ID, payment details, health information)
- Auto-redirecting users to third-party sites without clear disclosure
- Continuing conversation after user says "stop", "no", "leave me alone", or equivalent

### 7.3 Accessibility Requirements (WCAG 2.1 AA)
- Chat button and window must be keyboard accessible (Tab, Enter, Escape to close)
- Colour contrast ratio: minimum 4.5:1 for text on background
- All interactive elements must have accessible labels
- Chat window must not trap keyboard focus
- Screen reader must announce new AI messages
- Widget must not auto-play audio or video

### 7.4 Performance Requirements
- Chat widget script must load asynchronously (must not block page render)
- Total widget payload: under 150KB
- Widget must not cause layout shift (CLS score impact: zero)
- Chat widget must function on mobile viewports (minimum 320px width)

---

## 8. DATA HANDLING

### 8.1 What Is Collected
| Data | Purpose | Stored Where |
|---|---|---|
| Name | Lead identification | Supabase — client_leads |
| Email address | Client notification and follow-up | Supabase — encrypted at rest |
| Phone number (if provided) | Client follow-up | Supabase — encrypted at rest |
| Inquiry type and summary | CRM categorisation | Supabase |
| Timestamp | Audit log | Supabase |
| Session ID (anonymised) | Conversation continuity | Session memory only — not persisted |
| Page URL where chat started | Context for AI | Supabase — audit log |

### 8.2 What Is Never Collected
- Government ID or passport number
- Payment card details
- Full biometric data
- Health or medical information
- Passwords or account credentials

### 8.3 Cookie and Consent
- Session cookies for chat continuity: functional — consent not required in most jurisdictions but must be disclosed
- Analytics cookies (if used): require explicit consent (EU / GDPR)
- Data collected in chat: inform user via chat disclosure and link to client's privacy policy

### 8.4 Retention
- Lead records: 12 months or per client contract — then archived or deleted
- Conversation logs: 12 months
- Session cookies: expire at end of browser session
- Purge process: automated quarterly deletion run from Supabase

---

## 9. QUALITY ASSURANCE

### 9.1 Weekly Spot Check
- Sample 10% of conversations from past 7 days
- Score against quality framework in SOP-AI-000 Section 7.1
- Check: lead capture rate, escalation rate, drop-off point in conversation
- Flag conversations where user abandoned mid-flow — investigate cause

### 9.2 Monthly Full Audit
- Pull full lead and conversation log from Supabase
- Calculate: total conversations, lead capture rate, resolution rate, escalation rate
- Review most common drop-off point — optimise conversation flow
- Deliver audit report to client

### 9.3 KPIs Per Client
| Metric | Target |
|---|---|
| Chat response time | Under 3 seconds |
| Lead capture rate (of conversations started) | Above 30% |
| Escalation rate (complex queries handled by human) | Under 25% |
| Conversation completion rate | Above 60% |
| Widget page load impact | Under 200ms added |
| WCAG 2.1 AA pass score | 100% |
| Quality score (sampled) | Above 90% |

---

## 10. CHATBOT SYNC RULE (PRISCA DEZIGNS INTERNAL)

Per established protocol — all pages across priscadezigns.org use one master chatbot.js:
- Single source of truth: chatbot.js at root
- Mirror at /templates/chatbot.js must match root exactly
- Version tag incremented on all pages with every change
- Pages in scope: index.html, services/index.html, templates/index.html
- Design system locked: Deep Purple (#301934) and Lilac (#C8A2C8)
- No separate chatbot files created for sub-brands or shops under any circumstances

---

## 11. CHANGE MANAGEMENT

All changes follow the 7-step process in SOP-AI-000 Section 9.
Website chat-specific additions:
- Knowledge base updates require client sign-off before deployment
- UI or design changes require visual QA pass on desktop and mobile before go-live
- Version tag on chatbot embed must be incremented on every change — stale cache is a compliance risk
- Any change to data collection fields requires re-review of DPA and privacy policy alignment

---

## 12. INCIDENT RESPONSE

In addition to the universal incident framework in SOP-AI-000 Section 8:

| Website Chat-Specific Incident | Classification | Action |
|---|---|---|
| Chatbot collecting data before consent (EU site) | P1 — Critical | Immediately disable widget, add consent gate, re-deploy |
| Lead data not logging to Supabase | P1 — Critical | Investigate pipeline, recover any lost leads, notify client |
| AI giving incorrect pricing or policy info | P2 — High | Update knowledge base immediately, review recent conversations |
| Widget breaking page layout (CLS or render block) | P2 — High | Roll back to previous version within 4 hours |
| Chatbot accessible to wrong client's data | P1 — Critical | Isolate immediately, audit access logs, assess breach notification |
| Widget script error causing site downtime | P1 — Critical | Remove embed immediately, investigate and fix before re-deploying |

---

## 13. VERSION HISTORY

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-07-15 | Lead Strategist — Prisca Dezigns | Initial release |

---

*This document is the property of Prisca Dezigns. Unauthorized distribution outside the organization is prohibited. All rights reserved.*

*Prisca Dezigns | priscadezigns.org | hello@priscadezigns.org*
