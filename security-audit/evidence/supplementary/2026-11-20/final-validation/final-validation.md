# Happy Town final validation record

**Audit revision** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Isolated target** `127.0.0.1:3302` with `happy_town_audit_test`  
**Review date** 20 November 2026, Europe/Budapest

## HT-17 · Sensitive information in URL parameters

ADMIN signed in through the audited application and used the English Teachers page to search for the exact reserved-domain fixture. A read-only lookup first confirmed the configured address belonged to the seeded active teacher in the test database. Playwright captured the outgoing request and matched its response URL. The response returned exactly one item and its fixture identity and email matched. The decoded `query` parameter contained the synthetic email. The full localhost URL, query parameters and timestamps are in the [HTTP observation](ht17-http-observation.json).

| Observed item | Value |
| --- | --- |
| Method and endpoint | GET `/api/admin/entities` |
| HTTP status | 200 |
| Request timestamp | 11/20/2026 15:58:06 UTC · 20 Nov 2026, 16:58:06 CET |
| Result | One matching synthetic teacher. The synthetic email appeared in the URL. |

This supports the existing HT-17 finding. An email in a request URL can be retained by browser network tools and by server, proxy or monitoring systems that retain full URLs. A background search request does not establish that the URL entered normal browser navigation history. The execution established URL placement and a fixture match. Downstream retention and third-party disclosure remain unverified. [RFC 9110, §17.9](https://www.rfc-editor.org/rfc/rfc9110.html#section-17.9)

The images are genuine Playwright captures. Identity fields, names and the sidebar contact were masked at capture. The search field and reserved-domain synthetic contact remain visible. HTTP status comes from the Playwright response listener. A separate DevTools image was unavailable.

| Evidence ID | Test ID | Capture and scope | Capture UTC | SHA-256 |
| --- | --- | --- | --- | --- |
| FV-HT17-01 | HT-17 | [Full English Teachers page](FV-HT17-01-teacher-search-full.png), 1440 × 1000 | 11/20/2026 15:58:07 | `c4f0a886e9e414a963a1c862c4b2abeed5c196193939c70839367f479f29ec29` |
| FV-HT17-02 | HT-17 | [Focused view of the search field and single returned fixture](FV-HT17-02-search-and-result.png), 1196 × 366 | 11/20/2026 15:58:07 | `6cabebd99a51837455d55fadef8165af9c699e51d006eef8217ac67d9952efea` |
Both images correspond to the single request recorded in [ht17-http-observation.json](ht17-http-observation.json).

## HT-12 · Previous-session acceptance after logout

The audited source configures Auth.js JWT sessions with an eight-hour maximum age and uses the installed Auth.js logout path to clear the browser cookie. The application has no per-session server-side revocation decision in the inspected logout and protected-session paths. The earlier ordinary logout returned HTTP 200. The same browser context subsequently returned HTTP 200 from `/api/auth/session` with no authenticated user. Acceptance of the previous session remains unobserved. No prior session credential was collected, restored or replayed in this validation. [Original working paper](../../../phase-3/HT-12-evidence.md) · [Prior ordinary logout observations](../network/clone-browser-observations.json)

## HT-15 · Supplementary PARENT-C control

The approved fixture links PARENT-C to STU-02. Existing read-only evidence and the current fixture check show that PARENT-C lacks a login identifier and password hash. The positive authenticated comparison remains unavailable. No account, password, relationship or seed configuration was changed. The earlier PARENT-A tests remain HTTP 200 for STU-01 and HTTP 404 without student data for STU-02. [Access-control follow-up](../network/access-control-follow-up.md) · [Read-only fixture observations](../network/remaining-checks-observations.json)

## Integrity and package readiness

The test process on port 3302 retained its PID and exact worktree revision. The original process on port 3301 and the fingerprints of all 32 original tables were unchanged. The only change in the test database was one successful ADMIN authentication audit entry, taking the log from 28 to 29 rows. All other test tables and the previous audit rows matched their starting fingerprints. No credential, session cookie, JWT, HAR or raw response payload was saved. [Database integrity record](final-database-integrity.json)

All 17 matrix IDs, exact descriptions and Level 1 designations were checked against the official OWASP ASVS 5.0.0 English CSV. Current outcomes reconcile to 11 Pass, 4 Fail and 2 Inconclusive. HT-12 remains Medium. HT-17, HT-05 and HT-13 remain Low. The existing report has 17 A4 pages with five embedded screenshots. The 13-slide presentation agrees with the existing results and preserves the co-developer self-review limitation for Bakdaulet Bokenbayev and Assel Karzhau. The existing package was reviewed without changes. The two new HT-17 images remain supplementary while the prior-session replay is unresolved. [Existing package checks](final-package-check.json) · [OWASP ASVS 5.0.0](https://asvs.owasp.org/downloads/)

The matrix, findings, risk assessment, remediation plan, evidence register, report, slides, notes, defense questions and original quality review remain at their existing versions. The outcome counts are unchanged. The requested final update of those files is pending completion of fieldwork.
