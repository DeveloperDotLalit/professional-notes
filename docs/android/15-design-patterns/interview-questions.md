---
layout: default
title: "Interview Questions"
parent: "Design Patterns"
nav_order: 999
---

## Section 1: Core Patterns

### Q1: What is the difference between Abstract Factory and Factory Method?
**Candidate Answer:**
"It's about scale.
**Factory Method** relies on inheritance: a class directs one of its subclasses to create an object. 'I need a generic Button, subclass AndroidButtonFactory gives me an AndroidButton'.
**Abstract Factory** is a Super-Factory. It creates *families* of related objects. 'I need a UI Kit'. The factory gives me a Button, a Textbox, AND a Checkbox that all match (e.g., Light Theme vs Dark Theme).
In Android, we rarely build Abstract Factories manually, but `Dependency Injection` components (like Dagger Components) act as massive Abstract Factories for our entire app graph."

### Q2: Why is the Singleton pattern considered an Anti-Pattern by some?
**Candidate Answer:**
"Because it introduces Global State and hides dependencies.
If `UserManagers.getInstance().logIn()` is called deep inside a View, that View is now deceptively coupled to the User Manager.
It makes Unit Testing a nightmare—state from Test A bleeds into Test B because the Singleton stays alive.
I prefer 'Singleton Scope' via Dependency Injection. The DI framework ensures there is only one instance, but I still request it via the constructor (`class View(val um: UserManager)`). This keeps the code testable (I can pass a Mock) while maintaining the benefits of a single instance."

### Q3: Explain the Chain of Responsibility in OkHttp.
**Candidate Answer:**
"OkHttp Interceptors are the textbook definition of Chain of Responsibility.
When you make a request, it passes through a chain:

1.  **RetryAndFollowUpInterceptor**: Handles redirects.
2.  **BridgeInterceptor**: Adds headers like Content-Type.
3.  **CacheInterceptor**: Checks if we have a local copy.
4.  **ConnectInterceptor**: Opens the TCP socket.
Each link deals with a specific concern and passes the Request to the `next` link.
This is powerful because I can inject my own 'AuthInterceptor' in the middle without rewriting the networking logic."

## Section 2: Android Specifics

### Q4: How is `RecyclerView` an implementation of the Adapter pattern?
**Candidate Answer:**
"The `RecyclerView` is a complex view mechanism that knows how to recycle views and scroll. It doesn't know about `MyDataClass`.
The `Adapter` acts as the bridge.
It implements `getItemCount()` (How many items?) and `onBindViewHolder()` (Data -> View).
It translates the 'Domain Language' (List of Users) into the 'View Language' (ViewHolders). Without it, the RecyclerView would have to be hardcoded to every specific data type."

### Q5: Is `Context` a Decorator?
**Candidate Answer:**
"Yes, specifically `ContextWrapper`.
If you look at `Activity`, it inherits from `ContextThemeWrapper`, which inherits from `ContextWrapper`.
This wrapper holds a reference to a 'Base Context' (usually the Application Context).
This allows the Activity to delegate standard calls (like `getPackageName`) to the base context, while overriding/decorating others (like `getSystemService` or `getTheme`) to provide screen-specific resources.
This layering is why we can have different themes for different Activities while sharing the same underlying application resources."

[Back to Syllabus](../docs/syllabus-overview.md)