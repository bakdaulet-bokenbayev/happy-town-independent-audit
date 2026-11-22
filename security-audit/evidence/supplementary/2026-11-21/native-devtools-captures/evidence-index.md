# Native Chrome DevTools evidence index

**Target:** `http://127.0.0.1:3302` · **Database:** `happy_town_audit_test`  
**Audited revision:** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Date:** 21 November 2026 CET  
**Capture status:** Blocked by Google Chrome access in Computer Use. This attempt captured **0 of 12** images and sent **0 application HTTP requests**.

| Evidence ID | ASVS 5.0.0 | Browser state and request | Earlier HTTP observation | Capture still required |
| --- | --- | --- | --- | --- |
| HT14-01 | v5.0.0-8.2.1 | ADMIN · GET `/api/admin/entities?kind=teachers` | 200, management items present | HT14-01-headers.png and HT14-01-response.png |
| HT14-02 | v5.0.0-8.2.1 | TEACHER · same GET | 403, no management items | HT14-02-headers.png and HT14-02-response.png |
| HT14-03 | v5.0.0-8.2.1 | PARENT · same GET | 403, no management items | HT14-03-headers.png and HT14-03-response.png |
| HT14-04 | v5.0.0-8.2.1 | Anonymous · same GET | 401, no management items | HT14-04-headers.png and HT14-04-response.png |
| HT15-01 | v5.0.0-8.2.2 | PARENT-A · GET `/api/students/[STU-01]` | 200, verified linked student object | HT15-01-headers.png and HT15-01-response.png |
| HT15-02 | v5.0.0-8.2.2 | PARENT-A · GET `/api/students/[STU-02]` | 404, no student object | HT15-02-headers.png and HT15-02-response.png |

The HTTP results in the table come from the earlier Chrome execution independently documented in the [HT-14 observations](../extended-devtools-validation/03-HT14-Function-Authorization/http-observations.json) and [HT-15 observations](../extended-devtools-validation/04-HT15-Record-Authorization/http-observations.json). The [existing HT-14 Figure S1](../chrome-devtools-report/HT14-chrome-devtools.png) is a native image from a separate run. This index does not reattribute it to any of the twelve requested screenshots.

[Execution report](execution-report.md) · [SHA-256 manifest](SHA256SUMS.txt)