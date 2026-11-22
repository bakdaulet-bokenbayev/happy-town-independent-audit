# Remaining evidence gaps

**HT-07** remains Inconclusive. HT-05 and HT-13 are documentation Fail outcomes. The independent source review determined **HT-11 — Fail (source-based)**. The separate HT-11 Dynamic Replay Test remains Inconclusive. Original fieldwork decisions are preserved. [Documentation reassessment](../evidence/reassessment/2026-11-19-documentation-review.md) · [HT-11 source determination](../evidence/supplementary/2026-11-20/ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md) · [Verification matrix](../asvs/verification-matrix.csv)

## 21 November follow-up

The five offline provider checks covered denial before lookup, failure recording, reset after success and clock-based recovery. An unauthenticated `GET /login` returned HTTP 200 on the isolated listener and established page availability. The operating baseline was later approved on 21 November. The prospective comparison is Fail. The missing evidence is full live limiter behavior. HT-11 still requires the protected-route status and protected-content outcome attributable to the superseded session after the second successful sign-in. Replay execution was outside the permitted work for this follow-up. [Per-criterion verification](../evidence/supplementary/2026-11-21/criterion-recheck/review.md) · [HT-07 terminal results](../evidence/supplementary/2026-11-21/criterion-recheck/ht07-provider-results.txt) · [Public HTTP record](../evidence/supplementary/2026-11-21/criterion-recheck/ht07-public-http.json)

## HT-07 — Implementation of credential-abuse defenses

**ASVS** `v5.0.0-6.3.1`. The sign-in source shows the limiter call and success reset. An isolated module check supports threshold, key separation, reset and recovery behavior. No approved baseline was available during fieldwork. Approval took effect on 21 November. The audited threshold and recovery differ from the approved rules, and complete live sign-in integration remains unobserved. [HT-07 working paper](../evidence/phase-3/HT-07-evidence.md) · [HT-F03 corrective action](remediation-plan.md#ht-f03--document-credential-abuse-protection)

## HT-11 — Session replacement on authentication

**ASVS** `v5.0.0-7.2.4`. **Criterion result: Fail (source-based). Dynamic Replay Test: Inconclusive.** The audited Credentials flow issues a new JWT without terminating the prior JWT in server-side validation. Playwright confirmed the second login and protected access in the original context. The prior JWT was not submitted after the second login. The remaining gap is direct dynamic evidence of the server's treatment of the superseded token. [Original working paper](../evidence/phase-3/HT-11-evidence.md) · [Source determination](../evidence/supplementary/2026-11-20/ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md) · [Dynamic disposition](../evidence/supplementary/2026-11-20/ht11-final-dynamic-20261120T212722Z/HT11-final-dynamic-execution.md)

## Disposition after baseline approval

The Project Owner approved HT07-BASELINE-v0.1 for the isolated revision on 21 November 2026. HT-07’s original Inconclusive result is preserved. The prospective configuration comparison is Fail because the audited threshold and recovery differ from the approved specification. The live throttle sequence, account separation, reset and timed recovery still need redacted integration evidence. HT-11 now has a renewed two-context observation of concurrent access. Same-context replacement and logout still lack an observed outcome for the earlier session. The source findings remain open. No new native DevTools captures were obtained for these three tests. [Approval](../evidence/supplementary/2026-11-21/remaining-evidence/HT07-baseline-approval.md) · [Working paper](../evidence/supplementary/2026-11-21/remaining-evidence/working-paper.md)

## Final evidence disposition

Full live limiter behavior and both earlier-session acceptance outcomes remain unobserved. The approved HT-07 configuration comparison is Fail. HT-11 and HT-12 retain their source-based Fail decisions. [Procedure, results and scope limits](../evidence/supplementary/2026-11-21/remaining-evidence/final-evidence-disposition.md)

[Final per-test evidence index](../evidence/supplementary/2026-11-21/final-dynamic-validation/evidence-index.md)
