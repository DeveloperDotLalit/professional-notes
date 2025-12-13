---
layout: default
title: "App Signing"
parent: "Publishing Devops"
nav_order: 2
---

## 1. The Key Dilemma
If you lose your Keystore, you cannot update your app. The `packageId` is burned forever. 
You must create a new package (`com.example.app2`) and lose all users.

## 2. The Solution: Play App Signing

- **Upload Key**: You generate this. You sign your artifacts with it.
- **App Signing Key**: Google generates this. It lives in Google's secure vault (HSM).
- **Process**:
    1.  You upload AAB signed by Upload Key.
    2.  Google verifies user.
    3.  Google strips signature.
    4.  Google re-signs with App Signing Key.
    5.  Google delivers signed APK.
- **Safety**: If you lose the Upload Key, you contact support, verify ID, and can issue a NEW Upload Key. The App Signing Key remains unchanged, so users get updates seamlessly.

[Previous: Chapter 01 - CI/CD](chapter-01-ci-cd-pipelines.md) | [Next: Chapter 03 - Release Management](chapter-03-release-management.md)