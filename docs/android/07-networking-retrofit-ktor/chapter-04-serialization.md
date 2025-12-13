---
layout: default
title: "Serialization"
parent: "Networking Retrofit Ktor"
nav_order: 4
---

## 1. GSON (The Legacy)

- **Mechanism**: Reflection.
- **Pros**: Lenient. Works without annotations.
- **Cons**:
    - **Slow**: Reflection is slow on Android.
    - **Unsafe**: Can write `null` into non-nullable Kotlin properties because it uses `Unsafe.allocateInstance` which bypasses constructors. 
    - `val name: String = null` !! It happens with Gson.

## 2. Moshi (Square's Modern JSON)

- **Mechanism**: Code Generation (Annotation Processor) or Reflection (Optional).
- **Pros**:
    - Built for Kotlin. Understands null safety.
    - Streaming support.
    - Adapters are composable.

## 3. Kotlinx Serialization (The Native)

- **Mechanism**: Compiler Plugin.
- **Pros**:
    - Zero reflection.
    - Multiplatform (KMP).
    - Very fast.
- **Cons**: Strict. You must annotate every class `@Serializable`.

## 4. Protobuf (The Speed Demon)

- **Mechanism**: Binary format.
- **Pros**: 5x-10x smaller payload than JSON. Parsing is instant.
- **Use Case**: Real-time apps, heavy data sync.

[Previous: Chapter 03 - Architecture](chapter-03-api-architecture.md) | [Back to Syllabus](../docs/syllabus-overview.md)