---
layout: default
title: "Android Architectural"
parent: "Design Patterns"
nav_order: 4
---

## 1. Model-View-ViewModel (MVVM)
**Goal**: Seperation of UI and Logic.

- **Model**: Data + Business Logic (User, Repository).
- **View**: Renders UI (Activity/Fragment/Composable). Observes ViewModel.
- **ViewModel**: Holds View-State. Does NOT hold reference to View.
**Key**: The binding is *One-Way* (View -> ViewModel calls) and *Reactive* (ViewModel -> View emits).

## 2. The Repository Pattern
**Goal**: Abstraction of Data Sources.
The UI should not know if data comes from Cloud (Retrofit) or Disk (Room).
The **Repository** mediates between domains and data mapping.
It acts as an in-memory collection of domain objects.

## 3. Dependency Injection (DI)
**Goal**: Inversion of Control.
Instead of creating dependencies (`val api = ApiImpl()`), they are provided.
**Service Locator vs DI**:

- **Locator**: `ServiceLocator.get(Api::class)`. The class asks for dependencies. (Pull).
- **Injection**: `@Inject constructor(val api: Api)`. The framework gives dependencies. (Push).
Hilt/Dagger is the standard Android DI Framework.

[Previous: Chapter 03 - Behavioral](chapter-03-behavioral.md) | [Back to Syllabus](../docs/syllabus-overview.md)