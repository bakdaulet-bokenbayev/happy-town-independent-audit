const fs = require("node:fs");
const path = require("node:path");
const { parseEnv } = require("node:util");
const [playwrightPath, auditEnvPath, output] = process.argv.slice(2);
const origin = "http://127.0.0.1:3302";
const expectedName = process.env.HT11_DISPLAYED_TEACHER;
const callbackPath = "/api/auth/callback/credentials";
const data = {
  test: "HT-11", asvs: "v5.0.0-7.2.4",
  revision: "f23375fee54bae8942a1c23a702adb04ed6c99a2",
  database: "happy_town_audit_test", origin, account: "TEACHER-A",
  language: "en", viewport: [1440, 1000],
  method: "Two successful Credentials authentications in one uninterrupted browser context",
  events: [], screenshots: [],
  priorSessionControlPerformed: false, previousSessionTestPerformed: false,
  credentialValuesInspected: false, tokenFingerprintsRecorded: false
};
const now = () => new Date().toISOString();
let phase = "preflight";
const record = (entry) => data.events.push({ ...entry, timestampUtc: now() });
const matchesFixture = (user) => Boolean(user?.id && user.name === expectedName && user.role === "TEACHER");

async function getIdentity(context, label, expectedId) {
  const response = await context.request.get(origin + "/api/auth/session", {maxRedirects:0});
  const user = (await response.json()).user;
  const matches = matchesFixture(user) && (!expectedId || user.id === expectedId);
  record({action:label, method:"GET", endpoint:"/api/auth/session", status:response.status(),
    authenticatedUserReturned:Boolean(user?.id), matchesTeacherA:matches, role:matches ? "TEACHER" : null});
  if (response.status() !== 200 || !matches) throw Error("teacher identity not verified");
  return user.id;
}

async function openTeacher(page, label) {
  const response = await page.goto(origin + "/teacher", {waitUntil:"domcontentloaded"});
  const status = response?.status() ?? null;
  const reachedTeacher = page.url() === origin + "/teacher";
  record({action:label, method:"GET", endpoint:"/teacher", status, reachedTeacher});
  if (status !== 200 || !reachedTeacher) throw Error("teacher dashboard did not load");
  await page.getByRole("heading",{name:"Teacher Dashboard",exact:true}).waitFor();
  await page.locator(".teacher-welcome h2").waitFor();
}

async function screenshot(page, label, filename) {
  await page.locator(".teacher-quick-grid").waitFor();
  if (await page.locator("html").getAttribute("lang") !== "en") throw Error("unexpected dashboard language");
  await page.evaluate(() => document.fonts.ready);
  const image = await page.screenshot({path:path.join(output,filename),animations:"disabled",
    mask:[page.locator(".profile-chip,.help-card,.teacher-welcome p,.dashboard-groups,.activity-grid")],
    maskColor:"#dce5ef"});
  const dimensions = [image.readUInt32BE(16),image.readUInt32BE(20)];
  if (dimensions[0] !== 1440 || dimensions[1] !== 1000) throw Error("wrong viewport size");
  data.screenshots.push({action:label,filename,dimensions,timestampUtc:now()});
}

async function authenticateAgain(page, credentials) {
  const outcome = await page.evaluate(async ({ iin, password, callbackPath }) => {
    const csrf = await fetch("/api/auth/csrf",{cache:"no-store",credentials:"same-origin"});
    const csrfToken = (await csrf.json()).csrfToken;
    const challenge = {status:csrf.status,receivedChallenge:Boolean(csrfToken),timestampUtc:new Date().toISOString()};
    if (!csrf.ok || !csrfToken) return {challenge};
    const result = await fetch(callbackPath, {
      method:"POST",
      credentials:"same-origin",
      headers:{"Content-Type":"application/x-www-form-urlencoded","X-Auth-Return-Redirect":"1"},
      body:new URLSearchParams({iin,password,csrfToken,callbackUrl:location.origin+"/teacher"})
    });
    const timestampUtc = new Date().toISOString();
    const {url} = await result.json();
    const redirect = typeof url === "string" ? new URL(url,location.origin) : null;
    return {challenge,callback:{
      status:result.status, timestampUtc, redirectReturned:Boolean(redirect),
      callbackErrorReported:Boolean(redirect?.searchParams.has("error")),
      redirectOriginClass:redirect?.origin === location.origin ? "audited loopback origin" :
        redirect?.hostname === "localhost" && redirect?.port === "3302" ? "local hostname alias" : "other or missing"
    }};
  }, { ...credentials, callbackPath });
  data.events.push({action:"Standard CSRF challenge during active session", method:"GET", endpoint:"/api/auth/csrf", ...outcome.challenge});
  if (outcome.callback) data.events.push({action:"Second Credentials authentication in the same active context", method:"POST", endpoint:callbackPath, ...outcome.callback});
  if (outcome.challenge.status !== 200 || !outcome.challenge.receivedChallenge || outcome.callback?.status !== 200 ||
    !outcome.callback.redirectReturned || outcome.callback.callbackErrorReported) throw Error("second authentication callback failed");
}

(async () => {
  if (!playwrightPath || !auditEnvPath || !output || !expectedName) throw Error("test configuration missing");
  const env = parseEnv(fs.readFileSync(auditEnvPath,"utf8"));
  const credentials = {iin:env.SEED_TEACHER_IIN,password:env.SEED_TEACHER_PASSWORD};
  if (!/^\d{12}$/.test(credentials.iin || "") || !credentials.password) throw Error("synthetic fixture credentials missing");
  const {chromium} = require(playwrightPath);
  phase = "launch Chromium";
  const browser = await chromium.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true});
  data.browserVersion = browser.version();
  try {
    const context = await browser.newContext({locale:"en-US",viewport:{width:1440,height:1000},deviceScaleFactor:1,serviceWorkers:"block"});
    await context.route("**/*", route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    await context.addCookies([{name:"happy-town-locale",value:"en",url:origin}]);
    const page = await context.newPage();
    page.setDefaultTimeout(18000);
    phase = "initial English login";
    await page.goto(origin + "/login", {waitUntil:"networkidle"});
    phase = "wait for the English Credentials form";
    await page.getByRole("heading",{name:"Welcome",exact:true}).waitFor();
    if (await page.locator("html").getAttribute("lang") !== "en") throw Error("unexpected login language");
    phase = "submit initial Credentials form";
    await page.locator('input[autocomplete="username"]').fill(credentials.iin);
    await page.locator('input[autocomplete="current-password"]').fill(credentials.password);
    const [signIn] = await Promise.all([
      page.waitForResponse(response => {
        const url = new URL(response.url());
        return url.origin === origin && url.pathname === callbackPath && response.request().method() === "POST";
      }),
      page.getByRole("button",{name:"Sign in",exact:true}).click()
    ]);
    record({action:"Initial Credentials authentication", method:"POST", endpoint:callbackPath, status:signIn.status()});
    if (signIn.status() !== 200) throw Error("initial callback failed");
    await page.waitForURL(origin + "/teacher");
    const accountId = await getIdentity(context,"Initial authenticated identity");
    await openTeacher(page,"Protected dashboard before second authentication");
    await screenshot(page,"Initially authenticated dashboard","HT11-initial-dashboard.png");

    phase = "re-authentication in the first context";
    await authenticateAgain(page,credentials);
    data.sameContextSecondCallbackCompleted = true;
    phase = "verify current authenticated context";
    await openTeacher(page,"Protected dashboard after second authentication");
    const currentId = await getIdentity(context,"Authenticated identity after second authentication",accountId);
    data.accountIdMatchedBeforeAndAfter = currentId === accountId;
    await screenshot(page,"Authenticated dashboard after second callback","HT11-post-reauth-dashboard.png");
  } finally {
    await browser.close();
  }
})().catch(error => {
  data.failure = {phase,errorType:error?.name || "Error"};
  process.exitCode = 1;
}).finally(() => {
  if (output) fs.writeFileSync(path.join(output,"HT11-http-observations.json"),JSON.stringify(data,null,2) + "\n",{flag:"wx"});
  console.log(JSON.stringify({completed:!data.failure,events:data.events,screenshots:data.screenshots,
    accountIdMatchedBeforeAndAfter:data.accountIdMatchedBeforeAndAfter,failure:data.failure}));
});
