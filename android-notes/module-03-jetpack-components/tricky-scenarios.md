# 🤯 Tricky Scenarios: Jetpack Components

## Scenario 1: LiveData "SingleEvent" Problem
### The Setup
You use a `LiveData<Boolean>` to show a Toast or Navigate.
`viewModel.error.observe(viewLifecycleOwner) { showToast() }`
1.  Error occurs. Toast shows.
2.  Rotation happens.
3.  Fragment destroyed and recreated.
4.  Observer re-attaches.

### The Reality
**Toast shows AGAIN.**
Why? LiveData holds the *latest* value. When the new view observes, it immediately receives "Error".
**Fix**: Use `SharedFlow` (with `replay=0`) or a wrapper class `Event<T>` (handled property).
**Best Practice**: For one-off events, use `Channel` or `SharedFlow` exposed as `Flow`.

---

## Scenario 2: WorkManager "Periodic" Minimums
### The Setup
You set a periodic work request to sync data every 5 minutes.
`PeriodicWorkRequestBuilder<SyncWorker>(5, TimeUnit.MINUTES).build()`

### The Expectation
Syncs every 5 minutes.

### The Reality
Syncs every **15 minutes**.
Android enforces a minimum interval of 15 minutes for `PeriodicWorkRequest` to save battery.
**Fix**: If you really need it faster (you probably shouldn't), use `OneTimeWorkRequest` and reschedule it yourself (still subject to Doze mode) or use a foreground service (if critical).

---

## Scenario 3: Paging 3 "Duplicates"
### The Setup
You use Paging 3 with a Network-only source. You use integer page numbers.
You scroll down.

### The Reality
Items jitter or duplicate.
**Cause**: The API might return overlapping items if the dataset changes on the server while you are paging. Paging 3's `DiffUtil` usually handles this, BUT unique IDs must be stable.
**Trap**: Relying on `position` as the unique ID in `DiffCallback` is a common mistake. Always use a stable backend ID.

[< Back to Interview Questions](interview-questions.md) | [**Next Module: Architecture** >](../module-04-architecture-mvvm-clean/intro.md)
