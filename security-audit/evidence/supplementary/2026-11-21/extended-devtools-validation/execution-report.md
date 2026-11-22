# Happy Town defensive validation execution

**21 November 2026 (CET)**  
**Target** `http://127.0.0.1:3302` · `happy_town_audit_test`  
**Revision** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Browser** Google Chrome 157.0.8103.79, driven by Playwright with isolated contexts and the normal English Credentials form.

## Environment and fixture verification

The audited worktree reported the exact revision and was clean before and after the checks. The listener was on loopback with PID 35572 and the same start time and working directory as the isolated server attestation. PostgreSQL was published only on loopback. A separate read-only transaction returned `happy_town_audit_test` from `current_database()` and confirmed the PARENT-A link to STU-01. It confirmed an active link from another parent to STU-02 and no active PARENT-A link to STU-02. The transaction returned only booleans and the database name.

All application requests were restricted to the isolated origin. Successful sign-ins used existing synthetic TEACHER, PARENT and ADMIN fixtures. For each, the ordinary Credentials callback and the session identity GET returned 200, with the expected role in the latter. The first attempt to transition directly from the TEACHER browser context to PARENT stopped before the PARENT test. A fresh context completed the PARENT checks. The audit application may write its ordinary sign-in audit events to the isolated database. No source, schema, account, student or relationship was changed by the runner. No connections were made to production or the original audit database.

## Captured HTTP observations

| Evidence ID | Browser context | Method and resource | Time CET | Actual HTTP result |
| --- | --- | --- | --- | --- |
| HT14-01 | ADMIN | GET `/api/admin/entities?kind=teachers` | 18:39:00.897 | 200. Management items present. |
| HT14-02 | TEACHER | GET `/api/admin/entities?kind=teachers` | 18:35:01.752 | 403. No management items. |
| HT14-03 | PARENT | GET `/api/admin/entities?kind=teachers` | 18:38:56.789 | 403. No management items. |
| HT14-04 | Anonymous | GET `/api/admin/entities?kind=teachers` | 18:34:56.433 | 401. No management items. |
| HT15-01 | PARENT-A | GET `/api/students/[STU-01]` | 18:38:57.042 | 200. The student object matched the linked fixture. |
| HT15-02 | PARENT-A | GET `/api/students/[STU-02]` | 18:38:57.127 | 404. No student object returned. |

The observations establish access control for the sampled function and records. Raw responses, authentication headers and credentials were omitted. The Windows Computer Use tool refused access to Google Chrome with “Computer Use was not approved to use Google Chrome”. The authorized Playwright runs supplied sanitized browser HTTP records. No new DevTools images were captured. The prior genuine DevTools Figure S1 remains available as a separately dated ADMIN observation.

## HT-11 and HT-12 offline regression

The existing authentication and role-route tests passed **28/28**. The new offline suite executed the audited application callbacks and authorization guard using test-only in-memory fixtures, along with the installed Auth.js sign-out action using a test double. It passed **4 tests**, with **2 TODO lifecycle assertions**. The test suite made no HTTP or database connections and issued no bearer credentials.

HT-11 remains **Fail (source-based)**, with its independent Dynamic Replay Test **Inconclusive**. HT-12 retains its existing **Fail** and open finding. Acceptance of an earlier session after logout remains untested. The guard tests show handling of trusted signed-in and signed-out states. Server invalidation of an earlier session is outside what those fixture states prove.

The final audit still records **17 requirements, 11 Pass, 5 Fail and 1 Inconclusive**, with **four open findings**. The original evidence and canonical documents were preserved. The audit findings and risk ratings are unchanged.

[Evidence index](evidence-index.md) · [Offline regression results](01-HT11-Reauthentication/regression-results.txt) · [HT-12 source review](02-HT12-Logout/source-review.md)