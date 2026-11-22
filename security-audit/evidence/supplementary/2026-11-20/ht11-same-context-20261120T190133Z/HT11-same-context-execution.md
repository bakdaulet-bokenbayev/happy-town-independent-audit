# HT-11 · Corrective same-context re-authentication

**Date:** 20 November 2026, 20:01 CET. The HTTP and database evidence below uses UTC.  
**Criterion:** OWASP ASVS 5.0.0 `v5.0.0-7.2.4`, Level 1.  
**Environment:** `http://127.0.0.1:3302`, database `happy_town_audit_test`, revision `f23375fee54bae8942a1c23a702adb04ed6c99a2`.  
**Dynamic verdict:** **INCONCLUSIVE**. A real second authentication and protected access in the original context were confirmed. The treatment of the previous token was untested.

## Authentication implementation

- `auth.ts:14–23,33–50,54–63` configures Auth.js Credentials and JWT-backed sessions, checks active account state and the submitted password, records successful authentication, and maps the authenticated identity into the JWT and session.
- `app/api/auth/[...nextauth]/route.ts:1–4` exports Auth.js handlers. `components/login-form.tsx:21–33` invokes the Credentials provider. `app/login/page.tsx:8–11` redirects an authenticated user to the role portal.
- The installed Auth.js client uses its native Credentials callback and CSRF protection in `node_modules/next-auth/react.js:151–163`. The core route enforces CSRF at `node_modules/@auth/core/lib/index.js:49–56`. The Credentials branch checks the supplied credentials and generates a JWT on successful sign-in at `node_modules/@auth/core/lib/actions/callback/index.js:227–277`, with default encoding at `node_modules/@auth/core/jwt.js:49–60`.
- `node_modules/@auth/core/lib/init.js:69–87` defines session cookie and JWT defaults. `node_modules/@auth/core/lib/utils/cookie.js:44–55` configures the session cookie with HttpOnly and SameSite Lax, and enables Secure when selected by the HTTPS default. `node_modules/@auth/core/lib/actions/session.js:33–51` can refresh the JWT during session reads. Successful callback and later access therefore cannot identify a specific token value or prove invalidation of the previous token.

## Live verification

Playwright signed in through the English login form, using the existing synthetic TEACHER-A fixture, and opened the protected dashboard. With the same browser context still authenticated, it submitted the configured Credentials callback from the protected page with the normal CSRF challenge. It did not visit the login page again, sign out, clear authentication state, create another context for this run, or follow the callback's local hostname alias. The next protected-page request and identity check used the same audited loopback origin. The server returned the same TEACHER-A account identity before and after the second authentication.

| Step | Method and endpoint | UTC | HTTP | Observed result |
| --- | --- | --- | --- | --- |
| Initial authentication | POST `/api/auth/callback/credentials` | 19:01:36.464 | 200 | Credentials callback completed |
| Initial identity | GET `/api/auth/session` | 19:01:36.858 | 200 | Authenticated TEACHER-A |
| Protected baseline in context A | GET `/teacher` | 19:01:37.163 | 200 | Teacher Dashboard rendered |
| CSRF challenge in the active context | GET `/api/auth/csrf` | 19:01:37.714 | 200 | Challenge received |
| Second authentication in context A | POST `/api/auth/callback/credentials` | 19:01:38.105 | 200 | Successful callback with no authentication error |
| Protected access after second authentication | GET `/teacher` | 19:01:38.440 | 200 | Teacher Dashboard rendered |
| Identity after second authentication | GET `/api/auth/session` | 19:01:38.791 | 200 | Authenticated TEACHER-A, same internal identity |

The clone independently recorded both successful TEACHER authentication events at 19:01:36.449 and 19:01:38.093 UTC. Both dashboard captures show the fully rendered English view at 1440 × 1000. They are separate captures with identical SHA-256 hashes because the same masked view rendered both times. The application presents no dedicated confirmation screen for this callback. The HTTP observations and login audit events corroborate re-authentication, while the screenshots document protected access before and after it.

## Untested verification steps

| Check | Disposition |
| --- | --- |
| Old-token baseline in a replay context | Not performed |
| Old-token acceptance or rejection after re-authentication | Not performed |
| Old and new token SHA-256 fingerprints | Not collected |
| Protected access in the original context after successful re-authentication | Verified, HTTP 200 and matching TEACHER-A |
| Server-side invalidation of the previous token | Unverified dynamically |

The omitted steps would require extracting and using a reusable session credential outside its original browser context. No session values, token fingerprints, CSRF values, passwords or raw HTTP headers were retained. No previous-session rejection screenshot exists. The dynamic verdict does not replace the separate [source-based FAIL recommendation](../ht11-static-review/HT11-static-analysis.md).

## Integrity and preservation

The worktree remained clean at the audited revision. The loopback listener remained on the attested process, PID 35572. The clone audit-log count increased from 47 to 51. Two rows are from the confirmed run, and two are from earlier attempts whose Playwright callback observers timed out even though the server logged successful sign-ins. The observer was corrected to match request method, origin and path so the native URL formatting did not prevent capture. The original and production databases were never accessed. The application code, account records and schema were left untouched. The protected canonical audit files retained their preflight SHA-256 hashes.

- [Playwright script](HT11-same-context-playwright.cjs)
- [Sanitized HTTP observations](HT11-http-observations.json)
- [Initial authenticated dashboard](HT11-initial-dashboard.png)
- [Dashboard after re-authentication](HT11-post-reauth-dashboard.png)
- [SHA-256 manifest](SHA256SUMS.txt)
