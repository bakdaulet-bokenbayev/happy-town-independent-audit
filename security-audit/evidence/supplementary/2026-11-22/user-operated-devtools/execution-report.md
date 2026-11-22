# User-operated DevTools evidence

## HT-17 · Teachers search

An authorized synthetic administrator used the Teachers page to search for a synthetic fixture. Chrome DevTools showed a completed GET with the exact synthetic email in the URL query and HTTP 200. This corroborates HT-17 and finding HT-F02. The capture establishes request placement. Downstream retention was outside the observation.

The user supplied the original Headers PNG. The evidence copy is byte-for-byte identical to the supplied attachment. The relevant request summary and response Date header are readable. The full-window original includes surrounding application content, so an excerpt confined to DevTools is appropriate for display in a report or presentation. The unaltered original is retained as audit evidence.

A separate Playwright observation at 08:58:12 CET on 22 November 2026 used the same search term, received HTTP 200 and returned one matching synthetic fixture. The screenshot records the later native request at 09:05:40 CET. The two requests are recorded separately.

Retained requirement disposition is Fail. Finding HT-F02 remains Low and Open.

[Evidence index](evidence-index.md) · [Verification matrix](../../../../asvs/verification-matrix.csv)

### Paired response capture

HT17-UO-02 shows the Response tab of the same selected request. The JSON summary displays "total": 1. The screenshot excludes the item-detail fields. HT17-UO-01 identifies the request and its HTTP status.

## HT-11 · Continued access after an independent sign-in

Playwright used independent Chrome browser contexts for two ordinary sign-ins with the same synthetic teacher. Context A completed sign-in at 09:14:19 CET, and Context B completed sign-in at 09:14:22 CET. Context A did not sign in again. At 09:15:30 CET it requested /teacher and received HTTP 200. The Teacher Dashboard rendered. The user-supplied Headers PNG shows that same request and page. The Playwright observations record request sequencing and account equality without recording their underlying identifiers.

The observation corroborates continued access from separate contexts. Acceptance of an exact superseded token remains unobserved. The source-based Fail is retained.

## Evidence coverage

HT-07 retains its source-based Fail against the approved prospective baseline. A live lockout response and timed recovery were not observed.

HT-12 retains its source-based Fail. Previous Playwright observations and native Chrome evidence cover ordinary logout and the signed-out browser. Acceptance of the original pre-logout session remains unobserved.

[HT-07 adjudication](../../2026-11-21/final-adjudication-source-review.md) · [HT-12 results](../../2026-11-21/final-dynamic-validation/HT-12/result.md)
