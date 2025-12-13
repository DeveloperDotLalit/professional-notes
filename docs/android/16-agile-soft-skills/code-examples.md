---
layout: default
title: "Code Examples"
parent: "Agile Soft Skills"
nav_order: 999
---

## 1. Pull Request (PR) Template
Add this to `.github/PULL_REQUEST_TEMPLATE.md` to force standard quality.

```markdown
## Description
<!-- What does this PR do? Context? -->

## Ticket
<!-- Link to Jira/Trello -->
[JIRA-123](link)

## Screenshots
<!-- Before/After or Video -->

## Testing
- [ ] Unit Tests Added
- [ ] Manual verification on Device X
- [ ] Checked for Regressions in Feature Y

## Rollback Plan
<!-- If this breaks prod, how do we revert? -->
Feature Flag: `ENABLE_NEW_LOGIN`
```

## 2. Bug Report Template
For when QA files bugs.

```markdown
## Steps to Reproduce
1. Open App
2. Click 'Profile'
3. Tap 'Logout'

## Expected Behavior
Logout immediately.

## Actual Behavior
App crashes.

## Environment
- Device: Pixel 6
- OS: Android 13
- Version: 1.0.4

## Logs
<Paste stacktrace here>
```

## 3. The "RFC" (Request for Comments) Structure
Use this when proposing a major architecture change (e.g., "Switching to Compose").

1.  **Summary**: 1 paragraph pitch.
2.  **Motivation**: Why are we doing this? (Build speed is slow, XML is hard to maintain).
3.  **Detailed Design**: The proposed solution.
4.  **Alternatives Considered**: Why did we reject option B?
5.  **Risks**: What could go wrong?
6.  **Timeline**: How long will it take?