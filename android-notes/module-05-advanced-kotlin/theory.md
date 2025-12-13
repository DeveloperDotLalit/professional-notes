# 🎓 Theory: Advanced Kotlin Mechanics

## 1. Lambdas with Receivers
Standard Lambda: `(A) -> B`. You access properties via `it`.
Lambda with Receiver: `A.() -> B`. You access properties via `this`.
This is the magic behind DSLs.
```kotlin
fun buildString(action: StringBuilder.() -> Unit): String {
    val sb = StringBuilder()
    sb.action() // 'this' is sb
    return sb.toString()
}
```

## 2. Variance (The Brain Melter)
Generics are **Invariant** by default. `List<String>` is NOT a subtype of `List<Any>`. Why?
Because `MutableList<Any>` allows adding an `Int`, but `MutableList<String>` does not.
If we treated `MutableList<String>` as `MutableList<Any>`, we could insert an Int into a String list. Runtime crash!

### `out` (Covariance) - Producer
- "I only **produce** (return) items of type T".
- Safe to treat `List<String>` as `List<Any>`.
- Kotlin's `List` is defined as `List<out E>`.

### `in` (Contravariance) - Consumer
- "I only **consume** (take as argument) items of type T".
- Safe to treat `Comparable<Any>` as `Comparable<String>`.

## 3. Contracts
Telling the compiler things it can't figure out.
```kotlin
@OptIn(ExperimentalContracts::class)
fun require(condition: Boolean) {
    contract { returns() implies condition }
    if (!condition) throw IllegalArgumentException()
}
```
This allows the compiler to know that if `require(x != null)` returns, `x` is definitely not null.

[< Back to Intro](intro.md) | [Next: Code Examples >](code-examples.md)
