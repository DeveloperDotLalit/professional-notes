---
layout: default
title: "Inspectors"
parent: "Debugging Tools"
nav_order: 2
---

## 1. Layout Inspector
**Scenario**: "Why is this button invisible?" or "Why is this padding so huge?"
**Tool**: Android Studio -> Tools -> Layout Inspector.
It captures a live 3D exploded view of your View Hierarchy.
**Critical Checks**:

- **Visibility**: Is it `GONE`, `INVISIBLE`, or just obscured by another view?
- **Alpha**: Is alpha 0?
- **Z-Index**: Is it below the background?
- **Compose**: It specifically shows Composable recomposition counts (if verified).

## 2. Database Inspector (App Inspection)
**Scenario**: "I saved the user, but the list is empty."
**Old Way**: Download `.db` file via ADB, open in DB Browser for SQLite. Slow.
**New Way**: **Database Inspector**.
It connects to the lice process. You can run SQL queries (`SELECT * FROM users`) directly against the running app.
**Power Move**:
You can **Modify** data live. Change `is_premium` from `0` to `1` in the inspector, and watch your UI update instantly (if observing LiveData/Flow).

## 3. Network Inspector
**Scenario**: "The images are loading slow."
**Tool**: Network Inspector (Profiler Tab).
It captures every HTTP Request/Response.
**Timeline View**: Visualize parallelism. Are you sending 10 requests at once (blocking head-of-line) or sequentially?
**Payload Inspection**: View the JSON response or the Image bitmap directly. Easier than logging everything to Logcat.

[Previous: Chapter 01 - ADB](chapter-01-adb-logcat.md) | [Next: Chapter 03 - Profiling](chapter-03-profiling-systrace.md)