# Chapter 02: Open/Closed & Liskov Substitution

## 1. Open/Closed Principle (OCP)
> "Software entities should be OPEN for extension, but CLOSED for modification."

**Goal**: Add features without touching old, working code.
**Bad Example**:
```kotlin
fun calculateArea(shape: Any) {
    if (shape is Circle) ...
    else if (shape is Square) ...
    // Adding Triangle requires modifying THIS function! Risk of bugs.
}
```

**Good Example (Polymorphism)**:
```kotlin
interface Shape { fun area(): Double }

fun calculateArea(shape: Shape) {
    print(shape.area()) // Works for ALL shapes, forever.
}
```
To add `Triangle`, just create a new class. No existing code changes. This is the **Plugin Architecture**.

## 2. Liskov Substitution Principle (LSP)
> "Subclasses must be substitutable for their base classes."

**The Trap**: A Square is a Rectangle?
Mathematically? Yes.
In Programming? **NO**.

If `Rectangle` has `setWidth` and `setHeight`.
And `Square` overrides them to force `width == height`.
```kotlin
val rect: Rectangle = Square()
rect.setWidth(5)
rect.setHeight(10)
// Expectation: Area is 50.
// Reality: Square sets both to 10. Area is 100.
```
The behavior broke the contract effectively. `Square` is NOT a suitable substitute for `Rectangle` here.
**Fix**: They should likely both inherit from a `Shape` interface, rather than one inheriting the other.

[Previous: Chapter 01 - SRP](chapter-01-srp.md) | [Next: Chapter 03 - ISP & DIP](chapter-03-isp-dip.md)
