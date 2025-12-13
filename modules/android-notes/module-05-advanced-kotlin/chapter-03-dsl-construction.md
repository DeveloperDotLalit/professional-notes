# Chapter 03: Domain Specific Languages (DSLs)

## 1. Type-Safe Builders
Kotlin allows creating "HTML-like" structures.
```kotlin
html {
    body {
        div { +"Hello" }
    }
}
```

### 1.1 The Secret: Lambda with Receiver
`block: T.() -> Unit`.
Inside `html { ... }`, `this` is `HtmlBuilder`.
Inside `body { ... }`, `this` is `BodyBuilder`.

## 2. The Scope Control Problem (`@DslMarker`)
Implicit receivers are dangerous.
Inside `div`, you can technically call `html` methods because `html` is in the outer scope!
```kotlin
html {
    div {
        head { } // ERROR: 'head' is invalid inside 'div'. But valid in 'html'.
    }
}
```
**Fix**: `@DslMarker`.
```kotlin
@DslMarker
annotation class HtmlTagMarker

@HtmlTagMarker
class DivBuilder

@HtmlTagMarker
class HtmlBuilder
```
The compiler forbids accessing implicit receivers from outer scopes if they share the same DslMarker.

## 3. Extension Properties in DSL
You can add functionality to existing types within the DSL.
```kotlin
val String.bold: Span
    get() = Span(this, style = BOLD)

text {
    +"Message: "
    +"Warning".bold // Custom DSL syntax
}
```

[Previous: Chapter 02 - Meta-Programming](chapter-02-meta-programming.md) | [Next: Chapter 04 - Functional Patterns](chapter-04-functional-patterns.md)
