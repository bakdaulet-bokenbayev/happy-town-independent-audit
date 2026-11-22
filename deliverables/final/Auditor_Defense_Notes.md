# Happy Town defense notes

[Open the 12-slide presentation](Happy_Town_Final_Presentation.pptx) · [Final report](Happy_Town_Final_Audit_Report.pdf) · [Evidence index](Evidence_Index.md)

Use the exact case IDs, statuses and evidence terms. Keep the delivery factual about what the team observed.

## Slide 1 · Audit team and mandate

Introduce the two student auditors, the course and the local Happy Town audit. State that both students contributed to development and identify the self-review limitation.

## Slide 2 · Application architecture

Explain the browser, Next.js server, Auth.js session verification, backend guards and database. Do not equate role checks with session revocation.

## Slide 3 · Objectives and scope

Describe the selected functions, records and synthetic contexts. Note that production, real users and certification were excluded.

## Slide 4 · ASVS criteria

Explain the versioned IDs, the 17-row Level 1 sample and the verdict rules. The workbook maps each criterion to its working paper.

## Slide 5 · Plan and methodology

Walk through 19–22 November. The 21 November baseline was approved after original fieldwork and applies only from approval.

## Slide 6 · Tools and environment

Describe ports 3300 and 3302, the audited revision and the recorded tool roles. The final review used retained evidence.

## Slide 7 · Technical evidence

Explain HT-11 independent contexts, then HT-17 request placement and one result. These are publication excerpts of genuine user captures. Retention and exact-token state remain unobserved.

## Slide 8 · Verification results

Give 11 Pass, 6 Fail and 0 Inconclusive requirements. The absence of Inconclusive verdicts does not remove scenario-level evidence limits.

## Slide 9 · Security findings

Explain HT-F01 to HT-F04. Map HT-11/12 to the common revocation gap and HT-05/07 to the common credential-abuse finding.

## Slide 10 · Risk assessment

Explain L × I with Low=1, Medium=2 and High=3. HT-F01 is 3 (Medium). HT-F02/03/04 are 2 (Low). Consequences and likelihood apply to the scoped lab.

## Slide 11 · Recommendations

Describe proposed owners and closure criteria. Emphasize that the audit did not implement fixes.

## Slide 12 · Limitations and learning

Distinguish source evidence, observed results and unresolved lifecycle tests. Explain the self-review limitation and invite the students to confirm personal reflections.

## Potential questions from the professor

**Why are there no Inconclusive requirement verdicts while some runtime questions remain?** The source and dated policy evidence support the affected requirement decisions. The specific lockout and old-session observations have separate limitations.

**How did you avoid applying the HT-07 baseline retroactively?** The original 19 November decision remains Inconclusive. The 21 November approval governs the later source comparison only.

**What did HT-11 demonstrate in the browser?** Context A retained HTTP 200 dashboard access after B independently authenticated. That sequence alone does not establish how the server handled a specifically superseded credential.

**Why does an anonymous 401 after logout fail to prove revocation?** The ordinary signed-out browser no longer provides its credential. That request does not show the server’s decision for an earlier credential.

**Why do six Fail verdicts map to four findings?** HT-11 and HT-12 share the backend termination gap. HT-05 and HT-07 share the credential-abuse policy and implementation issue. HT-13 and HT-17 map individually.

**What evidence supports a Medium rating for HT-F01?** High potential impact follows from the affected role permissions. The local scope and need for an earlier still-valid credential support Low likelihood, giving a score of 3.

**Did the URL observation prove disclosure?** It established request placement of a synthetic contact value. Access by a third party and downstream retention remain unobserved.

**How independent is this audit?** Both student auditors co-developed the application. The work provides an academic technical assessment subject to self-review.

## Confirm before presenting

- Confirm any individual activities and personal reflections beyond the audit plan.
- Confirm the course’s submission and AI-use disclosure rules.
