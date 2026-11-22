# Happy Town final quality review

**Óbuda University · IT Audit, Compliance and Risk Management**  
**Documentation reassessment** 19 November 2026, after the original fieldwork  
**Canonical PDF and PowerPoint review** 21 November 2026  
**Criterion recheck** 21 November 2026, after native evidence integration

**Disposition.** Ready to submit as a limited-scope academic audit with the disclosed evidence gaps. Four findings remain open. HT-07 was Inconclusive during fieldwork. HT-11 is Fail on source evidence. Its Dynamic Replay Test remains Inconclusive. Acceptance of a prior JWT after either re-authentication or logout was not observed.

## Criterion recheck

| Check | Result |
| --- | --- |
| Requirement evidence | All 17 versioned IDs, descriptions and Level 1 assignments matched the official English release. Each row has an individual explanation and evidence link. The total is 11 Pass, 6 Fail and 0 Inconclusive, with four open findings. |
| HT-07 | The audited provider and limiter passed five offline checks. The login page returned HTTP 200 on the isolated listener. The baseline was approved on 21 November. The comparison is Fail. Full live sign-in limiter behavior is unobserved. |
| HT-11 and HT-12 | HT-11 remains Fail on source evidence. Its Dynamic Replay Test is Inconclusive. Retained HT-11 records confirm the second sign-in and current-context access. The protected-route outcome for the earlier session after either re-authentication or logout is unobserved. The offline session and role suite recorded 32 passes and two lifecycle TODOs. |
| HTTP and screenshot traceability | All six HT-14 and HT-15 native HTTP scenarios matched their evidence IDs and reported statuses. Twelve native images matched the PDF exhibits by decoded pixels, and both selected PowerPoint image parts matched their source PNGs by SHA-256. |
| Final report and deck | The verified PDF retains the 21 original pages with identical page rendering and destinations and adds the follow-up on page 22. The original PDF was open in another process, so the verified edition uses a new filename. Microsoft PowerPoint opened and rendered all 15 slides. The chart and conclusion match the matrix. The two revised slides and their notes reflect the follow-up. |
| Integrity and independence | The SHA-256 comparison confirmed 229 unchanged pre-existing audit files, including all historical evidence. Git confirmed the application and audited worktree are clean. The current review was a separate evidence check within the academic self-assessment. Independent external sign-off remains outstanding. |

[Per-criterion verification](../evidence/supplementary/2026-11-21/criterion-recheck/review.md) · [Validation output](../evidence/supplementary/2026-11-21/criterion-recheck/package-check.txt) · [Official ASVS 5.0.0 release](https://asvs.owasp.org/downloads/)

## Consistency checks at native evidence integration

| Check | Result |
| --- | --- |
| Audit Team and roles | Bakdaulet Bokenbayev is Lead Auditor, Co-Developer and Project Owner. Assel Karzhau is Auditor and Co-Developer. Both are named in the report, plan, scope and defense materials. |
| Independence and self-review | Both auditors’ involvement in development creates a self-review limitation. The report and slides describe an academic self-assessment. |
| Documentation criteria | The dated reassessment identifies the audited revision, documents reviewed, criterion, specific omissions and evidence limitations. HT-05 and HT-13 changed from Inconclusive to Fail. |
| All Fail outcomes | HT-12 has audited source, original logout evidence and a same-browser sign-out check on port 3302. Replay remains untested. HT-17 has original Phase 3 evidence and Playwright evidence of the exact synthetic email search. HT-05 and HT-13 have original working papers and the dated reassessment. HT-11 has an independent source determination identifying the missing replacement control. |
| Inconclusive and authorization results | HT-07 is Fail against the approved baseline. The separate HT-11 Dynamic Replay Test remains Inconclusive. HT-14, HT-15 and HT-16 remain Pass for sampled implementation. The authorization policy finding concerns documentation. |
| ASVS requirements | All 17 versioned IDs, official descriptions and Level 1 assignments match the official English OWASP ASVS 5.0.0 release. |
| Historical and final results | Original fieldwork was performed on 19 November 2026. Original totals are 11 Pass, 2 Fail and 4 Inconclusive. HT-05 and HT-13 changed after documentation review. HT-11 changed after independent source review. Final totals are **11 Pass, 6 Fail and 0 Inconclusive**, 17 total. |
| No invented testing | The reassessment used document and source inspection and retained observations. The report distinguishes ordinary logout from unobserved token reuse and URL placement from unverified retention or disclosure. |
| Findings and risks | Four finding IDs remain open. The fifth failed criterion, HT-11, shares the revocation gap documented under HT-F01 and has a separate re-authentication trigger. HT-F01 is Medium. HT-F02, HT-F03 and HT-F04 are Low. All four are Open. |
| Risk matrix | HT-F01 occupies Low likelihood × High impact. HT-F02 and HT-F03 occupy Medium × Low. HT-F04 occupies Low × Medium. The report, Risk Assessment and presentation use the same placements. |
| Canonical PDF and layout | The canonical PDF was regenerated from Markdown. The report has 21 A4 pages and 18 numbered sections. The section destinations, exhibit references and printed page labels match the PDF. |
| Embedded browser screenshots | Eleven earlier browser figures were retained. All twelve added native screenshots are embedded at full page content width. Each scenario occupies one page in the exhibits on pp. 16–21. |
| Browser evidence coverage | Exhibits C and D link to the 21 November matched requests. All six native Chrome Headers and Response pairs reconcile to the retained HTTP observations. The [Evidence Register](../evidence/evidence-register.md) maps each PNG to the criterion and page. |
| PowerPoint and speaking notes | Microsoft PowerPoint reopened and rendered all 15 slides. Slides 14 and 15 contain editable tables, selected native captures and notes. All existing slide and notes parts, including the 11/5/1 results chart and existing conclusions, were preserved. |
| File and case links | The matrix, report appendix and findings point to the corresponding Active Working Papers or reassessment. The snapshot preserves original relative links as written. The PDF was generated from the revised Markdown. |
| Scope of assurance | The report and presentation limit conclusions to the sampled local build, synthetic data and selected requirements. Full conformance, independent external assurance and certification are outside scope. |
| Original evidence and application source | The original fieldwork identifies the audited revision as `f23375fee54bae8942a1c23a702adb04ed6c99a2`. SHA-256 comparison for this PDF revision confirmed that the original evidence, execution record and historical files match the pre-edit copies. Git comparison against the start of this revision showed no application source changes. |

[Follow-up audit report PDF](final-audit-report-evidence-review.pdf) · [Audit report source](final-audit-report.md) · [Final verification matrix](../asvs/verification-matrix.csv) · [Findings register](../findings/findings-register.csv) · [Dated reassessment](../evidence/reassessment/2026-11-19-documentation-review.md) · [Historical snapshot](../history/2026-11-19-pre-reassessment/README.md) · [Official ASVS 5.0.0 release](https://asvs.owasp.org/downloads/)

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

- **HT-07** still lacks full live limiter evidence against the approved baseline.
- **HT-11 Dynamic Replay Test:** direct evidence of the server’s treatment of the superseded JWT. The requirement is already Fail on source evidence.
- **HT-12:** prior JWT acceptance after logout was not tested. The existing Medium finding is based on the audited implementation. Ordinary logout was verified.
- **HT-15:** the 21 November native capture used PARENT-A. The separate interim run documents a two-parent comparison. The new exhibit conclusions apply to the sampled synthetic records.
- **Audit Scope:** off-repository policies were outside the materials submitted. Production, real data and independently audited operation remain outside the assessment.
- **Course logistics:** confirm the submission deadline, channel and defense slot, plus any required student identifiers or academic declarations.
- **Auditee response and target dates:** confirm the Project Owner’s formal response, treatment dates and follow-up verification.

[Evidence gaps](../findings/evidence-gaps.md) · [Corrective action plan](../findings/remediation-plan.md)

## Native evidence integration

The earlier integration incorporated screenshots from the completed capture run. Validation mapped each embedded authorization screenshot to the original PNG by decoded pixels and matched the two PowerPoint image parts to the original PNG bytes. [Integration record and checksums](../evidence/supplementary/2026-11-21/native-devtools-integration/validation.md)

## Evidence after baseline approval

The earlier 11 Pass, 5 Fail and 1 Inconclusive assessment is historical. The matrix's dated follow-up column records the authorized HT-07 policy comparison, the HT-11 concurrent access outcome and the HT-12 ordinary logout outcome. The follow-up PDF adds page 23 and the defense deck reflects the same distinctions. The source-based Fail outcomes and four open findings are preserved. Native Chrome capture for the new work and the earlier-session replay observations remain outstanding. [Follow-up working paper](../evidence/supplementary/2026-11-21/remaining-evidence/working-paper.md) · [Submission archive review](submission-archive-review.md)

## Final evidence verification

The evidence-review edition contains 24 PDF pages and 15 slides. The historical matrix and four findings retain their values. Final verification distinguishes immutable evidence and historic digests of files that were subsequently revised. [Verification record](final-evidence-verification.md) · [Test dispositions](../evidence/supplementary/2026-11-21/remaining-evidence/final-evidence-disposition.md) · [Archive review](submission-archive-review.md)

## Final adjudication

The final matrix records **11 Pass, 6 Fail and 0 Inconclusive** across 17 requirements. The earlier 11/5/1 assessment remains historical. HT-07 is Fail on source comparison with the approved prospective baseline. Actual live lockout and timed recovery were not observed. HT-11 is Fail on source evidence. A remained able to access the teacher dashboard after B independently signed in as the same teacher. Acceptance of the exact superseded credential remains unobserved. HT-12 is Fail on source evidence. Ordinary logout was observed, and acceptance of the earlier session remains unobserved. Four findings remain open, one Medium and three Low.

[HT-07 source adjudication](../evidence/supplementary/2026-11-21/final-adjudication-source-review.md) · [HT-11 reassessment](../evidence/supplementary/2026-11-21/ht11-context-reassessment.md)
