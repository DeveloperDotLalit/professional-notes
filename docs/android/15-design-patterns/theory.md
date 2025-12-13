---
layout: default
title: "Theory"
parent: "Design Patterns"
nav_order: 999
---

## Categorization (Gang of Four)

| Type | Intent | Examples |
| :--- | :--- | :--- |
| **Creational** | Object Creation mechanisms. | Singleton, Builder, Factory, Prototype. |
| **Structural** | Class/Object composition. | Adapter, Decorator, Facade, Proxy. |
| **Behavioral** | Object communication. | Observer, Strategy, Command, State, Chain of Responsibility. |

## Android Ecosystem Mapping

| Pattern | Android Component | Why? |
| :--- | :--- | :--- |
| **Observer** | `LiveData`, `RXJava`, `Flow` | UI observes Data changes. |
| **Adapter** | `RecyclerView.Adapter` | Adapts List<T> to ViewHolders. |
| **Factory** | `ViewModelProvider` | Creates VM with dependencies. |
| **Builder** | `NotificationCompat.Builder` | Constructs complex Notification object. |
| **Facade** | `Retrofit` | Simplifies OkHttp/Parsing complexity. |
| **Command** | `Handler.post(Runnable)` | Encapsulates code execution. |
| **Decorator** | `ContextWrapper` | Wraps Context to add Theme/Resources. |
| **Prototype** | `Bundle.clone()` | Clones state. |
| **Chain of Resp** | `OkHttp Interceptors` | Request passes through chain (Log -> Auth -> Cache). |

## Anti-Patterns

- **God Object**: Class doing too much (Violates SRP).
- **Singleton Abuse**: using Singletons for everything (Global state nightmare).
- **Yo-Yo Problem**: Inheritance hierarchy so deep you bounce up and down to understand logic.

[Back to Syllabus](../docs/syllabus-overview.md)