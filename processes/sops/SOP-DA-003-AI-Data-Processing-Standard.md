# STANDARD OPERATING PROCEDURE
## SOP-DA-003 | AI Data Processing — Product Standard

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-DA-003 |
| **Title** | AI Data Processing — Product Standard |
| **Department** | AI Automation Division — Prisca Dezigns |
| **Version** | 1.0 |
| **Effective Date** | 2026-07-15 |
| **Review Date** | 2027-01-15 |
| **Owner** | Lead Strategist — Prisca Dezigns |
| **Classification** | Internal — Controlled Document |
| **Status** | Active |
| **Governed By** | SOP-DA-000 — General AI Data Standard · SOP-AD-003 — AI Data Processing (Operational) |

---

## 1. PURPOSE

This SOP defines the specific sales standards, product scope, pricing, legal obligations, and delivery requirements for the **AI Data Processing** product offered by Prisca Dezigns. AI Data Processing intelligently reads and processes business documents — whether digital or scanned — to extract valuable information, classify records, and prepare structured data for downstream business processes. This eliminates repetitive manual document handling while improving speed, accuracy, and consistency.

---

## 2. PRODUCT OVERVIEW

**What It Does (as listed on priscadezigns.org/aidata/processing/):**

| Capability | Description |
|---|---|
| PDF & OCR Processing | AI reads digital and scanned PDFs to extract structured data fields |
| Document Classification | Automatically categorises documents by type (invoice, contract, form, ID) |
| Invoice & Receipt Processing | Extracts vendor, amount, date, and line items without manual entry |
| Contract Processing | Identifies key clauses, parties, dates, and obligations from legal documents |
| Records Management & Indexing | Organises and indexes processed documents in a searchable structure |
| Metadata Extraction | Pulls file metadata (author, date, version, category) into structured records |

**Key Features:**

- AI-powered document extraction (Claude Vision / Google Vision API)
- Optical Character Recognition (OCR) for scanned and handwritten documents
- Automatic document classification by type and category
- Intelligent file organisation and records management logic
- Metadata extraction and enrichment
- Secure document handling with encrypted storage and access controls

---

## 3. INDUSTRIES SERVED

| Industry | Processing Use Case |
|---|---|
| **Finance** | Invoice processing, bank statement parsing, financial document indexing |
| **Government** | Public record digitisation, form processing, compliance document management |
| **Healthcare** | Patient form processing, referral letter parsing, medical record digitisation |
| **Retail** | Purchase order processing, receipt extraction, supplier invoice automation |
| **Insurance** | Claims document processing, policy parsing, applicant document intake |
| **Construction** | Contract management, procurement document processing, subcontractor records |

---

## 4. PRICING

### 4.1 Tiers

| Tier | Setup | Monthly | What's Included |
|---|---|---|---|
| **Starter** | $1,250 | $599/mo | Standard document types · OCR & PDF processing · Basic document classification · Cloud storage integration · 2 AI Optimisation Sessions |
| **Growth** | Post-Audit | Post-Audit | Multiple document workflows · Advanced OCR · Records management · Metadata extraction · Document indexing · API integrations · 4 AI Optimisation Sessions |
| **Enterprise** | Post-Audit | Post-Audit | Unlimited document workflows · Enterprise processing · Custom extraction rules · Advanced classification · Enterprise integrations · Dedicated onboarding · Unlimited optimisation |

> **Rule:** All new clients begin at Starter. Growth and Enterprise require a completed Business Process Audit.

### 4.2 Relevant Add-ons

| Add-on | Setup | Monthly | Applicability |
|---|---|---|---|
| CRM & Database Sync | +$300 | +$50/mo | High relevance — push extracted data directly to CRM or Supabase |
| Custom Export Formats | +$200 | +$30/mo | When extracted data must be delivered in Excel, PDF report, or custom template |
| Multi-Source Data Intake | +$350 | +$60/mo | Clients with documents arriving from multiple channels (email, upload portal, WhatsApp) |
| Anomaly & Error Alerts | +$200 | +$30/mo | Flags corrupted files, unreadable scans, missing fields — critical for high-volume clients |
| Analytics Dashboard | +$300 | +$50/mo | Visual overview of processing volumes, document types, extraction accuracy |
| Automated Report Delivery | +$250 | +$40/mo | Daily or weekly processing summary delivered to client automatically |

### 4.3 Phonetic Pricing (Drew)

| Item | Phonetic Format |
|---|---|
| Starter Setup | "Twelve fifty" |
| Starter Monthly | "Five ninety-nine per month" |
| CRM Sync Add-on | "Plus three hundred setup and fifty a month" |
| Multi-Source Intake | "Plus three fifty setup and sixty a month" |
| Error Alerts Add-on | "Plus two hundred setup and thirty a month" |

---

## 5. LEGAL & COMPLIANCE (DATA PROCESSING SPECIFIC)

### 5.1 Trinidad & Tobago

| Law | Data Processing Obligation |
|---|---|
| **Data Protection Act, 2011 (TT)** | Documents containing personal data (IDs, financial records, medical information, employee files) must be processed under explicit client authorisation. The client must confirm they hold the legal right to submit these documents for AI processing. Prisca Dezigns acts strictly as Data Processor — the client remains Data Controller. |
| **Electronic Transactions Act, Chap. 22:06** | Digitised records produced from physical documents are legally recognised electronic records. Chain-of-custody logs must be maintained for all processed documents. |
| **Computer Misuse Act, Chap. 11:19** | Any system access required for document retrieval (cloud drives, email inboxes, portals) must be explicitly authorised in writing before access is granted. |
| **Consumer Protection and Safety Act** | AI extraction accuracy must not be overstated. All limitations of OCR (e.g., handwritten text, low-quality scans) must be disclosed to the client before the engagement begins. |

### 5.2 International

| Standard | Obligation |
|---|---|
| **GDPR Art. 5 & Art. 35** | Processing documents containing PII of EU residents at scale may require a Data Protection Impact Assessment (DPIA). Clients must be advised. DPA-001 mandatory. |
| **ISO/IEC 27001:2022 — Annex A.8** | All documents uploaded for processing must be stored in encrypted environments. Access must be restricted and logged. Documents must be purged per the agreed retention schedule. |
| **ISO/IEC 42001:2023** | AI-powered document extraction must be explainable — clients must be able to request a breakdown of how specific fields were extracted from any document. |
| **ISO 9001:2015 — Cl. 8.5** | Every document processing workflow must be tested on a representative sample before full deployment. Exceptions and edge cases must be documented. |
| **HIPAA (USA — if applicable)** | If processing medical records for healthcare clients with US patients, HIPAA-compliant processing environments and BAAs (Business Associate Agreements) are required. |
| **CCPA** | If processing documents containing California resident PII, privacy disclosures apply and deletion requests must be honoured. |

### 5.3 Non-Negotiable Rules

- [ ] DPA-001 signed before any client document is uploaded or processed
- [ ] Client must confirm in writing they hold the legal right to submit all documents for AI processing
- [ ] All documents containing PII must be stored in encrypted, access-controlled Supabase storage — never in public or shared repositories
- [ ] Raw source documents purged within 90 days of processing completion, unless the client's Service Agreement specifies a shorter period
- [ ] OCR confidence scores below 80% must be flagged for human review — never auto-committed to the database
- [ ] Medical, legal, or government documents must be disclosed to the Lead Strategist before the engagement begins — additional compliance review required
- [ ] Processing logs (document ID, timestamp, extraction status, confidence score) must be maintained for a minimum of 12 months

---

## 6. DELIVERY PROCESS

### Step 1 — Business Process Audit
Confirm: document types, volume, source channels, classification requirements, output format, downstream system

### Step 2 — Scope Agreement
Confirm tier + add-ons → sign Service Agreement + DPA-001 + document submission authorisation

### Step 3 — Document Sample Collection
Client provides 20–50 representative documents from each type (invoices, contracts, forms, etc.) for AI training and testing

### Step 4 — Extraction Rule Configuration
Configure Claude Vision / Google Vision API extraction rules per document type → define field mappings → set confidence thresholds

### Step 5 — Classification Setup
Build document classification logic (invoice vs. contract vs. ID vs. form) → validate against sample set → achieve ≥ 98% classification accuracy

### Step 6 — Pipeline Build
Connect intake channel (upload portal, email, cloud drive) → configure Make.com or n8n pipeline → connect output destination (Supabase, Google Drive, CRM)

### Step 7 — Accuracy Validation
Process full sample set → review extraction accuracy → document exceptions → adjust rules → re-test until ≥ 98% threshold met

### Step 8 — Client Review
Client reviews structured output against original documents → approves → signs go-live confirmation

### Step 9 — Go-Live
Lead Strategist authorises → activate live pipeline → monitor first 200 documents → deliver initial accuracy and classification report

### Step 10 — Optimisation Sessions
Per tier (2 Starter, 4 Growth, Unlimited Enterprise) — add new document types, refine extraction rules, expand classification logic

---

## 7. QUALITY THRESHOLDS

| Metric | Standard |
|---|---|
| OCR Extraction Accuracy | ≥ 98% for typed documents; ≥ 90% for handwritten (disclosed pre-engagement) |
| Document Classification Accuracy | ≥ 98% |
| Processing Completion Rate | ≥ 99.5% — all submitted documents fully processed or flagged |
| Exception Flag Rate | < 5% per batch (documents requiring human review) |
| Processing SLA | Documents processed within agreed turnaround — delays communicated within 2 hours |
| Data Purge Compliance | 100% — all raw documents purged per agreed retention schedule |

---

## 8. RELATED DOCUMENTS

| Document | Title |
|---|---|
| SOP-DA-000 | General AI Data Standard (Sales & Delivery) |
| SOP-AD-003 | AI Data Processing (Operational Deep Dive) |
| DPA-001 | Data Processing Agreement |
| AICM-001 | Universal AI Compliance Mandate |

---

## 9. VERSION HISTORY

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-15 | Initial release — product scope from live site (OCR, classification, invoice/contract/records processing), pricing (Starter $1,250/$599mo + add-ons), TT + GDPR + HIPAA + ISO 42001 compliance, 10-step delivery process, quality thresholds |
