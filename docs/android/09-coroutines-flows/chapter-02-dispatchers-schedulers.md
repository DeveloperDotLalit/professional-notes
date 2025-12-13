---
layout: default
title: "Dispatchers Schedulers"
parent: "Coroutines Flows"
nav_order: 2
---

## 1. What is a Dispatcher?
A `CoroutineDispatcher` is an abstraction over a threading implementation. Its sole job: `dispatch(context, runnable)`.

### 1.1 Dispatchers.Default (The CPU Pool)

- **Backed By**: `DefaultScheduler` (a `CoroutineScheduler`).
- **Algorithm**: Work Stealing.
- **Threads**: Defaults to number of CPU cores (min 2).
- **Usage**: CPU-intensive tasks (sorting, DiffUtil, hashing).
- **Mechanism**:
    1.  Global Queue (LIFIO/FIFO modes).
    2.  Local Queue per Worker Thread (for locality).
    3.  If a worker's local queue is empty, it attempts to "steal" tasks from another worker's queue.

### 1.2 Dispatchers.IO (The Blocking Pool)

- **Backed By**: The *same* `CoroutineScheduler` as Default!
- **Limit**: Defaults to 64 threads (or core count, whichever is larger).
- **Mechanism**:
    - It shares threads with `Default`. 
    - When you switch to IO, it tells the scheduler "I am blocking". The scheduler spins up extra threads to compensate for the blocked thread, maintaining strict parallelism for CPU tasks while allowing IO throughput.
- **Interchangeability**: Switching between `Default` and `IO` is often free (no context switch) if they share the same underlying pool and thread capacity limits are not hit.

### 1.3 Dispatchers.Main

- **Android**: `HandlerContext`.
- **Implementation**: Wraps `Handler(Looper.getMainLooper())`.
- **dispatch()**: Calls `handler.post(runnable)`.

#### The `immediate` Optimization
`Dispatchers.Main.immediate`
```kotlin
override fun isDispatchNeeded(context: CoroutineContext): Boolean {
    return Looper.myLooper() != handler.looper || isPaused
}
```
If we are already on the Main thread, `isDispatchNeeded` returns `false`.
The Coroutine builder (`launch`/`withContext`) sees this and executes the code **immediately** (synchronously) instead of allocating a Runnable and posting it to the queue.
**Benefit**: Huge win for UI latency. Prevents "flicker" where UI updates are delayed to the next frame.

## 2. Unconfined Dispatcher
`Dispatchers.Unconfined`

- **Behavior**: Starts execution in the current call stack.
- **Suspension**: Upon resumption, it resumes in the thread that resumed it.
- **Danger**:
    ```kotlin
    withContext(Dispatchers.Unconfined) {
        // Runs on Main (if caller is Main)
        val data = download() // Suspends. Network lib resumes on a Thread-Pool thread.
        // Resumes on Network Thread!
        updateUi() // CRASH! CalledFromWrongThreadException.
    }
    ```

- **Use Case**: Testing, or highly specific internal operators (like `collect` in Flow starts unconfined).

## 3. Custom Executors
You can convert any Java Executor to a Dispatcher:
```kotlin
val myDispatcher = Executors.newSingleThreadExecutor().asCoroutineDispatcher()
```
**Important**: You must `close()` it, or the thread will leak and keep the JVM alive.

[Previous: Chapter 01 - CPS](chapter-01-cps-statemachine.md) | [Next: Chapter 03 - Structured Concurrency](chapter-03-structured-concurrency.md)