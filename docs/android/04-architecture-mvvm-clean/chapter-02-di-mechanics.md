---
layout: default
title: "Di Mechanics"
parent: "Architecture MVVM Clean"
nav_order: 2
---

## 1. The Graph (DAG)
DI is about constructing a Directed Acyclic Graph of objects.

- **Nodes**: Classes (`Retrofit`, `OkHttp`, `UserRepository`).
- **Edges**: Dependencies (`UserRepository` depends on `Retrofit`).

## 2. Hilt / Dagger Internals
When you allow `@Inject` and `@AndroidEntryPoint`:

1.  **Annotation Processor (KAPT/KSP)**: Reads annotations.
2.  **Factory Generation**: Generates `UserRepository_Factory` classes.
3.  **Component Generation**: Generates the giant container class `DaggerAppComponent`.
4.  **Bytecode Rewriting**: Hilt modifies your bytecode to inject fields in `super.onCreate()`.

## 3. Scopes & Lifecycle

- **@Singleton**: Lives as long as the Application. One instance per app.
- **@ActivityRetainedScoped**: Lives across configuration changes (ViewModel lifecycle). Critical for holding state during rotation.
- **@ActivityScoped**: Lives as long as the Activity. Re-created on rotation.
- **@FragmentScoped**: Lives with Fragment.

## 4. The Qualifier Problem
What if you need two Strings? `API_KEY` and `BASE_URL`?
Dagger matches by **Type**. It sees two `String`s and gets confused.
**Fix**:
```kotlin
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class BaseUrl

@Provides
@BaseUrl
fun provideUrl(): String = "..."
```

[Previous: Chapter 01 - Clean Arch](chapter-01-clean-architecture.md) | [Next: Chapter 03 - Repository Pattern](chapter-03-repository-pattern.md)