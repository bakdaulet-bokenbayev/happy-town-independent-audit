# HT-11 independent-context reassessment

**Revision** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Requirement** ASVS v5.0.0-7.2.4  
**Criterion verdict** Fail, based on source review  
**Observation** Existing Context A retained protected access after Context B authenticated as the same synthetic teacher.

The retained Playwright script created Context A and authenticated it. It checked the teacher page, then created Context B and authenticated the same account. The script compared the returned account identities. It then requested the teacher page in B and in the original A context. A was not re-authenticated between the two requests. At 18:37:48.949 UTC on 20 November 2026, the request in A returned HTTP 200, the teacher dashboard rendered and the session identified the same synthetic teacher. [Execution record](../2026-11-20/ht11-sequential-20261120T183741Z/HT11-sequential-execution.md) · [HTTP observations](../2026-11-20/ht11-sequential-20261120T183741Z/HT11-http-observations.json) · [Playwright screenshot](../2026-11-20/ht11-sequential-20261120T183741Z/HT11-context-A-after.png)

The observation establishes continued access in A after the second sign-in. The run did not measure cookie rotation during ordinary session checks, and B began without an authenticated session. Therefore it does not independently establish acceptance of the exact credential superseded during a same-context re-authentication. The separate source review supports the failure of server-side termination in that path. [Source determination](../2026-11-20/ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md)
