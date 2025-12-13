# Module 09: Coroutines & Flows - Interview Questions (Narrative)

## Section 1: Internals & Dispatchers

### Q1: How does a `suspend` function actually suspend?
**Candidate Answer:**
"This is really the magic of Kotlin Coroutines. Under the hood, the compiler transforms every `suspend` function into a state machine using **Continuation Passing Style (CPS)**.

When you call a suspend function, the compiler adds a hidden parameter called `Continuation`.
Think of this Continuation as a 'Save Point' in a game. It holds the current stack frame—all your local variables, the instruction pointer (where you are in the code), and the state label.

When the function hits a suspension point—say, `delay(1000)`—it does a few things:
1.  It saves all local variables into the Continuation object on the heap.
2.  It schedules the resumption (e.g., tells a timer 'wake me up in 1 sec').
3.  And purely speaking, it **returns** a special token called `COROUTINE_SUSPENDED`.

This `return` statement is what unblocks the actual Thread. The thread is now free to pop out of the function and go execute other tasks.
Later, when the timer fires, the system calls `continuation.resume()`. The function is called again, but this time it checks the 'state', restores variables from the heap, and jumps right to the line *after* the delay."

### Q3: `Dispatchers.Main` vs `Dispatchers.Main.immediate`.
**Candidate Answer:**
"This is a specific optimization for the Android UI thread.
Standard `Dispatchers.Main` is built on top of the Android `Handler`. When you launch on it, it basically does `handler.post(runnable)`. Even if you are *already* on the Main thread, it puts the message at the end of the MessageQueue. This means your code won't run until the next Loop cycle. In UI terms, this can sometimes delay execution by a frame (16ms), potentially causing a micro-stutter.

`Dispatchers.Main.immediate` is smarter. It performs a check: `if (Thread.currentThread() == MainThread)`.
If we are strictly already on the main thread, it executes the code **immediately**, synchronously, right there. No queueing. No waiting.
If we are on a background thread, it falls back to posting to the queue.
Google recommends always using `immediate` for UI interactions to keep animations and state updates snappy."

### Q4: Explain `Dispatchers.IO` pool resizing logic.
**Candidate Answer:**
"The `IO` dispatcher is designed specifically for blocking tasks, like reading files or network calls.
It actually shares its underlying thread pool with `Dispatchers.Default` (which is meant for CPU work), but it adds a twist.

`Dispatchers.Default` is limited to the number of CPU cores (e.g., 8 threads) because adding more threads won't make math run faster—it just adds context switching overhead.
But `Dispatchers.IO` knows that its threads spend most of their time sleeping (waiting for bytes). So it allows the pool to expand significantly—typically up to **64 threads** or more.
When you switch context to `IO`, the runtime spins up (or unparks) extra threads to ensure that the 8 'CPU' threads are never blocked by a sleeping network call. It essentially 'bursts' the capacity to keep throughput high during blocking operations."

## Section 2: Concurrency Hazards

### Q21: How to handle 10,000 DB inserts with Coroutines?
**Candidate Answer:**
"The naive approach would be to do `list.forEach { launch { insert(it) } }`. Please don't do this!
Launching 10,000 coroutines is cheap memory-wise, but managing 10,000 concurrent database transactions will crush SQLite. The database will lock, and you'll likely hit `SQLITE_BUSY` errors or OOM issues from queuing huge tasks.

A better approach is **Chunking** or **Constrained Concurrency**.
I would probably use `list.chunked(100)` and insert batches.
Or, if they must be processed individually, I'd use a pattern like a Semaphore or a Channel.
For example, create a Channel with a buffer capacity of, say, 4. Have 4 workers consuming from that channel.
This restricts the parallelism to exactly 4 concurrent inserts inside a transaction. It keeps the DB happy and memory usage flat."

### Q23: Can a Mutex causing a Deadlock?
**Candidate Answer:**
"Yes, absolutely. A `Mutex` in Kotlin is non-reentrant.
In Java, `synchronized` blocks are re-entrant. If Thread A holds the lock and asks for it again, it gets it.
In Kotlin, if a Coroutine holds a Mutex key and tries to `lock()` it again (perhaps via a recursive function or calling a helper that also locks), it will suspend forever efficiently waiting for *itself* to unlock. It's a classic deadlock.
You have to be very careful to verify that nested function calls don't try to acquire the same Mutex twice."

## Section 3: Flows

### Q12: `StateFlow` vs `LiveData`. Why shift?
**Candidate Answer:**
"For a long time, LiveData was king because it was Lifecycle-Aware. It wouldn't emit updates if the Activity was stopped, preventing crashes.
But LiveData has flaws. It's stuck on the Main Thread. It doesn't have operators (map/filter are clunky). It's tightly coupled to the Android SDK (hard to unit test purely).

`StateFlow` is pure Kotlin. It's built on Coroutines, so it's thread-agnostic and powerful.
The 'Lifecycle Awareness' gap was closed by the `repeatOnLifecycle` API.
So now, `StateFlow` gives us the best of both worlds: a powerful, platform-independent stream of state, that we can consume safely in the UI layer. It's definitely the modern standard."

### Q18: The hazard of `catch` operator placement.
**Candidate Answer:**
"Flow operators are strictly 'Upstream'.
If I write:
```kotlin
flow
 .map { logic() }
 .catch { emit(Error) }
 .collect { view.show(it) }
```
The `catch` block will strictly catch exceptions happening in `map` or the `flow` builder.
It will **NOT** catch exceptions that happen in `collect`.
If `view.show(it)` crashes, that exception flies right past the `catch` operator and crashes the app (or the scope).
If you want to handle UI crashes, you need to wrap the `collect` block itself in a `try-catch`, or use `flow.onEach { ... }.catch { ... }.launchIn(scope)`."

[Back to Syllabus](../docs/syllabus-overview.md)
