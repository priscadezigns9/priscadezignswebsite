# STANDARD OPERATING PROCEDURE
## SOP-AD-002 | AI Reporting

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-AD-002 |
| **Title** | AI Reporting |
| **Parent SOP** | SOP-AD-000 — General AI Data Management |
| **Department** | Operations & AI Infrastructure — Prisca Dezigns |
| **Version** | 1.0 |
| **Effective Date** | 2026-07-15 |
| **Review Date** | 2027-01-15 |
| **Owner** | Lead Strategist — Prisca Dezigns |
| **Classification** | Internal — Controlled Document |
| **Status** | Active |
| **Compliance** | ISO 9001:2015 Cl.9.1 · ISO 27001:2022 Annex A.8 · ISO 8000 · TT Data Protection Act 2011 · GDPR Art. 5 |

---

## 1. PURPOSE

This SOP defines the process for generating, validating, and delivering AI-assisted reports for Prisca Dezigns clients. It covers automated reporting pipelines, data sourcing, accuracy requirements, formatting standards, and delivery protocols — ensuring every report is accurate, timely, and compliant.

---

## 2. SCOPE

Applies to all reporting workflows where AI is used to:
- Aggregate and summarise data from one or more sources (Supabase, CRM, spreadsheets, APIs)
- Generate performance dashboards, summaries, or trend analyses
- Produce scheduled reports (daily, weekly, monthly)
- Create one-off analytical reports for client decision-making
- Produce internal agency reporting (lead conversion, SOP compliance, operational metrics)

---

## 3. DEFINITIONS

| Term | Definition |
|---|---|
| **Report** | A structured document or dashboard summarising data from one or more sources for a defined time period |
| **Data Source** | The originating system from which report data is pulled (Supabase, Google Sheets, API, etc.) |
| **Aggregation** | The process of combining data from multiple records or sources into a summary metric |
| **KPI** | Key Performance Indicator — a pre-agreed metric the client uses to measure performance |
| **Scheduled Report** | A report generated and delivered automatically on a recurring basis |
| **Ad-hoc Report** | A one-off report generated on request |
| **Accuracy Threshold** | Minimum required match between AI-generated figures and source data: **99%** |

---

## 4. REPORTING WORKFLOW

### Phase 1 — Report Scoping
1. Client defines (or Lead Strategist confirms) the required KPIs and data sources for each report type
2. Report schema documented in Supabase `report_definitions` table: report name, frequency, data sources, KPIs, output format, recipient
3. Time period, granularity (daily/weekly/monthly), and delivery channel confirmed

### Phase 2 — Data Sourcing
1. AI agent queries designated data sources for the reporting period
2. All source queries are logged with: timestamp, data source, query hash, row count returned
3. Data is pulled in read-only mode — no reporting process may modify source data
4. Data gaps (missing records, broken API connections) are flagged before report generation — report is not generated with incomplete data

### Phase 3 — AI Aggregation & Analysis
1. AI processes raw data to compute KPIs, identify trends, flag anomalies
2. All computed metrics are cross-referenced against source totals (row counts, sums, averages must reconcile)
3. Kimi performs a deterministic audit of all numerical values before report is finalised
4. Accuracy threshold: **99%** — any figure with < 99% confidence against source data is flagged and held

### Phase 4 — Report Generation
1. Report is generated in the client's required format: PDF, Google Doc, CSV, or dashboard embed
2. Every report must include:
   - Report ID and generation timestamp
   - Data period covered
   - Data sources used
   - Total records analysed
   - Any caveats or data gaps
   - Prisca Dezigns report footer
3. Reports containing PII must be marked **CONFIDENTIAL** on every page

### Phase 5 — Delivery
1. Scheduled reports: delivered automatically via the agreed channel (email, WhatsApp, Google Drive, Supabase dashboard)
2. Ad-hoc reports: delivered within the agreed SLA from time of request
3. Sierra sends delivery notification with report summary in plain language
4. Client confirmation of receipt is requested for all reports containing financial or PII data

---

## 5. ACCURACY STANDARDS

| Metric | Minimum Standard | Action if Below |
|---|---|---|
| Numerical accuracy vs. source data | **99%** | Hold report; re-run aggregation; escalate to Kimi |
| KPI coverage (all agreed KPIs present) | **100%** | Do not deliver incomplete report |
| Data freshness (lag from source to report) | ≤ 1 hour for scheduled; ≤ 4 hours for ad-hoc | Flag delay to client |
| Report delivery on schedule | **95% on-time rate** | Review pipeline; notify client if late |

---

## 6. REPORT TYPES

| Report Type | Frequency | Typical KPIs | Default Format |
|---|---|---|---|
| **Lead Conversion Report** | Weekly | Total leads, conversion rate, source breakdown, revenue pipeline | PDF + CSV |
| **Customer Service Performance** | Weekly | Response time, resolution rate, escalation rate, CSAT score | PDF |
| **Email Campaign Report** | Per campaign | Open rate, click rate, unsubscribes, conversion | PDF + CSV |
| **WhatsApp Automation Report** | Weekly | Messages sent, delivered, read, opt-outs, conversation rate | PDF |
| **Website Traffic & Chat Report** | Monthly | Sessions, chatbot engagements, lead captures, bounce rate | Dashboard + PDF |
| **Data Entry Completion Report** | Per job | Records processed, accuracy score, exceptions, turnaround time | PDF |
| **SOP Compliance Report** | Monthly (Internal) | SOPs applied per project, compliance rate, incidents | PDF |
| **Financial Summary** | Monthly | Revenue, outstanding invoices, project costs | PDF (Confidential) |

---

## 7. PII IN REPORTS

1. Reports must never include raw PII (full names, email addresses, phone numbers) in summary or trend sections
2. PII may only appear in data exports where: client has specifically requested it AND data is transmitted via encrypted channel
3. PII in reports is masked by default: e.g., `J*** N***, +1868 *** 4101`
4. Reports with unmasked PII are labelled **RESTRICTED** and require Lead Strategist sign-off before delivery

---

## 8. ESCALATION MATRIX

| Scenario | Action | Owner | Timeline |
|---|---|---|---|
| Accuracy < 99% detected | Hold report; re-run; notify Lead | Kimi | Same session |
| Data source unavailable at scheduled run time | Notify client; reschedule report; investigate source | Sierra + Lead | Within 1 hour |
| KPI data gap > 10% of period | Partial report flagged; client notified; gap explained | Sierra | Before delivery |
| Client disputes reported figures | Provide full audit trail; re-run source query | Kimi + Lead | Within 4 hours |
| Report containing PII delivered to wrong recipient | Initiate breach protocol (SOP-AD-000 Section 8) | Lead Strategist | Immediate |

---

## 9. TOOLS & INTEGRATIONS

| Tool | Role in Reporting |
|---|---|
| **Claude API (Anthropic)** | Narrative generation, trend analysis, anomaly flagging |
| **Supabase** | Primary data source and `report_definitions` / `report_log` tables |
| **Make.com / n8n** | Scheduled report automation pipeline |
| **Google Drive / Docs** | Report storage and delivery |
| **Kimi (Audit Agent)** | Deterministic accuracy validation of all numerical values |
| **Sierra (Ops Agent)** | Client delivery and receipt confirmation |
| **ImprovMX + Gmail** | Email delivery channel for reports |

---

## 10. LOGGING REQUIREMENTS

Every report run must produce an entry in Supabase `report_log`:

| Field | Description |
|---|---|
| `report_id` | Unique identifier for this report instance |
| `report_definition_id` | FK to the report definition |
| `client_id` | Client reference |
| `period_start` | Start of data period |
| `period_end` | End of data period |
| `records_analysed` | Total records included in the aggregation |
| `accuracy_score` | Numerical accuracy vs. source (%) |
| `generated_at` | Timestamp of report generation |
| `delivered_at` | Timestamp of delivery |
| `delivery_channel` | Channel used (email, WhatsApp, Drive, dashboard) |
| `delivery_status` | `delivered`, `failed`, `pending` |
| `kimi_audit_passed` | Boolean — Kimi sign-off |

---

## 11. CLIENT DELIVERABLES

| Deliverable | Format | SLA |
|---|---|---|
| Scheduled reports | PDF / CSV / Dashboard | Per agreed schedule |
| Ad-hoc reports | PDF / CSV | Within 4 business hours of request |
| Report audit trail | Supabase query log export | Within 24 hours of client request |
| Corrected report (dispute resolution) | PDF + diff summary | Within 4 hours of confirmed dispute |

---

## 12. VERSION HISTORY

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-07-15 | Lead Strategist — Prisca Dezigns | Initial release |

---

*This document is the property of Prisca Dezigns. | priscadezigns.org | hello@priscadezigns.org*
