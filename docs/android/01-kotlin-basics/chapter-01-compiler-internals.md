---
layout: default
title: "Compiler Internals"
parent: "Kotlin Basics"
nav_order: 1
---

## 1. Introduction
To understand performance, we must understand what our code becomes. Kotlin is a **statically typed** language that compiles down to **Java Bytecode** (when targeting JVM/Android). This means the "magic" of Kotlin—Extension Functions, Null Safety, Coroutines—must all be mapped to standard JVM instructions (`INVOKEVIRTUAL`, `CHECKCAST`, `IFNULL`).

This chapter dissects how basic Kotlin constructs map to the machine.

---

## 2. Variables and Constants
The choice between `val`, `const val`, and `var` is not just stylistic. It affects memory layout and access speed.

### 2.1 The `val` (Read-only Property)
In a class, `val` is **not** a simple field. It is a generated **private field** plus a **public getter**.

**Kotlin:**
```kotlin
class User {
    val id: Int = 100
}
```

**Bytecode (Decompiled):**
```java
public final class User {
   private final int id = 100;

   // Overhead: Method call for every access
   public final int getId() {
      return this.id;
   }
}
```

**Performance Implication**: simple field access inside the class (`id`) is fast. Access content from outside (`user.id`) invokes `INVOKEVIRTUAL`.
*Optimization*: R8/ProGuard usually inlines simple getters, but in raw bytecode, it's a method call.

### 2.2 The `const val` (Compile-Time Constant)
Must be top-level or in an `object` / `companion object`. Must be a Primitive or String.

**Kotlin:**
```kotlin
const val TIMEOUT = 5000
fun sleep() {
    Thread.sleep(TIMEOUT)
}
```

**Bytecode (Decompiled):**
```java
public static final int TIMEOUT = 5000;
public static final void sleep() {
    // The number 5000 is "baked" into the instruction.
    // There is NO reference to the TIMEOUT field here.
    Thread.sleep(5000L);
}
```

**Instruction Analysis**:

- `val`: `GETSTATIC com/example/Config.TIMEOUT : I` (Fetch from memory/cache).
- `const`: `LDC 5000` (Load Constant immediately). **Zero memory lookup.**

### 2.3 `JvmField`
If you want a public field without the getter overhead (like Java), use `@JvmField`.
**Kotlin**:
```kotlin
class User {
    @JvmField val id: Int = 100
}
```
**Bytecode**: `public final int id = 100;` (No getter generated).

---

## 3. Control Structures
### 3.1 `If-Else` as an Expression
Kotlin `if` returns a value.
```kotlin
val max = if (a > b) a else b
```
Compiles to conditional jumps, identical to Java's ternary operator:
```text
       ILOAD 1 (a)
       ILOAD 2 (b)
       IF_ICMPLE L1 // If a <= b, jump to L1
       ILOAD 1 (a)
       GOTO L2      // Jump to end
L1:
       ILOAD 2 (b)
L2:
       ISTORE 3 (max)
```
**Cost**: Zero. It's standard branching.

### 3.2 The `When` Expression
This is where it gets interesting. `when` compiles differently based on what you switch on.

#### Case A: Contiguous Integers (TableSwitch)
```kotlin
when (x) {
    1 -> print("A")
    2 -> print("B")
    3 -> print("C")
    else -> print("D")
}
```
**Bytecode**: `TABLESWITCH`.
The JVM computes an offset `O(1)` jump. It's an array lookup for the program counter. **Extremely Fast**.

#### Case B: Sparse Integers (LookupSwitch)
```kotlin
when (x) {
    1 -> ...
    1000 -> ...
}
```
**Bytecode**: `LOOKUPSWITCH`.
The JVM performs a **Binary Search** on the sorted keys. `O(log N)`. Still very fast.

#### Case C: Strings or Objects
```kotlin
when (name) {
    "Alice" -> ...
    "Bob" -> ...
}
```
**Bytecode**:

1.  Calculates `hashCode()` of `name`.
2.  Runs a `LOOKUPSWITCH` on the hashes to find a candidate block.
3.  Inside the block, performs an `equals()` check (to handle hash collisions).
**Performance Impact**: `when` on String is significantly slower than `when` on Int or Enum. Avoid in tight loops (e.g., `onDraw`).

---

## 4. Null Safety Internals
How does Kotlin prevent crashes? It adds **Intrinsic Checks** at the entry of methods.

**Kotlin:**
```kotlin
fun setText(text: String) { // Non-nullable
    print(text)
}
```

**Bytecode:**
```java
public static final void setText(@NotNull String text) {
    Intrinsics.checkNotNullParameter(text, "text"); // The Guard
    System.out.print(text);
}
```
If you call this from Java passing `null`, `Intrinsics.checkNotNullParameter` throws `NullPointerException` (or `IllegalArgumentException`) immediately.
**Cost**: Minimal, but non-zero.
*Note*: You can strip these in Release builds using R8 rules if you are extremely desperate for method size reduction, but it's unsafe.

---

## 5. Loops and Ranges
### 5.1 The `forEach` Trap
```kotlin
list.forEach { it.process() }
```
`forEach` is an `inline` extension function.
It compiles to:
```java
Iterator it = list.iterator();
while (it.hasNext()) {
    Object item = it.next();
    // body
}
```
**Cost**: Allocation of `Iterator` object (unless `list` is a primitive array wrapper).

### 5.2 The Range Optimization (`0..10`)
```kotlin
for (i in 0..10) { ... }
```
The compiler detects this specific pattern. It avoids creating an `IntRange` object.
It compiles to:
```java
int i = 0;
while (i <= 10) {
   // ...
   i++;
}
```
**Trap**: `for (i in getRange())` where `getRange()` returns an `IntRange` object. The optimization fails. It will use the Iterator of the Range object.

---

## 6. Summary checklist for performance

- [ ] Use `const val` for primitives.
- [ ] Use `@JvmField` for large data classes needing direct access.
- [ ] Prefer `when` on Int/Enum over String.
- [ ] Use simple `for (i in 0..n)` loops for critical paths instead of `forEach`.

[Next: Chapter 02 - Memory Management](chapter-02-memory-management.md)