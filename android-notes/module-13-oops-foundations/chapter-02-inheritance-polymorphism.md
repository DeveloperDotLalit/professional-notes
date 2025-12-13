# Chapter 02: Inheritance & Polymorphism

## 1. The "Is-A" Relationship (Inheritance)
Inheritance allows a child class to acquire the properties of a parent.
**Analogy**: 
- Parent: `Vehicle` (Has engine, can move).
- Child: `Tesla` (Has engine, can move, + Autopilot).
- Valid: "Tesla **IS A** Vehicle".

Pro Tip: Inheritance is often overused. It creates a **Tight Coupling**. If you change `Vehicle` engine logic, you might break `Tesla`.

## 2. Polymorphism (The Magic)
Polymorphism means "Many Forms". It allows code to work with a `Vehicle` without knowing if it's a `Tesla`, a `Ford`, or a `Bike`.

```kotlin
fun startRace(vehicle: Vehicle) {
    vehicle.accelerate() // The magic happens here
}
```

### Compile-Time Polymorphism (Overloading)
Same function name, different parameters.
```kotlin
fun draw(circle: Circle)
fun draw(square: Square)
```
**Internals**: Compiler picks the correct function *before* the app runs, based on the type of variables.

### Runtime Polymorphism (Overriding)
Same function name, same parameters, different implementation in Child.
```kotlin
open class Vehicle {
    open fun move() { print("Moving") }
}

class Tesla : Vehicle() {
    override fun move() { print("Silently gliding") }
}
```
**Internals (The V-Table)**:
How does the CPU know which `move()` to call?
1.  Every class has a hidden table called a **Virtual Method Table (vtable)**.
2.  Index 0 of `Vehicle` vtable points to `Vehicle.move`.
3.  Index 0 of `Tesla` vtable points to `Tesla.move`.
4.  At runtime, the code says: "Go to the object's vtable at index 0 and run it".
5.  This is called **Dynamic Dispatch**.

## 3. Abstract Classes vs Interfaces
- **Interface**: "Can Do". Describes behavior. `CanFly`, `CanSwim`. No state (mostly). Multiple inheritance allowed.
- **Abstract Class**: "Is A". Partial implementation. `Animal` (has `age`, `breath()`). Single inheritance only.

**Real Life Rule**: 
> "Favor Interfaces. You can implement 10 interfaces (SuperHero, Employee, Father), but you can only have 1 biological parent (Human)."

[Previous: Chapter 01 - Objects](chapter-01-objects-memory.md) | [Next: Chapter 03 - Encapsulation](chapter-03-encapsulation.md)
