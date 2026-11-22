# HT-16 — Authorization at the trusted service layer

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-16 |
| ASVS requirement | `v5.0.0-8.3.1` · Level 1 |
| Result | **Pass** |
| Date and time | 19 November 2026, 11:42:49–11:42:58 CET, with source review during fieldwork |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ANON, ADMIN-A, TEACHER-A, PARENT-A and PARENT-B |

**Procedure**  
Trace the page and API entry points to server-side identity, role and relationship checks. Corroborate with the sampled role and record responses and the permitted ADMIN creation operations.

**Expected secure behavior**  
Trusted application code resolves identity, checks the role and, when required, checks the relationship before reading or writing protected data.

**Observed result**  
The application obtains identity from the backend session and reloads the active account and role from the database. Portal gates run before their data calls. The admin entity handler obtains its actor from `requireAdmin` before parsing or dispatching a write, and the management service enforces ADMIN again. The scoped student and group routes check the applicable relationships before their protected record reads. The approved role and record fixture observations match this server-side enforcement.

**Supporting evidence**  
`lib/auth/authorization.ts:9–50`, `app/[role]/[[...slug]]/page.tsx:12–21`, `app/api/admin/entities/route.ts:13–15`, `lib/services/management.service.ts:19–25, 73–91`, `app/api/students/[id]/route.ts:6` and `app/api/groups/[id]/route.ts:6`. See [HT-14](HT-14-evidence.md), [HT-15](HT-15-evidence.md) and `http.provision` in [observations.json](observations.json).

**Limitations**  
The sampled read requests exercised server enforcement. The mutation review used the source guard and authorized fixture creation as corroboration.
