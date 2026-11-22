# Happy Town independent auditor guide

Happy Town is a learning-centre management application with administrator, teacher and parent portals. Next.js and React render the interface and expose backend routes. Auth.js handles sign-in and JWT-backed sessions. Prisma manages the PostgreSQL data model and migrations. Role and record-relationship checks run on the server.

Audited application revision is **f23375fee54bae8942a1c23a702adb04ed6c99a2**. This standalone handover snapshot is derived from that revision. See [source and evidence notes](HANDOFF-SCOPE.md) for the disclosure edits and withheld originals.

## Set up an isolated test environment

Use the Node version in .nvmrc, the npm version specified by package.json, and a local Docker Engine with Docker Compose. Use a fresh project name and database or an equivalent isolated PostgreSQL instance. Keep application and database listeners on loopback. Use no production data, production services or existing accounts.

1. Copy .env.example to .env in this checkout. Enter a fresh local database user, password, database and unused local port. Set DATABASE_URL and DIRECT_URL to the same dedicated database. Generate a fresh Auth.js secret, set AUTH_URL and NEXT_PUBLIC_APP_URL to http://127.0.0.1:3302, and keep the demo role switcher disabled.
2. Enter unique synthetic SEED_ADMIN, SEED_TEACHER and SEED_PARENT values for the IIN-format identifier, password and email. Use reserved example domains. The seed code validates the identifier format. Leave production seeding disabled.
3. Run these commands from the snapshot root. Use your own project alias. Choose a free port if 3302 is already in use.

    npm ci
    docker compose -p happy-town-independent-audit up -d --wait postgres
    npx prisma migrate deploy
    npm run db:seed
    npm run db:check
    npm run dev -- --hostname 127.0.0.1 --port 3302

4. Check the URL and confirm the database identity before any browser work. Stop the local application with Ctrl+C. To pause the database without removing its data, use the same Compose project name with the down command and omit the volumes flag.

The optional [audit Compose file](security-audit/compose.yaml) uses host port 55432. Its [placeholder environment template](security-audit/.env.audit.example) must be filled separately when following that route.

## Run existing verification

Use npm test for the repository's tests. npm run typecheck and npm run lint provide additional checks. Report the executed command, audited snapshot, environment and resulting status. Reproduce ordinary sign-in, role-specific route access, ordinary logout and the authorized search with synthetic records in the isolated lab. Compare the observed HTTP status and permitted response fields with the retained record. Exclude credentials and identifiers from shared captures.

## Review the audit

- [Verification matrix](security-audit/asvs/verification-matrix.csv) lists 17 evaluated ASVS requirements, with 11 Pass, 6 Fail and 0 Inconclusive.
- [Findings register](security-audit/findings/findings-register.csv) lists four open findings, one Medium and three Low.
- [Evidence register](security-audit/evidence/evidence-register.md) indexes test IDs and observations. The [22 November records](security-audit/evidence/supplementary/2026-11-22/user-operated-devtools/evidence-index.md) link the supplementary Playwright and user-operated DevTools evidence.
- [Academic submission](Happy-Town-Academic-Submission-2026-11-22/README.md) includes the editable DOCX, PDF, ten-slide PPTX and the shareable evidence index.
- [Release manifest](HANDOFF_SHA256SUMS.txt) covers the files in this snapshot. Historical working papers retain their dates and evidence references. [Source and evidence notes](HANDOFF-SCOPE.md) identify withheld originals and available publication copies.

A source-based Fail records a deviation supported by the audited implementation or configuration. A dynamic observation records the outcome of an actual test. HT-07 is a source-based Fail against the approved prospective baseline. Live lockout and timed recovery remain unobserved. HT-11 is a source-based Fail and ordinary independent-context access was observed. Acceptance of an exact superseded credential remains unobserved. HT-12 is a source-based Fail and ordinary logout was observed. Acceptance of the original pre-logout session remains unobserved.
