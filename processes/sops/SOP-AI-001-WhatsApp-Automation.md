# STANDARD OPERATING PROCEDURE
## SOP-AI-001 | WhatsApp AI Automation

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-AI-001 |
| **Title** | WhatsApp AI Automation |
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

This SOP governs the design, deployment, operation, and audit of AI-powered WhatsApp automation services delivered by Prisca Dezigns to clients. It is subordinate to SOP-AI-000 and must be read alongside that master document.

---

## 2. SCOPE

This SOP applies to:
- All WhatsApp Business API integrations deployed for clients
- AI agents operating via WhatsApp (Sierra-class agents)
- Automation pipelines connecting WhatsApp to client CRMs, Supabase, or third-party systems
- All tiers delivering WhatsApp automation: Tier 2, Tier 3, and Tier 4

---

## 3. LEGAL AND REGULATORY FRAMEWORK

### 3.1 Trinidad and Tobago
| Law | WhatsApp-Specific Obligation |
|---|---|
| **Data Protection Act, 2011** | WhatsApp messages containing personal data constitute personal data processing. Explicit consent required before initiating automated messages. |
| **Electronic Transactions Act, Chap. 22:06** | Automated WhatsApp messages are legally recognised electronic communications. |
| **Consumer Protection and Safety Act** | No misleading claims, no deceptive AI personas that misrepresent the service. |

### 3.2 International
| Standard / Law | WhatsApp-Specific Obligation |
|---|---|
| **Meta WhatsApp Business Policy** | Mandatory compliance — opt-in required, prohibited content categories enforced, message template approval required for outbound. |
| **GDPR (EU) 2016/679** | EU recipients: lawful basis required, right to object to automated processing under Article 22. |
| **ISO/IEC 27001:2022** | WhatsApp API credentials and message logs must be stored and protected as classified assets. |
| **ISO/IEC 42001:2023** | AI agents must operate within defined, documented, and auditable parameters. |
| **CAN-SPAM / CASL** | Where applicable to message content delivered via linked email — ensure cross-channel compliance. |

### 3.3 Meta WhatsApp Business API — Key Rules
- All outbound messages (business-initiated) must use pre-approved Message Templates
- No messages related to: alcohol, gambling, adult content, weapons, medications requiring prescriptions
- Opt-out requests must be honoured immediately — no exceptions
- User-initiated conversations: 24-hour messaging window applies
- Violation of Meta policy results in account suspension — client and Prisca Dezigns both at risk

---

## 4. APPROVED TECHNOLOGY STACK

| Component | Tool | Notes |
|---|---|---|
| WhatsApp API Gateway | 360dialog (enterprise) / Z-API (small-mid) / WATI (mid) | Selected based on client tier |
| Automation Pipeline | Make.com (Tier 2) / n8n self-hosted (Tier 3-4) | n8n preferred for data sovereignty |
| AI Brain | Claude API (Tier 2-3) / Gemini 2.5 Pro (Tier 4) | Claude for tone, Gemini for volume |
| Database | Supabase (client-isolated project) | RLS enforced |
| Credential Storage | Prisca Dezigns encrypted vault | Never in code or pipeline plain text |

---

## 5. IMPLEMENTATION PROCESS

### Phase 1 — Discovery and Audit (Days 1–3)
- [ ] Audit client's current WhatsApp usage (personal vs. Business API)
- [ ] Confirm client has a registered WhatsApp Business Account (WABA)
- [ ] Identify message volume (messages/day estimate)
- [ ] Identify top 10 inquiry categories from client's existing conversations
- [ ] Determine escalation contacts (who the AI hands off to)
- [ ] Confirm client's existing opt-in mechanism (website form, in-store, verbal)

### Phase 2 — Agreement and Legal (Days 3–5)
- [ ] Issue and obtain signed Service Agreement
- [ ] Issue and obtain signed Data Processing Agreement (DPA)
- [ ] Issue and obtain signed Acceptable Use Policy (AUP)
- [ ] Document lawful basis for processing (consent or legitimate interest)
- [ ] Document opt-in method and store consent record in Supabase

### Phase 3 — Configuration (Days 5–10)
- [ ] Set up WhatsApp API provider account under client's WABA
- [ ] Create and submit Message Templates for Meta approval (allow 24–48 hours)
- [ ] Build AI persona file: name, tone, knowledge base, escalation triggers
- [ ] Configure automation pipeline (Make.com or n8n)
- [ ] Connect pipeline to client CRM or Supabase table
- [ ] Set up conversation logging (all messages logged with timestamp and contact ID)
- [ ] Configure opt-out keyword detection (STOP, UNSUBSCRIBE, NO) — immediate halt

### Phase 4 — Internal Testing (Days 10–12)
- [ ] Run minimum 20 test conversations covering:
  - Standard inquiry (product/service question)
  - Escalation trigger (human request)
  - Opt-out request
  - Out-of-scope question
  - After-hours message
  - Abusive message
- [ ] Verify all logs captured correctly in Supabase
- [ ] Verify escalation routing works (message reaches correct human contact)
- [ ] Verify opt-out mechanism stops all further messages immediately
- [ ] Score all 20 test interactions — minimum 90% pass rate required

### Phase 5 — Client UAT (Days 12–17)
- [ ] Provide client access to test number for 3–5 business days
- [ ] Collect client feedback in writing
- [ ] Make approved adjustments (log each change)
- [ ] Obtain client sign-off document before go-live

### Phase 6 — Go-Live (Day 17+)
- [ ] Deploy to production WhatsApp number
- [ ] Apply version tag (v1.0) to all pipeline components and prompts
- [ ] Activate monitoring (message failure alerts, error logging)
- [ ] Send client onboarding summary document
- [ ] Schedule first monthly audit (30 days from go-live)

---

## 6. AI AGENT OPERATING STANDARDS

### 6.1 Message Standards
- First message must include: AI disclosure ("Hi, I am [Name], [Client Brand]'s virtual assistant.")
- Maximum response time: 60 seconds from receipt of user message
- Maximum message length: 1,600 characters per message (WhatsApp limit is 4,096 — stay well below for readability)
- No sending of more than 3 consecutive messages without a user reply
- Always close unresolved conversations with a clear next step or escalation

### 6.2 Prohibited Agent Behaviours
- Claiming to be human when directly asked
- Sharing pricing not approved in the knowledge base
- Making promises not in the client's approved scope (delivery dates, guarantees)
- Processing payments or capturing card details via WhatsApp
- Sending unsolicited media files (images, PDFs) without prior user engagement

### 6.3 After-Hours Protocol
- AI continues to receive and log messages 24/7
- After-hours auto-response: acknowledge receipt, state next business day response time
- Urgent escalation keywords (URGENT, EMERGENCY) trigger immediate notification to client contact regardless of hours

### 6.4 Opt-Out Handling
- Keywords: STOP, END, QUIT, CANCEL, UNSUBSCRIBE, NO, 0 (and local equivalents)
- On detection: immediate cessation of all automated messages
- Log opt-out with timestamp and contact ID
- Contact removed from all active automation flows
- Re-opt-in only via explicit, documented request from the user

---

## 7. DATA HANDLING

### 7.1 What Is Collected
| Data | Purpose | Stored Where |
|---|---|---|
| WhatsApp contact ID (hashed phone) | Session identification | Supabase — client table |
| Message content | AI processing and audit | Supabase — encrypted at rest |
| Timestamp | Audit log | Supabase |
| Escalation flag | QA review | Supabase |
| Opt-out status | Compliance | Supabase — permanent record |

### 7.2 What Is Never Collected
- Full phone numbers stored in plain text without encryption
- Payment card details
- Government ID information
- Health or medical data
- Passwords or authentication credentials

### 7.3 Retention
- Active conversation logs: 12 months
- Opt-out records: Duration of engagement + 3 years
- Purge process: Automated deletion script run quarterly

---

## 8. QUALITY ASSURANCE

### 8.1 Weekly Spot Check
- Sample 10% of interactions from the past 7 days
- Score each against quality framework in SOP-AI-000 Section 7.1
- Flag any score below 90 for immediate review
- Document results in service audit log

### 8.2 Monthly Full Audit
- Pull full interaction log from Supabase
- Calculate: resolution rate, average response time, escalation rate, opt-out rate
- Compare against previous month
- Flag trends (rising opt-outs, falling resolution rate) for investigation
- Deliver audit report to client

### 8.3 KPIs Per Client
| Metric | Target |
|---|---|
| First response time | Under 60 seconds |
| Resolution rate (no escalation needed) | Above 75% |
| Opt-out rate | Below 2% per campaign |
| Message delivery success rate | Above 98% |
| Quality score (sampled) | Above 90% |

---

## 9. CHANGE MANAGEMENT

All changes follow the 7-step process in SOP-AI-000 Section 9.
WhatsApp-specific additions:
- Message Template changes require re-submission to Meta and approval before use
- AI persona prompt changes require client sign-off before deployment
- Pipeline structural changes require internal test of minimum 10 interactions before go-live

---

## 10. INCIDENT RESPONSE

In addition to the universal incident framework in SOP-AI-000 Section 8:

| WhatsApp-Specific Incident | Classification | Action |
|---|---|---|
| Message Template rejected by Meta | P2 — High | Revert to approved template, investigate rejection reason, resubmit |
| WABA suspended by Meta | P1 — Critical | Notify client immediately, initiate Meta appeal, document timeline |
| Opt-out not processed | P1 — Critical | Manual immediate block, root cause fix within 4 hours |
| AI sends message to wrong contact | P1 — Critical | Notify affected party, document breach, assess DPA notification requirement |
| Pipeline disconnection (messages not received) | P2 — High | Restore pipeline within 4 hours, notify client |

---

## 11. VERSION HISTORY

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-07-15 | Lead Strategist — Prisca Dezigns | Initial release |

---

*This document is the property of Prisca Dezigns. Unauthorized distribution outside the organization is prohibited. All rights reserved.*

*Prisca Dezigns | priscadezigns.org | hello@priscadezigns.org*
