---
layout: default
title: "Theory"
parent: "Solid Principles"
nav_order: 999
---

## 1. S - Single Responsibility Principle (SRP)
**Goal**: Cohesion.
**Definition**: A class should have one reason to change.
**Litmus Test**: "Who asks for changes in this class?"
If the answer is "The DBA" AND "The UI Designer", you broke SRP.
**Fix**: Break it into `Repository` (DBA) and `ViewModel` (UI).

## 2. O - Open/Closed Principle (OCP)
**Goal**: Extensibility.
**Definition**: Open for extension, Closed for modification.
**Strategy**: Polymorphism.
Instead of `if (type == A) ... else if (type == B)`, use `interface Strategy { fun execute() }`.
You can add `Class C : Strategy` without touching the `execute` caller.

## 3. L - Liskov Substitution Principle (LSP)
**Goal**: Reliability.
**Definition**: Subtypes must be substitutable for their base types.
**Rules**:

- **Contravariance** of method arguments.
- **Covariance** of return types.
- **Preconditions** cannot be strengthened in subtype.
- **Postconditions** cannot be weakened in subtype.
**Simply**: Don't throw `NotImplementedException` in a child class.

## 4. I - Interface Segregation Principle (ISP)
**Goal**: Minimal Dependencies.
**Definition**: Clients should not be forced to depend on methods they do not use.
**Example**: Android's `TextWatcher` forces you to implement 3 methods (`before`, `on`, `after`). If you only need one, it's annoying.
**Fix**: Break large interfaces into small "Role Interfaces".

## 5. D - Dependency Inversion Principle (DIP)
**Goal**: Decoupling.
**Definition**: High-level modules should not depend on low-level modules. Both should depend on abstractions.
**Visualization**:

- **Bad**: `ViewModel` -> `SQLRepository`. (High depends on Low).
- **Good**: `ViewModel` -> `IRepository` <- `SQLRepository`.
- Both point to the Interface in the middle. The dependencies are inverted.

[Back to Syllabus](../docs/syllabus-overview.md)