# Supplementary Network capture register

**Recorded:** 2026-11-20 15:56:40 +01:00 (Europe/Budapest)  
**Audit revision:** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Local origin:** `http://127.0.0.1:3301`  
**Database:** `happy_town_audit`

## Browser readiness

A credential-free GET to `/login` returned HTTP 200. This confirms the route responded during preflight. Visual confirmation of the English login and the Chrome address bar was unavailable. The Computer Use Chrome connection was unavailable. Surface discovery showed a Chrome desktop window but listed only the in-app browser and MCP Apps as automation-connected browsers. The desktop window was the same window whose URL Computer Use could not verify during the preceding attempt. No application credentials were submitted in this verification.

## Case record

| Test | Observed in this review | New HTTP result | Screenshot and SHA-256 |
| --- | --- | --- | --- |
| HT-14 · v5.0.0-8.2.1 | Source shows `requireAdmin` runs at the start of the management GET handler. Browser sign-ins and role comparison were not performed. | — | — |
| HT-15 · v5.0.0-8.2.2 | A read-only database query confirmed active links from PARENT-A to STU-01 and STU-19 and from PARENT-C to STU-02. It found no active link from PARENT-A to STU-02. The browser requests and two-parent comparison were not performed. | — | — |
| HT-17 · v5.0.0-14.2.1 | Source shows the search value is included in the GET query and the repository can match it against email. No new contact search or Network capture was obtained. | — | — |
| HT-12 · v5.0.0-7.4.1 | Source confirms the configured JWT sign-out clears the client cookie. The reviewed sign-out and authorization paths contain no per-session server-side revocation check. No session artifact was preserved or replayed. | — | — |

No Chrome DevTools screenshots were captured, so there are no screenshot hashes. No case verdict or risk rating changed. The existing working papers and sanitized observations remain the audit evidence for the original HTTP results.

[HT-14](../../../phase-3/HT-14-evidence.md) · [HT-15](../../../phase-3/HT-15-evidence.md) · [HT-17](../../../phase-3/HT-17-evidence.md) · [HT-12](../../../phase-3/HT-12-evidence.md) · [Original sanitized observations](../../../phase-3/observations.json)
