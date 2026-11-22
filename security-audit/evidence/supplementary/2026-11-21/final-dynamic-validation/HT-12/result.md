# HT-12 · Logout invalidation

**Criterion** v5.0.0-7.4.1  
**Scope** Audited revision f23375fee54bae8942a1c23a702adb04ed6c99a2, isolated loopback lab

The expected server-side outcome is rejection of the earlier session after logout. Source review found that sign-out clears the browser cookie without server-side revocation. Chrome 157.0.8103.79 via Playwright observed ordinary POST /api/auth/signout returning HTTP 200 at 20:12:25.862 UTC and same-browser GET /api/auth/session returning HTTP 200 at 20:12:25.949 UTC without a user. Earlier fieldwork recorded a protected API returning HTTP 401 after ordinary logout.

**Determination.** Source-based Fail. Acceptance of the pre-logout session remains unobserved. Transferring a reusable session credential to another context and testing it after logout was outside the execution scope. There is no HTTP response or native DevTools capture of that scenario.

[Original findings and evidence](../../../../phase-3/HT-12-evidence.md) · [RV-HT12-13 and RV-HT12-14 HTTP observations](../../remaining-evidence/logout-http.json) · [Retained ordinary logout screenshot](../../../2026-11-20/network/PW-3302-HT-12-signed-out.png)
