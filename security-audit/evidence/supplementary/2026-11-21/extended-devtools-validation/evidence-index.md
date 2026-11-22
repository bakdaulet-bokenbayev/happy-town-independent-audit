# Extended defensive evidence index

**21 November 2026 (CET)** · isolated Happy Town audit instance

| Test | New evidence | Scope and remaining gap |
| --- | --- | --- |
| HT-14 | [HT14-01–04 sanitized Chrome HTTP observations](03-HT14-Function-Authorization/http-observations.json) | Same GET, four session states. ADMIN 200 with items, TEACHER and PARENT 403 without items, anonymous 401 without items. The [prior native DevTools Figure S1](../chrome-devtools-report/HT14-chrome-devtools.png) is a separate ADMIN capture. There are no new native captures. |
| HT-15 | [HT15-01–02 sanitized Chrome HTTP observations](04-HT15-Record-Authorization/http-observations.json) | PARENT-A received 200 with the linked STU-01 and 404 without a student object for the unlinked STU-02. The same file records the read-only fixture checks. There are no new native captures. |
| HT-11 | [Source review](01-HT11-Reauthentication/source-review.md) · [Test run](01-HT11-Reauthentication/regression-results.txt) | Synthetic offline identity and guard assertions. HT-11 is Fail on source evidence. Dynamic Replay Test remains Inconclusive. |
| HT-12 | [Source review](02-HT12-Logout/source-review.md) · [Test run](01-HT11-Reauthentication/regression-results.txt) | Synthetic offline logout-cleanup and signed-out guard assertions. Prior-session server acceptance after logout remains untested. The [prior native Figure S2](../chrome-devtools-report/HT12-chrome-devtools.png) shows an ordinary signed-out client. |

Google Chrome was used for the HTTP observations. The Computer Use connection refused access to its native interface, so no new DevTools figures were available for indexing. No prior image was reattributed to a new run.

[Execution report](execution-report.md) · [SHA-256 manifest](SHA256SUMS.txt)