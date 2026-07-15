# STANDARD OPERATING PROCEDURE
## SOP-AI-002 | Email AI Automation

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-AI-002 |
| **Title** | Email AI Automation |
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

This SOP governs the design, deployment, operation, quality control, and compliance of AI-powered email automation services delivered by Prisca Dezigns. It covers both inbound email management (triage, auto-response, AI reply drafting) and outbound email campaigns (lead nurturing, follow-up sequences). It is subordinate to SOP-AI-000 and must be read alongside that master document.

---

## 2. SCOPE

This SOP applies to:
- AI-managed inbox systems for clients (Gmail, Outlook, or custom domain)
- Outbound email campaign automation (cold outreach, nurture sequences, follow-ups)
- Email-to-CRM pipeline integrations
- All tiers delivering email automation: Tier 3 and Tier 4

---

## 3. LEGAL AND REGULATORY FRAMEWORK

### 3.1 Trinidad and Tobago
| Law | Email-Specific Obligation |
|---|---|
| **Data Protection Act, 2011** | Email addresses are personal data. Collection, storage, and use requires lawful basis. Consent must be documented. |
| **Electronic Transactions Act, Chap. 22:06** | Automated emails are legally recognised electronic communications. Sender identity must be accurate. |
| **Consumer Protection and Safety Act** | No misleading subject lines, deceptive sender names, or false claims in email content. |

### 3.2 International
| Law / Standard | Email-Specific Obligation |
|---|---|
| **CAN-SPAM Act (USA)** | Physical mailing address required. Clear opt-out mechanism in every email. Opt-outs honoured within 10 business days. No deceptive subject lines or sender names. |
| **CASL (Canada)** | Express or implied consent required before sending commercial electronic messages to Canadian recipients. Unsubscribe within 10 business days. |
| **GDPR (EU) 2016/679** | Explicit consent for marketing emails to EU recipients. Right to erasure applies to email lists. Data Processing Agreement required. |
| **ISO 9001:2015** | Documented process for email service design, testing, delivery, and improvement. |
| **ISO/IEC 27001:2022** | Email credentials, client inbox access, and contact lists classified as sensitive assets — encrypted storage required. |
| **ISO/IEC 42001:2023** | AI email generation must be auditable, governed, and human-overridable. |

---

## 4. EMAIL AUTOMATION TYPES

### Type A — Inbound Inbox Management
AI monitors, triages, categorises, and responds to incoming client emails autonomously.

**Key capabilities:**
- Email categorisation (inquiry, complaint, quote request, spam, urgent)
- Auto-response for standard categories
- AI-drafted replies for review (or autonomous send — configured per client)
- Escalation to human for complex, legal, or financial matters
- CRM logging of all interactions

### Type B — Outbound Campaign Automation
AI manages sequences of outbound emails to leads or existing contacts.

**Key capabilities:**
- Personalised sequence delivery (Day 1, Day 3, Day 7 follow-ups)
- A/B subject line testing
- Open and click tracking
- Auto-pause on reply detection (prevents sending to already-engaged contacts)
- Opt-out management

---

## 5. APPROVED TECHNOLOGY STACK

| Component | Tool | Notes |
|---|---|---|
| Email Provider — Small/Mid | Gmail (client's existing inbox) | Via Google Workspace API |
| Email Provider — Enterprise | Microsoft 365 / Outlook | Via Microsoft Graph API |
| Automation Pipeline — Small/Mid | Make.com | Up to 1,000 tasks/month free tier |
| Automation Pipeline — Enterprise | n8n (self-hosted) | Unlimited, fixed server cost |
| AI Brain — Small/Mid | Claude API | Best tone and naturalness |
| AI Brain — Enterprise | Gemini 2.5 Pro | High volume, Google-native |
| CRM / Database | Supabase (client-isolated) | outreach_leads and client_leads tables |
| Credential Storage | Prisca Dezigns encrypted vault | OAuth tokens and API keys only |

---

## 6. IMPLEMENTATION PROCESS

### Phase 1 — Discovery and Audit (Days 1–3)
- [ ] Audit client's current email inbox and volume (average emails/day received)
- [ ] Identify top inquiry categories from client's email history (minimum 30-day sample)
- [ ] Identify average response time and client's target improvement
- [ ] Confirm email provider (Gmail or Outlook or custom SMTP)
- [ ] Identify escalation contacts and escalation triggers
- [ ] Confirm existing opt-in method for any outbound list

### Phase 2 — Agreement and Legal (Days 3–5)
- [ ] Issue and obtain signed Service Agreement
- [ ] Issue and obtain signed Data Processing Agreement (DPA)
- [ ] Issue and obtain signed Acceptable Use Policy (AUP)
- [ ] Document lawful basis for processing the client's contact list
- [ ] Confirm CAN-SPAM, CASL, or GDPR applicability based on recipient geography
- [ ] Verify client's email list was obtained with valid consent — do not proceed if origin of list is unclear
- [ ] Confirm physical mailing address for inclusion in outbound emails (CAN-SPAM requirement)

### Phase 3 — Configuration — Inbound (Days 5–8)
- [ ] Connect AI pipeline to client's inbox via OAuth (Gmail API or Microsoft Graph API)
- [ ] Build categorisation logic for incoming emails
- [ ] Build AI prompt per category (inquiry reply, quote acknowledgement, complaint triage)
- [ ] Configure escalation rules (trigger keywords: refund, legal, media, complaint, urgent)
- [ ] Set up CRM logging — all inbound emails logged with: sender, subject, category, AI action, timestamp
- [ ] Configure out-of-office and after-hours auto-response

### Phase 4 — Configuration — Outbound (Days 5–8, parallel)
- [ ] Import contact list to Supabase outreach_leads table — verify no duplicates
- [ ] Apply suppression list (opt-outs, bounces, previous unsubscribes)
- [ ] Build email sequence templates — approved by client in writing before use
- [ ] Every outbound email must contain:
  - Clear sender name and email address matching client brand
  - Physical mailing address (CAN-SPAM)
  - Unsubscribe link or opt-out instruction (plain language)
  - No deceptive subject lines
- [ ] Configure sequence logic: delays between sends, reply-detection pause, bounce handling
- [ ] Set send rate within provider limits (Gmail: 500/day personal, 2,000/day Workspace)

### Phase 5 — Internal Testing (Days 8–10)
- [ ] Test inbound: send 10 test emails across all categories — verify correct AI response and logging
- [ ] Test outbound: send sequence to internal test addresses — verify formatting, links, unsubscribe
- [ ] Test escalation: trigger each escalation keyword — verify human notification fires
- [ ] Test opt-out: send unsubscribe request — verify removal from all active sequences
- [ ] Test bounce handling: verify hard bounces removed from list immediately
- [ ] Score all test interactions — minimum 90% pass rate required before proceeding

### Phase 6 — Client UAT (Days 10–15)
- [ ] Provide client with summary of AI categories and response templates
- [ ] Client sends test emails to review AI responses
- [ ] Collect written feedback and make approved adjustments
- [ ] Obtain client sign-off before go-live

### Phase 7 — Go-Live (Day 15+)
- [ ] Activate inbound monitoring on live client inbox
- [ ] Begin outbound sequence on approved schedule
- [ ] Apply version tag (v1.0) to all pipeline components, prompts, and templates
- [ ] Activate monitoring (delivery failure alerts, bounce rate alerts)
- [ ] Schedule first monthly audit (30 days from go-live)

---

## 7. AI AGENT OPERATING STANDARDS

### 7.1 Inbound Response Standards
- Response time target: within 5 minutes for business hours, within 12 hours after hours
- Tone must match client's brand voice document
- AI must not commit to prices, delivery timelines, or terms not in approved knowledge base
- All AI-drafted replies subject to quality scoring
- If confidence in correct response is below threshold: escalate rather than guess

### 7.2 Outbound Email Standards
- Subject lines must be accurate and non-deceptive
- Sender name must match the client's business identity
- No purchased or third-party lists unless origin and consent can be verified
- Personalisation must use only data fields confirmed in the contact record
- Maximum send frequency: 1 email per contact per 3 days in any active sequence

### 7.3 Prohibited Behaviours
- Sending to contacts who have previously unsubscribed from that client
- Using subject lines that misrepresent the email content
- Sending attachments without prior user engagement or explicit request
- Accessing any folder or email outside the agreed scope (inbox only — not sent, personal folders)
- Auto-deleting any email without client approval to do so

---

## 8. DATA HANDLING

### 8.1 What Is Collected
| Data | Purpose | Stored Where |
|---|---|---|
| Email address | Delivery and identification | Supabase — encrypted at rest |
| Name (if available) | Personalisation | Supabase |
| Email content summary | Categorisation and audit | Supabase — encrypted |
| Timestamp | Audit log | Supabase |
| Open and click status | Campaign performance | Supabase |
| Opt-out status | Compliance — permanent record | Supabase |
| Bounce status | List hygiene | Supabase |

### 8.2 What Is Never Collected
- Full email body stored long-term beyond audit window
- Attachments stored without client's explicit instruction
- Login credentials to client's inbox (OAuth token only — not username and password)

### 8.3 Retention
- Inbound log summaries: 12 months
- Outbound campaign logs: 12 months
- Opt-out and suppression records: Duration of engagement + 3 years
- Purge process: Automated quarterly deletion run

---

## 9. QUALITY ASSURANCE

### 9.1 Weekly Spot Check
- Sample 10% of AI-handled inbound emails from past 7 days
- Sample 10% of outbound emails sent in past 7 days
- Score against quality framework in SOP-AI-000 Section 7.1
- Flag any score below 90 for immediate review

### 9.2 Monthly Full Audit
- Pull full interaction and campaign log from Supabase
- Calculate: response time average, resolution rate, bounce rate, open rate, opt-out rate
- Compare to previous month — flag declining metrics for investigation
- Deliver audit report to client

### 9.3 KPIs Per Client
| Metric | Target |
|---|---|
| Inbound response time (business hours) | Under 5 minutes |
| Inbound resolution rate (no escalation) | Above 70% |
| Outbound email delivery rate | Above 97% |
| Outbound bounce rate | Below 2% |
| Outbound opt-out rate | Below 0.5% per send |
| Outbound open rate (industry baseline) | Above 20% |
| Quality score (sampled) | Above 90% |

---

## 10. CHANGE MANAGEMENT

All changes follow the 7-step process in SOP-AI-000 Section 9.
Email-specific additions:
- Template content changes require client sign-off before use
- Changes to email provider credentials require credential vault update and pipeline reconnection test
- Sequence logic changes require re-test of full sequence before resuming live sends

---

## 11. INCIDENT RESPONSE

In addition to the universal incident framework in SOP-AI-000 Section 8:

| Email-Specific Incident | Classification | Action |
|---|---|---|
| Opt-out not removed from active sequence | P1 — Critical | Immediate manual suppression, root cause fix, assess DPA notification |
| Email sent to wrong recipient | P1 — Critical | Recall if possible, notify client, document breach |
| Inbox access token expired or revoked | P2 — High | Notify client, re-authenticate within 4 hours |
| Bounce rate exceeds 5% in a single send | P2 — High | Pause campaign, audit list quality, clean before resuming |
| AI sends reply with incorrect pricing or policy | P2 — High | Log, correct, notify affected recipient via client |
| Provider spam filter blocks outbound domain | P2 — High | Investigate domain health, warm-up if needed, notify client |

---

## 12. VERSION HISTORY

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-07-15 | Lead Strategist — Prisca Dezigns | Initial release |

---

*This document is the property of Prisca Dezigns. Unauthorized distribution outside the organization is prohibited. All rights reserved.*

*Prisca Dezigns | priscadezigns.org | hello@priscadezigns.org*
