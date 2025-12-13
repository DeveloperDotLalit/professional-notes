---
layout: default
title: "Generics Variance"
parent: "Kotlin Basics"
nav_order: 4
---

## 1. Type Erasure
The JVM was designed without Generics (added in Java 5). To maintain backward compatibility, Generics are a **compile-time fiction**.
At runtime, `List<String>` and `List<Int>` are both just `List`.

### 1.1 Implications
```kotlin
val list = listOf("A")
if (list is List<Int>) { ... } // Error: Cannot check for instance of erased type
```
You can only check `list is List<*>`.

### 1.2 Binary Compatibility
Code compiled against `process(List<String>)` can technically be called with `List<Int>` if you bypass the compiler (reflection or raw bytecode). This results in `ClassCastException` at the point of *access*, not call.

---

## 2. Reified Type Parameters
Kotlin's superpower to bypass erasure.
Only works with `inline` functions.

```kotlin
inline fun <reified T> isType(value: Any): Boolean {
    return value is T
}
```
**Mechanism**:
Since the code is pasted at the call site:
`isType<String>("Hello")` becomes `return "Hello" instanceof String`.
The JVM instruction `INSTANCEOF` takes a class constant. The compiler supplies it.

**Pattern: TypeToken**:
Parsing JSON often needs the type.
```kotlin
inline fun <reified T> parse(json: String): T {
    val type = object : TypeToken<T>() {}.type
    return gson.fromJson(json, type)
}
```
Here `T` is burned into the anonymous class structure for `TypeToken` to read.

---

## 3. Variance (The Hard Stuff)
Variance defines inheritance relationships for generic types.
If `Dog` extends `Animal`:

- Is `List<Dog>` a subtype of `List<Animal>`? (Covariance)
- Is `List<Animal>` a subtype of `List<Dog>`? (Contravariance)

### 3.1 Invariance (Default)
`MutableList<Dog>` is **NOT** a `MutableList<Animal>`.
**Reason**:
```kotlin
val dogs: MutableList<Dog> = mutableListOf(Dog())
val animals: MutableList<Animal> = dogs // Compile Error!
animals.add(Cat()) // CRASH! The dog list now has a cat.
```

### 3.2 Covariance (`out`) - Producer
`List<out T>` (Immutable List).
Safe because you can only **READ** (produce) `T`. You cannot Write.
```kotlin
val dogs: List<Dog> = listOf(Dog())
val animals: List<Animal> = dogs // OK!
val a: Animal = animals.get(0)   // Returns Dog, which is an Animal. Safe.
```

### 3.3 Contravariance (`in`) - Consumer
`Comparable<in T>`.
Safe because you only **WRITE** (consume) `T`.
```kotlin
val animComp: Comparable<Animal> = ...
val dogComp: Comparable<Dog> = animComp // OK!
```
If I have a comparator that can compare ANY animal, I can definitely use it to compare Dogs.

### 3.4 Declaration-site vs Use-site

- **Declaration-site**: `class List<out T>` (Kotlin way). The class *itself* says "I am a producer".
- **Use-site**: `fun copy(from: MutableList<out T>)` (Java wildcard style). Used when the class is invariant (like MutableList) but this specific function only reads.

---

## 4. Star Projection (`*`)
`Function<*>` means "Function of some unknown type".

- For `out T`: Read as `T` (specifically `Any?`).
- For `in T`: Write `Nothing`. (You can't write anything).

**Use Case**:
Checks where type doesn't matter.
```kotlin
if (list is ArrayList<*>) {
    println(list.size) // Size doesn't depend on T
}
```

[Previous: Chapter 03 - Functional Mechanics](chapter-03-functional-mechanics.md) | [Back to Syllabus](../docs/syllabus-overview.md)