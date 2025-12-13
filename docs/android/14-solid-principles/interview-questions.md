---
layout: default
title: "Interview Questions"
parent: "Solid Principles"
nav_order: 999
---

## Section 1: Core Principles

### Q1: Explain the Single Responsibility Principle. Does it mean a class does one thing?
**Candidate Answer:**
"That's a common misconception. If a class date 'one thing', it would be a function.
SRP is really about **People**, not code. It states that a class should have one *reason to change*.
A 'reason' usually corresponds to a stakeholder.
If the Billing Department asks for a change, and the UI Design team asks for a change, and both requests force me to edit the same `Order` class, then that class violates SRP.
It's coupling valid business logic with presentation logic.
I separate them so that the 'Billing' code and 'UI' code live in different files. This prevents merge conflicts and side effects."

### Q2: How does Dependency Inversion differ from Dependency Injection?
**Candidate Answer:**
"Dependency Inversion (DIP) is the **Principle**—the architecture goal. It says 'High level modules should not depend on low level ones'.
Dependency Injection (DI) is the **Pattern/Tool**—the mechanism we use to achieve that goal.
By injecting dependencies (like passing interfaces in the constructor), we satisfy the DIP.
So DI is the 'How', and DIP is the 'Why'.
Without DI, my ViewModel would just say `val repo = new SqlRepo()`, creating a hard dependency violating DIP."

### Q3: Give a real-world example of Liskov Substitution violation you've seen?
**Candidate Answer:**
"I've seen it with Java's Collections.
`Arrays.asList()` returns a List.
But if you try to call `.add()` on that list, it throws `UnsupportedOperationException`.
This is technically an LSP violation. The `List` interface contract says 'You can add items'. But this specific subclass says 'No you can't'.
It causes crashes at runtime because the type system lied to you.
In my own code, I avoid this by segregating 'Mutable' and 'Immutable' interfaces explicitly, like Kotlin does with `List` (read-only) versus `MutableList`."

## Section 2: Android Application

### Q4: How does Clean Architecture relate to SOLID?
**Candidate Answer:**
"Clean Architecture is basically SOLID applied to structure.

- **SRP**: We split App into Data, Domain, Presentation layers.
- **DIP**: The Domain layer (High Level) defines the Repository Interfaces. The Data Layer (Low Level) implements them. The source code dependency points INWARD to Domain, inverting the flow of control.
- **ISP**: We expose strict `UiState` to the View, not the entire Database Entity.
It's the practical implementation of these abstract rules."

### Q5: Open/Closed Principle in a `RecyclerView`. How?
**Candidate Answer:**
"Imagine a feed with different item types: Ads, Posts, Videos.
**Violating OCP**: A giant `onBindViewHolder` with `if (type == AD) ... else if (type == VIDEO)...`
To add a 'Poll' type, I have to modify this risky, huge adapter class.
**Applying OCP**:
I use the **Visitor Pattern** or a **Delegate Pattern**.
I create an interface `ItemDelegate`.
`AdDelegate`, `VideoDelegate`.
The Adapter simply holds a list of Delegates. `delegates.get(viewType).bind(holder)`.
Now, to add a 'Poll', I just create `PollDelegate` and register it. I never touch the Adapter code. It is Closed for modification, Open for extension."

### Q6: Does Interface Segregation apply to Kotlin's `data class`?
**Candidate Answer:**
"Indirectly, yes.
If I have a massive `User` entity with 50 fields (name, address, billing, preferences...), and my Profile Screen only needs the 'name', passing the whole `User` object is a bit wasteful and couples the screen to fields it doesn't care about.
We often create a smaller 'Role' model or `UiModel`, like `ProfileUiState(val name: String)`.
This follows the spirit of ISP: The View depends only on the data it needs. It makes previews and testing easier because I don't need to mock a dummy Billing Address just to test the Profile Name display."

### Q7: When is it okay to ignore SOLID?
**Candidate Answer:**
"SOLID is a tool, not a religion.
For a Hackathon project or a rigid MVP, applying full SOLID (Interfaces for everything, full DIP) is over-engineering. It slows down velocity.
Also, **YAGNI** (You Ain't Gonna Need It) fights OCP. Don't build a plugin system if you only have one plugin.
I apply SOLID proportional to the lifespan and complexity of the component. Core Business Logic? Strict SOLID. One-off marketing script? Who cares."

[Back to Syllabus](../docs/syllabus-overview.md)