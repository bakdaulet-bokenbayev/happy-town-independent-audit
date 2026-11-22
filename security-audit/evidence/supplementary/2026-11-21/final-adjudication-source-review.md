# Final adjudication source review

**Revision** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Review date** 21 November 2026 CET  
**Scope** Source and retained audit evidence. No new live authentication or replay was performed.

## HT-07 · Approved-baseline comparison

**Source-based determination: Fail for the prospective approved baseline.** The Project Owner approved HT07-BASELINE-v0.1 effective 21 November 2026. It specifies six failed verifications within a rolling 15-minute window followed by a 15-minute pause measured from the sixth failure. The earlier fieldwork assessment remains Inconclusive because it predates that approval. [Approval](remaining-evidence/HT07-baseline-approval.md) · [Approved baseline](remaining-evidence/HT07-operational-baseline.md)

At the audited revision, `auth.ts:23–49` validates and normalizes the identifier, calls `loginAttemptAllowed` before account lookup, records failures for unavailable accounts or invalid passwords and clears the counter on success. `lib/auth/login-rate-limit.ts:3–25` fixes `MAX_FAILURES` at five and `WINDOW_MS` at ten minutes. The first recorded failure sets the expiry. The guard allows counts below five and denies further verification once five failures have been recorded. The code reads `AUTH_SECRET` for HMAC key derivation, with no environment override for threshold or window. The threshold and recovery calculation differ from the approved specification. The retained offline checks corroborate the control path. [Offline results](criterion-recheck/ht07-provider-results.txt)

The complete live lockout, separate-account and timed-recovery sequence remains unobserved. No HTTP throttle result is asserted.

## HT-11 · Session replacement

**Fail on source evidence.** The audited Credentials provider uses JWT sessions and maps user identity into the token and session. The retained source trace identifies fresh token issuance, Auth.js verification and the absence of a server-side replacement decision. The protected teacher layout calls `requireTeacher`, which verifies a session and reloads the active, non-archived account. It does not compare the token against a later authentication or a revocation record. The inspected schema and migrations contain no session-revocation mechanism for this path. [Detailed source trace](../2026-11-20/ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md)

The earlier independent-context run observed continued access after a separate sign-in. Acceptance of a specifically superseded token remains unobserved. The dynamic replay result remains Inconclusive.

## HT-12 · Logout invalidation

**Fail on source evidence.** The audited JWT sign-out path clears the browser cookie without a server-side revocation decision. Backend verification checks token validity and the current account state. The retained ordinary logout observed a signed-out client and an HTTP 401 protected API response. Those observations establish the client logout outcome. Acceptance of the earlier session after logout remains unobserved. [Original working paper](../../phase-3/HT-12-evidence.md)

## Findings and totals

The existing open findings retain their ratings: HT-F01 Medium, HT-F02 Low, HT-F03 Low and HT-F04 Low. Applying the prospective HT-07 Fail to the current 17-row matrix would yield 11 Pass, 6 Fail and no Inconclusive requirements. The separate HT-11 dynamic replay remains Inconclusive as an evidence limitation. This source review does not itself amend the matrix, report or presentation.
