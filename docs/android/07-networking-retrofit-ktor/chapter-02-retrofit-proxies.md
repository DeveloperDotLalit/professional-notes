---
layout: default
title: "Retrofit Proxies"
parent: "Networking Retrofit Ktor"
nav_order: 2
---

## 1. The Dynamic Proxy Pattern
Retrofit uses `java.lang.reflect.Proxy`.
```kotlin
val api = retrofit.create(Api::class.java)
```
When you call `api.getUser()`, you are calling a method on a Proxy object generated at runtime.
The Proxy intercepts the call, reads the `@GET` annotations, and constructs an OkHttp `Request`.

## 2. Call Adapters
Retrofit by default returns `Call<T>`.
How do we get `suspend fun` or `Observable<T>`?
**CallAdapter.Factory**.

- **RxJavaCallAdapterFactory**: Wraps `Call` in `Observable`.
- **CoroutineCallAdapterFactory** (Built-in): Handles `suspend`.
    - It creates a `Request`. Enqueues it.
    - Uses `suspendCancellableCoroutine` to bridge the callback to suspension.
    - Handles cancellation (cancels the underlying HTTP call).

## 3. Converter Factories
Decouples serialization.

- `response.body()` gives a `ResponseBody` (Stream of bytes).
- `GsonConverterFactory` takes that stream -> `JsonReader` -> POJO.
- **Performance**:
    - **BufferedSource**: Retrofit tries to stream data. If using GSON, it might buffer the whole string in memory first (bad for huge JSON).
    - **Moshi**: Designed to stream directly from Okio sources.

[Previous: Chapter 01 - OkHttp](chapter-01-okhttp-internals.md) | [Next: Chapter 03 - API Architecture](chapter-03-api-architecture.md)