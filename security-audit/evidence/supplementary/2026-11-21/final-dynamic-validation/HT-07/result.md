# HT-07 · Credential-abuse protection

**Criterion** v5.0.0-6.3.1  
**Scope** Audited revision f23375fee54bae8942a1c23a702adb04ed6c99a2, isolated loopback lab

The approved baseline became effective on 21 November 2026 CET. It requires a 15-minute pause after the sixth failure within 15 minutes, separate account budgets, successful-login reset and automatic recovery. The audited limiter applies a five-failure threshold and a ten-minute window measured from the first counted failure. The original fieldwork predates approval. [Approved baseline](../../remaining-evidence/HT07-operational-baseline.md) · [Approval record](../../remaining-evidence/HT07-baseline-approval.md)

| Evidence | Client and time | Request | Expected and observed |
| --- | --- | --- | --- |
| FDV-HT07-PUBLIC | .NET HttpClient, 21 November 2026 20:50:15 UTC | GET /login | Expected a reachable public sign-in form. Actual HTTP 200 with an HTML password input. |
| RV-HT07-01 | Chrome 157.0.8103.79 via Playwright, 20:11:06.636 UTC | POST /api/auth/callback/credentials | Expected rejection of one mismatched synthetic credential. Actual HTTP 200 carrying an authentication error. The audit log recorded INVALID_CREDENTIALS. |
| RV-HT07-02 | Same browser, 20:11:06.671 UTC | GET /api/auth/session | Expected no authenticated user. Actual HTTP 200 without a user. |
| RV-HT07-03 | Audited provider and limiter, offline | No HTTP request | Five assertions passed against the implementation. The observed threshold and timing differ from the approved rules. |

**Determination.** Historical Inconclusive. Prospective approved-baseline comparison Fail. Complete live limiter behavior remains unobserved. The requested live account-lockout sequence was outside the execution scope. There is no live outcome for the threshold, an account paused by the threshold, account separation, reset or recovery. No new native DevTools captures are attributed to those cases.

[Public HTTP record](public-login-http.json) · [Retained browser HTTP observations](../../remaining-evidence/browser-http.json) · [Offline results](../../remaining-evidence/HT07-provider-comparison.txt)
