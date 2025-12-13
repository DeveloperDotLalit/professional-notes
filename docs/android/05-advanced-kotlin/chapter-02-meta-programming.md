---
layout: default
title: "Meta Programming"
parent: "Advanced Kotlin"
nav_order: 2
---

## 1. Runtime Reflection (`kotlin-reflect`)
Kotlin's reflection is powerful but heavy (+2MB to APK size if used).

- **`KClass<T>`**: The entry point. `MyClass::class`.
- **`KProperty`**: Metadata about a property (name, type, getter/setter).
- **`call()`**: dynamic invocation. `func.call(arg1, arg2)`. Slower than direct calls due to boxing and validation.

## 2. Annotation Processing (Codegen)
Instead of slow Runtime Reflection, we use Compile-Time Generation.

### 2.1 KAPT (Kotlin Annotation Processing Tool)

- Bridges Kotlin to Java's `javax.annotation.processing`.
- **Downside**: Must generate Java stubs (slow builds). "De-Kotlinizes" your code.

### 2.2 KSP (Kotlin Symbol Processing)

- Native Kotlin support.
- Understands Kotlin-specifics (nullability, `suspend` functions).
- **2x Faster** than KAPT.
- **How it works**:
    1.  Processor scans source code (AST).
    2.  Looks for `@MyAnnotation`.
    3.  Generates a new `.kt` file via `CodeGenerator` API.
    4.  Compiler compiles both original and new files.

## 3. Creating a Processor (Theory)
If you want to generate a `ToJson` adapter:

1.  Define `@JsonSerializable` annotation.
2.  Write a `SymbolProcessor`.
3.  In `process()`:
    - `resolver.getSymbolsWithAnnotation(...)`.
    - Iterate class properties.
    - Build a String containing the `toJson()` function code.
    - Write to file.

[Previous: Chapter 01 - Delegation](chapter-01-delegation-pattern.md) | [Next: Chapter 03 - DSLs](chapter-03-dsl-construction.md)