---
layout: default
title: "Theory"
parent: "OOPS Foundations"
nav_order: 999
---

## 1. The Four Pillars (Revisited)

### Encapsulation: The Fortress
It is not just `private`. It is about **Invariants**.
An object has a contract. "I, the `Circle` object, promise my `radius` is never negative."
If `radius` is public, anyone can set it to `-5`. The contract is broken. The object is invalid.
Encapsulation enforces the contract through Controlled Access (Setters/Constructors).

### Abstraction: The Interface
Abstraction is "Selective Ignorance".
You ignore the engine to drive the car.
In code, you ignore the `ArrayList` implementation to use the `List` interface.
**Leaky Abstraction**: When implementation details leak through the interface.
*Example*: A `Repository.loadfromNetwork()` method. The name "Network" leaks the detail. It should just be `load()`.

### Inheritance: The Family Tree
A mechanism for code reuse and polymorphism.
**Warning**: Inheritance is the tightest coupling available in OO. A change in the Parent ripples to all Children.
**Liskov Rule**: A Child must be usable everywhere the Parent is used without breaking behavior.

### Polymorphism: The Shapeshifter
"One Interface, Many Implementations".
**Static Polymorphism**: Overloading. Resolved at Compile Time. Fast.
**Dynamic Polymorphism**: Overriding. Resolved at Runtime (V-Table). Flexible.

## 2. Memory Mechanics

### The Stack Frame

- Every function call pushes a generic "Frame".
- Stores local primitives and **References**.
- Popped when function returns.
- **StackOverflow**: Too many frames (Recursion).

### The Heap

- Where Objects live.
- **Garbage Collection**: The process of finding objects efficiently that are no longer reachable from the Stack (Roots) and freeing their memory.
- **Generational GC**: Young objects die fast. Old objects stay long.

## 3. Association vs Aggregation vs Composition

| Term | Analogy | Code | Lifespan |
| :--- | :--- | :--- | :--- |
| **Association** | Teacher & Student | `class Teacher(student: Student)` | Independent. Teacher quits, Student stays. |
| **Aggregation** | Car & Tire | `class Car(tires: List<Tire>)` | "Has-A". Car destroyed, Tires can be sold. |
| **Composition** | Human & Heart | `class Human { val heart = Heart() }` | Dependent. Human dies, Heart dies. |

**Kotlin's Take**: Kotlin favors composition via constructor injection.

[Back to Syllabus](../docs/syllabus-overview.md)