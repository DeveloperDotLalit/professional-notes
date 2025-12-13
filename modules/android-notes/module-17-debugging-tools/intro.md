# Module 17: Debugging & Tools

## Module Overview
"It works on my machine" is not an acceptable engineering status.
When things break—and they will—you need more than `println("HERE")`.
This module transforms you from a "Guesser" to a "Surgeon".
We explore the powerful diagnostics tools Android provides: from low-level **Systrace** rendering analysis to database inspection, memory leak hunting, and ADB wizardry.

## What You Will Learn
- **Command Line Mastery**: Investigating processes with `adb shell`, recording screens, and dumping stacks.
- **Visual Inspection**: Using Layout Inspector to find overdraw and Database Inspector to query live Room DBs.
- **Performance Profiling**: Using **Perfetto** and **Systrace** to visualize every millisecond of a frame.
- **Automated Detection**: Configuring **StrictMode** and **LeakCanary** to crash your app before users do.

## Prerequisites
- Android Fundamentals (Module 02).
- Performance Theory (Module 11).

## Roadmap
1.  **[ADB & Logcat](chapter-01-adb-logcat.md)**: The terminal is your friend.
2.  **[Inspectors](chapter-02-inspectors.md)**: Seeing inside the running app.
3.  **[Profiling](chapter-03-profiling-systrace.md)**: Deep dive into CPU & Memory.
4.  **[Analyzers](chapter-04-analyzers-strictmode.md)**: StrictMode, LeakCanary, APK Analyzer.
