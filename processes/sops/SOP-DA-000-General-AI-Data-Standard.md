# STANDARD OPERATING PROCEDURE
## SOP-DA-000 | General AI Data Automation — Master Sales & Delivery Standard

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-DA-000 |
| **Title** | General AI Data Automation — Master Sales & Delivery Standard |
| **Department** | AI Automation Division — Prisca Dezigns |
| **Version** | 1.0 |
| **Effective Date** | 2026-07-15 |
| **Review Date** | 2027-01-15 |
| **Owner** | Lead Strategist — Prisca Dezigns |
| **Classification** | Internal — Controlled Document |
| **Status** | Active |
| **Governed By** | SOP-AI-000 — General AI Services Master Framework · SOP-AD-000 — General AI Data Management |

---

## 1. PURPOSE

This SOP establishes the sales, pricing, legal compliance, and client delivery standards for all AI Data Automation services offered by Prisca Dezigns. It governs how services are presented, scoped, priced, contracted, and delivered — ensuring every engagement is legally sound under Trinidad & Tobago law and internationally recognised standards.

All product-specific SOPs (SOP-DA-001, SOP-DA-002, SOP-DA-003) are subordinate to this document.

---

## 2. SCOPE

This SOP applies to:
- All AI Data Automation service lines: AI Data Entry, AI Reporting, AI Data Processing
- Drew (Technical Lead / Closer) and Sierra (Client Operations) when quoting or onboarding clients
- All proposal, pricing, and agreement workflows
- All client data received and processed across these service lines
- All pipelines (Make.com, n8n), AI brains (Claude API, Gemini), and storage systems (Supabase, Google Drive) used in delivery

---

## 3. LEGAL & REGULATORY FRAMEWORK

### 3.1 Trinidad and Tobago Legislation

| Law | Obligation |
|---|---|
| **Data Protection Act, 2011 (TT)** | All client and end-user data processed through AI Data workflows must have a lawful basis. Explicit consent or a legitimate contractual basis is required before any personal data is ingested, stored, or processed. |
| **Electronic Transactions Act, Chap. 22:06** | All scoped agreements, client approvals, and deliverable sign-offs transmitted electronically are legally binding records and must be documented. |
| **Computer Misuse Act, Chap. 11:19** | Unauthorised access to any client database, system, or file is a criminal offence. All access must be explicitly authorised in writing prior to workflow build. |
| **Consumer Protection and Safety Act** | AI Data services must not misrepresent accuracy guarantees or processing capabilities. All advertised outputs must be achievable and defensible. |
| **Telecommunications Act, Chap. 47:31** | Any automated data transfer via digital communication channels (API, email, WhatsApp) must comply with lawful interception and privacy standards. |

### 3.2 International Standards

| Standard | Obligation |
|---|---|
| **GDPR (EU) 2016/679** | Applies when processing data of EU residents. Prisca Dezigns acts as Data Processor; the client is the Data Controller. A signed DPA (DPA-001) is mandatory before any data is handled. |
| **ISO 9001:2015 — Cl. 8.3 & 8.5** | All data processing workflows must be formally documented, tested, and subject to quality controls before client delivery. |
| **ISO 8000 (Data Quality)** | All data outputs must meet defined accuracy, completeness, consistency, and timeliness standards. Minimum 98% accuracy threshold on all AI Data Entry engagements. |
| **ISO/IEC 27001:2022** | All systems storing or processing client data must implement baseline information security controls — access control, encryption, audit logging. |
| **ISO/IEC 42001:2023** | AI systems used for data processing must operate transparently, with documented risk assessments, explainability protocols, and human oversight checkpoints. |
| **NIST AI RMF 1.0** | AI-driven data workflows must be governed, mapped, measured, and managed for risk at each processing stage. |
| **CCPA (California)** | Applies when processing personal data of California residents. Data subjects must be informed of processing activities and granted the right to deletion upon request. |

---

## 4. AI DATA SERVICE LINES

Prisca Dezigns offers three specialised AI Data Automation products. Each has its own SOP:

| Product | SOP | Core Function |
|---|---|---|
| **AI Data Entry** | SOP-DA-001 | Automated extraction and population of structured data from forms, spreadsheets, emails, and documents into connected systems |
| **AI Reporting** | SOP-DA-002 | Automated generation of business intelligence reports, dashboards, KPI summaries, and scheduled deliveries |
| **AI Data Processing** | SOP-DA-003 | Intelligent document processing — OCR, PDF parsing, classification, metadata extraction, and records management |

---

## 5. PRICING FRAMEWORK

### 5.1 Base Packages (All Products)

All AI Data Automation products follow a tiered pricing model confirmed after a Business Process Audit:

| Tier | Setup | Monthly Management | Ideal For |
|---|---|---|---|
| **Starter** | $1,250 | $599/mo | Single workflow, one connected system, basic validation |
| **Growth** | Custom (Post-Audit) | Custom | Multiple workflows, advanced integrations, priority support |
| **Enterprise** | Custom (Post-Audit) | Custom | Unlimited workflows, enterprise integrations, dedicated onboarding |

> **The Starter Package is the mandatory entry point for all new clients.** No client may begin at Growth or Enterprise without completing a Business Process Audit.

### 5.2 Feature Upgrades (Add-ons)

Available on any active package:

| Upgrade | Setup | Monthly |
|---|---|---|
| **Custom Export Formats** (Excel, PDF, Google Sheets, custom templates) | +$200 | +$30/mo |
| **CRM & Database Sync** (Supabase, Airtable, or connected DB — real time) | +$300 | +$50/mo |
| **Automated Report Delivery** (email or WhatsApp — daily/weekly/monthly) | +$250 | +$40/mo |
| **Anomaly & Error Alerts** (duplicates, missing fields, processing errors) | +$200 | +$30/mo |
| **Multi-Source Data Intake** (forms, emails, uploads, APIs — one pipeline) | +$350 | +$60/mo |
| **Analytics Dashboard** (visual performance tracking layer) | +$300 | +$50/mo |

### 5.3 Phonetic Pricing (Drew — Required for Voice)

Drew must use the following phonetic delivery format for all pricing during voice calls:

| Package | Phonetic |
|---|---|
| Starter Setup | "Twelve fifty" |
| Starter Monthly | "Five ninety-nine per month" |
| CRM Sync Add-on | "Plus three hundred setup, fifty per month" |
| Report Delivery Add-on | "Plus two fifty setup, forty per month" |

---

## 6. BUSINESS PROCESS AUDIT PROTOCOL

No AI Data engagement may proceed to build without a completed Business Process Audit. This is non-negotiable.

### 6.1 Audit Scope

The audit must capture:
1. **Current data sources** — Where does the client's data come from? (Forms, emails, spreadsheets, PDFs, APIs)
2. **Data volume** — How many records/documents per day, week, or month?
3. **Connected systems** — What CRMs, databases, or platforms must the AI sync with?
4. **Output requirements** — What format must the final data be in? (Excel, Supabase, Google Sheets, PDF reports)
5. **Accuracy requirements** — Are there regulatory or business requirements for data accuracy thresholds?
6. **Existing pain points** — What is currently failing, slow, or manual in their data workflow?

### 6.2 Audit Outcome

The audit produces:
- A confirmed product recommendation (Entry, Reporting, Processing, or a combination)
- A confirmed tier (Starter, Growth, or Enterprise)
- A list of required add-ons
- A final quoted monthly management fee
- A signed Service Agreement before build begins

---

## 7. DATA GOVERNANCE RULES

### 7.1 Client Data Handling

| Rule | Requirement |
|---|---|
| **Consent First** | No client data may be processed without a signed DPA (DPA-001) or explicit written authorisation |
| **Minimum Necessary** | Only data required for the specific workflow may be ingested — no excessive collection |
| **Encryption in Transit** | All data transferred between systems must use TLS 1.2 or higher |
| **Encryption at Rest** | All stored client data in Supabase or Google Drive must be encrypted |
| **Audit Logging** | Every data processing event must produce a timestamped audit log |
| **Retention Limits** | Raw source documents retained for 90 days post-processing; processed outputs retained per client agreement |
| **Deletion Protocol** | On contract termination, all client data must be securely deleted within 30 days and confirmed in writing |

### 7.2 PII Handling

- All Personally Identifiable Information (PII) must be identified and flagged before processing begins
- PII must never be stored in logs, test environments, or shared workspaces
- Access to PII must be restricted to the minimum number of agents and team members required
- Any accidental PII exposure must be reported to the Lead Strategist within 24 hours

---

## 8. ACCURACY & QUALITY STANDARDS

| Metric | Minimum Standard |
|---|---|
| **Data Extraction Accuracy** | 98% — mandatory for all AI Data Entry workflows |
| **Report Generation Accuracy** | 100% — no mathematical errors in any delivered report |
| **Processing Completion Rate** | 99.5% — all submitted documents must be fully processed or flagged |
| **Anomaly Detection Rate** | 95% — duplicates, missing fields, and format errors must be flagged |
| **Delivery SLA** | Outputs delivered within agreed schedule; delays flagged to client within 2 hours |

---

## 9. APPROVED TECHNOLOGY STACK

| Layer | Tool | Use Case |
|---|---|---|
| **Pipeline (Small–Mid)** | Make.com | Workflow automation — up to 1,000 tasks/mo free tier |
| **Pipeline (Enterprise)** | n8n (self-hosted) | Unlimited workflows — fixed server cost ~$20/mo |
| **AI Brain (Small–Mid)** | Claude API | Data extraction, validation, report generation |
| **AI Brain (Enterprise)** | Gemini 2.5 Pro | High-volume processing — 100+ documents/day, Google native |
| **Storage** | Supabase | Structured data storage — client records, processed outputs |
| **File Storage** | Google Drive | Raw document intake and processed file delivery |
| **OCR** | Claude Vision / Google Vision API | Document and image data extraction |
| **Export** | Google Sheets / Excel / PDF | Final output formatting per client requirement |

---

## 10. INDUSTRIES SERVED

All AI Data Automation products are applicable across:
- Finance & Accounting
- Government & Public Sector
- Healthcare & Medical Administration
- Retail & Inventory Management
- Insurance (Claims, Policies, Records)
- Construction (Project Records, Procurement)

Industry-specific compliance requirements (e.g., HIPAA for Healthcare, FSRA for Finance) must be identified during the Business Process Audit and addressed in the client Service Agreement.

---

## 11. PROHIBITED ACTIONS

The following are strictly prohibited across all AI Data engagements:

| Prohibited | Consequence |
|---|---|
| Processing data without a signed DPA or written authorisation | Immediate suspension of engagement |
| Sharing client data with unauthorised third parties | Contract termination + legal reporting |
| Guaranteeing 100% accuracy without human oversight checkpoint | Prohibited in all client-facing communications |
| Storing raw PII in shared environments or public repositories | Immediate incident response protocol |
| Using client data to train AI models without explicit written consent | Contract termination + GDPR/TT DPA reporting |

---

## 12. ESCALATION PROTOCOL

| Trigger | Action | Timeline |
|---|---|---|
| Data accuracy falls below 98% | Flag to Lead Strategist; notify client; initiate reprocessing | Within 2 hours of detection |
| Data breach or PII exposure | Suspend workflow; notify Lead Strategist; begin incident response | Within 1 hour of detection |
| Client disputes output quality | Freeze deliverables; escalate to Kimi (Code & Fiscal Auditor) for forensic review | Within 24 hours |
| System downtime (Make.com / Supabase / Google Drive) | Notify client of delay; switch to failover pipeline if available | Within 2 hours |
| Compliance concern raised by client | Pause workflow; Legal review by Lead Strategist | Within 24 hours |

---

## 13. CLIENT ONBOARDING CHECKLIST

Before any AI Data workflow goes live, confirm all of the following:

- [ ] Business Process Audit completed and documented
- [ ] Product and tier confirmed in writing
- [ ] Add-ons selected and priced
- [ ] Service Agreement signed by client
- [ ] DPA-001 (Data Processing Agreement) signed
- [ ] Client data sources identified and access granted
- [ ] Workflow built and tested in staging environment
- [ ] Accuracy threshold validated (≥98% for Data Entry)
- [ ] Client review of test output completed
- [ ] Go-live authorised by Lead Strategist

---

## 14. RELATED DOCUMENTS

| Document | Title |
|---|---|
| SOP-DA-001 | AI Data Entry — Product Standard |
| SOP-DA-002 | AI Reporting — Product Standard |
| SOP-DA-003 | AI Data Processing — Product Standard |
| SOP-AD-000 | General AI Data Management (Operational) |
| SOP-AD-001 | AI Data Entry (Operational) |
| SOP-AD-002 | AI Reporting (Operational) |
| SOP-AD-003 | AI Data Processing (Operational) |
| SOP-AI-000 | General AI Services Master Framework |
| DPA-001 | Data Processing Agreement |
| AICM-001 | Universal AI Compliance Mandate |

---

## 15. VERSION HISTORY

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-15 | Initial release — full legal framework (TT + international), pricing, audit protocol, data governance, quality standards, compliance checklist |
