# HT-07 — Implementation of credential-abuse defenses

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-07 |
| ASVS requirement | `v5.0.0-6.3.1` · Level 1 |
| Result | **Inconclusive** |
| Date and time | 19 November 2026, 11:47:07 CET for the isolated limiter check |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ANON at the sign-in boundary. Two dummy keys were used in the isolated check. |

**Procedure**  
Trace the application guard, sign-in failure and success reset paths. Run the existing limiter module in a separate Node process with two dummy keys and a simulated clock, then compare observations with available operating documentation.

**Expected secure behavior**  
The configured defenses behave according to the application security documentation.

**Observed result**  
Source shows the guard is called before user lookup, the failure counter is updated for unavailable accounts and invalid passwords, and successful credentials clear failures. The isolated module allowed four recorded failures, denied at the configured fifth, kept a separate key unaffected, accepted the first key at the ten-minute boundary, and accepted the second key after it moved from denied to explicitly cleared. The repository describes in-memory keying but supplies no complete approved behavior baseline.

**Supporting evidence**  
`auth.ts:24–49`, `lib/auth/login-rate-limit.ts:3–25`, `README.md:48–57`. See `limiter` in [observations.json](observations.json).

**Limitations**  
The isolated process used a simulated clock and made no login requests. Alignment with a complete security specification could not be verified. See [HT-05](HT-05-evidence.md).
