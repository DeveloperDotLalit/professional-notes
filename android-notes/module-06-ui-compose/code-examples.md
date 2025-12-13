# 💻 Code Examples: Jetpack Compose

## 1. The Mutable State Mistake
**Bad**:
```kotlin
@Composable
fun Counter() {
    var count = 0 // Resets on every recomposition!
    Button(onClick = { count++ }) { Text("$count") }
}
```

**Good**:
```kotlin
@Composable
fun Counter() {
    // remember = survives recomposition
    // rememberSaveable = survives configuration change (rotation) & process death!
    var count by rememberSaveable { mutableStateOf(0) }
    Button(onClick = { count++ }) { Text("$count") }
}
```

---

## 2. Unstable List Trap
**Bad**: Passing a standard `List` causes recomposition of `UserRow` even if data is same.
```kotlin
@Composable
fun UserList(users: List<User>) { // List is unstable
    LazyColumn {
        items(users) { user -> UserRow(user) } 
    }
}
```

**Good**: Use Immutable Wrappers (Kotlinx Immutable Collections) or `@Stable` annotation.
```kotlin
@Immutable
data class UserState(val users: List<User>)

@Composable
fun UserList(state: UserState) {
    // efficient
}
```

---

## 3. Performance: Derived State
**Scenario**: You want the "Scroll to Top" button to show only when the list is scrolled past item 10.
**Bad**:
```kotlin
val showButton = listState.firstVisibleItemIndex > 10 // Reads state on every frame -> Recomposes !
```
**Good**:
```kotlin
val showButton by remember {
    derivedStateOf { listState.firstVisibleItemIndex > 10 }
} // Only notifies updates when the boolean result CHANGES.
```

[< Back to Theory](theory.md) | [Next: Interview Questions >](interview-questions.md)
