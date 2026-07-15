# STANDARD OPERATING PROCEDURE
## SOP-CH-003 | Website Chat AI Automation

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-CH-003 |
| **Title** | Website Chat AI Automation |
| **Department** | AI Automation Division — Prisca Dezigns |
| **Version** | 1.0 |
| **Effective Date** | 2026-07-15 |
| **Review Date** | 2027-01-15 |
| **Owner** | Lead Strategist — Prisca Dezigns |
| **Classification** | Internal — Controlled Document |
| **Status** | Active |
| **Governed By** | SOP-CH-000 — General AI Channel Standard · SOP-AI-000 — General AI Services Master Framework |

---

## 1. PURPOSE

This SOP defines the specific standards, legal obligations, technical requirements, and delivery protocols for all Website Chat AI Automation services delivered by Prisca Dezigns. It is subordinate to SOP-CH-000 and must be read in conjunction with it.

---

## 2. SCOPE

This SOP applies to:
- All Website Chat AI deployments for clients across any industry or tier
- All agents (Drew, Sierra, or human staff) involved in sales, onboarding, or delivery of website chat automation
- All chat widget technologies and embedded scripts deployed on client websites
- The Prisca Dezigns Sierra chatbot deployed on priscadezigns.org (internal reference implementation)

---

## 3. LEGAL AND REGULATORY FRAMEWORK

### 3.1 Trinidad and Tobago

| Law | Website Chat-Specific Obligation |
|---|---|
| **Data Protection Act, 2011 (TT)** | Any name, email, phone, or message content collected via website chat is personal data. A privacy notice must be displayed before data collection begins. Consent must be captured at the start of the chat session. |
| **Electronic Transactions Act, Chap. 22:06** | Chat transcripts where commitments are made (pricing agreements, bookings) are legally binding electronic records. They must be stored and retrievable. |
| **Consumer Protection and Safety Act (TT)** | The chat agent must not make misleading claims about services, pricing, or timelines. Promotional claims must be accurate and substantiated. |
| **Computer Misuse Act, Chap. 11:19** | The chat widget must not collect data beyond what the user knowingly provides. No hidden tracking or data harvesting beyond session analytics is permitted. |

### 3.2 International Standards

| Standard | Website Chat-Specific Obligation |
|---|---|
| **GDPR (EU) 2016/679** | If the website is accessible to EU residents, a GDPR-compliant cookie consent banner must be in place. Chat session data constitutes personal data. A privacy policy must be linked within the chat interface. Data subject rights (access, erasure) must be honoured. |
| **WCAG 2.1 AA** | The chat widget must be fully keyboard navigable, screen-reader compatible, and meet minimum colour contrast ratios. It must not block or obscure critical page content on mobile. |
| **OWASP Top 10** | The chat integration must not introduce XSS, CSRF, or injection vulnerabilities into the client's website. All user inputs must be sanitised before processing. |
| **ISO/IEC 27001:2022** | Chat session data, lead capture records, and API keys must be encrypted at rest and in transit. The chat embed script must be served over HTTPS only. |
| **ISO/IEC 42001:2023** | The AI chat system must be documented, its decision logic auditable, and its risk profile assessed before deployment on client sites. |

---

## 4. PREFERRED TECHNOLOGY STACK

| Component | Tool | Notes |
|---|---|---|
| **Chat Widget** | Custom embed (Sierra architecture) | Prisca Dezigns proprietary — Deep Purple / Lilac design system |
| **AI Brain (Small–Mid)** | Claude API | Best natural language, warmth, and accuracy |
| **AI Brain (Enterprise)** | Gemini 2.5 Pro | High-volume, Google-native |
| **Automation Pipeline** | Make.com / n8n | Connects chat to CRM, Supabase, or email |
| **Lead Storage** | Supabase (client_leads table) | Real-time, structured, queryable |
| **Hosting** | Client's existing website | Chat widget is embedded — no hosting migration required |

---

## 5. SERVICE SCOPE — WHAT WEBSITE CHAT AI DELIVERS

A deployed Website Chat AI agent handles:

- Engaging website visitors in real-time with intelligent, on-brand conversation
- Answering FAQs instantly — services, pricing (if authorised by client), hours, location
- Capturing high-fidelity leads — name, email, phone, service interest
- Qualifying visitors before escalating to the human sales team
- Booking appointments directly within the chat flow (with Appointment Booking add-on)
- Guiding visitors through the client's service or product catalogue
- Synchronising all lead data into the client's CRM or Supabase database
- Presenting sales logic and handling common objections (with Sales Logic add-on)
- Generating workplace incident reports (with HSE Reporting add-on — for applicable industries)
- Supporting Spanish or French-speaking visitors (with Multi-Language add-on)

---

## 6. PRICING

> All pricing governed by SOP-CH-000 Section 6. Reproduced here for agent reference.

### 6.1 Base Packages

| Tier | Implementation Fee | Monthly Management |
|---|---|---|
| **Starter** | From US$750 | From US$399/mo |
| **Growth** | From US$1,250 | From US$599/mo |
| **Enterprise** | From US$2,500 | From US$999/mo |

### 6.2 Applicable Add-Ons

| Add-On | Setup | Monthly | Notes |
|---|---|---|---|
| Sales Logic | +$300 | +$50/mo | Qualify, present, handle objections within chat |
| HSE Reporting | +$350 | +$50/mo | Incident capture via chat widget |
| Appointment Booking | +$200 | +$30/mo | Calendar integration in chat flow |
| Multi-Language | +$250 | +$30/mo | Spanish or French language layer |
| Additional Channel | +$200 | +$30/mo | Add WhatsApp or Email to existing package |

---

## 7. WEBSITE CHAT-SPECIFIC COMPLIANCE RULES

1. **Privacy Notice at Start:** Every chat session must begin with a brief privacy notice — e.g. "This chat is powered by AI. Any information you share will be used to assist you and may be stored securely. View our Privacy Policy [link]." The user must acknowledge before the chat proceeds.
2. **Cookie Consent:** If the chat widget uses session cookies or analytics, a cookie consent banner must be active on the client's website and must not fire the chat script until consent is granted (for EU-accessible sites).
3. **Data Minimisation:** The chat must only ask for information necessary to fulfill the visitor's request. It must not ask for sensitive personal data (health, financial, legal) without a specific, documented purpose.
4. **HTTPS Only:** The chat widget must only be deployed on pages served over HTTPS. HTTP deployment is prohibited.
5. **Input Sanitisation:** All text inputs from users must be sanitised to prevent XSS or injection attacks before being passed to the AI or stored in any database.
6. **AI Disclosure:** The chat interface must display clearly that the visitor is interacting with an AI assistant. The agent must confirm this if asked directly.
7. **Accessibility:** The chat widget must not trap keyboard focus, must be operable without a mouse, and must not score below 4.5:1 contrast ratio on text elements.
8. **Opt-Out:** Visitors must be able to close and dismiss the chat at any time. A returning visitor who previously opted out must not be automatically re-engaged.
9. **No Third-Party Sharing:** Chat session data may not be shared with third-party advertising or analytics platforms without the visitor's explicit consent.
10. **Script Integrity:** The chat embed script must be version-controlled. Changes to the master script (including the Sierra architecture) must follow the Chatbot Sync Rule — all pages updated in sync, version tag incremented.

---

## 8. ONBOARDING REQUIREMENTS

Before Website Chat goes live, the following must be in place:

- [ ] Client's website is HTTPS-secured
- [ ] Privacy Policy page exists and is linked within the chat widget
- [ ] Cookie consent mechanism verified (for EU-accessible sites)
- [ ] Chat persona name and tone approved by client
- [ ] FAQ and conversation flows reviewed and approved
- [ ] Escalation contact confirmed (human handoff email or WhatsApp)
- [ ] Lead capture connected to designated CRM or Supabase table
- [ ] Chat tested across 20+ conversation scenarios
- [ ] Accessibility check passed (keyboard nav, screen reader, contrast)
- [ ] OWASP input sanitisation confirmed
- [ ] Service Agreement and DPA-001 signed
- [ ] Go-live sign-off from Lead Strategist

---

## 9. DELIVERY TIMELINE

| Tier | Timeline |
|---|---|
| Starter | 5–7 business days |
| Growth | 10–14 business days |
| Enterprise | 21–30 business days |

---

## 10. INTERNAL REFERENCE — SIERRA ON PRISCADEZIGNS.ORG

Sierra is the live implementation of this SOP on priscadezigns.org. All design and logic decisions made for Sierra serve as the reference standard for all client Website Chat deployments.

- **Design System:** Deep Purple (#301934) and Lilac (#C8A2C8)
- **Master Script Location:** `/chatbot.js` (root)
- **Synced Pages:** `/index.html`, `/services/index.html`, `/templates/index.html`
- **Version Control:** Increment version tag on all pages with every change (e.g. `chatbot.js?v=X.X`)
- **Rule:** Never create a separate chatbot file per sub-brand. One master script, all pages in sync.

---

## 11. ESCALATION

All escalation follows SOP-CH-000 Section 11. Website Chat-specific note: if a visitor reports a technical error, security concern, or data breach via the chat, the AI must immediately escalate to the Lead Strategist and suspend the affected conversation flow pending investigation.

---

## 12. REFERENCES

| Document | Title |
|---|---|
| SOP-CH-000 | General AI Channel Standard |
| SOP-AI-000 | General AI Services Master Framework |
| SOP-AI-003 | Website Chat Automation (Operational) |
| DPA-001 | Data Processing Agreement |
| AICM-001 | Universal AI Compliance Mandate |
| AUP-001 | Acceptable Use Policy |

---

## 13. VERSION HISTORY

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-15 | Initial release — Website Chat-specific legal framework (TT + GDPR + WCAG + OWASP), tech stack, Sierra reference implementation, compliance rules, onboarding checklist |
