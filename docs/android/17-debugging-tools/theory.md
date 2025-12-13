---
layout: default
title: "Theory"
parent: "Debugging Tools"
nav_order: 999
---

## Types of Profiling

### 1. Sampling (CPU Profiler default)

- **How**: The profiler pauses the thread every `X` milliseconds (e.g., 1ms) and checks "What function is running?".
- **Pros**: Low overhead. Good for general "Hotspots".
- **Cons**: Might miss very short functions that run between samples.

### 2. Instrumentation (Tracing)

- **How**: The compiler injects start/end markers into *every single function*.
- **Pros**: Exact timing. 100% accuracy.
- **Cons**: Huge overhead. Slows down the app significantly.

## Memory Theory

### 1. Shallow vs Retained Size

- **Shallow Size**: How much memory the object *itself* uses. (e.g., A `User` object has 2 Integers = 8 bytes).
- **Retained Size**: How much memory is kept alive *because* of this object. (e.g., The `User` has a reference to a `Bitmap` of 10MB. If User dies, Bitmap dies. So Retained Size is ~10MB).
**Leak Hunting**: Always look at **Retained Size**.

### 2. The GC Roots

- **Garbage Collection** starts from "Roots".
- Roots are: Static variables, Active stack threads, JNI references.
- Any object connected to a Root (Reference Chain) cannot be collected.
- **Memory Leak**: An unwanted connection to a Root (e.g., Static View -> Activity).

## Debugger Variables

- **Watch**: Monitor a variable's value as you step.
- **Evaluate Expression (Alt+F8)**: Run arbitrary code at the breakpoint. "What if I force `user.isValid = true` right now?"

[Back to Syllabus](../docs/syllabus-overview.md)