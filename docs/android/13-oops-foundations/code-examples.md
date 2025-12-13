---
layout: default
title: "Code Examples"
parent: "OOPS Foundations"
nav_order: 999
---

## 1. Abstract Class vs Interface

```kotlin
// INTERFACE: Behavior
interface Drivable {
    fun drive()
    fun stop() { println("Stopping") } // Default Implementation
}

// ABSTRACT CLASS: State + Identity
abstract class Vehicle(val name: String) {
    var speed: Int = 0
    
    // Must implement
    abstract fun fuelType(): String
    
    // Can override
    open fun describe() {
        println("I am $name")
    }
}

class Tesla : Vehicle("Model S"), Drivable {
    override fun fuelType() = "Electric"
    override fun drive() { println("Silent acceleration") }
}
```

## 2. Composition (The Delegate Pattern)

**Bad (Inheritance)**:
```kotlin
open class BaseLoader {
    fun load() { ... }
}
class FileLoader : BaseLoader()
class NetLoader : BaseLoader() 
// What if I want a NetFileLoader? I can't inherit both.
```

**Good (Composition with `by`)**:
```kotlin
interface Loader { fun load() }

class FileLoaderImpl : Loader {
    override fun load() = println("Loading from File")
}

class Coordinator(val loader: Loader) : Loader by loader

fun main() {
    val fileLoader = FileLoaderImpl()
    val coordinator = Coordinator(fileLoader)
    coordinator.load() // "Loading from File"
}
```

## 3. Factory Pattern (Companion Object)
Encapsulating complex creation logic.

```kotlin
class Database private constructor(val url: String) {
    
    // Static Factories
    companion object {
        fun createLocal(): Database = Database("file://local.db")
        fun createCloud(): Database = Database("https://aws.com/db")
    }
}

// Usage
val db = Database.createLocal()
// val error = Database("x") // Compiler Error: Private constructor
```

## 4. Sealed Classes (The Super Enum)
Representing restricted class hierarchies.

```kotlin
sealed class UiState {
    object Loading : UiState()
    data class Success(val data: List<String>) : UiState()
    data class Error(val message: String) : UiState()
}

fun render(state: UiState) {
    // Compiler enforces strict coverage of all cases
    when(state) {
        is UiState.Loading -> showSpinner()
        is UiState.Success -> showList(state.data)
        is UiState.Error -> showToast(state.message)
    }
}
```