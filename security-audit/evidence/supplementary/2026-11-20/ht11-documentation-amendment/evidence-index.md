# HT-11 · Documentation amendment evidence index

**Audit date:** 20 November 2026  
**Audited revision:** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Criterion:** `v5.0.0-7.2.4`, Level 1  
**Determination:** **FAIL (source-based)**  
**Dynamic Replay Test:** **INCONCLUSIVE**. The previously issued JWT was not submitted after re-authentication, so there is no recorded acceptance or rejection of it.

The approved amendment is applied to the canonical verification matrix, evidence-gap record and Markdown final report. The resulting 17 criteria comprise 11 Pass, 5 Fail and 1 Inconclusive. HT-07 is the remaining inconclusive criterion. HT-F01 remains the registered logout finding with its existing risk rating. HT-11 records the related re-authentication deviation, and the register retains four findings.

## Capture method and provenance

All 16 images are actual Windows Computer Use captures from Visual Studio Code in Restricted Mode. The editor displayed temporary views produced from tracked files at the audited commit, the lockfile-matched installed Auth.js dependency, the amended canonical files, and actual Git and validation output. Original source and document line numbers appear in those views. Long lines wrap for readability, and the CSV view shows parsed fields from its canonical row. The captures were exported from the native JPEG return format to PNG at 1536 by 816 with no crop, markup or pixel adjustment. The screenshots supplement the underlying sources and the preserved HTTP evidence.

[Independent source determination](../ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md) · [Preserved Playwright execution](../ht11-same-context-20261120T190133Z/HT11-same-context-execution.md) · [Dynamic test disposition](../ht11-final-dynamic-20261120T212722Z/HT11-final-dynamic-execution.md)

## Screenshot register

| File | Demonstrates | Source or section | Claim and limitation |
| --- | --- | --- | --- |
| [01-auth-configuration.png](01-source-review/01-auth-configuration.png) | Auth.js JWT strategy and Credentials provider | `auth.ts:14–37` | Shows the configured JWT strategy and Credentials validation path. It contains variable names only. |
| [02-successful-reauthentication.png](01-source-review/02-successful-reauthentication.png) | Credentials success path and audit-log write | `auth.ts:33–51,66–72` | Shows account and password checks, the login audit event and identity return. Revocation absence follows from the wider review. The live successful sign-in is documented in the preserved Playwright evidence. |
| [03-jwt-issuance.png](01-source-review/03-jwt-issuance.png) | Fresh encrypted JWT on sign-in | `node_modules/@auth/core/lib/actions/callback/index.js:258–268` and `node_modules/@auth/core/jwt.js:49–60` | Shows the encode call, issued-at, expiry and fresh `jti`. Issuance alone does not establish termination. |
| [04-jwt-validation.png](01-source-review/04-jwt-validation.png) | JWT decoding and identity mapping | `node_modules/@auth/core/lib/actions/session.js:21–32`, `node_modules/@auth/core/jwt.js:63–68` and `auth.ts:55–62` | Shows the selected JWT decoder and callbacks. The complete validation trace in the source determination establishes the absence of a replacement check. |
| [05-protected-route-authorization.png](01-source-review/05-protected-route-authorization.png) | Protected teacher guard | `lib/auth/authorization.ts:9–30` and `app/teacher/page.tsx:1–2` | Shows `auth()`, the active-account check, current role enforcement and the protected route. It is source evidence. |
| [06-session-storage-and-revocation-review.png](01-source-review/06-session-storage-and-revocation-review.png) | Schema, login migration and scoped search results | `prisma/schema.prisma:177–182,809–819` and `prisma/migrations/20260804000000_auth_audit_actions/migration.sql:1–2` | Shows schema excerpts and two no-match search results. The conclusion relies on those results together with inspection of the full enforcement path and migrations. |
| [07-verification-matrix-ht11.png](02-audit-document-updates/07-verification-matrix-ht11.png) | HT-11 matrix row and its three references | `security-audit/asvs/verification-matrix.csv:12` | The editor view displays selected parsed fields from the actual CSV row. Final criterion status is Fail. |
| [08-evidence-gaps-summary.png](02-audit-document-updates/08-evidence-gaps-summary.png) | Criterion result and remaining replay gap | `security-audit/findings/evidence-gaps.md`, introduction and HT-11 section | Shows HT-07 Inconclusive, HT-11 source-based Fail and the separate dynamic limit. |
| [09-final-report-executive-summary.png](02-audit-document-updates/09-final-report-executive-summary.png) | Final and historical totals | `security-audit/reports/final-audit-report.md`, §3 | Shows the amended totals and the source-based conclusion alongside the preserved original counts. |
| [10-final-report-verification-results.png](02-audit-document-updates/10-final-report-verification-results.png) | Final outcome table and dynamic gap | Final report §12 | Shows 11 Pass, 5 Fail and 1 Inconclusive and keeps the original fieldwork column visible. |
| [11-final-report-ht11-traceability.png](02-audit-document-updates/11-final-report-ht11-traceability.png) | The link to HT-F01 with distinct triggers | Final report §13 | Shows HT-F01 as the logout finding with its original rating and HT-11 as a separate re-authentication criterion failure. The register still contains four findings. |
| [12-final-report-corrective-actions.png](02-audit-document-updates/12-final-report-corrective-actions.png) | Treatment and closure evidence | Final report §15 | Shows the existing logout treatment and separate proof required to close the re-authentication deviation. These are proposed actions. |
| [13-final-report-conclusion.png](02-audit-document-updates/13-final-report-conclusion.png) | Conclusion and criterion traceability | Final report §§16 and 18 | Shows the source-based conclusion and the Inconclusive dynamic test in the traceability row. |
| [14-git-diff-review.png](03-validation/14-git-diff-review.png) | Scoped Git diff and selected added lines | `git diff --no-index` of three before and after canonical snapshots | Shows the three-file scope and excerpts from the actual Git diff. The complete diff is attached separately. |
| [15-validation-results.png](03-validation/15-validation-results.png) | Result counts, traceability and consistency | CSV parser, link and anchor checks, hashes and `git diff --check` | Shows actual validation output. Because the files are untracked, whitespace analysis also used the scoped no-index comparison. |
| [16-evidence-integrity.png](03-validation/16-evidence-integrity.png) | Screenshot listing and SHA-256 verification | Package directory and SHA-256 manifest | Shows manifest verification before this screenshot was added. The final manifest was regenerated and verified with this screenshot included. |

## Search scope and integrity

The source searches ran against the audited Git tree with `git grep -i -l -E`. They covered `auth.ts`, `lib`, `app`, `worker`, `types` and `next.config.ts`, plus `prisma/schema.prisma`, `prisma/migrations` and `db`. Both scoped searches found no matching files for the recorded identifiers, including `jti`, session registries, revocation, token or session versions and issued-at cutoffs. The separately inspected Auth.js dependency does generate `jti`. The no-match results supplement the direct review of issuance, session validation, route authorization and the tracked schema. [Search terms and output](01-source-review/source-search-results.txt)

The canonical audit files are untracked in this Git checkout. The scoped comparison used byte-for-byte before and after snapshots of the three changed files only. It shows 3 files changed, 15 insertions and 10 deletions, with no whitespace diagnostics. [Complete scoped Git diff](03-validation/canonical-amendment.diff) · [Validation output](03-validation/validation-results.txt)

[SHA-256 manifest](SHA256SUMS.txt) covers all files in this evidence directory except the manifest itself. Its paths are relative to this directory. The final verification includes the integrity screenshot.
