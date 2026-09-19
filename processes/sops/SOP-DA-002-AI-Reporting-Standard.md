# STANDARD OPERATING PROCEDURE
## SOP-DA-002 | AI Reporting — Product Standard

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-DA-002 |
| **Title** | AI Reporting — Product Standard |
| **Department** | AI Automation Division — Prisca Dezigns |
| **Version** | 1.0 |
| **Effective Date** | 2026-07-15 |
| **Review Date** | 2027-01-15 |
| **Owner** | Lead Strategist — Prisca Dezigns |
| **Classification** | Internal — Controlled Document |
| **Status** | Active |
| **Governed By** | SOP-DA-000 — General AI Data Standard · SOP-AD-002 — AI Reporting (Operational) |

---

## 1. PURPOSE

This SOP defines the specific sales standards, product scope, pricing, legal obligations, and delivery requirements for the **AI Reporting** product offered by Prisca Dezigns. AI Reporting connects to a client's existing business systems, analyses available data, and generates clear, accurate reports automatically — on demand or on a defined schedule — eliminating the need for manual report preparation.

---

## 2. PRODUCT OVERVIEW

**What It Does (as listed on priscadezigns.org/aidata/reporting/):**

| Capability | Description |
|---|---|
| Executive Summaries | High-level AI-generated overviews for leadership decision-making |
| Daily, Weekly & Monthly Reports | Scheduled automated report cycles delivered without manual preparation |
| KPI Dashboards | Real-time or scheduled key performance indicator tracking |
| Sales & Marketing Performance | Revenue, lead conversion, campaign ROI — automated |
| Customer Service & Support Metrics | Ticket resolution times, satisfaction scores, response rates |
| Financial & Operational Summaries | Cost summaries, operational throughput, financial snapshots |

**Key Features:**

- Automated report generation from connected data sources
- Scheduled reporting and delivery (email or WhatsApp)
- Trend analysis and business performance tracking
- Multi-source data aggregation into a single report
- Custom report templates per client requirement
- PDF, Excel, and CSV export formats

---

## 3. INDUSTRIES SERVED

| Industry | Reporting Use Case |
|---|---|
| **Finance** | P&L summaries, transaction reports, compliance dashboards |
| **Government** | Departmental KPIs, public service delivery reports |
| **Healthcare** | Patient throughput, appointment metrics, staffing summaries |
| **Retail** | Sales performance, inventory turnover, customer behaviour |
| **Insurance** | Claims volumes, policy performance, loss ratios |
| **Construction** | Project progress, procurement spend, labour productivity |

---

## 4. PRICING

### 4.1 Tiers

| Tier | Setup | Monthly | What's Included |
|---|---|---|---|
| **Starter** | $1,250 | $599/mo | Automated report templates · Scheduled daily/weekly reports · PDF exports & email delivery · Basic dashboards · 2 AI Optimisation Sessions |
| **Growth** | Post-Audit | Post-Audit | Unlimited report templates · Executive summaries · KPI dashboards · Multiple connected sources · Excel & CSV exports · Priority support · 4 AI Optimisation Sessions |
| **Enterprise** | Post-Audit | Post-Audit | Unlimited custom reports · Department-specific dashboards · Enterprise integrations · API connectivity · Advanced analytics · Dedicated onboarding · Unlimited optimisation |

> **Rule:** All new clients begin at Starter. Growth and Enterprise require a completed Business Process Audit.

### 4.2 Relevant Add-ons

| Add-on | Setup | Monthly | Applicability |
|---|---|---|---|
| Automated Report Delivery | +$250 | +$40/mo | Core add-on — clients wanting WhatsApp or email delivery on a schedule |
| Analytics Dashboard | +$300 | +$50/mo | High relevance — visual layer on top of raw reports |
| CRM & Database Sync | +$300 | +$50/mo | When reports must pull live data from CRM or Supabase in real time |
| Custom Export Formats | +$200 | +$30/mo | When client needs bespoke templates beyond PDF/Excel/CSV |
| Anomaly & Error Alerts | +$200 | +$30/mo | For clients needing real-time alerts when KPIs fall outside thresholds |

### 4.3 Phonetic Pricing (Drew)

| Item | Phonetic Format |
|---|---|
| Starter Setup | "Twelve fifty" |
| Starter Monthly | "Five ninety-nine per month" |
| Report Delivery Add-on | "Plus two fifty setup and forty a month" |
| Analytics Dashboard Add-on | "Plus three hundred setup and fifty a month" |

---

## 5. LEGAL & COMPLIANCE (REPORTING SPECIFIC)

### 5.1 Trinidad & Tobago

| Law | Reporting Obligation |
|---|---|
| **Data Protection Act, 2011 (TT)** | Reports that include personal data (employee names, client identifiers, financial records of individuals) must be generated under lawful basis. Clients must confirm their data subjects have been informed their data will be used for automated reporting. |
| **Electronic Transactions Act, Chap. 22:06** | Automated reports delivered electronically are legally recognised business records. Delivery logs must be maintained for all scheduled reports. |
| **Consumer Protection and Safety Act** | Report accuracy must never be misrepresented. AI-generated figures must be verifiable against source data. If a report contains projections or estimates, this must be clearly labelled. |

### 5.2 International

| Standard | Obligation |
|---|---|
| **GDPR Art. 5 & Art. 22** | Reports that use personal data of EU residents must be necessary and proportionate. Fully automated decisions derived from these reports (e.g., credit scores, staffing decisions) must be disclosed to data subjects. DPA-001 required. |
| **ISO 9001:2015 — Cl. 8.5** | All report templates must be formally documented, tested for accuracy, and approved before delivery to clients. |
| **ISO/IEC 42001:2023** | AI-generated reports must be explainable — sources, methodology, and any AI inference must be traceable and documentable on request. |
| **CCPA** | If reporting includes data on California residents, a privacy notice must be in place and deletion requests honoured. |
| **IFRS / GAAP (where applicable)** | Financial summaries must be clearly labelled as AI-generated operational summaries — not as audited financial statements. |

### 5.3 Non-Negotiable Rules

- [ ] DPA-001 signed before accessing any client data source for report generation
- [ ] AI-generated financial reports must carry a disclaimer: *"Generated by AI for operational reference. Not a substitute for audited financial statements."*
- [ ] Report delivery credentials (email addresses, WhatsApp numbers) must be provided by the client in writing — never assumed
- [ ] All scheduled deliveries must have a documented delivery log (timestamp, recipient, report ID)
- [ ] Any report containing PII must be delivered via encrypted channel (TLS email or WhatsApp Business API)

---

## 6. DELIVERY PROCESS

### Step 1 — Business Process Audit
Confirm: data sources, reporting cadence, KPIs, formats, delivery channels, recipients

### Step 2 — Scope Agreement
Confirm tier + add-ons → sign Service Agreement + DPA-001

### Step 3 — Data Source Access
Client grants read-only access to relevant systems (CRM, Supabase, Google Sheets, accounting software). Access limited to data required for reporting only.

### Step 4 — Template Build
Design report templates per client spec — executive summary, KPI dashboard, department view — in agreed export format (PDF, Excel, CSV)

### Step 5 — AI Configuration
Configure AI brain (Claude API / Gemini) to aggregate, analyse, and format data → connect to scheduling pipeline (Make.com or n8n)

### Step 6 — Accuracy Validation
Generate test reports for 2–3 reporting cycles → client verifies figures match their source data → sign-off before automation activates

### Step 7 — Delivery Setup
Configure delivery channel (email via SMTP / WhatsApp via 360dialog / WATI) → confirm recipients → test delivery

### Step 8 — Go-Live
Lead Strategist authorises → activate scheduled pipeline → monitor first 3 deliveries → issue client confirmation report

### Step 9 — Optimisation Sessions
Per tier (2 Starter, 4 Growth, Unlimited Enterprise) — review report relevance, add new KPIs, adjust schedule, add new data sources

---

## 7. QUALITY THRESHOLDS

| Metric | Standard |
|---|---|
| Report Accuracy | 100% — no mathematical errors in any delivered report |
| Delivery Reliability | ≥ 99.5% — scheduled reports delivered on time |
| Data Freshness | Reports must reflect data no older than agreed cadence |
| Error Rate | Zero tolerance for reports with missing sections or broken formatting |
| Client Delivery SLA | Reports delivered per agreed schedule; any delay communicated within 2 hours |

---

## 8. RELATED DOCUMENTS

| Document | Title |
|---|---|
| SOP-DA-000 | General AI Data Standard (Sales & Delivery) |
| SOP-AD-002 | AI Reporting (Operational Deep Dive) |
| DPA-001 | Data Processing Agreement |
| AICM-001 | Universal AI Compliance Mandate |

---

## 9. VERSION HISTORY

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-15 | Initial release — product scope from live site, pricing (Starter $1,250/$599mo + add-ons), TT + GDPR + ISO 42001 + IFRS disclaimer rule, delivery process, quality thresholds |
