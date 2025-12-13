# Module 14: SOLID Code Examples

## 1. Refactoring for SRP (God Class)

**Before (Bad)**:
```kotlin
class OrderManager {
    fun processOrder(order: Order) {
        // 1. Validation Logic
        if (order.items.isEmpty()) throw Error("Empty")
        
        // 2. Database Logic
        db.save(order)
        
        // 3. Email Logic
        smtpClient.send("Order confirmed")
    }
}
```

**After (Good)**:
```kotlin
class OrderManager(
    val validator: Validator,
    val rpo: OrderRepository,
    val notifier: Notifier
) {
    fun processOrder(order: Order) {
        validator.validate(order)
        repo.save(order)
        notifier.sendConfirm(order)
    }
}
```

## 2. OCP (Payment Strategy)

**Before (Bad)**:
```kotlin
fun pay(method: String) {
    if (method == "CreditCard") { ... }
    else if (method == "PayPal") { ... }
    // Adding Bitcoin requires modifying this file!
}
```

**After (Good)**:
```kotlin
interface PaymentMethod {
    fun pay(amount: Int)
}

class CreditCard : PaymentMethod { ... }
class PayPal : PaymentMethod { ... }

// Core logic never changes
fun processPayment(method: PaymentMethod, amount: Int) {
    method.pay(amount)
}
```

## 3. ISP (Role Interfaces)

**Before (Bad)**:
```kotlin
interface MultiFunctionPrinter {
    fun print()
    fun fax()
    fun scan()
}

class OldPrinter : MultiFunctionPrinter {
    override fun print() { "ok" }
    override fun fax() { throw Error("I can't fax!") } // VIOLATION
    override fun scan() { throw Error("I can't scan!") } // VIOLATION
}
```

**After (Good)**:
```kotlin
interface Printer { fun print() }
interface Fax { fun fax() }
interface Scanner { fun scan() }

class OldPrinter : Printer { ... }
class SuperPrinter : Printer, Fax, Scanner { ... }
```

## 4. DIP (Dependency Injection)

**Before (Hard Dependency)**:
```kotlin
class Switch {
    val bulb = LightBulb() // Hardcoded dependency
    fun toggle() { bulb.on() }
}
```

**After (Inversion)**:
```kotlin
interface Switchable {
    fun on()
    fun off()
}

class Switch(val device: Switchable) { 
    fun toggle() { device.on() }
}

class LightBulb : Switchable { ... }
class Fan : Switchable { ... } 
// Switch works with anything now!
```
