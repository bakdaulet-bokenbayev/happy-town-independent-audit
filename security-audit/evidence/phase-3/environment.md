# Phase 3 environment and evidence record

| Field | Observed value |
| --- | --- |
| Authorization | Sole Project Owner, Developer and Authorizing Party approved this local Phase 3 run in writing on 19 November 2026. [Audit plan](../../audit-plan/audit-plan.md#authorization-checklist) |
| Collector | Codex, assisting the Project Owner. No independent reviewer was identified. |
| Fieldwork interval | 19 November 2026, approximately 11:39–11:47 CET (UTC+01:00). Runtime timestamps in the accompanying JSON use UTC. |
| Target | `http://127.0.0.1:3300`. The listener was a Next.js process attached to the recorded audit launcher. An ordinary `GET /login` returned 200. |
| Subject revision | `f23375fee54bae8942a1c23a702adb04ed6c99a2`. Git showed no changes to tracked application files at fieldwork entry. |
| Runtime | Windows host. Node.js 24.16.0, Next.js 16.2.12, React 19.2.8, Auth.js `next-auth` 5.0.0-beta.32 and `@auth/core` 0.41.3, Prisma 7.9.1, `pg` 8.22.0 and Zod 4.4.3. Ordinary HTTP checks used Node, and password field checks used Chrome 157.0.8103.79. |
| Database and network | Docker Engine 29.6.2 (Linux), Compose v5.3.1. The `happy-town-audit` PostgreSQL container was healthy. Its host port was bound to `127.0.0.1:55432`. The database and login role were both `happy_town_audit`. PostgreSQL reported version 17.10 and `ssl=off` in this loopback lab. |
| PostgreSQL image and volume | `postgres:17-alpine@sha256:742f40ea20b9ff2ff31db5458d127452988a2164df9e17441e191f3b72252193` with volume `happy-town-audit_postgres_data`. |

## Synthetic fixtures and cleanup

The dedicated database contained the development seed marker and eight completed migrations. The 23 user IDs, 24 student IDs and five group IDs matched the deterministic development seed before testing. The three usable logins matched the seed-provisioned ADMIN, TEACHER and PARENT roles.

ADMIN-A created PARENT-B and a linked synthetic student through ordinary administration. The active parent relationships and teacher assignments were confirmed independently from the read responses. Record-permission checks used read-only requests. After the checks, the two new records and their relationship were soft-archived and the new account's credential was removed. Active counts returned to 23 users, 24 students and 24 parent/student links. Archived synthetic rows and normal application audit history remain.

## Source and documentation inventory

The tracked project documentation consisted of `README.md` and `I18N_REMAINING.md`. The authentication and authorization statements are in `README.md:48–57`. The Phase 1 and 2 working papers were also available for scope and context. Separate controlled security and access-rule documents were unavailable in the reviewed materials.

## Evidence handling

[observations.json](observations.json) contains sanitized HTTP method, status, route and payload-presence metadata, fixture verification and cleanup outcomes, Chrome observations, and isolated limiter and JWT expiry observations. It contains no credential, session value, raw response body, record identifier or contact value. Browser requests were constrained to the authorized origin. The [login screenshot](HT-06-login.png) was captured with empty inputs.

The headless browser password-field observations completed. Browser sign-in automation timed out, so the authentication and authorization runtime evidence relies on ordinary HTTP client flows. The JWT expiry and limiter checks ran in isolated processes using dummy inputs.
