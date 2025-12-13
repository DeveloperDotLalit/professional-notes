---
layout: default
title: "Theory"
parent: "Architecture MVVM Clean"
nav_order: 999
---

## 1. The Layers (The Onion)
### Presentation (UI) Layer

- **Responsibility**: Rendering state to screen and capturing user events.
- **Components**: Activity, Fragment, Compose function, ViewModel.
- **Dependencies**: Depends on Domain (Use Cases).

### Domain Layer (The Core)

- **Responsibility**: Business Logic. PURE Kotlin. NO `android.*` imports.
- **Components**: Use Cases (e.g., `LoginUserUseCase`), Domain Models (data classes).
- **Dependencies**: None! It defines interfaces that the Data layer implements.

### Data Layer

- **Responsibility**: Fetching and storing data.
- **Components**: Repositories (Impl), Data Sources (Retrofit Service, Room DAO).
- **Dependencies**: Depends on Domain (to implement its interfaces).

## 2. The Dependency Rule
Dependencies must point **inwards** towards the Domain.

- BAD: Domain knows about Retrofit (Third party library).
- BAD: Domain knows about `Context` (Android framework).
- GOOD: Data Layer implements a `UserRepository` interface defined in Domain.

## 3. The Repository Pattern
Mediator between different data sources (Network, Cache, Database).

- **Single Source of Truth**: The Repository decides where data comes from.
- The UI *never* calls the API directly. It asks the Repository.

## 4. Use Cases (Interactors)
Why do we need them? Why not call Repository from ViewModel?

- **Reusability**: `FormatDateUseCase` can be used in multiple ViewModels.
- **Single Responsibility**: `LoginUseCase` does one thing.
- **Screaming Architecture**: Opening the `domain` package tells you what the app *does* (Login, Logout, Purchase), not how it's built.

[< Back to Intro](intro.md) | [Next: Code Examples >](code-examples.md)