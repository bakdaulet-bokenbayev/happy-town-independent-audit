# Happy Town final quality review

**Óbuda University · IT Audit, Compliance and Risk Management**  
**Documentation reassessment** 19 November 2026, after the original fieldwork  
**Canonical PDF review** 20 November 2026

**Disposition.** Ready to submit as a limited-scope academic audit with the disclosed evidence gaps. Four findings remain open. HT-07 remains Inconclusive. HT-11 is Fail on source evidence. Its Dynamic Replay Test remains Inconclusive. Acceptance of a prior JWT after either re-authentication or logout was not observed.

## Consistency checks

| Check | Result |
| --- | --- |
| Audit Team and roles | Bakdaulet Bokenbayev is Lead Auditor, Co-Developer and Project Owner. Assel Karzhau is Auditor and Co-Developer. Both are named in the report, plan, scope and defense materials. |
| Independence and academic acceptance | Both auditors’ involvement in development creates a self-review limitation. The professor accepted the arrangement for this academic assignment. The report and slides describe an academic self-assessment. |
| Documentation criteria | The dated reassessment identifies the audited revision, documents reviewed, criterion, specific omissions and evidence limitations. HT-05 and HT-13 changed from Inconclusive to Fail. |
| All Fail outcomes | HT-12 has audited source, original logout evidence and a same-browser sign-out check on port 3302. Replay remains untested. HT-17 has original Phase 3 evidence and Playwright evidence of the exact synthetic email search. HT-05 and HT-13 have original working papers and the dated reassessment. HT-11 has an independent source determination identifying the missing replacement control. |
| Inconclusive and authorization results | HT-07 is the sole Inconclusive requirement. The separate HT-11 Dynamic Replay Test remains Inconclusive. HT-14, HT-15 and HT-16 remain Pass for sampled implementation. The authorization policy finding concerns documentation. |
| ASVS requirements | All 17 versioned IDs, official descriptions and Level 1 assignments match the official English OWASP ASVS 5.0.0 release. |
| Historical and final results | Original fieldwork was performed on 19 November 2026. Original totals are 11 Pass, 2 Fail and 4 Inconclusive. HT-05 and HT-13 changed after documentation review. HT-11 changed after independent source review. Final totals are **11 Pass, 5 Fail and 1 Inconclusive**, 17 total. |
| No invented testing | The reassessment used document and source inspection and retained observations. The report distinguishes ordinary logout from unobserved token reuse and URL placement from unverified retention or disclosure. |
| Findings and risks | Four finding IDs remain open. The fifth failed criterion, HT-11, shares the revocation gap documented under HT-F01 and has a separate re-authentication trigger. HT-F01 is Medium. HT-F02, HT-F03 and HT-F04 are Low. All four are Open. |
| Risk matrix | HT-F01 occupies Low likelihood × High impact. HT-F02 and HT-F03 occupy Medium × Low. HT-F04 occupies Low × Medium. The report, Risk Assessment and presentation use the same placements. |
| Canonical PDF and layout | `final-audit-report.pdf` is the canonical report. A verified pre-sync copy is archived under `history/2026-11-20-pre-final-package-sync/`. It has 18 A4 pages. Its table of contents and evidence locations were checked against the PDF bookmarks and page numbers. The report contains 18 sections and all 17 case rows. |
| Eight embedded browser screenshots | Page 7 shows the sign-in form and three password states. Page 9 shows the teacher dashboard and signed-out login form from the ordinary logout check. Page 13 shows the full and focused Playwright captures of the same HT-17 request. All eight images trace to the Evidence Register. |
| Browser evidence coverage | Page 8 reconciles the original HT-14 and HT-15 observations with the exact-revision follow-up on port 3302. Page 13 pairs the HT-17 browser screenshots with sanitized Playwright HTTP metadata. The [Evidence Register](../evidence/evidence-register.md) identifies supporting sources and limitations. |
| PowerPoint and speaking notes | The 13-slide PowerPoint file was rendered for inspection. The editable results chart and its embedded workbook agree at 11/5/1. Slides 8, 9, 12 and 13 distinguish the source-based HT-11 Fail from the Inconclusive Dynamic Replay Test. The embedded notes match the speaker scripts. |
| File and case links | The matrix, report appendix and findings point to the corresponding Active Working Papers or reassessment. The snapshot preserves original relative links as written. The PDF was generated from the revised Markdown. |
| Scope of assurance | The report and presentation limit conclusions to the sampled local build, synthetic data and selected requirements. Full conformance, independent external assurance and certification are outside scope. |
| Original evidence and application source | The original fieldwork identifies the audited revision as `f23375fee54bae8942a1c23a702adb04ed6c99a2`. SHA-256 comparison for this PDF revision confirmed that the original evidence, execution record and historical files match the pre-edit copies. Git comparison against the start of this revision showed no application source changes. |

[Canonical audit report PDF](final-audit-report.pdf) · [Audit report source](final-audit-report.md) · [Final verification matrix](../asvs/verification-matrix.csv) · [Findings register](../findings/findings-register.csv) · [Dated reassessment](../evidence/reassessment/2026-11-19-documentation-review.md) · [Historical snapshot](../history/2026-11-19-pre-reassessment/README.md) · [Official ASVS 5.0.0 release](https://asvs.owasp.org/downloads/)

## Course report elements

| Element | Final report |
| --- | --- |
| Summarize the investigation | §3 Executive summary |
| Present the analyses performed | §11 Detailed audit execution and evidence |
| Define report limitations | §§7–8 Audit scope and independence |
| Describe auditor experience | §8 Recorded academic work and roles |
| Describe identified deficiencies | §13 Detailed findings |
| Assign risks | §14 Risk assessment and risk matrix |
| Propose implementation | §15 Recommendations and corrective action plan |

## Open items

- **HT-07:** approved operating baseline and supporting implementation evidence.
- **HT-11 Dynamic Replay Test:** direct evidence of the server’s treatment of the superseded JWT. The requirement is already Fail on source evidence.
- **HT-12:** prior JWT acceptance after logout was not tested. The existing Medium finding is based on the audited implementation. Ordinary logout was verified.
- **HT-15:** the isolated follow-up used PARENT-A. PARENT-C lacks credentials for the additional positive control.
- **Audit Scope:** off-repository policies were outside the materials submitted. Production, real data and independently audited operation remain outside the assessment.
- **Course logistics:** confirm the submission deadline, channel and defense slot, plus any required student identifiers or academic declarations.
- **Auditee response and target dates:** confirm the Project Owner’s formal response, treatment dates and follow-up verification.

[Evidence gaps](../findings/evidence-gaps.md) · [Corrective action plan](../findings/remediation-plan.md)
