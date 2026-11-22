# HT-11 source review and offline regression

**ASVS 5.0.0** `v5.0.0-7.2.4`  
**Revision** `f23375fee54bae8942a1c23a702adb04ed6c99a2`

- `auth.ts:14–18` configures Auth.js with JWT sessions. `auth.ts:23–51` validates Credentials, checks that the account is active and records the successful login. `auth.ts:54–63` maps user ID and role into claims and a session object. The reviewed application configuration has no per-session replacement check in this path.
- `app/api/auth/[...nextauth]/route.ts:1–4` delegates the authentication routes to Auth.js. `node_modules/@auth/core/lib/actions/session.js:18–33` decodes the session in the installed JWT path and calls the configured JWT callback.
- `lib/auth/authorization.ts:9–30` checks the current session’s identity, looks up the active account and enforces the current database role. `app/teacher/page.tsx:2` calls `requireTeacher()` before querying dashboard data.
- The existing `tests/iin-auth.test.mjs` and `tests/role-routes.test.mjs` cover source contracts for Credentials and protected routes. They have no assertion that a second sign-in invalidates the first session.

The new offline suite loads the actual application callbacks and guard from the audited source with allowlisted in-memory dependencies. The fixtures confirm identity mapping across two simulated successful sign-in results, denial when the trusted session boundary returns no identity, and denial for an unavailable account. The test confirms the guard runs an active-account lookup. It does not issue, read or present a browser credential.

The controlled state changes cannot establish whether the configured session authority would invalidate an earlier session. The source-based Fail and the separate Inconclusive dynamic disposition are retained.

Run from the audited worktree with `node --test "<path to session-guard-regression.test.mjs>"`. The unexecuted lifecycle assertion is marked TODO. [Regression suite](session-guard-regression.test.mjs) · [New run results](regression-results.txt) · [Existing tests](existing-test-results.txt)