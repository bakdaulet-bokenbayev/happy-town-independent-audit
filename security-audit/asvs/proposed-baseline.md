# Proposed ASVS 5.0.0 Level 1 baseline

This file records the Phase 1 proposal. Phase 2 retained all 14 proposals as applicable and added `v5.0.0-1.2.4` for database queries, `v5.0.0-3.5.3` for HTTP methods on sensitive operations and `v5.0.0-8.1.1` for documented authorization rules. The [verification matrix](verification-matrix.csv) is the record of the current selection, applicability and status.

The following 14 requirements are marked Level 1 in the [tagged OWASP ASVS 5.0.0 English CSV](https://raw.githubusercontent.com/OWASP/ASVS/v5.0.0/5.0/docs_en/OWASP_Application_Security_Verification_Standard_5.0.0_en.csv). The descriptions below summarize each selected requirement for planning. Use the official wording when designing the verification matrix.

| Requirement | Focus | Proposed evidence |
| --- | --- | --- |
| `v5.0.0-2.2.1` | Validate inputs against business or functional rules. At Level 1, prioritize inputs used in business or security decisions. | Validation rules and code inspection for the sampled sign-in and management inputs, with representative test observations. |
| `v5.0.0-2.2.2` | Enforce input validation at a trusted service layer. | Trace the server handlers and validation behind the same sampled inputs. |
| `v5.0.0-6.1.1` | Document defenses against credential abuse, including configuration and how account lockout abuse is prevented. | Auth configuration, maintainer confirmation and relevant control documentation. |
| `v5.0.0-6.2.6` | Mask password inputs with an optional user-controlled reveal. | Sign-in form inspection and browser observation. |
| `v5.0.0-6.3.1` | Implement credential-abuse defenses in accordance with security documentation. | Compare documentation with the configured behavior, control code and available test or log evidence. |
| `v5.0.0-6.3.2` | Exclude or disable default accounts. | Inspect the committed bootstrap and seed paths and the synthetic account inventory. |
| `v5.0.0-7.2.1` | Verify session tokens on a trusted backend. | Inspect Auth.js configuration and server-side routes that use the session. |
| `v5.0.0-7.2.2` | Generate session tokens dynamically. | Inspect the session strategy and library behavior and capture redacted issuance metadata. |
| `v5.0.0-7.2.4` | Issue a fresh token at authentication and terminate the previous session token. | Review issuance and invalidation design and available transition test evidence. |
| `v5.0.0-7.4.1` | Disallow further use of a terminated session. | Inspect logout and expiration design and available supporting evidence. A cleared browser session alone is insufficient. |
| `v5.0.0-8.2.1` | Restrict functions to users with explicit permission. | Documented role expectations, route and service inspection, and sampled portal and management observations. |
| `v5.0.0-8.2.2` | Restrict access to specific records based on explicit permission. | Documented relationship rules, ownership logic and representative student/group records and observations. |
| `v5.0.0-8.3.1` | Enforce authorization at a trusted service layer. | Trace permission enforcement from sampled routes into backend authorization and record-selection logic. |
| `v5.0.0-14.2.1` | Keep sensitive inputs out of URLs and query strings. | Inspect the sampled sign-in and authenticated requests using redacted request metadata and code. |

## Source and attribution for the matrix

The requirement descriptions in the matrix are unchanged excerpts from the English OWASP Application Security Verification Standard 5.0.0. The project selected 17 rows, used the standard's versioned ID format, and added Happy Town planning columns. The `v5.0.0` source resolved to commit `180622b1329ee7ed349c9f5ce5e14fa91f42c359`. The English CSV used for comparison has SHA-256 `98c8fe911b9edb403af8ee05d3ce8201ecac2659e313b053890a62847cdcf680`. [OWASP release source](https://github.com/OWASP/ASVS/tree/v5.0.0) · [Pinned English CSV](https://raw.githubusercontent.com/OWASP/ASVS/180622b1329ee7ed349c9f5ce5e14fa91f42c359/5.0/docs_en/OWASP_Application_Security_Verification_Standard_5.0.0_en.csv)

OWASP requirement text is copyright © 2008–2025 The OWASP Foundation and is reproduced under Creative Commons Attribution-ShareAlike 4.0 International. [OWASP license](https://github.com/OWASP/ASVS/blob/v5.0.0/LICENSE.md) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
