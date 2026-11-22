# Happy Town access-control follow-up

**Date** 20 November 2026  
**Audit revision** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Environment** `http://127.0.0.1:3302` with `happy_town_audit_test`  
**Capture method** Playwright 1.62.1 in isolated Chromium, with a 1440 × 1000 viewport

## Runtime results

Every role request below used the same method, endpoint and parameters for HT-14. The evidence verifies each session's role independently and records the API outcome. The displayed dashboards provide visual context.

| Test | Authenticated fixture | Request | Observed status | Response | Time UTC |
| --- | --- | --- | ---: | --- | --- |
| HT-14 | ADMIN-A | GET `/api/admin/entities?kind=teachers` | 200 | Management items returned. | 15:26:16.644 |
| HT-14 | TEACHER-A | GET `/api/admin/entities?kind=teachers` | 403 | `FORBIDDEN`. No management items. | 15:26:20.276 |
| HT-14 | PARENT-A | GET `/api/admin/entities?kind=teachers` | 403 | `FORBIDDEN`. No management items. | 15:26:22.500 |
| HT-15 | PARENT-A | GET `/api/students/[STU-01]` | 200 | The student object matched the linked fixture. | 15:26:22.693 |
| HT-15 | PARENT-A | GET `/api/students/[STU-02]` | 404 | The denial response contained no student object. | 15:27:10.722 |

**HT-14 is complete for the sampled resource and roles.** The ADMIN screen and the response metadata support authorized access. The two 403 results come from direct GET requests to the same resource. The displayed 403 response was byte-identical across the two captures. The evidence package retains one viewport capture and one focused capture of that shared rendering, plus separate role-specific HTTP records.

**HT-15 covers the linked and unlinked requests from PARENT-A.** A read-only query confirmed its active link to STU-01 and the absence of a link to STU-02. STU-02 has an active link to PARENT-C. That account has neither a sign-in identifier nor a password hash. The positive PARENT-C request could not run. No accounts or relationships were changed.

## Remaining checks

- **HT-17:** No exact-email search was repeated. The earlier ordinary text filter demonstrates use of a GET query parameter. The original sanitized fieldwork records the synthetic-email observation separately. There is no new email-specific browser capture.
- **HT-12:** No JWT or session cookie was captured for replay or restored. The earlier ordinary sign-out and unauthenticated follow-up confirm the signed-out state of that browser. Server acceptance of the previous session remains unobserved.

## Capture and integrity review

Playwright captured genuine browser content. English application views retain their page layout. Personal fields and the footer contact were masked at capture. Raw API responses retain the server's displayed message, which is Russian even when the application is set to English. HTTP status, role and fixture are identified in the accompanying JSON. Repeated images with identical SHA-256 hashes were retained once. No HAR file, credential, cookie value, raw personal payload or session token is included.

Read-only fingerprints matched across all 32 original tables before and after this pass. The original application process stayed on port 3301 with PID 34128. The clone stayed on port 3302 with PID 35572 and the audited worktree remained clean. The clone's only table changes were six new successful sign-in audit entries: two ADMIN, one TEACHER and three PARENT, including repeat sign-ins for the masked viewport captures. Its audit log grew from 22 to 28 rows. The existing records and other 31 clone tables matched their pre-test fingerprints. No original evidence, matrix, findings, risk ratings, PDF or PowerPoint were updated.

[Sanitized HTTP record](access-control-http.json) · [Integrity verification](access-control-integrity.json) · [Earlier Playwright execution](clone-playwright-execution.md) · [Original phase 3 observations](../../../phase-3/observations.json)

## Screenshot inventory

| File | Dimensions | Capture UTC | SHA-256 |
| --- | --- | --- | --- |
| [HT14-ADMIN-FULL.png](HT14-ADMIN-FULL.png) | 1440 × 1000 | 11/20/2026 15:28:23 | `5df99f50ecaf35af8271156a639a5ef5fa6fa6fb07e4f86de106a4c6abcd8f38` |
| [HT14-ADMIN-FOCUS.png](HT14-ADMIN-FOCUS.png) | 1110 × 419 | 11/20/2026 15:26:18 | `8592ca83669efa8d914204b7067dd13439539c23d8a9b25fa207e9281050f0e7` |
| [HT14-TEACHER-PARENT-DENIED-FULL.png](HT14-TEACHER-PARENT-DENIED-FULL.png) | 1440 × 1000 | 11/20/2026 15:26:20 | `7799dff0367469aace34a985615bca11ebf22388b475daf443dabaa299c4a6b3` |
| [HT14-TEACHER-PARENT-DENIED-FOCUS.png](HT14-TEACHER-PARENT-DENIED-FOCUS.png) | 1440 × 35 | 11/20/2026 15:26:20 | `71e3cbb19d176903c13f9eac6ef29927ad318cbaa4205c8327a7612d255f2ec2` |
| [HT15-OWN-STUDENT-FULL.png](HT15-OWN-STUDENT-FULL.png) | 1440 × 1000 | 11/20/2026 15:28:26 | `bc083263b55e632a6ae6338584a4afdd13dd85e5fc87cf721808b3dbb4522e8a` |
| [HT15-OWN-STUDENT-FOCUS.png](HT15-OWN-STUDENT-FOCUS.png) | 1110 × 228 | 11/20/2026 15:26:24 | `4269e72480c0f0591a54e3c52635f955173c31d7c7e7ef730c8f38cd36285ed6` |
| [HT15-FOREIGN-STUDENT-DENIED-FULL.png](HT15-FOREIGN-STUDENT-DENIED-FULL.png) | 1440 × 1000 | 11/20/2026 15:27:10 | `b03fb203ad8d137d35e88b395442aa0052590728d881d1112a8cf11ab31524ae` |
| [HT15-FOREIGN-STUDENT-DENIED-FOCUS.png](HT15-FOREIGN-STUDENT-DENIED-FOCUS.png) | 1440 × 35 | 11/20/2026 15:27:10 | `2709b383773e3c48be590ed3e0d97efe2d5a8ce9fd4b4a6dc1cd7c35279d7548` |
