# ASVS verification test plan

This plan defines 17 procedures for Phase 3. Each test ID maps to one row in the [verification matrix](../asvs/verification-matrix.csv), which contains the official ASVS wording and the status of record. The cases below specify expected behavior and evidence to collect. All cases start **Not Tested**.

## Entry conditions and sample

Use the Project Owner's [authorization](../audit-plan/audit-plan.md#authorization-checklist). At the start of fieldwork, record the approved application revision, dependencies, database and Compose project, local origin, testing window and any reviewer. The [scope](audit-scope.md) identifies the approved surfaces. Confirm expected permissions and fixtures before interpreting results.

| Fixture label | Confirm before use |
| --- | --- |
| ADMIN-A, TEACHER-A, PARENT-A, PARENT-B | Active synthetic accounts from the audit lab. Use an independent browser or session for each account. |
| ANON | Clean browser session with no Happy Town sign-in. |
| STUDENT-OWN, STUDENT-OTHER | Synthetic students linked to different synthetic parents for HT-15. Confirm each record has no active link to the other parent. Separately label sample students inside and outside TEACHER-A's assignments. |
| GROUP-ASSIGNED, GROUP-OTHER | Existing synthetic groups inside and outside TEACHER-A's current assignments. |
| DISPOSABLE-INPUT | Auditee-approved synthetic values for benign validation checks in a recoverable copy or isolated test fixture. Approve any write and cleanup procedure before use. |

Record fixture labels, role and record relationships independently of the response under review. Use both synthetic parent accounts for HT-15. Use owner-approved, read-only fixture checks for denied access scenarios and normal UI navigation where available. Use single, ordinary requests and fixed fixtures. Review credential-abuse and token invalidation behavior using source and approved isolated test evidence. Keep checks inside the authorized lab.

## Working papers and decisions

Record each scheduled procedure, sample label, expected outcome, actual observation, limitation, artifact reference, operator, date and time zone, revision, environment and reviewer. Use stable evidence IDs such as `E-001`. Retain the smallest useful source or configuration excerpt, sanitized response metadata or screenshot. Summarize sensitive request fields and token comparisons without retaining values. Redact credentials, session material, connection strings, and identifying data before saving evidence. A source reference should include a path, revision and line range. Confirm interviews with source, records or observations where available.

Use **Pass** only when the required evidence supports the expected result for the whole sampled criterion. Use **Fail** for an evidenced deviation and **Inconclusive** when the available evidence leaves the outcome unresolved. Use **Not Applicable** only with a documented change in applicability, and **Not Tested** while the procedure is outstanding. A portal redirect, a cleared browser cookie, a source-only test or a Phase 1 smoke observation can each answer a limited question. Record the scope of that evidence before reaching a conclusion. Priorities in the matrix indicate work order and anticipated impact area. They are assigned before fieldwork.

### HT-01 — Protected database queries

- **ASVS requirement** `v5.0.0-1.2.4`
- **Objective and roles** Inspect query construction for login identity lookup and the ADMIN entity list. Roles are ANON at sign-in and ADMIN during list and search.
- **Preconditions** The approved application snapshot includes `auth.ts`, the admin route and repository, and Prisma configuration or relevant data-access code.
- **Steps** Trace the sign-in identifier into the user lookup and the ordinary entity-list search and filter inputs into `listAdminEntities`. Inspect each sampled query for structured Prisma operations or explicit binding if it delegates to raw SQL. Review any stored routine only if the sampled path invokes it.
- **Expected secure behavior** User-controlled values reach PostgreSQL as query data through the ORM or as bound parameters. Query structure is controlled by trusted code.
- **Evidence** Input-to-query map and versioned source excerpts supporting query construction and any binding. An installed ORM alone is insufficient.
- **Potential impact** Unauthorized reading or changes to identity and school records through unsafe query construction.

### HT-02 — Validation of business and security inputs

- **ASVS requirement** `v5.0.0-2.2.1`
- **Objective and roles** Verify the sampled sign-in inputs and ADMIN entity-management inputs are checked against intended format, bounds and allowed values. Roles are ANON at sign-in and ADMIN.
- **Preconditions** Obtain the auditee's intended input rules and known-valid and invalid synthetic fixture values. The sampled inputs are sign-in IIN and password bounds, and entity kind and the selected account-creation fields.
- **Steps** Review `auth.ts`, `app/api/admin/entities/route.ts` and the validator for the sampled create form. Compare the rules to a normal sign-in and a valid admin list operation. Use one or two ordinary invalid input fixtures, such as a missing required field or an out-of-range value, through the approved form or existing validation check. Record client and server observations separately.
- **Expected secure behavior** Accepted inputs meet the applicable rules. Invalid inputs do not establish a session or create an entity, and return the expected validation outcome.
- **Evidence** Input rule table, versioned validator references, redacted valid and invalid observations, and an absence-of-write observation where an invalid authorized creation case was exercised.
- **Potential impact** Incorrect account creation or acceptance of malformed identity or management data.

### HT-03 — Validation at the trusted service layer

- **ASVS requirement** `v5.0.0-2.2.2`
- **Objective and roles** Establish that a trusted server validates sampled input independently of the client. Roles are ANON at sign-in and ADMIN.
- **Preconditions** Use the HT-02 rule set. Have access to the server route and service sources and an approved isolated server-side validation check or its results.
- **Steps** Trace credential handling to `authorize` and admin account creation to the management service and its schema. Establish where validation happens relative to authentication, database writes and error handling. Review or run the approved isolated check with an ordinary invalid input fixture and record the rejection layer.
- **Expected secure behavior** The server rejects invalid input before creating a session or writing an entity, regardless of how the UI validates the same field.
- **Evidence** Route-to-validator trace and server-origin rejection evidence, with a no-write or no-session assertion as appropriate. A browser-side validation message alone is insufficient.
- **Potential impact** Invalid data or inconsistent administrative records when requests reach the backend independently of the UI.

### HT-04 — HTTP methods for sensitive operations

- **ASVS requirement** `v5.0.0-3.5.3`
- **Objective and roles** Distinguish read interactions from sensitive sign-in, sign-out and administrative changes. Roles are ANON at sign-in, ADMIN for entity management and any authenticated role for sign-out.
- **Preconditions** Have the route handlers, the reviewed Auth.js version and approval for ordinary navigation. Use read-only observations plus existing authorized evidence for mutations.
- **Steps** Map the methods used for the login page, Auth.js operations and the sampled admin entity endpoint. Review how safe methods are routed, including framework-generated behavior where applicable. During ordinary navigation and sign-in/sign-out, record method and route metadata. Use source or approved existing test results to confirm the creation operation uses the intended state-changing method.
- **Expected secure behavior** The sampled sensitive operations use appropriate state-changing methods. Loading a page, listing entities or following other safe-method paths does not silently perform a sensitive action. Any alternative allowed by the ASVS criterion requires independent evidence.
- **Evidence** Operation-to-method table, route or framework references, redacted method/route observations, and evidence of whether safe-method paths change state.
- **Potential impact** Accidental or unintended changes triggered by ordinary navigation or automatic resource loading.

### HT-05 — Credential-abuse defenses in security documentation

- **ASVS requirement** `v5.0.0-6.1.1`
- **Objective and roles** Verify documented design and operation of credential-abuse defenses and treatment of malicious account lockout. Roles are ANON at sign-in and the auditee as control owner.
- **Preconditions** Request the current application security and operating documentation for this deployment.
- **Steps** Collect the documentation and its version or ask the auditee to confirm where it is maintained. Identify the defense, configuration, operating scope, recovery or reset behavior and lockout-abuse safeguards. Ask the control owner to explain any gaps and corroborate those statements with controlled records where available.
- **Expected secure behavior** Application documentation clearly describes the defenses in use, their configuration and how malicious account lockout is prevented.
- **Evidence** Controlled document references and confirmed inquiry notes. Record whether material is confirmed absent or simply unavailable to the auditor.
- **Potential impact** Inconsistent operation or recovery, delayed detection of abusive attempts and avoidable denial of access to legitimate users.

### HT-06 — Password masking

- **ASVS requirement** `v5.0.0-6.2.6`
- **Objective and roles** Verify default password masking and intentional reveal behavior on the sign-in form. The role is ANON.
- **Preconditions** Use a clean browser and a disposable, noncredential field value.
- **Steps** Inspect the password input in `components/login-form.tsx`. Open the normal sign-in page and observe the field's initial HTML input type. If the reveal control exists, toggle it on and off and confirm a new page load defaults to masking.
- **Expected secure behavior** The field defaults to `type=password`. Reveal requires an explicit user action, and masking can be restored.
- **Evidence** Versioned form reference and redacted DOM or screenshots showing initial and restored masking. Omit the revealed value.
- **Potential impact** Password disclosure to nearby observers or recordings.

### HT-07 — Implementation of credential-abuse defenses

- **ASVS requirement** `v5.0.0-6.3.1`
- **Objective and roles** Check the implemented sign-in defenses against the documented behavior from HT-05. Roles are ANON at the sign-in boundary and the auditee as control owner.
- **Preconditions** Obtain the documented baseline and an approved isolated test of the limiter or auditee-supplied test results tied to the audit revision.
- **Steps** Trace the configured guard, failure handling and reset behavior in `auth.ts` and `lib/auth/login-rate-limit.ts`. Compare each behavior to the documented expectations. Review isolated test evidence for threshold, recovery and successful-login reset where those behaviors are documented. Record gaps in implementation or test coverage.
- **Expected secure behavior** The documented defenses are called and behave according to the approved configuration. The available evidence accounts for the lab process topology.
- **Evidence** Documentation-to-code comparison and authorized isolated check results. Sanitized audit events can corroborate observed behavior when they show which documented outcome occurred. Record the execution boundary. Live repeated login attempts are outside this procedure.
- **Potential impact** Increased exposure to unauthorized account access or disruptions to legitimate sign-in.

### HT-08 — Default application accounts

- **ASVS requirement** `v5.0.0-6.3.2`
- **Objective and roles** Check application bootstrap and account inventory for enabled default accounts. Roles are ADMIN, TEACHER, PARENT and the auditee.
- **Preconditions** Obtain the applicable bootstrap paths and an approved read-only, sanitized inventory of synthetic account roles and states.
- **Steps** Inspect the seed, initialization and documented provisioning paths for built-in accounts and preset credentials. Reconcile them against the lab inventory, distinguishing explicitly enabled synthetic accounts with operator-generated credentials from enabled defaults. Inspect active or disabled status as needed.
- **Expected secure behavior** Built-in default application accounts are absent or disabled. The synthetic seed logins are attributable to explicit lab provisioning with operator-supplied credentials.
- **Evidence** Versioned bootstrap excerpts and a sanitized role/status reconciliation. Avoid collecting passwords, password hashes or actual identifiers.
- **Potential impact** Unauthorized access through predictable or preconfigured accounts.

### HT-09 — Backend session verification

- **ASVS requirement** `v5.0.0-7.2.1`
- **Objective and roles** Verify that the sampled backend routes validate session tokens before relying on identity. Roles are ANON and a valid ADMIN, TEACHER or PARENT control session.
- **Preconditions** Have the Auth.js configuration, the installed version reference, and approved paired authenticated and signed-out cases.
- **Steps** Trace `auth()` from the sampled guards into the configured Auth.js backend verification and follow the result to the protected handler. Compare ordinary access in the recognized role with a clean signed-out fixture. Record whether the protected response includes data.
- **Expected secure behavior** A trusted backend validates the token before using its identity. A signed-out request cannot receive protected data.
- **Evidence** Versioned backend call chain, relevant library/configuration reference and redacted response/role observations. An authenticated response by itself cannot show where validation occurs.
- **Potential impact** Invalid or unauthenticated session state could be accepted at a protected backend boundary.

### HT-10 — Dynamic generation of session tokens

- **ASVS requirement** `v5.0.0-7.2.2`
- **Objective and roles** Verify that the application issues per-session tokens dynamically. Use one approved authenticated role across two independent normal sessions.
- **Preconditions** Use clean, separate browser sessions and an approved means of recording only whether the issued values differ.
- **Steps** Inspect the configured token strategy and library issuance behavior. Observe two ordinary sign-ins in independent sessions. Record issuance and whether the values differ, without retaining either token or a reusable derivative.
- **Expected secure behavior** The server issues dynamically generated self-contained or reference tokens. A fixed application credential is not used as the session value.
- **Evidence** Versioned strategy and issuance references and a minimal, redacted issuance comparison.
- **Potential impact** Shared or static session credentials could compromise multiple sessions if obtained.

### HT-11 — Session replacement on authentication

- **ASVS requirement** `v5.0.0-7.2.4`
- **Objective and roles** Verify issuance of a fresh token and termination of the superseded session at authentication or re-authentication. Use one approved authenticated role.
- **Preconditions** The auditee identifies the supported authentication transitions and supplies source or approved isolated lifecycle test evidence that addresses supersession.
- **Steps** Map supported authentication and re-authentication transitions. Observe fresh issuance during ordinary supported flows and review backend session lifecycle logic or isolated transition results for the former session. Record any transition whose behavior cannot be established.
- **Expected secure behavior** Each authentication transition creates a fresh session token and prevents further use of the session it supersedes.
- **Evidence** Transition inventory, redacted issuance comparison and source or isolated test evidence addressing backend invalidation. Different cookie values alone do not establish termination.
- **Potential impact** A superseded session could retain access when the user expects it to have ended.

### HT-12 — Session termination on logout or expiration

- **ASVS requirement** `v5.0.0-7.4.1`
- **Objective and roles** Verify that the backend rejects terminated sessions. Use at least one authenticated role and document the shared path for ADMIN, TEACHER and PARENT.
- **Preconditions** Use an authorized synthetic session and obtain the sign-out and expiration configuration and approved backend lifecycle evidence.
- **Steps** Sign out using the ordinary UI. Observe whether that same browser can still open a sampled protected page. Inspect expiration and backend validity rules and review any authorized isolated lifecycle tests for logout and expiration. Verify that the evidence addresses reuse through the backend, beyond the browser's signed-out state.
- **Expected secure behavior** Logout and expiry make terminated sessions unusable at the backend. The browser loses ordinary access to protected content after sign-out.
- **Evidence** Redacted before-and-after route observations and evidence of termination or expiry enforcement at the backend. Use `Inconclusive` if evidence is limited to visible browser logout and the backend behavior remains unresolved.
- **Potential impact** Continued access to school records after a session should have ended.

### HT-13 — Documented function and record permissions

- **ASVS requirement** `v5.0.0-8.1.1`
- **Objective and roles** Verify that the auditee defines function and record permissions for ANON, ADMIN, TEACHER and PARENT.
- **Preconditions** Request current authorization documentation and the identity of its owner.
- **Steps** Locate documented rules covering portal and admin functions and the sampled student and group records. Identify role, relevant record relationship or other attributes, allowed actions and any documented exceptions. Confirm version and intent with the auditee before using the rules as expected outcomes.
- **Expected secure behavior** Documentation gives a reviewer clear criteria for allowed and denied functions and records based on role and resource attributes.
- **Evidence** Versioned auditee documentation and confirmed inquiries about gaps or exceptions. Auditor-created fixture expectations do not establish prior auditee documentation.
- **Potential impact** Unclear or inconsistent access decisions and difficulty detecting privilege drift.

### HT-14 — Function-level authorization

- **ASVS requirement** `v5.0.0-8.2.1`
- **Objective and roles** Verify that protected functions require an explicitly permitted role. Use ANON, ADMIN, TEACHER and PARENT.
- **Preconditions** Freeze the access expectations from HT-13 or obtain auditee confirmation for the sample. Use separate role sessions and approve a read-only sample.
- **Steps** Record normal access to each role's own portal as positive controls. Include read-only denied cases for ANON at a protected portal and the admin entities API, TEACHER at the admin portal and admin entities list, and PARENT at the admin entities list. Use normal navigation or the lab's approved role-access fixture checks and record any returned data or capabilities.
- **Expected secure behavior** Only roles expressly permitted by the approved rules can use the sampled function. A protected page produces an appropriate sign-in or denial outcome. For the sampled management API, expect an authentication-required response for ANON and a forbidden response for signed-in TEACHER and PARENT. None of these responses should disclose protected content. A generic server error leaves enforcement unresolved.
- **Evidence** Expected/observed role-by-function table with redacted response status or navigation outcome and an assertion about protected content, corroborated with HT-16.
- **Potential impact** Unauthorized access to administrative features or disclosure of management data.

### HT-15 — Record-level authorization

- **ASVS requirement** `v5.0.0-8.2.2`
- **Objective and roles** Verify student and group permissions at the record level for PARENT and TEACHER, with ADMIN as an approved positive control.
- **Preconditions** Confirm the actual synthetic fixture relationships and role expectations through the auditee before running the tests.
- **Steps** Use approved paired record-access fixture checks for the scoped student and group read routes. Compare PARENT access to a linked student and a student linked only to another parent. Compare TEACHER access to a student and group within current assignments and to records outside those assignments. Use ADMIN to confirm selected denied fixtures exist and are readable to an authorized role. If an approved fixture check is unavailable, document which comparison remains unsupported.
- **Expected secure behavior** The application returns only records permitted by the role and current relationships. A denied case discloses neither protected record contents nor associated protected data.
- **Evidence** Redacted fixture relationship record and paired allow/deny observations for the sampled student and group routes. Record data presence as well as status.
- **Potential impact** Exposure of student or group information to an unrelated parent or teacher.

### HT-16 — Authorization at the trusted service layer

- **ASVS requirement** `v5.0.0-8.3.1`
- **Objective and roles** Establish that the server enforces permissions independently of menus and client JavaScript. Use the ANON, ADMIN, TEACHER and PARENT scenarios from HT-14 and HT-15.
- **Preconditions** Have the applicable handlers, guards, service methods and role/record expectations, plus approved backend fixture evidence.
- **Steps** Trace the protected pages, admin entities and student/group routes to role and relationship checks. Follow the trusted identity and role through to the data selection or write boundary. Corroborate the trace with backend observations or isolated fixture test evidence from HT-14 and HT-15.
- **Expected secure behavior** The backend derives identity and permissions from trusted state and enforces access before returning records or performing protected changes. Menu visibility is independent of the access decision.
- **Evidence** Route-to-guard-to-data trace and redacted backend enforcement observations, with references to the paired tests. Hidden UI controls alone are insufficient.
- **Potential impact** Protected records or operations could be available independently of the interface's intended restrictions.

### HT-17 — Sensitive data stays out of request URLs

- **ASVS requirement** `v5.0.0-14.2.1`
- **Objective and roles** Verify that sensitive inputs in sampled sign-in and authenticated requests travel in an HTTP body or header, including cookies, with no sensitive values in URL paths or queries. Roles are ANON at sign-in and ADMIN, TEACHER and PARENT for representative authenticated requests.
- **Preconditions** Confirm the data classification for IIN, credentials, session material and sampled identifiers with the auditee. Agree on redacted capture or field-level notes.
- **Steps** Follow normal sign-in, session and sampled protected reads. Review URL paths, query-field names and the location of sensitive inputs, including any redirects. Corroborate with the request-building and routing code. Use sanitized category and location notes without copying sensitive values.
- **Expected secure behavior** Sensitive values are sent in the body or headers. URL paths and query strings contain only values permitted by the agreed classification.
- **Evidence** Request-location worksheet using field names and redacted path templates, plus versioned client and server references.
- **Potential impact** Exposure of sensitive values via URL logging, browser history or referrer propagation.
