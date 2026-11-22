# Happy Town evidence register

**Inventory and presentation review** 19–20 November 2026. **Original fieldwork** 19 November 2026, approximately 11:39–11:47 CET. **Audit Subject** Git revision `f23375fee54bae8942a1c23a702adb04ed6c99a2`. The first table indexes original evidence and later documentation reassessment. The separate supplementary section records browser captures from 20 November.

**Original** means existing original evidence. **Present** means existing evidence selected for clearer presentation in the report. **Missing** means evidence that was unavailable or an observation that was outside the original investigation. Where named below, `observations.json` is the [sanitized Phase 3 export](phase-3/observations.json), with exact fields or array labels cited. Source code paths refer to the audited repository revision. Dependency source references identify the installed versions recorded in the environment. The [original execution record](../methodology/test-execution.md) preserves the initial verdicts and the [reassessment](reassessment/2026-11-19-documentation-review.md) records the two subsequent documentation decisions.

## Evidence by test

| Test ID | ASVS requirement | Class and type | Exact source and locator | Supports | Limitation | Embed |
| --- | --- | --- | --- | --- | --- | --- |
| HT-01 | `v5.0.0-1.2.4` | Original · source trace and HTTP | [P3-HT-01 / HT-01-evidence.md](phase-3/HT-01-evidence.md). `auth.ts:24–36`, `lib/repositories/admin.repository.ts:82–99`. `observations.json → http.ordinarySignIn; http.requestLocations.syntheticContactSearch`. | Selected credentials lookup and admin search use structured Prisma arguments. | Only the selected calls. | Traceability row |
| HT-02 | `v5.0.0-2.2.1` | Present · validation and HTTP | [P3-HT-02 / HT-02-evidence.md](phase-3/HT-02-evidence.md). `auth.ts:9–12, 20–29`, `lib/validators/index.ts:3–10`. `observations.json → http.validation`. | Sampled invalid inputs yielded a validation event or HTTP 400 without creating a session or invalid record. | No conclusion for untested inputs. | Exhibit B |
| HT-03 | `v5.0.0-2.2.2` | Present · server code and HTTP | [P3-HT-03 / HT-03-evidence.md](phase-3/HT-03-evidence.md). `auth.ts:23–36`, `lib/services/management.service.ts:19–25`. `observations.json → http.validation`. | The sampled validation is enforced at the trusted server layer. | Scoped handlers and fixtures only. | Exhibit B |
| HT-04 | `v5.0.0-3.5.3` | Original · methods and state | [P3-HT-04 / HT-04-evidence.md](phase-3/HT-04-evidence.md). `app/api/auth/[...nextauth]/route.ts:1–4`, `app/api/admin/entities/route.ts:13–15`. `observations.json → http.safeMethods; http.ordinarySignIn; http.logout; http.provision`. | Sampled sensitive actions used POST. Sampled safe requests preserved checked state. | Limited to listed actions. | Traceability row |
| HT-05 | `v5.0.0-6.1.1` | Present · documentary inventory | [P3-HT-05 / HT-05-evidence.md](phase-3/HT-05-evidence.md) and [RA-2026-11-19-DOC / 2026-11-19-documentation-review.md](reassessment/2026-11-19-documentation-review.md), inventory and HT-05 determination. Root `README.md:24–30, 48–57` and `I18N_REMAINING.md`. | Reviewed documentation leaves effective configuration, reset and malicious lockout safeguards incomplete. | An off-repository policy was outside the evidence provided. Implementation is assessed separately. | Exhibit G |
| HT-06 | `v5.0.0-6.2.6` | Present · screenshot, DOM observations and source | [P3-HT-06 / HT-06-evidence.md](phase-3/HT-06-evidence.md), [HT-06-login.png](phase-3/HT-06-login.png), `components/login-form.tsx:16–17, 38`, `observations.json → browser.mask`. | Empty default form was captured. DOM types corroborate default mask, explicit reveal, restoration and reload. | The screenshot alone shows the empty form. Browser sign-in completion was unavailable. | Exhibit B |
| HT-07 | `v5.0.0-6.3.1` | Original · source trace and isolated observations | [P3-HT-07 / HT-07-evidence.md](phase-3/HT-07-evidence.md). `auth.ts:24–49`, `lib/auth/login-rate-limit.ts:3–25`, `observations.json → limiter`. | Source calls the sign-in guard and resets on success. The isolated check recorded threshold decision, separation, reset and recovery. | Simulated clock and module only. Baseline approval came after fieldwork. See the approved-baseline comparison below. | Section 12 |
| HT-08 | `v5.0.0-6.3.2` | Original · seed and database corroboration | [P3-HT-08 / HT-08-evidence.md](phase-3/HT-08-evidence.md). `prisma/seed.ts:22–26, 58–84, 152–185, 275–285`. `observations.json → http.database; http.provision; http.cleanup`. | The three usable seeded logins matched explicit operator provisioning. The additional fixture was disabled and archived. | Evidence concerns the audit database and the observed lifecycle only. | Traceability row |
| HT-09 | `v5.0.0-7.2.1` | Present · server trace and HTTP | [P3-HT-09 / HT-09-evidence.md](phase-3/HT-09-evidence.md). `lib/auth/authorization.ts:9–30`, installed `@auth/core/lib/actions/session.js:18–42`. `observations.json → http.ordinarySignIn; http.roles; http.recordFixtures`. | Sampled protected reads use verified identity and current account state. Anonymous requests lacked protected payloads. | Logout invalidation is a separate criterion. | Exhibits C and E |
| HT-10 | `v5.0.0-7.2.2` | Original · source trace and equality result | [P3-HT-10 / HT-10-evidence.md](phase-3/HT-10-evidence.md). `auth.ts:14–19`, installed `@auth/core/jwt.js:49–61`. `observations.json → http.independentIssuance`. | Two separate client sign-ins received distinct issued values. | Distinct issuance does not establish termination during replacement. | Traceability row and Section 12 |
| HT-11 | `v5.0.0-7.2.4` | Source reassessment and preserved dynamic evidence | [Original working paper](phase-3/HT-11-evidence.md) · [Independent source determination](supplementary/2026-11-20/ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md) · [Same-context Playwright run](supplementary/2026-11-20/ht11-same-context-20261120T190133Z/HT11-same-context-execution.md) · [Dynamic Replay Test disposition](supplementary/2026-11-20/ht11-final-dynamic-20261120T212722Z/HT11-final-dynamic-execution.md) | Fail on source evidence. Re-authentication issues a fresh JWT without server-side termination of the previous JWT. | The Dynamic Replay Test is Inconclusive. Acceptance or rejection of the old JWT after re-authentication was never observed. | §§12–13 and §18 |
| HT-12 | `v5.0.0-7.4.1` | Present · source, HTTP and isolated expiry | [P3-HT-12 / HT-12-evidence.md](phase-3/HT-12-evidence.md). `auth.ts:14–19, 54–63`, `lib/auth/authorization.ts:9–19`, installed `@auth/core/lib/actions/signout.js:9–29` and `session.js:18–33`. `observations.json → http.logout; jwtExpiry`. | Configured JWT logout cleans the client cookie without a server-side revocation decision. Ordinary logout and dummy expiry have separate corroboration. | Prior application-token reuse after logout was outside the observation. | Exhibit E |
| HT-13 | `v5.0.0-8.1.1` | Present · documentary comparison | [P3-HT-13 / HT-13-evidence.md](phase-3/HT-13-evidence.md) and [RA-2026-11-19-DOC / 2026-11-19-documentation-review.md](reassessment/2026-11-19-documentation-review.md), HT-13 determination. Root `README.md:48–57, 61–70`, `lib/auth/authorization.ts:17–52` and localization QA notes. | Reviewed rules for functions, resource attributes, relationships and denials are incomplete. | No conclusion about separately held policies. Sampled runtime enforcement passed. | Exhibit H |
| HT-14 | `v5.0.0-8.2.1` | Present · paired HTTP and source | [P3-HT-14 / HT-14-evidence.md](phase-3/HT-14-evidence.md). `app/api/admin/entities/route.ts:13–15`, `lib/auth/authorization.ts:17–38`. `observations.json → http.roles; http.portalBaseline`. | TEACHER-A and PARENT-A received HTTP 403 with no items. ADMIN-A received HTTP 200 with items. | Selected function and page sample only. | Exhibit C |
| HT-15 | `v5.0.0-8.2.2` | Present · paired HTTP and relationship verification | [P3-HT-15 / HT-15-evidence.md](phase-3/HT-15-evidence.md). `app/api/students/[id]/route.ts:6`, `app/api/groups/[id]/route.ts:6`, `lib/auth/authorization.ts:40–50`. `observations.json → http.relationships; http.recordFixtures`. | Both linked-parent requests returned HTTP 200 with records and both cross-parent requests returned HTTP 404 without student payloads. | Read-only synthetic comparison. Other records and write paths were outside this case. | Exhibit D |
| HT-16 | `v5.0.0-8.3.1` | Original · server trace with HTTP corroboration | [P3-HT-16 / HT-16-evidence.md](phase-3/HT-16-evidence.md). `lib/auth/authorization.ts:9–50`, `app/api/admin/entities/route.ts:13–15`, `lib/services/management.service.ts:19–25, 73–91`. `observations.json → http.roles; http.recordFixtures; http.provision`. | Sampled protected operations use backend identity, role and relationship decisions. | Mutation conclusions are based on source and authorized fixture creation. | Exhibits C and H |
| HT-17 | `v5.0.0-14.2.1` | Present · source and request metadata | [P3-HT-17 / HT-17-evidence.md](phase-3/HT-17-evidence.md). `components/admin-database-portal.tsx:43–47`, `app/api/admin/entities/route.ts:13`, `lib/repositories/admin.repository.ts:85–90`. `observations.json → http.requestLocations.syntheticContactSearch`. | Contact search put a synthetic email in the URL query, returned HTTP 200 and matched the fixture. | The export retains field names and booleans. No downstream retention or real-data exposure was observed. | Exhibit F |

## Criterion recheck · 21 November 2026

The [verification record](supplementary/2026-11-21/criterion-recheck/review.md) traces all 17 conclusions. For HT-07, [RV-HT07-PROVIDER](supplementary/2026-11-21/criterion-recheck/ht07-provider-results.txt) records five offline provider checks, and [RV-HT07-HTTP](supplementary/2026-11-21/criterion-recheck/ht07-public-http.json) records the unauthenticated login page returning HTTP 200. Neither artifact supplies the approved baseline or a live limiter decision. The [offline session and role regression output](supplementary/2026-11-21/criterion-recheck/session-and-role-results.txt) records 32 passes and two session-lifecycle TODOs. HT-11 remains Fail on source evidence, with the separate Dynamic Replay Test Inconclusive.

## Missing or out-of-sample evidence

| Test or finding | Class | Unavailable evidence and effect |
| --- | --- | --- |
| HT-07 | Missing | Full live limiter behavior against the baseline approved 21 November. The configuration comparison is Fail. |
| HT-11 Dynamic Replay Test | Inconclusive | Same-context re-authentication was observed. Acceptance or rejection of the old JWT after re-authentication was never observed. The criterion remains Fail on source evidence. |
| HT-F01 / HT-12 | Missing | A post-logout observation using the previous application session. The implementation finding rests on the inspected code path, corroborated by ordinary logout and the separate expiry check. |
| HT-F02 / HT-17 | Missing | Persistent retention in logs, traces or another downstream component and any subsequent access or disclosure. Only request placement was observed. |
| HT-F03 / HT-05 and HT-F04 / HT-13 | Missing | Any separate off-repository policy that might supplement the documentation reviewed. The two findings concern the material available at the audited revision. |
| HT-06 and sign-in sample | Missing | Completion of the headless browser sign-in flow. The successful masking observations and separately recorded ordinary HTTP sign-in cover their stated scopes. |

The [Phase 1 environment record](phase-1-environment.md), [Phase 3 environment](phase-3/environment.md) and [application overview](../methodology/application-overview.md) support Exhibit A. Its diagram is an explanatory rendering of the recorded topology. The [verification matrix](../asvs/verification-matrix.csv), [findings register](../findings/findings-register.csv) and [risk assessment](../findings/risk-assessment.md) carry the final decisions.

## Supplementary browser captures — 20 November 2026

The [capture record](supplementary/2026-11-20/capture-record.md) records the environment, exact capture times, roles and limitations. All times below are CET. The [verified PDF](../reports/final-audit-report-verified.pdf) retains the original login crops on pages 5 and 6 and the earlier isolated 3302 Playwright views on pages 8 and 10. The six native authorization exhibits are indexed below.

| Test and ASVS | Original capture | Time and role | PDF location and embedded file | Demonstrates | Limitation |
| --- | --- | --- | --- | --- | --- |
| HT-06 · v5.0.0-6.2.6 | [S20-HT-06-01 · English login](supplementary/2026-11-20/HT-06-en-login-empty.jpg) | 14:11:50.767 · Unauthenticated | Page 5 · Figure B1 · [English login crop](supplementary/2026-11-20/display/HT-06-display-en-login.png) | English UI, empty form | Opening view only |
| HT-06 · v5.0.0-6.2.6 | [S20-HT-06-02 · Masked](supplementary/2026-11-20/HT-06-en-password-masked.jpg) | 14:11:57.367 · Unauthenticated | Page 6 · Figure B2, top · [Masked crop](supplementary/2026-11-20/display/HT-06-display-masked.png) | Entered display-only text is masked | No form submission |
| HT-06 · v5.0.0-6.2.6 | [S20-HT-06-03 · Revealed](supplementary/2026-11-20/HT-06-en-password-revealed-demo.jpg) | 14:12:03.555 · Unauthenticated | Page 6 · Figure B2, middle · [Revealed crop](supplementary/2026-11-20/display/HT-06-display-revealed.png) | Reveal displays a disposable demonstration string | No fixture credential is used |
| HT-06 · v5.0.0-6.2.6 | [S20-HT-06-04 · Restored](supplementary/2026-11-20/HT-06-en-password-restored.jpg) | 14:12:03.949 · Unauthenticated | Page 6 · Figure B2, bottom · [Restored crop](supplementary/2026-11-20/display/HT-06-display-restored.png) | Masking returns after hide | No sign-in evidence |
| HT-12 · v5.0.0-7.4.1 | [S20-HT-12-01 · Teacher dashboard](supplementary/2026-11-20/HT-12-en-teacher-dashboard.jpg) | 14:14:00.620 · Synthetic TEACHER | Historical capture · preserved alongside the canonical report | Signed-in English Teacher Dashboard | No successful sign-out, cookie removal or server-side invalidation demonstrated in this follow-up |

The original HT-06 empty-form image, [HT-06-login.png](phase-3/HT-06-login.png), remains with the Phase 3 working papers.

## Supplementary Playwright evidence on port 3302

The original HTTP results used port 3300. The follow-up used the exact audited revision on port 3302 with the isolated copied database. Times in the capture records are UTC.

| Test | PDF location | Follow-up observations and visual evidence | Limitation |
| --- | --- | --- | --- |
| HT-12 | Page 8 · Figures E1 and E2 | [Teacher before logout](supplementary/2026-11-20/network/PW-3302-teacher-logout-before.png) at 16:14:50.694 CET and [signed-out form](supplementary/2026-11-20/network/PW-3302-HT-12-signed-out.png) at 16:14:51.640 CET. [HTTP and screenshot hashes](supplementary/2026-11-20/network/clone-browser-observations.json). | Ordinary sign-out only. The same browser's session response was HTTP 200 without a user. Prior-token acceptance after logout was not tested. |
| HT-14 | Page 6 · Exhibit C | Identical management GET: ADMIN 200 with items, TEACHER and PARENT 403 without items. [Role checks, screenshots and hashes](supplementary/2026-11-20/network/access-control-follow-up.md). | Sampled teacher directory and roles only. |
| HT-15 | Page 6 · Exhibit D | PARENT-A: linked STU-01 received 200. STU-02 received 404 without student data. [Record checks, screenshots and hashes](supplementary/2026-11-20/network/access-control-follow-up.md). | This run used only PARENT-A. The [later interim run](supplementary/2026-11-20/interim-20261120T164431Z/phase-2-execution.md) separately documents the two-parent comparison. |
| HT-17 | Page 10 · Figure I1 | [FV-HT17-01, full viewport](supplementary/2026-11-20/final-validation/FV-HT17-01-teacher-search-full.png). A genuine Playwright capture showing the synthetic email search and a single matching teacher. | Scoped to synthetic data and the observed request. |
| HT-17 | Page 10 · Figure I2 | [FV-HT17-02, focused viewport](supplementary/2026-11-20/final-validation/FV-HT17-02-search-and-result.png). The [HTTP record](supplementary/2026-11-20/final-validation/ht17-http-observation.json) shows the exact query, HTTP 200 and one matching teacher at 16:58:06.902 CET. | Downstream retention and disclosure remain unverified. |

[HT-17 image hashes](supplementary/2026-11-20/final-validation/SHA256SUMS.txt) · [Test database integrity](supplementary/2026-11-20/final-validation/final-database-integrity.json)


## Native Chrome DevTools authorization evidence · 21 November 2026

The [capture index](supplementary/2026-11-21/chrome-native-devtools-captures/evidence-index.md) records the six requests, Chrome version, timestamps and original file checksums. The [integration index](supplementary/2026-11-21/native-devtools-integration/evidence-index.md) maps each original PNG to its report page and presentation use. These captures corroborate the existing Pass decisions for HT-14 and HT-15.

| Evidence ID | ASVS requirement | Native capture | PDF exhibit and page |
| --- | --- | --- | --- |
| HT14-01-headers | `v5.0.0-8.2.1` | [Headers PNG](supplementary/2026-11-21/chrome-native-devtools-captures/HT-14/HT14-01-headers.png) | HT14-01 · p. 16 |
| HT14-01-response | `v5.0.0-8.2.1` | [Response PNG](supplementary/2026-11-21/chrome-native-devtools-captures/HT-14/HT14-01-response.png) | HT14-01 · p. 16 |
| HT14-02-headers | `v5.0.0-8.2.1` | [Headers PNG](supplementary/2026-11-21/chrome-native-devtools-captures/HT-14/HT14-02-headers.png) | HT14-02 · p. 17 |
| HT14-02-response | `v5.0.0-8.2.1` | [Response PNG](supplementary/2026-11-21/chrome-native-devtools-captures/HT-14/HT14-02-response.png) | HT14-02 · p. 17 |
| HT14-03-headers | `v5.0.0-8.2.1` | [Headers PNG](supplementary/2026-11-21/chrome-native-devtools-captures/HT-14/HT14-03-headers.png) | HT14-03 · p. 18 |
| HT14-03-response | `v5.0.0-8.2.1` | [Response PNG](supplementary/2026-11-21/chrome-native-devtools-captures/HT-14/HT14-03-response.png) | HT14-03 · p. 18 |
| HT14-04-headers | `v5.0.0-8.2.1` | [Headers PNG](supplementary/2026-11-21/chrome-native-devtools-captures/HT-14/HT14-04-headers.png) | HT14-04 · p. 19 |
| HT14-04-response | `v5.0.0-8.2.1` | [Response PNG](supplementary/2026-11-21/chrome-native-devtools-captures/HT-14/HT14-04-response.png) | HT14-04 · p. 19 |
| HT15-01-headers | `v5.0.0-8.2.2` | [Headers PNG](supplementary/2026-11-21/chrome-native-devtools-captures/HT-15/HT15-01-headers.png) | HT15-01 · p. 20 |
| HT15-01-response | `v5.0.0-8.2.2` | [Response PNG](supplementary/2026-11-21/chrome-native-devtools-captures/HT-15/HT15-01-response.png) | HT15-01 · p. 20 |
| HT15-02-headers | `v5.0.0-8.2.2` | [Headers PNG](supplementary/2026-11-21/chrome-native-devtools-captures/HT-15/HT15-02-headers.png) | HT15-02 · p. 21 |
| HT15-02-response | `v5.0.0-8.2.2` | [Response PNG](supplementary/2026-11-21/chrome-native-devtools-captures/HT-15/HT15-02-response.png) | HT15-02 · p. 21 |

## Approved baseline and browser follow-up · 21 November 2026

| Evidence ID | Test | Observation | Boundary |
| --- | --- | --- | --- |
| RV-HT07-POLICY | HT-07 | The Project Owner approved the separately drafted policy for the isolated build. The audited threshold and recovery differ. | Prospective policy. Historical result preserved. |
| RV-HT07-01 and RV-HT07-02 | HT-07 | An ordinary rejected sign-in returned HTTP 200 with an error and a subsequent HTTP 200 session response with no user. The clone recorded one INVALID_CREDENTIALS event. | Single normal rejection. No live throttle sequence. |
| RV-HT07-03 | HT-07 | The audited provider passed five offline checks at the implemented boundary. | The observed threshold and timing differ from the approved follow-up policy. |
| RV-HT11-01 through RV-HT11-08 | HT-11 | Both independent sign-ins succeeded. After B signed in, A returned HTTP 200 on the protected route and rendered the dashboard. | Concurrent access in separate contexts. Superseded-session acceptance remains unobserved. |
| RV-HT12-11 through RV-HT12-14 | HT-12 | Ordinary sign-out returned HTTP 200, and the original signed-out context returned HTTP 200 with no session user. | Earlier-session acceptance after logout remains unobserved. |

[Working paper](supplementary/2026-11-21/remaining-evidence/working-paper.md) · [Baseline approval](supplementary/2026-11-21/remaining-evidence/HT07-baseline-approval.md) · [Evidence hashes](supplementary/2026-11-21/remaining-evidence/SHA256SUMS.txt)

## Final verification and HT-15 submission derivatives

The final disposition reconciles the three outstanding tests against the retained evidence. RV-HT07-POLICY identifies the approved baseline and its effective date. The introductory checks and prospective Fail remain separate from the historical result. No new HTTP requests are reported. The four labeled HT-15 derivatives retain the native status and response evidence while masking fixture identifiers. [Final disposition](supplementary/2026-11-21/remaining-evidence/final-evidence-disposition.md) · [HT-15 derivatives](supplementary/2026-11-21/submission-redactions/HT-15/README.md)

## Final dynamic validation

FDV-ENV-01 records the local listener, isolated database and audited revision. FDV-HT07-PUBLIC records a new HTTP 200 from the unauthenticated public sign-in form. The full limiter and earlier-session outcomes remain unobserved. [Final evidence index](supplementary/2026-11-21/final-dynamic-validation/evidence-index.md)

## Chrome DevTools access follow-up · 21 November 2026

FDV-CUA-SESSION-01 records the anonymous session baseline. In an incognito Chrome window, GET /api/auth/session returned HTTP 200 and JSON null. Two native DevTools captures of the same request are indexed separately from the earlier validation. [Chrome evidence and checksums](supplementary/2026-11-21/chrome-computer-use-retry/README.md)

## Final adjudication

HT-07 is Fail against the approved baseline. The full live lockout sequence remains unobserved. HT-11 is Fail on source evidence, corroborated by Context A's continued access after Context B signed in. Acceptance of the exact superseded credential remains unobserved. HT-12 is Fail on source evidence, with prior-session acceptance after logout unobserved. [Source review](supplementary/2026-11-21/final-adjudication-source-review.md) · [HT-11 reassessment](supplementary/2026-11-21/ht11-context-reassessment.md)

## User-operated Chrome DevTools captures · 22 November 2026

| Evidence ID | Requirement | Observation |
|---|---|---|
| HT17-UO-01, HT17-UO-02 | HT-17 | Headers show the synthetic email in the Teachers search URL and HTTP 200. The paired Response shows one result. |
| HT11-UO-01, HT11-UO-PW | HT-11 | Two independent sign-ins used the same synthetic teacher. Context A did not sign in again and subsequently received HTTP 200 for /teacher. The Teacher Dashboard rendered. Acceptance of an exact superseded credential remains unobserved. |

[Evidence index](supplementary/2026-11-22/user-operated-devtools/evidence-index.md) · [Execution report](supplementary/2026-11-22/user-operated-devtools/execution-report.md) · [SHA-256 manifest](supplementary/2026-11-22/user-operated-devtools/SHA256SUMS.txt)
