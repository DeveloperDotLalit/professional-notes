# Chapter 03: Interface Segregation & Dependency Inversion

## 1. Interface Segregation Principle (ISP)
> "Clients should not be forced to depend on methods they do not use."

**The Problem (Fat Interface)**:
```kotlin
interface Worker {
    fun work()
    fun eat()
    fun sleep()
}
```
If I implement `Robot : Worker`:
- `work()`: OK.
- `eat()`: Robot doesn't eat. I throw `UnsupportedOperationException`.
- `sleep()`: Robot doesn't sleep.

**The Fix**:
Split it up!
- `interface Workable { fun work() }`
- `interface Feedable { fun eat() }`
Now `Robot` only implements `Workable`. `Human` implements both.
**Analogy**: Don't force a vegetarian to buy a "Meat + Veggie" combo meal. Let them buy just Veggies.

## 2. Dependency Inversion Principle (DIP)
> "High-level modules should not depend on low-level modules. Both should depend on Abstractions."

**Without DIP (Hard Dependency)**:
`ViewModel` creates `new RetrofitRepository()`.
- ViewModel is stuck with that specific Retrofit implementation.
- Cannot test ViewModel without real network.

**With DIP (Dependency Injection)**:
`ViewModel` asks for `Repository` (Interface) in constructor.
- `class ViewModel(repo: Repository)`
- We can pass `RealRepository` in Prod.
- We can pass `FakeRepository` in Test.
- The direction of dependency is inverted. The Implementation depends on the Interface defined by the High Level module.

[Previous: Chapter 02 - OCP & LSP](chapter-02-ocp-lsp.md) | [Next: Chapter 04 - SOLID in Android](chapter-04-solid-android.md)
