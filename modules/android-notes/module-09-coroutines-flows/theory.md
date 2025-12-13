# 🎓 Theory: Coroutine Internals (PhD Level)

## 1. Continuation Passing Style (CPS)
Coroutines are not "User Level Threads" in the traditional sense (like Go routines). They are a compile-time transformation of code into a **State Machine**.

### 1.1 The Transformation
```kotlin
suspend fun fetchUser(): User {
    val token = getToken() // suspend
    return api.getUser(token) // suspend
}
```
The compiler rewrites this to roughly:

```java
public Object fetchUser(Continuation<User> cont) {
    StateMachine sm = (StateMachine) cont;
    switch(sm.label) {
        case 0:
            sm.label = 1;
            result = getToken(sm);
            if (result == COROUTINE_SUSPENDED) return COROUTINE_SUSPENDED;
            break;
        case 1:
            token = result;
            sm.label = 2;
            result = api.getUser(token, sm);
            if (result == COROUTINE_SUSPENDED) return COROUTINE_SUSPENDED;
            break;
        case 2:
            return result;
    }
}
```
**Key Insight**: A function that suspends **returns immediately** with a special token `COROUTINE_SUSPENDED`. The stack is unwound. The heap-allocated `StateMachine` object holds the local variables (`token`). When the async op finishes, it calls `cont.resume()`, which re-invokes `fetchUser` at the correct `case` label.

## 2. Dispatcher Mechanics
What actually happens when you do `withContext(Dispatchers.IO)`?
1.  **Magical Hook**: The `DispatchedContinuation` intercepts the `resume`.
2.  **Queueing**: It wraps the `Task` and submits it to the `Executor` attached to the Dispatcher.
3.  **IO Dispatcher**: Buffered `CoroutineScheduler`. It creates threads on demand (up to 64 or system limit). It uses a "Work Stealing" algorithm for efficiency.
4.  **Main Dispatcher**: Uses `Handler.post(Runnable)`.

### The Cost of Switching
`withContext` is optimized. If you switch to the *same* dispatcher, it avoids the thread switch overhead (`isDispatchNeeded`).
However, switching requires:
1.  Allocation of `DispatchedContinuation`.
2.  Locking the queue of the target dispatcher.
3.  Updating thread registers (Context Switch) if moving to a new thread.
**Optimization**: Do not switch excessively. Group IO operations.

## 3. Structured Concurrency: The Job Graph
Every Coroutine has a `Context` containing a `Job`.
`Job` is a Doubly-Linked List element.
- **Child Creation**: When a child connects to a parent, it adds a node to the parent's `_children` list.
- **Cancellation**: Parent iterates the list and calls `.cancel()` on all children. This is recursive.
- **Exception handling**: The child notifies the parent (unless Supervisor). The parent decides whether to blow up (cancel self) or ignore.

## 4. Flow Internals (Backpressure)
`Flow` is just an interface: `collect(FlowCollector)`.
- **Fusible**: Operators like `map` and `filter` are "fused". They don't switch dispatchers or allocate buffers. They just wrap the collector.
- **Buffering**: `flowOn` or `buffer()` introduces a `Channel` between the emitter and collector.
    - Emitter runs in Coroutine A.
    - Collector runs in Coroutine B.
    - Channel sends data across.
    - This is where "Concurrency" happens in Flow. Before buffering, it's sequential.

[< Back to Intro](intro.md) | [Next: Code Examples >](code-examples.md)
