# Chapter 03: Functional Mechanics & Lambdas

## 1. Lambda Implementation
Kotlin functions are first-class citizens. But the JVM doesn't have "Functions" (until `invokedynamic` was fully adopted). Kotlin targets Java 8 (mostly), but often compiles to anonymous inner classes for compatibility.

### 1.1 `FunctionN` Interfaces
A lambda `(String) -> Int` compiles to an implementation of:
```kotlin
interface Function1<in P1, out R> {
    fun invoke(p1: P1): R
}
```

**Scenario**:
```kotlin
val doubleIt = { x: Int -> x * 2 }
```
**Bytecode**:
```java
Function1 doubleIt = new Function1() {
    public Object invoke(Object x) {
        return ((Number)x).intValue() * 2;
    }
}
```
**Overhead**:
1.  **Boxing**: Input `Int` -> `Integer`. Output `Int` -> `Integer`.
2.  **Dispatch**: `invoke` virtual call.

### 1.2 SAM (Single Abstract Method) Conversions
Java functional interfaces (`Runnable`, `OnClickListener`) are SAMs.
Kotlin 1.4+ optimizes SAM conversions using `invokedynamic` (Indy) where possible, delegating to `LambdaMetafactory`. This is much faster than creating anonymous classes.

---

## 2. Receivers (`this` vs `it`)
Understanding `dotted` syntax in lambdas.

### 2.1 Function Literal with Receiver
Type: `String.() -> Unit`
Inside this lambda, `this` refers to the String.

**How it works**:
It's just a `Function2<String, ...>` where the first argument is passed as `this` conceptually.

```kotlin
fun build(action: StringBuilder.() -> Unit) {
    val sb = StringBuilder()
    // sb.action() compiles to:
    action.invoke(sb) 
}
```

### 2.2 Scope Functions Internals
Why do we have 5 of them? (`let`, `run`, `with`, `apply`, `also`)
They are just **inline extension functions**.

**Source of `apply`**:
```kotlin
inline fun <T> T.apply(block: T.() -> Unit): T {
    block() // Calls block with 'this'
    return this
}
```
**Source of `let`**:
```kotlin
inline fun <T, R> T.let(block: (T) -> R): R {
    return block(this) // Calls block with argument
}
```
**Rule of Thumb**:
- Access via `this` (`apply`, `run`, `with`): Use for object configuration. "Setting up the object".
- Access via `it` (`let`, `also`): Use when `this` is already taken (inside class) or for null-checks.

---

## 3. Closures and Capture
A **Closure** is a function that remembers its "lexical scope" even when executed outside that scope.

### 3.1 The "Ref" Object
If a lambda modifies a local variable, that variable must be "lifted" to the heap.
```kotlin
var counter = 0
val inc = { counter++ }
```
**Bytecode**:
1.  Compiler creates `Ref.IntRef` object.
2.  `counter` logic is replaced by `ref.element++`.
3.  The lambda holds a reference to `ref`.
4.  Local code holds a reference to `ref`.
**Risk**: If you capture a large object in a long-lived lambda (like a callback), you leak the memory.

---

## 4. `inline`, `noinline`, `crossinline` (Deep Dive)
- **`inline`**: Copy-paste body.
- **`noinline`**: Use when you need the lambda object (e.g., to put in a map).
- **`crossinline`**: Solving the "Non-local Return" problem.

### The Return Problem
```kotlin
inline fun traverse(action: () -> Unit) {
    action()
}

fun main() {
    traverse {
        return // Returns from MAIN!
    }
}
```
This is allowed (Non-local return). The `return` jumps out of the calling function (`main`).

### The Crossinline Constraint
If `traverse` executes `action` inside another context (like a thread):
```kotlin
inline fun executeAsync(crossinline action: () -> Unit) {
    thread { 
        action() 
    }
}
```
We cannot `return` from `main` inside a new thread! It makes no sense. The stack is gone.
So `crossinline` tells the compiler: "Inline this, but FORBID `return` statements in the lambda block".

[Previous: Chapter 02 - Memory](chapter-02-memory-management.md) | [Next: Chapter 04 - Generics](chapter-04-generics-variance.md)
