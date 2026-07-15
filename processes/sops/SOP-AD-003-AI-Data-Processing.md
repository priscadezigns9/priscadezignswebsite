# STANDARD OPERATING PROCEDURE
## SOP-AD-003 | AI Data Processing

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-AD-003 |
| **Title** | AI Data Processing |
| **Parent SOP** | SOP-AD-000 — General AI Data Management |
| **Department** | Operations & AI Infrastructure — Prisca Dezigns |
| **Version** | 1.0 |
| **Effective Date** | 2026-07-15 |
| **Review Date** | 2027-01-15 |
| **Owner** | Lead Strategist — Prisca Dezigns |
| **Classification** | Internal — Controlled Document |
| **Status** | Active |
| **Compliance** | ISO 9001:2015 Cl.8.4 · ISO 27001:2022 Annex A.8 · ISO 8000 · TT Data Protection Act 2011 · GDPR Art. 5–6 · ISO 42001 (AI Management) |

---

## 1. PURPOSE

This SOP defines the governance framework for all AI data processing operations at Prisca Dezigns — the transformation, enrichment, classification, routing, and structuring of data by AI models within client and internal workflows. It ensures that AI-driven data transformations are traceable, reversible where possible, accurate, and legally compliant.

---

## 2. SCOPE

Applies to all AI workflows where data is actively transformed, not merely entered or reported. This includes:
- Data cleaning and normalisation (removing duplicates, standardising formats)
- Data enrichment (appending additional fields from secondary sources or AI inference)
- Data classification (categorising records by type, priority, or sentiment)
- Data routing (directing records to different systems or queues based on AI-assessed criteria)
- Data transformation pipelines (converting one data structure to another)
- AI-driven lead scoring, customer segmentation, and intent analysis
- Automated decision-making that affects client data or customer-facing outcomes

---

## 3. DEFINITIONS

| Term | Definition |
|---|---|
| **Data Processing** | Any operation performed on data — collecting, recording, organising, structuring, storing, adapting, altering, retrieving, using, disclosing, or deleting |
| **Transformation** | Changing the format, structure, or content of data |
| **Enrichment** | Adding new data fields to an existing record from an external or inferred source |
| **Classification** | Assigning a category, label, or score to a record based on AI analysis |
| **Routing** | Directing a record to a specific destination system, queue, or team member based on AI logic |
| **Automated Decision** | Any decision made by AI without direct human intervention that has a material effect on a client or customer |
| **Human-in-the-Loop (HITL)** | A processing step that requires a human to review and approve before the AI action is finalised |
| **Audit Trail** | A complete, tamper-evident record of every transformation applied to a piece of data |

---

## 4. CORE PROCESSING PRINCIPLES

All AI data processing at Prisca Dezigns must comply with the following:

| Principle | Requirement |
|---|---|
| **Traceability** | Every transformation must be logged — the before state, the after state, and the AI action that caused the change |
| **Reversibility** | Where technically possible, all transformations must be reversible — original data is preserved before modification |
| **Determinism for Critical Data** | Financial, legal, and PII data must be processed by deterministic validation (Kimi) before any AI-inferred value is accepted |
| **No Silent Hallucination** | AI may not invent or infer a value for a field that was not present in the source data without explicit flagging to the human reviewer |
| **Minimal Footprint** | Data is processed in the minimum scope required — no cross-client data mixing, no unnecessary field access |
| **Consent Alignment** | Data may only be processed for purposes covered by the original consent — no scope creep |

---

## 5. DATA PROCESSING WORKFLOW

### Phase 1 — Processing Job Initiation
1. Processing job is initiated by: a client request, an automation trigger, or a scheduled pipeline
2. Job is logged in Supabase `processing_jobs` table: client ID, job type, data source, target destination, initiating agent, timestamp
3. Scope is confirmed: which records, which fields, what transformation
4. A **snapshot of the pre-transformation data** is taken and stored — this is the restore point

### Phase 2 — AI Processing Execution
1. AI agent executes the defined transformation against the scoped data
2. Each field-level change is logged: field name, original value hash, new value hash, AI confidence score, timestamp
3. For enrichment from external sources: the source URL/API and retrieval timestamp are logged
4. For AI inference (e.g., sentiment, lead score, intent category): the model version and prompt version are logged
5. **No Hallucination Rule:** If the AI cannot determine a value with ≥ 80% confidence, the field is left blank and flagged — not filled with a guess

### Phase 3 — Validation
1. Kimi runs deterministic checks on all processed records:
   - Data type integrity
   - Referential integrity (foreign key relationships not broken)
   - No unintended field overwrites
   - No cross-client data contamination
   - Confidence scores reviewed — all < 90% fields are sent to human review
2. Human-in-the-Loop (HITL) is triggered for:
   - Any automated decision that affects a customer's status, pricing, or service access
   - Any PII transformation
   - Any financial data modification
   - Any record deletion or archival

### Phase 4 — Commit or Rollback
1. If all checks pass → transformation is committed to the target Supabase table
2. If any check fails → job is rolled back to the pre-transformation snapshot; error is logged; Lead Strategist notified
3. Pre-transformation snapshot is retained for 30 days post-commit, then deleted

### Phase 5 — Delivery & Notification
1. Processed dataset is made available to the client via agreed delivery method
2. Sierra sends a Processing Completion Report: records processed, transformations applied, any exceptions
3. Audit trail is available to the client upon request

---

## 6. PROCESSING CATEGORIES & SPECIFIC RULES

### 6.1 Data Cleaning & Normalisation
- Deduplication: merge rule must be defined by the client — no record is merged without a confirmed merge rule
- Format standardisation (dates, phone numbers, addresses): a format schema must be agreed before the job runs
- Original values are never overwritten without a snapshot

### 6.2 Data Enrichment
- Only enrich from approved external sources listed in the Sub-processor Register (SOP-AD-000 Section 9)
- Client must consent to enrichment from third-party sources
- Inferred or AI-generated enrichment fields must be tagged `ai_inferred: true` in the database

### 6.3 Data Classification & Scoring
- Lead scoring models must be documented: which fields are weighted, what the scoring range is, what triggers each tier
- Sentiment analysis outputs must be stored alongside the source text — not as a replacement
- Classification labels must be reviewed for bias quarterly

### 6.4 Data Routing & Automation
- Routing rules must be documented and client-approved before activation
- No automated routing rule may move a customer's data to a system not disclosed in the DPA
- Mis-routes must be corrected within 4 hours and logged as incidents

### 6.5 Automated Decision-Making (ADM)
- **GDPR Art. 22 compliance:** No solely automated decision that produces a legal or similarly significant effect on a data subject may be made without HITL review
- All ADM logic must be documented in plain language accessible to the data subject
- Clients must disclose to their customers when an automated decision has been made about them
- Data subjects have the right to request human review of any ADM outcome

---

## 7. ACCURACY & QUALITY STANDARDS

| Metric | Minimum Standard | Action if Below |
|---|---|---|
| Field transformation accuracy | **98%** | Rollback job; re-run with corrected logic |
| AI confidence threshold (accept) | **90%** | Flag for HITL review |
| Referential integrity post-processing | **100%** | Rollback; investigate |
| Pre-transformation snapshot availability | **100%** | Job does not start without snapshot |
| HITL review completion before commit | **100%** (where triggered) | Job held until review complete |

---

## 8. ESCALATION MATRIX

| Scenario | Action | Owner | Timeline |
|---|---|---|---|
| Referential integrity broken post-processing | Immediate rollback; escalate to Lead | Kimi | Immediate |
| Cross-client data detected in processing output | Isolate affected records; full audit; client notified | Lead Strategist | Within 2 hours |
| AI produced hallucinated values accepted past validation | Rollback; incident report; model review | Lead Strategist + Kimi | Within 4 hours |
| HITL review not completed within 24 hours | Job auto-rollback; client notified of delay | Sierra | At 24-hour mark |
| Client disputes a transformation outcome | Provide full audit trail; offer rollback if within 30-day window | Kimi + Lead | Within 4 hours |
| Processing job triggers a data breach | Initiate SOP-AD-000 Section 8 breach protocol | Lead Strategist | Immediate |

---

## 9. TOOLS & INTEGRATIONS

| Tool | Role in Data Processing |
|---|---|
| **Claude API (Anthropic)** | AI transformation, classification, sentiment, enrichment inference |
| **Make.com / n8n** | Automation pipeline orchestration |
| **Supabase** | Processing job logging, data storage, snapshot management |
| **Kimi (Audit Agent)** | Deterministic validation — integrity checks, confidence review |
| **Sierra (Ops Agent)** | Job initiation from client requests; completion notification |
| **Google Drive** | Snapshot storage for large file-based datasets |

---

## 10. LOGGING REQUIREMENTS

Every processing job must produce a complete entry in Supabase `processing_jobs_log`:

| Field | Description |
|---|---|
| `job_id` | Unique identifier |
| `client_id` | Client reference |
| `job_type` | Cleaning / Enrichment / Classification / Routing / ADM |
| `records_scoped` | Total records in scope |
| `records_processed` | Successfully transformed |
| `records_flagged` | Sent to HITL review |
| `records_rolled_back` | Reverted to pre-transformation state |
| `snapshot_id` | Reference to the pre-transformation snapshot |
| `processing_agent` | AI model and version |
| `kimi_audit_passed` | Boolean |
| `hitl_required` | Boolean |
| `hitl_reviewer` | Name/ID of human reviewer (if applicable) |
| `accuracy_score` | Final accuracy % |
| `started_at` | Job start timestamp |
| `completed_at` | Job completion timestamp |
| `status` | `committed`, `rolled_back`, `pending_hitl`, `failed` |

---

## 11. CLIENT DELIVERABLES

| Deliverable | Format | SLA |
|---|---|---|
| Processed dataset | CSV, XLSX, or Supabase access | Per agreed project timeline |
| Processing Completion Report | PDF | Within 1 hour of job completion |
| Audit Trail | Supabase log export (JSON or CSV) | Within 24 hours of request |
| Rollback confirmation (if applicable) | PDF | Within 4 hours of rollback |
| HITL review summary | PDF | Within 24 hours of review completion |

---

## 12. VERSION HISTORY

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-07-15 | Lead Strategist — Prisca Dezigns | Initial release |

---

*This document is the property of Prisca Dezigns. | priscadezigns.org | hello@priscadezigns.org*
