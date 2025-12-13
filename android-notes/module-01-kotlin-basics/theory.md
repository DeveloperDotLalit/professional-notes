# 🎓 Theory: Kotlin Internals & Compiler Mechanics (PhD Level)

## 1. The Cost of Abstraction
Kotlin provides syntactic sugar that often compiles to verbose Java bytecode. Understanding this is crucial for writing "zero-cost" abstractions.

### 1.1 `val` vs `const val` (Bytecode Level)
- **`val x = 5` (Class Level)**:
    - Compiles to a `private final int x` field.
    - Generates a `public final int getX()` method.
    - **Cost**: Method call overhead on every access.
- **`const val x = 5`**:
    - The compiler *inlines* the value `5` at every call site.
    - **Cost**: Zero runtime cost. equivalent to Java `public static final`.

### 1.2 The `inline` Function Mechanism
When you annotate a function with `inline`, the compiler performs **call-site substitution**.

**Source:**
```kotlin
inline fun execute(block: () -> Unit) {
    println("Start")
    block()
    println("End")
}

fun main() {
    execute { println("Hello") }
}
```

**Compiled Bytecode Equivalent (Java Decompiled):**
```java
public static final void main() {
    String var0 = "Start";
    System.out.println(var0);
    String var1 = "Hello"; // The lambda body is pasted here. No object allocation.
    System.out.println(var1);
    String var2 = "End";
    System.out.println(var2);
}
```
**Implication**: 
1.  **No Function Call Overhead**: `INVOKESTATIC` is removed.
2.  **No Lambda Allocation**: The `Function0` object is not created.
3.  **Code Bloat**: If the inline function is large and called from 100 places, the bytecode size explodes.

## 2. Memory Alignment & Primitives
### 2.1 Arrays vs Lists
- `IntArray` compilse to `int[]` (JVM Primitive Array).
    - **Memory**: 4 bytes per element + Header. Contiguous memory block. High CPU cache coherence.
- `List<Int>` compiles to `ArrayList<Integer>`.
    - **Memory**: `Integer` is an object (16 bytes header + 4 bytes value + padding). The List holds *references* (4-8 bytes).
    - **Indirection**: Accessing an element requires following a pointer (Ref -> Integer Object -> Value).
    - **Performance**: High cache misses. ~5x memory overhead compared to `IntArray`.
**PhD Rule**: For high-performance graphics/math, ALWAYS use `IntArray`, `FloatArray`, etc., over `List<Int>`.

### 2.2 Inline Classes (Value Classes)
`@JvmInline value class Password(val s: String)`
- **Goal**: Type safety without heap allocation.
- **Runtime**: At runtime, `Password` instances are replaced by the underlying `String`.
- **Mangling**: To prevent method signature clashes, Kotlin "mangles" the names of functions taking value classes.
    - `fun login(p: Password)` -> `login-hashedString(String p)`

## 3. The `object` Singleton (Under the Loop)
```kotlin
object Database {
    fun query() {}
}
```
**Decompiled Java:**
```java
public final class Database {
    public static final Database INSTANCE; // Static field

    private Database() {} // Private constructor

    static {
        INSTANCE = new Database(); // Eager initialization in static block
    }
}
```
**Thread Safety**: JVM handles static blocks (`<clinit>`) with a lock. Accessing `Database.INSTANCE` is thread-safe effectively, but standard `object` initialization is **blocking**. If the `init` block takes 5 seconds, it blocks the ClassLoader, potentially executing on the Main Thread if accessed there first.

## 4. Capturing in Lambdas (The Hidden Allocation)
- **Non-Capturing Lambda**:
    ```kotlin
    fun test() {
        list.forEach { println(it) } // 'it' is argument, nothing from outside captured.
    }
    ```
    Kotlin generates a `INSTANCE` singleton for this lambda. **Zero allocation** per call.

- **Capturing Lambda**:
    ```kotlin
    fun test(prefix: String) {
        list.forEach { println(prefix + it) } // Captures 'prefix'
    }
    ```
    Kotlin generates a `new Function1(prefix)` object **every time** the loop runs (if not inlined) or per function call.
    **Optimization**: Move captured variables into function parameters if possible, or use `inline` functions (like `forEach` is standard lib) which eliminate the object creation anyway.

[< Back to Intro](intro.md) | [Next: Code Examples >](code-examples.md)
