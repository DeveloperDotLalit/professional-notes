# 🤯 Tricky Scenarios: The Hidden Leaks

## Scenario 1: The `View` in `Runnable`
### The Setup
```kotlin
// In Activity
val view = findViewById<TextView>(R.id.text)
Handler(Looper.getMainLooper()).postDelayed({
    view.text = "Done"
}, 10000)
```
User rotates screen (Destroy Activity) immediately.

### The Reality
**Leak for 10 seconds**.
The Runnable captures `view`. `view` holds reference to `Context` (Activity).
The Handler holds the Runnable in the MessageQueue.
The MessageQueue is attached to the Looper (Main Thread).
Chain: MainThread -> MessageQueue -> Runnable -> View -> Activity.
**Fix**: Remove callbacks in `onDestroy` (`handler.removeCallbacksAndMessages(null)`), or use WeakReference, or mostly: **Use Coroutines tied to `lifecycleScope`**!

---

## Scenario 2: R8 vs Enum.valueOf
### The Setup
You have an Enum `enum class Page { HOME, SETTINGS }`.
You receive "HOME" from server.
You call `Page.valueOf("HOME")`.

### The Crash
R8 might obfuscate Enum names to `a`, `b`.
So `Page.valueOf("HOME")` fails because it only knows "a" and "b".
**Fix**: Add `@Keep` to enums used in API parsing, or customize R8 rules.

---

## Scenario 3: Lazy Loaded Singletons
### The Setup
You pass `context` to a Singleton initialization.
`MySingleton.getInstance(this)` inside an Activity.

### The Leak
If the Singleton stores that Context in a static field, and `this` is an Activity, you just leaked the Activity forever.
**Fix**: `context.applicationContext`. Always.

[< Back to Interview Questions](interview-questions.md) | [**Next Module: Publishing** >](../module-12-publishing-devops/intro.md)
