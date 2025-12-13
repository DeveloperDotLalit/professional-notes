# 🎓 Theory: Android Internals

## 1. The Lifecycle State Machine
### The "Partially Visible" Myth
Many devs think `onPause` means "screen off".
- **`onPause()`**: Activity is partially visible (e.g., a permission dialog, or multi-window mode) OR is about to stop. User focus is lost.
- **`onStop()`**: Activity is **completely** no longer visible. Calculations should stop here.
- **`onDestroy()`**: The end.

> **Trap**: `onDestroy` is **NOT guaranteed** to be called. If the system needs memory rapidly, it might just kill the process after `onStop`.

---

## 2. Process Death vs. Configuration Change
### Configuration Change (Rotation, Dark Mode)
1.  User rotates phone.
2.  System destroys Activity (`onDestroy`).
3.  System recreates Activity (`onCreate`).
4.  **ViewModel survives**.
5.  In-memory static variables survive.

### Process Death (Low Memory)
1.  User puts app in background.
2.  User plays a heavy game (Genshin Impact).
3.  OS Kills your app process (`kill -9`).
4.  **ViewModel acts as if it never existed (It dies)**.
5.  Static variables are reset.
6.  User returns. System creates a *new process* and restores the Activity.
7.  `savedInstanceState` bundle is passed back.

**The Solution**: `SavedStateHandle` in ViewModels. It bridges the gap.

---

## 3. The `Context` Guide
| Context Type | Source | Lifespan | Usage |
| :--- | :--- | :--- | :--- |
| **Application** | `applicationContext` | App Process | Singletons, Database, Analytics |
| **Activity** | `this` | Activity Life | UI creation, Toast, Dialogs |
| **Service** | `this` | Service Life | Background work |

> **Memory Leak Warning**: NEVER store an `Activity` context in a static variable or a Singleton. This leaks the *entire* Activity hierarchy.

---

## 4. The IPC (Inter-Process Communication) Limit
Android uses `Binder` to pass data between components (and the system).
The transaction buffer is fixed (~1MB shared for *all* active transactions).
- If you put a giant Bitmap or JSON string into an `Intent` extra, you crash: `TransactionTooLargeException`.
- **Best Practice**: Pass ID strings, fetch data from a repository/DB.

[< Back to Intro](intro.md) | [Next: Code Examples >](code-examples.md)
