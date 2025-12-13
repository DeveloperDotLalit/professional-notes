# Chapter 04: SOLID in Modern Android

## 1. Putting it all together
Let's look at a standard **Clean Architecture** feature to spot the principles.

### The Code
```kotlin
// Abstract (DIP)
interface UserRepository {
    fun getUser(id: String): User
}

// Single Responsibility (SRP)
class UserRepositoryImpl(
   private val api: Api, // Composition
   private val dao: UserDao
) : UserRepository {
    
    override fun getUser(id: String): User {
       // Open/Closed: We can change this logic (add caching)
       // without breaking the ViewModel (Caller).
       return dao.get(id) ?: api.fetch(id)
    }
}

class UserViewModel(
    private val repo: UserRepository // DIP: Depends on Interface
) : ViewModel() {
    
    // ISP: Exposes State, doesn't expose underlying implementation
    fun load() { ... }
}
```

## 2. Real Life Professional Scenarios

### Scenario A: The Analytics Tracker
**Bad**: Adding `firebase.logEvent()` to every button click in `MainActivity`.
**Good (OCP)**: 
Create an `Analytics` interface.
Implement `FirebaseAnalytics`.
Inject it.
If you switch to Mixpanel later, you just create `MixpanelAnalytics` and swap the DI module. **Zero code changes in your 500 Activities.**

### Scenario B: The RecyclerView Adapter
**Bad**: An adapter that handles Logic, Sorting, and Filtering inside `onBindViewHolder`.
**Good (SRP)**:
The Adapter should only **Display** data.
The `DiffUtil` calculates changes.
The `ViewModel` handles Sorting/Filtering.
The Adapter has one reason to change: "The design of the row changed".

## 3. Communication Guide
When discussing code in PRs or Interviews:
- Don't say: "This code is messy."
- Do say: "This creates a tight coupling which violates DIP. Passing the Interface would make it testable."
- Don't say: "Split this file."
- Do say: "This class has low cohesion. It violates SRP. Let's extract the formatting logic to a helper."

[Previous: Chapter 03 - ISP & DIP](chapter-03-isp-dip.md) | [Back to Syllabus](../docs/syllabus-overview.md)
