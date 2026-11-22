# Happy Town isolated database and Playwright execution

**Original audit revision:** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Isolated application:** `http://127.0.0.1:3302`, Next.js 16.2.12, detached clean worktree  
**Isolated PostgreSQL database:** `happy_town_audit_test`  
**Clone created:** 20 November 2026, 16:11:23 CET (15:11:23 UTC)

## Environment and provenance

Read-only checks found the development seed marker, 23 deterministic seed accounts, 24 seed students and one previously documented synthetic archived parent and student pair. The archived pair and its link were consistent with the creation and cleanup history. No unexpected contact domain was present in the account records. This verification used counts, fixture patterns and the original fieldwork record. It retained no personal details.

The database was created locally and restored from a consistent PostgreSQL dump of the original. The dump streamed directly to the new database. No dump file was retained. Counts and full-row fingerprints initially matched across 32 public tables, including 24 accounts, 25 students, 25 parent–student links, 17 audit entries and eight migration entries. The comparison covered stored credential hashes without displaying them. No migrations, seeding or cleanup ran against the original.

A separate loopback process served the exact audited revision. The runtime connection attestation identified the clone using the actual port 3302 server PID. Both configured database URLs resolve to the clone at `127.0.0.1:55432`. The JWT strategy and application configuration were preserved, with a distinct session secret and the new loopback origin for isolation.

## Execution results

Playwright 1.62.1 used Chromium 157.0.8103.79 in fresh contexts, with a 1440 × 1000 viewport and the English locale. All successful sign-ins used the existing synthetic fixtures. The credentials callback and session lookup returned HTTP 200 for ADMIN, TEACHER and PARENT. Each session reported the intended role and reached its own dashboard.

| Test | Source and fixture corroboration | Actual browser and HTTP observations | Coverage |
| --- | --- | --- | --- |
| HT-14 · v5.0.0-8.2.1 | The management handler calls the administrator guard before reading entities. The clone retained all three seeded logins. | ADMIN navigated to Teachers. The listener observed `GET /api/admin/entities` with the teachers filter, HTTP 200 and items. TEACHER and PARENT each reached their own dashboard. | Authorized management read completed. Direct TEACHER and PARENT management-resource comparisons were outside this run. |
| HT-15 · v5.0.0-8.2.2 | The route checks the parent relationship before loading a student. The cloned relationship rows matched the original. PARENT-A is linked to STU-01 and PARENT-C is linked to STU-02. | PARENT-A requested its linked STU-01. The observed GET returned HTTP 200 and a student object that matched the fixture. The repeat used to capture the sanitized crop returned the same result. | Own-student read completed. Cross-parent request and second authenticated parent comparison were outside this run. |
| HT-17 · v5.0.0-14.2.1 | The audited client constructs a GET query parameter and the repository includes email in its match criteria. Original fieldwork recorded the synthetic-email URL behavior. | ADMIN entered the non-sensitive term `A` on the Teachers page. The GET included the query parameter, returned HTTP 200 and contained items. | Ordinary text-filter check completed. Email was not submitted, so this run does not independently confirm email in a URL. |
| HT-12 · v5.0.0-7.4.1 | The inspected Auth.js JWT logout path clears the cookie with no per-session revocation check in the application. | TEACHER's ordinary POST sign-out returned HTTP 200. The first run did not capture the landing state. In a follow-up, the same browser context returned HTTP 200 from the session endpoint without a user and HTTP 200 from the English login page. | Ordinary logout and signed-out state confirmed. No earlier session artifact was preserved or replayed, and no reuse result was obtained. |

The runtime checks covered ordinary sign-in, authorized reads and sign-out. Existing audit conclusions remain based on their original evidence. The partial checks in this run add no new case verdict or risk rating.

## Writes and integrity after execution

The copied `audit_logs` table grew from 17 to 22 rows. The only new writes were five `LOGIN / Authentication / SUCCESS` records: one ADMIN, two TEACHER and two PARENT. The extra TEACHER and PARENT logins were for logout confirmation and the response capture. Previously copied audit records and the other 31 tables matched their initial fingerprints. All 32 original tables matched their baseline. The original service remained on port 3301 with PID 34128 and the clone on port 3302 with PID 35572. The test worktree remained clean.

[Sanitized browser observations](clone-browser-observations.json) · [Creation and integrity record](clone-integrity.json) · [Original working papers](../../../phase-3/observations.json)

## Playwright screenshots

These are direct Playwright crops of the live browser, visually inspected for sensitive content. No screenshot depicts Chrome DevTools. HTTP status and role attribution are in the JSON observations. The STU-01 crop stops before any student field values.

| Capture | What it shows | Captured UTC | SHA-256 |
| --- | --- | --- | --- |
| [PW-3302-english-login.png](PW-3302-english-login.png) | English sign-in form before credential entry | 11/20/2026 15:14:00 | `9f2a4d50e3a8686581ce5c625145d63c7b1e6c9024879709a94f67ca82094ec6` |
| [PW-3302-admin-dashboard.png](PW-3302-admin-dashboard.png) | ADMIN dashboard heading | 11/20/2026 15:14:04 | `59b84422eccc5c5175315f405870c45edab4c29535f433a9943cd430aaf98eeb` |
| [PW-3302-HT-14-admin-view.png](PW-3302-HT-14-admin-view.png) | HT-14 authorized teacher-management view | 11/20/2026 15:14:06 | `a3dae9f97b05a10dcc34d1f9cbc2d3ec5deb5bd13dd2b16a2f06cb04d9bdb6e4` |
| [PW-3302-HT-17-text-filter.png](PW-3302-HT-17-text-filter.png) | HT-17 non-sensitive text filter only | 11/20/2026 15:14:06 | `c09875ef9f34a6a30855dec5626bdfd48dd66846fc994e94621313b21350dd49` |
| [PW-3302-teacher-dashboard.png](PW-3302-teacher-dashboard.png) | TEACHER dashboard heading | 11/20/2026 15:14:09 | `5cd5e1d211980dc37ef4ee768d06ce70ae5112bb70b9bbf2855c6761460de67d` |
| [PW-3302-parent-dashboard.png](PW-3302-parent-dashboard.png) | PARENT dashboard heading | 11/20/2026 15:14:12 | `9f244b2bba6e37ea81f56040e60998a9e166956f465097f819e6a32883b55597` |
| [PW-3302-teacher-logout-before.png](PW-3302-teacher-logout-before.png) | TEACHER dashboard heading | 11/20/2026 15:14:50 | `5cd5e1d211980dc37ef4ee768d06ce70ae5112bb70b9bbf2855c6761460de67d` |
| [PW-3302-HT-12-signed-out.png](PW-3302-HT-12-signed-out.png) | English form after ordinary logout in the same context | 11/20/2026 15:14:51 | `9f2a4d50e3a8686581ce5c625145d63c7b1e6c9024879709a94f67ca82094ec6` |
| [PW-3302-parent-own-student-before.png](PW-3302-parent-own-student-before.png) | PARENT dashboard heading | 11/20/2026 15:16:07 | `9f244b2bba6e37ea81f56040e60998a9e166956f465097f819e6a32883b55597` |
| [PW-3302-HT-15-own-response.png](PW-3302-HT-15-own-response.png) | Own-student response prefix only, with values outside crop | 11/20/2026 15:16:07 | `f92680f7fa97b1e38100579cc1f06fdb914a3857abd18ef7b8bc92dc20ec64d3` |
