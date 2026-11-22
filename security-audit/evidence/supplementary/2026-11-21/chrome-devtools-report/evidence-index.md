# Chrome DevTools evidence index

**Date** 21 November 2026 CET  
**Target** Happy Town at `127.0.0.1:3302` · isolated `happy_town_audit_test` instance  
**Revision** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Capture method** Google Chrome 157.0.8103.79 and Windows Computer Use. DevTools was opened in the actual browser and zoomed before capture. The retained PNGs are screen crops. They exclude private header fields and the application sidebar. The HT-17 figure masks the synthetic email’s local part.

## Existing evidence reviewed

The reviewed package contained no genuine Chrome DevTools captures for these five tests. Its source records, sanitized HTTP metadata and Playwright captures retain their original provenance.

| Test | What the existing record supports | What the new capture covers or leaves open |
| --- | --- | --- |
| HT-11 | Prior same-context Playwright evidence corroborates a successful second Credentials authentication and continued TEACHER access. The independent source review supports Fail. [Same-context run](../../2026-11-20/ht11-same-context-20261120T190133Z/HT11-same-context-execution.md) · [HT11-SRC](../../2026-11-20/ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md) | No new DevTools capture. The old JWT was never tested after re-authentication. Dynamic Replay Test Inconclusive. A Network capture of the callback alone could corroborate re-authentication only. [HT11-DYN](../../2026-11-20/ht11-final-dynamic-20261120T212722Z/HT11-final-dynamic-execution.md) |
| HT-12 | Source review supports the finding. Earlier Playwright captured ordinary logout and a signed-out browser. [Original working paper](../../../phase-3/HT-12-evidence.md) · [Playwright observations](../../2026-11-20/network/clone-browser-observations.json) | Figure S2 establishes HTTP 200 with a JSON null response after normal logout. The previous token’s acceptance or rejection remains unobserved. |
| HT-14 | Earlier HTTP records show ADMIN received 200 and TEACHER and PARENT received 403 on the sampled resource, without protected items. [Original working paper](../../../phase-3/HT-14-evidence.md) · [Role comparison](../../2026-11-20/network/access-control-follow-up.md) | Figure S1 documents the ADMIN baseline. Fresh DevTools images for the denied roles would require a separately scoped role comparison. |
| HT-15 | The original fieldwork tested linked and unlinked student reads. The later interim clone exercise independently captured reciprocal 200/404 results for PARENT-A and PARENT-C in sanitized HTTP and Playwright evidence. [Original working paper](../../../phase-3/HT-15-evidence.md) · [Interim execution](../../2026-11-20/interim-20261120T164431Z/phase-2-execution.md) | No new DevTools image. A separately scoped capture would need verified synthetic relationships and an approved fixture setup. PARENT-C’s temporary sign-in fields were restored after the prior run. |
| HT-17 | Earlier Playwright and HTTP evidence shows the synthetic email in the request URL and one matching fixture. [Original working paper](../../../phase-3/HT-17-evidence.md) · [Prior Playwright validation](../../2026-11-20/final-validation/final-validation.md) | Figure S3 shows HTTP 200 and email placement in the GET query, with the local part masked. The paired observation confirms one matching fixture. Downstream retention and disclosure remain unobserved. |

## New screenshots

| Figure | Test | PDF page | Captured UTC | Visible evidence |
| --- | --- | --- | --- | --- |
| [S1](HT14-chrome-devtools.png) | HT-14 | 19 | 2026-11-20T23:17:41.194Z | Network General shows the ADMIN fixture’s teacher-list GET and 200 OK. |
| [S2](HT12-chrome-devtools.png) | HT-12 | 19 | 2026-11-20T23:21:26.278Z | Network Response displays JSON null after ordinary sign-out. The [companion Network status image](HT12-chrome-status.png) shows HTTP 200. |
| [S3](HT17-chrome-devtools.png) | HT-17 | 20 | 2026-11-20T23:17:18.719Z | Network General shows the GET URL with `query`, the encoded at sign and the reserved test domain. The local part is masked and the status is 200 OK. |

Chrome’s Application cookie values and authentication payloads were excluded from capture. The browser sign-in was performed with existing synthetic fixtures. Ordinary sign-out redirected to the local `localhost:3302` alias, which the capture session’s origin restriction blocked. The session check then used the originally authorized host `127.0.0.1:3302` in the same browser context. No raw HAR, old session credential or authentication secret was saved. No replay or access-control denial request was made during this capture.

[Sanitized observations](http-observations.json) · [SHA-256 manifest](SHA256SUMS.txt) · [Validation report](validation.md)
