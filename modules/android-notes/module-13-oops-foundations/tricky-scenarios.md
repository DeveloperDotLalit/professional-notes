# Module 13: Tricky OOPS Scenarios

## 1. The Mutable Default Argument Trap
**Scenario**: You use a MutableList as a default argument.
```kotlin
// Python style bug - rare in Kotlin but conceptually important
// Kotlin creates a NEW list every call, so it's safe.
fun add(item: String, list: MutableList<String> = mutableListOf()) {
    list.add(item)
}
```
**Trap**: In some languages (Python), the list is created *once* at definition time. In Kotlin, it is created at *call time*.
**However**, be careful with **Objects** as default arguments vs **Functions**.

## 2. Leaking `this` in Constructor
**Scenario**: Passing `this` to another object before the constructor finishes.
```kotlin
class Manager {
    private val data = "Secret"
    init {
        Listener.register(this) // DANGER!
    }
}

object Listener {
    fun register(m: Manager) {
        println(m.data) // NullPointerException? or Uninitialized?
    }
}
```
**Explanation**: The `Manager` object is not fully fully constructed when `register` is called. Accessing its fields might lead to reading uninitialized memory or nulls.

## 3. Overriding Properties with var/val
**Scenario**:
```kotlin
open class Parent {
    open val id: Int = 1
}

class Child : Parent() {
    override var id: Int = 2 // Allowed!
}
```
**Explanation**: You can override a `val` (read-only) with a `var` (read-write).
**Why?**: `val` is just a getter. `var` is a getter + setter. Adding a setter doesn't break the contract of the parent (who only promised a getter).
**Reverse**: You CANNOT override `var` with `val`.

## 4. The `equals()` and `hashCode()` Contract
**Scenario**: You override `equals` but not `hashCode`.
```kotlin
class User(val id: Int) {
    override fun equals(other: Any?): Boolean = (other as User).id == id
}
```
**Trap**: Put this in a `HashSet`.
```kotlin
val set = hashSetOf(User(1))
val exists = set.contains(User(1)) // Returns FALSE!
```
**Why?**: `HashSet` looks at bucket `hashCode()` first. Since you didn't override it, the two objects have different memory addresses, so different hashes. They land in different buckets. `equals` is never even checked.

## 5. Companion Object Inheritance
**Scenario**: Can a Companion Object inherit from a class?
**Answer**: Yes.
```kotlin
interface Factory<T> { fun create(): T }

class User {
    companion object : Factory<User> {
        override fun create() = User()
    }
}
```
**Usage**: You can pass `User` (the class name) to a function expecting `Factory<User>`.
`fun printUser(f: Factory<User>) { ... }`
`printUser(User)` works!

[Back to Syllabus](../docs/syllabus-overview.md)
