# HT-07 operational security baseline

**Document** HT07-BASELINE-v0.1  
**State** Approved by the Project Owner  
**Proposed on** 21 November 2026 CET  
**Effective** 21 November 2026 CET, from approval recorded in RV-HT07-POLICY  
**Scope** Happy Town password sign-in on the isolated audit build at revision `f23375fee54bae8942a1c23a702adb04ed6c99a2`. Any additional deployment topology requires its own scope and evidence.

## Security objective and rationale

Limit repeated password verification against one account while preserving sign-in for unrelated users and providing a predictable recovery path. Teacher and administrator accounts can access school records, which warrants a low threshold. Families and staff may share network addresses, which warrants separate account budgets. A time-limited pause and a verified recovery route limit the availability impact of malicious lockout. NIST's throttling guidance informs these design choices. The settings below are the approved Happy Town policy for this follow-up. [NIST SP 800-63B-4, Rate Limiting](https://pages.nist.gov/800-63-4/sp800-63b.html#rate-limiting-throttling) · [OWASP ASVS 5.0.0](https://asvs.owasp.org/downloads/)

## Approved acceptance criteria

| Control | Approved expected behavior | Required evidence |
| --- | --- | --- |
| Threshold | Record failed password verifications against the normalized account identity. The sixth failed verification within a rolling 15-minute window starts a 15-minute pause measured from that failure. | Redacted server outcomes and elapsed times distinguish password verification from a throttle decision. |
| Denial | During the pause, deny sign-in before password verification and issue no authenticated session. Keep the public failure message generic. | Sanitized callback status and outcome, subsequent session state and a matching server throttle event. A status alone cannot distinguish the failure causes. |
| Account separation | One account's pause leaves the independent account budget unchanged, including when both use the same network. | Two synthetic accounts with distinct aliases and redacted server and session outcomes. |
| Reset | A successful password verification outside a pause clears earlier failures for that account. | Correlated server evidence or a bounded follow-up showing cleared state. |
| Recovery | The pause expires automatically 15 minutes after the threshold event. Denials during the pause do not extend it. A correct sign-in can succeed after expiry. | Clocked observations immediately before and at or after the recovery boundary, with the corresponding server outcomes. |
| Lockout safeguards | The pause does not revoke existing authenticated sessions or permanently disable the account. Staff can route a stranded user to a verified recovery process. Server logs distinguish failed verification from throttling without storing supplied credentials or identifiers in the evidence. | Documented recovery procedure and redacted records of relevant control behavior. |

Approved criteria excerpt from HT07-BASELINE-v0.1. Approval record RV-HT07-POLICY records the Project Owner's acceptance on 21 November 2026. The complete policy and its historical references remain in the audit workspace.
