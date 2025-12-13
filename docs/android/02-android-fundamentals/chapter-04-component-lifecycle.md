---
layout: default
title: "Component Lifecycle"
parent: "Android Fundamentals"
nav_order: 4
---

## 1. The Process Lifecycle
The OS kills processes, not Activities.
**Hierarchy of Death**:

1.  **Foreground**: User interacting. (Invincible-ish).
2.  **Visible**: Paused, but visible (Dialog, Multi-window).
3.  **Service**: Background service running (Music).
4.  **Cached**: App in background. Memory holding it. **First to die**.

## 2. SavedInstance State (The Serialization)
When System kills process (Low Memory), Memory is wiped. Objects are gone.
We must save state to a persistent buffer (Binder buffer).

- `onSaveInstanceState(Bundle)`.
- **Bundle**: A type-safe map serialized to bytes.
- **Limit**: ~1MB max (Shared across all active activities!).
- **Bitmap in Bundle?**: **Crash** (TransactionTooLargeException).

## 3. ViewModel vs SavedState

- **ViewModel**: Survives Configuration Changes (Rotation). Stays in Memory.
- **SavedState**: Survives Process Death. Stored in helper.
- **The Gap**: If you rely ONLY on ViewModel, your user loses data when they background the app and return 2 hours later.
- **Solution**: `SavedStateHandle` in ViewModel.

## 4. FragmentManager Internals
`FragmentManager` is a state machine manager.

- **Transactions**: `beginTransaction().add().commit()`.
- **Commit vs CommitNow**:
    - `commit()`: Schedules the transaction to the Handler (Async).
    - `commitNow()`: Executes immediately on Main Thread. (Cannot perform if state saved).
- **BackStack**: A record of transactions (OpCodes) to reverse them.

### 4.1 The Constructor Trap
```kotlin
class MyFragment(val id: Int) : Fragment() // CRASH
```
System re-creates Fragments via **Reflection** `newInstance()`. It looks for a 0-arg constructor.
If you use a custom constructor, it fails.
**Fix**: `FragmentFactory` or `setArguments(Bundle)`.

[Previous: Chapter 03 - Handler](chapter-03-handler-looper.md) | [Back to Syllabus](../docs/syllabus-overview.md)