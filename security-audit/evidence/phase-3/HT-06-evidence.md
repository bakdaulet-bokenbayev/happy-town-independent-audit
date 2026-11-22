# HT-06 — Password masking

| Field | Value |
| --- | --- |
| Evidence ID | P3-HT-06 |
| ASVS requirement | `v5.0.0-6.2.6` · Level 1 |
| Result | **Pass** |
| Date and time | 19 November 2026, 11:46:31–11:47:04 CET for the retained Chrome run |
| Environment | [Happy Town local audit lab](environment.md) |
| Account role or context | ANON |

**Procedure**  
Inspect the rendered login input in a clean local Chrome context. Enter disposable display text, activate the reveal control, restore masking and reload. Capture the empty login card after reload.

**Expected secure behavior**  
The input defaults to `type=password` and reveal requires a deliberate action. The user can restore masking.

**Observed result**  
Chrome reported the input types `password`, `text`, `password` and `password` in that order. The field was empty before the screenshot.

**Supporting evidence**  
`components/login-form.tsx:16–17, 38`. See `browser.mask` in [observations.json](observations.json) and the [empty login card screenshot](HT-06-login.png).

**Limitations**  
The screenshot shows the empty default state. The browser DOM observations establish reveal, restore and reload behavior.
