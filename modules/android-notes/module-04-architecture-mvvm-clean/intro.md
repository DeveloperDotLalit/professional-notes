# Module 04: Architecture (MVVM & Clean)

## 📋 Overview
Spaghetti code is the death of large Android apps. This module teaches you how to structure your app so that you can swap out a database, change a UI framework (Xml to Compose), or add a new feature without breaking everything else. We focus on **Clean Architecture** combined with **MVVM**.

## 🎯 Learning Objectives
1.  Draw the dependency graph of Clean Architecture with your eyes closed.
2.  Understand why **Domain Layer** should have ZERO Android dependencies.
3.  Implement the **Repository Pattern** correctly (it's not just a DB wrapper).
4.  Master **Dependency Injection** principles (using Hilt).

## 📚 Topics Covered
- **MVVM**: Model-View-ViewModel.
- **Clean Architecture Layers**:
    - **UI Layer**: Activities, Fragments, ViewModels.
    - **Domain Layer**: UseCases (Interactors), Models.
    - **Data Layer**: Repositories, DataSources (Remote/Local).
- **Dependency Rule**: Dependencies point *inwards* (or downwards).
- **Mappers**: Converting `NetworkUser` -> `User` -> `UiUser`.

---

[< Back to Syllabus](../docs/syllabus-overview.md) | [Next: Theory Deep Dive >](theory.md)
