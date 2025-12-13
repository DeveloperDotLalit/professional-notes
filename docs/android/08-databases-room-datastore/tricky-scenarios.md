---
layout: default
title: "Tricky Scenarios"
parent: "Databases Room Datastore"
nav_order: 999
---

## Scenario 1: The "False Positive" Notification
### The Setup
You observe `SELECT * FROM User WHERE id = 1`.
Separate thread inserts a `User` with `id = 999`.

### The Reality
**Your query re-runs**.
Room's InvalidationTracker tracks modifications at the **Table** level, not the Row level. Any change to the `User` table triggers re-evaluation of ALL active queries on the `User` table.
**Impact**: Performance hits if not careful. The query re-runs, realizes the result (`User 1`) hasn't changed, but `Flow` distinctUntilChanged might be needed to stop UI updates. (Room 2.5+ has some improvements here, but it's still a constraint).

---

## Scenario 2: Main Thread Violation in `init`
### The Setup
```kotlin
class MyRepo(context: Context) {
    val db = Room.databaseBuilder(...).build()
    // Attempting to seed data immediately
    init {
        db.userDao().insert(User("Me")) // Crash!
    }
}
```
**Crash**: `Cannnot access database on the main thread`.
Even `build()` might trigger disk I/O if migrations run.
**Fix**: Dispatch to `Dispatchers.IO` or use `RoomDatabase.Callback` for seeding.

---

## Scenario 3: Large Transaction Locks
### The Setup
You wrap a massive network sync + DB insert in one `@Transaction`.
```kotlin
@Transaction
suspend fun sync() {
    val data = api.fetchHugeJson() // Network call inside DB transaction!
    dao.insert(data)
}
```
### The Problem
The Database transaction remains OPEN while the network call is happening.
This blocks other writers (and potentially readers depending on mode/checkpoint).
**Fix**: **NEVER** perform network or non-DB work inside a database transaction. Fetch first, then transact just the insert.

[< Back to Interview Questions](interview-questions.md) | [**Next Module: Coroutines & Flows** >](../module-09-coroutines-flows/intro.md)