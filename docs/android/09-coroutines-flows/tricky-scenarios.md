---
layout: default
title: "Tricky Scenarios"
parent: "Coroutines Flows"
nav_order: 999
---

## Scenario 1: The "Unsafe" Mutable State
### The Code
```kotlin
class Counter {
    var count = 0
    suspend fun inc() = withContext(Dispatchers.Default) {
        count++ // Not atomic!
    }
}
// Launch 1000 coroutines calling inc()
```
### The Analysis
`count++` is Read-Modify-Write.
Multiple threads on `Dispatchers.Default` read the same value (e.g., 5), increment to 6, and write 6. Lost updates abound.
**Fix 1**: `AtomicInteger`. Fast, lock-free.
**Fix 2**: `Mutex`. `mutex.withLock { count++ }`. Slower, but allows complex logic.
**Fix 3**: `Actor` (Single Thread confinement). Create a restricted context `newSingleThreadContext` for this data.

---

## Scenario 2: Deadlock with Mutex
### The Code
```kotlin
val mutex = Mutex()
val job = launch {
    mutex.withLock {
        // do something
        launch {
            mutex.withLock { // DEADLOCK
                // ....
            }
        }
    }
}
```
### The Analysis
Mutex is **non-reentrant** in Coroutines.
Wait, standard Java `ReentrantLock` allows the same thread to acquire it twice.
Coroutine Mutex does NOT. Since coroutines can suspend and resume potentially on different threads, the concept of "Thread Ownership" is fuzzy.
If a coroutine holding the lock suspends, and tries to acquire it again nested, it waits forever for *itself* to release the lock.

---

## Scenario 3: `catch` operator location matters
### The Code
```kotlin
flow {
    emit(1)
    throw RuntimeException("Boom")
}
.map { it * 2 }
.catch { emit(-1) } // Catches Boom
.collect()
```
vs
```kotlin
flow { ... }
.catch { emit(-1) }
.map { it * 2 } // Does NOT catch Boom if map throws!
.collect()
```
### The Rule
`catch` only catches exceptions from **upstream** (operators above it).
It works via checking exception transparency.
It essentially wraps the `collect` call of the upstream flow in a `try-catch`.

---

## Scenario 4: Leaking `Job` in `catch` block
### The Code
```kotlin
try {
    coroutineScope {
        launch { throw Error() }
    }
} catch (e: Exception) {
    // Scope is cancelled.
    // Try to launch a cleanup task?
    scope.launch { logError() }
}
```
### The Failure
The `scope` (or the outer Job) is now in a **Cancelled** state.
Launching a new coroutine in a cancelled scope fails (silently or throws `CancellationException`).
**Fix**: Use `NonCancellable` context.
```kotlin
withContext(NonCancellable) {
    logError()
}
```

[< Back to Interview Questions](interview-questions.md) | [**Next Module: Testing** >](../module-10-testing/intro.md)