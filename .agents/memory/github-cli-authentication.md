---
name: GitHub authorization
description: Distinguish public repository reads from authenticated GitHub writes.
---

Do not infer that GitHub push authorization works solely because a fetch succeeds.

**Why:** Fetching this public repository succeeded, but pushing was rejected for invalid credentials despite the source-control connection reporting healthy. The GitHub CLI also requested manual login.

**How to apply:** On an actual authenticated-operation failure, use the integration authorization-recovery flow and retry once after reconnection. Do not request a token in chat or bypass the existing integration.

If the source-control connection cannot open the reconnect form (the reconnect is rejected and a fresh connection reports a missing connector ID), direct the user to Replit account settings → Connected Services to disconnect and reconnect GitHub.

**Why:** Both inline authorization flows rejected this source-control connection; Replit's official project and Git-pane documentation identifies account settings as the recovery route.

**How to apply:** Keep local merges intact while waiting for the user to reconnect, then retry the push once.
