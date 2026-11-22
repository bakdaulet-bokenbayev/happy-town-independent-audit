# HT-11 · Sequential authentication in isolated browser contexts

**Date:** 20 November 2026, 19:37 CET. Detailed observations use UTC.  
**ASVS criterion:** `v5.0.0-7.2.4`, Level 1.  
**Target:** `http://127.0.0.1:3302`, `happy_town_audit_test`, Git revision `f23375fee54bae8942a1c23a702adb04ed6c99a2`.  
**Result:** Both independently created TEACHER-A sessions retained access. **Inconclusive for the replacement and termination requirement as a dynamic test.**

## Identity and procedure

A read-only query scoped to the clone confirmed one active, non-archived TEACHER account with a password hash and exactly one matching the displayed name supplied by the user. Playwright authenticated using the local TEACHER-A fixture in both fresh contexts. The returned display names matched the supplied name, both reported TEACHER, and their internal user IDs matched. The evidence stores the fixture alias and the comparison results. It contains no names, identifiers or credential values.

Context A started anonymous and completed a normal Credentials sign-in using the English form. Its initial protected page loaded before context B was created. Context B started anonymous and completed a second normal Credentials sign-in with the same fixture. After that, B and then A made fresh navigations to the same protected page in their original contexts. The script checked the protected page response, its rendered dashboard heading, and the authenticated identity. Each context retained its own browser state throughout. No browser credential was read, copied, transferred, fingerprinted or persisted.

## Observations

| Context and step | Request | UTC | Status | Authenticated user | Result |
| --- | --- | --- | --- | --- | --- |
| A sign-in | POST `/api/auth/callback/credentials` | 18:37:45.316 | 200 | TEACHER-A | Authenticated |
| A baseline | GET `/teacher` | 18:37:45.977 | 200 | TEACHER-A | Accepted |
| B sign-in | POST `/api/auth/callback/credentials` | 18:37:47.934 | 200 | TEACHER-A | Authenticated |
| B after second sign-in | GET `/teacher` | 18:37:48.541 | 200 | TEACHER-A | Accepted |
| A after second sign-in | GET `/teacher` | 18:37:48.949 | 200 | TEACHER-A | Accepted |

The initial session lookups for A and B returned HTTP 200 with no authenticated user. The session lookups after both sign-ins and for all three protected-page checks returned HTTP 200 with TEACHER-A. For both post-sign-in checks, the browser remained on `/teacher` and rendered the protected dashboard. The screenshots were captured separately at 1440 × 1000. Their hashes match because both views rendered the same dashboard with the same capture-time masks. Their separate context labels and timestamps are recorded in the HTTP observations.

## Interpretation

The second independent authentication did not end the session already active in context A. This establishes concurrent access for the same account in the sampled environment. Context B had no current authenticated session to replace when it signed in. V7.2.4 requires termination of the current token during an applicable replacement transition. This test does not establish how the backend treats a superseded token from re-authentication in an already authenticated context. It also does not compare exact token values, since ordinary Auth.js reads may refresh them. The two protected HTTP 200 results therefore provide sufficient evidence of concurrent access and insufficient dynamic evidence for either PASS or FAIL on V7.2.4.

The separate [static analysis](../ht11-static-review/HT11-static-analysis.md) recommends FAIL on implementation grounds because it found no server-side termination decision in the same-session authentication path. This working paper records the browser observation separately and proposes no canonical status or finding changes.

## Isolation and artifacts

The loopback listener remained on PID 35572 and matched the existing process-to-database attestation. The audited worktree remained clean at the specified commit. The clone audit log count increased from 45 to 47, with two successful TEACHER login events during this run. No account, schema or application source changes were made. No connections to the original database or production were made. SHA-256 checks on the existing final Markdown, PDF, PowerPoint, verification matrix and findings register matched preflight.

- [Playwright execution script](HT11-sequential-playwright.cjs)
- [Sanitized HTTP observations](HT11-http-observations.json)
- [Context A dashboard](HT11-context-A-after.png) and [Context B dashboard](HT11-context-B-after.png)
- [SHA-256 manifest](SHA256SUMS.txt)
