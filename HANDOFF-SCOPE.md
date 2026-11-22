# Handover source and evidence notes

This is a local copy for independent review. The underlying application source is drawn from audited Git revision f23375fee54bae8942a1c23a702adb04ed6c99a2. The handover commit has fresh ancestry. The original source repository and its history remain available for provenance. The snapshot contains disclosure edits to sample data, environment templates and build/test fixtures. Authentication, authorization and other security-control source files are preserved from the audited revision. Historical audit classifications and findings are preserved.

## Changes in this copy

- .gitattributes — Retains the exact bytes of evidence files and academic deliverables so Git cannot alter their recorded hashes.
- .env.example — Only variable names, blank secrets and safe local defaults are included.
- .github/workflows/quality.yml — A credential-free loopback URL replaces a non-connecting build or unit-test fixture.
- .gitignore — Ignores populated environment files, authentication artifacts, archives, logs and dumps.
- components/admin-shell.tsx — The static support telephone display uses a placeholder in this copy.
- components/role-shell.tsx — The static support telephone display uses a placeholder in this copy.
- lib/mock-data.ts — Static demo person names and contact fields use neutral placeholders.
- lib/teacher-data.ts — Pseudonyms and blank phone values replace names and contact values in the static teacher demo fixtures.
- security-audit/.env.audit.example — Only variable names, blank secrets and safe local defaults are included.
- tests/group-creation-conflicts.test.mjs — A credential-free loopback URL replaces a non-connecting build or unit-test fixture.

Historical development logs and populated environment files are excluded. The runnable audit setup is documented in the auditor guide.

## Evidence held locally

- security-audit/evidence/supplementary/2026-11-21/chrome-native-devtools-captures/HT-15/HT15-01-headers.png
- security-audit/evidence/supplementary/2026-11-21/chrome-native-devtools-captures/HT-15/HT15-01-response.png
- security-audit/evidence/supplementary/2026-11-21/chrome-native-devtools-captures/HT-15/HT15-02-headers.png
- security-audit/evidence/supplementary/2026-11-21/chrome-native-devtools-captures/HT-15/HT15-02-response.png
- security-audit/evidence/supplementary/2026-11-21/criterion-recheck/ht07-provider.test.mjs
- security-audit/evidence/supplementary/2026-11-22/user-operated-devtools/HT11-UO-01-headers.png
- security-audit/evidence/supplementary/2026-11-22/user-operated-devtools/HT17-UO-01-headers.png
- security-audit/methodology/environment-setup.md
- security-audit/presentation/audit-defense-slides.pptx
- security-audit/reports/final-audit-report-evidence-review.pdf
- security-audit/reports/final-audit-report-follow-up.pdf
- security-audit/reports/final-audit-report-verified.pdf
- security-audit/reports/final-audit-report.pdf

For HT-15, use the [publication copies and provenance record](security-audit/evidence/supplementary/2026-11-21/submission-redactions/HT-15/README.md). For HT-11 and HT-17, use the [academic evidence index](Happy-Town-Academic-Submission-2026-11-22/evidence/evidence-index.md) for the published DevTools excerpts. Use the academic report and defense deck for the released versions. The audit workspace retains the held originals. A reference to a held original remains a reference to that original, and hashes for publication excerpts describe the excerpts.
