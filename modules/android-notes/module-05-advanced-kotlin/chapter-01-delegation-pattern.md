# Chapter 01: The Delegation Pattern (`by`)

## 1. Class Delegation
**Composition over Inheritance** made easy.
```kotlin
interface Base {
    fun print()
}

class BaseImpl(val x: Int) : Base {
    override fun print() { print(x) }
}

class Derived(b: Base) : Base by b
```
**Internals**:
The compiler generates all methods of `Base` in `Derived`.
Each generated method forwards the call to the stored `b` instance.
`Derived.print()` -> `this.b.print()`.
**Zero boilerplate Proxy pattern**.

## 2. Property Delegation
`val p: String by Delegate()`
The syntax corresponds to:
```kotlin
val p: String get() = delegate.getValue(this, propertyRef)
```

### 2.1 ReadOnlyProperty & ReadWriteProperty
You can implement these interfaces to create custom delegates.
```kotlin
class ResourcesDelegate(val id: Int) : ReadOnlyProperty<Context, Drawable> {
    override fun getValue(thisRef: Context, property: KProperty<*>): Drawable {
        return thisRef.getDrawable(id)
    }
}
```

### 2.2 Built-in Delegates
- **`lazy`**: Thread-safe initialization.
- **`observable`**: `Delegates.observable(initial) { prop, old, new -> }`. Great for triggering UI updates on variable change.
- **`vetoable`**: `Delegates.vetoable`. Returns Boolean. If false, the change is rejected.

## 3. Map Delegation
```kotlin
class User(val map: Map<String, Any?>) {
    val name: String by map
    val age: Int by map
}
```
Very useful for parsing dynamic JSON or generic configuration maps where keys match property names.

[Next: Chapter 02 - Meta-Programming](chapter-02-meta-programming.md)
