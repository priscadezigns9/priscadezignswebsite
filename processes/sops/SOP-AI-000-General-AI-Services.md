# STANDARD OPERATING PROCEDURE
## SOP-AI-000 | General AI Services — Master Framework

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-AI-000 |
| **Title** | General AI Services — Master Framework |
| **Department** | AI Automation Division — Prisca Dezigns |
| **Version** | 1.0 |
| **Effective Date** | 2026-07-15 |
| **Review Date** | 2027-01-15 |
| **Owner** | Lead Strategist — Prisca Dezigns |
| **Classification** | Internal — Controlled Document |
| **Status** | Active |

---

## 1. PURPOSE

This Master SOP establishes the universal governance framework that applies to ALL AI automation services delivered by Prisca Dezigns regardless of channel, tier, or client. All channel-specific SOPs (WhatsApp, Email, Website) are subordinate to and must comply with this document.

---

## 2. SCOPE

This SOP applies to:
- All AI agents deployed on behalf of clients (Sierra, Drew, or any future agent)
- All automation pipelines (Make.com, n8n, custom API)
- All AI brains in use (Claude API, Gemini, GPT-4o)
- All communication channels (WhatsApp, Email, Website Chat)
- All staff, contractors, and subagents operating within Prisca Dezigns

---

## 3. LEGAL AND REGULATORY FRAMEWORK

### 3.1 Trinidad and Tobago
| Law | Obligation |
|---|---|
| **Data Protection Act, 2011** | Lawful basis required for all data collection and processing. Consent must be freely given, specific, and informed. |
| **Electronic Transactions Act, Chap. 22:06** | AI-generated communications are legally binding electronic records. |
| **Computer Misuse Act, Chap. 11:19** | Unauthorized access or manipulation of systems is a criminal offence. |
| **Consumer Protection and Safety Act** | AI services must not mislead, deceive, or misrepresent capabilities to clients or their customers. |

### 3.2 International Standards
| Standard | Obligation |
|---|---|
| **GDPR (EU) 2016/679** | Applies when serving EU-based clients or processing data of EU residents. Requires Data Processing Agreements (DPA). |
| **ISO 9001:2015** | Quality Management System — documented processes, measurable outputs, continuous improvement. |
| **ISO/IEC 27001:2022** | Information Security Management — all AI systems handling personal data must meet baseline security controls. |
| **ISO/IEC 42001:2023** | AI Management System — governance of AI systems including risk assessment, transparency, and accountability. |
| **NIST AI RMF 1.0** | AI Risk Management Framework — govern, map, measure, and manage AI risk. |
| **WCAG 2.1 AA** | Accessibility — any AI-facing interface must meet minimum accessibility standards. |
| **CAN-SPAM Act (USA)** | Applies to email automation targeting US recipients — opt-out, sender identity, no deceptive subjects. |
| **CASL (Canada)** | Express or implied consent required for all commercial electronic messages to Canadian recipients. |

---

## 4. CORE PRINCIPLES (NON-NEGOTIABLE)

All AI services delivered by Prisca Dezigns must comply with the following at all times:

### 4.1 Transparency
- AI agents must never claim to be human when directly and sincerely asked
- Client's customers must be informed they are interacting with an AI system
- All automated communications must be identifiable as AI-generated where required by law

### 4.2 Data Minimisation
- Collect only the data necessary to fulfill the service objective
- No storage of sensitive personal data (health, financial, biometric) without explicit written consent and security controls
- Retention periods must be defined per client engagement

### 4.3 Accuracy
- AI responses must be validated against the client's approved knowledge base
- Hallucinations or unverified claims must be prevented through prompt engineering and guardrails
- Quality score threshold: minimum 90% accuracy on QA review

### 4.4 Security
- All client credentials (API keys, login details) stored in encrypted credential vault only
- No credentials stored in plain text, code, or chat logs
- Supabase Row Level Security (RLS) enforced on all client data tables
- No sharing of one client's data with another under any circumstance

### 4.5 Accountability
- Every AI action must be logged with timestamp, input, output, and outcome
- Human escalation path must exist for every AI workflow — no fully closed loops without override capability
- Prisca Dezigns retains full liability for AI behaviour within contracted scope

### 4.6 Consent
- Opt-in required before any automated communication is initiated
- Opt-out must be honoured immediately and permanently within 24 hours maximum
- Consent records must be stored and retrievable for audit

---

## 5. UNIVERSAL ONBOARDING PROCESS (ALL TIERS)

### Step 1 — Client Discovery (Drew)
- Drew conducts initial qualification call or chat
- Captures: business name, industry, primary channel, volume estimate, pain point
- Logs to client_leads table in Prisca Dezigns Supabase

### Step 2 — Audit
- Review client's existing communication channels
- Identify: current response time, volume, tone, escalation needs
- Determine appropriate tier (Tier 1 / 2 / 3 / 4)

### Step 3 — Proposal and Agreement
- Issue Service Agreement covering:
  - Scope of AI automation
  - Data Processing Agreement (DPA) — mandatory for all tiers
  - Acceptable Use Policy (AUP) — client must sign
  - Liability limitations
  - Termination and data deletion clause
- Client signature required before any build begins

### Step 4 — Data Collection and Configuration
- Collect approved knowledge base from client (FAQs, product list, pricing, policies)
- Collect brand voice guidelines (tone, banned words, escalation phrases)
- Configure AI persona within approved parameters

### Step 5 — Build and Internal Test
- Build automation pipeline per channel-specific SOP
- Internal QA: minimum 20 test interactions across all identified scenario types
- Document test results in service audit log

### Step 6 — Client UAT (User Acceptance Testing)
- Provide client with test environment for 3 to 5 business days
- Client confirms accuracy and tone
- Sign-off document required before go-live

### Step 7 — Go-Live
- Deploy to production
- Version tag applied to all deployed components
- Monitoring activated

---

## 6. AI AGENT STANDARDS

### 6.1 Persona Configuration
Every AI agent deployed must have a documented persona file containing:
- Agent name and role description
- Brand voice (tone, formality, banned words)
- Capability boundary (what it can and cannot answer)
- Escalation trigger list

### 6.2 Knowledge Base Management
- Knowledge base approved in writing by client before deployment
- Updates to knowledge base require client sign-off and version increment
- Outdated knowledge bases flagged automatically after 90 days without review

### 6.3 Escalation Matrix (Universal)
| Trigger | Action |
|---|---|
| Customer requests human | Immediate handoff — AI ceases response |
| Legal threat or complaint | Flag to client within 1 hour |
| Refund or billing dispute | Escalate — AI does not process financial decisions |
| Abusive or threatening language | Terminate interaction, log incident |
| Data subject access request | Escalate to Prisca Dezigns Lead within 24 hours |
| Media or press inquiry | Escalate — AI does not respond to press |

---

## 7. QUALITY ASSURANCE FRAMEWORK

### 7.1 Quality Scoring
Every AI interaction is evaluated on:
| Criterion | Weight |
|---|---|
| Accuracy (correct information) | 30% |
| Tone (matches brand voice) | 20% |
| Resolution rate (issue resolved) | 25% |
| Compliance (no data breaches, no policy violations) | 25% |

Minimum passing score: 90 out of 100

### 7.2 Review Cadence
| Review Type | Frequency | Responsible |
|---|---|---|
| Spot Check | Weekly — 10% sample | Lead Strategist |
| Full Audit | Monthly | Lead Strategist + Kimi |
| Compliance Review | Quarterly | Lead Strategist |
| Annual Review | Yearly | Full team |

### 7.3 Audit Log Requirements
Every AI service must log:
- Timestamp (UTC)
- Channel (WhatsApp / Email / Website)
- Trigger input (anonymised where required by DPA)
- AI output
- Escalation flag (yes/no)
- Resolution status
- Quality score (if reviewed)

---

## 8. INCIDENT RESPONSE

### 8.1 Classification
| Level | Definition | Response Time |
|---|---|---|
| P1 — Critical | Data breach, system compromise, legal threat | 1 hour |
| P2 — High | AI hallucination reaching client customer, opt-out failure | 4 hours |
| P3 — Medium | Incorrect response, missed escalation | 24 hours |
| P4 — Low | Formatting issue, minor tone deviation | 72 hours |

### 8.2 Breach Notification — TT Data Protection Act 2011
- Notify affected individuals within a reasonable time (recommended: 72 hours)
- Notify the Information Commissioner where required
- Document breach, cause, and remediation action
- Non-compliance: fines up to TTD 100,000 and/or up to 5 years imprisonment

### 8.3 Breach Notification — GDPR (EU Clients)
- Notify supervisory authority within 72 hours of discovery
- Notify data subjects without undue delay where high risk exists
- Document in breach register

---

## 9. CHANGE MANAGEMENT

All changes to any live AI service must follow this process:

1. **Request** — document the change, reason, and expected impact
2. **Review** — Lead Strategist approves or rejects
3. **Test** — changes tested in staging environment first
4. **Version** — increment version number (e.g. v1.0 to v1.1)
5. **Deploy** — push to production
6. **Log** — record in changelog with date, change, and approver
7. **Notify** — inform client of any changes affecting their service

No change goes live without completing all 7 steps.

---

## 10. DATA GOVERNANCE

### 10.1 Retention Schedule
| Data Type | Retention Period | Disposal Method |
|---|---|---|
| Interaction logs | 12 months | Secure deletion from database |
| Client configuration files | Duration of contract + 6 months | Encrypted archive then deletion |
| Consent records | Duration of contract + 3 years | Secure archive |
| Audit logs | 3 years | Secure archive |
| Financial records | 7 years | Per TT legal requirement |

### 10.2 Data Subject Rights (TT DPA 2011 + GDPR)
Prisca Dezigns must be able to fulfil:
- Right of access — provide data held within 30 days
- Right to correction
- Right to deletion (right to be forgotten — GDPR)
- Right to object to processing
- Right to data portability (GDPR)

All requests handled by the Lead Strategist within the legally mandated timeframe.

---

## 11. THIRD-PARTY VENDOR COMPLIANCE

All third-party tools used in AI service delivery must be vetted:

| Vendor | Category | Compliance Status |
|---|---|---|
| Anthropic (Claude API) | AI Brain | Privacy policy reviewed, DPA available |
| Google (Gemini) | AI Brain | Google Cloud DPA signed |
| Make.com | Automation Pipeline | GDPR compliant, SOC 2 Type II |
| n8n (self-hosted) | Automation Pipeline | Data stays on own server — compliant |
| 360dialog | WhatsApp API | Meta Business Policy compliant, GDPR |
| Supabase | Database | SOC 2 Type II, GDPR compliant |
| GitHub | Source Control | SOC 2 Type II |

---

## 12. RELATED DOCUMENTS

| Document | ID |
|---|---|
| Website Development SOP | SOP-WD-001 |
| WhatsApp AI Automation SOP | SOP-AI-001 |
| Email Automation SOP | SOP-AI-002 |
| Website Chat Automation SOP | SOP-AI-003 |
| Data Processing Agreement Template | DPA-001 |
| Acceptable Use Policy | AUP-001 |
| Incident Response Plan | IRP-001 |

---

## 13. VERSION HISTORY

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-07-15 | Lead Strategist — Prisca Dezigns | Initial release |

---

*This document is the property of Prisca Dezigns. Unauthorized distribution outside the organization is prohibited. All rights reserved.*

*Prisca Dezigns | priscadezigns.org | hello@priscadezigns.org*
