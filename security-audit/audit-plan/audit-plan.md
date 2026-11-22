# Audit plan

| Field | Detail |
| --- | --- |
| Audit title | Security Audit of a Self-Hosted Web Application — Happy Town |
| Course | IT Audit, Compliance and Risk Management, Óbuda University |
| Version and date | 1.7, 19 November 2026 |
| Status | Revised after the professor’s feedback. Original Phase 3 authorization, fieldwork and evidence are retained. |
| Audit type | Academic application security investigation against a defined technical baseline |
| Audit requester and report recipients | The Project Owner requests the audit for the course. Intended recipients are the Project Owner and the lecturer or designated assessors. |

## Purpose, subject and criteria

Determine, on the basis of reproducible evidence, whether selected security controls are documented where the criteria require it, are implemented as intended and operate in a sampled self-hosted deployment. Prioritize the protection of student information, account credentials and sessions, and the integrity of school records. Identify any demonstrated deviations and propose proportionate corrective actions.

The subject is the Happy Town application at commit `f23375fee54bae8942a1c23a702adb04ed6c99a2` in the audit lab. Happy Town manages English-school users, groups and learning records. It provides separate ADMIN, TEACHER and PARENT portals, authenticated sessions and persistent PostgreSQL data. Its three roles and record relationships let a small team examine both role permissions and record-specific access. See the [application overview](../methodology/application-overview.md).

The basis of examination is OWASP ASVS 5.0.0. The audit uses 17 selected Level 1 requirements for encoding and sanitization, validation and business logic, web frontend security, authentication, session management, authorization and data protection. Phase 2 reviewed applicability against the sampled functionality. Apply any scope or applicability change through the audit plan before fieldwork. Conclusions apply to the selected requirements, sample and environment. [OWASP release source](https://github.com/OWASP/ASVS/tree/v5.0.0) · [Verification matrix](../asvs/verification-matrix.csv) · [Test plan](../methodology/test-plan.md)

## Scope and exclusions

In scope are the local Next.js application and the PostgreSQL interactions needed to assess the selected controls. Fieldwork is limited to the sign-in and sign-out flows, the three portal entry points, representative admin management and student/group record routes, and the source, configuration and audit-event samples that support those workflows. See the [scope record](../methodology/audit-scope.md) for the route sample and boundary conditions.

Excluded are production and cloud deployments, public infrastructure, third-party systems, actual school data, other portal features beyond the selected sample, legacy Worker/D1 paths, host/network and Docker engine hardening, operational resilience, legal compliance and production TLS. Local HTTP limits conclusions about production cookies, HSTS and transport security.

## Participants, independence and ethics

| Role | Responsibility | Appointment |
| --- | --- | --- |
| Project Owner, Happy Town Co-Developer, Authorizing Party and auditee | Project Owner, operator of the local lab and authorizing party for the scoped fieldwork. | Bakdaulet Bokenbayev |
| Student Auditor and Lead Auditor | Member of the Audit Team and Happy Town Co-Developer. | Bakdaulet Bokenbayev |
| Student Auditor | Member of the Audit Team and Happy Town Co-Developer. | Assel Karzhau |
| Independent reviewer | May review the evidence and conclusions if appointed. | No independent reviewer identified. |

Both auditors co-developed the Audit Subject. Reviewing work they helped develop creates a self-review threat and limits independence. The Audit Team reports findings as an academic self-assessment. Independent external assurance and certification fall outside the Audit Scope. Fieldwork evidence is attributed at case level. [Reassessment record](../evidence/reassessment/2026-11-19-documentation-review.md)

Apply due professional care, work within the team's competence, protect confidential material and disclose relevant facts to authorized recipients. Raise unexpected sensitive information or suspected incidents with the auditee and course lead through an authorized channel. Maintain a record of escalation and preserve evidence appropriately.

## Audit preparation and notification

The Project Owner's written instruction in this conversation authorizes the Phase 3 fieldwork defined below. The Project Owner also controls scope changes and evidence access. Record the actual fieldwork interval in the execution log. A course assessor receives the academic deliverable in their assessment role.

Collect the source revision, lockfile, component and role inventory, relevant policies or their absence, configuration, synthetic account and record inventory, and the [Phase 1 observations](../evidence/phase-1-environment.md). Request a walkthrough of sign-in, session handling, role provisioning and assignment. Log missing or restricted material and its effect on the audit. The [test plan](../methodology/test-plan.md) defines candidate fixtures. The auditee must confirm the actual fixture labels and expectations before fieldwork.

### Authorization checklist

Bakdaulet Bokenbayev’s written instruction on 19 November 2026 authorized the Phase 3 run against the local target `http://127.0.0.1:3300`. He is the Project Owner and authorizing party. The Audit Team subsequently clarified that both students co-developed Happy Town. The original scope and authority remain recorded.

| Item | Status | Authorized scope or record |
| --- | --- | --- |
| Ownership and authority | Confirmed by Project Owner | Bakdaulet owns Happy Town and operates the local lab. Bakdaulet and Assel co-developed the application. |
| Source and database inspection | Authorized | Inspect the owner's source and local security-related database configuration. Limit data inspection to the synthetic lab and capture only the minimum necessary metadata. |
| Controlled application testing | Authorized | Sole target `http://127.0.0.1:3300`. Use the scoped Phase 2 cases and controlled, non-destructive methods. Verify the running revision, Compose project and database at kickoff. |
| Synthetic accounts and records | Authorized | Use synthetic ADMIN, TEACHER and PARENT accounts, including two synthetic parents for HT-15. Confirm fixture provenance and relationships before using them. |
| Synthetic fixture provisioning and cleanup | Authorized | Create or clean up only audit fixtures when needed. Preserve existing records and avoid destructive database operations. |
| Evidence collection | Authorized | Capture sanitized screenshots, logs, HTTP requests and responses for the academic report. Store the minimum necessary redacted evidence in the audit folder and limit access to the owner and intended academic recipients. |
| Stop and escalation | Confirmed | Pause on unexpected exposure, real data, an out-of-scope host or risk of unintended changes. Report to the Project Owner. |
| Course submission deadline | Pending | Confirm the current cohort's actual submission date and channel. |
| Course presentation deadline | Pending | Confirm the current cohort's presentation slot and applicable instructions. |
| Risk rating bands | Defined for Phase 4 | Apply the qualitative impact × likelihood matrix documented in the risk assessment. |

The Project Owner's approval satisfies the fieldwork authorization gate. Course deadlines remain scheduling inputs. [Phase 4 rating method](../findings/risk-assessment.md#qualitative-risk-method)

## Methodology and evidence

Follow the course sequence of planning, evidence collection, investigation, report creation and follow-up. For each selected requirement, record the control's purpose, underlying risk, prerequisites, responsible role, expected behavior and exceptions. Evaluate design and sampled operation. Record frequency or operating-period coverage where relevant.

1. **Inspect** documentation, committed source, versioned configuration and relevant logs. Record the commit and precise references.
2. **Observe and inquire.** Walk through the selected workflows with the auditee. Record the date, participant role and material explanations, then corroborate important statements with code, records or observations.
3. **Reperform** agreed local checks using synthetic identities and representative legitimate operations. Capture the expected and observed behavior. Compare role and record-permission observations with the approved access rules. Use focused review of server-side control paths and recorded test evidence for security properties. A smoke check or a single successful response is insufficient to establish effectiveness.
4. **Reconcile and check completeness.** Trace each selected requirement to applicability, procedures, observations, evidence and conclusion. Record conflicting evidence and resolve it where possible. Record the remaining gaps and their effect on assurance. Have a second person review high-impact judgments where possible.

Use stable evidence identifiers such as `E-001` and record the requirement and test IDs, date/time zone, operator, subject revision, environment, account role, procedure, expected and observed outcome, artifact path and reviewer. Capture relevant source excerpts, redacted HTTP metadata, screenshots, sanitized application logs and read-only database counts where appropriate. Preserve originals only where they can be stored securely with restricted access. Use hashes for retained exports when provenance matters. Remove credentials, session cookies, secrets and personal data from submitted copies. Agree retention and disposal with the auditee.

Use the matrix status terms **Not Tested**, **Pass**, **Fail**, **Not Applicable** and **Inconclusive**. Cite Audit Evidence for each outcome. When a criterion requires documentation, a substantiated omission in the reviewed application documentation is a finding. Evidence that cannot establish implementation conformity or deviation leaves that implementation case Inconclusive. Preserve the original fieldwork decisions and record later changes separately. [Working-paper and decision guidance](../methodology/test-plan.md#working-papers-and-decisions) · [Reassessment record](../evidence/reassessment/2026-11-19-documentation-review.md)

## Risk assessment and reporting

Link each substantiated deficiency to the affected asset, threat scenario, observed control gap and consequence for confidentiality, integrity or availability. Record risk ID, requirement ID, evidence, impact, likelihood, rating, recommended action, responsible owner, target date when assigned and any residual risk after verification. Phase 4 applies the course impact × likelihood model with Low, Medium and High on each axis. The risk assessment defines the boundaries and combined ratings. The Project Owner owns treatment and any risk acceptance. [Phase 4 rating method](../findings/risk-assessment.md#qualitative-risk-method)

The interim report presents emerging observations, evidence gaps and a deadline for factual comments. The final investigation report summarizes the work and analyses, identifies auditor experience and independence limitations, describes the demonstrated deficiencies, assigns risks, recommends actions and sets the limits on use of the report. Append or reference evidence, the auditee response or representation, and the action plan. Follow-up checks the effectiveness of implemented actions within a narrow, authorized scope. Document any actions still awaiting verification.

## Authorization and limitations

Limit interactions to the owner's local development instance and dedicated audit datastore. Use synthetic data only. Production, real user data, third-party infrastructure, and destructive database operations are excluded. Pause if the target resolves outside loopback, the database identity differs, real records appear or a procedure risks unintended impact.

The assessment is a point-in-time sample on one development-mode installation. Results depend on the selected roles, records, revision and environment. The standard seed provides one working login for each role. Confirm assigned and unassigned fixtures at kickoff and provision additional synthetic identities only when needed. Local HTTP and development diagnostics limit transferability to a production build. Co-developer self-review and unavailable artifacts limit assurance.

## Schedule and expected deliverables

| Phase | Recorded timing | Activities and outputs |
| --- | --- | --- |
| 1. Preparation | 19 November 2026, final smoke checks about 11:07 CET | Prepared the local lab, recorded setup evidence and defined the scope. |
| 2. Criteria and test design | Before fieldwork | Mapped 17 selected criteria to cases, fixtures and evidence requirements. |
| 3. Evidence collection and investigation | 19 November 2026, about 11:39–11:47 CET | Inspected source and documentation, observed the sampled controls and retained 17 Working Papers and the original execution record. |
| 4. Evidence validation and Risk Assessment | After Phase 3 | Reconciled the evidence and rated the two original technical findings. |
| 5–6. Reporting and defense preparation | After Phase 4 | Prepared the academic report, corrective action plan and defense materials. |
| Documentation reassessment and report revision | 19 November 2026, after fieldwork | Reviewed the available application documentation against ASVS. Recorded two revised case outcomes and updated the final artifacts. |
| Defense and follow-up | Course presentation slot pending | Present for 10–15 minutes followed by discussion. Verify corrective actions when authorized and available. |

The supplied 2024/25 course requirements show documentation in course week 12 and presentations in weeks 12–14, with a week 15 retake. These are reference milestones. The current cohort submission deadline, submission channel and presentation slot remain pending.

## Course materials and application to this plan

The workspace had no `reference-materials/` directory. The review used the ten named lecture decks and the named supplementary VEX PDF supplied from Downloads. References below use slide positions in the files. The lecturer's presentations supply the academic workflow and terminology. Examples of legal, certification and organization-wide engagements provide context. OWASP ASVS 5.0.0 supplies this project's technical criteria.

| Supplied material | Application in this project |
| --- | --- |
| `00 - IT Audit - requirements (1).pptx`, slides 3, 8–16 | Submission, presentation and discussion milestones, with current cohort dates pending confirmation. |
| `01 - IT Audit bevezetes-2 (3).pptx`, slides 4 and 7–13 | Audit as verification, roles, planning through reporting, evidence and restrictions on self-review. |
| `02 - IT Audit types (3).pptx`, slides 7–17 | Define a bounded subject and independent criteria. Classify the work as an academic investigation. |
| `03 - IT Audit documentation (1).pptx`, slides 3–10, 12–20 and 22–23 | Five-step workflow, plan and notification fields, information access, investigation methods, completeness, reporting, representation, follow-up and lead auditor responsibilities. |
| `04 - IT Audit auditor.pptx`, slides 7, 10–17 and 19–21 | Separation of duties and four-eyes review, due care, fairness, confidentiality, competence, disclosure and conflict handling. |
| `06 - standards.pptx`, slides 5–7, 15–16 and 21–26 | Identify the applicable measurement baseline, document the authority for the work and consider evidence of role assignment and review. |
| `07 - Strategy and risk (1).pptx`, slides 9–19 | Relate threats, weaknesses and affected assets to impact, likelihood, mitigation and residual risk. |
| `08 - CSF.pptx`, slides 5–13 | Use asset and risk identification, identity/access and evidence concepts to prioritize the sample. |
| `09 - Control.pptx`, slides 3–8 and 10–20 | Tie controls to purpose and risk. Examine description, implementation, measurement, deviations and period coverage where applicable. |
| `11 - IT operation audit.pptx`, slides 4–9 and 12–18 | Record configuration items, ownership, version and change traceability for the lab. Treat continuity and production operations as scope exclusions. |
| `VEX_Status_Justification_Jun22.pdf`, sections 1–3 | Supplemental context. Any future dependency status assertion would need evidence about the specific product and component. VEX and dependency advisory triage are outside this baseline. |
