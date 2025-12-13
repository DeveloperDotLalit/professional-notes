---
layout: default
title: "Theory"
parent: "Jetpack Components"
nav_order: 999
---

## 1. Single Activity Architecture (Navigation)
Historically, apps used multiple Activities. This caused transition jank and state issues.
**Modern Approach**: One `MainActivity` + Multiple `Fragments`.

- **NavController**: Swaps fragments in/out of a `FragmentContainerView`.
- **Back Stack**: Managed internally by NavController.
- **Deep Links**: Handled centrally in the graph.

## 2. WorkManager: The Scheduler
**Do not use** `JobScheduler` or `AlarmManager` directly anymore.
WorkManager chooses the best way to run tasks:

- API 23+: Uses `JobScheduler`.
- Older: Uses `AlarmManager` + `BroadcastReceiver`.
**Guarantee**: The task *will* run eventually, even if the app process is killed or device reboots (if persisted).
**Not for**: Instant execution needed for UI (use Coroutines). This is for *deferrable* work.

## 3. LiveData vs StateFlow

| Feature | LiveData | StateFlow |
| :--- | :--- | :--- |
| **Lifecycle Aware?** | Yes (Pauses emitting when UI stopped) | No (Requires `repeatOnLifecycle`) |
| **Initial Value** | Optional | **Mandatory** |
| **Domain Layer** | No (Android Dependency) | **Yes** (Pure Kotlin) |
| **Thread Safety** | Main Thread Only | Any Thread |

**Verdict**: Use `StateFlow` in ViewModel/Domain. Use `LiveData` only if you are maintaining legacy code or need simple UI binding in Java projects.

## 4. Paging 3
Loads data in chunks.

- **PagingSource**: The data loader (API/DB).
- **RemoteMediator**: Smart caching (Network + Local DB).
- **PagingData**: The data container passed to the UI.
- **DiffUtil**: built-in for efficient Recycler updates.

[< Back to Intro](intro.md) | [Next: Code Examples >](code-examples.md)