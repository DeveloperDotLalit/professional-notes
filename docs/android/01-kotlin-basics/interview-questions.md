---
layout: default
title: "Interview Questions"
parent: "Kotlin Basics"
nav_order: 999
---

## Section 1: Memory & Bytecode

### Q1: What is the difference between `const val` and `val` at the bytecode level?
**Candidate Answer:**
"That's a classic question. On the surface, they both look like read-only variables, but under the hood, they behave very differently.

`val` is actually a **property**. When you declare `val x = 10` inside a class, the compiler generates a private field and a public getter method. So, every time you access `x`, you are technically making a method call (`invokevirtual` in bytecode). The value is resolved at **Runtime**, meaning if the underlying field changes (like with a custom getter), the caller sees the new value.

`const val`, however, is a **compile-time constant**. It can only be a primitive or a String. When the compiler sees a `const val`, it takes the actual value—say, the number `5000`—and *inlines* it directly into the places where it's used. There is no method call; it's just the raw number burned into the bytecode instructions (`LDC` opcode).

The biggest 'gotcha' here is with libraries. If I have a library with `const val VERSION = 1` and my app uses it, the number `1` is copied into my app's DEX file. If I update the library to `VERSION = 2` but don't recompile my app, my app will *still* print `1`. That's why for things that might change in binary updates, we should prefer `val`."

### Q2: Explain the memory overhead of `Int` vs `Int?` in Kotlin.
**Candidate Answer:**
"This comes down to the difference between Primitives and Boxed Objects in the Java Virtual Machine.

A standard `Int` in Kotlin is smart. In most cases—local variables, parameters, or properties—it compiles down to a raw Java `int`, which takes up exactly **4 bytes** of stack or heap memory. It's extremely efficient.

However, `Int?` (nullable Int) is a different beast. Because primitives in the JVM cannot be null, Kotlin has to wrap this in a `java.lang.Integer` object (Boxing). This adds massive overhead.
First, you have the object header (12-16 bytes). Then the reference to the object (4 bytes). Then the actual value (4 bytes). So, a single `Int?` can consume **20-24 bytes** compared to just 4 bytes for an `Int`.

This becomes critical in Collections. A `List<Int>` in Kotlin is actually a `List<Integer>`, meaning every single number is a separate object on the heap. That's why for high-performance scenarios, I'd always recommend using `IntArray`, which compiles to a primitive `int[]` array, avoiding that boxing overhead entirely."

### Q3: How does `inline` actually work? Specifically regarding the stack?
**Candidate Answer:**
"To understand `inline`, we have to look at how functions normally run. Usually, when you call a function, the CPU creates a new **Stack Frame**. It pushes parameters, jumps to the function address, executes, and then pops the frame to return. This jumping around has a cost, primarily for the CPU's branch predictor and instruction cache.

When we mark a function as `inline`, we are telling the compiler: 'Don't jump. Copy the code.'
The compiler takes the entire body of the inline function and pastes it directly into the call site.
Crucially, this means **no new stack frame is created**. The variables are allocated in the caller's stack frame.

This is why `inline` enables features like **Non-Local Returns**. Since the code is pasted effectively inside the caller's loop or function, a `return` statement inside the lambda can treat the surrounding code as its own scope and return from the outer function. You can't do that with standard lambdas because they are just objects calling a generic `invoke()` method."

### Q4: Why can't we assign `null` to `lateinit`?
**Candidate Answer:**
"If we look at how `lateinit` is implemented, it's essentially a nullable field that pretends to be non-null.
Backstage, a `lateinit var name: String` compiles to a `private String name` (which is nullable in Java) and public getter/setters.
The compiler injects a check in the getter: `if (name == null) throw UninitializedPropertyAccessException()`.

Now, if we were allowed to assign `null` to it—like `name = null`—we would break the fundamental contract of `lateinit`, which is 'I promise to initialize this to a real value before I use it.'
If we assigned `null`, the getter would see `null`, assume it hasn't been initialized yet, and throw the exception. So, there would be no way to distinguish between 'not initialized yet' and 'initialized to null'. That's why the compiler forbids it."

## Section 2: Generics & Variance

### Q11: Explain Type Erasure and how `reified` solves it.
**Candidate Answer:**
"Type Erasure is a legacy of Java's history. It means that generic type information is only strictly checked at **compile time**. Once you run the app, the JVM basically forgets the types. `List<String>` and `List<Int>` both just become a raw `List` of Objects.
This is why you can't write code like `if (item is T)`. At runtime, the JVM has no idea what `T` is supposed to be—it's been erased.

`reified` is a really clever workaround that leverages Kotlin's `inline` functions.
Because an `inline` function's code is copied to the call site, the compiler knows the *exact* type being used at that specific place.
If I call `myFunction<String>()`, the compiler pastes the code and effectively replaces `T` with `String` in that pasted snippet. So `if (item is T)` becomes `if (item is String)` in the bytecode.
This allows us to preserve type information at runtime, but it *only* works for inline functions."

### Q10: `out` vs `in` Variance. How do you remember which is which?
**Candidate Answer:**
"I use the mnemonic PECS from Java (Producer Extends, Consumer Super), but in Kotlin, it's even simpler:

**`out T`** is for **Producers**. Think of a read-only list. If I have a `List<Dog>`, I can safely treat it as a `List<Animal>` because every Dog *is* an Animal. When I read from it (get data *out*), I get Animals. So `out` allows subtyping: `List<Dog>` is a subtype of `List<Animal>`. The catch is, I can't write to it, because I don't know if the actual list is specifically Dogs or Cats.

**`in T`** is for **Consumers**. Think of a Garbage Can or a Listener. If I have a `Listener<Animal>`, it can handle any animal. I can safely use this listener as a `Listener<Dog>` because a Dog is an Animal. So `in` flips the relationship: `Listener<Animal>` is a subtype of `Listener<Dog>`. It consumes data *in*."

## Section 3: Functional Mechanics

### Q19: Closures in Kotlin. How are variables captured?
**Candidate Answer:**
"This is a fascinating performance detail.
If a lambda captures a **val** (immutable), Kotlin essentially just copies the value into the final lambda object as a field. It's cheap.

But if a lambda captures a **var** (mutable), it's trickier. The lambda might run 10 minutes later, and the local stack frame where that `var` lived is long gone.
So, Kotlin wraps the `var` in a transparent reference object called `Ref.ObjectRef` (or `IntRef`, etc.).
This `Ref` object is allocated on the **Heap**.
Both the original code and the lambda now point to this Heap object. Changing the variable updates the field inside the Ref.
This means capturing a mutable variable in a lambda forces a heap allocation, which can be a hidden source of pressure in tight loops."

[Back to Syllabus](../docs/syllabus-overview.md)