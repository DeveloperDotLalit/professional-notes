---
layout: default
title: "Coroutine Testing"
parent: "Testing"
nav_order: 2
---

## 1. The Time Problem
`delay(1000)` in a unit test would normally sleep the thread for 1 second.
We want it to be 0 seconds.
**TestCoroutineScheduler**: A virtual clock.

- `runTest`: Sets up a scope with a `StandardTestDispatcher` linked to a virtual scheduler.
- `delay(1000)`: Tells the scheduler "Wake me up at T+1000". The scheduler instantly advances T to T+1000 and runs the task.

## 2. Dispatchers
### 2.1 StandardTestDispatcher

- **Queues** tasks.
- You must call `advanceUntilIdle()` or `runCurrent()` to execute launched coroutines.
- Good for testing precise timing and order.

### 2.2 UnconfinedTestDispatcher

- **Eagerly** executes tasks.
- Like `Dispatchers.Unconfined`.
- `launch { ... }` runs immediately.
- Reduced boilerplate. Preferred for ViewModels.

## 3. Turbine (Flow Testing)
Testing partial flow emissions is hard.
`app.cash.turbine` library makes it imperative.
```kotlin
flow.test {
    assertEquals(Item.Loading, awaitItem())
    assertEquals(Item.Data, awaitItem())
    awaitComplete()
}
```
It handles the coroutine collection and cancellation under the hood.

[Previous: Chapter 01 - Unit Testing](chapter-01-unit-testing-fakes.md) | [Next: Chapter 03 - Robolectric](chapter-03-integration-robolectric.md)