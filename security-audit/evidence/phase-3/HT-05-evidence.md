# HT-05 — Credential-abuse defenses in security documentation

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-05 |
| ASVS requirement | `v5.0.0-6.1.1` · Level 1 |
| Result | **Inconclusive** |
| Date and time | 19 November 2026, during Phase 3 source and documentation review |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ANON at sign-in. Project Owner holds the application documentation. |

**Procedure**  
Inspect the project documentation inventory and authentication section for documented defenses, configuration, recovery or reset, and malicious account lockout protections.

**Expected secure behavior**  
Current security documentation explains the defenses, configuration and protections against malicious account lockout.

**Observed result**  
The tracked written project materials were `README.md` and `I18N_REMAINING.md`. The authentication section describes a hashed, in-memory rate-limit key and log behavior. It does not specify the limit, window or reset conditions, or explain how malicious account lockout is prevented. No separate controlled security document or owner confirmation of documentation completeness was available in the reviewed record.

**Supporting evidence**  
`README.md:48–57`, tracked document inventory, and source context `lib/auth/login-rate-limit.ts:3–25`. The inventory is included in [the environment record](environment.md#source-and-documentation-inventory).

**Limitations**  
The repository omission is evidenced. It is unknown whether the owner maintains a separate authoritative security document, so the documentation landscape could not be fully verified.
