# HT-13 — Documented function and record permissions

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-13 |
| ASVS requirement | `v5.0.0-8.1.1` · Level 1 |
| Result | **Inconclusive** |
| Date and time | 19 November 2026, during Phase 3 source and documentation review |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ANON, ADMIN, TEACHER, PARENT and Project Owner as documentation owner |

**Procedure**  
Review the tracked repository documentation for role rules and resource attributes. Compare its detail to the portal, admin entity, student and group scope.

**Expected secure behavior**  
Application authorization documentation defines allowed and denied functions and records by role and relevant resource attributes.

**Observed result**  
The repository README states that admin mutations require ADMIN and that parent/student and teacher/group/student reads use ownership checks. It does not provide detailed role and relationship rules for every sampled read and portal. The audit scope and test plan spell out fixture expectations based on the application, but no separate owner-maintained authorization specification or completeness confirmation was available.

**Supporting evidence**  
`README.md:48–57, 61–70`; [application overview](../../methodology/application-overview.md) and [audit scope](../../methodology/audit-scope.md) for the planning comparison. See the [tracked documentation inventory](environment.md#source-and-documentation-inventory).

**Limitations**  
The available repository documentation is partial, and the existence and contents of any separate owner-maintained access specification are unverified.
