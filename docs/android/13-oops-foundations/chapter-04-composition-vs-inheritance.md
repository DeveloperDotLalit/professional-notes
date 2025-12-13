---
layout: default
title: "Composition Vs Inheritance"
parent: "OOPS Foundations"
nav_order: 4
---

## 1. The "Has-A" Relationship (Composition)
Instead of inheriting code, you **hold a reference** to it.

- Inheritance: `class Human : Heart()` (Human IS A Heart? No. Weird.)
- Composition: `class Human(val heart: Heart)` (Human HAS A Heart. Correct.)

## 2. The Fragile Base Class Problem
Why do pros hate Inheritance?
Imagine `class Bird { fun fly() }`.
You inherit `class Penguin : Bird()`.
Now `Penguin` has a `fly()` method. That's wrong!
You have to override it to throw exceptions. It's messy.

**Composition Fix**:
Make `FlyingAbility` a separate class.
`Eagle` has `FlyingAbility`.
`Penguin` has `SwimmingAbility`.
No unused methods. No pollution.

## 3. The Diamond Problem
If C inherits from A and B. And both A and B implement `fun start()`.
Which `start()` does C use?
Multiple Inheritance is messy. Java/Kotlin forbid it for Classes.
Composition avoids this because you strictly call `engine.start()` or `motor.start()`. You resolve ambiguity manually.

## 4. Kotlin Delegation
Kotlin makes Composition easy with the `by` keyword.
```kotlin
interface Cleaner { fun clean() }

class Robot(cleaner: Cleaner) : Cleaner by cleaner
```
The `Robot` acts like a cleaner (implements interface), but forwards all calls to the internal `cleaner` object.
Best of both worlds: Polymorphism of Inheritance + Safety of Composition.

[Previous: Chapter 03 - Encapsulation](chapter-03-encapsulation.md) | [Back to Syllabus](../docs/syllabus-overview.md)