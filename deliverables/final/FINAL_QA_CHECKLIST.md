# Happy Town final QA checklist

**Review date** 22 November 2026  
**Audited revision** f23375fee54bae8942a1c23a702adb04ed6c99a2  
**Decision** Ready for student review and submission as a scoped academic technical assessment. The auditors’ self-review limitation and unresolved runtime observations remain visible.

## Professor’s seven requirements

| Requirement | Verification method and location | Result | Remaining issue |
|---|---|---|---|
| Summarize the investigation | Read executive summary and conclusion, PDF pp. 3 and 14. Checked that subject, sample and totals agree with the matrix. | Met | — |
| Present the analyses | Reconciled technical analysis, pp. 6–8, and all 17 requirement decisions, p. 9, with dated evidence. | Met | Scope-specific limitations are recorded by case. |
| Define report limitations | Reviewed the scope, decision rules and limitations, pp. 3, 5 and 13. | Met | Exact lifecycle and live threshold scenarios remain unobserved. |
| Describe the auditors’ experience | Reviewed Auditor Experience and Lessons Learned, p. 13. Statements describe team activity documented in the working papers. | Met | Students must confirm individual contributions and personal reflections. |
| Describe deficiencies | Matched four findings, pp. 10–11, to all six failed requirements. | Met | The four open items still require corrective work. |
| Assign risks | Recomputed the ordinal likelihood × impact scores and compared them with the report, workbook and slides. See p. 12. | Met | Ratings apply to the scoped lab. |
| Make implementation recommendations | Reviewed proposed owners, priorities and closure evidence, pp. 12–13. | Met | Owners and target dates require Project Owner confirmation. |

## Technical and publication checks

| Check | Method | Result | Remaining issue |
|---|---|---|---|
| ASVS release and wording | Compared ID, Level and normalized description for each existing matrix row against the official versioned English CSV. | 17 of 17 matched | New workbooks paraphrase each criterion. |
| Verdicts and finding mapping | Reconciled the verification table, spreadsheet formulas and slide results. Checked all Fail-to-finding mappings. | 11 Pass, 6 Fail, 0 Inconclusive, 0 Not Applicable. Four findings. | HT-07 original fieldwork remains historically Inconclusive. |
| High-priority source comparison | Inspected the pinned authentication and rate-limit source. Reviewed the signed-out HTTP record, ordered Playwright observations and direct request evidence. | HT-07, HT-11, HT-12 and HT-17 claims are supported at the stated level. | Three priority live scenarios remain unobserved, and HT-17 does not establish secondary retention. |
| Evidence integrity | Checked user-operated originals, the HT-15 redaction set and the previous academic release manifest. | 30 of 30 retained digests matched | Earlier submissions and evidence stay in the local workspace. |
| Evidence pointers | Verified the canonical matrix paths, current evidence references and links in the new bundle. | 105 Markdown file links, 52 Word local links and 52 PDF local links resolve. | Relative audit links use the existing workspace layout. |
| Report formatting | Exported the editable Word report, updated the contents and rendered all pages. Reviewed figure legibility, tables and pagination. | 14 pages, 9 tables, 4 figures | — |
| Presentation formatting | Rendered with PowerPoint and checked all slides, layouts, figures and speaker notes. | 12 editable slides and 12 note records | — |
| Workbooks | Reopened the three XLSX files and checked cell values, cached formulas, ratings, references and selected rendered views. | 3 verified editable workbooks | — |
| Runtime work | Reviewed retained evidence. Performed no new app HTTP requests, replay or live lockout tests during this revision. | Original observations retain their provenance | A repeat of the ordinary flows would not resolve the exact-credential or lockout questions. |
| Scope and attribution | Verified audited revision and project provenance. Reviewed AI-use disclosure and independence wording. | Tracked application files unchanged | Confirm course-specific AI-use requirements before submission. |

## Release digests

| Deliverable | SHA-256 |
|---|---|
| ASVS_Verification_Matrix.xlsx | c2ddd7ab0874c01f89fd80b60e5749939140b0debd15d201838fc3794adaedaf |
| Auditor_Defense_Notes.md | 39eeae391ae026fb7338750af40e8934675591f842d01f67c7df559d696c3768 |
| CHANGELOG.md | b7219a27a3d17587546dab7d7b93bedc603e7888ac3ca56012a0bfe7261b9496 |
| Evidence_Index.md | 81bd56fef8a97d7f2deac1fca6b99558f162d9447123e6e68229329ef1505dd5 |
| Happy_Town_Final_Audit_Report.docx | 73a3813a4ba463ff05d4ccce7cfb344640ed3430eca498d5e303ec26c05d566e |
| Happy_Town_Final_Audit_Report.md | 06058ef130161d4569d9ccc090cd3a5d6a4467ca25178578fc38bb49f86d8659 |
| Happy_Town_Final_Audit_Report.pdf | b600a84541ef7368debae0ee576af3f70e42ea57265c638b459610ff6a3beb62 |
| Happy_Town_Final_Presentation.pptx | c20fab4f1bf4a4a8dfcda4f8eb596318609075105d3dbd1fe33d88661ba1253f |
| Risk_Assessment.xlsx | f956aebfd0e9b9bd37ebd1ce2e524f2728fe079c8851a54fd03140b09a6255c3 |
| Security_Findings_Register.xlsx | a4acb904b29cb41120356054fb946d9b7234ae0f17c78a2acacc3defe287ec6c |

The checklist is omitted from its own digest table.
