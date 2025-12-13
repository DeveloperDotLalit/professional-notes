---
layout: default
title: "Snapshot System"
parent: "UI Compose"
nav_order: 2
---

## 1. Optimistic Concurrency (MVCC)
Compose uses a database-like transaction system called **Multiversion Concurrency Control (MVCC)** content in memory.
When you write `mutableStateOf("A")`, you are interacting with the **Snapshot System**.

### 1.1 How it works

1.  **Global Snapshot**: The "committed" state of the world.
2.  **Composition Snapshot**: When a frame starts, Compose takes a "Snapshot" of the state. Use `Snapshot.takeSnapshot()`.
3.  **Read Tracking**: Any State object read during this snapshot is added to a "Read Set".
4.  **Write**: State updates are sandboxed.
5.  **Apply**: When frame finishes, changes are merged back to Global.

### 1.2 Collision Handling
What if two threads update the same state?

- Compose throws `SnapshotApplyConflictException`.
- **Merge Policy**: You can define a `SnapshotMutationPolicy` (Structural vs Referential equality) to resolve conflicts.

## 2. Recomposition Scopes
Compose does not redraw the whole screen. It finds the **Nearest Recomposition Scope**.
Typically, any `@Composable` function that is not inline defines a scope.
```kotlin
@Composable fun Screen() { // Scope A
    Text("A")
    Button { // Scope B (effectively)
       count++
    }
}
```
If `count` changes, only the scopes reading `count` invalidate.

## 3. Derived State
`derivedStateOf { list.filter { it > 0 } }`.

- **Purpose**: To convert a high-frequency stream of changes into a low-frequency stream.
- **Scenario**: Scroll Offset changes every pixel. You only want to show a button if `offset > 100`.
- Without `derivedStateOf`: Every scroll pixel triggers recomposition of the button logic.
- With `derivedStateOf`: Recomposition only happens when `offset > 100` flips from false to true.

[Previous: Chapter 01 - Internals](chapter-01-compose-internals.md) | [Next: Chapter 03 - Phases](chapter-03-phases-modifiers.md)