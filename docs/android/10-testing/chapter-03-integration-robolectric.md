---
layout: default
title: "Integration Robolectric"
parent: "Testing"
nav_order: 3
---

## 1. The Headless Android
Robolectric is a Sandbox. It loads the **Real Android Framework JAR** (from the SDK) but replaces native calls (C++) with Java implementations calling "Shadows".

- **Shadows**: `ShadowBitmap`, `ShadowLooper`.
- When you call `Looper.getMainLooper()`, Robolectric intercepts it and returns a `ShadowLooper` managed by the JVM.

## 2. When to use it?

- **Legacy Code**: Testing `Activities` or `Fragments` directly without an Emulator.
- **Resources**: Testing resource loading (`getString(R.string.x)`), themes, and expanding layouts.
- **Navigation**: Testing Fragment transactions.

## 3. Disadvantages

- **Simulation**: It is NOT a real device. It doesn't run ART. It runs JVM bytecode.
- **Behavior differences**: Sometimes crypto libraries or specific Samsung/Pixel quirks cannot be replicated.
- **Speed**: Slower than Unit Tests, Faster than Emulator.

[Previous: Chapter 02 - Coroutines](chapter-02-coroutine-testing.md) | [Next: Chapter 04 - UI Testing](chapter-04-ui-testing.md)