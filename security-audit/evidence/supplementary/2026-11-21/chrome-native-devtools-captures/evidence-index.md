# Native Chrome DevTools evidence index

**Date** 21 November 2026 (CET)  
**Environment** Chrome 157.0.8103.79 · `127.0.0.1:3302` · `happy_town_audit_test`  
**Revision** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Verified files** 12 unique, full-window native PNG captures at 1536 × 816.

Each Headers capture shows the request URL, GET and the actual status. The paired Response capture shows the real server body. For the two successful requests, the Response viewport was resized in DevTools to show the relevant JSON structure and keep names and contact fields outside the visible area. The export preserved the full window without image cropping or overlays. The timestamps below are when the captured frames were saved.

| Evidence ID | ASVS 5.0.0 | Context and endpoint | Actual HTTP result | Headers (CET) | Response (CET) |
| --- | --- | --- | --- | --- | --- |
| HT14-01 | v5.0.0-8.2.1 | ADMIN · GET `/api/admin/entities?kind=teachers` | 200. Management items returned. | [19:52:16.319](HT-14/HT14-01-headers.png) | [19:53:15.032](HT-14/HT14-01-response.png) |
| HT14-02 | v5.0.0-8.2.1 | TEACHER · GET `/api/admin/entities?kind=teachers` | 403. FORBIDDEN. No management items returned. | [19:41:08.603](HT-14/HT14-02-headers.png) | [19:40:59.254](HT-14/HT14-02-response.png) |
| HT14-03 | v5.0.0-8.2.1 | PARENT · GET `/api/admin/entities?kind=teachers` | 403. FORBIDDEN. No management items returned. | [19:46:27.370](HT-14/HT14-03-headers.png) | [19:46:38.207](HT-14/HT14-03-response.png) |
| HT14-04 | v5.0.0-8.2.1 | Anonymous · GET `/api/admin/entities?kind=teachers` | 401. UNAUTHORIZED. No management items returned. | [19:40:01.228](HT-14/HT14-04-headers.png) | [19:40:09.650](HT-14/HT14-04-response.png) |
| HT15-01 | v5.0.0-8.2.2 | PARENT-A · GET `/api/students/[STU-01]` | 200. Student object returned. Its ID matched linked STU-01. | [19:47:29.634](HT-15/HT15-01-headers.png) | [19:49:28.233](HT-15/HT15-01-response.png) |
| HT15-02 | v5.0.0-8.2.2 | PARENT-A · GET `/api/students/[STU-02]` | 404. Student not found. No student object returned. | [19:47:10.417](HT-15/HT15-02-headers.png) | [19:46:56.202](HT-15/HT15-02-response.png) |

[Execution report](execution-report.md) · [Sanitized HTTP observations](http-observations.json) · [SHA-256 manifest](SHA256SUMS.txt)

Earlier [Chrome](../native-devtools-captures/execution-report.md) and [Yandex](../yandex-native-devtools-captures/execution-report.md) access attempts are preserved separately.
