# HT-15 — Record-level authorization

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-15 |
| ASVS requirement | `v5.0.0-8.2.2` · Level 1 |
| Result | **Pass** |
| Date and time | 19 November 2026, 11:42:49–11:42:58 CET |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | PARENT-A, PARENT-B, TEACHER-A, ADMIN-A and ANON |

**Procedure**  
Confirm both parent relationships and the teacher assignments independently in the audit database. Use ordinary read-only fixture requests against the scoped student and group functions and verify status and protected record presence.

**Expected secure behavior**  
Only roles with explicit permission for a selected record receive it. A denied case discloses no protected record.

**Observed result**  
Both parents received 200 and student data for their own linked synthetic student. Both cross-parent checks returned 404 without student data. The teacher received 200 with data for the assigned student and group and 404 without data for the unassigned student and group. The parent group request returned 404 without group data, and ANON received 401 without student data. ADMIN-A received 200 with the selected records used as denied-case positive controls.

**Supporting evidence**  
`app/api/students/[id]/route.ts:6`, `app/api/groups/[id]/route.ts:6`, `lib/auth/authorization.ts:40–50`. See `http.relationships`, `http.parentBSignIn` and `http.recordFixtures` in [observations.json](observations.json).

**Limitations**  
Fixture provisioning and soft archive happened outside the read comparison. The result covers the sampled relationships and read routes.
