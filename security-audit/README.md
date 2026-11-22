# Security Audit of a Self-Hosted Web Application

**Óbuda University · IT Audit, Compliance and Risk Management**

This course project evaluates selected application security controls in Happy Town, an electronic diary and English-school management application. The audit subject is a repeatable, loopback-only lab with synthetic users and records. The criteria are 17 applicable Level 1 requirements from OWASP ASVS 5.0.0. The final report documents the work, evidence and limits of the assessment. [OWASP ASVS 5.0.0 release](https://github.com/OWASP/ASVS/tree/v5.0.0)

**Audit Team.** Bakdaulet Bokenbayev is a Student Auditor, Lead Auditor, Happy Town Co-Developer and Project Owner. Assel Karzhau is a Student Auditor and Happy Town Co-Developer. Their roles create a self-review limitation. [Audit Team and independence](audit-plan/audit-plan.md#participants-independence-and-ethics)

## Project phases

| Phase | Work | Deliverable |
| --- | --- | --- |
| 1. Environment preparation and audit planning | Select the subject, document its boundaries and verify basic local operation. | Audit plan, scope, setup instructions and environment evidence. |
| 2. Criteria and test design | Verify official requirements, assess applicability, define the fixture sample and evidence requirements, and document approvals for fieldwork. | ASVS verification matrix, test plan and authorization checklist. |
| 3. Evidence collection and investigation | Inspect documentation and code, conduct an auditee walkthrough and observe representative control behavior. | Indexed working papers with observations, results and limitations. |
| 4. Evidence validation and risk assessment | Reconcile all case evidence, assess confirmed deficiencies and define remediation and follow-up evidence. | Findings register, risk assessment, remediation plan and evidence gaps. |
| 5. Final reporting | Agree ownership of proposed actions and issue the investigation report with an evidence trail and report limits. | Final audit report, auditee response or representation and action plan. |
| 6. Presentation and follow-up | Present the audit work and lessons learned. Where fixes are available and authorized, retest the affected controls. | Course presentation and follow-up record or retest plan. |

## Project files

| Location | Purpose |
| --- | --- |
| [Audit plan](audit-plan/audit-plan.md) | Audit purpose, participants, methodology, schedule and course references. |
| [Phase 1 proposed baseline](asvs/proposed-baseline.md) | Initial 14 selections and the source and licensing details for the final matrix. |
| [Verification matrix](asvs/verification-matrix.csv) | 17 exact Level 1 requirements with final fieldwork outcomes and relative paths to the working papers. |
| [Test plan](methodology/test-plan.md) | 17 case procedures, fixture definitions, expected outcomes and working-paper guidance. |
| [Application overview](methodology/application-overview.md) | Architecture, components, version inventory, users and trust boundaries. |
| [Environment setup](methodology/environment-setup.md) | Reproducible local startup, reset precautions and smoke checks. |
| [Audit scope](methodology/audit-scope.md) | Boundaries, sampling and Phase 2 entry conditions. |
| [Environment evidence](evidence/phase-1-environment.md) | Observed Phase 1 startup, role smoke checks and database restart results. |
| [Phase 3 execution summary](methodology/test-execution.md) | Scope, case verdicts, fieldwork limitations and links to per-case evidence. |
| [Findings register](findings/findings-register.csv) | Two technical and two documentation findings, evidence, ratings and proposed verification. |
| [Risk assessment](findings/risk-assessment.md) | Case-by-case evidence reconciliation, qualitative rating method and rationales. |
| [Corrective action plan](findings/remediation-plan.md) | Proposed changes and closure evidence for the four findings. |
| [Evidence gaps](findings/evidence-gaps.md) | Evidence needed for HT-07 and the unresolved HT-11 Dynamic Replay Test. |
| [Reassessment](evidence/reassessment/2026-11-19-documentation-review.md) · [Historical snapshot](history/2026-11-19-pre-reassessment/README.md) | Review of the application documentation and the preserved original decisions. |
| [Final audit report](reports/final-audit-report.md) · [Verified PDF](reports/final-audit-report-evidence-review.pdf) | Academic audit conclusions, recommendations and evidence index, including the criterion recheck. |
| [Defense slides](presentation/audit-defense-slides.pptx) · [Speaker notes](presentation/speaker-notes.md) · [Lecturer questions](presentation/defense-questions.md) | Presentation and rehearsal materials. |
| [Final quality review](reports/final-quality-review.md) | Reconciliation, delivery checks and outstanding administrative and follow-up items. |
| [Verification of all 17 criteria](evidence/supplementary/2026-11-21/criterion-recheck/review.md) | Expected controls, observed results, evidence, and the basis for each verdict. |

## Progress

**Phase 1 complete.** The team has documented lab readiness at `http://127.0.0.1:3300`. The startup observations carry no ASVS verification verdicts.

**Phase 2 complete.** The planning matrix initialized all 17 cases as **Not Tested** before fieldwork. The current matrix at the link above contains the Phase 3 outcomes and working-paper references.

**Phase 3 complete.** The Project Owner authorized local synthetic fieldwork. All 17 cases have evidence records. Eleven passed, two failed and four were inconclusive. Results apply to the sampled build, workflows and local environment. [Authorization checklist](audit-plan/audit-plan.md#authorization-checklist) · [Execution summary](methodology/test-execution.md)

**Phase 4 complete.** The original review reconciled the 17 case records and identified the session-termination and admin contact URL findings. The later reassessments and follow-up are reflected in the final totals below. [Risk assessment](findings/risk-assessment.md) · [Remediation plan](findings/remediation-plan.md)

**Phase 5 complete.** The final report records the sampled controls, findings, risk rationales, recommended actions and evidence references. [Final audit report](reports/final-audit-report.md)

**Final revision complete.** A documentation reassessment on 19 November 2026 confirmed two further findings. Independent source review also determined HT-11 to be Fail. Final results are **11 Pass, 6 Fail and 0 Inconclusive** across 17 requirements. Four findings remain open. HT-07 is Fail against the approved baseline. Live lockout remains unobserved. The HT-11 Dynamic Replay Test remains Inconclusive. Phase 3 outcomes remain in the historical execution record. Course logistics, remediation dates and a formal auditee response remain pending. [Final quality review](reports/final-quality-review.md)

## Evidence after baseline approval

The follow-up adds the approved HT-07 policy, a prospective Fail against that policy, a two-context HT-11 observation and an ordinary HT-12 logout observation. The fieldwork decisions and four open findings retain their historical status. The working paper identifies the remaining live and native capture limits. [Baseline approval](evidence/supplementary/2026-11-21/remaining-evidence/HT07-baseline-approval.md) · [Follow-up working paper](evidence/supplementary/2026-11-21/remaining-evidence/working-paper.md) · [Placeholder configuration](.env.audit.example)

## Final evidence review

The final-validation submission contains a reconciled 24-page PDF, a 15-slide presentation, the approved baseline and four labeled HT-15 redacted captures. [Final evidence disposition](evidence/supplementary/2026-11-21/remaining-evidence/final-evidence-disposition.md) · [AI use disclosure](reports/ai-use-disclosure.md) · [Submission archive review](reports/submission-archive-review.md)

[Final dynamic validation evidence index](evidence/supplementary/2026-11-21/final-dynamic-validation/evidence-index.md)

## Final adjudication

The final matrix records **11 Pass, 6 Fail and 0 Inconclusive** across 17 requirements. The earlier 11/5/1 assessment remains historical. HT-07 is Fail on source comparison with the approved prospective baseline. Actual live lockout and timed recovery were not observed. HT-11 is Fail on source evidence. A remained able to access the teacher dashboard after B independently signed in as the same teacher. Acceptance of the exact superseded credential remains unobserved. HT-12 is Fail on source evidence. Ordinary logout was observed, and acceptance of the earlier session remains unobserved. Four findings remain open, one Medium and three Low.

[HT-07 source adjudication](../evidence/supplementary/2026-11-21/final-adjudication-source-review.md) · [HT-11 reassessment](../evidence/supplementary/2026-11-21/ht11-context-reassessment.md)
