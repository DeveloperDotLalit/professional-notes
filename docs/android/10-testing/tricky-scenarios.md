---
layout: default
title: "Tricky Scenarios"
parent: "Testing"
nav_order: 999
---

## Scenario 1: The "Main Looper" Crash
### The Setup
You test a Repository that uses `withContext(Dispatchers.Main)` to parse some result.
You run a JUnit test.

### The Reality
`RuntimeException: Method getMainLooper in android.os.Looper not mocked`.
**Reason**: `android.jar` provided to local tests is empty (stubs). It throws Generic Exceptions for everything.
**Fix**:

1.  Use `Dispatchers.setMain` in your test setup.
2.  Inject Dispatchers into your Class. `class Repo(val ioDispatcher: CoroutineDispatcher)`. In test, pass `UnconfinedTestDispatcher`. In app, pass `Dispatchers.Main`.

---

## Scenario 2: LiveData not emitting
### The Setup
You update a LiveData in the test. `liveData.value = "A"`.
You assert value is "A".
It fails.

### The Reality
LiveData uses `ArchTaskExecutor` to post to the main thread. In JUnit, this delegate is not set.
**Fix**: Apply the `InstantTaskExecutorRule` (from `androidx.arch.core:core-testing`) to your test class. This forces all LiveData operations to happen instantly on the calling thread.

---

## Scenario 3: Leak in `runTest`
### The Setup
```kotlin
@Test
fun test() = runTest {
    launch {
        while(true) { delay(100) } // Infinite loop
    }
} // End of test
```
### The Reality
**Test Hangs / Fails with Timeout**.
`runTest` will automatically wait for all child coroutines to complete (Structured Concurrency). If you leave a child running forever, the test never finishes.
**Fix**: You must cancel background jobs at the end of the test explicitly, or use a scope that strictly manages lifecycle. Or use `backgroundScope` (in newer Coroutine Test APIs) which automatically cancels at end of test.

[< Back to Interview Questions](interview-questions.md) | [**Next Module: Performance & Security** >](../module-11-performance-security/intro.md)