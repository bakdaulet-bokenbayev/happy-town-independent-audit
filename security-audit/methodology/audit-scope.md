# Audit scope

The Audit Subject is Happy Town, co-developed by Student Auditors Bakdaulet Bokenbayev and Assel Karzhau. Bakdaulet is the Lead Auditor and Project Owner. Both auditors’ involvement in development creates a self-review limitation. Scope covers the sampled local build and application documentation available at the audited revision. [Audit Team and independence](../audit-plan/audit-plan.md#participants-independence-and-ethics)

**Subject:** Happy Town at commit `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Lab:** Next.js on `http://127.0.0.1:3300` and PostgreSQL at `127.0.0.1:55432` in Compose project `happy-town-audit`  
**Criteria:** [Selected ASVS 5.0.0 Level 1 requirements](../asvs/verification-matrix.csv)  
**Assessment period:** Point-in-time fieldwork during the approved lab window in the [audit plan](../audit-plan/audit-plan.md)

## In-scope sample

| Area | Proposed coverage |
| --- | --- |
| Sign-in and session lifecycle | `/login`, the ordinary credentials, session and sign-out interactions under `/api/auth/`, and supporting Auth.js, validation and account lookup code. |
| Function-level permissions | `/admin`, `/teacher` and `/parent`, plus `/api/admin/entities` as the sampled management endpoint. Inspect the same backend paths that apply the role rules. |
| Record-level permissions | Read-only sample of `/api/students/[id]` and `/api/groups/[id]`, including relevant parent/student and teacher/group relations. |
| Supporting configuration and records | Relevant development configuration, seed, schema, migrations, dependency versions and authentication audit-event samples where they corroborate the selected procedures. |

Cover anonymous, ADMIN, TEACHER and PARENT contexts across the sample. Use distinct synthetic records representing assigned and unassigned students or groups, with ownership and account state confirmed before testing. HT-15 uses two authorized synthetic parents. Favor existing seed records and provision any additional fixtures needed under the Project Owner's authorization. The sample is purposive and risk-based. Record its rationale and limitations, and avoid extrapolation to all endpoints or records.

## Out of scope

- Production or public Happy Town installations, live school data, hosted PostgreSQL, cloud platforms and external systems.
- Unlisted feature workflows, including payments, analytics, bulk administration and the development database diagnostic.
- Legacy Worker, D1 and Drizzle paths, host and container-engine hardening, and dedicated PostgreSQL server hardening.
- Production HTTPS, TLS termination, HSTS and HTTPS cookie behavior, supply-chain advisory or VEX triage, operational resilience, legal compliance and certification.
- Destructive or high-volume testing, exploit development or reproduction, automated offensive testing and interactions outside the authorized local target.

## Entry conditions and changes

Phase 1 recorded basic lab verification in the [environment evidence](../evidence/phase-1-environment.md). Phase 2 defined the [fieldwork procedures and fixture sample](test-plan.md). Use the [authorization checklist](../audit-plan/audit-plan.md#authorization-checklist) to confirm fieldwork arrangements and permission for each case. Verify the exact revision and dedicated lab during environment verification. Record exclusions, evidence gaps and any restrictions in the working papers and final report. If a route, role, data source or runtime configuration changes, document its effect and seek scope confirmation before including it. Report unexpected exposure or sensitive data through the agreed escalation route.
