---
layout: default
title: "Mvi Unidirectional"
parent: "Architecture MVVM Clean"
nav_order: 4
---

## 1. The Evolution: MVC -> MVVM -> MVI

- **MVC**: Controller manages View. Hard to test.
- **MVVM**: ViewModel exposes State. View observes. Better. But multiple mutable LiveDatas lead to independent state conflicts ("Loading is false, but List is Empty, and Error is shown?").
- **MVI**: **Single State Object**. Unidirectional Data Flow.

## 2. Components
### 2.1 State (Model)
Immutable Data Class.
```kotlin
data class ScreenState(
    val isLoading: Boolean = false,
    val items: List<Item> = emptyList(),
    val error: String? = null
)
```

### 2.2 Intent (Action)
User actions modeled as sealed classes.
```kotlin
sealed class UiIntent {
    object LoadData : UiIntent()
    data class ClickItem(val id: Int) : UiIntent()
}
```

### 2.3 Reducer
A pure function: `(OldState, Intent) -> NewState`.
It takes the current state, applies the change, and returns a new immutable state.

## 3. Implementation
Usually done in ViewModel using `StateFlow`.
```kotlin
private val _state = MutableStateFlow(ScreenState())
val state = _state.asStateFlow()

fun process(intent: UiIntent) {
    when(intent) {
         is LoadData -> _state.update { it.copy(isLoading = true) }
    }
}
```
**Benefit**:

- Thread Safety (Atomic updates).
- Reproducibility (Logging Intents allows replaying bugs).
- Testability (Input State + Intent = Output State).

[Previous: Chapter 03 - Repository](chapter-03-repository-pattern.md) | [Back to Syllabus](../docs/syllabus-overview.md)