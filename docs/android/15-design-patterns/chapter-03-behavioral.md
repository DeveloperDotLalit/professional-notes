---
layout: default
title: "Behavioral"
parent: "Design Patterns"
nav_order: 3
---

## 1. The Observer Pattern
**Problem**: When A changes, B needs to know. But A shouldn't know B exists (Decoupling).
**Solution**: Subscription mechanism.
**Android Example**: `LiveData` or `Flow`.
The `ViewModel` (Subject) exposes `LiveData`.
The `Activity` (Observer) subscribes.
When VM sets value, Activity gets notified.
Crucially, the VM does not call `activity.updateUI()`. It just emits. It doesn't care if 0, 1, or 10 activities are observing.

## 2. The Strategy Pattern
**Problem**: You have multiple ways to do a task, and you want to swap them at runtime.
**Solution**: Define a family of algorithms, encapsulate each one, and make them interchangeable.
**Android Example**: `DiffUtil.ItemCallback` or `RecyclerView.LayoutManager`.
`RecyclerView` doesn't know how to position items. It delegates that to a Strategy:

- `LinearLayoutManager` (Vertical list strategy).
- `GridLayoutManager` (Grid strategy).
You can swap the strategy at runtime: `rv.layoutManager = GridLayoutManager(...)` and the behavior changes completely without rewriting the RecyclerView logic.

## 3. The Command Pattern
**Problem**: You want to parameterize objects with operations (Action).
**Solution**: Encapsulate a request as an object.
**Android Example**: `Runnable`.
When you do `handler.post(Runnable { ... })`, you are sending a **Command** object to the Message Queue.
The Looper doesn't know what the code does. It just knows "Execute this command".
This decoupling allows for Queuing, Delaying (`postDelayed`), and Thread hopping.

[Previous: Chapter 02 - Structural](chapter-02-structural.md) | [Next: Chapter 04 - Architectural Patterns](chapter-04-android-architectural.md)