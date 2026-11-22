# HT-03 — Validation at the trusted service layer

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-03 |
| ASVS requirement | `v5.0.0-2.2.2` · Level 1 |
| Result | **Pass** |
| Date and time | 19 November 2026, 11:42:49–11:42:58 CET |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ANON and ADMIN-A |

**Procedure**  
Trace ordinary HTTP requests to the Auth.js credentials handler and admin management service. Observe independent server responses for the benign invalid fixtures and verify database and session outcomes.

**Expected secure behavior**  
Server validation rejects invalid fields before creating a session or writing an account, independent of client checks.

**Observed result**  
The backend credentials handler applied its schema before the user lookup, rejected the missing IIN and recorded `INVALID_INPUT`. The admin POST reached the server-side service, which calls `createUserSchema.parse` before the transaction. The response was HTTP 400 `VALIDATION_ERROR`, and a targeted read found zero matching rows.

**Supporting evidence**  
`auth.ts:9–12, 23–36`, `app/api/admin/entities/route.ts:15`, `lib/services/management.service.ts:19–25`, `lib/http/api-response.ts:5–9` and `lib/validators/index.ts:8–10`. See `http.validation` in [observations.json](observations.json).

**Limitations**  
Operation was observed for the specified input fixtures and the sampled server paths.
