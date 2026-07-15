# STANDARD OPERATING PROCEDURE
## SOP-WD-001 | Website Development Services

---

| Field | Detail |
|---|---|
| **Document ID** | SOP-WD-001 |
| **Title** | Website Development Services |
| **Department** | Digital Services — Prisca Dezigns |
| **Version** | 1.0 |
| **Effective Date** | 2026-07-15 |
| **Review Date** | 2027-01-15 |
| **Owner** | Lead Strategist — Prisca Dezigns |
| **Classification** | Internal — Controlled Document |
| **Status** | Active |

---

## 1. PURPOSE

This Standard Operating Procedure (SOP) defines the mandatory process, quality controls, legal obligations, and delivery standards governing all website development services rendered by Prisca Dezigns. It ensures consistent, legally compliant, and high-fidelity output across every client engagement regardless of project scope or tier.

---

## 2. SCOPE

This SOP applies to:

- All website design and development projects delivered by Prisca Dezigns
- All personnel, agents, and AI systems (including Drew, Sierra) involved in client-facing or development-facing activities
- All subcontractors or third-party tools used in delivery
- All project tiers: Starter, Growth, E-Commerce, and Enterprise

---

## 3. LEGAL & REGULATORY FRAMEWORK

All website development services must comply with the following legal and standards framework:

### 3.1 Trinidad and Tobago Legislation
| Law | Obligation |
|---|---|
| **Data Protection Act, 2011 (TT)** | Client and end-user data collected during development (forms, analytics, CRM) must be handled with consent, stored securely, and not retained beyond its necessary period. Violations carry fines up to TTD 100,000 and/or imprisonment up to 5 years. |
| **Electronic Transactions Act, Chap. 22:04** | All digital contracts, e-signatures, and online agreements executed with clients are legally binding and must be documented. |
| **Miscellaneous Provisions (Companies) Act** | Prisca Dezigns must operate and represent itself truthfully in all client agreements and invoices. |

### 3.2 International Standards
| Standard | Application |
|---|---|
| **ISO 9001:2015 — Clause 8.3** | Design and development planning, inputs, controls, outputs, and changes must be formally documented for every project. |
| **ISO/IEC 27001:2022** | Information security controls must be applied to all client data, credentials, source code, and assets handled during development. |
| **GDPR (EU) 2016/679** | Applies to any website built for clients with EU-based users or data subjects. Prisca Dezigns acts as a Data Processor; the client acts as Data Controller. A Data Processing Agreement (DPA) must be executed. |
| **WCAG 2.1 (Level AA)** | All websites delivered must meet Web Content Accessibility Guidelines at Level AA minimum, ensuring accessibility for users with disabilities. |
| **OWASP Top 10** | All web applications must be assessed against the OWASP Top 10 vulnerability framework before delivery. |

---

## 4. DEFINITIONS

| Term | Definition |
|---|---|
| **Client** | The individual or business entity that has contracted Prisca Dezigns for website development services |
| **Lead Strategist** | The principal decision-maker and quality authority at Prisca Dezigns |
| **Drew** | The AI Technical Lead responsible for client qualification and service explanation |
| **Sierra** | The AI Customer Operations Rep responsible for lead capture, inquiry handling, and database logging |
| **Deliverable** | Any website, page, component, or asset produced for the client |
| **UAT** | User Acceptance Testing — client-side sign-off on the delivered product |
| **DPA** | Data Processing Agreement — required where client sites collect personal data |
| **Version Control** | The practice of tracking all changes to code and content using GitHub |

---

## 5. ROLES AND RESPONSIBILITIES

| Role | Responsibility |
|---|---|
| **Lead Strategist** | Final approval authority on all deliverables; signs off on scope, quality, and legal documentation |
| **Drew (AI — Technical Lead)** | Client qualification, service scoping, pricing communication, and handoff to development |
| **Sierra (AI — Operations)** | Lead logging, inquiry routing, follow-up scheduling, and Supabase data entry |
| **Developer / AI Agent** | Execution of all design, development, and deployment tasks per this SOP |
| **Client** | Provides timely content, feedback, and sign-off at each milestone; acts as Data Controller for their site |

---

## 6. PROCESS — STEP BY STEP

### Phase 1: Intake & Qualification

**Step 1.1 — Lead Capture**
- Sierra logs all incoming leads to `client_leads` table in Supabase (Prisca Dezigns project) within 5 minutes of inquiry
- Required fields: Name, Email, Phone, Package Interest, Brand, Timestamp
- Status set to `New` on creation

**Step 1.2 — Client Qualification (Drew)**
- Drew conducts qualification via WhatsApp or web chat
- Qualification criteria: budget range, timeline, business type, domain ownership, existing assets
- Unqualified leads are logged with status `Unqualified` and reason noted
- Qualified leads are flagged status `Qualified` and escalated to Lead Strategist

**Step 1.3 — Scope Agreement**
- Lead Strategist confirms scope in writing (email or WhatsApp message)
- Written scope must include: deliverables, timeline, revision rounds, payment terms
- No development begins without written scope confirmation from the client

**Step 1.4 — Contract Execution**
- A Service Agreement is issued to the client before any work begins
- Agreement must include:
  - Scope of work
  - Payment schedule
  - Intellectual property clause (IP transfers to client upon final payment)
  - Confidentiality clause
  - Data handling obligations (if site collects personal data, attach DPA)
  - Revision policy
  - Termination clause
- Client must provide written acceptance (email confirmation or e-signature)
- *Legal basis: Electronic Transactions Act, Chap. 22:04 (TT)*

---

### Phase 2: Planning & Design (ISO 9001:2015 — Clause 8.3.2 & 8.3.3)

**Step 2.1 — Design Inputs**
Document the following before any design begins:
- [ ] Brand assets received (logo, colors, fonts)
- [ ] Reference sites or design direction confirmed
- [ ] Target audience defined
- [ ] Pages and content structure agreed
- [ ] Domain and hosting details confirmed

**Step 2.2 — Design Development**
- Wireframes or mockups produced and shared with client for approval
- Client must sign off on design direction before full development begins
- All design files version-tagged (e.g., `v1.0`, `v1.1`)
- Design assets stored in GitHub repository under client folder

**Step 2.3 — Design Review (Internal QA)**
- Lead Strategist reviews against:
  - Brand consistency
  - Mobile responsiveness
  - WCAG 2.1 AA compliance check
  - Load performance baseline (target: <3s load time)

---

### Phase 3: Development

**Step 3.1 — Environment Setup**
- New GitHub repository created per client project (private by default)
- Repository naming convention: `client-[brandname]-website`
- Development branch: `dev` | Production branch: `main`
- No direct commits to `main` without review

**Step 3.2 — Development Standards**
All code must meet the following standards:
- [ ] Semantic HTML5
- [ ] CSS: mobile-first, responsive at 320px, 768px, 1024px, 1440px breakpoints
- [ ] No hardcoded client personal data in source code
- [ ] API keys and credentials stored as environment variables only — never in code
- [ ] All forms include CSRF protection and input sanitization
- [ ] HTTPS enforced (SSL certificate configured at deployment)
- [ ] Privacy Policy and Terms of Service pages included if site collects any user data

**Step 3.3 — Security Compliance (ISO 27001:2022 / OWASP)**
Before delivery, the following must be verified:
- [ ] No exposed API keys or credentials in public repository
- [ ] SQL injection protection (if database-connected)
- [ ] XSS (Cross-Site Scripting) protection
- [ ] Secure contact form handling
- [ ] SSL/TLS configured and active
- [ ] No sensitive data logged to browser console

**Step 3.4 — Version Control Protocol**
- Every meaningful change committed with a conventional commit message:
  - `feat:` new feature
  - `fix:` bug fix
  - `style:` design/UI change
  - `docs:` documentation update
  - `chore:` maintenance
- Commit message must describe what changed and why
- Version tag applied at each milestone (e.g., `v1.0.0-beta`, `v1.0.0`)

---

### Phase 4: Quality Assurance

**Step 4.1 — Internal QA Checklist**
Before client review, all of the following must pass:

**Functionality**
- [ ] All links working (no 404s)
- [ ] All forms submitting and confirming correctly
- [ ] Navigation functional on all devices
- [ ] CTA buttons linked correctly

**Design**
- [ ] Matches approved design direction
- [ ] No broken images or missing assets
- [ ] Typography consistent throughout
- [ ] Colors match brand guidelines

**Performance**
- [ ] Page load time <3 seconds (tested via Google PageSpeed)
- [ ] Images compressed and optimized
- [ ] No render-blocking resources

**Accessibility (WCAG 2.1 AA)**
- [ ] Alt text on all images
- [ ] Sufficient color contrast ratio (4.5:1 minimum)
- [ ] Keyboard navigable
- [ ] Form labels present

**Security**
- [ ] HTTPS active
- [ ] No exposed credentials
- [ ] Privacy Policy present (if applicable)

**Step 4.2 — Client UAT (User Acceptance Testing)**
- Client is given a staging URL for review (minimum 5 business days)
- Feedback collected in writing (WhatsApp or email)
- Maximum revision rounds per tier:
  - Starter: 2 rounds
  - Growth: 3 rounds
  - E-Commerce: 4 rounds
  - Enterprise: As per project agreement
- Out-of-scope changes quoted separately

---

### Phase 5: Delivery & Deployment

**Step 5.1 — Pre-Deployment Sign-Off**
Client must provide written approval of the final build before go-live. This constitutes formal UAT sign-off. No deployment proceeds without it.

**Step 5.2 — Deployment**
- Production deployment to agreed hosting platform (GitHub Pages, Vercel, custom host)
- Domain configured and DNS propagation confirmed
- SSL certificate active and verified
- Post-deployment smoke test: all pages load, all forms work, no console errors

**Step 5.3 — Handoff Documentation**
Delivered to client at project close:
- [ ] Login credentials for hosting/domain (via secure channel only)
- [ ] GitHub repository access (if applicable)
- [ ] Brief user guide (how to request updates, who to contact)
- [ ] Invoice marked as completed
- [ ] `client_leads` status updated to `Delivered` in Supabase

---

### Phase 6: Post-Delivery

**Step 6.1 — 30-Day Support Window**
- All tiers receive 30 days of post-launch support for bug fixes
- Bug = something broken in the original scope
- New features = new quote

**Step 6.2 — Client Satisfaction Review**
- At day 7 post-launch: Sierra sends a check-in message via WhatsApp
- At day 30: Lead Strategist conducts a quality review internally
- Outcome logged in `service_audits` table

**Step 6.3 — Retention & Data Disposal**
- Client project files retained in GitHub for 12 months post-delivery
- After 12 months: client notified and offered archive transfer before deletion
- *Legal basis: TT Data Protection Act 2011 — data not kept longer than necessary*
- Client personal data collected during development purged from internal systems after project close unless client is on a retainer

---

## 7. CHANGE MANAGEMENT

Any change to this SOP must follow this protocol:

1. Change identified and documented by Lead Strategist
2. Reason for change recorded in the Version History (Section 10)
3. Updated SOP reviewed internally before activation
4. Version number incremented (major change: X.0 | minor change: X.X)
5. Effective date updated
6. All active project teams notified of the change

**No verbal changes to this SOP are valid. All amendments must be documented.**

---

## 8. NON-CONFORMANCE

If any step in this SOP is not followed, the following applies:

| Severity | Example | Action |
|---|---|---|
| **Minor** | Commit message missing label | Log in project notes, correct going forward |
| **Moderate** | QA checklist skipped | Halt delivery, complete QA before proceeding |
| **Critical** | Client data exposed or contract not executed | Immediate escalation to Lead Strategist, incident report filed, client notified within 72 hours |

*Critical non-conformances involving personal data breaches must be reported per TT Data Protection Act 2011 and, where EU data subjects are involved, per GDPR Article 33 (72-hour notification requirement).*

---

## 9. RELATED DOCUMENTS

| Document | ID |
|---|---|
| Service Agreement Template | CONTRACT-WD-001 |
| Data Processing Agreement Template | DPA-001 |
| QA Checklist | QA-WD-001 |
| Privacy Policy Template | LEGAL-PP-001 |
| SOP — WhatsApp AI Automation | SOP-AI-002 |
| SOP — Email Automation | SOP-AI-003 |
| SOP — Enterprise AI Tier | SOP-AI-004 |

---

## 10. VERSION HISTORY

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-07-15 | Lead Strategist — Prisca Dezigns | Initial release |

---

*This document is the property of Prisca Dezigns. Unauthorized distribution outside the organization is prohibited. All rights reserved.*

*Prisca Dezigns | priscadezigns.org | hello@priscadezigns.org*
