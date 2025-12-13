---
layout: default
title: "Rendering Jank"
parent: "Performance Security"
nav_order: 2
---

## 1. Defining "Jank"
A frame that takes > 16.6ms (for 60Hz).
The user sees a stutter.

## 2. Tools

- **SysTrace / Perfetto**: Kernel-level tracing. Shows CPU scheduling, Binder calls, and Choreographer slices.
- **Layout Inspector**: Visualizes the View Hierarchy. Look for deep nesting (ConstraintLayout helps flatten this).
- **GPU Overdraw**: Dev Settings option. Colors screen Red where pixels are painted 3x+.

## 3. FrameMetrics API
Production monitoring.
```kotlin
window.addOnFrameMetricsAvailableListener({ window, frameMetrics, dropCount ->
    val duration = frameMetrics.getMetric(FrameMetrics.TOTAL_DURATION)
    if (duration > 16) logJank()
}, handler)
```
Libraries like `JankStats` (Jetpack) wrap this to provide "Jank scenarios" (e.g., "Jank during IDLE vs SCROLL").

## 4. Compose Stability
Compose is safer, but unoptimized Compose is slower than optimized Views.

- **Restart Groups**: Creating too many scopes.
- **Unstable Params**: Passing `List<T>` without `@Stable` wrappers forces recomposition of the whole list every frame.

[Previous: Chapter 01 - Memory](chapter-01-memory-profiling.md) | [Next: Chapter 03 - Security](chapter-03-security-hardening.md)