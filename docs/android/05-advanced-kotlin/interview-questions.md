---
layout: default
title: "Interview Questions"
parent: "Advanced Kotlin"
nav_order: 999
---

## Section 1: Meta-Programming & KSP

### Q2: How does `KAPT` work and why is it slower than `KSP`?
**Candidate Answer:**
"KAPT (Kotlin Annotation Processing Tool) acts as a bridge to allow Kotlin code to work with old Java annotation processors (like Dagger 2 or Room).
The problem is that Java processors don't understand Kotlin syntax.
So, KAPT has to run a 'Stub Generation' phase. It parses your Kotlin files and generates temporary Java 'Stub' files that mirror the structure.
Then, the Java compiler (javac) runs on these stubs to trigger the processors.
This adds a huge overhead to the build time—sometimes boosting it by 40-50%.

KSP (Kotlin Symbol Processing) is the modern replacement. It hooks directly into the Kotlin Compiler. It doesn't generate Java stubs. It understands Kotlin AST (Abstract Syntax Tree) natively—so it knows about `suspend` functions, nullability, and properties.
In practice, migrating Room/Hilt to KSP usually speeds up clean builds by 2x."

### Q6: `by` keyword internals for Class Delegation.
**Candidate Answer:**
"Class Delegation is the 'favor composition over inheritance' principle baked into the language.
When I say `class MyList(inner: List<String>) : List<String> by inner`, the compiler does the heavy lifting.
It generates *all* the methods of the `List` interface (size, get, isEmpty...) in my class.
Inside each generated method, it simply forwards the call to the `inner` object.
It implements the Decorator pattern with zero boilerplate. It's strictly a compile-time generation feature; there is no runtime reflection magic involved, so performance is identical to writing the forwarding calls manually."

## Section 3: DSLs & Receivers

### Q11: Lambda with Receiver (`A.() -> Unit`).
**Candidate Answer:**
"This is the cornerstone of Kotlin DSLs (Domain Specific Languages).
A normal lambda `(A) -> Unit` takes an argument. You access it via `it`.
A Lambda with Receiver `A.() -> Unit` changes the scope *inside* the lambda.
It treats the lambda body as if it were an extension function of class `A`.
This means inside the brackets, `this` refers to the object `A`. You can call methods of `A` directly without qualifying them.
This allows us to write HTML builders like `html { body { div { ... } } }`, where `body` is actually a method call on the `HTML` object implied by the scope."

### Q15: Context Receivers (New Experimental).
**Candidate Answer:**
"This solves the problem of 'Implicit Dependencies'.
Sometimes a function needs a `Context` or a `Logger` to work, but passing them as parameters to every single function is messy.
Extension functions `Context.toast()` allow us to use one receiver. But what if we need *two*? Like a `Context` AND a `Scope`?
Context Receivers allow us to declare: `context(Context, CoroutineScope) fun doWork()`.
This tells the compiler: 'You can only call this function if both a Context and a Scope are available in the current scope'.
Inside the function, we have access to `this@Context` and `this@CoroutineScope`. It's basically dependency injection at the function signature level."

[Back to Syllabus](../docs/syllabus-overview.md)