---
layout: default
title: "Interview Questions"
parent: "Debugging Tools"
nav_order: 999
---

## Section 1: Profiling & Performance

### Q1: How do you identify and fix a "Memory Leak"?
**Candidate Answer:**
"My first signal is usually the **Memory Profiler**. If I see the 'Sawtooth' pattern graph keeps climbing higher and higher even after GC events, I know we have a leak.
I verify this by capturing a **Heap Dump (.hprof)**.
I open it and look for the Activity classes. If I'm on the Home Screen, but I see 3 instances of `ProductDetailActivity` in memory, those are leaks.
I check the 'Shortest Path to GC Root'.
Usually, it's a listener: `Singleton.registerListener(activity)` that was never unregistered in `onDestroy`.
To prevent this, I use **LeakCanary** in debug builds, which automates this entire detection process."

### Q2: Explain "Overdraw" and how to debug it.
**Candidate Answer:**
"Overdraw is when the GPU draws the same pixel multiple times in a single frame.
For example, a white background, covered by a blue card, covered by text. The GPU draws white, then blue, then text. That's 3x work.
To debug it, I enable **'Debug GPU Overdraw'** in Developer Options.
It colors the screen:

- **True Color**: 1x (Good).
- **Blue**: 2x.
- **Green**: 3x.
- **Red**: 4x+ (Bad).
If I see huge red areas, I fix it by removing unnecessary `android:background` attributes from parent layouts (e.g., removing the default window background if the root layout already sets a white background)."

## Section 2: Tools & Process

### Q3: What is the difference between "sampling" and "tracing" in the CPU Profiler?
**Candidate Answer:**
"Sampling is like taking a snapshot every millisecond. It's lightweight. It tells you vaguely 'We spend 80% time in this method'. It's good for general hotspots.
Tracing (Instrumentation) modifies the bytecode to log entry/exit of *every* function. It gives exact timing, but it slows the app down massively. I use Tracing only when I need strict chronological data, like 'Does Function A start before B?', but I prefer Sampling for performance measurement to avoid the observer effect."

### Q4: You have a crash that only happens in Production on Samsung S21. You don't have the device. What do you do?
**Candidate Answer:**
"First, I rely on **Crashlytics** logs. I look at the stack trace and the 'Keys/Logs' breadcrumbs to see what the user did before the crash.
If that's not enough, I look for **Cloud Device Farms** (like Firebase Test Lab) where I can rent a Samsung S21 remotely.
I'd upload a debuggable build or use 'Remote Logcat' tools to reproduce it there.
If it's truly weird, I check Samsung-specific docs—often it's related to aggressive 'Battery Optimizers' killing background services or non-standard Intent handling."

### Q5: What is `StrictMode`?
**Candidate Answer:**
"StrictMode is a developer tool we enable in Debug builds.
It acts as a watchdog.
It detects things we shouldn't do, like reading a File on the Main Thread or network calls.
I configure it to `penaltyFlashScreen()`. If a junior dev unknowingly adds a file read on the UI thread, the screen flashes Red. It makes the error impossible to ignore, ensuring we fix threading issues before we even commit the code."

[Back to Syllabus](../docs/syllabus-overview.md)