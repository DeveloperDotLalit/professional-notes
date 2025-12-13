# Module 09: Asynchronous Programming (Coroutines & Flows)

## 📋 Overview
Multithreading used to be hard. Callbacks, `AsyncTask`, RxJava complexities... Coroutines simplify this by writing async code sequentially. But "simple" syntax hides complex behavior regarding cancellation and exception handling.

## 🎯 Learning Objectives
1.  Predict exactly what happens when a sibling coroutine crashes.
2.  Choose the right `Dispatcher` (`Main.immediate` vs `Main`).
3.  Master **Flow** operators (`flatMapLatest`, `combine`).
4.  Handle **Backpressure** using `buffer` and `conflate`.

## 📚 Topics Covered
- **Structured Concurrency**: The hierarchy of jobs.
- **Exception Handling**: `CoroutineExceptionHandler`, `SupervisorJob`.
- **Flows**: Cold Streams.
- **Channels**: Hot generic data transfer.
- **StateFlow/SharedFlow**: State management (revisited).

---

[< Back to Syllabus](../docs/syllabus-overview.md) | [Next: Theory Deep Dive >](theory.md)
