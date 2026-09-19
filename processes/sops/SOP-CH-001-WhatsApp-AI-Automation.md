# STANDARD OPERATING PROCEDURE
## SOP-CH-001 | WhatsApp AI Automation

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-CH-001 |
| **Title** | WhatsApp AI Automation |
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

This SOP defines the specific standards, legal obligations, technical requirements, and delivery protocols for all WhatsApp AI Automation services delivered by Prisca Dezigns. It is subordinate to SOP-CH-000 and must be read in conjunction with it.

---

## 2. SCOPE

This SOP applies to:
- All WhatsApp AI Automation deployments for clients across any industry or tier
- All agents (Drew, Sierra, or human staff) involved in sales, onboarding, or delivery of WhatsApp automation
- All WhatsApp API providers used (360dialog — preferred, WATI, Z-API)
- All automation pipelines connected to WhatsApp (Make.com, n8n)

---

## 3. LEGAL AND REGULATORY FRAMEWORK

### 3.1 Trinidad and Tobago

| Law | WhatsApp-Specific Obligation |
|---|---|
| **Data Protection Act, 2011 (TT)** | Phone numbers collected via WhatsApp are personal data. Explicit opt-in consent must be captured and stored before any automated message is sent. Opt-out requests must be actioned within 48 hours. |
| **Telecommunications Act, Chap. 47:31** | Unsolicited commercial messaging via WhatsApp to TT numbers is prohibited. All messaging must be initiated by the customer or based on prior consent. |
| **Consumer Protection and Safety Act (TT)** | The AI agent must not misrepresent itself as human. Product or service claims made via WhatsApp must be accurate and verifiable. |
| **Electronic Transactions Act, Chap. 22:06** | WhatsApp messages constitute electronic records. Conversations where agreements are made (pricing, bookings, orders) are legally binding. |

### 3.2 International Standards

| Standard | WhatsApp-Specific Obligation |
|---|---|
| **WhatsApp Business Policy (Meta)** | Only officially approved WhatsApp Business API providers may be used. Spam, bulk unsolicited messaging, phishing, and impersonation are grounds for permanent account ban. Message templates must be pre-approved by Meta. |
| **GDPR (EU) 2016/679** | WhatsApp numbers of EU residents are personal data under GDPR. A lawful basis (consent or legitimate interest) is required. Data subject rights (access, erasure, portability) must be honoured. |
| **CASL (Canada)** | Express consent required before any commercial WhatsApp message to a Canadian number. Unsubscribe must be possible and actioned within 10 business days. |
| **ISO/IEC 27001:2022** | WhatsApp API credentials, client phone databases, and conversation logs must be stored securely with access controls and encryption at rest. |

---

## 4. PREFERRED TECHNOLOGY STACK

| Component | Tool | Reason |
|---|---|---|
| **WhatsApp API Provider (Enterprise)** | 360dialog | Official Meta Business Solution Provider. Preferred for high-ticket clients. ~€60/mo |
| **WhatsApp API Provider (Mid)** | WATI | Reliable mid-tier BSP. ~$49/mo |
| **WhatsApp API Provider (Small)** | Z-API | Lightweight option for small clients. ~$20–30/mo |
| **Automation Pipeline (Small–Mid)** | Make.com | Up to 1,000 tasks/mo on free tier. Fastest setup. |
| **Automation Pipeline (Enterprise)** | n8n (self-hosted) | Unlimited tasks. Fixed server cost ~$20/mo. |
| **AI Brain (Small–Mid)** | Claude API | Best tone, most natural replies |
| **AI Brain (Enterprise/High Volume)** | Gemini 2.5 Pro | Handles 100+ messages/day, Google-native |

> **Rule:** Never use unofficial WhatsApp automation tools (e.g. WhatsApp Web scrapers, unofficial bots). These violate WhatsApp's Terms of Service and can permanently ban the client's number.

---

## 5. SERVICE SCOPE — WHAT WHATSAPP AI DELIVERS

A deployed WhatsApp AI agent handles:

- Instant FAQ responses (24/7, no human required)
- Lead qualification and capture (name, business, need, budget)
- Appointment booking and confirmation messages
- Order status updates and follow-ups
- Customer support and complaint triage
- Outbound follow-up messages (with client consent and pre-approved templates)
- CRM synchronisation (with CRM Integration add-on)
- Sales logic flows (with Sales Logic add-on)
- Incident/HSE reporting flows (with HSE Reporting add-on)
- Multi-language support — Spanish or French (with Multi-Language add-on)

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
| Sales Logic | +$300 | +$50/mo | Qualify, present, close via WhatsApp |
| HSE Reporting | +$350 | +$50/mo | OSH Act-compliant incident capture |
| Appointment Booking | +$200 | +$30/mo | Calendar sync within WhatsApp flow |
| Multi-Language | +$250 | +$30/mo | Spanish or French layer |
| Additional Channel | +$200 | +$30/mo | Add Email or Website Chat to existing package |

---

## 7. WHATSAPP-SPECIFIC COMPLIANCE RULES

1. **Opt-In Required:** A client's customers must actively opt in before receiving automated WhatsApp messages. A double opt-in is recommended.
2. **Template Pre-Approval:** Any outbound message sent outside of a 24-hour customer-initiated window must use a Meta-approved message template.
3. **24-Hour Window:** Automated free-form replies are only permitted within 24 hours of the customer's last message. After 24 hours, only approved templates may be used.
4. **Opt-Out Mechanism:** Every automated flow must include a clear opt-out instruction (e.g. "Reply STOP to unsubscribe"). Opt-outs must be logged and actioned within 48 hours.
5. **No Bulk Spam:** Mass messaging campaigns without prior consent and Meta-approved templates are strictly prohibited and will result in immediate engagement termination.
6. **AI Disclosure:** If a customer directly asks "Am I speaking to a human?", the AI must confirm it is an automated assistant.
7. **Number Ownership:** The WhatsApp Business number used belongs to the client. Prisca Dezigns never owns or controls a client's business number.

---

## 8. ONBOARDING REQUIREMENTS

Before WhatsApp automation can go live, the following must be in place:

- [ ] Client has a verified WhatsApp Business account
- [ ] Client has approved a BSP (360dialog, WATI, or Z-API) — Prisca Dezigns assists with application
- [ ] Meta Business Manager verified (for template-based messaging)
- [ ] Client's FAQ and conversation flows reviewed and approved
- [ ] Opt-in consent mechanism live and tested
- [ ] Opt-out / STOP command active and tested
- [ ] Lead capture connected to designated CRM or Supabase
- [ ] Escalation path verified — human handoff confirmed and tested
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

## 10. ESCALATION

All escalation follows SOP-CH-000 Section 11. WhatsApp-specific note: all escalations from a client's WhatsApp channel must be forwarded to the client's designated human contact — not to Prisca Dezigns. Prisca Dezigns receives escalation notifications only for system failures or compliance incidents.

---

## 11. REFERENCES

| Document | Title |
|---|---|
| SOP-CH-000 | General AI Channel Standard |
| SOP-AI-000 | General AI Services Master Framework |
| SOP-AI-001 | WhatsApp Automation (Operational) |
| DPA-001 | Data Processing Agreement |
| AICM-001 | Universal AI Compliance Mandate |

---

## 12. VERSION HISTORY

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-15 | Initial release — WhatsApp-specific legal framework (TT + Meta Policy + GDPR + CASL), tech stack, compliance rules, onboarding checklist |
