# HT-01 — Protected database queries

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-01 |
| ASVS requirement | `v5.0.0-1.2.4` · Level 1 |
| Result | **Pass** |
| Date and time | 19 November 2026, 11:42:49–11:42:58 CET for the runtime sample, with source review during fieldwork |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ANON at sign-in and ADMIN-A |

**Procedure**  
Trace the credentials lookup and the management list search from input through the server to the database access calls. Use ordinary sign-in and the synthetic teacher-contact lookup as runtime corroboration.

**Expected secure behavior**  
The sampled identifiers and search terms reach the database as ORM values or bound parameters, with query structure controlled by the server.

**Observed result**  
The credentials handler parses the input and supplies the identity as the Prisma `findUnique` filter. The admin handler authorizes ADMIN and passes the search term to the repository. The repository passes it as a `contains` operand inside structured Prisma `findMany` and `count` arguments. The scoped paths use Prisma with the PostgreSQL adapter. The normal credential check completed and the admin search returned the one known synthetic result.

**Supporting evidence**  
`auth.ts:24–36`, `app/api/admin/entities/route.ts:10–13`, `lib/repositories/admin.repository.ts:82–99`, and `lib/db/prisma.ts:1–14`. Runtime references `http.ordinarySignIn` and `http.requestLocations` in [observations.json](observations.json).

**Limitations**  
Source inspection establishes the mechanism for the selected calls. The result is limited to the identified lookup and list paths.
