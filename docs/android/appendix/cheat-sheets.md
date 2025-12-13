---
layout: default
title: "Cheat Sheets"
parent: "Appendix"
nav_order: 999
---

## ADB Commands

| Command | Description |
| :--- | :--- |
| `adb devices` | List connected devices. |
| `adb install app.apk` | Install an APK. |
| `adb uninstall com.example.app` | Uninstall an app (keep data: `-k`). |
| `adb shell` | Open remote shell on device. |
| `adb logcat` | View system logs. |
| `adb shell input text "hello"` | Type text into the device. |
| `adb shell screencap -p /sdcard/s.png` | Take a screenshot. |
| `adb shell screenrecord /sdcard/v.mp4` | Record screen video. |

## Gradle Wrappers

| Command | Description |
| :--- | :--- |
| `./gradlew build` | Build the project. |
| `./gradlew clean` | Delete build directory. |
| `./gradlew assembleDebug` | Create Debug APK. |
| `./gradlew bundleRelease` | Create Release App Bundle. |
| `./gradlew test` | Run Unit Tests. |
| `./gradlew connectedAndroidTest` | Run Instrumented (Espresso) Tests. |
| `./gradlew dependencies` | View dependency tree (crucial for debugging conflicts). |
| `./gradlew signingReport` | Show SHA-1/SHA-256 fingerprints. |

## Git for Android

| Command | Description |
| :--- | :--- |
| `.gitignore` | Should include `build/`, `.idea/`, `local.properties`, `.gradle`. |
| `git status` | Check changes. |
| `git checkout -b feature/login` | Create new branch for a feature. |

## SOLID Principles

| Letter | Principle | Summary |
| :--- | :--- | :--- |
| **S** | SRP | Single Responsibility. One reason to change. |
| **O** | OCP | Open/Closed. Extend, don't modify. |
| **L** | LSP | Liskov Substitution. Subtypes must honor parent contract. |
| **I** | ISP | Interface Segregation. Split large interfaces. |
| **D** | DIP | Dependency Inversion. Depend on abstractions. |

## Design Patterns (Android)

| Pattern | Example |
| :--- | :--- |
| **Builder** | `NotificationCompat.Builder` |
| **Factory** | `ViewModelProvider.Factory` |
| **Adapter** | `RecyclerView.Adapter` |
| **Decorator** | `ContextWrapper` |
| **Observer** | `LiveData` / `Flow` |
| **Facade** | `Retrofit` |
| **Strategy** | `DiffUtil.ItemCallback` |

## Agile & Estimation

| Point | Complexity | Time (Rough) |
| :--- | :--- | :--- |
| **1** | Trivial (Label change) | < 2 hours |
| **2** | Small (Bug fix) | 0.5 Day |
| **3** | Medium (New Screen) | 1-2 Days |
| **5** | Large (Complex logic) | 3-4 Days |
| **8** | XL (Unknowns) | 1 Sprint |

## Key Shorcuts (Android Studio / IntelliJ)

| Windows | Mac | Action |
| :--- | :--- | :--- |
| `Ctrl + N` | `Cmd + O` | Find Class. |
| `Ctrl + Shift + N` | `Cmd + Shift + O` | Find File. |
| `Shift + Shift` | `Shift + Shift` | Search Everywhere. |
| `Ctrl + Alt + L` | `Cmd + Opt + L` | Reformat Code. |
| `Ctrl + Q` | `Ctrl + J` | Quick Documentation. |
| `Ctrl + P` | `Cmd + P` | Parameter Info. |

## Debugging Power-Moves

| Scenario | Tool |
| :--- | :--- |
| **"UI is stuck"** | `adb shell kill -3 <PID>` (Triggers ANR trace dump). |
| **"How fast is this function?"** | `Debug.startMethodTracing("name")` |
| **"Who holds this object?"** | Memory Profiler -> Heap Dump -> "References". |
| **"Why is the list empty?"** | Database Inspector (Live SQL). |
| **"Network call failed?"** | Network Inspector (or Chucker). |

[< Back to Syllabus](../docs/syllabus-overview.md)