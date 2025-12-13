# Chapter 02: Structural Patterns

## 1. The Adapter Pattern
**Problem**: Square peg, Round hole.
You have data in a `List<User>` (Square peg).
The `RecyclerView` wants a `ViewHolder` (Round hole).
**Solution**: A wrapper that converts the interface of one class into another.
**Android Example**: `RecyclerView.Adapter`
It adapts your domain model (`User`) into a View-friendly format (`onBindViewHolder`).
It bridges the gap between your Data Layer and the UI Layer.

## 2. The Decorator Pattern
**Problem**: You want to add behavior to an object dynamically without inheritance explosion.
**Solution**: Wrap the object.
**Android Example**: `ContextWrapper`.
Equation: `Activity` extends `ContextThemeWrapper` extends `ContextWrapper` extends `Context`.
When you call `startActivity` on an Activity, it might delegate to the underlying base Context, but it adds its own flavor (Theming, Lifecycle info) on top.
This allows Android to pass `Context` around while layering capabilities (Theming, Resources) without creating `ThemedResourcedLifecycleContext`.

## 3. The Facade Pattern
**Problem**: A subsystem is complex (Http Parsing, Connection Pooling, Threading).
**Solution**: Provide a simplified interface.
**Android Example**: `Retrofit`.
Under the hood, Retrofit manages OkHttp, Gson conversion, Annotation parsing, and Dynamic Proxies.
To you? It's just:
`val user = api.getUser()`
Retrofit hides the complexity of the entire networking stack behind this simple Facade.

[Previous: Chapter 01 - Creational](chapter-01-creational.md) | [Next: Chapter 03 - Behavioral Patterns](chapter-03-behavioral.md)
