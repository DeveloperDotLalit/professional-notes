---
layout: default
title: "Objects Memory"
parent: "OOPS Foundations"
nav_order: 1
---

## 1. The Blueprint Analogy (Beginner)
Imagine you are an architect.

- **Class**: The *Blueprint*. It's a piece of paper. You can't live in it. It describes where the walls go.
- **Object**: The *House*. It's the actual physical manifestation built from the blueprint. You can build 50 houses (Objects) from 1 blueprint (Class).

In Code:
```kotlin
// The Blueprint
class Car(val color: String) 

// The Actual Objects
val ferrari = Car("Red")
val bmw = Car("Blue")
```

## 2. The Internals: Stack vs Heap (Professional)
To communicate like a pro, you must understand *where* these live.

### The Stack

- **What is it?**: A scratchpad for the current functioning thread. Very fast.
- **What goes here?**: Primitive values (`int x = 5`) and **References** to objects.
- **Lifetime**: Automatically cleared when the function returns.

### The Heap

- **What is it?**: A massive pool of memory for long-term storage. Slower allocation.
- **What goes here?**: The actual **Objects** (`Car`, `User`, `Bitmap`).
- **Lifetime**: Managed by Garbage Collector (GC).

### The Visualization
```kotlin
fun main() {
    val myCar = Car("Red")
}
```

1.  **Heap**: Allocates memory for `Car` (Color string, overhead). Address: `0x1234`.
2.  **Stack**: Creates a variable `myCar`. It stores the *address* `0x1234`.

**Key Interview Phrasing**: 
> "Objects live on the Heap. Variables on the Stack point to them. When I pass an object to a function, I am passing the *reference* by value (copying the address), not copying the whole object."

## 3. Static vs Instance

- **Instance (Regular)**: Belongs to the *House*. Each house has its own `mailbox`.
- **Static (Companion Object)**: Belongs to the *Neighborhood*. There is only one shared `Gate`.
- **Usage**: Use Static for Constants (`Math.PI`) or Factories (`User.create()`). Use Instance for state (`user.name`).

[Next: Chapter 02 - Inheritance & Polymorphism](chapter-02-inheritance-polymorphism.md)