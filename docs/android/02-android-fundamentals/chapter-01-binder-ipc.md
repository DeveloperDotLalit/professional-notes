---
layout: default
title: "Binder Ipc"
parent: "Android Fundamentals"
nav_order: 1
---

## 1. The Linux Kernel Foundation
Android is Linux (mostly). Every app is a distinct **Process** running a distinct **Dalvik/ART Virtual Machine** instance (sandbox).

- **Isolation**: App A cannot touch App B's memory.
- **UID**: Each app is assigned a unique Linux User ID (e.g., `u0_a123`). Permissions are enforced at the kernel level.

## 2. Zygote: The Mother of All Processes
Launching a new JVM is slow. Android cheats.

1.  **Boot Time**: The `Zygote` process starts. It preloads thousands of common Android framework classes (Activity, View, String) and resources into RAM.
2.  **App Launch**: When you tap an icon, AMS asks Zygote to **fork** itself.
3.  **Forking**: Copy-on-Write (COW). The new app process inherits the preloaded RAM. It only consumes new memory when it writes to it.
    *   *Result*: App launch takes 100ms instead of 2000ms.

## 3. Binder IPC (Inter-Process Communication)
Normally, processes can't talk. Binder is a kernel driver (`/dev/binder`) that enables high-speed casting of objects across processes.

### 3.1 The Mechanism

- **AIDL**: Android Interface Definition Language.
- **Proxy (Client side)**: Marshals data (Parcels) -> System Call -> Kernel.
- **Stub (Server side)**: Kernel -> Unmarshals data -> Calls actual method.

### 3.2 TransactionLimitException
Binder buffer is small (~1MB shared for the process).
If you try to send a Bitmap or large String via Intent/Binder, you crash.
Binder is for **Control Flow**, not **Data Transfer**.

## 4. The System Server
The `system_server` process hosts all the core Android services:

- **AMS (ActivityManagerService)**: Controls lifecycle, backstack.
- **WMS (WindowManagerService)**: Controls surfaces, z-ordering, input dispatch.
- **PMS (PackageManagerService)**: Knows every APK installed.

### 4.1 How `startActivity` works (Under the hood)

1.  **App Process**: `startActivity(intent)` -> `Instrumentation.execStartActivity`.
2.  **Binder Call**: Calls `IActivityManager.startActivity` (IPC to System Server).
3.  **AMS (System Process)**: 
    - Checks Manifest (PMS). 
    - Checks Permissions.
    - Resolves Intent.
    - Creates `ActivityRecord`.
4.  **Zygote**: AMS asks Zygote to fork a new process (if App not running).
5.  **New App Process**: `ActivityThread.main()` is called.
6.  **Binder Call**: New App attaches to AMS.
7.  **AMS**: Tells New App "Launch Activity X".
8.  **New App**: `handler.sendMessage(LAUNCH_ACTIVITY)` -> `onCreate()`.

[Next: Chapter 02 - UI Rendering](chapter-02-ui-rendering.md)