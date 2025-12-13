# Chapter 04: Functional Programming Patterns

## 1. Monads (Result / Either)
Handling errors without Exceptions.
- **The Concept**: A "Box" that may contain a value or a failure.
- **Rules**:
    - **Map**: Transform value inside safely.
    - **FlatMap**: Chain operations that also return Boxes.

```kotlin
// Arrow-kt style (Simplified)
sealed class Either<out L, out R>
data class Left<L>(val value: L) : Either<L, Nothing>()
data class Right<R>(val value: R) : Either<Nothing, R>()

fun divide(a: Int, b: Int): Either<String, Int> {
    return if (b == 0) Left("Div by zero") else Right(a / b)
}
```

## 2. Currying & Partial Application
- **Currying**: Converting `fun(a, b)` into `fun(a)(b)`.
- **Partial Application**: Fixing one argument of a function to produce a new function with fewer arguments.

```kotlin
fun add(x: Int, y: Int) = x + y
val add5 = { y: Int -> add(5, y) } // Partially applied
```

## 3. Memoization
Caching the result of a pure function based on inputs.
```kotlin
fun <A, R> ((A) -> R).memoize(): (A) -> R {
    val cache = ConcurrentHashMap<A, R>()
    return { a ->
        cache.getOrPut(a) { this(a) }
    }
}
```
Useful for expensive computations in recursive algorithms (Dynamic Programming).

## 4. Algebraic Data Types (ADT)
Using `sealed class` to represent state.
The compiler enforces exhaustiveness (`when` must cover all cases).
This effectively turns your business logic into a mathematical proof. If it compiles, you handled all states.

[Previous: Chapter 03 - DSLs](chapter-03-dsl-construction.md) | [Back to Syllabus](../docs/syllabus-overview.md)
