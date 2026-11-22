# HT-11 — Session replacement on authentication

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-11 |
| ASVS requirement | `v5.0.0-7.2.4` · Level 1 |
| Result | **Inconclusive** |
| Date and time | 19 November 2026, 11:42:49–11:42:58 CET for the issuance observations, with source review during fieldwork |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ADMIN-A in two fresh client sessions |

**Procedure**  
Review the supported login flow and the Auth.js credentials issuance and lifecycle code. Compare ordinary fresh authentication outcomes and look for evidence of replacement of an already active session during re-authentication.

**Expected secure behavior**  
Authentication or supported re-authentication issues a new token and terminates the session it supersedes.

**Observed result**  
Separate sign-ins produced distinct session values. The local sign-in page redirects an already authenticated user to their portal, and the reviewed flow did not expose a supported same-session re-authentication transition. No approved isolated result demonstrates backend invalidation during session replacement.

**Supporting evidence**  
`app/login/page.tsx:8–11`, `auth.ts:14–19, 54–63` and `node_modules/@auth/core/lib/actions/callback/index.js:248–274`. See `http.independentIssuance` in [observations.json](observations.json).

**Limitations**  
The evidence establishes fresh issuance for independent sign-ins. It does not establish behavior for a superseded session in a supported re-authentication flow.
