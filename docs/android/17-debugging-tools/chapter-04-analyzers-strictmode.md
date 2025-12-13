---
layout: default
title: "Analyzers Strictmode"
parent: "Debugging Tools"
nav_order: 4
---

## 1. StrictMode
**Philosophy**: Fail Fast.
StrictMode is a developer tool that detects accidental violations.

- **Disk Reads/Writes on Main Thread**.
- **Network on Main Thread**.
- **Leaked Closable objects** (Cursors, InputStreams).

**Setup**:
```kotlin
if (BuildConfig.DEBUG) {
    StrictMode.setThreadPolicy(StrictMode.ThreadPolicy.Builder()
        .detectAll()
        .penaltyLog()
        .penaltyFlashScreen() // Flashes screen red! Hard to ignore.
        .build())
}
```

## 2. LeakCanary
**Philosophy**: Automated Memory Leak Detection.
It runs in a separate process. When you navigate away from a screen, it checks if the Activity was garbage collected.
If not, it dumps the heap, analyzes it, and sends a notification: "Leak Detected: MainActivity is referenced by singleton Manager.context".
**Critical**: Install this in `debugImplementation`. Never in `release`.

## 3. APK Analyzer
**Scenario**: "Why is my APK 50MB?"
**Tool**: Build -> Analyze APK.
**Breakdown**:

- `classes.dex`: Your code + libraries. (If huge, enable R8).
- `res/`: Your XML/Images.
- `lib/`: Native .so files.
**Common Savings**:

- Tiny PNGs that should be WebP.
- Unused large libraries.
- `arm64` vs `x86` native libs (Use App Bundles to split them).

## 4. Chucker
**Tool**: An on-device network inspector.
**Why**: Sometimes you are outside testing (QA) without a laptop attached to Android Studio.
**Chucker** shows a Notification. You tap it, and it shows a list of all API calls made by the app, with headers and bodies. Essential for QA teams debugging API issues in the field.

[Previous: Chapter 03 - Profiling](chapter-03-profiling-systrace.md) | [Back to Syllabus](../docs/syllabus-overview.md)