# Chapter 04: Side Effects & Lifecycle

## 1. The Concept of "Effect"
Composable functions should be **Side-Effect Free** (Pure).
They run frequently, in any order, and on parallel threads.
If you write to a database inside a function body, you will crash the app or corrupt data.
**Side Effect**: An escape hatch to run non-UI code safely.

## 2. LaunchedEffect
`LaunchedEffect(key1) { ... }`
- **Lifecycle**: Enters composition -> Starts Coroutine.
- **Re-composition**: If `key1` changes -> Cancels old coroutine, Starts new one.
- **Exit**: Leaves composition -> Cancels coroutine.
- **Use Case**: Starting an animation, collecting a Flow, one-time initialization.

## 3. DisposableEffect
For non-coroutine cleanup.
```kotlin
DisposableEffect(lifecycleOwner) {
    val observer = LifecycleEventObserver { ... }
    lifecycleOwner.addObserver(observer)
    onDispose {
        lifecycleOwner.removeObserver(observer) // Cleanup mandatory!
    }
}
```
- **Use Case**: Registering explicit callbacks, broad cast receivers.

## 4. rememberCoroutineScope
A scope bound to the Composition layer but accessible in callbacks.
```kotlin
val scope = rememberCoroutineScope()
Button(onClick = {
    scope.launch { ... } // OK to launch here
})
```
- **Danger**: Do NOT use `scope.launch` inside the Composable body directly. It leaks control.

## 5. SideEffect (The "Post-Commit" Hook)
`SideEffect { ... }`
Runs **after** every successful recomposition.
- **Use Case**: Syncing Compose state to non-Compose systems (e.g., updating the system Status Bar color to match the current theme).

[Previous: Chapter 03 - Phases](chapter-03-phases-modifiers.md) | [Back to Syllabus](../docs/syllabus-overview.md)
