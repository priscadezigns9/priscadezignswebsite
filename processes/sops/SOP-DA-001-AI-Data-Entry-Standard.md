# STANDARD OPERATING PROCEDURE
## SOP-DA-001 | AI Data Entry — Product Standard

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-DA-001 |
| **Title** | AI Data Entry — Product Standard |
| **Department** | AI Automation Division — Prisca Dezigns |
| **Version** | 1.0 |
| **Effective Date** | 2026-07-15 |
| **Review Date** | 2027-01-15 |
| **Owner** | Lead Strategist — Prisca Dezigns |
| **Classification** | Internal — Controlled Document |
| **Status** | Active |
| **Governed By** | SOP-DA-000 — General AI Data Standard · SOP-AD-001 — AI Data Entry (Operational) |

---

## 1. PURPOSE

This SOP defines the specific sales standards, product scope, pricing, legal obligations, and delivery requirements for the **AI Data Entry** product offered by Prisca Dezigns. AI Data Entry eliminates manual data entry by using AI to extract, validate, and transfer structured information from client sources (forms, spreadsheets, emails, documents) into their connected business systems — with a guaranteed 98% accuracy threshold.

---

## 2. PRODUCT OVERVIEW

**What It Does (as listed on priscadezigns.org/aidata/entry/):**

| Capability | Description |
|---|---|
| Customer Record Creation | AI auto-creates CRM records from intake data |
| CRM Updates | Automated synchronisation of client records across platforms |
| Spreadsheet Automation | AI reads, processes, and writes to spreadsheet systems |
| Database Record Creation | Structured data pushed directly to Supabase or connected DBs |
| Lead Management | Incoming leads auto-captured and routed to the correct pipeline |
| Order Entry | Purchase or order data extracted and logged automatically |
| Inventory Updates | Stock levels and SKUs updated from documents or intake forms |
| Employee Record Management | HR data structured and stored without manual intervention |
| Contact Management | Contact records created, deduplicated, and maintained by AI |
| Data Synchronisation | Multi-system sync — one source of truth across all platforms |

**Key Features:**

- Automated data entry with AI-driven field extraction
- Data validation and completeness checks at ingestion
- Duplicate detection and deduplication logic
- Multi-system synchronisation (CRM, Supabase, Google Sheets, Airtable)
- CRM integration (via API or native connector)
- Spreadsheet automation (Google Sheets, Excel)
- Database updates (Supabase, Airtable, PostgreSQL)
- API connectivity for custom system integrations
- Secure processing with end-to-end encryption
- Audit logging of every extraction and validation event

---

## 3. INDUSTRIES SERVED

This product is applicable across, but not limited to:
- **Finance** — Account records, transaction logging, client intake
- **Government** — Citizen records, compliance forms, departmental data
- **Healthcare** — Patient records, appointment intake, insurance data
- **Retail** — Inventory, order records, customer databases
- **Insurance** — Claims data, policy records, applicant intake
- **Construction** — Project records, procurement, contractor data

---

## 4. PRICING

### 4.1 Tiers

| Tier | Setup | Monthly | What's Included |
|---|---|---|---|
| **Starter** | $1,250 | $599/mo | Single automated workflow · One connected system · Basic data validation · Standard support · 2 AI Optimisation Sessions |
| **Growth** | Post-Audit | Post-Audit | Multiple automated workflows · Multiple connected systems · Advanced validation · API integrations · Priority support · 4 AI Optimisation Sessions |
| **Enterprise** | Post-Audit | Post-Audit | Unlimited workflows · Enterprise integrations · Custom business rules · Dedicated onboarding · Advanced monitoring · Priority support · Unlimited optimisation |

> **Rule:** All new clients begin at the Starter tier. Growth and Enterprise require a completed Business Process Audit.

### 4.2 Relevant Add-ons (from SOP-DA-000)

| Add-on | Setup | Monthly | Applicability |
|---|---|---|---|
| CRM & Database Sync | +$300 | +$50/mo | High relevance — most data entry clients need this |
| Custom Export Formats | +$200 | +$30/mo | High relevance — Excel, PDF, Google Sheets outputs |
| Multi-Source Data Intake | +$350 | +$60/mo | High relevance — clients with multiple input channels |
| Anomaly & Error Alerts | +$200 | +$30/mo | Recommended — catches errors before they reach the system |
| Automated Report Delivery | +$250 | +$40/mo | Optional — for clients who want automated entry summaries |

### 4.3 Phonetic Pricing (Drew)

| Item | Phonetic Format |
|---|---|
| Starter Setup | "Twelve fifty" |
| Starter Monthly | "Five ninety-nine per month" |
| CRM Sync | "Plus three hundred setup and fifty a month" |
| Export Formats | "Plus two hundred setup and thirty a month" |
| Multi-Source Intake | "Plus three fifty setup and sixty a month" |

---

## 5. LEGAL & COMPLIANCE (DATA ENTRY SPECIFIC)

### 5.1 Trinidad & Tobago

| Law | Data Entry Obligation |
|---|---|
| **Data Protection Act, 2011 (TT)** | Any personal data (name, ID, contact info, financial data) extracted and stored must have a lawful basis. Client must confirm they hold consent from their data subjects before Prisca Dezigns processes that data. |
| **Electronic Transactions Act, Chap. 22:06** | Extracted records stored in digital systems are legally recognised electronic records. Audit logs of all extractions must be maintained. |
| **Computer Misuse Act, Chap. 11:19** | Access to client systems (CRMs, databases, spreadsheets) is only authorised through written client approval. No access granted to any system beyond the agreed scope. |

### 5.2 International

| Standard | Obligation |
|---|---|
| **GDPR Art. 5** | Data extracted from EU-resident records must be accurate, limited to what is necessary, and not retained longer than required. Clients must sign DPA-001. |
| **ISO 8000** | All data outputs must meet defined accuracy (≥98%), completeness, and consistency standards. |
| **ISO/IEC 27001:2022 — Annex A.8** | All client data must be encrypted in transit (TLS 1.2+) and at rest. Access restricted to authorised agents only. |
| **CCPA** | If processing records of California residents, data subjects must be informed and granted deletion rights. |

### 5.3 Non-Negotiable Rules

- [ ] DPA-001 must be signed before any client data is ingested
- [ ] Written client confirmation that they hold consent from their data subjects
- [ ] All extracted PII must be stored in encrypted Supabase tables with row-level access control
- [ ] No raw client files (PDFs, spreadsheets) to be stored beyond 90 days post-processing
- [ ] AI confidence scores below 85% must be flagged for human review before committing to the database

---

## 6. DELIVERY PROCESS

### Step 1 — Business Process Audit
Confirm: data sources, volume, connected systems, output format, accuracy requirements

### Step 2 — Scope Agreement
Confirm tier + add-ons → sign Service Agreement + DPA-001

### Step 3 — Access & Permissions
Client grants access to source systems (CRM, Google Sheets, database) in writing. Access logged.

### Step 4 — Workflow Build (Staging)
Build in Make.com or n8n → configure AI extraction (Claude API / Gemini) → connect target system (Supabase / CRM / Sheets)

### Step 5 — Validation & Accuracy Test
Run 50–100 records → verify accuracy ≥ 98% → document exceptions → adjust extraction rules

### Step 6 — Client Review
Client reviews sample output → approves → signs go-live confirmation

### Step 7 — Go-Live
Lead Strategist authorises → activate live workflow → monitor first 48 hours → deliver initial accuracy report

### Step 8 — Ongoing Optimisation
AI Optimisation Sessions per tier (2 for Starter, 4 for Growth, Unlimited for Enterprise) — review accuracy, update business rules, expand scope as needed

---

## 7. QUALITY THRESHOLDS

| Metric | Standard |
|---|---|
| Extraction Accuracy | ≥ 98% (measured per batch) |
| Duplicate Detection Rate | ≥ 99% |
| Sync Completion Rate | ≥ 99.5% per workflow cycle |
| Exception Queue Resolution | Within 4 business hours of flagging |
| Client Delivery SLA | Per agreed schedule — delays communicated within 2 hours |

---

## 8. RELATED DOCUMENTS

| Document | Title |
|---|---|
| SOP-DA-000 | General AI Data Standard (Sales & Delivery) |
| SOP-AD-001 | AI Data Entry (Operational Deep Dive) |
| DPA-001 | Data Processing Agreement |
| AICM-001 | Universal AI Compliance Mandate |

---

## 9. VERSION HISTORY

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-15 | Initial release — product scope from live site, pricing (Starter $1,250/$599mo + add-ons), TT + GDPR + ISO 8000 compliance, delivery process, quality thresholds |
