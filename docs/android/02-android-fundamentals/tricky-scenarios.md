---
layout: default
title: "Tricky Scenarios"
parent: "Android Fundamentals"
nav_order: 999
---

## Scenario 1: The "Zombie" Fragment
### The Setup
You have a Fragment that starts a long background task in `onCreate`.
User rotates the screen.

### The Expectation
Task runs once.

### The Reality
**Task runs twice**.

1.  Rotation destroys Activity.
2.  Fragment is detached but its state is saved.
3.  Activity recreates.
4.  Activity *automatically re-attaches* the Fragment from saved state.
5.  `onCreate` calls again.
6.  If you manually added the fragment again in `onCreate` (`if (savedInstanceState == null)` check missing), you now have **two** fragments. One restored by system, one added by you.

**Fix**: Always check `if (savedInstanceState == null)` before adding a Fragment.

---

## Scenario 2: The Mutable Static Trap
### The Setup
```kotlin
object CurrentUser {
    var user: User? = null
}
```

1.  User logs in. `CurrentUser.user` is set.
2.  User goes to ProfileActivity.
3.  User minimizes app.
4.  **Process Death**.
5.  User returns.

### The Reality
Activity restores. `CurrentUser.user` is **null** (static memory wiped).
`ProfileActivity` tries to access `CurrentUser.user.name` -> **Crash**.

**Fix**: Never rely on singletons for session state across process death. restore session from `SavedStateHandle` or re-fetch from local database/token.

---

## Scenario 3: `postValue` vs `setValue`
### The Setup
You are on the main thread. You call `liveData.postValue("A")` then `liveData.setValue("B")`.

### The Output
Observer sees `B`, then `A`? Or `A` then `B`?
**Reality**: It's simpler but tricky. `setValue` sets it immediately. `postValue` schedules it for the next looper cycle.
So `setValue("B")` happens. Observer gets "B".
Then the looper processes the posted "A". Observer gets "A".
Final state is "A". This is often a race condition bug.

**Rule**: Always use `setValue` (or `value = ...` in Kotlin) if you are already on the Main Thread. Use `postValue` only from background threads.

[< Back to Interview Questions](interview-questions.md) | [**Next Module: Jetpack Components** >](../module-03-jetpack-components/intro.md)