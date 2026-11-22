# HT-10 — Dynamic generation of session tokens

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-10 |
| ASVS requirement | `v5.0.0-7.2.2` · Level 1 |
| Result | **Pass** |
| Date and time | 19 November 2026, 11:42:49–11:42:58 CET |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ADMIN-A in two separate, fresh HTTP client sessions |

**Procedure**  
Inspect JWT configuration and the installed Auth.js credentials callback and token issuance. Perform two normal sign-ins in separate sessions and record in memory whether the issued session values differ.

**Expected secure behavior**  
The server issues dynamically generated session tokens.

**Observed result**  
The Auth.js credentials path invokes JWT encoding and sets new session cookies. The installed encoder sets an issue time, an expiration and a fresh token ID. Both independent ADMIN-A sign-ins yielded session values and the in-memory comparison found them different. The saved record contains only a boolean comparison.

**Supporting evidence**  
`auth.ts:14–19`, `node_modules/@auth/core/lib/actions/callback/index.js:248–274` and `node_modules/@auth/core/jwt.js:49–61`. See `http.independentIssuance` in [observations.json](observations.json).

**Limitations**  
The comparison establishes independent issuance. Session supersession is assessed in [HT-11](HT-11-evidence.md).
