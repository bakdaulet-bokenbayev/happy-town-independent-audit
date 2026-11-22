# HT-11 · Final dynamic test disposition

**Review:** 20 November 2026, 22:27 CET. The tables and JSON use UTC.  
**Criterion:** OWASP ASVS 5.0.0 `v5.0.0-7.2.4`, Level 1.  
**Environment:** `127.0.0.1:3302`, `happy_town_audit_test`, revision `f23375fee54bae8942a1c23a702adb04ed6c99a2`.  
**Dynamic verdict:** **INCONCLUSIVE.** The server's treatment of the previous token after re-authentication remains unobserved.

## Environment verification

The audited Git worktree was clean. The listener on `127.0.0.1:3302` matched the worktree and start time for PID 35572 in the existing database attestation. A separate read-only query verified that `happy_town_audit_test` was reachable and contained one matching active synthetic TEACHER account with a password configured. The original and production databases were not accessed.

## Verified earlier execution

The prior same-context Playwright run used the normal English form for the first login. It then completed a second Credentials authentication with CSRF validation while the same context was still signed in. That run inspected the real route guard and corroborated the second successful callback with the corresponding authentication event in the isolated database. Its artifacts were verified against their recorded SHA-256 manifest during this review.

| Check | Method and endpoint | Time (UTC) | Result |
| --- | --- | --- | --- |
| SESSION-A identity in the original context | GET `/api/auth/session` | 19:01:36.858 | HTTP 200, TEACHER-A authenticated with role TEACHER |
| SESSION-A protected access in the original context | GET `/teacher` | 19:01:37.163 | HTTP 200, protected dashboard rendered |
| Same-context re-authentication | POST `/api/auth/callback/credentials` | 19:01:38.105 | HTTP 200, no callback authentication error. Clone login event at 19:01:38.093 |
| Current-context protected access | GET `/teacher` | 19:01:38.440 | HTTP 200, protected dashboard rendered |
| Current-context identity | GET `/api/auth/session` | 19:01:38.791 | HTTP 200, same TEACHER-A identity and role |
| Independent baseline with the exact previous token | Requested protected route | No observation | Untested |
| Previous token after the second authentication | Requested session and protected routes | No observation | Untested |

Code inspection shows the Credentials callback follows the JWT issuance path. Continued access and the matching identity were observed in the original context after sign-in. The exact SESSION-B credential and any response cookie rotation were not measured. [Prior execution report](../ht11-same-context-20261120T190133Z/HT11-same-context-execution.md) · [Prior HTTP observations](../ht11-same-context-20261120T190133Z/HT11-http-observations.json) · [Static analysis](../ht11-static-review/HT11-static-analysis.md)

## Execution boundary

The missing checks require copying a reusable session credential to another context and deliberately replaying it against protected resources. This step was blocked. The earlier completed authentication steps were carried forward without a redundant browser run. There were no new application HTTP requests. No credentials, storage state, cookie fingerprints or cookie headers were captured. The observations index in this directory separates prior HTTP evidence from the current preflight and records no result for the previous token.

The canonical audit package and original evidence were preserved. No account, schema or source changes were made. This disposition does not change the separate source-based recommendation.

## Artifacts

- [Current observations index](HT11-http-observations.json)
- [Verified prior Playwright script](../ht11-same-context-20261120T190133Z/HT11-same-context-playwright.cjs)
- [Prior initial dashboard](../ht11-same-context-20261120T190133Z/HT11-initial-dashboard.png)
- [Prior dashboard after re-authentication](../ht11-same-context-20261120T190133Z/HT11-post-reauth-dashboard.png)
- [SHA-256 manifest](SHA256SUMS.txt)

There is no new replay script, old-session screenshot or HTTP result. The application does not present a separate re-authentication confirmation screen in the prior test. The successful callback is documented by the prior sanitized HTTP observation and the isolated login event.
