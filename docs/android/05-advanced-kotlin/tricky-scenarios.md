---
layout: default
title: "Tricky Scenarios"
parent: "Advanced Kotlin"
nav_order: 999
---

## Scenario 1: The `in T` Overload
### The Setup
```kotlin
interface Consumer<in T> {
    fun consume(item: T)
}
class StringConsumer : Consumer<String> {
    override fun consume(item: String) = println(item)
}
```
You try to assign `Consumer<String>` to `Consumer<Any>`.
`val c: Consumer<Any> = StringConsumer()`

### The Result
**Compilation Error**.
Wait, `in` is contravariant! `Consumer<Any>` can handle Strings, sure. But `Consumer<String>` CANNOT handle `Any`.
It works the other way around:
`val c: Consumer<String> = Consumer<Any> { ... }`
**Logic**: A machine that eats *Anything* can definitely replace a machine that eats only *Strings*. A machine that eats only Strings *cannot* replace a machine expected to eat Anything (what if I feed it an Int?).

---

## Scenario 2: Inline Function Stack Traces
### The Setup
You have a complex chain of `inline` functions. One throws an exception.

### The Problem
The Stack Trace shows the line number of the *call site*, not the library function.
This is because the code was copied.
**Debugging Tip**: It can be confusing to debug inline functions. Sometimes removing `inline` temporarily helps locate the exact crash line inside the utility function.

---

## Scenario 3: Initializing Properties in Traits
### The Setup
You use an interface with a property implementation.
```kotlin
interface Named {
    val name: String
        get() = "Default"
}
```
This works fine. But be careful: This getter is computed *every time*. It's not a field.
If you do:
```kotlin
interface RandomUser {
    val id: Int
        get() = Random.nextInt()
}
```
Accessing `user.id` twice gives different IDs!
**Fix**: Overwrite it in the class as a val, or understand it's a function disguised as a property.

[< Back to Interview Questions](interview-questions.md) | [**Next Module: UI (Compose)** >](../module-06-ui-compose/intro.md)