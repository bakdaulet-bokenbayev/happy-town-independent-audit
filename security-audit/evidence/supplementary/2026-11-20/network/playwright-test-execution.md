# Happy Town supplementary Playwright execution record

**Audit subject:** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Environment:** `http://127.0.0.1:3301` and isolated PostgreSQL database `happy_town_audit`  
**Method:** Playwright 1.62.1 with isolated Chromium. Playwright recorded request and response metadata. Chrome DevTools was not attached.

## Completed environment check

**PW-LOGIN-01.** An isolated browser opened the actual English login form. Playwright observed an unauthenticated **GET /login → HTTP 200** at **16:03:50 CET (15:03:50 UTC), 20 November 2026**. The form rendered the Welcome heading, empty identification and password fields, masked password input and Sign in button. The browser allowed only same-origin GET and HEAD requests. No sign-in was submitted. The verified screenshot shows the empty form and is an environment exhibit. [Playwright screenshot](PW-LOGIN-01-english-login.png) · [Sanitized request and response trace](playwright-observations.json)

**Screenshot SHA-256** `350f67eba55ece64d3abcafceaa33a0f095ff087fb0547b3285eec3eeba2a5c9`

## Case-by-case execution

| Test | Source-code inspection | Read-only database verification | Actual browser execution | New HTTP evidence | New screenshot |
| --- | --- | --- | --- | --- | --- |
| HT-14 · v5.0.0-8.2.1 | The management GET handler applies the server-side administrator guard before fetching records. | One active candidate for credentials sign-in was present for each of ADMIN, TEACHER and PARENT. | The public form rendered. Role sign-ins and the protected endpoint comparison were not performed. | None for the case. | None for the case. |
| HT-15 · v5.0.0-8.2.2 | The student detail handler checks the parent relationship before selecting a record. | PARENT-A has an active link to STU-01 and no active link to STU-02. PARENT-C has an active link to STU-02. | The authenticated student requests were not performed. | None for the case. | None for the case. |
| HT-17 · v5.0.0-14.2.1 | The client serializes the search value into the GET URL query. The repository can match the value against email. | One active synthetic teacher contact was identified by the reserved test-domain criterion. No address was retained. | Administrator sign-in and contact search were not performed. | None for the case. | None for the case. |
| HT-12 · v5.0.0-7.4.1 | The inspected JWT sign-out path clears the client cookie. The application has no per-session revocation check in the reviewed logout and protected-session paths. | Active login fixture availability was checked. Database inspection cannot establish how a previously issued session behaves after logout. | No authenticated sign-in, logout or reuse was attempted. No session artifact was copied or stored. | None for the case. | None for the case. |

## Constraint and effect on the audit

The audited credentials handler awaits `recordLogin` on success and records failed attempts as well. `recordLogin` calls `prisma.auditLog.create` in `auth.ts:46–67`. Submitting the login form against this instance could therefore modify the audit database. The no-write constraint was applied to normal application-generated authentication audit entries as well as changes to fixtures.

The four authenticated cases remain unexecuted in this pass. The original evidence remains the basis for the existing conclusions. No verdict or risk rating was changed.

[HT-14 original paper](../../../phase-3/HT-14-evidence.md) · [HT-15 original paper](../../../phase-3/HT-15-evidence.md) · [HT-17 original paper](../../../phase-3/HT-17-evidence.md) · [HT-12 original paper](../../../phase-3/HT-12-evidence.md) · [Original sanitized HTTP records](../../../phase-3/observations.json)
