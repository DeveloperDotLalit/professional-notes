---
layout: default
title: "Clean Architecture"
parent: "Architecture MVVM Clean"
nav_order: 1
---

## 1. The Onion Model
Imagine your app as a set of concentric circles.

1.  **Center (Domain)**: Pure business logic. Entities (User, Account). Rules ("User cannot have negative balance").
2.  **Middle (Use Cases/Interactors)**: App-specific rules. ("Send Money", "Login").
3.  **Outer (Adapters)**: Presenters, Controllers, Gateways. Converts data from Format A to Format B.
4.  **Edge (Infrastructure)**: Device, DB, Network, UI.

## 2. The Golden Rule
**Dependencies Point INWARD.**

- The **Domain** knows NOTHING about the DB (Room) or the Network (Retrofit).
- The **UI** knows NOTHING about the Database.
- **Why?** Changes in the UI ( Compose vs XML) shouldn't break Business Logic. Changes in DB (SQL vs Realm) shouldn't break the UI.

## 3. The Boundary Problem
How does the Domain save data if it can't reference the DB?
**Dependency Inversion Principle (DIP)**.

- Domain defines an Interface: `interface UserRepository`.
- Data Level implements it: `class RoomUserRepository : UserRepository`.
- Domain calls the *Interface*.
- Dependency Injection wires the *Instance*.

## 4. Layer Communication

- **UI** calls **ViewModel**.
- **ViewModel** calls **UseCase**.
- **UseCase** calls **Repository** (Interface).
- **Repository** calls **DataSource** (API/DB).

[Next: Chapter 02 - Dependency Injection](chapter-02-di-mechanics.md)