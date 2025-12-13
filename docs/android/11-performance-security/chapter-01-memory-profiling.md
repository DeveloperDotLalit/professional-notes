---
layout: default
title: "Memory Profiling"
parent: "Performance Security"
nav_order: 1
---

## 1. The Heap Dump (HPROF)
A snapshot of memory.

- **Dominator Tree**: Who is holding onto the memory?
- **Shallow Size**: Memory consumed by the object itself.
- **Retained Size**: Memory that would be freed if this object was GC'd.

## 2. LeakCanary Internals

1.  **ObjectWatcher**: Uses `WeakReference` and `ReferenceQueue`.
2.  **Cycle**:
    - Activity destroyed.
    - Watcher expects the WeakRef to be cleared in 5 seconds.
    - Force GC.
    - If WeakRef still exists -> **LEAK**.
3.  **Analysis**: It dumps the heap, parses the `.hprof` file (using Shark library), finds the Shortest Path to GC Root.

## 3. GC Generations
Android uses a Generational Garbage Collector (Concurrent Copying).

- **Young Gen**: Newly allocated objects. Fast GC (Minor).
- **Old Gen**: Survivors. Slow GC (Major).
- **Churn**: Creating tons of short-lived objects (inside `onDraw`) fills Young Gen, triggers frequent Minor GCs, causing "Stop-the-world" pauses (Jank).

[Next: Chapter 02 - Rendering](chapter-02-rendering-jank.md)