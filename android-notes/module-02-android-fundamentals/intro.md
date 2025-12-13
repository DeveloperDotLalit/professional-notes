# Module 02: Android Fundamentals

## 📋 Overview
It's easy to make an app "look" like it works. It's hard to make it robust against **Process Death**, **Configuration Changes**, and **Memory Leaks**. This module strips away the UI layers and looks at the raw machinery of the Android OS: The `ActivityThread`, the `Binder`, and the `Lifecycle`.

## 🎯 Learning Objectives
1.  Predict exactly when `onPause`, `onStop`, and `onDestroy` are called (it's not always when you think).
2.  Handle **Process Death** like a pro (no more "Why is my variable null?" crashes).
3.  Understand the difference between `Context` types (Application vs Activity).
4.  Debug `TransactionTooLargeException`.

## 📚 Topics Covered
- **Lifecycle Graph**: The full state machine.
- **Process Death vs Config Change**: Why they are different and why `ViewModel` only saves you from one.
- **SavedStateHandle**: The correct way to persist state.
- **Context Hell**: `baseContext` vs `applicationContext`.
- **Tasks & Back Stack**: `singleTop`, `singleTask`, and navigation weirdness.

---

[< Back to Syllabus](../docs/syllabus-overview.md) | [Next: Theory Deep Dive >](theory.md)
