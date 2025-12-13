# Chapter 03: Profiling (Systrace, Perfetto)

## 1. The CPU Profiler
**Scenario**: The app freezes (Jank) when scrolling.
**Action**: Record a "System Trace".
**Analysis**:
Look for **"Choreographer#doFrame"**.
If a frame takes > 16ms (Green bar turns Red), look at what is running *under* it.
- Is it `View.onDraw()`? (Rendering issue).
- Is it `Gson.fromJson()`? (JSON parsing on Main Thread).
- Is it `Binder:transact`? (Blocking IPC call).

## 2. The Memory Profiler
**Scenario**: App crashes with `OutOfMemoryError` after using it for 10 minutes.
**Action**: Capture a **Heap Dump**.
**Analysis**:
- Look for **Allocations**.
- Sort by **Retained Size** (Shallow size is small, Retained size is what it holds).
- Look for `Activity` or `Fragment` instances. If you are on "Home Screen" but you see 5 instances of `DetailActivity` in memory, you have a leak.

## 3. Perfetto (The New Systrace)
**What is it?**: A web-based trace viewer (ui.perfetto.dev).
**Why?**: It visualizes the entire device state, not just your app.
**Critical Scenario**:
Maybe your app is slow because **another app** is hogging the CPU? Or because the CPU cores throttled down to save battery (Thermal Throttling)? Perfetto shows CPU frequency and scheduler slices.

[Previous: Chapter 02 - Inspectors](chapter-02-inspectors.md) | [Next: Chapter 04 - Analyzers](chapter-04-analyzers-strictmode.md)
