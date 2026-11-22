# Phase 2 — Interim verification working paper

**Environment:** Loopback port 3302, `happy_town_audit_test`, revision `f23375fee54bae8942a1c23a702adb04ed6c99a2`.  
**Window:** 20 November 2026, 16:45–16:49 UTC (17:45–17:49 CET).  
**Methods:** Audited code inspection, isolated limiter module test, read-only configuration, test-only Playwright browser checks, database relationship checks and scoped local development-log review.

| Case | Actual observation | Scope or remaining limit |
| --- | --- | --- |
| HT-07 | The limiter module denied the account after five recorded failures, left an independent key unaffected, allowed a new attempt at the ten-minute boundary and allowed an attempt after clearing the state. The inspected credentials handler invokes the limiter and clears failures after successful authentication. An unauthenticated GET to the isolated login page returned 200. Selected response headers and Auth.js cookie defaults are documented separately. | The module used synthetic keys and a simulated clock. The test made no live credential-abuse attempts. No complete documented operating specification was available for comparison, and the test says nothing about production or multi-process enforcement. |
| HT-11 | Context A authenticated as TEACHER and received HTTP 200 from both `/teacher` and `/api/auth/session`. Context B signed in normally as the same account. Both contexts then received HTTP 200 from those endpoints and reported the same authenticated account. | Controlled independent sign-ins only. No session artifacts moved between contexts. The audited login page redirects existing authenticated sessions to their portal. The test did not exercise a supported reauthentication or session replacement transition in an already authenticated context. |
| HT-12 | Prior ordinary sign-out and the same-browser empty session response remain the runtime record. The audited JWT logout and backend paths show no per-session revocation decision. | Previous session reuse was not executed. There is no replay response, protected payload or replay screenshot. |
| HT-14 | Same GET to the teacher-management list: ADMIN received 200 with items. TEACHER and PARENT each received 403 and no items. | Three sampled roles and one request on the management route. Existing distinct HTTP observations and preserved captures support the result. |
| HT-15 | PARENT-A obtained its linked STU-01 (200) and received 404 without a student object for STU-02. PARENT-C obtained its linked STU-02 (200) and received 404 without a student object for STU-01. The expected student object was verified only on authorized reads. | Two synthetic fixtures and the selected read request only. Record relationships were confirmed by read-only SQL. |
| HT-17 | The English Teachers interface sent the exact reserved-domain fixture in a GET query. HTTP 200 returned the correct fixture. A sampled tab’s navigation history did not contain the search URL. The local Next.js development request output contained the synthetic email on a management GET line. | The log does not retain per-line timestamps. The evidence establishes local diagnostic output, with no conclusion about production access logs, proxies, external analytics or third-party disclosure. |

## Fixture changes and collection integrity

The permitted temporary change touched only the test PARENT-C login identifier and bcrypt password hash. Its browser context was closed, then both fields were restored to null. The full users table and relationship fingerprints returned to baseline. All 32 original tables remained unchanged. The isolated database retains five expected successful-authentication audit events (one ADMIN, two TEACHER and two PARENT). All existing rows and 31 other test tables matched their starting fingerprints. No credentials or session values were recorded.

All snapshots use the English application UI. Identifiers and profile or footer information were masked at capture. Two byte-identical renders are represented once. The new HT-17 HTTP transaction rendered the same pixels as the previously preserved screenshot. Its independent timestamp is recorded separately.

| Capture ID | Test | Image retained | Captured UTC | SHA-256 |
| --- | --- | --- | --- | --- |
| IV-HT17-SEARCH | HT-17 | [../final-validation/FV-HT17-01-teacher-search-full.png](../final-validation/FV-HT17-01-teacher-search-full.png) | 2026-11-20 16:47:53.925 | `c4f0a886e9e414a963a1c862c4b2abeed5c196193939c70839367f479f29ec29` |
| IV-HT11-CONTEXT-A | HT-11 | [IV-HT11-CONTEXT-A.png](IV-HT11-CONTEXT-A.png) | 2026-11-20 16:48:00.384 | `e0c92034719b250588014decb87f5bde50359a472bfc8d37c8a67969ee9cd061` |
| IV-HT11-CONTEXT-B | HT-11 | [IV-HT11-CONTEXT-A.png](IV-HT11-CONTEXT-A.png) | 2026-11-20 16:48:00.884 | `e0c92034719b250588014decb87f5bde50359a472bfc8d37c8a67969ee9cd061` |
| IV-HT15-PARENT-C-OWN | HT-15 | [IV-HT15-PARENT-C-OWN.png](IV-HT15-PARENT-C-OWN.png) | 2026-11-20 16:48:06.584 | `d59c11d86b419fc2c5594d61f4b4060d6644dfac43b4c1818f76e42fc901913f` |
[Sanitized browser observations](phase-2-browser.json) · [Limiter and configuration check](ht07-configuration.json) · [Scoped log review](ht17-local-log-review.json) · [Environment preflight](phase-2-preflight.json) · [Database and source verification](phase-2-integrity.json) · [Earlier ordinary logout](../network/clone-browser-observations.json) · [Existing access-control evidence](../network/access-control-follow-up.md)
