# HT-12 source review and offline regression

**ASVS 5.0.0** `v5.0.0-7.4.1`  
**Revision** `f23375fee54bae8942a1c23a702adb04ed6c99a2`

- `components/role-shell.tsx:142` triggers ordinary Auth.js sign-out. `auth.ts:14–18, 54–64` selects JWT sessions and supplies identity callbacks. It supplies no sign-out revocation hook.
- Installed `node_modules/@auth/core/lib/actions/signout.js:9–29` decodes the session for the optional sign-out event and calls the session-store cleanup method. The JWT branch does not delete a server-side session record. `node_modules/@auth/core/lib/actions/session.js:18–33` decodes and passes claims to the callbacks. `lib/auth/authorization.ts:9–30` checks the resulting session and active account.
- The offline test executes the installed sign-out action with a test-only marker, an in-memory decoder double, and a cleanup spy. It asserts the cleanup call and then runs the real application guard against a signed-out fixture. No cookie header or actual session token is created.

The regression supports the client sign-out and authorization-guard contract. Whether the server accepts an earlier session after logout remains untested. HT-12 and the HT-F01 rating retain their existing audit disposition.

[Shared offline suite](../01-HT11-Reauthentication/session-guard-regression.test.mjs) · [Run results](../01-HT11-Reauthentication/regression-results.txt)