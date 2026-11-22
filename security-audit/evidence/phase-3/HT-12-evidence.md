# HT-12 — Session termination on logout or expiration

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-12 |
| ASVS requirement | `v5.0.0-7.4.1` · Level 1 |
| Result | **Fail** |
| Date and time | 19 November 2026, 11:42:49–11:42:58 CET for logout and 11:46:14 CET for the isolated expiry check |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | TEACHER-A for ordinary logout. The inspected JWT strategy is shared by all roles. |

**Procedure**  
Observe ordinary sign-out and a protected request from the same signed-out client. Review the installed Auth.js logout and session verification paths and Happy Town configuration. Verify the installed library rejects an expired, separately generated synthetic token in isolation.

**Expected secure behavior**  
Logout and expiry prevent further use of the terminated session at the backend.

**Observed result**  
Before logout `/teacher` returned 200. POST sign-out returned 302, the cookie was removed from that client, the session endpoint returned 200 without a user, and the sampled protected API returned 401. A subsequent `/teacher` page request returned 500 with no portal content. The isolated expiry check decoded a fresh dummy token and rejected an expired dummy token. Source inspection shows the configured JWT sign-out path clears the client cookie and optionally calls a sign-out event. Happy Town defines no such event, token revocation or session-version check in the inspected path. Backend verification checks JWT validity and the current account state. Normal sign-out does not change either, so the implementation does not enforce server-side invalidation on logout.

**Supporting evidence**  
`auth.ts:14–19, 54–63`, `lib/auth/authorization.ts:9–19`, `app/teacher/layout.tsx:4–6`, `node_modules/@auth/core/lib/actions/signout.js:9–29`, `node_modules/@auth/core/lib/actions/session.js:18–33` and `node_modules/@auth/core/jwt.js:49–83`. See `http.logout` and `jwtExpiry` in [observations.json](observations.json).

**Limitations**  
The failure is based on the configured server design. The runtime sample establishes ordinary sign-out and the isolated check establishes expiration. No prior application session value was reused.
