# Chapter 02: Memory Management & The Type System

## 1. The JVM Memory Model Layout
In Android (ART) and JVM, memory is split into:
1.  **Stack**: Stores primitive values (`int`, `bool`) and *references* to objects. Thread-local. clean-up is instant (pop frame).
2.  **Heap**: Stores actual Objects (`new String()`, `new User()`). Garbage Collected.

### 1.1 The Cost of an Object
Every object (e.g., `class Wrapper(val i: Int)`) has overhead:
- **Mark Word (header)**: 4-8 bytes (locks, GC bits, identity hash).
- **Class Pointer**: 4 bytes (compressed oops).
- **Alignment**: Padding to nearest 8 bytes.
- **Data**: 4 bytes (`i`).
**Total**: ~16-24 bytes for holding a single 4-byte integer.
**Implication**: High memory pressure triggers frequent GC -> Janky UI.

---

## 2. Primitives vs Wrappers
Kotlin hides the distinction, but it's critical.

### 2.1 The "Boxed" Types
- `Int` (Non-nullable) -> `int` (Primitive, 4 bytes, Stack/Inline).
- `Int?` (Nullable) -> `Integer` (Object, 16+ bytes, Heap).

**Scenario: Array of Integers**
```kotlin
val a = IntArray(1000)      // int[1000]
val b = Array<Int>(1000)    // Integer[1000]
val c = Array<Int?>(1000)   // Integer[1000] (references)
```
- **`IntArray`**: Allocates **4KB**. One contiguous block. CPU loves this (SIMD optimized).
- **`Array<Int>`**: Allocates a reference array (~4KB) **PLUS** 1000 Integer objects (~20KB). Total ~24KB. Spreads over heap. Cache misses.
**Rule**: Always use `IntArray`, `LongArray`, `BooleanArray`.

### 2.2 Generic Boxing
Generics in Java/Kotlin only support Reference types (until Project Valhalla arrives).
```kotlin
fun <T> process(value: T) {}

process(5) // T becomes Integer. 5 is Auto-boxed.
```
**Fix**: `inline` functions with `reified` types or primitive specialization.

---

## 3. Inline Classes (Value Classes)
Introduced to solve the wrapper overhead while keeping type safety.

```kotlin
@JvmInline
value class UserId(val id: Int)
```

### 3.1 Compilation Strategy
**Function Signature Mangling**:
```kotlin
fun login(uid: UserId)
```
Becomes:
```java
public void login_d1x(int uid)
```
The compiled code uses raw `int`.

### 3.2 When Boxing Happens (The Trap)
Inline classes *can* be boxed if treated as another type (`Any`, `Interface`, or Generic).
```kotlin
val uid = UserId(123)
val list = listOf(uid) // Boxing happens here!
```
`listOf` expects variables of type `Object` (Ref). `UserId` sees it needs to fit into an Object, so Kotlin creates a wrapper `UserId` object on the heap. **Zero-cost advantage is lost.**

---

## 4. The Hierarchy
### 4.1 Unit vs Void
- Java `void`: Nothing. Not a type. Can't return it.
- Kotlin `Unit`: A Singleton Object (`Unit.INSTANCE`). Real type. Use it as a generic: `Function<Unit>`.
- **Interop**: Kotlin functions returning `Unit` are compiled to `void` methods in Java.

### 4.2 Nothing (The Black hole)
`Nothing` is a bottom type. It is a subtype of *every* type.
```kotlin
fun fail(msg: String): Nothing {
    throw RuntimeException(msg)
}
```
Why useful?
```kotlin
val name = nameJson ?: fail("Name missing")
```
The compiler knows `fail` never returns. So `name` is inferred as `String` (not `String?`), because the `else` branch of the elvis operator doesn't produce a value.

### 4.3 Platform Types (`String!`)
When calling Java code:
```java
// Java
public String getName() { return ...; }
```
Kotlin sees `String!`. It means "I don't know if it's null".
- Types: `String` or `String?`.
- **Danger**: If you assign it to `val s: String` and it returns null -> **Crash** at assignment.
- **Best Practice**: Always assume nullable unless `@NonNull` annotation exists.

---

## 5. String Internals
In Java/Kotlin, Strings are immutable arrays of characters (or bytes in newer JDKs).
### 5.1 Substring Leak (Java 6 era vs Modern)
Historically, `substring()` shared the same char array as the original big string to save memory.
**Leak**: Keeping a 5-char substring kept the 100MB original in memory.
**Modern**: `substring()` copies the bytes. No leak.

### 5.2 String Templates
```kotlin
println("User $name is $age")
```
Compiles to `StringBuilder`.
```java
new StringBuilder().append("User ").append(name).append(" is ").append(age).toString()
```
**Performance**: In tight loops, manual `StringBuilder` reused instance is faster than creating new ones via templates.

[Previous: Chapter 01 - Compiler Internals](chapter-01-compiler-internals.md) | [Next: Chapter 03 - Functional Mechanics](chapter-03-functional-mechanics.md)
