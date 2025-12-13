# Chapter 03: The Three Phases of Compose

## 1. The Pipeline
Unlike Views (Measure -> Layout -> Draw), Compose essentially has 3 phases:
1.  **Composition**: "What to show". Running the Composable functions. Building the Tree.
2.  **Layout**: "Where to put it". Measuring and Placing.
3.  **Drawing**: "How to render it". Canvas operations.

### 1.1 Skipping Phases (Optimization)
Crucial Rule: **Read State in the lowest possible phase**.
- If you read state in `Composition` (e.g. `if (state) Text`), changing state restarts Phase 1, 2, and 3. Expensive.
- If you read state in `Layout` (e.g. `Modifier.offset { state }`), changing state skips Phase 1. Only Layout and Draw run.
- If you read state in `Draw` (e.g. `Modifier.drawBehind { color = state }`), changing state skips Phase 1 and 2. Only Draw runs. **Fastest**.

## 2. Modifiers Internals
Modifiers are **chains of Immutable Objects**.
`Modifier.padding(10.dp).background(Red)`
Creates a linked list: `BackgroundNode -> PaddingNode -> Head`.

### 2.1 Fold Mechanism
Since it is a list, Compose "folds" (iterates) over it to apply effects.
Order matters!
- `padding().background()`: Padding is applied, THEN background fills the content (so padding is transparent).
- `background().padding()`: Background is applied first, then padding shrinks content (so background covers the padded area).

### 2.2 LayoutModifier
Allows you to intercept the Measure/Place pass.
```kotlin
fun Modifier.customLayout() = layout { measurable, constraints ->
    val placeable = measurable.measure(constraints)
    layout(placeable.width, placeable.height) {
        placeable.place(0, 0)
    }
}
```
This is the building block of `Column`, `Row`, etc.

[Previous: Chapter 02 - Snapshots](chapter-02-snapshot-system.md) | [Next: Chapter 04 - Side Effects](chapter-04-side-effects.md)
