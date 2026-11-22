# HT-08 — Default application accounts

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-08 |
| ASVS requirement | `v5.0.0-6.3.2` · Level 1 |
| Result | **Pass** |
| Date and time | 19 November 2026, 11:42:49–11:42:58 CET, with source review during fieldwork |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ADMIN-A, TEACHER-A, PARENT-A and audit-provisioned PARENT-B |

**Procedure**  
Inspect the committed development seed and bootstrap paths. Reconcile the dedicated database against the expected deterministic seed account IDs and count usable credentials by role without retaining identifiers or hashes.

**Expected secure behavior**  
Enabled default accounts are absent. Active fixture logins are attributable to explicit operator-supplied provisioning.

**Observed result**  
The seed obtains the three fixture logins from operator-supplied environment values and hashes the supplied passwords. The remaining seeded identities have no enabled credential pair. The baseline inventory was one ADMIN, four TEACHER and 18 PARENT rows, with exactly one usable login per role, each matched to the expected seed account. PARENT-B was created for this run using a freshly generated synthetic credential and was disabled and archived afterwards.

**Supporting evidence**  
`prisma/seed.ts:22–26, 58–84, 152–185, 275–285`. See `http.database`, `http.provision` and `http.cleanup` in [observations.json](observations.json).

**Limitations**  
Inventory reflects the dedicated audit database at the start of fieldwork and the single added synthetic account.
