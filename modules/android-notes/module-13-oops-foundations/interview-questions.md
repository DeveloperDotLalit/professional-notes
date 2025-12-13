# Module 13: OOPS - Interview Questions (Narrative)

## Section 1: Conceptual Core

### Q1: Explain the difference between "Composition" and "Inheritance" to a Junior Dev.
**Candidate Answer:**
"I usually explain it as 'Is-A' vs 'Has-A'.
Inheritance is a family bloodline. A `Penguin` *Is-A* `Bird`. It inherits all the traits—wings, beak, feathers. The problem is, if the `Bird` class has a `fly()` method, the `Penguin` inherits that too, which is wrong. You end up having to override it to throw an exception, which is messy.
Composition is simpler: it's like assembling a PC. A `Computer` *Has-A* `Cpu`. It *Has-A* `Keyboard`.
If I want to make a new type of computer, I just plug in a different CPU. I don't need to inherit from `BaseComputer`.
In software, we prefer Composition because it's flexible. You can swap behaviors at runtime (Strategy Pattern) without breaking the class hierarchy."

### Q2: Why is the Diamond Problem impossible in Java/Kotlin classes?
**Candidate Answer:**
"The Diamond Problem happens in Multiple Inheritance. Suppose Class B and Class C both inherit from A. And both override `fun start()`.
Now, Class D inherits from *both* B and C.
If I call `d.start()`, does it run B's version or C's version? The compiler gets confused.
Java and Kotlin solve this by simply forbidding multiple inheritance of state (Classes). You can only extend one Class.
However, you *can* implement multiple Interfaces. Since interfaces (mostly) don't carry state, if both define `start()`, the compiler forces Class D to override `start()` and define its own resolution (e.g., calling `super<B>.start()`)."

### Q3: What is a Virtual Method Table (v-table)?
**Candidate Answer:**
"The v-table is the hidden mechanism that makes runtime polymorphism work.
When you compile a class, the compiler creates a table of function pointers for all its methods.
If `Dog` overrides `speak()`, the 'speak' slot in Dog's v-table points to `Dog.speak`.
If `Cat` overrides `speak()`, its slot points to `Cat.speak`.
When you have a variable `val animal: Animal`, and call `animal.speak()`, the CPU looks at the object's v-table in memory and follows the pointer found in the 'speak' slot.
This lookup has a tiny performance cost compared to a direct function call, which is why tight loops sometimes avoid polymorphism."

## Section 2: Kotlin Specifics

### Q4: `data class` vs regular `class`. What happens under the hood?
**Candidate Answer:**
"A `data class` is Kotlin's way of saying 'This object is just a container for state'.
The compiler automatically generates:
1.  `equals()` and `hashCode()` based on the primary constructor properties. This is crucial for comparing two objects by content rather than reference.
2.  `toString()` for pretty printing.
3.  `copy()` method, which is huge for immutability patterns. It allows creating a clone with one field changed.
4.  `componentN()` functions for destructuring declarations (`val (name, age) = user`).
The limitation is: Data classes cannot be `open` or `abstract`."

### Q5: Explain the Singleton pattern in Kotlin.
**Candidate Answer:**
"In Java, we had to write `getInstance()`, double-checked locking, `volatile` fields... it was boilerplate city.
In Kotlin, we just write `object Database`.
The compiler creates a class with a private constructor and a `public static final` instance field named `INSTANCE`.
It initializes it eagerly (or lazily depending on execution) in a thread-safe static block.
It's simpler, safer, and cleaner."

### Q6: What is a `sealed class` and why is it better than Enum?
**Candidate Answer:**
"Enums are restricted to constant objects. You cannot have state unique to one enum instance.
`sealed class` is like an 'Enum on Steroids'. It represents a restricted hierarchy.
A `UIState` sealed class can have a `Success` subclass that holds a `List<Data>`, and an `Error` subclass that holds a `String`.
This allows us to model state machines perfectly. And because it's sealed, the compiler knows all possible subclasses, so a `when` expression doesn't need an `else` branch."

## Section 3: Professional Scenarios

### Q7: Why override `hashCode()` if you override `equals()`?
**Candidate Answer:**
"It's a contract required by Hash-based collections (HashMap, HashSet).
These collections distribute items into 'buckets' based on their hash code integer.
When you call `map.get(key)`, it jumps to the bucket matching `key.hashCode()`. Then it iterates that small bucket using `equals()` to find the exact match.
If you override `equals` but not `hashCode`: Two objects might be 'equal' in content, but they generate different hash codes. The Map looks in the wrong bucket and says 'Not Found'. You've basically lost your data."

### Q8: Deep Copy vs Shallow Copy.
**Candidate Answer:**
"A Shallow Copy creates a new object, but copies the *references* of the fields.
If I clone a `Car` object, the new Car points to the *exact same* `Engine` object on the heap. Accessing `car2.engine.start()` might affect `car1`.
A Deep Copy recursively clones the entire tree. The new Car gets a brand new `Engine` object.
Kotlin's `data class copy()` is a **Shallow Copy**. If you have mutable lists inside a data class, be very careful when copying."

### Q9: `abstract class` vs `interface`. When to use which?
**Candidate Answer:**
"I lean towards Interfaces 90% of the time. They allow multiple implementation, which is key for flexibility.
I use Abstract Classes only when I need to:
1.  Hold truly shared **State** (fields) that every child needs.
2.  Provide `protected` visibility methods (interfaces are public-only).
3.  Ensure strict 'Is-A' hierarchy (restricting who can implement this).
But generally, 'favor interfaces' is the modern approach."

### Q10: What is the Liskov Substitution Principle?
**Candidate Answer:**
"It's the 'L' in SOLID. It states that if class B is a child of A, I should be able to replace A with B without breaking the program.
The classic violation is the Square/Rectangle problem.
If logic expects a Rectangle where width and height are independent, but I pass a Square (where setting width changes height), the program calculates the area wrong.
This tells us Square should *not* inherit from Rectangle structurally, even if it does mathematically."

[Back to Syllabus](../docs/syllabus-overview.md)
