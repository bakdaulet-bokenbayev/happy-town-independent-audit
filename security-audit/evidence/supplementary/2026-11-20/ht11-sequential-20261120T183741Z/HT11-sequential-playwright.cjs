const fs = require("node:fs");
const path = require("node:path");
const { parseEnv } = require("node:util");

const [playwrightPath, auditEnvPath, output] = process.argv.slice(2);
const origin = "http://127.0.0.1:3302";
const revision = "f23375fee54bae8942a1c23a702adb04ed6c99a2";
const expectedName = process.env.HT11_DISPLAYED_TEACHER;
const result = {
  test: "HT-11",
  asvs: "v5.0.0-7.2.4",
  revision,
  database: "happy_town_audit_test",
  origin,
  accountAlias: "TEACHER-A",
  viewport: [1440, 1000],
  language: "en",
  method: "Independent ordinary sign-ins in separate Playwright contexts",
  events: [],
  screenshots: []
};
let phase = "preflight";
const now = () => new Date().toISOString();
const matchesFixture = user => Boolean(user?.id && user.role === "TEACHER" && user.name === expectedName);

async function readSession(context) {
  const response = await context.request.get(origin + "/api/auth/session", {maxRedirects:0});
  return {status:response.status(), user:(await response.json())?.user};
}

async function signIn(browser, alias, credentials) {
  const context = await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,locale:"en-US",serviceWorkers:"block"});
  await context.route("**/*", route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const page = await context.newPage();
  page.setDefaultTimeout(18000);
  phase = alias + " initial anonymous state";
  const before = await readSession(context);
  result.events.push({context:alias, action:"Before sign-in", method:"GET", endpoint:"/api/auth/session", status:before.status, authenticatedUserReturned:Boolean(before.user?.id), timestampUtc:now()});
  if (before.status !== 200 || before.user?.id) throw Error("unexpected initial session");

  phase = alias + " normal English sign-in";
  await page.goto(origin + "/login",{waitUntil:"networkidle"});
  await page.getByRole("button",{name:"English",exact:true}).click();
  await page.waitForFunction(() => document.documentElement.lang === "en");
  await page.getByRole("heading",{name:"Welcome",exact:true}).waitFor();
  await page.locator('input[autocomplete="username"]').fill(credentials.iin);
  await page.locator('input[autocomplete="current-password"]').fill(credentials.password);
  const [callback] = await Promise.all([
    page.waitForResponse(response => {
      const url = new URL(response.url());
      return url.origin === origin && url.pathname === "/api/auth/callback/credentials" && response.request().method() === "POST";
    }),
    page.getByRole("button",{name:"Sign in",exact:true}).click()
  ]);
  const completedUtc = now();
  const session = await readSession(context);
  result.events.push({context:alias,action:"Credentials sign-in",method:"POST",endpoint:"/api/auth/callback/credentials",status:callback.status(),timestampUtc:completedUtc,sessionStatus:session.status,authenticatedUserReturned:Boolean(session.user?.id),matchesTeacherA:matchesFixture(session.user)});
  if (callback.status() !== 200 || session.status !== 200 || !matchesFixture(session.user)) throw Error("teacher identity was not authenticated");
  await page.waitForURL(origin + "/teacher");
  return {context,page,id:session.user.id};
}

async function checkProtected(browserSession, alias, stage, establishedId) {
  phase = alias + " " + stage;
  const {context,page} = browserSession;
  const response = await page.goto(origin + "/teacher",{waitUntil:"domcontentloaded"});
  const landed = await response?.request().redirectedFrom()?.response() ?? response;
  const observedUtc = now();
  const session = await readSession(context);
  const onTeacherPage = new URL(page.url()).origin === origin && new URL(page.url()).pathname === "/teacher";
  const hasTeacherIdentity = matchesFixture(session.user) && session.user.id === establishedId;
  let rendered = false;
  if (landed?.status() === 200 && onTeacherPage) {
    rendered = await page.getByRole("heading",{name:"Teacher Dashboard",exact:true}).waitFor({timeout:8000}).then(() => true, () => false);
  }
  const event = {
    context:alias,action:stage,method:"GET",endpoint:"/teacher",status:landed?.status() ?? null,
    finalPath:new URL(page.url()).pathname, finalStatus:response?.status() ?? null,
    sessionStatus:session.status, authenticatedUserReturned:Boolean(session.user?.id),
    matchesTeacherA:hasTeacherIdentity, dashboardRendered:rendered,
    accepted:landed?.status() === 200 && onTeacherPage && rendered && hasTeacherIdentity,
    timestampUtc:observedUtc
  };
  result.events.push(event);
  return event;
}

async function capture(browserSession, alias, stage) {
  phase = alias + " dashboard screenshot";
  const {page} = browserSession;
  await page.locator(".teacher-welcome h2").waitFor();
  await page.locator(".teacher-quick-grid").waitFor();
  if (await page.locator("html").getAttribute("lang") !== "en") throw Error("unexpected dashboard language");
  await page.evaluate(() => document.fonts.ready);
  const filename = "HT11-context-" + alias + "-" + stage + ".png";
  const img = await page.screenshot({
    path:path.join(output,filename),
    mask:[page.locator(".profile-chip,.help-card,.teacher-welcome p,.dashboard-groups,.activity-grid")],
    maskColor:"#dce5ef",
    animations:"disabled"
  });
  const dimensions = [img.readUInt32BE(16),img.readUInt32BE(20)];
  if (dimensions[0] !== 1440 || dimensions[1] !== 1000) throw Error("unexpected screenshot dimensions");
  result.screenshots.push({context:alias,stage,filename,dimensions,timestampUtc:now()});
}

(async () => {
  if (!playwrightPath || !auditEnvPath || !output || !expectedName) throw Error("missing arguments");
  const env = parseEnv(fs.readFileSync(auditEnvPath, "utf8"));
  const credentials = {iin:env.SEED_TEACHER_IIN,password:env.SEED_TEACHER_PASSWORD};
  if (!/^\d{12}$/.test(credentials.iin || "") || !credentials.password) throw Error("invalid fixture configuration");
  const {chromium} = require(playwrightPath);
  phase = "launch Chromium";
  const browser = await chromium.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true});
  result.browserVersion = browser.version();
  try {
    const first = await signIn(browser,"A",credentials);
    const before = await checkProtected(first,"A","Before second authentication",first.id);
    if (!before.accepted) throw Error("context A baseline not established");
    const second = await signIn(browser,"B",credentials);
    result.bothSignInsMatchedSameAccount = second.id === first.id;
    if (!result.bothSignInsMatchedSameAccount) throw Error("authentication identities differed");

    const afterB = await checkProtected(second,"B","After second authentication",first.id);
    const afterA = await checkProtected(first,"A","After second authentication",first.id);
    if (afterB.accepted) await capture(second,"B","after");
    if (afterA.accepted) await capture(first,"A","after");
  } finally {
    await browser.close();
  }
})().catch(error => {
  result.failure = {phase,errorType:error?.name || "Error"};
  process.exitCode = 1;
}).finally(() => {
  if (output) {
    fs.writeFileSync(path.join(output,"HT11-http-observations.json"),JSON.stringify(result,null,2) + "\n",{flag:"wx"});
  }
  console.log(JSON.stringify({completed:!result.failure,bothSignInsMatchedSameAccount:result.bothSignInsMatchedSameAccount,checks:result.events.filter(event=>event.endpoint==="/teacher"),screenshots:result.screenshots,failure:result.failure}));
});
