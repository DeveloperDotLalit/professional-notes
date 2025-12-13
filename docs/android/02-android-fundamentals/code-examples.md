---
layout: default
title: "Code Examples"
parent: "Android Fundamentals"
nav_order: 999
---

## 1. Handling Process Death with `SavedStateHandle`
**Bad**: Relying on `onCreate` and local variables.
```kotlin
class BadViewModel : ViewModel() {
    var searchQuery: String = "" // Lost on process death
}
```

**Good**: Using `SavedStateHandle` to survive process death.
```kotlin
class SafeViewModel(private val state: SavedStateHandle) : ViewModel() {
    
    // Automatically saved/restored
    var searchQuery: String
        get() = state.get<String>("query") ?: ""
        set(value) = state.set("query", value)
        
    // Or as a LiveData/StateFlow
    val queryLiveData = state.getLiveData<String>("query")
}
```

---

## 2. The Transparent Activity Trick
How to launch an activity that doesn't look like a new screen (e.g., for a permission request or result handling).
`AndroidManifest.xml`:
```xml
<activity android:name=".ProxyActivity"
    android:theme="@style/Theme.AppCompat.Transparent.NoActionBar" />
```

`styles.xml`:
```xml
<style name="Theme.AppCompat.Transparent.NoActionBar" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="android:windowIsTranslucent">true</item>
    <item name="android:windowBackground">@android:color/transparent</item>
    <item name="android:windowContentOverlay">@null</item>
    <item name="android:windowNoTitle">true</item>
    <item name="android:backgroundDimEnabled">false</item>
</style>
```

---

## 3. Detecting "Don't Keep Activities"
Developers often forget to test process death. You can simulate it in Developer Options -> "Don't keep activities".
However, you can also detect if your activity is being recreated from a saved state programmatically.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    
    if (savedInstanceState != null) {
        // We are being restored!
        // Check if we have the data we need, otherwise maybe restart the flow?
    } else {
        // Fresh start
    }
}
```

[< Back to Theory](theory.md) | [Next: Interview Questions >](interview-questions.md)