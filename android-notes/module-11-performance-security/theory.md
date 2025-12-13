# 🎓 Theory: Performance & Security Internals

## 1. The 16ms Rule
To achieve 60 FPS, the main thread must finish all work (Input -> Measure -> Layout -> Draw) in less than 16ms (1000ms / 60).
- If you take 20ms, you drop a frame. The user sees a "hiccup" (Jank).
- **Root Cause**: Heavy loops, sorting, or JSON parsing on Main Thread.

## 2. R8 vs ProGuard
- **ProGuard**: The old Java tool for shrinking (remove unused), optimizing (inline), and obfuscating (rename).
- **R8**: Google's replacement. Does everything ProGuard does but faster and produces better Dex bytecode. It is the default now.
- **Why use it?** Reverse engineering is harder. App size is smaller.

## 3. Network Security Config
Instead of hardcoding certificate logic, Android allows XML configuration.
- **Cleartext Traffic**: Disabled by default on Android 9+.
- **Certificate Pinning**: Hardcoding the hash of your server's certificate. Prevents Man-in-the-Middle (MitM) attacks.

[< Back to Intro](intro.md) | [Next: Code Examples >](code-examples.md)
