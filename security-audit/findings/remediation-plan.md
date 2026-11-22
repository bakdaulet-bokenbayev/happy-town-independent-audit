# Corrective action plan

Bakdaulet Bokenbayev, the Project Owner, owns treatment for the four open findings. Prioritize HT-F01. Schedule the three Low findings according to the exposure and maintenance work planned for the application. Target dates and the formal auditee response remain open. Verify any changes in an authorized scope using synthetic fixtures where applicable. [Findings register](findings-register.csv) · [Risk assessment](risk-assessment.md)

## HT-F01 — Enforce server-side session invalidation

**Related case** HT-12 · ASVS `v5.0.0-7.4.1` · Medium risk

### Root cause and effect

Happy Town configures Auth.js Credentials with the JWT strategy. The installed JWT sign-out path clears the browser cookie and can invoke an optional event, but the application does not configure a durable invalidation action. Verification decodes the JWT and checks the account's active state. Logout does not update either input to that decision. A currently valid session held separately from the browser can therefore retain the account's privileges until the backend otherwise rejects it. The isolated expiry result only establishes expiry behavior. [HT-12 evidence](../evidence/phase-3/HT-12-evidence.md) · [OWASP session expiration guidance](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#automatic-session-expiration)

### Recommended solution

1. Keep the current Credentials sign-in flow and add application-owned server-side session state. Issue a server-generated session ID on successful sign-in, include it in the JWT, and store its account association, expiry and active or revoked state in PostgreSQL. Keep this ID stable when an active JWT is renewed. The installed Auth.js encoder generates a new `jti` on each encoding, so a revocation check keyed only to the last cookie's `jti` would leave other representations of the same session outside that check.
2. Use one trusted session-state check for protected pages, API handlers and any Auth.js endpoint publishing authenticated state. Require a matching active, unexpired session record in addition to the existing JWT and account checks. Treat absent, expired, revoked or uncheckable state as unauthorized. Enforce expiry server-side and preserve revoked state when a request races with renewal.
3. On logout, persist the per-session revocation before reporting success. Clear the browser cookie as part of the flow and keep other active sessions under the selected per-session policy. Account for persistence failure explicitly. The installed default sign-out handler catches event errors and then clears cookies, so a best-effort event alone does not satisfy the guarantee.
4. Require a fresh sign-in for existing tokens that have no server-issued session ID. Keep session material out of logs, and expire server records according to the session lifetime and retention policy. The installed Credentials-only provider relies on the JWT strategy, so changing the strategy flag by itself is unsuitable. [OWASP JWT termination guidance](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html#jwt) · [OWASP logging guidance](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html#data-to-exclude)

**Expected improvement.** A logout changes the backend authorization decision for that session immediately. Renewal cannot reactivate a revoked session, and a stored browser cookie alone cannot override the server's decision.

### Future retest

- Inspect the changed issuance, shared verification, renewal and logout paths. Preserve the revision and trace the authoritative session record through each decision.
- Use isolated integration tests with server-generated synthetic session fixtures to assert that the session is accepted while active and rejected after revocation or expiration. Cover previous and renewed representations of the same logical session, the intended behavior of a second active session, and a failure to read or persist session state.
- Observe an ordinary local logout and subsequent signed-out UI and API behavior. Capture state transitions, authorization outcomes and redacted statuses. Exclude cookie values and tokens from the working papers. Close only when the backend checks and ordinary logout observations both support the result.

## HT-F02 — Keep contact searches out of request URLs

**Related case** HT-17 · ASVS `v5.0.0-14.2.1` · Low risk

### Root cause and effect

The admin directory serializes the free-text contact search into a GET query parameter. The entity route consumes that parameter, and the repository matches it against teacher email and other person fields. A normal contact search can therefore put personal information in the request URL, where browser diagnostics, access logs or other request tooling may copy it. Phase 3 verified the placement of a synthetic email. URL retention and access to retained data were outside the sampled evidence. [HT-17 evidence](../evidence/phase-3/HT-17-evidence.md) · [RFC 9110 §17.9](https://www.rfc-editor.org/rfc/rfc9110.html#section-17.9)

### Recommended solution

1. Introduce a dedicated read-only admin search operation that accepts POST with a validated JSON body. Keep it distinct from the existing entity-creation POST. Move all free-text person searches in the sampled management path into the body. Preserve server-side ADMIN authorization, input bounds, structured Prisma filters and same-origin handling.
2. Retire URL-based free-text search in the affected client and server paths. Retain GET for ordinary listings and allowlisted non-sensitive filters such as pagination and sort. Decline legacy search parameters without reflecting their values.
3. Apply `Cache-Control: no-store` to sensitive search responses. Keep raw queries, request bodies, contact values and authentication material out of application logs and tracing. Use allowlisted metadata such as a route template, response status and correlation ID. If a proxy or observability system is introduced, include its request capture in the same review. Review retention of prior logs through the owner's normal handling process. [RFC 9110 §17.8](https://www.rfc-editor.org/rfc/rfc9110.html#section-17.8) · [OWASP logging guidance](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html#data-to-exclude)

**Expected improvement.** Authorized admins can still search contacts, while sensitive terms are removed from generated request targets and excluded from configured logging and caching.

### Future retest

- Verify ordinary admin search with a distinctive synthetic contact value. Confirm the resulting record, body-only placement, and absence of the marker from request URLs, redirects and any navigation or history state. Record location assertions rather than the value.
- Verify the search route keeps ADMIN authorization, validates bad or missing input and changes no application records. Confirm listing, pagination and sorting still work and legacy free-text URL input is declined without reflection.
- Inspect the cache policy and available local logs or traces for the tested paths. Save redacted status, field locations and logging checks. Record any infrastructure that was outside the retest.

## HT-F03 — Document credential-abuse protection

**Related case** HT-05 · ASVS `v5.0.0-6.1.1` · Low risk

Create and maintain a versioned application security policy for credential abuse. Record the defenses in use, their scope and settings, the conditions for reset and recovery, and how the design prevents malicious account lockout. Document how changes are reviewed. For closure, check that the approved policy covers those elements and corresponds to the deployed configuration. Use the policy as the baseline for a separate follow-up evaluation of HT-07. [Documentation reassessment](../evidence/reassessment/2026-11-19-documentation-review.md)

## HT-F04 — Document authorization rules

**Related case** HT-13 · ASVS `v5.0.0-8.1.1` · Low risk

Create and maintain an authorization policy with a role–permission matrix. Cover anonymous access and ADMIN, TEACHER and PARENT functions. Include rules for student and group records, ownership, assignments, enrolment, relevant lifecycle states and permitted exceptions. For closure, review the policy against the audited criteria and compare representative rules with backend enforcement. Preserve evidence of both the documented rules and the control behavior. [Documentation reassessment](../evidence/reassessment/2026-11-19-documentation-review.md)
