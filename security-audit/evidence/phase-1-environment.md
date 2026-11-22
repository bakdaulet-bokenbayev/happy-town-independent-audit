# Phase 1 environment evidence

**Record:** P1-ENV-01  
**Observed:** 19 November 2026, with final smoke checks at approximately 11:07 CET (UTC+01:00)  
**Subject:** Happy Town at `f23375fee54bae8942a1c23a702adb04ed6c99a2`  
**Collection:** Local shell inspection and an HTTP smoke check run by Codex for the student project team

This working paper is a sanitized transcription of the observed commands and outcomes. The checks establish lab readiness for the sampled workflows. ASVS requirements remain unverified.

## Provisioning

| Step | Observed result |
| --- | --- |
| Workspace and target | Git status was clean before creating audit files. The workspace contained the existing Next.js source, lockfile, migrations, seed and a development Compose file. `reference-materials/` was absent. The supplied Downloads attachments were available. |
| Docker engine | Initial `docker version` showed client 29.6.2 with the Docker Desktop Linux named pipe unavailable. After starting Docker Desktop, `docker info` reported server 29.6.2 on Linux. Compose reported v5.3.1. |
| Runtime and dependencies | Node.js v24.16.0. The active npm was 12.0.2 for the workspace smoke run. A separate clean source snapshot completed `npm ci --no-audit --no-fund` with pinned npm 11.13.0, adding 682 packages and running Prisma generation successfully. The lockfile SHA-256 was `e54adbda4a28bfc2f306d2b03313e9f04059cb914d9b88f93e4cef57f9ae6b39`. |
| Dedicated database | Compose config validation succeeded. The `happy-town-audit-postgres-1` container became healthy with PostgreSQL 17.10 and port mapping `127.0.0.1:55432->5432/tcp`. The local host PostgreSQL listener on port 5432 was outside the audit. |
| Image and volume | `postgres:17-alpine` resolved to `postgres@sha256:742f40ea20b9ff2ff31db5458d127452988a2164df9e17441e191f3b72252193`. Compose created `happy-town-audit_postgres_data`. |
| Schema | `prisma generate` generated Prisma Client 7.9.1. `prisma migrate deploy` reported eight migrations applied to `happy_town_audit` at `127.0.0.1:55432`. |
| Seed | Direct invocation of the Prisma CLI's seed command could not resolve `tsx` on the shell PATH. The repository's `npm run db:seed` supplied the npm binary path and completed successfully. `npm run db:check` reported 23 users, 24 students, five groups and one audit event before the HTTP smoke check. |
| Next.js | Next.js 16.2.12 development server reported ready. The host socket inspection reported `127.0.0.1:3300` and `127.0.0.1:55432` for the two audit listeners. |

## Basic HTTP smoke checks

The HTTP client used a fresh cookie jar per role and followed the normal Auth.js credentials and sign-out flows with the seeded synthetic credentials. Raw inputs, cookies and response bodies are omitted.

| Check | Observed result |
| --- | --- |
| Open root and sign-in page | `GET /` returned 307 with a redirect to `/login`. `GET /login` returned 200 with a password input. |
| ADMIN | Credentials callback 302. Session endpoint 200 with the ADMIN role. `GET /admin` returned 200 with main content. Sign-out returned 302 and the next session response contained no user. |
| TEACHER | Credentials callback 302. Session endpoint 200 with the TEACHER role. `GET /teacher` returned 200 with main content. Sign-out returned 302 and the next session response contained no user. |
| PARENT | Credentials callback 302. Session endpoint 200 with the PARENT role. `GET /parent` returned 200 with main content. Sign-out returned 302 and the next session response contained no user. |
| Restart database | Restarted only the audit container and waited until healthy. Without reseeding, `npm run db:check` still reported 23 users, 24 students and five groups. The audit event count was four and eight completed migrations remained in the database. The application returned 200 for `GET /login` after the restart. |
| Verify pinned image | Recreated the audit container from the digest pinned in the final Compose file. It became healthy on PostgreSQL 17.10, retained the same fixture counts without reseeding, and passed the three roles' smoke checks again. |

## Readiness and limitations

Basic lab startup, role sign-in, portal access, sign-out and seed persistence were verified. Docker Desktop startup and the seed PATH issue were resolved. The project files were checked for valid internal links, a consistent subject revision and all 14 requirement IDs being marked Level 1 in the published ASVS 5.0.0 CSV. The audit plan and scope are ready for review. The remaining Phase 2 tasks include naming participants, confirming source-use authority and the current course schedule, agreeing on the scope and test authorization, and confirming the exact synthetic access sample. [Audit plan](../audit-plan/audit-plan.md) · [Setup instructions](../methodology/environment-setup.md)
