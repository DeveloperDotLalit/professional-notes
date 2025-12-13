---
layout: default
title: "Code Examples"
parent: "Kotlin Basics"
nav_order: 999
---

## 1. Zero-Allocation Collections (High Performance)
**Scenario**: You are processing 100,000 touch events in a drawing app. `List<Point>` is causing GC stutter.

```kotlin
// BAD: Autoboxing and Object Overhead
data class PointObj(val x: Float, val y: Float)
val points = ArrayList<PointObj>() // Millions of objects

// GOOD: SoA (Structure of Arrays) Pattern wrapped in Inline Class
@JvmInline
value class PointsBatch(private val data: FloatArray) {
    // Layout: [x0, y0, x1, y1, x2, y2, ...]
    
    val size: Int get() = data.size / 2

    fun getX(index: Int): Float = data[index * 2]
    fun getY(index: Int): Float = data[index * 2 + 1]

    companion object {
        fun create(capacity: Int) = PointsBatch(FloatArray(capacity * 2))
    }
}

// Usage - Zero Object Allocation for points
val batch = PointsBatch.create(1000)
// ... logic to fill floats ...
```

## 2. The "Result" Monad (Functional Error Handling)
**Scenario**: Exceptions are expensive (stack trace generation). Use `Result` or `Either` for control flow.

```kotlin
sealed interface DomainError
data class NetworkError(val code: Int) : DomainError
data object ParsingError : DomainError

// Use inline class to avoid wrapper overhead when possible (Kotlin 1.5+ Result is value class)
fun fetchUser(): Result<User> {
    return try {
        // ...
        Result.success(user)
    } catch (e: Exception) {
        Result.failure(e)
    }
}

// Monadic chaining involving different error types
inline fun <T, R> Result<T>.flatMap(transform: (T) -> Result<R>): Result<R> {
    return fold(
        onSuccess = { transform(it) },
        onFailure = { Result.failure(it) }
    )
}
```

## 3. Generic Constraints & Contracts
**Scenario**: Enforcing that a generic type must be an Enum and implement an Interface.

```kotlin
interface TrackingEvent {
    val name: String
}

// T must be an Enum AND implement TrackingEvent
fun <T> logEvent(event: T) where T : Enum<T>, T : TrackingEvent {
    Analytics.log("Event: ${event.name}, ordinal: ${event.ordinal}")
}

// Compiler Contract
@OptIn(ExperimentalContracts::class)
fun CharSequence?.isNotNullOrEmpty(): Boolean {
    contract {
        returns(true) implies (this@isNotNullOrEmpty != null)
    }
    return this != null && this.isNotEmpty()
}

fun usage(s: String?) {
    if (s.isNotNullOrEmpty()) {
        println(s.length) // Smart cast works due to contract!
    }
}
```

[< Back to Theory](theory.md) | [Next: Interview Questions >](interview-questions.md)