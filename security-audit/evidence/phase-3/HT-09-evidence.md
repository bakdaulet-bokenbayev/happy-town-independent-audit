# HT-09 — Backend session verification

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-09 |
| ASVS requirement | `v5.0.0-7.2.1` · Level 1 |
| Result | **Pass** |
| Date and time | 19 November 2026, 11:42:49–11:42:58 CET |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ANON and authorized ADMIN-A, TEACHER-A and PARENT-A controls |

**Procedure**  
Trace the shared `auth()` path through the server-side Auth.js integration and JWT verification. Observe the ordinary role sessions and compare authenticated and anonymous reads of protected APIs.

**Expected secure behavior**  
A trusted backend validates the session token before using its identity. A request without an authenticated session receives no protected data.

**Observed result**  
The server calls Auth.js session verification, which decodes and validates the token before the application uses its identity. `getCurrentUser()` reads the active account and role from the database before protected handlers proceed. The three seeded accounts obtained their expected roles. ANON received 401 from both the sampled admin and student APIs and neither response contained the protected payload. ADMIN-A received 200 with items from its allowed list.

**Supporting evidence**  
`lib/auth/authorization.ts:9–30`, `node_modules/next-auth/lib/index.js:7–34`, `node_modules/@auth/core/lib/actions/session.js:18–42` and `node_modules/@auth/core/jwt.js:63–83`. See `http.ordinarySignIn`, `http.roles` and `http.recordFixtures` in [observations.json](observations.json).

**Limitations**  
The conclusion concerns where and how the sampled paths verify the session. Logout invalidation is assessed separately in [HT-12](HT-12-evidence.md).
