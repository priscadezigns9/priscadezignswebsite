# STANDARD OPERATING PROCEDURE
## SOP-CH-002 | Email AI Automation

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-CH-002 |
| **Title** | Email AI Automation |
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

This SOP defines the specific standards, legal obligations, technical requirements, and delivery protocols for all Email AI Automation services delivered by Prisca Dezigns. It is subordinate to SOP-CH-000 and must be read in conjunction with it.

---

## 2. SCOPE

This SOP applies to:
- All Email AI Automation deployments for clients across any industry or tier
- All agents (Drew, Sierra, or human staff) involved in sales, onboarding, or delivery of email automation
- All email platforms and pipelines used (Gmail, Outlook/Microsoft 365, Make.com, n8n)
- All AI systems drafting or sending email responses on a client's behalf

---

## 3. LEGAL AND REGULATORY FRAMEWORK

### 3.1 Trinidad and Tobago

| Law | Email-Specific Obligation |
|---|---|
| **Data Protection Act, 2011 (TT)** | Email addresses are personal data. Collection, storage, and use for automated communications requires a lawful basis — typically consent. Clients must maintain a suppression list of opt-outs. |
| **Electronic Transactions Act, Chap. 22:06** | AI-drafted and AI-sent emails constitute legally binding electronic records. Client must be aware that automated emails sent on their behalf carry the same legal weight as manually written ones. |
| **Consumer Protection and Safety Act (TT)** | Email content must not be misleading, deceptive, or make false representations about services, pricing, or outcomes. |
| **Telecommunications Act, Chap. 47:31** | Unsolicited bulk commercial email (spam) to TT addresses is prohibited. All email communications must be to opted-in recipients only. |

### 3.2 International Standards

| Standard | Email-Specific Obligation |
|---|---|
| **CAN-SPAM Act (USA)** | Applies to all commercial email targeting US recipients. Requirements: accurate "From" name and address, non-deceptive subject lines, physical address of sender, clear opt-out mechanism, opt-outs honoured within 10 business days. |
| **CASL (Canada)** | Express or implied consent required before any commercial email to a Canadian address. Every email must identify the sender, include a mailing address, and provide a working unsubscribe mechanism. |
| **GDPR (EU) 2016/679** | Email addresses of EU residents are personal data. Explicit consent required for marketing emails. Data subject rights (access, erasure, portability) must be honoured. Privacy notice must be linked in every email. |
| **ISO/IEC 27001:2022** | Email credentials (SMTP passwords, API keys), client email lists, and conversation content must be encrypted at rest and in transit (TLS 1.2 minimum). |
| **DMARC / DKIM / SPF** | All client email domains used for AI automation must have DMARC, DKIM, and SPF records correctly configured to prevent spoofing and ensure deliverability. |

---

## 4. PREFERRED TECHNOLOGY STACK

| Component | Tool | Notes |
|---|---|---|
| **Email Provider (Small–Mid)** | Gmail (via Google Workspace) | Client's existing inbox. Fastest integration. |
| **Email Provider (Enterprise)** | Microsoft 365 / Outlook | Enterprise standard. Full audit trail. |
| **Automation Pipeline (Small–Mid)** | Make.com | Up to 1,000 tasks/mo on free tier |
| **Automation Pipeline (Enterprise)** | n8n (self-hosted) | Unlimited. ~$20/mo server cost |
| **AI Brain (Small–Mid)** | Claude API | Best tone and natural language for replies |
| **AI Brain (Enterprise/High Volume)** | Gemini 2.5 Pro | Handles 100+ emails/day, Google-native |

---

## 5. SERVICE SCOPE — WHAT EMAIL AI DELIVERS

A deployed Email AI agent handles:

- Reading and categorising incoming emails by intent (enquiry, complaint, booking, order, feedback)
- Drafting and sending professional replies that match the client's voice and brand
- Escalating sensitive, legal, or complex emails to the appropriate human contact
- Managing the communication pipeline — no email goes unanswered
- Capturing leads from inbound emails into the client's CRM or Supabase
- Sending automated follow-up sequences (post-enquiry, post-purchase, appointment reminders)
- Filtering and triaging spam — ensuring human attention goes only to genuine messages
- Generating daily or weekly email performance reports (with Automated Report Delivery add-on)

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
| Sales Logic | +$300 | +$50/mo | AI qualifies leads from inbound emails, walks through the offer |
| Appointment Booking | +$200 | +$30/mo | Calendar booking links embedded in AI replies |
| Multi-Language | +$250 | +$30/mo | Spanish or French reply capability |
| Additional Channel | +$200 | +$30/mo | Add WhatsApp or Website Chat to the same package |

---

## 7. EMAIL-SPECIFIC COMPLIANCE RULES

1. **Sender Identity:** Every automated email must display the client's actual business name and email address. Prisca Dezigns must never appear as the sender on client-facing emails.
2. **Opt-Out in Every Email:** Every commercial email sent via automation must include a clear, functional unsubscribe link or instruction. Unsubscribes must be actioned within 10 business days (CAN-SPAM) or immediately where technically possible.
3. **No Deceptive Subject Lines:** AI-drafted subject lines must accurately reflect the email content. Clickbait or misleading subjects are prohibited.
4. **Physical Address:** All commercial emails must include the client's physical or registered business address (required by CAN-SPAM and CASL).
5. **No Purchased Lists:** Prisca Dezigns will not deploy email automation to cold lists purchased from third parties. All email recipients must have a prior relationship with the client or have opted in explicitly.
6. **AI Disclosure on Request:** If an email recipient directly asks whether they are communicating with a human or an AI, the AI must confirm it is an automated system.
7. **TLS Encryption:** All email transmission must use TLS 1.2 or higher. Any email containing personal data must not be sent unencrypted.
8. **DMARC/DKIM/SPF Verification:** Before go-live, Prisca Dezigns must verify that the client's domain has correct email authentication records. Deployment will not proceed on an unauthenticated domain.

---

## 8. ONBOARDING REQUIREMENTS

Before Email automation can go live, the following must be in place:

- [ ] Client's email platform confirmed (Gmail / Microsoft 365 / other)
- [ ] API access or SMTP credentials provided securely
- [ ] DMARC, DKIM, and SPF records verified on client's domain
- [ ] Client's email categories and response templates reviewed and approved
- [ ] Escalation email address confirmed (human contact for sensitive emails)
- [ ] Opt-out / unsubscribe mechanism active and tested
- [ ] Lead capture connected to designated CRM or Supabase
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

All escalation follows SOP-CH-000 Section 11. Email-specific note: legal threats, GDPR data requests, or complaints received via email must be flagged to the Lead Strategist within 24 hours. The AI must never attempt to resolve legal or data access requests autonomously.

---

## 11. REFERENCES

| Document | Title |
|---|---|
| SOP-CH-000 | General AI Channel Standard |
| SOP-AI-000 | General AI Services Master Framework |
| SOP-AI-002 | Email Automation (Operational) |
| DPA-001 | Data Processing Agreement |
| AICM-001 | Universal AI Compliance Mandate |

---

## 12. VERSION HISTORY

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-15 | Initial release — Email-specific legal framework (TT + CAN-SPAM + CASL + GDPR), tech stack, DMARC/DKIM/SPF requirements, compliance rules, onboarding checklist |
