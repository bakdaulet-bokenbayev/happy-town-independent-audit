# HT-07, HT-11 and HT-12 follow-up working paper

**Date** 21 November 2026 CET. The recorded timestamps below use UTC.  
**Audited revision** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Environment** Chrome 157.0.8103.79 with Playwright 1.62.1, loopback listener `127.0.0.1:3302`, isolated `happy_town_audit_test` database

The pre-approval matrix remains the historical audit of 17 criteria, with 11 Pass, 5 Fail and 1 Inconclusive. Four findings remain open. This follow-up records a separate assessment against a policy that became effective after fieldwork. The tested application, schema, security configuration and fixtures were left in place. The normal sign-in requests generated authentication audit events. Read-only queries captured outcome categories and counts without selecting identifiers. [Active matrix](../../../../asvs/verification-matrix.csv) · [Baseline approval](HT07-baseline-approval.md)

## HT-07 · Baseline and integration

**Historical status** Inconclusive. **Follow-up baseline comparison** Fail. **Full live limiter integration** Incomplete.

The README records hashed in-memory keying, and the original evidence established that the provider uses the limiter. The Project Owner approved the separately drafted policy on 21 November. The approved policy starts a 15-minute pause at the sixth failed verification within a rolling 15-minute window. The audited limiter allows five recorded failures, denies subsequent verification, and recovers ten minutes after the first counted failure. The shorter window and different threshold are direct deviations from the approved policy. The five successful assertions in the offline test confirm the audited behavior exercised by the test. They do not indicate that the approved policy passed. [Approved policy](HT07-operational-baseline.md) · [Original working paper](../../../phase-3/HT-07-evidence.md) · [Offline recheck results](HT07-provider-comparison.txt)

| ID | Boundary tested | Actual result |
| --- | --- | --- |
| RV-HT07-01 | Normal sign-in form with one deliberately mismatched input in a synthetic fixture | POST Credentials callback returned HTTP 200 at 20:11:06.636 UTC with an authentication error. |
| RV-HT07-02 | Session lookup after rejected sign-in | GET session returned HTTP 200 at 20:11:06.671 UTC with no user. |
| RV-HT11-01 | Subsequent ordinary successful sign-in with that fixture | POST Credentials callback returned HTTP 200 at 20:11:08.737 UTC without an authentication error. |
| RV-HT07-03 | Audited provider and limiter executed together with in-memory dependencies | Five checks corroborated denial before lookup, offline account separation, failure handling, reset and recovery at the implemented boundary. |

The run's read-only audit-log query found one `INVALID_CREDENTIALS` event and two `SUCCESS` events, matching the one rejection and two successful logins. A single rejected request and later successful sign-in establish integration wiring for these paths. Live threshold, throttle denial, independent account budgets, reset and timed recovery were beyond this run. The needed evidence is a redacted report from a bounded integration test of those controls, with a matching throttle event and the observed recovery time, plus any verified recovery procedure. No live lockout or credential-abuse sequence was executed. [Playwright HTTP record and audit-event totals](browser-http.json)

## HT-11 · Concurrent access and session replacement

**Criterion** Fail on source evidence. **Two-context concurrent access** Observed. **Superseded-session Dynamic Replay Test** Inconclusive.

Context A signed in normally and GET /teacher returned HTTP 200 with protected content. Context B then signed in independently using the same fixture. Both session identity comparisons matched the same account in memory. After B signed in, A requested /teacher again and received HTTP 200 at 20:11:13.238 UTC with the dashboard present. The subsequent session lookup returned HTTP 200 and TEACHER. No session credential was read, copied or persisted. These observations show that an independent sign-in in B left A able to access the route. B did not have an existing session to supersede. The result gives no protected-route status for a token superseded by same-context re-authentication. The separate source-based failure stands. [RV-HT11-01–07 HTTP record](browser-http.json) · [RV-HT11-08 Playwright dashboard crop](RV-HT11-08.png) · [Retained same-context disposition](../../2026-11-20/ht11-final-dynamic-20261120T212722Z/HT11-final-dynamic-execution.md)

## HT-12 · Ordinary logout and server invalidation

**Criterion** Fail on source evidence. **Ordinary logout** Observed. **Earlier-session acceptance after logout** Unobserved.

In the same browser, the protected route returned HTTP 200 with content before logout. POST sign-out returned HTTP 200 at 20:12:25.862 UTC and the session lookup returned HTTP 200 at 20:12:25.949 UTC with no user. The run did not record its subsequent page capture or route response because the browser did not complete that follow-up step. The earlier fieldwork already retained HTTP 401 on a signed-out protected API, and the earlier Playwright evidence captured the sign-in form after ordinary logout. These observations apply to the signed-out browser. The requested second context representing the same session requires duplicating an active reusable session credential and using it afterward. That step was outside the permitted execution scope. The original finding rests on the inspected JWT logout path and still stands. [RV-HT12-11–14 HTTP record](logout-http.json) · [Original working paper](../../../phase-3/HT-12-evidence.md) · [Retained ordinary logout screenshot](../../2026-11-20/network/PW-3302-HT-12-signed-out.png)

## Evidence limits and integrity

The first browser attempt stopped before any observed authentication event. A subsequent run produced the HT-07 and HT-11 records and a logout callback. Two ordinary logout follow-ups are kept separately. The last of those confirmed the signed-out session endpoint. Each result is labeled by what the runner actually observed. The new image is a direct Playwright crop of the dashboard heading and contains no account details. No new native Chrome DevTools Headers or Response images were captured for these three tests. The native authorization evidence for HT-14 and HT-15 was reused without repeating those tests. [First partial run](browser-preliminary.json) · [Earlier partial logout run](logout-preliminary.json) · [Playwright runner](ordinary-browser-checks.cjs) · [File checksums](SHA256SUMS.txt)

