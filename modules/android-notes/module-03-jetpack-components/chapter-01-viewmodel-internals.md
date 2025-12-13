# Chapter 01: ViewModel Internals & State Retention

## 1. The Problem: The Transient Activity
Activities are fragile. They die when you rotate the screen.
`Activity.recreate()` destroys the object and makes a new one.
How does the `ViewModel` survive this? It's not magic; it's the `NonConfigurationInstance` mechanism.

## 2. The Machinery
### 2.1 ViewModelStore
This acts as a `HashMap<String, ViewModel>`.
It is responsible for holding the instances.
It has a `clear()` method which calls `onCleared()` on every ViewModel.

### 2.2 The Hand-off
When an Activity is about to be destroyed due to configuration change:
1.  `onRetainNonConfigurationInstance()` is called on the Activity.
2.  The Activity creates a `NonConfigurationInstances` object (a holder).
3.  It puts the `ViewModelStore` inside this holder.
4.  The System Server holds onto this Object (temporarily) while the Activity is destroyed.
5.  The New Activity creates. `attach()`.
6.  The System passes the `NonConfigurationInstances` object back to the new Activity.
7.  The new Activity retrieves the *existing* `ViewModelStore`.

## 3. The Factory Pattern
Why `ViewModelProvider(this, factory).get(...)`?
Because the **System** creates the ViewModel (via reflection usually), not you.
If your ViewModel needs dependencies (`UserRepository`), the System doesn't know how to pass them.
**Factory**: You teach the system how to create an instance.
```kotlin
class MyFactory(val repo: Repo) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return MyViewModel(repo) as T
    }
}
```

## 4. Derived ViewModels (`activityViewModels`)
Fragments sharing data.
`by activityViewModels()` simply looks up the `ViewModelStore` of the **Host Activity** instead of the Fragment itself.
Since both fragments share the same Host Activity, they get the same `ViewModelStore` instance, and thus the same ViewModel instance.

[Next: Chapter 02 - LiveData Mechanics](chapter-02-livedata-internals.md)
