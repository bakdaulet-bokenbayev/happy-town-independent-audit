# HT-17 — Sensitive data in request URLs

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-17 |
| ASVS requirement | `v5.0.0-14.2.1` · Level 1 |
| Result | **Fail** |
| Date and time | 19 November 2026, 11:42:49–11:42:58 CET for the completed HTTP sample |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ANON during sign-in and ADMIN-A, TEACHER-A and PARENT-A for representative authenticated paths |

**Procedure**  
Inspect normal sign-in request construction and redacted route metadata. Trace how the administrator’s teacher-contact search reaches the API and observe a normal search over a synthetic teacher contact record.

**Expected secure behavior**  
Sensitive values travel in the HTTP request body or headers, and URL paths and query strings exclude them.

**Observed result**  
Sampled credentials operations used POST with the credential fields in the request body. Sampled authenticated reads used the session cookie header. The admin people search builds its filter as a URL query parameter, and the backend matches it against teacher email among other contact fields. A controlled request using a synthetic teacher email placed the email value in the GET URL query, returned 200 and matched one synthetic record. This demonstrates that a personal-contact field can travel in a request URL on the sampled management path.

**Supporting evidence**  
`components/login-form.tsx:22–32`, `components/admin-database-portal.tsx:43–47`, `app/api/admin/entities/route.ts:13` and `lib/repositories/admin.repository.ts:85–90`. See `http.requestLocations`, `http.ordinarySignIn` and `http.recordFixtures` in [observations.json](observations.json).

**Limitations**  
The retained artifact contains only field names and a boolean indicating presence and match. Browser sign-in automation timed out, so source inspection and the direct ordinary HTTP observation substantiate the outcome.
