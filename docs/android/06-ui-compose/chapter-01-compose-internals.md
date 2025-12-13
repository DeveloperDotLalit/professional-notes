---
layout: default
title: "Compose Internals"
parent: "UI Compose"
nav_order: 1
---

## 1. What is a Composable?
To the compiler, `@Composable` is not just an annotation. It transforms the function signature.
```kotlin
@Composable fun Text(text: String)
```
Becomes (roughly):
```kotlin
fun Text(text: String, composer: Composer, key: Int)
```

## 2. The Slot Table (The Memory)
Classic Views are Objects (`TextView.java`). They exist on the Heap.
Compose UIs are **Functions**. Functions finish and disappear from the stack.
So where is the state stored?
**The Slot Table**.

### 2.1 Structure
It is a flat array (conceptually). It acts like a **Gap Buffer** (an array with a gap that can move, allowing fast insertions/deletions).
It stores:

1.  **Group Info**: Structure of the UI tree.
2.  **Values**: Parameters passed to functions.
3.  **Objects**: `remember { }` values.

### 2.2 Execution
When the runtime executes your code:

1.  **Linear Scan**: It moves a "cursor" through the Slot Table.
2.  **Comparison**: It compares current parameters (e.g., `text="A"`) with what is stored in the table.
    - **Changed**: Updates the table, marks the node for redrawing.
    - **Unchanged**: Skips the node (**Skipping Strategy**).

## 3. Positional Memoization
`remember { Random.nextInt() }`.
How does it remember?
It relies on the **Position** in the call graph.
During the first pass (Composition), `remember` writes the value into the Slot Table at the current cursor position.
During the second pass (Recomposition), `remember` reads the value from the Slot Table at the current cursor position.
**Implication**: If you call `remember` inside an `if` statement, and the `if` condition definition changes such that the order of execution changes, Compose gets confused. That's why Compose forces "Static" call graphs mostly.

## 4. Stability
The Compiler marks classes as:

- **Stable**: All public properties are immutable (val), or backed by Stable types (Primitives, String).
- **Unstable**: Contains var, or `List` (interface).
**Impact**:

- If a parameter is **Stable**, Compose checks `equals()`. If true, it skips recomposition.
- If a parameter is **Unstable**, Compose **ALWAYS recomposes**.
- **Fix**: Use `@Stable` annotation or `ImmutableList` (from Kotlinx Collections Immutable).

[Next: Chapter 02 - The Snapshot System](chapter-02-snapshot-system.md)