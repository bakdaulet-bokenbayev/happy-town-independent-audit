# Supplementary browser evidence

The 22 November observations used the audited revision f23375fee54bae8942a1c23a702adb04ed6c99a2, Google Chrome 157.0.8103.79 and the isolated listener at 127.0.0.1:3302.

| Evidence | Observation | File |
|---|---|---|
| HT11-UO-01 | Context A's GET /teacher returned HTTP 200 after an independent sign-in by Context B. The dashboard rendered. | [User capture excerpt](HT11-UO-01-headers-excerpt.png) |
| HT11-UO-PW | A signed in first. B signed in as the same synthetic teacher. A did not sign in again before the protected request. | [Playwright observations](HT11-UO-PW-playwright-observation.json) |
| HT17-UO-01 | At 08:05:40 UTC the authorized GET put a synthetic email in the request URL and returned HTTP 200. | [User capture excerpt](HT17-UO-01-headers-excerpt.png) |
| HT17-UO-02 | The paired Response displayed a JSON total of one. | [User capture excerpt](HT17-UO-02-response-excerpt.png) |
| HT17-UO-PW | Separate Playwright observation at 07:58:12 UTC using the same marker. HTTP 200 with one matching synthetic fixture. | [Playwright observations](HT17-UO-PW-playwright-observation.json) |
| HT-12 ordinary logout | Ordinary POST logout returned HTTP 200. The same browser's subsequent session request returned HTTP 200 without a user. | [HTTP observations](ordinary-logout-http.json) · [Chrome status](HT12-chrome-status.png) · [Chrome Response](HT12-chrome-devtools.png) |

HT-07 live lockout and timed recovery remain unobserved. HT-11 exact superseded-credential acceptance and HT-12 original pre-logout session acceptance remain unobserved.
