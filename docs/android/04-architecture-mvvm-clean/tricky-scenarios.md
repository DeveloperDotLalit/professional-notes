---
layout: default
title: "Tricky Scenarios"
parent: "Architecture MVVM Clean"
nav_order: 999
---

## Scenario 1: The "Mappers" Explosion
### The Setup
You have `NetworkUser`, `DatabaseUser`, `DomainUser`, and `UiUser`.
You spend 40% of your time writing `fun toDomain()` mappers.
You decide to just use `NetworkUser` everywhere to save time.

### The Reality
**Coupling Hell**.
You change the API JSON field name.
Now you have to update your Database schema, your Domain logic, and your UI code.
**Solution**: Suck it up and write the mappers. Or use a library? No, manual mappers are best for clarity and compile-time safety. Automated mappers (like ModelMapper) often rely on reflection and crash at runtime.

---

## Scenario 2: ViewModel Logic Leaks
### The Setup
Your ViewModel calls `repository.getData()` and gets a List.
The ViewModel filters the list, sorts it, and formats the strings.

### The Problem
If you add a new screen (e.g., a "Favorites" widget) that needs the same data, you have to copy-paste that filtering logic.
**Fix**: Move the filtering/sorting logic to a `UseCase` (e.g., `GetSortedUsersUseCase`). The ViewModel should just dispatch state.

---

## Scenario 3: Exposing Mutable State
### The Setup
```kotlin
class MyViewModel : ViewModel() {
    val state = MutableStateFlow(0) // Publicly mutable!
}
```
### The Reality
Any View (or rogue Fragment) can write `viewModel.state.value = 999`. This breaks the Unidirectional Data Flow.
**Fix**:
```kotlin
private val _state = MutableStateFlow(0)
val state = _state.asStateFlow() // Read-only public view
```

[< Back to Interview Questions](interview-questions.md) | [**Next Module: Advanced Kotlin** >](../module-05-advanced-kotlin/intro.md)