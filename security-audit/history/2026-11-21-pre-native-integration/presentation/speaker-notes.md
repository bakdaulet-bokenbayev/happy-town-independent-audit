# Happy Town audit defense speaker notes

**Suggested speaking order:** Bakdaulet presents slides 1–6. Assel presents slides 7–13. Allow 10–15 minutes before discussion. This division is for the defense.

## Slide 1 — Title and Audit Team

Good morning. We are presenting the Security Audit of Happy Town for the IT Audit, Compliance and Risk Management course at Óbuda University. I am Bakdaulet Bokenbayev, Lead Auditor, and this is Assel Karzhau, Auditor. We co-developed Happy Town, and I am the Project Owner. The professor approved this arrangement for the academic assignment. Reviewing our own application limits independence, so we describe the results as an academic self-assessment. We will show what we reviewed, the evidence behind our conclusions and what the application should address next.

## Slide 2 — Application overview

Happy Town is an electronic diary and management platform for an English learning centre. It brings together students, groups, attendance, homework and progress. Administrators manage accounts, records and relationships. Teachers work with assigned groups and students, and parents see their linked students. Student records themselves have no sign-in role. The browser shows a React interface. The Next.js server runs on Node.js and uses Auth.js for sign-in and sessions. Prisma connects the application to PostgreSQL. The important boundary is the server. Before returning a protected record, it decides who is asking and whether the account has access.

## Slide 3 — Audit objective and scope

The objective was to assess selected safeguards for credentials, sessions and school records. The scope included sign-in, sign-out, the three role portals, a sample of admin functions and student and group reads. We also examined the related source, configuration and application documentation. The investigation took place on a single local build with a separate database and synthetic accounts and records. Production, live school data and third-party infrastructure were excluded. The use of local HTTP also limits conclusions about production transport security. These boundaries matter because the results only describe the control behavior and documentation we sampled.

## Slide 4 — Audit criteria

OWASP ASVS is a set of application security verification requirements. It gives us a clear expectation against which to compare the observed behavior and documentation. We used the official 5.0.0 release and kept the version in the requirement IDs so each case can be traced to the same text. Our selection covered 17 applicable Level 1 requirements. It focused on account access, session state and school records, within the time and tools available for the project. Some criteria require documented rules, and others require implemented behavior. The conclusions cover this selection. Full conformance and certification were outside the audit.

## Slide 5 — Audit plan and methodology

The audit began with scope, authorization and lab preparation. We then mapped the selected ASVS requirements to planned cases and synthetic fixtures. Original fieldwork took place on 19 November 2026, from about 11:39 to 11:47 CET. The working papers record the expected and observed results, the supporting evidence and the relevant limitations. After fieldwork, we reconciled the cases and assessed risk. Later that day, a separate documentation reassessment evaluated two requirements against the existing project materials after the professor’s feedback. The original records still show the original decisions. The final matrix shows the revised decisions with evidence links.

## Slide 6 — Tools and environment

Original fieldwork used the app on port 3300. The Playwright follow-up used port 3302 and an isolated copy of the synthetic database on the same audited revision. Docker Compose provided the dedicated PostgreSQL database, and database checks confirmed the synthetic fixtures. The investigation used local HTTP requests through Node.js, source and configuration inspection, and Chrome for the password-field check. Isolated checks also examined the limiter and JWT expiry. Git identified the application revision so the working papers could reference what was actually reviewed. React, Auth.js and Prisma describe the application stack. ASVS supplied the criteria, while the tools supplied evidence. Assel will now walk through examples, explain the final outcomes and show how the findings were rated.

## Slide 7 — Testing and evidence

The English sign-in screen is supplementary evidence from 20 November. The separate captures in the report show masking, explicit reveal of a harmless display string and restored masking. On port 3302, Playwright observed the same administrator list request for each role. ADMIN received 200 with items. TEACHER and PARENT received 403 without items. PARENT-A received 200 for its linked student and 404 without student data for the other fixture. PARENT-C lacked sign-in credentials, so its positive control was unavailable in the follow-up. The original investigation on port 3300 recorded its own role and record comparisons.

## Slide 8 — Verification results

All 17 requirements had fieldwork in whole or in part. The original totals were eleven Pass, two Fail and four Inconclusive. Documentation review changed HT-05 and HT-13 to Fail. Independent source review found that re-authentication issues a fresh JWT without terminating the prior token on the server, so HT-11 is also Fail. The final totals are eleven Pass, five Fail and one Inconclusive. HT-07 is the remaining Inconclusive requirement. The HT-11 Dynamic Replay Test is still Inconclusive because the old JWT was never tested after re-authentication.

## Slide 9 — Technical findings

The first technical finding, HT-F01, is Medium risk and concerns logout. Ordinary sign-out on port 3302 returned HTTP 200, and the same browser's subsequent session response contained no user. Source inspection found no server-side revocation. HT-11 concerns re-authentication as a separate trigger for the same control gap. It is a source-based Fail and does not add a finding. The server's response to the old JWT was not observed after either trigger. For HT-F02, Playwright captured the exact synthetic email in a GET query, with HTTP 200 and one matching teacher. Downstream retention and disclosure were unverified.

## Slide 10 — Documentation findings

The documentation review used the audited repository revision. The application README and the localization QA notes were its standalone written documents. HT-F03 concerns the sign-in limiter. The README mentions it but leaves out its configuration, reset behavior and safeguards against malicious account lockout. HT-F04 concerns authorization. The README describes roles and ownership checks at a high level, but leaves important function permissions and record attributes incomplete. The dated reassessment explains each omission. These findings concern the available application documentation. The sampled function, record and backend authorization controls retained their Pass outcomes.

## Slide 11 — Risk assessment

We used the course model that combines likelihood and impact. Likelihood asks how plausible the scenario is within this local environment. Impact asks what the affected control protects and what could happen. HT-F01 is Medium. Continued privileged access could have High impact, while having a valid prior session and reaching the lab makes likelihood Low. HT-F02 and HT-F03 are Medium likelihood and Low impact in this scope. HT-F04 is Low likelihood and Medium impact because a bounded record exposure would depend on a future inconsistent change. The matrix places each finding in its cell, giving one Medium and three Low ratings.

## Slide 12 — Corrective actions

Server-side session invalidation is the first priority. HT-F01 covers logout. HT-11 requires the same server-side control to terminate a superseded session when re-authentication succeeds. Verify the triggers separately. Closure evidence for HT-11 must show denial of the superseded session and acceptance of its replacement. For contact search, use a validated POST body and keep the term out of logs and caches. Maintain the two policies for credential-abuse protection and role and record permissions. Four findings remain open. Target dates and a formal auditee response are pending.

## Slide 13 — Conclusion and limitations

The final record covers 17 requirements with eleven Pass, five Fail and one Inconclusive. Four findings remain open. HT-07 lacks the operating baseline needed to assess credential-abuse implementation. HT-11 is Fail on source evidence. Its Dynamic Replay Test remains Inconclusive because the old token was not tested after re-authentication. The assessment covered one local revision, synthetic data and selected ASVS criteria. Both auditors co-developed the application, which limits independence. The professor accepted the arrangement for this academic assignment. Thank you. Questions?
