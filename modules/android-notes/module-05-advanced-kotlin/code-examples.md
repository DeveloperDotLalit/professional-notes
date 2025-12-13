# 💻 Code Examples: DSLs & Generics

## 1. Building a HTML DSL
**Goal**: Write code that looks like HTML structure.

```kotlin
class Tag(val name: String) {
    private val children = mutableListOf<Tag>()
    
    fun tag(name: String, init: Tag.() -> Unit) {
        val child = Tag(name)
        child.init()
        children.add(child)
    }
    
    override fun toString(): String = 
        "<$name>${children.joinToString("") { it.toString() }}</$name>"
}

fun html(init: Tag.() -> Unit): Tag {
    val root = Tag("html")
    root.init()
    return root
}

// Usage
val page = html {
    tag("body") {
        tag("h1") { /* text */ }
        tag("div") { /* ... */ }
    }
}
```

## 2. Custom Delegate
**Goal**: A property that logs every time it's assigned.

```kotlin
class LoggingProperty<T>(var value: T) : ReadWriteProperty<Any?, T> {
    override fun getValue(thisRef: Any?, property: KProperty<*>): T {
        return value
    }

    override fun setValue(thisRef: Any?, property: KProperty<*>, value: T) {
        println("${property.name} changed from ${this.value} to $value")
        this.value = value
    }
}

// Usage
var name by LoggingProperty("Alice")
```

[< Back to Theory](theory.md) | [Next: Interview Questions >](interview-questions.md)
