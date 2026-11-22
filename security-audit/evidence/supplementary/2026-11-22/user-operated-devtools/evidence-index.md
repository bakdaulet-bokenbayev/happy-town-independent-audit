# Supplementary evidence index

Audited revision `f23375fee54bae8942a1c23a702adb04ed6c99a2`. Isolated Happy Town listener at `http://127.0.0.1:3302`, with the audit database `happy_town_audit_test`. Browser evidence was captured by the user in Google Chrome DevTools.

| Evidence ID | Requirement | Scenario and observation | HTTP response date (UTC) | File |
|---|---|---|---|---|
| HT17-UO-01 | HT-17 · ASVS v5.0.0-14.2.1 | Authorized Teachers search. Network → Headers displays `GET /api/admin/entities?kind=teachers&query=audit-teacher%40example.test&status=active&sort=newest&page=1&pageSize=8` and `200 OK`. The query contains the synthetic search email, with the at sign URL-encoded. | 2026-11-22 08:05:40 UTC (from the response Date header) | [Original PNG](HT17-UO-01-headers.png) |
| HT17-UO-02 | HT-17 · ASVS v5.0.0-14.2.1 | Network → Response for the same selected request displays the JSON summary with "total": 1. Refer to HT17-UO-01 for the URL, method and HTTP status. | Same request as HT17-UO-01 | [Original PNG](HT17-UO-02-response.png) |
| HT17-UO-PW | HT-17 · ASVS v5.0.0-14.2.1 | Separate Playwright observation of the same search term. GET returned HTTP 200 with one matching synthetic fixture. | 2026-11-22 07:58:12 UTC | [Playwright observations](HT17-UO-PW-playwright-observation.json) |
| HT11-UO-01 | HT-11 · ASVS v5.0.0-7.2.4 | Context A's document request to `GET /teacher` returned `200 OK` and Chrome rendered the Teacher Dashboard after Context B signed in. The order of sign-ins is recorded separately in HT11-UO-PW. | 2026-11-22 08:15:30–31 UTC (Playwright request and observation) | [Original PNG](HT11-UO-01-headers.png) |
| HT11-UO-PW | HT-11 · ASVS v5.0.0-7.2.4 | Two independent sign-ins with the same synthetic teacher. A retained browser access after B signed in. The precise state of any superseded credential remains unobserved. | 2026-11-22 08:14:19–08:15:31 UTC | [Playwright observations](HT11-UO-PW-playwright-observation.json) |

[Execution report](execution-report.md) · [SHA-256 manifest](SHA256SUMS.txt)
