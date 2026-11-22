# Chrome DevTools follow-up

**Evidence ID** FDV-CUA-SESSION-01  
**Date** 21 November 2026 CET  
**Build** f23375fee54bae8942a1c23a702adb04ed6c99a2  
**Client** Google Chrome 157.0.8103.79, incognito

Computer Use opened native Chrome DevTools. The selected anonymous request to the isolated local listener was **GET /api/auth/session**. DevTools Headers showed **200 OK**. The Response tab displayed the JSON value **null**, as expected for a browser with no authenticated user. Capture times are recorded separately from the request in the observation record.

| Panel | Capture time CET | Submission copy |
| --- | --- | --- |
| Headers | 22:02:40 | [Native Headers capture](submission/FDV-CUA-SESSION-01-headers-chrome-window.png) |
| Response | 22:03:26 | [Native Response capture](submission/FDV-CUA-SESSION-01-response-chrome-window.png) |

No credentials were entered. The original Windows captures are preserved in local evidence. The submission copies show the genuine Chrome pixels with the Windows taskbar and screen border cropped out. This anonymous baseline supplies no additional verdict on live rate limiting, superseded sessions or earlier sessions after logout.

[HTTP observation and image digests](observation.json) · [SHA-256 checksums](SHA256SUMS.txt)
