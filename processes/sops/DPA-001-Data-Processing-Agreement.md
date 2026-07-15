# DATA PROCESSING AGREEMENT
## DPA-001 | Client Data Processing Agreement

---

| Field | Detail |
|---|---|
| **Document ID** | DPA-001 |
| **Title** | Data Processing Agreement |
| **Department** | Legal & Compliance — Prisca Dezigns |
| **Version** | 1.0 |
| **Effective Date** | 2026-07-15 |
| **Review Date** | 2027-01-15 |
| **Owner** | Lead Strategist — Prisca Dezigns |
| **Classification** | Client-Facing — Controlled Document |
| **Status** | Active |

---

## PARTIES

This Data Processing Agreement ("Agreement") is entered into between:

**Data Controller (the Client):**
- Legal Business Name: ___________________________________
- Trading Name (if different): ___________________________
- Registered Address: ____________________________________
- Country of Incorporation: ______________________________
- Contact Email: _________________________________________
- Authorized Representative: _____________________________

AND

**Data Processor:**
- **Prisca Dezigns**
- Operating under: Prisca Dezigns Agency
- Website: priscadezigns.org
- Contact Email: hello@priscadezigns.org
- Country of Operations: Republic of Trinidad and Tobago

Together referred to as "the Parties."

---

## RECITALS

**WHEREAS** the Client wishes to engage Prisca Dezigns to provide AI automation services including but not limited to WhatsApp AI, Email AI, and Website Chat AI ("the Services");

**WHEREAS** the provision of these Services requires Prisca Dezigns to process personal data on behalf of the Client;

**WHEREAS** both Parties are committed to compliance with applicable data protection laws including the **Trinidad and Tobago Data Protection Act, 2011 (DPA 2011)**, the **EU General Data Protection Regulation (GDPR) 2016/679** where applicable, and all relevant international data protection standards;

**NOW THEREFORE**, in consideration of the mutual obligations set out herein, the Parties agree as follows:

---

## PART 1 — DEFINITIONS

1. **"Personal Data"** means any information relating to an identified or identifiable natural person (data subject), including name, email address, phone number, IP address, or any combination thereof.

2. **"Processing"** means any operation performed on Personal Data including collection, storage, retrieval, use, disclosure, or deletion.

3. **"Data Controller"** means the Client, who determines the purposes and means of processing Personal Data.

4. **"Data Processor"** means Prisca Dezigns, who processes Personal Data on behalf of and under the instructions of the Data Controller.

5. **"Sub-Processor"** means any third party engaged by Prisca Dezigns to process Personal Data in connection with the Services.

6. **"Data Subject"** means the individual to whom the Personal Data relates (e.g. the Client's customers).

7. **"Security Incident"** means any confirmed or reasonably suspected breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, Personal Data.

---

## PART 2 — SCOPE OF PROCESSING

### 2.1 Nature and Purpose
Prisca Dezigns shall process Personal Data solely for the purpose of providing the agreed AI automation services as defined in the active Service Agreement between the Parties.

### 2.2 Categories of Data Subjects
The Personal Data processed may relate to:
- The Client's customers
- The Client's leads and prospects
- The Client's employees (where applicable)

### 2.3 Categories of Personal Data
The following categories of Personal Data may be processed:

| Category | Examples | Sensitivity |
|---|---|---|
| Contact information | Name, email, phone number | Standard |
| Communication content | Message text, email body | Standard |
| Behavioural data | Response patterns, engagement timestamps | Standard |
| Business data | Order details, service inquiries | Standard |

**Prohibited Data:** Prisca Dezigns will NOT process the following without an explicit written amendment to this Agreement and appropriate additional safeguards:
- Health or medical data
- Financial account details or payment card data
- Government-issued ID numbers
- Biometric data
- Data relating to minors (under 18)

### 2.4 Duration
Processing shall commence on the Effective Date of the Service Agreement and shall continue for the duration of that Agreement. Upon termination, data shall be handled per Section 8 of this Agreement.

---

## PART 3 — OBLIGATIONS OF PRISCA DEZIGNS (DATA PROCESSOR)

### 3.1 Instructions
Prisca Dezigns shall:
- Process Personal Data only on documented instructions from the Client
- Immediately inform the Client if any instruction is believed to violate applicable data protection law
- Not process Personal Data for any purpose other than the Services without prior written consent

### 3.2 Confidentiality
Prisca Dezigns shall ensure that:
- All personnel authorized to process Personal Data are bound by confidentiality obligations
- Access to Personal Data is restricted to personnel who need it to perform the Services
- Confidentiality obligations survive termination of this Agreement

### 3.3 Security
Prisca Dezigns shall implement and maintain appropriate technical and organisational measures to protect Personal Data, including:

**Technical Measures:**
- Encryption of data at rest and in transit (TLS 1.2 minimum)
- Access control — role-based access to all systems
- Database Row Level Security (RLS) enforced on all data tables
- API keys and credentials stored in encrypted vault only
- Automatic session timeout and multi-factor authentication where available

**Organisational Measures:**
- Strict separation of client data — no co-mingling between clients
- Change management protocol before any modification to live systems
- Staff training on data protection obligations
- Documented incident response procedure

### 3.4 Sub-Processors
Prisca Dezigns currently engages the following Sub-Processors in the delivery of Services:

| Sub-Processor | Country | Purpose | Safeguard |
|---|---|---|---|
| Anthropic (Claude API) | USA | AI language processing | Privacy policy + DPA |
| Google (Gemini API) | USA | AI language processing | Google Cloud DPA |
| Make.com | Czech Republic / USA | Automation pipeline | GDPR compliant, SOC 2 |
| n8n (self-hosted) | Client/Prisca Dezigns servers | Automation pipeline | Data stays on own server |
| 360dialog | Germany | WhatsApp API delivery | GDPR compliant, Meta Business |
| Supabase | USA | Database storage | SOC 2 Type II, GDPR |
| GitHub | USA | Source code management | SOC 2 Type II |

Prisca Dezigns shall:
- Notify the Client of any intended changes to Sub-Processors at least **14 days** in advance
- Ensure all Sub-Processors are bound by data protection obligations equivalent to this Agreement
- Remain fully liable to the Client for the acts and omissions of Sub-Processors

### 3.5 Data Subject Rights Assistance
Prisca Dezigns shall assist the Client in responding to Data Subject rights requests including:
- Right of access
- Right to rectification
- Right to erasure (right to be forgotten)
- Right to restriction of processing
- Right to data portability
- Right to object

All such requests received by Prisca Dezigns shall be forwarded to the Client within **48 hours** of receipt. Prisca Dezigns shall not respond directly to Data Subjects on the Client's behalf without prior written authorisation.

### 3.6 Compliance Assistance
Prisca Dezigns shall provide reasonable assistance to the Client in ensuring compliance with:
- Data protection impact assessments (DPIAs)
- Security obligations
- Breach notification requirements

---

## PART 4 — OBLIGATIONS OF THE CLIENT (DATA CONTROLLER)

### 4.1 Lawful Basis
The Client warrants that:
- It has a valid lawful basis for collecting and processing Personal Data before passing it to Prisca Dezigns
- It has obtained all necessary consents from Data Subjects where required
- Its privacy policy accurately discloses the use of AI automation services

### 4.2 Accuracy
The Client is responsible for the accuracy of Personal Data provided to Prisca Dezigns.

### 4.3 Instructions
The Client shall provide clear, lawful, and documented processing instructions. The Client shall not instruct Prisca Dezigns to process data in a manner that violates applicable law.

### 4.4 Notification of Changes
The Client shall promptly notify Prisca Dezigns of any changes that may affect data processing, including:
- Changes to the nature of the data being collected
- Changes in applicable law
- Changes to the Client's privacy policy

---

## PART 5 — SECURITY INCIDENTS AND BREACH NOTIFICATION

### 5.1 Incident Detection
Prisca Dezigns shall maintain monitoring procedures to detect Security Incidents affecting Personal Data.

### 5.2 Notification to Client
Upon becoming aware of a confirmed Security Incident, Prisca Dezigns shall:
- Notify the Client **without undue delay** and in any event **within 48 hours** of becoming aware
- Provide in the notification:
  - Nature of the incident
  - Categories and approximate number of Data Subjects affected
  - Categories and approximate volume of Personal Data affected
  - Likely consequences
  - Measures taken or proposed to address the incident

### 5.3 Client's Notification Obligations
- **TT DPA 2011:** The Client (as Controller) must notify affected individuals and the Information Commissioner within a reasonable timeframe
- **GDPR:** Where applicable, the Client must notify the competent supervisory authority within **72 hours** and notify Data Subjects where there is high risk to their rights and freedoms

### 5.4 Cooperation
Prisca Dezigns shall cooperate fully with the Client and any regulatory authority in investigating and remediating any Security Incident.

---

## PART 6 — INTERNATIONAL TRANSFERS

### 6.1 Transfers Outside Trinidad and Tobago
The Client acknowledges that the provision of Services may require Personal Data to be transferred to Sub-Processors located outside of Trinidad and Tobago (including USA, Germany, Czech Republic).

### 6.2 Safeguards
Prisca Dezigns shall ensure that any international transfer of Personal Data is subject to:
- Adequacy decisions where applicable
- Standard Contractual Clauses (SCCs) where GDPR applies
- Binding contractual obligations equivalent to those in this Agreement

---

## PART 7 — AUDITS AND RECORDS

### 7.1 Records of Processing
Prisca Dezigns shall maintain records of all processing activities carried out on behalf of the Client, including:
- Categories of processing performed
- Sub-Processors engaged
- Security measures in place

### 7.2 Audit Rights
The Client may request an audit of Prisca Dezigns' data processing activities no more than **once per calendar year**, with a minimum of **30 days written notice**. Audits shall be conducted at the Client's expense and shall not unreasonably disrupt Prisca Dezigns' operations.

### 7.3 Compliance Evidence
Prisca Dezigns shall make available to the Client all information necessary to demonstrate compliance with this Agreement.

---

## PART 8 — TERM AND TERMINATION

### 8.1 Duration
This Agreement shall remain in force for the duration of the Service Agreement between the Parties.

### 8.2 Data Handling Upon Termination
Upon termination or expiry of the Service Agreement, Prisca Dezigns shall, at the Client's written election:

**Option A — Return:** Return all Personal Data to the Client in a structured, commonly used, machine-readable format (e.g. CSV or JSON) within **30 days** of termination.

**Option B — Deletion:** Securely delete all Personal Data within **30 days** of termination and provide written confirmation of deletion.

Unless the Client provides written election within 14 days of termination, Prisca Dezigns shall default to **Option B — Deletion**.

Prisca Dezigns shall retain Personal Data beyond this period only where required by applicable law, and shall inform the Client of such retention.

---

## PART 9 — LIABILITY AND INDEMNIFICATION

### 9.1 Processor Liability
Prisca Dezigns shall be liable for damage caused by processing only where:
- It has not complied with obligations specifically directed to Data Processors under applicable law
- It has acted outside or contrary to the Client's lawful instructions

### 9.2 Controller Liability
The Client shall be liable for damage caused by processing that infringes applicable data protection law where the Client, as Controller, is responsible.

### 9.3 Indemnification
Each Party shall indemnify and hold harmless the other Party from claims, damages, and costs arising from that Party's breach of this Agreement or applicable data protection law.

---

## PART 10 — GOVERNING LAW

This Agreement shall be governed by and construed in accordance with the laws of the **Republic of Trinidad and Tobago**. Any disputes shall be subject to the exclusive jurisdiction of the courts of Trinidad and Tobago, except where GDPR applies, in which case EU law shall govern those specific provisions.

---

## PART 11 — SIGNATURES

By signing below, both Parties confirm they have read, understood, and agree to be bound by the terms of this Data Processing Agreement.

**For and on behalf of the Client (Data Controller):**

Name: ___________________________________

Title: ___________________________________

Signature: ______________________________

Date: ___________________________________

---

**For and on behalf of Prisca Dezigns (Data Processor):**

Name: Priscilla Narine

Title: Lead Strategist — Prisca Dezigns

Signature: ______________________________

Date: ___________________________________

---

## VERSION HISTORY

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-07-15 | Lead Strategist — Prisca Dezigns | Initial release |

---

*This document is the property of Prisca Dezigns. Prisca Dezigns | priscadezigns.org | hello@priscadezigns.org*
