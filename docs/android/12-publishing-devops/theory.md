---
layout: default
title: "Theory"
parent: "Publishing Devops"
nav_order: 999
---

## 1. App Bundles (AAB) vs APK

- **APK**: A fat executable. contains resources for ALL screen densities and architectures. User downloads everything.
- **AAB (Android App Bundle)**: A publishing format. Google Play processes it and generates specific APKs for the user's device (Split APKs).
- **Result**: ~35% smaller download size.

## 2. Play App Signing
Historically, you managed the private key. If you lost it, you couldn't update the app. **Game Over**.
**Play App Signing**:

1.  You sign the AAB with an **Upload Key**.
2.  Google verifies it, strips the signature.
3.  Google re-signs the APKs with the **App Signing Key** (stored securely by Google).
4.  **Benefit**: If you lose the Upload Key, Google can reset it for you.

## 3. The Release Train

1.  **Alpha/Internal**: Automated build from `develop` branch. QA testing.
2.  **Beta**: Release Candidate. Broad dogfooding.
3.  **Production**: Phased Rollout (10% -> 20% -> 50% -> 100%). Monitor Crashlytics closely.

[< Back to Intro](intro.md) | [Next: Code Examples >](code-examples.md)