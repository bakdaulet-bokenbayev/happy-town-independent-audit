import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { compileFunction } from "node:vm";
import test from "node:test";

const root = resolve(process.env.HAPPY_TOWN_AUDIT_WORKTREE || process.cwd());
const fromProject = createRequire(resolve(root, "package.json"));
const ts = fromProject("typescript");

// Run the audited source with explicit in-memory seams. Do not initialize
// Next.js, Prisma, real Auth.js handlers, cookies, or any transport.
function loadSource(file, dependencies = {}) {
  const path = resolve(root, file);
  const compiled = ts.transpileModule(readFileSync(path, "utf8"), {
    fileName: path,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const mod = {exports: {}};
  function onlyAllowed(name) {
    assert.ok(Object.hasOwn(dependencies, name), "Unexpected runtime dependency");
    return dependencies[name];
  }
  compileFunction(compiled, ["require", "module", "exports", "process"], { filename: path })(
    onlyAllowed, mod, mod.exports, { env: {} },
  );
  return mod.exports;
}

const teacher = Object.freeze({ id: "fixture-teacher", role: "TEACHER", firstName: "Synthetic", lastName: "Teacher", email: null });
let config;
loadSource("auth.ts", {
  "next-auth": value => { config = value; return {}; },
  "next-auth/providers/credentials": provider => provider,
  bcryptjs: { compare: () => { throw Error("Password verification was not part of this test"); } },
  zod: fromProject("zod"),
  "./lib/db/prisma": {},
  "./lib/auth/login-rate-limit": {},
});
assert.equal(config.session.strategy, "jwt");

function guard(initialSession, activeAccount = true) {
  let session = initialSession;
  let lookups = 0;
  const {requireTeacher} = loadSource("lib/auth/authorization.ts", {
    "next/navigation": {redirect: () => assert.fail("Unexpected redirect in API guard")},
    "../../auth": {auth: async () => session},
    "../errors/app-error": loadSource("lib/errors/app-error.ts"),
    "../db/prisma": {prisma: {user: {findFirst: async ({where}) => {
      lookups++;
      assert.deepEqual(where, {id: teacher.id, status: "ACTIVE", archivedAt: null});
      return activeAccount ? teacher : null;
    }}}},
  });
  return {requireTeacher, setSession: value => { session = value; }, lookups: () => lookups};
}

const unauthorized = error => error.code === "UNAUTHORIZED" && error.status === 401;

test("HT-11 consumes the application identity mapping for two successive sign-ins", async () => {
  const [first, second] = [1, 2].map(() => {
    const claims = config.callbacks.jwt({ token: {}, user: teacher });
    return config.callbacks.session({ session: { user: {} }, token: claims });
  });
  assert.deepEqual(first, {user: {id: teacher.id, role: "TEACHER"}});
  assert.deepEqual(second, first);
  const gate = guard(first);
  assert.equal((await gate.requireTeacher()).userId, teacher.id);
  gate.setSession(second);
  assert.equal((await gate.requireTeacher()).userId, teacher.id);
  assert.equal(gate.lookups(), 2);
});

test("HT-11 denies a request when the trusted session boundary returns no current identity", async () => {
  const gate = guard(null);
  await assert.rejects(() => gate.requireTeacher(), unauthorized);
  assert.equal(gate.lookups(), 0);
});

test("Session guards reject an unavailable account on a fresh account lookup", async () => {
  const gate = guard({user: {id: teacher.id, role: "TEACHER"}}, false);
  await assert.rejects(() => gate.requireTeacher(), unauthorized);
  assert.equal(gate.lookups(), 1);
});

test("HT-12 installed Auth.js sign-out calls cleanup and the app guard denies a signed-out request", async () => {
  const nextRoot = createRequire(fromProject.resolve("next-auth/package.json"));
  const core = nextRoot.resolve("@auth/core");
  const signOutFile = resolve(core, "../lib/actions/signout.js");
  const {signOut} = await import(pathToFileURL(signOutFile).href);
  const gate = guard({user: {id: teacher.id, role: "TEACHER"}});
  assert.equal((await gate.requireTeacher()).userId, teacher.id);
  const fixture = Symbol("in-memory marker that cannot be sent as a credential");
  const removal = Object.freeze({action: "test cleanup"});
  let cleaned = 0;
  const result = await signOut([], {
    value: fixture,
    clean() { cleaned++; gate.setSession(null); return [removal]; },
  }, {
    session: config.session,
    callbackUrl: "/login",
    cookies: {sessionToken: {name: "fixture-only"}},
    events: config.events ?? {},
    logger: {error: () => assert.fail("Unexpected sign-out action error")},
    jwt: {decode: async input => {
      assert.equal(input.token, fixture);
      return { userId: teacher.id, role: "TEACHER" };
    }},
  });
  assert.equal(result.redirect, "/login");
  assert.deepEqual(result.cookies, [removal]);
  assert.equal(cleaned, 1);
  await assert.rejects(() => gate.requireTeacher(), unauthorized);
});

test.todo("HT-11 server-side invalidation of the earlier session after re-authentication remains unverified");
test.todo("HT-12 server-side invalidation of the earlier session after logout remains unverified");