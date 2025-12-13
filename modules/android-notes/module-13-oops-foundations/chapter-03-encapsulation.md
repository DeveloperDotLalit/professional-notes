# Chapter 03: Encapsulation & Abstraction

## 1. The Shield (Encapsulation)
Encapsulation is about **protection**. It is bundling data (fields) and methods (logic) alongside access control.

**Why?**
Imagine a `BankAccount` class.
If `balance` is public:
```kotlin
account.balance = -100000 // Anyone can bankrupt you!
```
If `balance` is private:
```kotlin
class BankAccount {
    private var balance = 0
    
    fun withdraw(amount: Int) {
        if (amount > balance) throw Error("Low funds") // Protection!
        balance -= amount
    }
}
```
**Professional speak**: "Encapsulation preserves the *Invariant* of the object. It ensures the object is never in an invalid state."

## 2. Abstraction (The Dashboard)
Abstraction is about **hiding complexity**.
**Analogy**: A Car Dashboard.
- **You see**: Steering wheel, Pedals.
- **You don't see**: Fuel injection timing, Alternator voltage.
- **Benefit**: You don't need to be a mechanic to drive.

In Code:
```kotlin
// Absolute Abstraction
interface Repository {
    fun getUsers(): List<User>
}
```
The caller doesn't know if the users come from:
1.  A Network API.
2.  A Local Database.
3.  A Mock file.
They just "drive the car" (call `getUsers`).

## 3. Access Modifiers in Kotlin
- **public**: Everyone seeing it. (Default).
- **private**: Only inside this file/class.
- **protected**: This class + Subclasses.
- **internal**: Only inside this Module (Gradle module). *Unique to Kotlin!*.

**Real Life usage**:
> "Library developers love `internal`. It lets them share code between files in their library without exposing it to the user of the library. Ideally, your API surface should be tiny."

[Previous: Chapter 02 - Inheritance](chapter-02-inheritance-polymorphism.md) | [Next: Chapter 04 - Composition](chapter-04-composition-vs-inheritance.md)
