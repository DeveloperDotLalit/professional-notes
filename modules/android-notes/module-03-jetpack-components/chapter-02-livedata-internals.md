# Chapter 02: LiveData Internals

## 1. Lifecycle Awareness
`LiveData` is an Observer Pattern that knows about `Lifecycle`.
It will NOT emit updates if the observer is inactive (Paused/Stopped).
It will automatically remove the observer when `DESTROYED`.

### 1.1 The Wrapper
When you call `observe(owner, observer)`, LiveData wraps your observer in a `LifecycleBoundObserver`.
- It hooks into `owner.lifecycle.addObserver(this)`.
- **onStateChanged**: It checks `owner.lifecycle.currentState.isAtLeast(STARTED)`.
- If `true` -> Dispatch Value.
- If `false` -> Mark as inactive.

## 2. Versioning (The Sticky Event Problem)
LiveData keeps a `mVersion` integer. Increments on `setValue`.
ObserverWrapper keeps a `mLastVersion`.
- Initial State: `mVersion = -1`, `mLastVersion = -1`.
- `setValue("A")` -> `mVersion = 0`.
- **Dispatch**:
    - `if (mLastVersion < mVersion)`:
        - `observer.onChanged("A")`
        - `mLastVersion = mVersion`

### 2.1 Stickiness
If a new Observer attaches *after* the value was set:
- New Observer local `mLastVersion = -1`.
- LiveData global `mVersion = 0`.
- Check passes (`-1 < 0`).
- Observer gets "A" immediately.
This is why LiveData is "Sticky". It always emits the last known value to new subscribers.

## 3. Dispatching
`setValue` runs on Main Thread.
`postValue` creates a Runnable and posts to Main Handler.
**Race Condition**: If you call `postValue("A")` and then `postValue("B")` very quickly before the main thread executes, the Runnable might only send "B" (it overwrites pending data in some implementations/timing windows). **Only the latest value is guaranteed**.

[Previous: Chapter 01 - ViewModel](chapter-01-viewmodel-internals.md) | [Next: Chapter 03 - WorkManager](chapter-03-workmanager-schedulers.md)
