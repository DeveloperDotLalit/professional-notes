---
layout: default
title: "Code Examples"
parent: "Debugging Tools"
nav_order: 999
---

## 1. StrictMode Configuration
Put this in your `Application.onCreate()`.

```kotlin
class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()
        if (BuildConfig.DEBUG) {
            setupStrictMode()
        }
    }

    private fun setupStrictMode() {
        // Thread Policy: Things happening on Main Thread
        StrictMode.setThreadPolicy(
            StrictMode.ThreadPolicy.Builder()
                .detectDiskReads()
                .detectDiskWrites()
                .detectNetwork()   // Panic if networking on UI thread
                .penaltyLog()      // Log to Logcat
                .penaltyDeath()    // Crash the app (Force fix)
                .build()
        )

        // VM Policy: Memory Leaks / Object usage
        StrictMode.setVmPolicy(
            StrictMode.VmPolicy.Builder()
                .detectLeakedSqlLiteObjects()
                .detectLeakedClosableObjects() // Forgot close() on FileStream?
                .detectActivityLeaks()
                .penaltyLog()
                .build()
        )
    }
}
```

## 2. Timber (Better Logging)
Don't use `Log.d("TAG", "msg")`. It stays in production.
Use Timber.

```kotlin
// Setup
if (BuildConfig.DEBUG) {
    Timber.plant(Timber.DebugTree())
}

// Usage
Timber.d("User Logged in with ID: %s", userId) // Automatic TAG generation
Timber.e(exception, "Failed to load data")

// Release
// In release, the tree is NOT planted, so logs are stripped automatically.
```

## 3. Method Tracing (Debug.startMethodTracing)
For checking exactly how long a specific function takes (microseconds).

```kotlin
fun distinctExpensiveOperation() {
    // Start recording trace to "/sdcard/my_trace.trace"
    Debug.startMethodTracing("my_trace")
    
    // ... complex work ...
    
    // Stop recording
    Debug.stopMethodTracing()
}
```
You can then pull this file `adb pull /sdcard/my_trace.trace` and open it in Android Studio Profiler.