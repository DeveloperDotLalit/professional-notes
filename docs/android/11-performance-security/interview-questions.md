---
layout: default
title: "Interview Questions"
parent: "Performance Security"
nav_order: 999
---

## Section 1: Memory

### Q3: `LeakCanary` mechanism. How does it automate leak detection?
**Candidate Answer:**
"LeakCanary is brilliant in its simplicity.
It hooks into the `Application.ActivityLifecycleCallbacks`.
When an Activity callback `onDestroy()` is fired, LeakCanary creates a `WeakReference` to that Activity and associates it with a random UUID key.
It then waits a few seconds and forces a Garbage Collection.
It checks the `WeakReference`. If the reference is still pointing to the object (i.e., it wasn't cleared by GC), it means *something* is holding a strong reference to that Activity.
That's a **Leak**.
LeakCanary then takes a Heap Dump (`.hprof`), and uses a library called Shark to parse it. It finds the 'Shortest Path to GC Root'—basically the chain of references keeping that Activity alive (e.g., a static View variable) and notifies the developer."

### Q6: `Bitmap` optimization.
**Candidate Answer:**
"Bitmaps are the #1 cause of OOMs (Out of Memory) errors.
A 12MP camera photo is roughly 3MB on disk (compressed JPG).
But in memory, it's `Width * Height * 4 bytes` (ARGB_8888). That 12MP image explodes to ~48MB of RAM.
If you load that into a tiny thumbnail ImageView, you are wasting 47MB of RAM.
The optimization is **Downsampling**. We use `BitmapFactory.Options` with `inJustDecodeBounds=true` to read the dimensions first without loading the pixels. We calculate the `inSampleSize` (scale factor) to match the target view size.
Then we decode the pixels. This loads a much smaller bitmap (e.g., 200KB) that looks identical to the user in the thumbnail view."

## Section 4: R8 & Obfuscation

### Q23: R8 vs ProGuard.
**Candidate Answer:**
"ProGuard was the standard for years. It was a separate tool that ran *after* compilation to optimize Java bytecode.
R8 is the modern replacement from Google. It is integrated directly into the D8 Dexer.
So instead of `Java -> Class -> ProGuard -> Optimized Class -> Dex`, R8 goes straight `Java -> Class -> R8 -> Dex`.
This unified step is much faster.
R8 does three things:

1.  **Shrinking (Tree Shaking)**: Starts at Main Activity and traces all reachable code. Deletes everything else.
2.  **Obfuscation**: Renames `UserHelper` to `a.b`. Reduces DEX size and hinders reverse engineering.
3.  **Optimization**: It aggressively inlines functions, merges classes, and removes dead code branches, making the app runtime slightly faster."

[Back to Syllabus](../docs/syllabus-overview.md)