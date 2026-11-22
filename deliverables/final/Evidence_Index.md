# Happy Town evidence index

Audited revision f23375fee54bae8942a1c23a702adb04ed6c99a2. The audit assessed the local synthetic environment on 19–22 November 2026. Preserve the historic date and evidence type when reading a working paper. The final workbook contains the current verdict for each sampled criterion.

[Final ASVS matrix](ASVS_Verification_Matrix.xlsx) · [Original evidence register](../../security-audit/evidence/evidence-register.md) · [Original execution record](../../security-audit/methodology/test-execution.md) · [Audited environment](../../security-audit/evidence/phase-3/environment.md)

## Requirement traceability

| Case and criterion | Final verdict | Evidence basis | Primary record | Supplemental record | Finding |
|---|---|---|---|---|---|
| HT-01 / v5.0.0-1.2.4 | Pass | Source + HTTP | [Working paper](../../security-audit/evidence/phase-3/HT-01-evidence.md) | — | — |
| HT-02 / v5.0.0-2.2.1 | Pass | Source + HTTP + database | [Working paper](../../security-audit/evidence/phase-3/HT-02-evidence.md) | — | — |
| HT-03 / v5.0.0-2.2.2 | Pass | Source + HTTP + database | [Working paper](../../security-audit/evidence/phase-3/HT-03-evidence.md) | — | — |
| HT-04 / v5.0.0-3.5.3 | Pass | Source + HTTP + counters | [Working paper](../../security-audit/evidence/phase-3/HT-04-evidence.md) | — | — |
| HT-05 / v5.0.0-6.1.1 | Fail | Documentation | [Working paper](../../security-audit/evidence/phase-3/HT-05-evidence.md) | [Follow-up](../../security-audit/evidence/reassessment/2026-11-19-documentation-review.md) | HT-F03 |
| HT-06 / v5.0.0-6.2.6 | Pass | Dynamic browser | [Working paper](../../security-audit/evidence/phase-3/HT-06-evidence.md) | — | — |
| HT-07 / v5.0.0-6.3.1 | Fail | Source + configuration + offline controls | [Working paper](../../security-audit/evidence/phase-3/HT-07-evidence.md) | [Follow-up](../../security-audit/evidence/supplementary/2026-11-21/final-adjudication-source-review.md) | HT-F03 |
| HT-08 / v5.0.0-6.3.2 | Pass | Source + configuration + database | [Working paper](../../security-audit/evidence/phase-3/HT-08-evidence.md) | — | — |
| HT-09 / v5.0.0-7.2.1 | Pass | Source + HTTP | [Working paper](../../security-audit/evidence/phase-3/HT-09-evidence.md) | — | — |
| HT-10 / v5.0.0-7.2.2 | Pass | Source + dynamic HTTP | [Working paper](../../security-audit/evidence/phase-3/HT-10-evidence.md) | — | — |
| HT-11 / v5.0.0-7.2.4 | Fail | Source verdict + dynamic corroboration | [Working paper](../../security-audit/evidence/phase-3/HT-11-evidence.md) | [Follow-up](../../security-audit/evidence/supplementary/2026-11-22/user-operated-devtools/HT11-UO-PW-playwright-observation.json) | HT-F01 |
| HT-12 / v5.0.0-7.4.1 | Fail | Source verdict + dynamic corroboration | [Working paper](../../security-audit/evidence/phase-3/HT-12-evidence.md) | [Follow-up](../../Happy-Town-Academic-Submission-2026-11-22/evidence/ordinary-logout-http.json) | HT-F01 |
| HT-13 / v5.0.0-8.1.1 | Fail | Documentation | [Working paper](../../security-audit/evidence/phase-3/HT-13-evidence.md) | [Follow-up](../../security-audit/evidence/reassessment/2026-11-19-documentation-review.md) | HT-F04 |
| HT-14 / v5.0.0-8.2.1 | Pass | Source + dynamic HTTP | [Working paper](../../security-audit/evidence/phase-3/HT-14-evidence.md) | [Follow-up](../../security-audit/evidence/supplementary/2026-11-21/chrome-native-devtools-captures/evidence-index.md) | — |
| HT-15 / v5.0.0-8.2.2 | Pass | Source + HTTP + database | [Working paper](../../security-audit/evidence/phase-3/HT-15-evidence.md) | [Follow-up](../../security-audit/evidence/supplementary/2026-11-21/submission-redactions/HT-15/README.md) | — |
| HT-16 / v5.0.0-8.3.1 | Pass | Source + dynamic corroboration | [Working paper](../../security-audit/evidence/phase-3/HT-16-evidence.md) | — | — |
| HT-17 / v5.0.0-14.2.1 | Fail | Source + dynamic browser | [Working paper](../../security-audit/evidence/phase-3/HT-17-evidence.md) | [Follow-up](../../security-audit/evidence/supplementary/2026-11-22/user-operated-devtools/evidence-index.md) | HT-F02 |

## Critical observations and limits

| Case | Corroboration | What remains unobserved |
|---|---|---|
| HT-07 | [Project Owner approval](../../security-audit/evidence/supplementary/2026-11-21/remaining-evidence/HT07-baseline-approval.md) · [Policy text](../../security-audit/evidence/supplementary/2026-11-21/remaining-evidence/HT07-operational-baseline.md) · [Source comparison](../../security-audit/evidence/supplementary/2026-11-21/final-adjudication-source-review.md) · [Offline provider results](../../security-audit/evidence/supplementary/2026-11-21/criterion-recheck/ht07-provider-results.txt) | Live denial, separate-account behavior and timed recovery. The source comparison applies from 21 November. |
| HT-11 | [Source trace](../../security-audit/evidence/supplementary/2026-11-20/ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md) · [Chronological Playwright record](../../security-audit/evidence/supplementary/2026-11-22/user-operated-devtools/HT11-UO-PW-playwright-observation.json) · [HT11-UO-01 publication excerpt](../../Happy-Town-Academic-Submission-2026-11-22/evidence/HT11-UO-01-headers-excerpt.png) | Acceptance of an exact superseded credential. The browser observation establishes continued access after an independent sign-in. |
| HT-12 | [Ordinary logout HTTP record](../../Happy-Town-Academic-Submission-2026-11-22/evidence/ordinary-logout-http.json) · [Signed-out Response capture](../../Happy-Town-Academic-Submission-2026-11-22/evidence/HT12-chrome-devtools.png) | Acceptance of the original pre-logout credential. The response represents an ordinary signed-out browser. |
| HT-14 | [Native function-level cases](../../security-audit/evidence/supplementary/2026-11-21/chrome-native-devtools-captures/evidence-index.md) | Unsampled functions and roles. |
| HT-15 | [Redacted record-level publication evidence](../../security-audit/evidence/supplementary/2026-11-21/submission-redactions/HT-15/README.md) | Unsampled data relationships. Original images remain in the audit workspace. |
| HT-17 | [HT17-UO-01 Headers excerpt](../../Happy-Town-Academic-Submission-2026-11-22/evidence/HT17-UO-01-headers-excerpt.png) · [HT17-UO-02 Response excerpt](../../Happy-Town-Academic-Submission-2026-11-22/evidence/HT17-UO-02-response-excerpt.png) · [Independent Playwright result](../../security-audit/evidence/supplementary/2026-11-22/user-operated-devtools/HT17-UO-PW-playwright-observation.json) | Downstream retention and disclosure. Headers show only a synthetic value. |

## Audited source locations

Line references refer to revision f23375fee54bae8942a1c23a702adb04ed6c99a2. Use Git to inspect that revision. The active working tree may be newer.

- HT-07 · auth.ts lines 23–48 invoke the guard and update failure state. lib/auth/login-rate-limit.ts lines 3–25 define the threshold, expiry and reset.
- HT-11 and HT-12 · auth.ts line 18 and lines 51–61 configure the JWT flow and callbacks. lib/auth/authorization.ts lines 9–16 verify the session and reload the account. The linked source record explains the installed sign-out code.
- HT-14 and HT-16 · app/api/admin/entities/route.ts lines 13–15 check ADMIN at the server API. The authorization module enforces session, roles and relationships.
- HT-17 · components/admin-database-portal.tsx line 45 serializes the search into a query. app/api/admin/entities/route.ts line 13 reads it under the admin guard. lib/repositories/admin.repository.ts lines 85–90 search contact fields.

## Integrity and attribution

- User-operated originals · 5/5 digests match. [Original SHA-256 manifest](../../security-audit/evidence/supplementary/2026-11-22/user-operated-devtools/SHA256SUMS.txt)
- Publication redactions · 6/6 digests match. [Original SHA-256 manifest](../../security-audit/evidence/supplementary/2026-11-21/submission-redactions/HT-15/SHA256SUMS.txt)
- Prior academic package · 19/19 digests match. [Original SHA-256 manifest](../../Happy-Town-Academic-Submission-2026-11-22/SHA256SUMS.txt)

The project owner supplied the user-operated captures. Publication excerpts limit the visible fields and preserve the original readings. The review used the saved records and did not add new runtime evidence.
