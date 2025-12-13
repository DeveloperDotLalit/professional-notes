---
layout: default
title: "Release Management"
parent: "Publishing Devops"
nav_order: 3
---

## 1. The Release Train
Don't release "When it's ready". Release on a schedule (e.g., every 2 weeks).

- **code Freeze**: Monday.
- **QA Pass**: Tuesday-Thursday.
- **Staged Rollout**: Friday (10%).

## 2. Staged Rollouts
Never go 100%.

- Day 1: 1%.
- Day 2: 5%.
- Day 3: 10%.
- Day 5: 50%.
- Day 7: 100%.
**Why?** If there is a catastrophic crash on Samsung S23, you only affect 1% of users.

## 3. Feature Flags
How to merge code that isn't ready? **Flags**.
`if (FLAGS.new_profile_enabled) { showNewProfile() } else { showOldProfile() }`.

- **Remote Config**: Firebase Remote Config allows flipping these flags for users *without* an app update.
- **Kill Switch**: If a new feature crashes, you disable the flag remotely. Instant fix.

[Previous: Chapter 02 - Signing](chapter-02-app-signing.md) | [Next: Chapter 04 - Post Release](chapter-04-post-release.md)