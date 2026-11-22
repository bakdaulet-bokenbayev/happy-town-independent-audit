# Happy Town remaining checks and evidence review

**Review date** 20 November 2026, Europe/Budapest  
**Revision** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Scope** Read-only fixture and evidence review for the instance on port 3302 and its database `happy_town_audit_test`.

| Check | What the evidence establishes | Remaining limitation |
| --- | --- | --- |
| HT-17 · v5.0.0-14.2.1 | Original Phase 3 fieldwork observed `GET /api/admin/entities` with the `kind` and `query` parameters. The response was HTTP 200. The retained flags record a synthetic email in the URL and a match to the fixture. The HTTP fieldwork window was 19 November 2026, 11:42:49.702–11:42:58.247 CET. The earlier clone run separately observed HTTP 200 for a neutral text filter. | The exact email, raw URL and individual request timestamp were not retained in the historical export. The clone contains one active teacher contact in the synthetic domain. No exact-email submission or new Network screenshot was made in this review. |
| HT-12 · v5.0.0-7.4.1 | The audited version uses Auth.js JWT sessions. The reviewed logout path clears the session cookie and the application configuration contains no per-session revocation hook. During the earlier clone run, ordinary sign-out returned HTTP 200. The same browser context then received HTTP 200 from `/api/auth/session` with no authenticated user at 16:14:51.163 CET on 20 November 2026. | Server acceptance or rejection of the prior session remains unobserved. No cookie or JWT was retrieved, copied, restored or replayed. The ordinary sign-out evidence covers only that browser's signed-out state. |
| HT-15 · PARENT-C supplementary positive control | A read-only database query confirmed that the active fixture is linked to STU-02. The row has neither a login identifier nor a password hash. The seed code provisions the parent sign-in fields only for the first parent, PARENT-A. The local parent seed configuration contains no separate PARENT-C entry. | There are no usable credentials for PARENT-C in the inspected fixtures. Its authenticated positive control could not run. Account records, passwords and links were left unchanged. |

The review did not repeat HT-14 or the completed PARENT-A tests. It created no new browser screenshots because it did not rerun the browser scenarios. The existing images below establish the previously observed neutral text filter and ordinary logout, within the limits stated in the table.

| Prior capture | Evidence boundary | Verified SHA-256 |
| --- | --- | --- |
| [PW-3302-HT-17-text-filter.png](PW-3302-HT-17-text-filter.png) | Neutral text filter only | `c09875ef9f34a6a30855dec5626bdfd48dd66846fc994e94621313b21350dd49` |
| [PW-3302-HT-12-signed-out.png](PW-3302-HT-12-signed-out.png) | English sign-in form after ordinary logout | `9f2a4d50e3a8686581ce5c625145d63c7b1e6c9024879709a94f67ca82094ec6` |
## Integrity

All 32 original table fingerprints matched the recorded baseline. All 32 test table fingerprints matched before and after this review. The test audit log remained at 28 rows. Both application listener PIDs matched the prior record and the isolated worktree remained clean at the audited revision. This review made zero database writes and saved zero credentials or session values. The original evidence and existing audit verdicts, risk ratings and deliverables were preserved.

[Sanitized evidence and read-only verification](remaining-checks-observations.json) · [Previous Playwright execution](clone-playwright-execution.md) · [Original HTTP evidence](../../../phase-3/observations.json)
