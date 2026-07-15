# STANDARD OPERATING PROCEDURE
## SOP-AD-001 | AI Data Entry

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-AD-001 |
| **Title** | AI Data Entry |
| **Parent SOP** | SOP-AD-000 — General AI Data Management |
| **Department** | Operations & AI Infrastructure — Prisca Dezigns |
| **Version** | 1.0 |
| **Effective Date** | 2026-07-15 |
| **Review Date** | 2027-01-15 |
| **Owner** | Lead Strategist — Prisca Dezigns |
| **Classification** | Internal — Controlled Document |
| **Status** | Active |
| **Compliance** | ISO 9001:2015 Cl.8.5 · ISO 8000 (Data Quality) · ISO 27001:2022 Annex A.8 · TT Data Protection Act 2011 · GDPR Art. 5 |

---

## 1. PURPOSE

This SOP defines the end-to-end process for AI-assisted data entry operations at Prisca Dezigns. It covers how raw client data (from documents, PDFs, spreadsheets, images, or manual input) is ingested, processed by AI, validated, structured, and stored — with a minimum accuracy threshold of 98%.

---

## 2. SCOPE

Applies to all data entry workflows where AI is used to:
- Extract data from uploaded documents (PDF, DOCX, images, CSV)
- Populate structured databases from unstructured source material
- Convert handwritten or scanned records into digital format
- Clean, deduplicate, or standardise existing datasets
- Auto-fill client records from form submissions or intake data

---

## 3. DEFINITIONS

| Term | Definition |
|---|---|
| **Source Document** | The original file or input provided by the client for processing |
| **Extraction** | AI-driven identification and capture of structured data fields from unstructured content |
| **Validation** | Automated and/or human verification that extracted data is accurate and complete |
| **Golden Record** | The single verified, authoritative record for a data subject in the system |
| **Confidence Score** | AI-assigned probability (0–100%) that an extracted value is correct |
| **Exception Queue** | A holding state for records that fall below the confidence threshold and require human review |

---

## 4. DATA ENTRY WORKFLOW

### Phase 1 — Client Submission
1. Client uploads source documents via the designated intake channel (web form, WhatsApp, email, or client portal)
2. Sierra confirms receipt within 15 minutes with a reference number
3. Documents are logged in Supabase `data_jobs` table: client ID, document name, file type, timestamp, assigned agent
4. Documents classified per SOP-AD-000 Section 5 — Class 3 or Class 4 for any PII

### Phase 2 — AI Extraction
1. AI agent (Claude API via Make.com or n8n) processes the source document
2. Extraction fields are defined per the client's data schema (pre-configured in Supabase)
3. Each extracted field is assigned a **Confidence Score** (0–100%)
4. Fields with confidence ≥ 95% → auto-accepted to the output record
5. Fields with confidence 80–94% → flagged for spot-check review
6. Fields with confidence < 80% → moved to **Exception Queue** for mandatory human review

### Phase 3 — Validation
1. Kimi performs deterministic validation checks:
   - Data type match (e.g., date fields contain valid dates)
   - Format compliance (e.g., phone numbers follow E.164 format)
   - Required field completeness (no mandatory field is blank)
   - Duplicate detection (no duplicate Golden Record created)
2. Exception Queue items are reviewed by the Lead Strategist or designated reviewer
3. Corrections are logged with: reviewer ID, original value, corrected value, timestamp

### Phase 4 — Storage
1. Validated records are written to the target Supabase table with Row Level Security enabled
2. Source documents are stored in the client's designated Google Drive folder
3. A processing summary is generated: total records, accepted, flagged, corrected, rejected

### Phase 5 — Client Delivery
1. Processed data is exported in the client's required format (CSV, Excel, PDF summary, or live Supabase access)
2. Delivery notification sent via the client's preferred channel
3. Sierra sends the processing summary report with accuracy metrics

---

## 5. ACCURACY STANDARDS

| Metric | Minimum Standard | Action if Below |
|---|---|---|
| Overall extraction accuracy | **98%** | Re-process batch; escalate to Lead |
| Confidence score threshold (auto-accept) | **95%** | Flag for review |
| Exception Queue resolution rate | **100%** | No record may leave in unresolved state |
| Duplicate record rate | **0%** | Full deduplication run before delivery |
| Missing mandatory fields | **0%** | Client contacted for missing data |

---

## 6. DATA ENTRY CATEGORIES

| Category | Description | Typical Sources |
|---|---|---|
| **Client/Customer Records** | Names, contact info, demographics | Intake forms, sign-up sheets, CRM exports |
| **Financial Data** | Invoice amounts, payment dates, account numbers | PDF invoices, spreadsheets, bank statements |
| **Inventory/Product Data** | SKUs, descriptions, pricing, stock levels | Supplier sheets, product catalogues |
| **HR/Payroll Data** | Employee records, hours, salaries | Timesheets, HR forms |
| **Lead Data** | Business names, contact persons, emails, intent signals | Prospect lists, LinkedIn exports, web scrapes |
| **Operational Data** | Project milestones, task logs, SLA records | Project management exports, client briefs |

---

## 7. PII HANDLING IN DATA ENTRY

1. PII fields (name, email, phone, NIN, financial account numbers) must be masked in processing logs — store hash only, not the raw value
2. AI models (Anthropic/Claude) must not receive raw PII in prompts — use anonymised placeholders during AI extraction; re-link after validation
3. All PII fields must be encrypted before writing to Supabase
4. Access to PII fields restricted to Lead Strategist and the specific client — no other agent or team member

---

## 8. ESCALATION MATRIX

| Scenario | Action | Owner | Timeline |
|---|---|---|---|
| Confidence score < 80% on > 10% of records | Pause batch; notify Lead; client review requested | Lead Strategist | Within 2 hours |
| Duplicate rate > 0% detected | Halt write operation; run deduplication; re-validate | Kimi | Same session |
| PII found in a field not designated for PII | Quarantine record; notify Lead | Kimi | Immediate |
| Source document unreadable (corrupted/low resolution) | Return to client with format requirements | Sierra | Within 1 business hour |
| Client requests deletion of entered data | Initiate deletion per SOP-AD-000 Section 6.6 | Lead Strategist | Within 30 days |

---

## 9. TOOLS & INTEGRATIONS

| Tool | Role in Data Entry |
|---|---|
| **Claude API (Anthropic)** | Primary extraction engine — document parsing and field identification |
| **Make.com / n8n** | Automation pipeline — orchestrates ingestion, AI call, validation, storage |
| **Supabase** | Primary structured data store — `data_jobs` and target client tables |
| **Google Drive** | Source document archive — client folder per project |
| **Kimi (Audit Agent)** | Deterministic validation layer — post-extraction quality control |
| **Sierra (Ops Agent)** | Client communication — receipt confirmation, status updates, delivery |

---

## 10. LOGGING REQUIREMENTS

Every data entry job must produce a log entry in Supabase `data_jobs_log` with:

| Field | Description |
|---|---|
| `job_id` | Unique identifier for the processing run |
| `client_id` | Client reference |
| `source_document` | File name and hash |
| `total_records` | Total number of records in the source |
| `records_accepted` | Records auto-accepted (confidence ≥ 95%) |
| `records_flagged` | Records reviewed by human |
| `records_rejected` | Records returned to client |
| `accuracy_score` | Final accuracy percentage |
| `processing_agent` | AI model and version used |
| `validator` | Name/ID of human reviewer (if applicable) |
| `completed_at` | Timestamp of job completion |

---

## 11. CLIENT DELIVERABLES

| Deliverable | Format | Timeline |
|---|---|---|
| Processed data file | CSV, XLSX, or PDF (client's choice) | Within agreed SLA (default: 1 business day per 500 records) |
| Processing Summary Report | PDF or inline message | With every delivery |
| Exception Report (if applicable) | PDF listing all flagged or rejected records | Same delivery |
| Access to live data | Supabase read-only link or exported view | Upon request |

---

## 12. VERSION HISTORY

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-07-15 | Lead Strategist — Prisca Dezigns | Initial release |

---

*This document is the property of Prisca Dezigns. | priscadezigns.org | hello@priscadezigns.org*
