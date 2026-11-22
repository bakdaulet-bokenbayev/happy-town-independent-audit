# Phase 4 evidence validation and risk assessment

**Subject** Happy Town at `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Assessment scope** The verified loopback development lab, synthetic fixtures and 17 selected OWASP ASVS 5.0.0 Level 1 requirements  
**Review date** 19 November 2026

## Evidence validation

Phase 4 validated the original fieldwork decisions against all 17 Working Papers, the environment and the sanitized observations. The table below records that historical result of **11 Pass, 2 Fail and 4 Inconclusive**. The dated documentation reassessment subsequently revised HT-05 and HT-13 to Fail. The final matrix records **11 Pass, 4 Fail and 2 Inconclusive**. [Original execution report](../methodology/test-execution.md) · [Reassessment record](../evidence/reassessment/2026-11-19-documentation-review.md) · [Final verification matrix](../asvs/verification-matrix.csv)

| Case | ASVS 5.0.0 ID | Outcome supported | Evidence and limits |
| --- | --- | --- | --- |
| [HT-01](../evidence/phase-3/HT-01-evidence.md) | 1.2.4 | Pass | Prisma filters in the inspected lookup and list paths establish that input is passed as structured query values. Successful sign-in and synthetic search corroborate the call paths. The file retains source references and runtime summaries. There is no database bind trace or coverage of other queries. |
| [HT-02](../evidence/phase-3/HT-02-evidence.md) | 2.2.1 | Pass | A missing identifier produced no session, an unsupported entity type and a missing required field returned HTTP 400, and no row matched the invalid create. A valid list and valid fixture create provide positive controls. Source rules and the selected input observations support the sample. A separate owner rule table and exhaustive boundary checks were unavailable. |
| [HT-03](../evidence/phase-3/HT-03-evidence.md) | 2.2.2 | Pass | The route-to-schema trace agrees with the server responses and the no-session and no-write checks. The evidence reaches the trusted service directly and supports the sampled enforcement points. |
| [HT-04](../evidence/phase-3/HT-04-evidence.md) | 3.5.3 | Pass | The captured POST operations and safe GET/HEAD comparisons agree with the handler mapping. The retained fixture counts and authentication-event counts stayed stable for the safe-method sample, and the admin session remained active. Coverage is limited to the listed operations. |
| [HT-05](../evidence/phase-3/HT-05-evidence.md) | 6.1.1 | Inconclusive | The repository describes in-memory rate limiting but leaves its configuration and lockout safeguards unspecified. The documentation inventory and owner confirmation are insufficient to establish the complete controlled baseline. |
| [HT-06](../evidence/phase-3/HT-06-evidence.md) | 6.2.6 | Pass | Chrome recorded masking, deliberate reveal, restoration and masking after reload. The empty screenshot corroborates the form state. The separate browser sign-in timeout leaves these completed DOM observations intact. |
| [HT-07](../evidence/phase-3/HT-07-evidence.md) | 6.3.1 | Inconclusive | Source shows the sign-in guard and the isolated module observations show threshold state, key isolation, reset and recovery. The record shows denial after the configured failure count was recorded. The isolated check supplies no live auth integration evidence and no complete owner-approved baseline was available for comparison. |
| [HT-08](../evidence/phase-3/HT-08-evidence.md) | 6.3.2 | Pass | The seed paths and aggregate inventory reconcile to three explicitly provisioned active logins and the remaining seeded users without a usable pair. The additional test account was created for the audit and disabled in cleanup. The conclusion applies to this local inventory and bootstrap path. |
| [HT-09](../evidence/phase-3/HT-09-evidence.md) | 7.2.1 | Pass | The backend verification trace agrees with authenticated sessions and anonymous API denials without protected payloads. The test establishes the verification boundary. Logout revocation is assessed separately. |
| [HT-10](../evidence/phase-3/HT-10-evidence.md) | 7.2.2 | Pass | Source shows dynamic issuance and the retained comparison confirms distinct issued values in two fresh sessions. A boolean records the comparison without token material. Session replacement was outside this observation. |
| [HT-11](../evidence/phase-3/HT-11-evidence.md) | 7.2.4 | Inconclusive | Distinct issuance in separate sessions does not show replacement of an active session. The signed-in browser path redirects away from the login form. The supported transition inventory and backend invalidation evidence are incomplete. |
| [HT-12](../evidence/phase-3/HT-12-evidence.md) | 7.4.1 | Fail | Runtime supports client logout and the isolated dummy-token expiry check. The configured server design has no logout revocation decision, which is sufficient to confirm the design gap. The evidence contains no observation of a previous application token being accepted after logout. |
| [HT-13](../evidence/phase-3/HT-13-evidence.md) | 8.1.1 | Inconclusive | Repository statements describe admin and ownership checks at a high level. A complete, versioned owner access policy or confirmation of the authoritative documentation set is missing. Runtime checks corroborate selected behavior but cannot establish what is formally documented. |
| [HT-14](../evidence/phase-3/HT-14-evidence.md) | 8.2.1 | Pass | Own-role portals and the authorized admin list returned protected content. The planned cross-role and anonymous cases returned redirects or HTTP 401/403 without that content. The signed-out teacher-page HTTP 500 was a separate logout observation. A complete role policy remains unverified under HT-13. |
| [HT-15](../evidence/phase-3/HT-15-evidence.md) | 8.2.2 | Pass | The fixture relationships were checked independently of the responses. Both cross-parent comparisons and unassigned teacher cases returned HTTP 404 without records. Own or assigned records and admin positive controls were readable. The conclusion covers the sampled student and group reads. |
| [HT-16](../evidence/phase-3/HT-16-evidence.md) | 8.3.1 | Pass | Page, route and service guards corroborate backend enforcement, as do role and record read denials and the permitted fixture create. Denied mutations were outside the runtime sample, so write-path assurance rests on the cited guard order. |
| [HT-17](../evidence/phase-3/HT-17-evidence.md) | 14.2.1 | Fail | The client constructs a query URL and the backend searches the email field. The direct HTTP observation records a synthetic email in the query and a matching result. Browser automation timed out before corroborating the search. The HTTP observation and source independently support the location finding. Actual secondary retention remains unverified. |

The reviewed source and runtime observations support the scoped conclusions without a material contradiction. The signed-out HTTP 401 and cleared cookie in HT-12 describe the client without its session cookie. The configured backend accepts or rejects a presented JWT through a separate decision. The isolated expiry check verifies ordinary expiration and does not establish logout revocation. In HT-17, the presence flag and matched fixture establish URL placement. Withheld redirect destinations and omitted response bodies limit claims about other request flows.

The delivered Phase 3 artifacts were checked for exposed passwords, credential or cookie values, authentication tokens, connection strings, personal identifiers and contact values. The JSON contains roles, fixture labels, field names, statuses and booleans. Both sign-in inputs in the screenshot are empty. No secret or real personal information was identified in the delivered evidence. The review covers the supplied artifacts and omits unretained request values, raw logs and withheld redirect locations. Phase 3 evidence and its matrix were preserved byte for byte. [Environment and evidence record](../evidence/phase-3/environment.md) · [Login screenshot](../evidence/phase-3/HT-06-login.png)

## Qualitative risk method

This phase applies the course impact × likelihood model with three qualitative levels per axis. Assess likelihood in the evidenced deployment and impact against the capabilities the control protects if a scenario occurs. The lab is loopback-only and synthetic. Impact describes potential consequences of the failing control and the access available to a role, with the lab's data and exposure limits made explicit. No production reachability, incident or disclosure was assumed.

| Level | Likelihood | Impact |
| --- | --- | --- |
| Low | Plausible but requires a separate, unevidenced prerequisite or unusual access in the scoped environment. | Limited data or operational effect. A contact value alone does not grant access to an account or protected functions. |
| Medium | A normal workflow repeatedly enables the exposure path when used, or one realistic additional condition is plausible in the scoped environment. | Material but bounded exposure or changes within a role, group or defined record set. |
| High | The exposure is direct and readily reachable under ordinary conditions, with prerequisites evidenced or routine and little additional barrier. | Continued privileged access or substantial loss of confidentiality or integrity, such as exercising administrative authority after it should have ended. |

| Likelihood ↓ / Impact → | Low | Medium | High |
| --- | --- | --- | --- |
| Low | Low | Low (HT-F04) | Medium (HT-F01) |
| Medium | Low (HT-F02, HT-F03) | Medium | High |
| High | Medium | High | Critical |

**Severity** is the impact label in the register. **Risk Rating** is the combined cell. Critical requires evidence consistent with both high likelihood and high impact. Ratings are qualitative priorities for the audited build and environment. The Project Owner owns treatment decisions. Reassess residual risk after a verified fix or a material deployment change.

## Confirmed security deficiencies

### HT-F01 — Logout does not invalidate sessions on the server

**Related case and criterion.** HT-12 · `v5.0.0-7.4.1`.

**Severity High · Likelihood Low · Risk Medium.** The configured JWT path ends the browser's local session state on logout. The backend verification path continues to rely on token validity and current account state, and logout records no invalidation state for that session. A realistic impact scenario requires someone to already possess a valid session artifact, for example through separate access to the local development browser profile, and to be able to reach the lab before the token expires. Continued access would be limited by the account's current role. An administrator session could preserve management access and the ability to change records, which supports High impact for the affected capability. Prior acquisition and local reachability were not evidenced, which supports Low likelihood. The observed 401 after the browser cleared its cookie is consistent with that analysis. The finding concerns a confirmed control design gap and a conditional consequence. [HT-12 working paper](../evidence/phase-3/HT-12-evidence.md) · [OWASP session termination guidance](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#automatic-session-expiration)

### HT-F02 — Admin contact search includes an email in a request URL

**Related case and criterion.** HT-17 · `v5.0.0-14.2.1`.

**Severity Low · Likelihood Medium · Risk Low.** The query exposure occurs during a legitimate admin search when a contact value is searched, so transmission needs no unusual application behavior. Secondary exposure would require a URL-retaining component and access to its records. The sampled value was a synthetic teacher email and the evidenced field is contact information. There was no credential exposure, real-data disclosure or secondary retention in the supplied evidence. This supports Low impact and caps likelihood at Medium in the scoped lab.

An AJAX request can appear in browser network tooling or a saved network trace. Ordinary address-bar history generally records navigations, so an AJAX search alone does not establish a browser history entry. If a query URL is navigated to or bookmarked, it can enter history or saved links, and referrer exposure depends on navigation and policy. Access logs, reverse proxies, request tracing, observability platforms and caches can also retain URL data depending on configuration. Those are potential destinations and were outside the observed retention evidence. [HT-17 working paper](../evidence/phase-3/HT-17-evidence.md) · [RFC 9110 §17.9](https://www.rfc-editor.org/rfc/rfc9110.html#section-17.9)

### HT-F03 — Missing credential-abuse protection documentation

**Related case and criterion.** HT-05 · `v5.0.0-6.1.1`. **Likelihood Medium · Impact Low · Risk Low.**

The README identifies an in-memory limiter and omits how it is configured and how malicious account lockout is prevented. Routine maintenance or review may rely on incomplete guidance, giving Medium likelihood of inconsistent understanding or validation. The direct effect in this sample is reduced assurance over the sign-in control, giving Low impact. The isolated limiter evidence remains available. A successful credential attack or lockout was not established. [Documentation reassessment](../evidence/reassessment/2026-11-19-documentation-review.md) · [HT-05](../evidence/phase-3/HT-05-evidence.md)

### HT-F04 — Missing authorization policy documentation

**Related case and criterion.** HT-13 · `v5.0.0-8.1.1`. **Likelihood Low · Impact Medium · Risk Low.**

The available documentation summarizes server checks and leaves the governing function permissions and data access rules incomplete. Inconsistent future changes could affect confidentiality within a bounded set of student or group records, giving Medium impact. That consequence requires a future inconsistent implementation or review decision. The sampled enforcement held, giving Low likelihood in this scope. [Documentation reassessment](../evidence/reassessment/2026-11-19-documentation-review.md) · [HT-13](../evidence/phase-3/HT-13-evidence.md) · [HT-15](../evidence/phase-3/HT-15-evidence.md)

## Findings-based risk summary

| Finding | Class | Likelihood | Impact | Risk | Status |
| --- | --- | --- | --- | --- | --- |
| HT-F01 | Technical | Low | High | **Medium** | Open |
| HT-F02 | Technical | Medium | Low | **Low** | Open |
| HT-F03 | Documentation | Medium | Low | **Low** | Open |
| HT-F04 | Documentation | Low | Medium | **Low** | Open |

## Other classifications

- **Inconclusive controls** HT-07 and HT-11 retain their Phase 3 outcomes and carry no confirmed finding rating. [Evidence gaps](evidence-gaps.md)
- **Additional technical observations** The signed-out teacher portal returned HTTP 500 without portal content while the separate protected API returned 401. Headless browser sign-in timed out, and some redirect destinations were withheld from the export. These observations establish a response or evidence limitation. The review found no demonstrated protected-data disclosure or authorization bypass from them.
- **General improvement opportunities** Define authoritative credential-abuse and access-rule documents, add repeatable lifecycle and role regression checks with synthetic fixture labels, and standardize the signed-out page response. These opportunities are outside the confirmed findings register.

Both Student Auditors co-developed Happy Town. Bakdaulet Bokenbayev is also the Project Owner and Lead Auditor. The auditors' development roles create a self-review limitation. [Audit plan](../audit-plan/audit-plan.md#participants-independence-and-ethics)
