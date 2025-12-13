---
layout: default
title: "Interview Questions"
parent: "Publishing Devops"
nav_order: 999
---

## Section 2: Release & Signing

### Q7: Play App Signing. Why surrender the key to Google?
**Candidate Answer:**
"In the old days, we managed the Signing Key (`keystore.jks`). If you lost that file, or forgot the password, it was 'Game Over'. You could never update that app again. You had to publish a new package name and lose all your users.
Play App Signing solves this risk.
You generate an **Upload Key**. You sign your App Bundle with this Upload Key.
When you upload to Play Console, Google verifies your identity using the Upload Key.
Then, Google strips your signature. It retrieves the original **App Signing Key** (which it stores in a secure HSM vault) and re-signs the APK with that.
The user gets the APK signed by the App Signing Key.
If you lose your Upload Key, you just contact Google Support, prove your identity, and they let you register a *new* Upload Key. The App Signing Key (which users trust) never changes, so updates continue seamlessly."

### Q10: What is a "Release Train"?
**Candidate Answer:**
"The Release Train is an organizational pattern to stop the chaos of 'When is the release?'.
Instead of releasing 'When the feature is ready', we release on a schedule—say, every 2 weeks on Tuesday.
The train leaves on Tuesday at 9 AM.
If a feature is merged and tested, it gets on the train.
If a developer is still fixing a bug on Tuesday morning, they **miss the train**. We don't delay the release for them. They wait for the next train (in 2 weeks).
This predictability reduces stress. QA knows exactly when to test. Marketing knows when to announce. It shifts the culture from 'Crunch Mode' to 'Regular Cadence'."

### Q13: Staged Rollout strategy.
**Candidate Answer:**
"Deploying to 100% of users instantly is terrifying. If there's a critical crash on a specific Samsung device, you just crashed 100% of your users.
Staged Rollout mitigates this.
We release to **1%** on Day 1.
We watch Crashlytics and Vital Monitors like a hawk.
If velocity is stable, we go to **5%**, then **20%**, then **50%**.
If at 5% we see a spike in ANRs, we **Halt** the rollout.
Only 5% of users were affected. We fix the bug, push a patch, and restart.
It turns a potential PR disaster into a minor hiccup."

[Back to Syllabus](../docs/syllabus-overview.md)