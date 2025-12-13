---
layout: default
title: "Creational"
parent: "Design Patterns"
nav_order: 1
---

## 1. The Builder Pattern
**Problem**: Constructor Telescoping.
`new Notification(title, text, icon, sound, vibration, ...)`
It's impossible to read. What is the 5th argument? `null`? `true`?
**Solution**: Separate the construction from the representation.
**Android Example**: `NotificationCompat.Builder`
```kotlin
val notif = NotificationCompat.Builder(context, CHANNEL_ID)
    .setContentTitle("Hello") // Fluent API
    .setSmallIcon(R.drawable.icon)
    .build()
```
**Takeaway**: Use Builders when an object has 4+ optional parameters. In Kotlin, named arguments (`User(name="X")`) often replace Builders, but Builders are still useful for complex validation logic during build.

## 2. The Singleton Pattern
**Problem**: We need exactly one instance of a heavy object (Database, Network Client).
**Solution**: Ensure a class has only one instance and provide a global point of access.
**Android Example**: `Room.databaseBuilder(...).build()` usually stored in a Singleton Object or DI Graph.
**Kotlin**: `object MySingleton`.
**Warning**: Singletons are "Global State". They make testing hard because you can't easily reset them between tests. Use Dependency Injection (DI) to manage singletons instead of hardcoded `object`.

## 3. The Factory Method
**Problem**: We need to create an object, but we don't know the exact class until runtime.
**Solution**: Define an interface for creating, but let subclasses decide which class to instantiate.
**Android Example**: `ViewModelProvider.Factory`.
The System needs to create your `UserViewModel`, but it doesn't know how to pass the `repository` argument constructor.
You provide a Factory:
```kotlin
class MyFactory(val repo: Repo) : ViewModelProvider.Factory {
    override fun create(modelClass: Class): T {
        return UserViewModel(repo) as T
    }
}
```
The Android Framework (Abstract Creator) calls `create()`, and your Factory (Concrete Creator) instantiates the specific VM.

[Next: Chapter 02 - Structural Patterns](chapter-02-structural.md)