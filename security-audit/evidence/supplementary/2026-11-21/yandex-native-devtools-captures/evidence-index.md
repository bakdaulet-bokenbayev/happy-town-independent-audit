# Yandex Browser DevTools evidence index

**Target:** `http://127.0.0.1:3302` · **Database:** `happy_town_audit_test`  
**Date:** 21 November 2026 CET  
**Capture status:** **0 of 12**. The requested Network views could not be opened by Computer Use.

| Evidence ID | ASVS 5.0.0 | Browser state and request | Earlier HTTP result | Outstanding files |
| --- | --- | --- | --- | --- |
| HT14-01 | v5.0.0-8.2.1 | ADMIN · GET `/api/admin/entities?kind=teachers` | 200, management items present | HT14-01-headers.png and HT14-01-response.png |
| HT14-02 | v5.0.0-8.2.1 | TEACHER · same GET | 403, no management items | HT14-02-headers.png and HT14-02-response.png |
| HT14-03 | v5.0.0-8.2.1 | PARENT · same GET | 403, no management items | HT14-03-headers.png and HT14-03-response.png |
| HT14-04 | v5.0.0-8.2.1 | Anonymous · same GET | 401, no management items | HT14-04-headers.png and HT14-04-response.png |
| HT15-01 | v5.0.0-8.2.2 | PARENT-A · GET `/api/students/[STU-01]` | 200, linked student record | HT15-01-headers.png and HT15-01-response.png |
| HT15-02 | v5.0.0-8.2.2 | PARENT-A · GET `/api/students/[STU-02]` | 404, no student record | HT15-02-headers.png and HT15-02-response.png |

No HTTP status or capture timestamp was observed in the Yandex attempt. The earlier statuses are linked for continuity and apply only to the independently documented [HT-14 HTTP run](../extended-devtools-validation/03-HT14-Function-Authorization/http-observations.json) and [HT-15 HTTP run](../extended-devtools-validation/04-HT15-Record-Authorization/http-observations.json). The [earlier failed Chrome capture](../native-devtools-captures/execution-report.md) remains in its original directory.

[Execution report](execution-report.md) · [SHA-256 manifest](SHA256SUMS.txt)