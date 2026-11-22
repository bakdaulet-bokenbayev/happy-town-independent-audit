# HT-11 · Independent source determination and proposed audit amendments

**Review date:** 20 November 2026  
**Audited revision:** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Criterion:** OWASP ASVS 5.0.0 `v5.0.0-7.2.4`, Level 1  
**Criterion determination:** **FAIL (source-based)**  
**Dynamic Replay Test:** **INCONCLUSIVE**  
**Disposition:** Proposed amendments for independent review. The canonical files have not been amended.

## Determination

V7.2.4 requires a fresh session token when the user authenticates, including on re-authentication, and termination of the current session token. At this revision, successful Credentials re-authentication issues a fresh encrypted JWT and replaces the browser's session cookie. The callback neither records termination of the previous token nor changes any state that the JWT decoder or the protected teacher guard uses to reject it. The issuance requirement is met in the reviewed implementation. The termination requirement fails. [OWASP ASVS 5.0.0, V7.2 Fundamental Session Management Security](https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x16-V7-Session-Management.md#v72-fundamental-session-management-security)

## Independent source verification

Tracked files were read from the exact Git tree. Dependency implementation was inspected separately from the worktree's installed packages. Their versions match the audited lockfile, which pins `@auth/core` 0.41.3, `jose` 6.2.8 and `next-auth` 5.0.0-beta.32 in `package-lock.json:65–72,8883–8884,9672–9678`. File paths below are relative to the audited application worktree. The review did not run the application, query either database or check the running environment.

| Question | Confirmed implementation and source |
| --- | --- |
| What handles authentication and session requests? | `app/api/auth/[...nextauth]/route.ts:1–4` exports the handlers from `auth.ts:14–23`. The client calls the Credentials provider at `components/login-form.tsx:21–30`. A signed-in visit to the login page redirects at `app/login/page.tsx:8–11`. The core dispatch validates Credentials CSRF and calls the callback at `node_modules/@auth/core/lib/index.js:49–56`. |
| What changes on a second successful Credentials authentication? | `auth.ts:23–50` validates the input, checks the active account and password, clears failed-login state, writes a successful login audit event and returns the account identity. `lib/auth/login-rate-limit.ts:3–9,23–24` shows that the reset only deletes the hashed login-attempt counter. `auth.ts:66–68` writes an audit row, and neither the JWT decoder nor the access guard parses that row for a revocation cutoff. The success path does not update the user row or the application secret. |
| Does sign-in issue a fresh token and revoke a predecessor? | In `node_modules/@auth/core/lib/actions/callback/index.js:227–277`, the Credentials branch authorizes the caller, builds claims, invokes the JWT callback, encodes the token and creates response cookies. `node_modules/@auth/core/lib/utils/cookie.js:118–140,154–171,194–205` shows that `SessionStore` manages request and response cookie chunks. Its cleanup uses expiry instructions for client cookies. It has no persistent token state. The optional sign-in event is absent in `auth.ts:14–64`. The default sign-in callback allows sign-in and the core initializes an empty event map when none is configured in `node_modules/@auth/core/lib/init.js:9–12,89–92,138–150`. |
| Do a `jti`, token version or issued-at rule revoke earlier tokens? | `node_modules/@auth/core/jwt.js:49–60` sets issuance time, expiration and a random `jti` on each encoding. The default decoder in `node_modules/@auth/core/jwt.js:63–83` uses configured key material and verifies the JWT without looking up `jti`, version or a per-account issued-at cutoff. JOSE's claim checks at `node_modules/jose/dist/webapi/lib/jwt_claims_set.js:121–145` enforce expiry and optional age constraints. Auth.js does not pass `maxTokenAge` in the reviewed decoder. None of these checks compares issuance against a later sign-in. |
| Do app callbacks, a session adapter or a registry provide this control? | `auth.ts:14–19,54–64` selects `strategy: "jwt"`, uses the configured secret, adds `userId` and `role` at sign-in and maps them into the session. It defines no session adapter, custom JWT decoder, replacement callback or revocation event. `node_modules/@auth/core/lib/init.js:71–92` installs the default encoder and decoder. `node_modules/@auth/core/lib/actions/session.js:18–63,65–68` decodes the presented JWT, calls the configured callbacks and can refresh the credential. The JWT branch returns before the database-session lookup. No callback evaluates whether a token was superseded. |
| Do protected resources enforce session freshness? | `node_modules/next-auth/lib/index.js:7–34,103–106` sends the current request context through the Auth.js session action. `lib/auth/authorization.ts:9–30` calls `auth()`, requires an active non-archived user and reads the current role. `app/teacher/page.tsx:1–2`, `app/teacher/layout.tsx:6`, `app/api/teacher/options/route.ts:5` and `app/api/teacher/actions/route.ts:11–13` call this teacher guard. The guard does not check the session's age relative to a later login, look up a token version or query a revocation record. Resource-level rules still apply where relevant. |
| Does the tracked database definition add a hidden invalidation mechanism? | `lib/db/prisma.ts:6–16` creates the PostgreSQL client for account and audit data. `prisma/schema.prisma:169–205,809–825` defines `User` and `AuditLog`, with no session model, token version, latest authentication cutoff or revocation record. The original DDL for the two tables appears in `prisma/migrations/20260801000000_init_postgresql/migration.sql:62–77,525–537,921`. The login logging migration adds enum values in `prisma/migrations/20260804000000_auth_audit_actions/migration.sql:1–2`. Review of the tracked model and migration set found no session persistence or trigger tying login audit events to access state. The unused Drizzle schema at `db/schema.ts:1–4` is empty. |
| Is the rejection check implemented elsewhere in the tracked request path? | The tree contains no tracked middleware, proxy or instrumentation entry point that enforces a replacement policy. `next.config.ts:1–7` has no request-routing or auth override, and `worker/index.ts:28–45` forwards ordinary requests to the application handler. Repo-wide searches covered session storage, revocation, denylisting, `jti`, token versions, issued-at cutoffs and migration triggers. No alternate enforcement path was found in the audited source. |

## Inference and dynamic limit

The second successful authentication changes neither the accepted key material nor the prior token's expiry, identity or eligibility as used by the guard. Given an otherwise cryptographically valid, unexpired earlier JWT under the same configuration for the same active, non-archived TEACHER account, the inspected validator has no condition that would reject it **because the second authentication occurred**. This follows from the application and dependency control flow. It is not a recorded protected-resource response to SESSION-A.

The preserved Playwright run observed a successful second Credentials callback in the already authenticated context and verified TEACHER-A and HTTP 200 on `/teacher` afterward. The previous token was not submitted after re-authentication, so **Dynamic Replay Test — INCONCLUSIVE** remains the supported result. No new browser observation was made for this review. [Preserved Playwright execution](../ht11-same-context-20261120T190133Z/HT11-same-context-execution.md) · [HTTP observations](../ht11-same-context-20261120T190133Z/HT11-http-observations.json) · [Final dynamic disposition](../ht11-final-dynamic-20261120T212722Z/HT11-final-dynamic-execution.md)

The missing control is a server-side replacement decision. The application should associate a stable identifier with each session, terminate the superseded session when re-authentication succeeds, and enforce that decision in shared session validation and on protected requests. The identifier must remain stable through ordinary renewal, or the same server-side authorization decision must be enforced through an equivalent design. This proposal shares the remediation theme of the existing logout issue HT-F01 and keeps the separate re-authentication trigger traceable. It does not propose a new finding ID or a risk re-rating.

## Proposed changes for review

### verification-matrix.csv

For the row keyed by `HT-11`, retain the requirement, level, planned testing fields and priority. Amend only the decision and traceability fields.

| Column | Current | Proposed |
| --- | --- | --- |
| Current Status | `Inconclusive` | `Fail` |
| Evidence Reference | `../evidence/phase-3/HT-11-evidence.md` | `../evidence/phase-3/HT-11-evidence.md \| ../evidence/supplementary/2026-11-20/ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md \| ../evidence/supplementary/2026-11-20/ht11-same-context-20261120T190133Z/HT11-same-context-execution.md` |

Keep the authorized status value exactly `Fail`. The linked determination explains that its basis is source and that the Dynamic Replay Test is Inconclusive. The proposed totals are **11 Pass, 5 Fail and 1 Inconclusive**, with HT-07 the remaining Inconclusive requirement.

### evidence-gaps.md

Replace the introductory status paragraph with the following.

```markdown
**HT-07** remains Inconclusive. HT-05 and HT-13 are documentation Fail outcomes. The independent source review determined **HT-11 — Fail (source-based)**. The separate HT-11 Dynamic Replay Test remains Inconclusive. Original fieldwork decisions are preserved. [Documentation reassessment](../evidence/reassessment/2026-11-19-documentation-review.md) · [HT-11 source determination](../evidence/supplementary/2026-11-20/ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md) · [Verification matrix](../asvs/verification-matrix.csv)
```

Replace the HT-11 paragraph with the following.

```markdown
**ASVS** `v5.0.0-7.2.4`. **Criterion result: Fail (source-based). Dynamic Replay Test: Inconclusive.** The audited Credentials flow issues a new JWT without terminating the prior JWT in server-side validation. Playwright confirmed the second login and protected access in the original context. The prior JWT was not submitted after the second login. The remaining gap is direct dynamic evidence of the server's treatment of the superseded token. [Original working paper](../evidence/phase-3/HT-11-evidence.md) · [Source determination](../evidence/supplementary/2026-11-20/ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md) · [Dynamic disposition](../evidence/supplementary/2026-11-20/ht11-final-dynamic-20261120T212722Z/HT11-final-dynamic-execution.md)
```

### final-audit-report.md

| Location | Proposed amendment |
| --- | --- |
| §3 Executive summary | Change the final totals to **11 Pass, 5 Fail and 1 Inconclusive** across 17 requirements. Add: “The independent source review found that re-authentication issues a new JWT without invalidating the previous JWT on the server. HT-11 is Fail on source evidence. The Dynamic Replay Test remains Inconclusive.” Keep the original fieldwork totals. |
| §12 Verification results | In the **Final** column, change Fail from 4 to 5 and Inconclusive from 2 to 1. Update the explanation to identify the two documentation reassessments and the HT-11 source determination. Keep HT-07 in the unresolved-requirements table. Replace its companion HT-11 row with a separate paragraph identifying the dynamic replay evidence gap and link this source determination. |
| §13 Detailed findings, after HT-F01 | Add: “**Related control deviation, HT-11 · ASVS v5.0.0-7.2.4 · Fail (source-based).** Successful re-authentication issues a new JWT, and the server has no decision that invalidates the superseded token. This shares the server-side revocation gap documented in HT-F01 under the distinct re-authentication trigger. Playwright verified the second login and current-session access. Acceptance or rejection of the old JWT was not observed.” Preserve the existing HT-F01 logout criterion, rating and registered finding count. |
| §15 Corrective action plan | Add a paragraph after the corrective action table linking its proposed server-side revocation design to the HT-11 re-authentication trigger. Specify separate closure evidence for server-side denial of superseded sessions and acceptance of their replacements. Keep the existing risk and remediation dates. |
| §16 Overall conclusion | Replace “HT-07 and HT-11 remain inconclusive” with “HT-07 remains Inconclusive. HT-11 is Fail on source evidence, with prior-token replay after re-authentication dynamically Inconclusive.” Clarify that the registered technical findings remain distinct from the total number of failed requirements. Keep the sampled-scope and self-review disclosures. |
| §18 Evidence traceability appendix | Use the replacement row below. |

Proposed replacement row for §18:

```markdown
| v5.0.0-7.2.4 | HT-11 | Trace Credentials re-authentication, JWT issuance, session validation and the protected teacher guard | P3-HT-11 · [Independent source determination](../evidence/supplementary/2026-11-20/ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md) · §12 | Fail (source-based). Dynamic Replay Test Inconclusive. |
```

This proposal keeps the register at four existing findings and adds a failed verification criterion. No PDF, slide deck, source, matrix, evidence-gaps file, report or findings-register changes were applied.
