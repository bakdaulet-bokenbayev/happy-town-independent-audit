# HT-14 — Function-level authorization

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-14 |
| ASVS requirement | `v5.0.0-8.2.1` · Level 1 |
| Result | **Pass** |
| Date and time | 19 November 2026, 11:42:49–11:42:58 CET |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ANON, ADMIN-A, TEACHER-A and PARENT-A |

**Procedure**  
Compare allowed own-role portal access with the selected denied page and API cases. Check HTTP status, redirect path and protected content presence.

**Expected secure behavior**  
The sampled functions are available only to permitted roles. Denied callers receive an appropriate sign-in or permission response without protected content.

**Observed result**  
Each authenticated user received 200 with main content on its own portal. ADMIN-A received 200 with items from the sampled management API. ANON at `/admin` received 307 to `/login` and received 401 from the management API. TEACHER-A at `/admin` received 307 to `/teacher`; TEACHER-A and PARENT-A received 403 from the management API. The denied responses contained no tested admin portal or entity payload.

**Supporting evidence**  
`app/[role]/[[...slug]]/page.tsx:12–21`, `app/teacher/page.tsx:1–2`, `app/parent/page.tsx:1–2`, `app/api/admin/entities/route.ts:13–15` and `lib/auth/authorization.ts:17–38`. See `http.portalBaseline` and `http.roles` in [observations.json](observations.json).

**Limitations**  
The signed-out `/teacher` behavior observed in the separate logout case is recorded in [HT-12](HT-12-evidence.md).
