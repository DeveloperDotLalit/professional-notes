---
layout: default
title: "Theory"
parent: "UI Compose"
nav_order: 999
---

## 1. The Rendering Pipeline
Composition -> Layout -> Drawing.

- **Composition**: "What" UI to show. Running `@Composable` functions.
- **Layout**: "Where" to place them. Measuring and placing.
- **Drawing**: "How" to paint pixels.
> **Optimization**: If only the color changes, Compose can skip Composition and Layout and just re-Draw. This is why Lambda Modifiers are powerful.

## 2. Recomposition
Recomposition is running your function again.
**Smart Recomposition**: Compose tries to skip functions where inputs haven't changed.
**Key Condition**: Inputs must be **Stable**.

- Primitive types (Int, String) are stable.
- Data classes with `val` properties of stable types are stable.
- **DANGER**: `List<T>` is UNSTABLE (it's an interface, could be mutable). Compose will ALWAYS recompose a function taking a `List` unless you wrap it or use Immutable Collections.

## 3. Side Effects
Composables are effectively functional. They should be side-effect free.

- **Bad**: Making a network call inside the function body. It runs on every frame!
- **Good**: Use `LaunchedEffect(key)`. It runs suspend functions only when the `key` changes.
- **Good**: Use `DisposableEffect`. For cleanup (registering/unregistering listeners).

## 4. State Hoisting
"State flows down, events flow up."

- The Child Composable shouldn't know *how* to update the DB. It just calls `onSaveClick()`.
- The Parent holds the state and handles the event.
- Makes components reusable and testable.

[< Back to Intro](intro.md) | [Next: Code Examples >](code-examples.md)