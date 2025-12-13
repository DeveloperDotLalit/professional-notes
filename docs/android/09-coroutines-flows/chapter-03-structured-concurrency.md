---
layout: default
title: "Structured Concurrency"
parent: "Coroutines Flows"
nav_order: 3
---

## 1. The Job Hierarchy
"Structured Concurrency" means no thread is left behind. This is enforced via the `Job` hierarchy.

### 1.1 Parent-Child Relationship
When you do `launch { launch { } }`:

1.  The Outer Scope has a `Job`.
2.  The Inner `launch` creates a new `Job`.
3.  The Inner Job attaches itself as a **child** of the Outer Job.
4.  **Wait Rule**: The Parent Job *cannot complete* until all its Children are complete.

### 1.2 Exception Propagation (The "Blow Up" Rule)
By default, if a child fails:

1.  Child throws Exception.
2.  Child cancels itself.
3.  Child notifies Parent.
4.  Parent cancels itself (and **all** other children!).
5.  Parent propagates exception up to *its* parent.
**Result**: One failure kills the entire tree.

### 1.3 SupervisorJob
A `SupervisorJob` (or `supervisorScope`) breaks the propagation chain at step 4.

- If a child fails, the Supervisor Parent **does not cancel itself**.
- Other children keep running.
**Use Case**: UI Scopes (ViewModel). If one network request fails, we don't want the "Save Button" listener to die forever.

## 2. Cancellation Mechanics
Cancellation is **cooperative**.
Calling `job.cancel()` does NOT kill the thread. It simply sets a flag: `isActive = false`.

### 2.1 The CancellationException

- `cancel()` throws a `CancellationException` inside the coroutine at the next suspension point.
- Because it's an Exception, `finally` blocks are executed.
- **Critical**: You must not catch-and-swallow `Exception` generally, or you will break cancellation.

### 2.2 Cooperative Checks
If you have a tight loop:
```kotlin
while (true) {
    // heavy math
}
```
This coroutine is **uncancellable**.
**Fix**:
```kotlin
while (isActive) { ... }
// OR
while (true) {
    ensureActive() // throws CancellationException if job done
    // math
}
```

## 3. Scopes
### 3.1 coroutineScope vs supervisorScope

- `coroutineScope`: Just creates a new scope. Inherits context. Fails if any child fails.
- `supervisorScope`: Creates a new scope with a `SupervisorJob`. Inherits context. Survives child failure.

### 3.2 GlobalScope (The Anti-Pattern)
`GlobalScope` has no parent. It is a root job.
If you launch in GlobalScope, and your Activity dies, the coroutine keeps running.
**Leak**: It holds references to View/Activity/Context.
**Never use it** unless the work is truly bound to the `Application` lifecycle (like logging on app close).

[Previous: Chapter 02 - Dispatchers](chapter-02-dispatchers-schedulers.md) | [Next: Chapter 04 - Flows](chapter-04-flows-channels.md)