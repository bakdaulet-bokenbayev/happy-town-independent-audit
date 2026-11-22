# Phase 3 — Interim audit reassessment for approval

**Subject:** Happy Town learning centre management platform  
**Audit basis:** OWASP ASVS 5.0.0 Level 1, 17 selected requirements  
**Revision:** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Interim review:** 20 November 2026, Europe/Budapest  
**Disposition:** Phase 4 awaits explicit approval. The material below proposes the submission changes.

## Scope and documentation assessment

The original fieldwork used port 3300. This supplementary technical pass used the exact audited revision on port 3302 and the isolated `happy_town_audit_test` database. The auditee's production environment was outside the scope. Bakdaulet Bokenbayev and Assel Karzhau co-developed Happy Town. The lecturer accepted the academic self-review arrangement, which limits auditor independence.

The [Phase 1 documentation inventory](documentation-inventory.md) covers the 187 tracked paths at the audited revision and the application-related audit materials supplied. The current README and localization notes are available. Audit working papers and technical artifacts describe architecture, deployment settings, control implementation and test behavior. No controlled auditee authentication or authorization policy was supplied. The inventory records the other missing or partial documents for architecture, data flow, secure configuration, session management, logging, recovery, incident response, privacy and maintenance. An off-repository document could change a conclusion if supplied and validated.

**Mandatory documentation deficiencies.** HT-05 requires the documentation to explain the credential-abuse control, its configuration and how malicious lockout is prevented. HT-13 requires function and data authorization rules based on permissions and resource attributes. The available summaries are incomplete in those specific ways. HT-F03 and HT-F04 already cover the omissions. The general operating gaps in the inventory have no separate missing mandatory document under this selected set. They remain improvement items unless the scope adds an applicable criterion.

**HT-07 and HT-11.** ASVS 6.3.1 requires verification of implementation against the application's security documentation. The missing comparator prevents an alignment conclusion. The text does not specifically require a separate formally approved configuration artifact, and the module test did not show nonconformity with a documented setting. The missing documentation is already HT-F03 under HT-05. ASVS 7.2.4 requires generation of a new session token and termination of the current session token at the applicable authentication transition. It does not expressly require a session policy or a global single-session rule. A separate context signing in without a current session does not prove what happens when an already authenticated context reauthenticates.

## Requirement-by-requirement review

The 17 versioned IDs, descriptions and Level 1 assignments were matched to the official English release. The original working papers supply case procedures and their actual fieldwork. The supplementary evidence adds targeted checks on the clone. Proposals below retain the existing outcomes only where the evidence supports that conclusion.

| Case and criterion | Control objective and expected result | Evidence and observed result | Proposed outcome |
| --- | --- | --- | --- |
| HT-01 · v5.0.0-1.2.4 | Database access on sampled paths uses a protected query mechanism. | The sign-in lookup and contact search pass values in structured Prisma arguments. The ordinary fixture requests succeeded. [HT-01](../../../phase-3/HT-01-evidence.md) | **Pass** |
| HT-02 · v5.0.0-2.2.1 | Inputs used for decisions conform to allowed shapes and values. | Missing login input produced no user session. Invalid entity kind and required-name omission returned 400. The scoped invalid create did not persist a record. [HT-02](../../../phase-3/HT-02-evidence.md) | **Pass** |
| HT-03 · v5.0.0-2.2.2 | Trusted server layers independently enforce validation. | Auth and service schemas ran before lookup or mutation. A server-side invalid create returned 400 and a targeted read found no resulting row. [HT-03](../../../phase-3/HT-03-evidence.md) | **Pass** |
| HT-04 · v5.0.0-3.5.3 | Sensitive operations use appropriate HTTP methods and safe requests preserve state. | Sign-in, sign-out and fixture creation used POST. The sampled GET and HEAD checks preserved the relevant session and record counts. [HT-04](../../../phase-3/HT-04-evidence.md) | **Pass** |
| HT-05 · v5.0.0-6.1.1 | Application documentation explains abuse defenses, settings and malicious-lockout prevention. | README outlines the limiter but omits its effective settings, resets and safeguards. No submitted policy supplies them. [HT-05](../../../phase-3/HT-05-evidence.md) · [Documentation reassessment](../../../reassessment/2026-11-19-documentation-review.md) | **Fail** · HT-F03 |
| HT-06 · v5.0.0-6.2.6 | Password inputs mask entries by default and after undoing an explicit reveal. | Browser inspection observed password, text, password and password after reload. The retained visual sequence uses a harmless display string. [HT-06](../../../phase-3/HT-06-evidence.md) · [Capture record](../capture-record.md) | **Pass** |
| HT-07 · v5.0.0-6.3.1 | Credential-abuse defenses operate according to application security documentation. | Isolated module testing confirmed five-failure threshold, key separation, ten-minute recovery and clearing state. The code calls the limiter. The supplied materials give no complete behavioral baseline, and this run did not exercise live abuse or multiple processes. [HT-07 original](../../../phase-3/HT-07-evidence.md) · [New configuration evidence](ht07-configuration.json) | **Inconclusive** |
| HT-08 · v5.0.0-6.3.2 | No enabled default identity uses shared default credentials. | Seed checks and role inventory tied usable credentials to operator-provided values, with no usable login for the other seeded records. The temporary PARENT-C fields were restored. [HT-08](../../../phase-3/HT-08-evidence.md) · [Integrity](phase-2-integrity.json) | **Pass** |
| HT-09 · v5.0.0-7.2.1 | Trusted backend verifies sessions before protected access. | Source shows Auth.js verification and an active-account lookup. Anonymous test requests received 401 and the allowed admin request returned 200. [HT-09](../../../phase-3/HT-09-evidence.md) | **Pass** |
| HT-10 · v5.0.0-7.2.2 | Authenticated sessions receive dynamically generated tokens. | Source uses dynamic JWT encoding. Earlier independent sign-ins produced different session values. The evidence retained the comparison result only. [HT-10](../../../phase-3/HT-10-evidence.md) | **Pass** |
| HT-11 · v5.0.0-7.2.4 | Authentication issues a new token and terminates the current token where a session replacement occurs. | Two independently authenticated contexts for the same TEACHER each retained 200 access. Fresh issuance is supported by the original test. No supported active-session replacement was demonstrated. [HT-11 original](../../../phase-3/HT-11-evidence.md) · [New browser observations](phase-2-browser.json) | **Inconclusive** |
| HT-12 · v5.0.0-7.4.1 | A terminated session is unusable after logout or expiration. | Audited code contains no per-session logout revocation. Prior ordinary logout and a same-context HTTP 200 with no user establish the signed-out browser state. The isolated expiry check used a dummy value. Old-session replay was not executed, so there is no runtime evidence of acceptance or rejection of that old session. [HT-12](../../../phase-3/HT-12-evidence.md) · [Ordinary logout](../network/clone-browser-observations.json) | **Fail** · HT-F01, implementation finding |
| HT-13 · v5.0.0-8.1.1 | Documentation defines access rules for functions and specific records. | README gives high-level rules. No approved material specifies the complete permission and resource-attribute decisions. Passed enforcement samples are separate. [HT-13](../../../phase-3/HT-13-evidence.md) · [Documentation reassessment](../../../reassessment/2026-11-19-documentation-review.md) | **Fail** · HT-F04 |
| HT-14 · v5.0.0-8.2.1 | Each sampled function is restricted to formally permitted roles. | Same teacher-directory GET. ADMIN returned 200 with items. TEACHER and PARENT each returned 403 without items. [HT-14 original](../../../phase-3/HT-14-evidence.md) · [New checks](phase-2-execution.md) | **Pass** |
| HT-15 · v5.0.0-8.2.2 | Specific records can be read only through the allowed relationships. | PARENT-A obtained STU-01 and PARENT-C obtained STU-02, both 200. Both reciprocal requests returned 404 without a student object. Read-only SQL confirmed relationships. [HT-15 original](../../../phase-3/HT-15-evidence.md) · [New checks](phase-2-execution.md) | **Pass** |
| HT-16 · v5.0.0-8.3.1 | Backend authorization enforces the rules independently of client controls. | Role and relationship checks run before sampled protected operations. The repeated role and relationship HTTP comparisons are consistent with that implementation. [HT-16](../../../phase-3/HT-16-evidence.md) · [New checks](phase-2-execution.md) | **Pass** |
| HT-17 · v5.0.0-14.2.1 | Request URLs exclude sensitive search fields. | Both browser executions observed the exact reserved-domain email in GET and HTTP 200 with the expected teacher. The new pass also found the synthetic email on a GET line in local Next.js diagnostics. The sampled tab's navigation history did not contain the search URL. No production log, proxy system, external analytics or disclosure was verified. [HT-17 original](../../../phase-3/HT-17-evidence.md) · [Exact prior URL](../final-validation/ht17-http-observation.json) · [New log evidence](ht17-local-log-review.json) | **Fail** · HT-F02 |

**Proposed totals:** **11 Pass, 4 Fail, 2 Inconclusive**, 17 cases. HT-12 retains an implementation-based Fail with an explicitly untested replay scenario. It does not receive a new runtime result.

## Findings and proposed risk ratings

| Finding | Root cause and evidence basis | Likelihood × impact | Proposed risk and corrective action |
| --- | --- | --- | --- |
| HT-F01 · HT-12 | JWT sign-out removes browser state. Audited backend verification has no session-specific logout revocation decision. Continued privileged access would be material if an earlier valid session remained available. | Low × High | **Medium, open.** Add durable server-side revocation and verify rejection at the server. Ordinary logout and replay acceptance are separate evidence questions. |
| HT-F02 · HT-17 | Free-text contact input is serialized in a GET query. The browser and local diagnostic output establish URL placement and local retention. Wider retention or disclosure remains unverified. | Medium × Low | **Low, open.** Use a validated request body and redact contact data from applicable request logging. The additional local log evidence stays within the sampled development context. |
| HT-F03 · HT-05 | The available documentation omits credential-abuse settings, recovery and malicious-lockout safeguards. The underlying reason this was not documented was unavailable. | Medium × Low | **Low, open.** Approve a versioned policy with settings, scope and recovery behavior, then use it to verify HT-07. |
| HT-F04 · HT-13 | Available documentation gives partial role descriptions and omits function permissions and record attributes. The underlying reason the rules were not documented was unavailable. | Low × Medium | **Low, open.** Maintain a controlled role and resource matrix and verify it against backend rules. |

No additional finding ID is proposed. Closing any finding requires implementation and acceptable evidence. Formal auditee response and remediation dates remain pending. [Current Findings Register](../../../../findings/findings-register.csv) · [Risk method](../../../../findings/risk-assessment.md) · [Corrective action plan](../../../../findings/remediation-plan.md)

## Evidence integrity and remaining limits

The [technical working paper](phase-2-execution.md) records four browser capture attempts and two new unique stored PNGs. The duplicate teacher state images and the byte-identical repeat HT-17 view refer to the corresponding preserved files. HTTP observations remain separate and timestamped. [SHA-256 manifest](SHA256SUMS.txt)

The original database and audited source were preserved. The test database retained five successful sign-in audit rows. Temporary login fields for PARENT-C returned to their starting state. No production systems or real personal data were used. No cookie values, passwords, JWTs or raw response bodies were saved. [Integrity record](phase-2-integrity.json)

The substantive open questions are documented protection alignment for HT-07, a supported active-session replacement transition for HT-11 and prior-token acceptance after logout for HT-12. The interim browser work did not copy or reuse an earlier session artifact. The risks and technical outcomes in this assessment apply to the sampled revision, configuration and fixtures.

## Proposed Phase 4 changes

1. Add a concise documentation-gap assessment to the canonical report, distinguish mandatory ASVS gaps from broader operating-readiness omissions, and cross-reference the full inventory. Keep the PDF within 20 A4 pages by replacing repetitive exhibits and citing raw evidence in the appendix.
2. Update the HT-07 and HT-11 limitations in the matrix. Keep all verdicts and case IDs. Update the HT-15 evidence from a one-sided supplementary check to the completed two-parent comparison.
3. Add the HT-17 local development-log observation and clarify risks in the findings and remediation material. Keep the four findings open and keep the current ratings.
4. Update the evidence register and the existing 13 slides, speaker notes and defense questions. Show one representative image per claim and keep statuses in their HTTP records. Preserve the academic self-review limitation.
5. Regenerate and visually check the PDF and slides after approval. Reconcile the report, outcomes, risk ratings, file links and image hashes in the final quality review.

**Approval gate:** The interim records are ready for review. The canonical report, presentation, matrix and findings remain at their pre-review versions. Phase 4 has not started.
