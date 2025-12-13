# Chapter 01: Unit Testing & Mocks

## 1. The Strategy: Fakes vs Mocks
The industry is shifting.
- **Mock (MockK/Mockito)**: Behavior verification. `verify { repo.get() wasCalled }`.
    - *Pros*: Easy to throw exceptions. Good for boundary testing.
    - *Cons*: Coupled to implementation details. Refactoring breaks tests.
- **Fake (Test Doubles)**: State verification. `class FakeRepo : Repo { val items = mutableListOf() }`.
    - *Pros*: Robust. Works like the real thing. Refactoring safe.
    - *Cons*: Implementation overhead.

## 2. MockK Internals
How does `mockk<User>()` work on a final class?
- **Bytecode Instrumentation**: MockK uses an agent (inline) to rewrite the bytecode of the class at runtime to open it up.
- **ThreadLocal**: It tracks the "current call" to record expectations in `every { ... }`.
- **Spy**: `spyk(obj)` wraps the real object. It calls the real methods unless stubbed.

## 3. Dependency Injection in Tests
Don't use Dagger/Hilt for Unit Tests. It's too slow.
Use **Constructor Injection**.
```kotlin
class ViewModel(val repo: Repo, val dispatcher: CoroutineDispatcher)
```
Test:
```kotlin
val viewModel = ViewModel(FakeRepo(), UnconfinedTestDispatcher())
```
No magic frameworks needed. Just pure Kotlin.

[Next: Chapter 02 - Coroutine Testing](chapter-02-coroutine-testing.md)
