# HT-11 — Re-authentication navigation and evidence boundary

**Criterion:** `v5.0.0-7.2.4`  
**Environment:** `127.0.0.1:3302`, database `happy_town_audit_test` at loopback port 55432  
**Revision:** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Recommendation:** **Inconclusive**. The observed route redirects an already authenticated user. No supported re-authentication transition or prior-session rejection was established.

## Audited implementation

The credentials provider validates the supplied identifier and password. The configuration uses Auth.js JWT sessions with an eight-hour maximum age. The JWT and session callbacks retain role and identity. The bundled credentials handler issues a new JWT on its normal credential sign-in path. Backend checks use Auth.js and query the current active account before granting teacher access. The inspected application callbacks and trusted checks contain no session-specific revocation decision.

For the isolated HTTP origin, the installed dependency's default session cookie policy derives the name `authjs.session-token`, path `/`, HttpOnly and SameSite=Lax, with Secure selected for HTTPS. These are configuration-derived attributes. This execution did not enumerate browser cookies or inspect a token value.

The application renders the credentials form to unauthenticated users. For an authenticated user, `app/login/page.tsx` redirects to the role portal. The dependency's general callback supports normal credentials issuance, but no audited application UI or documented route presents a supported second authentication from the existing teacher session. A direct substitute for that transition would not demonstrate the audited user workflow. Relevant sources are `auth.ts`, `components/login-form.tsx`, `app/login/page.tsx:8–11`, `app/teacher/layout.tsx`, `lib/auth/authorization.ts`, and the installed Auth.js callback and cookie defaults.

## Actual Playwright observations

A fresh context signed in through the English form with synthetic TEACHER-A. The test then opened the protected Teacher Dashboard, navigated to `/login` while still signed in and checked the resulting session in the same browser context.

| Step | Method and endpoint | UTC | Actual result |
| --- | --- | --- | --- |
| Initial sign-in | POST `/api/auth/callback/credentials` | 2026-11-20 17:05:12.912Z | HTTP 200. Initial session lookup returned HTTP 200 and reported TEACHER. |
| Initial protected page | GET `/teacher` | 2026-11-20 17:05:14.262Z | HTTP 200. English Teacher Dashboard visible. |
| Already authenticated navigation | GET `/login` | 2026-11-20 17:05:14.529Z | HTTP 307 to `/teacher`, whose response was HTTP 200. No sign-in form and no second credentials submission. |
| Session after the redirect | GET `/api/auth/session` | 2026-11-20 17:05:14.938Z | HTTP 200. Identity matched the synthetic TEACHER-A fixture. |

The initial browser context was closed. No separate browser context was populated with a prior session credential. The replay control and prior-token rejection were not tested. A second authentication did not occur and there is no SESSION-B acceptance result. Continued access in the initial context describes the ordinary redirect. It cannot establish whether Auth.js refreshed its cookie or whether a superseded token would be rejected.

## Evidence and finding disposition

- [HT11-RA-01 · Initial English Teacher Dashboard](HT11-INITIAL-TEACHER-DASHBOARD.png), 1440 × 1000. Captured 2026-11-20 17:05:14.417Z. Identifying sections were masked during capture. SHA-256 `6069698321807316ac36482d2a3e643c0da7b1446cb1a3283608b604355d7531`.
- [Sanitized HTTP observations](ht11-http-observations.json) · [Token fingerprint collection status](ht11-token-fingerprints.json) · [Integrity record](ht11-integrity.json) · [SHA-256 manifest](SHA256SUMS.txt).
- [Original HT-11 working paper](../../../phase-3/HT-11-evidence.md) · [Earlier independent-context evidence](../interim-20261120T164431Z/phase-2-execution.md).

This evidence adds a live confirmation of the authenticated login redirect. It leaves the replacement and termination elements of V7.2.4 unresolved. Retain **Inconclusive** and propose no separate finding or finding linkage change. HT-F01 concerns the existing logout revocation gap and should remain open on its existing evidence.

All original database tables remained unchanged. In the clone, `audit_logs` gained one expected successful TEACHER login and the other 31 tables matched preflight. Ports 3300, 3301 and 3302 retained their listener PIDs, and the audited worktree remained clean. Previous audit evidence and canonical submission files were preserved. Phase 4 still awaits explicit approval.
