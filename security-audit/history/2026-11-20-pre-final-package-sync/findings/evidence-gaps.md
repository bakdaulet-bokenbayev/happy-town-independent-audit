# Remaining evidence gaps

**HT-07** remains Inconclusive. HT-05 and HT-13 are documentation Fail outcomes. The independent source review determined **HT-11 — Fail (source-based)**. The separate HT-11 Dynamic Replay Test remains Inconclusive. Original fieldwork decisions are preserved. [Documentation reassessment](../evidence/reassessment/2026-11-19-documentation-review.md) · [HT-11 source determination](../evidence/supplementary/2026-11-20/ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md) · [Verification matrix](../asvs/verification-matrix.csv)

## HT-07 — Implementation of credential-abuse defenses

**ASVS** `v5.0.0-6.3.1`. The sign-in source shows the limiter call and success reset. An isolated module check supports threshold, key separation, reset and recovery behavior. A complete approved operating baseline was unavailable, and the isolated check does not establish the full sign-in or deployment behavior. Obtain the effective security specification and compare it with the configuration and representative authentication integration evidence. [HT-07 working paper](../evidence/phase-3/HT-07-evidence.md) · [HT-F03 corrective action](remediation-plan.md#ht-f03--document-credential-abuse-protection)

## HT-11 — Session replacement on authentication

**ASVS** `v5.0.0-7.2.4`. **Criterion result: Fail (source-based). Dynamic Replay Test: Inconclusive.** The audited Credentials flow issues a new JWT without terminating the prior JWT in server-side validation. Playwright confirmed the second login and protected access in the original context. The prior JWT was not submitted after the second login. The remaining gap is direct dynamic evidence of the server's treatment of the superseded token. [Original working paper](../evidence/phase-3/HT-11-evidence.md) · [Source determination](../evidence/supplementary/2026-11-20/ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md) · [Dynamic disposition](../evidence/supplementary/2026-11-20/ht11-final-dynamic-20261120T212722Z/HT11-final-dynamic-execution.md)
