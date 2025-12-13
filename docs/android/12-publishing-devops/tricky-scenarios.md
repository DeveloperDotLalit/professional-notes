---
layout: default
title: "Tricky Scenarios"
parent: "Publishing Devops"
nav_order: 999
---

## Scenario 1: The "Debuggable" Release
### The Setup
You forgot `debuggable false` in your release build type.
Or you signed it with the `debug.keystore`.

### The Result
**Security Risk**. Debuggable apps allow anyone to attach a debugger (`adb jdwp`) and read your memory, extract variables, and modify runtime behavior. Is also rejected by Play Store (usually).
**Fix**:
```kotlin
buildTypes {
    release {
        isDebuggable = false
        // ...
    }
}
```

---

## Scenario 2: Version Code Conflict in CI
### The Setup
Two developers merge PRs to `main` at the same time.
CI triggers for both. Both try to upload to Firebase/Play Store with the same `versionCode` (derived from git commit count or static number).

### The Failure
The second build fails authentication or upload because "Version Code already exists".
**Fix**: Use a timestamp-based version code or a CI-incremented counter that is synchronized.

---

## Scenario 3: The Missing ProGuard Rules
### The Setup
App works fine in Debug.
Crashes instantly in Release: `ClassNotFoundException`.

### The Cause
R8 stripped a class accessed via Reflection (e.g., generic GSON model, Retrofit response, AdMob adapter).
**Fix**: Monitor Logcat in Release build (locally) before uploading. Add `-keep class com.example.model.** { *; }` to `proguard-rules.pro`.

[< Back to Interview Questions](interview-questions.md) | [**Next: Appendices** >](../appendix/glossary.md)