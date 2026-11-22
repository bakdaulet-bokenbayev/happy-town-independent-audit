# HT-11 · Existing test coverage

**Review date:** 20 November 2026  
**Audited revision:** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Method:** Read-only inspection of test definitions and existing audit working papers

The project defines `npm test` as `node --test tests/*.test.mjs` at `package.json:15`, and `.github/workflows/quality.yml:35` runs that command in CI. All 13 tracked test files use `node:test`. The inspection covered their definitions, assertions and relevant fixtures. No test suite or application endpoint was executed during this review.

## Checked tests and their limits

| Test source | Assertion that exists | HT-11 coverage |
| --- | --- | --- |
| `tests/iin-auth.test.mjs:7–23` | Reads source text and asserts that IIN is used as the credential identifier, IIN is not serialized into the JWT or session, and the login form uses a generic error. | Credential form and identity data shape only. Does not call the Credentials provider, generate session tokens or verify session replacement. |
| `tests/rendered-html.test.mjs:5–9` | Reads the root page and asserts that it calls `auth()` and contains the login destination. | Verifies the presence of the call and redirect in source. Does not authenticate a user or check server session freshness. |
| `tests/role-routes.test.mjs:5–11` | Reads the enumerated teacher and parent page sources and checks guards, dynamic rendering and scoped detail queries. | Supports route wiring. No token validation or revocation is exercised. |
| `tests/admin-safety.test.mjs:33–38,51–56` and `tests/admin-requested-features.test.mjs:44–53` | Reads source and checks the presence of ADMIN guards and the logout handler in UI code. | Route and UI structure only. Neither a successful logout nor server-side token termination is exercised. |
| `tests/group-creation-conflicts.test.mjs:5–57` | Executes service code using mocked Prisma operations with a synthetic ADMIN actor and checks service behavior around group creation conflicts. | This is executable service coverage with a supplied actor. It does not run Auth.js or route-level session validation. |
| Other tracked `tests/*.test.mjs` | Tests cover analytics, backend/data contracts, cross-platform UI, localization, Prisma generation, production safety and teacher UI. | No existing test was found that asserts native Credentials issuance on re-authentication, invalidation of the superseded session, or acceptance of the replacement by the actual TEACHER guard. |

## Historical audit evidence

| Working paper | What it covers | Limit |
| --- | --- | --- |
| [Original HT-11 working paper](../../../phase-3/HT-11-evidence.md) | Distinct session values on independent fresh sign-ins, recorded as a comparison result. | Independent logins do not exercise replacement of the currently authenticated session. |
| [Independent teacher contexts](../interim-20261120T164431Z/phase-2-execution.md) | Two separately signed-in TEACHER contexts retained normal access to the sampled protected resource. | Parallel sessions are a different case. No new inference about replacement follows from this observation. |
| [Signed-in login redirect](../ht11-reauth-20261120T170429Z/ht11-reauth-execution.md) | A signed-in TEACHER visiting the login page was redirected to the role portal. | This particular browser observation did not submit credentials a second time. It neither establishes nor rules out backend support for same-context re-authentication. |

No existing runnable application session-lifecycle test was located that can demonstrate all of V7.2.4. A future authorized regression test can exercise the legitimate issuance transition and assert explicit active or superseded session state in backend validation using synthetic, in-memory state and no live browser credentials. It should also verify the TEACHER identity and distinguish account deactivation or expiry from re-authentication invalidation.

**Current coverage conclusion.** Source establishes that the Credentials branch issues a fresh token, and it establishes the missing server-side invalidation decision for the superseded token. Existing tests do not independently reproduce those two assertions together. The working-paper recommendation is a source-based **FAIL**, with no new runtime outcome asserted. [Static analysis](HT11-static-analysis.md)
