---
layout: default
title: "Adb Logcat"
parent: "Debugging Tools"
nav_order: 1
---

## 1. ADB: Beyond `install`
The Android Debug Bridge (ADB) is your swiss-army knife.

### Critical Commands

- **Process ID**: `adb shell pidof com.example.app`
- **Typing**: `adb shell input text "password123"` (Great for bypassing long login flows on emulators).
- **Intents**: `adb shell am start -a android.intent.action.VIEW -d "example://deep-link"` (Test Deep Links instantly).
- **Screenshots**: `adb exec-out screencap -p > screen.png` (Faster than Android Studio).

## 2. Logcat Mastery
Stop scrolling through 10,000 lines of system noise.

### Filters

- **Tags**: `adb logcat -s "MyTag"` (Only shows logs with TAG "MyTag").
- **Levels**: `adb logcat *:E` (Show ONLY Errors and Fatal crashes).
- **Grep**: `adb logcat | grep "UserID"` (Unix pipe filtering).

### Formatting

- `adb logcat -v time`: Shows timestamps.
- `adb logcat -v color`: Essential for sanity.

## 3. Desktop Tools (Pidcat & Scrcpy)

- **Pidcat**: A colored, package-aware logcat wrapper. You rarely need to filter by PID manually; Pidcat tracks the app package name across process restarts.
- **Scrcpy**: Mirrors your Android device to your computer screen with low latency. Allows controlling the phone with your mouse/keyboard. Essential for demos.

[Next: Chapter 02 - Inspectors](chapter-02-inspectors.md)