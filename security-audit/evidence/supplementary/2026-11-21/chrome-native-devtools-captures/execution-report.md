# Native Chrome DevTools execution report

**Date** 21 November 2026 (CET)  
**Result** Six completed authorization scenarios. Twelve native DevTools captures.  
**Browser** Google Chrome 157.0.8103.79  
**Audited revision** `f23375fee54bae8942a1c23a702adb04ed6c99a2`

## Environment verification

Git HEAD matched the audited revision. The isolated worktree was clean before and after the checks. The loopback listener on `127.0.0.1:3302` matched the previously attested PID 35572 and process start. A read-only transaction returned `happy_town_audit_test` and independently verified PARENT-A's current relationship to STU-01, the absence of its relationship to STU-02 and another parent's active relationship to STU-02. Browser requests were restricted to the isolated origin.

## Execution

Computer Use operated the actual Chrome DevTools windows, selected Network, cleared the request list before each case and captured the Headers and Response tabs. The normal application login form was driven in isolated Chrome contexts with existing synthetic accounts. The login callback and session identity control each returned 200 for ADMIN, TEACHER and PARENT. A normal TEACHER-to-PARENT transition was interrupted. The remaining roles were authenticated in fresh isolated contexts. Each evaluation requested only the fixed GET endpoint for its scenario in the same context as the verified role. The request outcome was also recorded as sanitized metadata without the raw body or headers.

| Evidence ID | Actual status | Response observation | HTTP observation time (CET) |
| --- | --- | --- | --- |
| HT14-01 | 200 | Management items returned. | 19:51:55.111 |
| HT14-02 | 403 | FORBIDDEN. No management items returned. | 19:40:41.428 |
| HT14-03 | 403 | FORBIDDEN. No management items returned. | 19:46:04.842 |
| HT14-04 | 401 | UNAUTHORIZED. No management items returned. | 19:38:54.952 |
| HT15-01 | 200 | Student object returned. Its ID matched linked STU-01. | 19:47:11.943 |
| HT15-02 | 404 | Student not found. No student object returned. | 19:46:40.035 |

All six outcomes matched expectations. The ADMIN response shows a non-empty items array. The STU-01 response shows the student object and fixture ID. The denied responses showed no protected payload in the observed scope.

## Evidence integrity

All twelve PNGs were reopened and visually matched to their scenario and paired view. Authentication headers and cookies were collapsed in the Headers view. Positive response fields were kept outside the visible DevTools viewport where they were unnecessary to prove the result. Raw HAR, cookie values, IINs, secrets, personal fields and complete API payloads were excluded from the delivered evidence. The screenshots are full native frames re-encoded to PNG.

No account, student, schema, relationship or application source was altered by the runner. Ordinary logins use the application's existing authentication audit logging in the isolated database. Production and the original audit database were outside the browser run. The prior packages and the canonical report, matrix, findings, risk assessment and PowerPoint were preserved. HT-11 and HT-12 were outside this run. The audit verdicts and risk ratings are unchanged.

[Evidence index](evidence-index.md) · [Sanitized observations](http-observations.json) · [SHA-256 manifest](SHA256SUMS.txt)
