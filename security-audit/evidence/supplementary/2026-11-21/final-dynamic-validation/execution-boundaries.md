# Execution boundaries and audit handoff

**Recorded** 21 November 2026 CET  
**Audited build** f23375fee54bae8942a1c23a702adb04ed6c99a2  
**Scope** Isolated loopback audit lab

| Test | Outstanding live scenario | Execution boundary and disposition |
| --- | --- | --- |
| HT-07 · v5.0.0-6.3.1 | Consecutive failures through the approved threshold, throttle response, budget separation, reset and recovery at the approved interval | The live sequence would deliberately induce account lockout and reproduce the known behavior. It was outside the execution scope. No sixth-attempt, throttle, separate-account or live recovery response was recorded. The prospective configuration comparison remains Fail. The historical assessment remains Inconclusive. |
| HT-11 · v5.0.0-7.2.4 | Verify the server response for the original authenticated session after re-authentication replaces it | Testing that exact original session in another context would require copying and replaying a reusable session credential. It was outside the execution scope. The retained concurrent-access observation remains valid for independently issued sessions. The source-based Fail stands and the dynamic result remains Inconclusive. |
| HT-12 · v5.0.0-7.4.1 | Verify the server response for the authenticated session that existed before logout | Testing that exact session in the other context would require copying and replaying a reusable session credential after logout. It was outside the execution scope. Ordinary logout remains verified. The source-based Fail stands and acceptance of the earlier session remains unobserved. |

[FDV-CUA-SESSION-01](../chrome-computer-use-retry/README.md) records HTTP 200 with body null from an anonymous Chrome Incognito session. Its two native DevTools captures are supplementary anonymous-session evidence. No new HTTP responses or screenshots were obtained for the three outstanding scenarios. The report and presentation retain their previous verified editions. The historical totals remain **17 requirements, 11 Pass, 5 Fail and 1 Inconclusive, with four open findings**. This internal recheck confers no external independent sign-off.

[Main evidence register](../../../evidence-register.md) · [Per-test evidence and retained observations](evidence-index.md)
