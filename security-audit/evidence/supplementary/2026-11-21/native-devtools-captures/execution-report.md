# Native Chrome DevTools execution report

**Date:** 21 November 2026 CET.  
**Result:** Native capture blocked before new browser fieldwork. **0 of 12** requested screenshots.

## Verified environment

- Git HEAD resolved to `f23375fee54bae8942a1c23a702adb04ed6c99a2` in the clean isolated worktree.
- Windows associated the `127.0.0.1:3302` listener with `node.exe` PID 35572. Its command line referenced the exact worktree and its parent PID 23584 matched the recorded launcher. The process start was 20 November 2026 at 16:12:35 CET. The retained startup attestation identifies that listener as using `happy_town_audit_test`.
- PostgreSQL 17.10 was published on host loopback only. A transaction in read-only mode independently returned `happy_town_audit_test` from `current_database()`. It confirmed the existing synthetic ADMIN, TEACHER and PARENT-A accounts. It confirmed the PARENT-A relationship to STU-01, the absence of a PARENT-A relationship to STU-02 and an active relationship from another parent to STU-02.
- Installed Google Chrome version was 157.0.8103.79. Computer Use could enumerate the Chrome window, but access stopped before opening DevTools.

## Exact blocker and result

The required native window control returned **“Computer Use was not approved to use Google Chrome.”** Access was requested in the conversation. A retry after waiting returned the same error. No approval was observed. No authentication or HTTP test was repeated in this capture attempt. No screenshot was created or hashed.

The [evidence index](evidence-index.md) identifies all six scenarios and their earlier observed HTTP results. Those results remain valid for the earlier run and provide no new screenshot evidence for this attempt.

This activity used read-only verification against the isolated instance and its audit clone. Production and the original audit database were outside the activity. The audit report, verification matrix, findings register, risk ratings, PowerPoint and session-audit verdicts were preserved. All twelve native screenshots remain outstanding pending Chrome access.