# HT-02 — Validation of business and security inputs

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-02 |
| ASVS requirement | `v5.0.0-2.2.1` · Level 1 |
| Result | **Pass** |
| Date and time | 19 November 2026, 11:42:49–11:42:58 CET |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ANON and ADMIN-A |

**Procedure**  
Review sign-in and entity creation rules. Compare ordinary valid sign-in and a valid admin list with benign negative cases for a missing IIN, an unsupported entity kind and a missing required account name. Compare audit and database state before valid fixture provisioning.

**Expected secure behavior**  
Well-formed sampled inputs are accepted. Invalid samples produce validation responses without creating an authenticated session or an entity.

**Observed result**  
The valid sign-ins returned authenticated sessions and the valid admin list returned HTTP 200. The missing IIN produced an `INVALID_INPUT` audit event and no session user or issued session cookie. Unsupported entity kind and missing required name both returned HTTP 400 with `VALIDATION_ERROR`. The invalid creation left zero matching rows and the active account count remained 23. A subsequent valid synthetic account create returned 201.

**Supporting evidence**  
`auth.ts:9–12, 20–29`, `app/api/admin/entities/route.ts:10–15`, `lib/validators/index.ts:3–10`, `lib/services/management.service.ts:19–25`. Runtime references `http.validation`, `http.roles.adminList` and `http.provision` in [observations.json](observations.json).

**Limitations**  
The sample covers the approved sign-in and account-management fields and tested cases.
