---
layout: default
title: "Tricky Scenarios"
parent: "Kotlin Basics"
nav_order: 999
---

## Scenario 1: The `Unit` Return Trap in Lambdas
### The Code
```kotlin
fun runProcessor(processor: (String) -> Any) {
    processor("data")
}

fun main() {
    runProcessor { 
        if (it.isEmpty()) return@runProcessor
        println(it) // Implicitly returns Unit
    }
}
```
### The Bytecode Horror
The lambda `{ ... }` returns `Unit`. `Unit` is a singleton object `Unit.INSTANCE`.
However, the signature expects `(String) -> Any`.
The compiler must **box** the Unit return.
Wait, `Unit` is an object, so it's already an Object.
**Trap**: If you interface with Java code that returns `void` vs `Void` vs `Object`.
**Performance**: In tight loops, a lambda implicitly returning `Unit` which is treated as `Any` might cause obscure boxing checks or casting in generic code.

---

## Scenario 2: `Hashcode` collision in Data Classes
### The Code
```kotlin
data class User(val id: Int)
val map = HashMap<User, String>()
```
User IDs 1 to 100,000.
### The Reality
`data class` generates `hashCode()` based on fields. `Int.hashCode()` is the int itself.
This is logically fine.
**Trap**: Arrays in data classes.
```kotlin
data class Vector(val coordinates: IntArray)
```
`coordinates.hashCode()` is the **Identity HashCode** of the array object, NOT the content!
Two vectors with `[1, 2]` will have different hashcodes.
They will be stored as duplicate keys in a HashMap.
**Fix**: `override fun equals` and `hashCode` using `contentEquals` and `contentHashCode`.

---

## Scenario 3: Closure Capture of `var` in Loops
### The Code
```kotlin
fun main() {
    val list = mutableListOf<() -> Unit>()
    var i = 0
    while (i < 5) {
        val v = i // Capture local val
        list.add { print(v) }
        i++
    }
    list.forEach { it() }
}
```
### The Analysis
If we captured `i` directly:
It would print `5 5 5 5 5`. Because `i` is a `Ref.IntRef` object on the heap, shared by all lambdas.
By assigning `val v = i`, we capture the *value* of `i` at that moment.
**Trap**: In classic `for (i in 0..4)`, the loop variable is effectively a distinct `val` per iteration in Kotlin?
**No**, `for` loop variable triggers a complex scoping rule explicitly designed to make this safe (unlike JavaScript `var`).
However, inside a `while` loop manually incrementing `var`, capturing the var is dangerous.

---

## Scenario 4: The `out T` List assignment
### The Code
```kotlin
val mutableList: MutableList<String> = ArrayList()
val list: List<Any> = mutableList // Error? No.
val casted: MutableList<Any> = mutableList as MutableList<Any> // Warning: Unchecked Cast
```
### The Crash
`casted.add(123)` -> Adds Int to the String list.
`mutableList[0]` -> Tries to read the Int as String. **ClassCastException**.
**Lesson**: Generic Erasure + Unchecked Casts = Time Bomb.

[< Back to Interview Questions](interview-questions.md) | [**Next Module: Android Fundamentals** >](../module-02-android-fundamentals/intro.md)