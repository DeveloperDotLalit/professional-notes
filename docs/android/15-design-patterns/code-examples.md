---
layout: default
title: "Code Examples"
parent: "Design Patterns"
nav_order: 999
---

## 1. Builder Pattern (Kotlin Type-Safe Builder)

**Classic Java Style**:
```kotlin
val notif = Notification.Builder().setTitle("Hi").build()
```

**Kotlin DSL Style (The Modern Builder)**:
```kotlin
// Define the Builder
class DialogBuilder {
    var title: String = ""
    var message: String = ""
    
    fun build(): Dialog = Dialog(title, message)
}

// Define the function
fun dialog(block: DialogBuilder.() -> Unit): Dialog {
    val builder = DialogBuilder()
    builder.block() // Execute lambda with receiver
    return builder.build()
}

// Usage
val d = dialog {
    title = "Alert"
    message = "Battery Low"
}
```

## 2. Strategy Pattern (Sorting)

```kotlin
// The Strategy Interface
interface SortStrategy {
    fun sort(items: List<String>): List<String>
}

// Concrete Strategies
class BubbleSort : SortStrategy { ... }
class QuickSort : SortStrategy { ... }

// Context
class Sorter(var strategy: SortStrategy) {
    fun execute(items: List<String>) = strategy.sort(items)
}

// Runtime Swapping
val sorter = Sorter(BubbleSort())
sorter.execute(list)
sorter.strategy = QuickSort() // Swapped behavior dynamically!
```

## 3. Decorator Pattern (Logging)

```kotlin
interface Service {
    fun fetchData()
}

class RealService : Service {
    override fun fetchData() = println("Fetching...")
}

// The Decorator
class LoggingDecorator(val inner: Service) : Service {
    override fun fetchData() {
        println("LOG: Before Call")
        inner.fetchData()
        println("LOG: After Call")
    }
}

// Usage
val service = LoggingDecorator(RealService())
service.fetchData() // Prints Logs + Does work
```