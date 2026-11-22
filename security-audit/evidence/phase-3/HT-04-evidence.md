# HT-04 — HTTP methods for sensitive operations

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-04 |
| ASVS requirement | `v5.0.0-3.5.3` · Level 1 |
| Result | **Pass** |
| Date and time | 19 November 2026, 11:42:49–11:42:58 CET |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ANON at sign-in, ADMIN-A at entity management and TEACHER-A at sign-out |

**Procedure**  
Map the method handlers. Compare sign-in, sign-out and authorized synthetic creation with the read-only entity listing and ordinary GET sign-out confirmation and HEAD entity-list interactions.

**Expected secure behavior**  
The sampled authentication and creation actions use state-changing methods. Safe requests do not perform the same actions or change the sampled state.

**Observed result**  
Credentials sign-in and normal sign-out used POST with HTTP 302. Both synthetic creates used POST with HTTP 201. The entity list used GET. The sign-out confirmation GET and entity-list HEAD both returned HTTP 200. After these safe requests, the admin session remained active and the fixture and authentication-event counts were unchanged.

**Supporting evidence**  
`app/api/auth/[...nextauth]/route.ts:1–4`, `node_modules/@auth/core/lib/index.js:26–65`, `app/api/admin/entities/route.ts:13–15`. See `http.ordinarySignIn`, `http.safeMethods`, `http.logout` and `http.provision` in [observations.json](observations.json).

**Limitations**  
The conclusion is confined to the listed paths and sampled operations.
