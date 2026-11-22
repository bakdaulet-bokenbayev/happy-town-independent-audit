# Documentation reassessment — 19 November 2026

**Evidence ID** RA-2026-11-19-DOC  
**Original fieldwork** 19 November 2026, approximately 11:39–11:47 CET  
**Reassessment and report revision** 19 November 2026, after fieldwork, documentation review only  
**Audit Subject** Happy Town at Git revision `f23375fee54bae8942a1c23a702adb04ed6c99a2`

The team relayed the professor’s feedback that required documentation gaps should be reported as findings when evidenced. The feedback governed how findings were reported. The application’s documentation was evaluated against the official ASVS criteria. No runtime checks were repeated. [Official ASVS 5.0.0 CSV](https://raw.githubusercontent.com/OWASP/ASVS/v5.0.0/5.0/docs_en/OWASP_Application_Security_Verification_Standard_5.0.0_en.csv)

## Inventory and method

1. Listed the complete tracked tree at the audited revision using `git ls-tree -r --name-only HEAD` and verified HEAD against the fieldwork record. The tree contained 187 tracked paths. Its only standalone text documentation files were the root `README.md` and `I18N_REMAINING.md`. No tracked application documentation or policy directory was present. Checked the workspace root for additional application documentation directories. The available audit scope, test plan and case records are working papers, which document the audit sample and expectations.
2. Read the README’s setup and authentication/authorization guidance (lines 24–30 and 48–69) and the localization QA notes. The README covers role provisioning, server checks, a hashed in-memory login-rate-limit key and general ownership checks. The localization QA record describes UI verification and translation excerpts. It supplies no application-wide authentication or authorization policy.
3. Compared the documentation against ASVS requirements `v5.0.0-6.1.1` and `v5.0.0-8.1.1`. Checked the sign-in configuration and guard in `auth.ts`, the limiter implementation in `lib/auth/login-rate-limit.ts`, and the role and relationship checks in `lib/auth/authorization.ts:17–52` for context. Compared these with the retained cases. The implementation helps identify relevant decision rules. The auditee documentation must describe the required rules and settings.

The assessment covers the audited revision and materials made available. A separate off-repository policy was outside the evidence submitted for this review. Each Fail identifies a concrete omission in the available audit subject documentation. [Original environment inventory](../phase-3/environment.md#source-and-documentation-inventory)

## Determinations

| Case and ASVS criterion | Original → revised | Evidence and reason |
| --- | --- | --- |
| HT-05 · `v5.0.0-6.1.1` | Inconclusive → **Fail** | The README names the hashed, in-memory limiter but omits its effective configuration, including the threshold/window and reset behavior, and how malicious account lockout is prevented. Setup and localization notes do not close these omissions. Applies to the documented control design. [P3-HT-05](../phase-3/HT-05-evidence.md) |
| HT-07 · `v5.0.0-6.3.1` | Inconclusive → **Inconclusive** | The sign-in source calls the limiter and resets it on success. The retained isolated module observations support threshold, key separation, reset and recovery behavior. A complete documented operating baseline for checking implementation alignment was unavailable. The HT-05 documentation Fail does not establish an implementation Fail. [P3-HT-07](../phase-3/HT-07-evidence.md) |
| HT-11 · `v5.0.0-7.2.4` | Inconclusive → **Inconclusive** | Separate sign-ins demonstrated distinct issuance. No additional evidence established a supported active-session replacement transition or backend invalidation during that transition. [P3-HT-11](../phase-3/HT-11-evidence.md) |
| HT-13 · `v5.0.0-8.1.1` | Inconclusive → **Fail** | The README summarizes guarded pages, ADMIN mutations and ownership checks. It leaves role-to-function rules and the resource attributes governing data access incomplete. Examples include current teacher assignments and active enrolments, and the handling of archived links and denied cases. The source and test plan describe or exercise examples, while the auditee documentation lacks the governing rules. [P3-HT-13](../phase-3/HT-13-evidence.md) |

HT-14, HT-15 and HT-16 retain **Pass** for the sampled access controls. Their working papers establish function-level, record-level and trusted-layer enforcement for the tested paths. They do not cover documentation completeness. The original HT-12 and HT-17 outcomes and evidence boundaries also stand. [HT-14](../phase-3/HT-14-evidence.md) · [HT-15](../phase-3/HT-15-evidence.md) · [HT-16](../phase-3/HT-16-evidence.md)

The reassessment changes two outcomes and adds two documentation findings. The final count is **11 Pass, 4 Fail and 2 Inconclusive**. The historic outcomes, evidence and original findings register remain available. The team also clarified that Bakdaulet Bokenbayev and Assel Karzhau co-developed Happy Town. Bakdaulet remains the Project Owner and original authorizing party. The professor accepted both co-developers participating in the academic self-assessment. [Pre-reassessment snapshot](../../history/2026-11-19-pre-reassessment/README.md) · [Audit Team and independence](../../audit-plan/audit-plan.md#participants-independence-and-ethics)
