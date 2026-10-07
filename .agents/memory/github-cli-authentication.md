---
name: GitHub CLI authentication
description: Distinguish Git authentication from GitHub CLI authentication in this workspace.
---

Do not infer that the GitHub account is disconnected solely because `gh` requests login.

**Why:** The connected source-control integration authenticated `git fetch origin` successfully, while `gh pr list` still requested manual authentication.

**How to apply:** Use Git for repository synchronization. Before reconnecting the account or requesting credentials because of a GitHub CLI login prompt, check whether the desired operation can use the existing source-control integration.
