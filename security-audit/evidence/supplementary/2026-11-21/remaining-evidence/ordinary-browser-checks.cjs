const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const { createHash } = require("node:crypto");
const { readFileSync, writeFileSync } = require("node:fs");
const path = require("node:path");

const [playwrightPath, chrome, destination, mode] = process.argv.slice(2);
const { chromium } = require(playwrightPath);
const origin = "http://127.0.0.1:3302";
const revision = "f23375fee54bae8942a1c23a702adb04ed6c99a2";
const scope = "happy_town_audit_test";
const profile = path.join(__dirname, "../../../..", ".env.audit");
const env = new Map(readFileSync(profile, "utf8").split(/\r?\n/).map(line => {
  const match = /^([A-Z][A-Z_0-9]*)=(.*)$/.exec(line);
  return match ? [match[1], match[2]] : ["", ""];
}));
const iin = env.get("SEED_TEACHER_IIN");
const password = env.get("SEED_TEACHER_PASSWORD");
const mismatch = "audit-known-negative-input";
assert.ok(/^0{9}\d{3}$/.test(iin ?? "") && password && password !== mismatch, "Synthetic fixture precondition");

function selectAuditEvents(since) {
  const lower = since && /^\d{4}-\d\d-\d\dT[0-9:.]+Z$/.test(since) ? since : null;
  const interval = lower ? `AND "createdAt" >= (TIMESTAMPTZ '${lower}' AT TIME ZONE 'UTC')` : "";
  const query = `BEGIN READ ONLY; SELECT current_database(), count(*) FROM audit_logs;
    SELECT action::text, metadata->>'result', count(*) FROM audit_logs
    WHERE "entityType" = 'Authentication' ${interval} GROUP BY 1,2 ORDER BY 1,2; ROLLBACK;`;
  const lines = execFileSync("docker", ["exec", "happy-town-audit-postgres-1", "psql", "-X", "-qAt",
    "-U", "happy_town_audit", "-d", scope, "-v", "ON_ERROR_STOP=1", "-c", query],
    { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim().split(/\r?\n/);
  const [database, count] = lines.shift().split("|");
  assert.equal(database, scope, "Database attestation");
  return {
    database, total: Number(count),
    authenticationEvents: lines.map(line => {
      const [action, result, quantity] = line.split("|");
      assert.ok(["LOGIN", "LOGIN_FAILED"].includes(action) &&
        ["SUCCESS", "INVALID_CREDENTIALS", "INVALID_INPUT", "RATE_LIMITED", "ACCOUNT_UNAVAILABLE"].includes(result));
      return { action, result, count: Number(quantity) };
    }),
  };
}

const log = {
  revision, origin, environment: scope, startedUtc: new Date().toISOString(),
  events: [], screenshots: [],
};
let stage = "preflight";
let errors = 0;
const save = () => writeFileSync(path.join(destination, mode === "logout" ? "logout-http.json" : "browser-http.json"), JSON.stringify(log, null, 2) + "\n");
const now = () => new Date().toISOString();
const at = response => new URL(response.url());
const post = (page, endpoint) => page.waitForResponse(r => r.request().method() === "POST" && at(r).pathname === endpoint);
function record(id, context, method, endpoint, status, extra = {}) {
  const result = { id, testId: "HT-" + id.slice(5, 7), context, timestampUtc: now(), method, endpoint, status, ...extra };
  log.events.push(result);
  save();
  return result;
}

async function makeContext(browser) {
  const context = await browser.newContext({ locale: "en-US", viewport: { width: 1440, height: 1000 }, serviceWorkers: "block" });
  await context.route("**/*", route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  return context;
}

async function session(page, id, label) {
  const data = await page.evaluate(async () => {
    const response = await fetch("/api/auth/session", { cache: "no-store" });
    const body = await response.json();
    return { status: response.status, hasUser: Boolean(body?.user), role: body?.user?.role ?? null, identity: body?.user?.id ?? null };
  });
  const { identity, role, hasUser, status } = data;
  assert.ok(role === null || role === "TEACHER", "Unexpected role");
  record(id, label, "GET", "/api/auth/session", status, { authenticatedUserReturned: hasUser, role });
  return identity;
}

async function signIn(page, id, label, supplied, expectedAccepted) {
  await page.goto(origin + "/login", { waitUntil: "networkidle" });
  stage += " (waiting for verified English UI)";
  await page.getByRole("button", { name: "English", exact: true }).click();
  await page.waitForFunction(() => document.documentElement.lang === "en");
  await page.getByRole("heading", { name: "Welcome", exact: true }).waitFor();
  stage += " (form submission)";
  await page.locator("input[autocomplete=username]").fill(iin);
  await page.locator("input[autocomplete=current-password]").fill(supplied);
  const endpoint = "/api/auth/callback/credentials";
  const [response] = await Promise.all([post(page, endpoint), page.locator("button.login-submit").click()]);
  const json = await response.json().catch(() => null);
  const returnedError = json?.url ? new URL(json.url).searchParams.has("error") : null;
  record(id, label, "POST", endpoint, response.status(), { callbackReturnedError: returnedError });
  if (expectedAccepted) {
    await page.waitForURL(u => u.pathname === "/teacher");
  } else {
    await page.locator(".login-error").waitFor();
  }
  assert.equal(returnedError, !expectedAccepted, "Callback outcome");
}

async function dashboard(page, id, label) {
  const response = await page.goto(origin + "/teacher", { waitUntil: "domcontentloaded" });
  const shown = await page.locator(".role-content").isVisible();
  record(id, label, "GET", "/teacher", response.status(), { protectedContentRendered: shown, finalPath: at(response).pathname });
  return shown;
}

async function captureSafe(page, locator, id) {
  const filename = id + ".png";
  const buf = await page.locator(locator).screenshot({ animations: "disabled" });
  writeFileSync(path.join(destination, filename), buf);
  log.screenshots.push({ id, testId: "HT-" + id.slice(5, 7), timestampUtc: now(), filename,
    type: "Playwright page screenshot", sha256: createHash("sha256").update(buf).digest("hex") });
  save();
}

async function run() {
  const before = selectAuditEvents();
  log.databasePreflight = { database: before.database, auditEventCount: before.total };
  const browser = await chromium.launch({ executablePath: chrome, headless: true });
  log.browserVersion = browser.version();
  log.playwrightVersion = require(path.join(playwrightPath, "package.json")).version;
  save();
  try {
    if (mode === "logout") {
      stage = "HT-12 ordinary sign-in for logout check";
      const context = await makeContext(browser);
      const page = await context.newPage();
      await signIn(page, "RV-HT12-11", "Single browser", password, true);
      assert.ok(await dashboard(page, "RV-HT12-12", "Single browser"));
      stage = "HT-12 logout confirmation";
      await page.locator(".top-actions.desktop-actions button.icon-btn").click();
      const [response] = await Promise.all([
        post(page, "/api/auth/signout"), page.getByRole("dialog").locator(".danger-btn").click(),
      ]);
      record("RV-HT12-13", "Single browser", "POST", "/api/auth/signout", response.status());
      await response.finished();
      stage = "HT-12 signed-out session and protected-route observations";
      const signedOut = await context.request.get(origin + "/api/auth/session", { maxRedirects: 0 });
      const hasUser = Boolean((await signedOut.json())?.user);
      record("RV-HT12-14", "Signed-out original browser", "GET", "/api/auth/session", signedOut.status(), { authenticatedUserReturned: hasUser });
      assert.equal(hasUser, false);
      await page.goto(origin + "/login", { waitUntil: "domcontentloaded" });
      await captureSafe(page, ".login-brand", "RV-HT12-15");
      const route = await context.request.get(origin + "/teacher", { maxRedirects: 0 });
      const body = await route.text();
      const protectedContentRendered = body.includes("role-content") && body.includes("page-heading");
      record("RV-HT12-16", "Signed-out original browser", "GET", "/teacher", route.status(), { protectedContentRendered });
      assert.equal(protectedContentRendered, false);
      await context.close();
      log.completed = true;
      return;
    }
    stage = "HT-07 ordinary rejected input";
    const negative = await makeContext(browser);
    const negativePage = await negative.newPage();
    await signIn(negativePage, "RV-HT07-01", "Rejected-input sample", mismatch, false);
    assert.equal(await session(negativePage, "RV-HT07-02", "Rejected-input sample"), null);
    await negative.close();

    stage = "HT-11 Context A ordinary sign-in";
    const a = await makeContext(browser);
    const pageA = await a.newPage();
    await signIn(pageA, "RV-HT11-01", "A", password, true);
    assert.ok(await dashboard(pageA, "RV-HT11-02", "A"));
    const identityA = await session(pageA, "RV-HT11-03", "A");
    assert.ok(identityA);

    stage = "HT-11 Context B independent ordinary sign-in";
    const b = await makeContext(browser);
    const pageB = await b.newPage();
    await signIn(pageB, "RV-HT11-04", "B", password, true);
    const identityB = await session(pageB, "RV-HT11-05", "B");
    assert.ok(identityB);
    assert.equal(identityA === identityB, true, "Synthetic account equality");
    log.contextsMatchedSameAccount = true;

    stage = "HT-11 ordinary protected access in original Context A";
    assert.ok(await dashboard(pageA, "RV-HT11-06", "A after B signs in"));
    assert.equal((await session(pageA, "RV-HT11-07", "A after B signs in")) === identityA, true);
    log.contextAStillMatchedAccount = true;
    await captureSafe(pageA, ".page-heading", "RV-HT11-08");

    stage = "HT-12 ordinary sign-out in Context A";
    await pageA.locator(".top-actions.desktop-actions button.icon-btn").click();
    const [signout] = await Promise.all([
      post(pageA, "/api/auth/signout"), pageA.getByRole("dialog").locator(".danger-btn").click(),
    ]);
    record("RV-HT12-01", "A", "POST", "/api/auth/signout", signout.status());
    await pageA.waitForURL(u => u.pathname === "/login");
    assert.equal(await session(pageA, "RV-HT12-02", "A signed out"), null);
    await captureSafe(pageA, ".login-brand", "RV-HT12-03");
    assert.equal(await dashboard(pageA, "RV-HT12-04", "A signed out"), false);
    await a.close();
    await b.close();
    log.completed = true;
  } finally {
    await browser.close();
    const after = selectAuditEvents(log.startedUtc);
    log.databasePostflight = { database: after.database, auditEventCount: after.total,
      changeInAuditEventCount: after.total - before.total, authenticationEventsDuringRun: after.authenticationEvents };
    log.finishedUtc = now();
    save();
  }
}

run().then(() => process.stdout.write("Completed ordinary browser checks and wrote redacted observations.\n")).catch(() => {
  if (errors++ === 0) {
    log.failedAt = stage;
    log.completed = false;
    save();
  }
  process.stderr.write("Ordinary browser check stopped at " + stage + ". See partial redacted observations.\n");
  process.exitCode = 1;
});




