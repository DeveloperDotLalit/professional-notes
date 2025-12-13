# 🤯 Tricky Scenarios: Compose Pitfalls

## Scenario 1: The "Unstable Lambda"
### The Setup
```kotlin
@Composable
fun MyList(task: Task, onClick: () -> Unit) { ... }

// Parent
MyList(task = t, onClick = { viewModel.doStuff() })
```
### The Problem
`MyList` recomposes *every time* the Parent recomposes.
Why? The lambda `{ viewModel.doStuff() }` is recreated as a mostly new object every time (unless optimized by compiler, but capturing variables breaks equality).
Since `onClick` changed, `MyList` inputs changed.
**Fix**: Use Method References `onClick = viewModel::doStuff` (often stable) or `wrapped` lambdas with `remember`.
**Note**: Newer compiler versions (Strong Skipping Mode) are fixing this, but it's a classic interview discussion.

---

## Scenario 2: Nested Scrolling Hell
### The Setup
`Column(Modifier.verticalScroll())` containing a `LazyColumn`.

### The Crash
**Crash**: `IllegalStateException: Vertically scrollable component was measured with an infinity maximum height constraints`.
**Why**: The outer Column gives infinite height to children. The inner LazyColumn tries to expand to fill infinite height (to render all items). This is impossible.
**Fix**: Never nest same-direction scroll containers like this. Use `LazyColumn` with multiple item types, or set a fixed height on the inner list.

---

## Scenario 3: `LaunchedEffect` Key Missing
### The Setup
```kotlin
@Composable
fun UserProfile(userId: String) {
    LaunchedEffect(Unit) { // Key is Unit (Constant)
        viewModel.loadUser(userId)
    }
}
```
User navigates from Profile A to Profile B (same screen, different arg).
`UserProfile` recomposes with new `userId`.
**But `LaunchedEffect` does NOT run again!** because `Unit` didn't change.
**Result**: Profile B shows Profile A's data.
**Fix**: `LaunchedEffect(userId) { ... }`.

[< Back to Interview Questions](interview-questions.md) | [**Next Module: Networking** >](../module-07-networking-retrofit-ktor/intro.md)
