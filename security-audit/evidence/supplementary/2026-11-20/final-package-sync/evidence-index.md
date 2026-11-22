# Happy Town · Final package synchronization evidence

**Audit date:** 20 November 2026  
**Audited revision:** `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Final verification:** **17 requirements · 11 Pass · 5 Fail · 1 Inconclusive · 4 open findings**

HT-07 is the remaining Inconclusive requirement. HT-11 is Fail on source evidence, with its separate Dynamic Replay Test Inconclusive. The old JWT's acceptance or rejection after re-authentication was never dynamically observed. HT-11 shares the server-side revocation gap documented under HT-F01. The distinct logout and re-authentication triggers are recorded in the report. HT-F01 remains Medium risk.

## Rendered document screenshots

The nine screenshots were captured using Windows Computer Use from the actual canonical files, with the filename, viewer and selected page or slide visible. The PDF opened in **WPS Office’s PDF viewer**. The deck opened in **Microsoft PowerPoint**. Native JPEG captures were converted to PNG without cropping or pixel adjustments.

| Screenshot | Actual document | Page or slide | What it shows |
| --- | --- | --- | --- |
| [page-02-executive-summary.png](screenshots/pdf/page-02-executive-summary.png) | `final-audit-report.pdf` | Page 2 · §3 Executive summary | Final 11/5/1 totals, preserved fieldwork totals and four open findings. |
| [page-14-verification-results.png](screenshots/pdf/page-14-verification-results.png) | `final-audit-report.pdf` | Page 14 · §12 Verification results | Original and final columns, HT-07, and the separate HT-11 replay gap. |
| [page-14-ht-f01-and-ht11.png](screenshots/pdf/page-14-ht-f01-and-ht11.png) | `final-audit-report.pdf` | Page 14 · §13 Detailed findings | HT-F01 Medium rating and the related HT-11 re-authentication deviation. |
| [page-18-ht11-traceability.png](screenshots/pdf/page-18-ht11-traceability.png) | `final-audit-report.pdf` | Page 18 · §18 Evidence traceability appendix | HT-11 traceability row with the independent determination, dynamic disposition and both outcomes. |
| [page-17-conclusion.png](screenshots/pdf/page-17-conclusion.png) | `final-audit-report.pdf` | Page 17 · §16 Overall conclusion | Four registered findings, 5 failed criteria and the remaining dynamic evidence limitation. |
| [slide-08-verification-results.png](screenshots/powerpoint/slide-08-verification-results.png) | `audit-defense-slides.pptx` | Slide 8 · Verification results | Editable chart rendered by PowerPoint with 17 requirements and 11/5/1, HT-11 source Fail and replay Inconclusive. |
| [slide-09-technical-findings.png](screenshots/powerpoint/slide-09-technical-findings.png) | `audit-defense-slides.pptx` | Slide 9 · Technical findings | HT-F01’s Medium rating and HT-11’s shared revocation gap under the distinct re-authentication trigger. |
| [slide-12-corrective-actions.png](screenshots/powerpoint/slide-12-corrective-actions.png) | `audit-defense-slides.pptx` | Slide 12 · Corrective actions | Four open findings and separate verification of logout and HT-11 session replacement. |
| [slide-13-conclusion.png](screenshots/powerpoint/slide-13-conclusion.png) | `audit-defense-slides.pptx` | Slide 13 · Conclusion | 11/5/1 totals, HT-07, the HT-11 evidence boundary and limits on scope and independence. |

## References and integrity

- [Final report PDF](../../../../reports/final-audit-report.pdf) · [Final report Markdown](../../../../reports/final-audit-report.md) · [Verification matrix](../../../../asvs/verification-matrix.csv)
- [Editable defense deck](../../../../presentation/audit-defense-slides.pptx) · [Evidence gaps](../../../../findings/evidence-gaps.md) · [Findings register](../../../../findings/findings-register.csv)
- [Independent HT-11 source determination](../ht11-independent-source-review/HT11-fail-determination-and-proposed-changes.md) · [Dynamic Replay Test disposition](../ht11-final-dynamic-20261120T212722Z/HT11-final-dynamic-execution.md)
- [Validation](validation.md) · [Scoped canonical changes](canonical-changes.diff) · [Verified SHA-256 manifest](SHA256SUMS.txt)
- [Pre-sync backups and hashes](../../../../history/2026-11-20-pre-final-package-sync/archive-index.md)

These screenshots show publication of the approved results. No application request, authentication, browser security test or database operation was carried out during synchronization.
