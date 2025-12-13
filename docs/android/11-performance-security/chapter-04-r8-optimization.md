---
layout: default
title: "R8 Optimization"
parent: "Performance Security"
nav_order: 4
---

## 1. The Pipeline
Code -> `.class` -> **R8 (Shrink, Optimize, Obfuscate)** -> `.dex`.

### 1.1 Shrinking (Tree Shaking)
R8 starts from "Entry Points" (Activities in Manifest, Main method).
It traverses the graph. Any class/method not reachable is deleted.

- **Reflection**: R8 cannot see reflection. `Class.forName("User")`.
- **Fix**: `-keep class com.example.User { *; }`.

### 1.2 Obfuscation
Renames classes to `a`, `b`, `c`.

- **Purpose**: Reduces DEX size (strings are shorter). Makes RE harder.

### 1.3 Optimization

- **Inlining**: If a method is called once, R8 moves the body to the caller.
- **Class Merging**: If two classes are identical, R8 merges them.
- **Dead Code Elimination**: Removes `if (false) { ... }`.

## 2. Aggressive Splitting
R8 supports generating "Split APKs" effectively based on Feature Modules, ensuring that code strictly belonging to a dynamic feature is not allocated in the base APK.

[Previous: Chapter 03 - Security](chapter-03-security-hardening.md) | [Back to Syllabus](../docs/syllabus-overview.md)