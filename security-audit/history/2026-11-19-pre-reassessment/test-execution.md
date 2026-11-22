# Phase 3 test execution

**Status:** Phase 3 fieldwork complete  
**Fieldwork:** 19 November 2026, approximately 11:39–11:47 CET (UTC+01:00)  
**Target:** Happy Town at `http://127.0.0.1:3300`  
**Criteria:** 17 selected OWASP ASVS 5.0.0 Level 1 requirements  
**Authorization:** Bakdaulet Bokenbayev, the sole Project Owner and Developer, authorized the local audit in writing. He is also the Lead Auditor, which limits independence. [Authorization checklist](../audit-plan/audit-plan.md#authorization-checklist)

## Execution summary

| Measure | Count |
| --- | ---: |
| Total planned cases | 17 |
| Cases with fieldwork performed | 17 |
| Pass | 11 |
| Fail | 2 |
| Inconclusive | 4 |
| Not Tested | 0 |
| Not Applicable | 0 |

A case counts as executed when its planned procedure was performed in whole or in part. The four Inconclusive cases have documented procedures and observations but lack evidence sufficient for a verdict. Results refer to the sampled development build, fixture set and controls. [Verification matrix](../asvs/verification-matrix.csv)

## Case results and evidence

| Case evidence | ASVS requirement | Result | Control |
| --- | --- | --- | --- |
| [HT-01](../evidence/phase-3/HT-01-evidence.md) | `v5.0.0-1.2.4` | Pass | Protected database queries |
| [HT-02](../evidence/phase-3/HT-02-evidence.md) | `v5.0.0-2.2.1` | Pass | Validation of business and security inputs |
| [HT-03](../evidence/phase-3/HT-03-evidence.md) | `v5.0.0-2.2.2` | Pass | Validation at the trusted service layer |
| [HT-04](../evidence/phase-3/HT-04-evidence.md) | `v5.0.0-3.5.3` | Pass | HTTP methods for sensitive operations |
| [HT-05](../evidence/phase-3/HT-05-evidence.md) | `v5.0.0-6.1.1` | Inconclusive | Credential-abuse defenses in security documentation |
| [HT-06](../evidence/phase-3/HT-06-evidence.md) | `v5.0.0-6.2.6` | Pass | Password masking |
| [HT-07](../evidence/phase-3/HT-07-evidence.md) | `v5.0.0-6.3.1` | Inconclusive | Implementation of credential-abuse defenses |
| [HT-08](../evidence/phase-3/HT-08-evidence.md) | `v5.0.0-6.3.2` | Pass | Default application accounts |
| [HT-09](../evidence/phase-3/HT-09-evidence.md) | `v5.0.0-7.2.1` | Pass | Backend session verification |
| [HT-10](../evidence/phase-3/HT-10-evidence.md) | `v5.0.0-7.2.2` | Pass | Dynamic generation of session tokens |
| [HT-11](../evidence/phase-3/HT-11-evidence.md) | `v5.0.0-7.2.4` | Inconclusive | Session replacement on authentication |
| [HT-12](../evidence/phase-3/HT-12-evidence.md) | `v5.0.0-7.4.1` | Fail | Session termination on logout or expiration |
| [HT-13](../evidence/phase-3/HT-13-evidence.md) | `v5.0.0-8.1.1` | Inconclusive | Documented function and record permissions |
| [HT-14](../evidence/phase-3/HT-14-evidence.md) | `v5.0.0-8.2.1` | Pass | Function-level authorization |
| [HT-15](../evidence/phase-3/HT-15-evidence.md) | `v5.0.0-8.2.2` | Pass | Record-level authorization |
| [HT-16](../evidence/phase-3/HT-16-evidence.md) | `v5.0.0-8.3.1` | Pass | Authorization at the trusted service layer |
| [HT-17](../evidence/phase-3/HT-17-evidence.md) | `v5.0.0-14.2.1` | Fail | Sensitive data in request URLs |

The evidence pack includes the [environment and fixture record](../evidence/phase-3/environment.md), [sanitized observations](../evidence/phase-3/observations.json), and the [empty login form screenshot](../evidence/phase-3/HT-06-login.png). The database and application passed the local readiness checks. Synthetic fixtures added for the audit were soft-archived and the extra account credential was removed after testing. Active fixture counts returned to baseline.

## Material observations

- **HT-12:** Ordinary sign-out removed the client's cookie and the protected API subsequently returned 401. Source inspection established that the configured JWT sign-out does not invalidate the session on the server. An isolated check confirmed expiry for a generated dummy token. The Fail result is based on the configured logout design. [HT-12 evidence](../evidence/phase-3/HT-12-evidence.md)
- **HT-17:** The authorized admin teacher-contact search sent a synthetic email address in a URL query and returned the matching fixture. The evidence stores the field location and match result without the address. [HT-17 evidence](../evidence/phase-3/HT-17-evidence.md)
- **HT-15:** Both synthetic parents received their own linked student record, and both cross-parent requests returned 404 without student data. Teacher assignment checks also returned the expected allowed and denied results. [HT-15 evidence](../evidence/phase-3/HT-15-evidence.md)

## Limitations and technical blockers

- HT-05, HT-07 and HT-13 were Inconclusive because the reviewed repository documentation did not establish a complete security settings or authorization baseline. The isolated limiter produced the expected threshold, reset and key-isolation observations. An authoritative document or owner confirmation of completeness would resolve the documentation gap.
- HT-11 was Inconclusive because ordinary sign-ins established unique issuance in separate sessions. The inspected login page redirects signed-in users, and the reviewed evidence did not establish a supported same-session replacement transition or conclusively verify invalidation for one.
- Headless browser sign-in automation timed out. The password masking case completed in Chrome, and normal Auth.js HTTP flows supplied evidence for the other sampled runtime cases. The signed-out teacher portal returned HTTP 500 without protected content, while the sampled protected API returned 401. The HTTP 500 is a separate behavior observation. [Environment record](../evidence/phase-3/environment.md) · [HT-12 evidence](../evidence/phase-3/HT-12-evidence.md)

The tracked application source was unchanged during the run. This document closes Phase 3.
