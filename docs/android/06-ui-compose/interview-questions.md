---
layout: default
title: "Interview Questions"
parent: "UI Compose"
nav_order: 999
---

## Section 1: Internals

### Q1: Explain the "Slot Table" and Positional Memoization.
**Candidate Answer:**
"The Slot Table is the brain of Compose. Unlike the traditional View system, where we have a tree of heavy objects (View.java) in memory, Compose tries to be much lighter.
It maintains this data structure called a Slot Table, which is essentially a flat array—a Gap Buffer usually.
When your Composable function runs, it executes directives that write to this table. 'Store this integer here', 'Start a group here'.

**Positional Memoization** is how `remember` works.
When you say `val x = remember { Random.nextInt() }`, Compose looks at the Slot Table at the current execution index.
It asks: 'Have I been here before?'
If yes, it just reads the value from the table and skips the calculation.
If no, it computes it and writes it into the slot.
This relies heavily on the *order* of execution. That's why you can't wrap `remember` calls in random `if` statements that change purely based on external factors not tracked by Compose, as it would misalign the read/write cursor in the table."

### Q2: What triggers Recomposition, and how does scope invalidation work?
**Candidate Answer:**
"Recomposition is triggered when a `State` object—specifically a `SnapshotMutableState`—that was read during the previous pass changes its value.
Compose uses a Snapshot system. When a Composable reads `state.value`, the system effectively subscribes that scope to that state.

When the state changes, Compose looks for all the scopes that read it.
It doesn't just blindly redraw the whole screen. It tries to find the **Nearest Recomposition Scope**.
Usually, this is the function itself, unless the function is `inline` (like `Column` or `Box`), in which case the scope might be the parent wrapper.
The runtime then re-executes *only* that function.
This is why we say Compose is 'Optimistic'—it assumes most of the UI hasn't changed. If we structure our code well (State Hoisting, small components), we minimize the blast radius of these updates."

### Q6: `SideEffect` vs `LaunchedEffect`. When to use which?
**Candidate Answer:**
"I use **`LaunchedEffect`** when I need to do something asynchronous that is tied to the lifecycle of the composable.
For example: 'When this Screen appears, start a timer' or 'Fetch data from network'.
It launches a Coroutine in the composition's scope. If the composable leaves the screen, the coroutine is cancelled automatically. It's safe.

**`SideEffect`** is subtler. It runs **after every successful recomposition**.
It's not for async work. It's for communicating with the outside, non-Compose world.
A classic use case is updating the System Status Bar color. Every time our Compose theme changes or recomposes, we want to ensure the Window object knows about it.
If we put that code in the composable body directly, it might run even if the composition fails or is discarded. `SideEffect` guarantees it runs only when the frame is committed.
It's also useful for logging analytics events like 'View Refreshed'."

## Section 2: Modifiers & Layout

### Q11: Modifier order matters. Why?
**Candidate Answer:**
"It matters because Modifiers in Compose effectively wrap the component in layers, almost like an Onion.
If I say `Modifier.padding(10.dp).background(Red)`, I am adding padding *first*, and then wrapping that passed component in a Red background. So the padding is *outside* the red.
If I swap them: `Modifier.background(Red).padding(10.dp)`, I am creating a Red background, and *then* applying padding *inside* it. So the content is padded, but the whole area is red.

Under the hood, this creates a chain of `LayoutNodeWrappers`. Each modifier has the opportunity to measure and place the content it wraps. That's why the sequence of operation—measure padding, then measure background—dictates the visual result."

### Q15: `LazyColumn` performance vs `RecyclerView`.
**Candidate Answer:**
"This is a common debate. `RecyclerView` is a mature, highly optimized beast that uses **View Recycling**. It keeps a pool of View objects and rebinds data to them to avoid `inflate()` calls, which are expensive in XML land.

`LazyColumn` doesn't strictly 'recycle' in the same way. When an item scrolls off screen, the Composition Node is disposed. When a new one comes on, it is emitted (composed) from scratch.
The bet Compose makes is that **Composition is cheap**. Creating a node is just writing to a slot table; it's not inflating a heavy XML layout.
However, for this to hold true, your item composables must be efficient. If you have complex logic or heavy calculations inside your item composable, `LazyColumn` can stutter.
You need to ensure strict separation—do the math in ViewModel, pass simple immutable data to the Row."

## Section 3: State Management

### Q16: State Hoisting. Why is it important?
**Candidate Answer:**
"State Hoisting is the pattern of moving state *up* to make a component stateless.
Instead of a `Counter` button holding its own `count` variable, we pass `count` in as a parameter and a lambda `onCountChange` to request updates.

The value is **Reusability** and **Testability**.
If the button manages its own state, I can't easily control it from the outside. I can't strictly test 'What does it look like at count=100?' without actually clicking it 100 times.
If I hoist the state, the component becomes a dumb renderer. I can drop it anywhere. I can test it in isolation easily. And I can have multiple views (e.g., a Toggle and a Numerical Display) driven by the exact same source of truth."

### Q20: `produceState` vs `flow.collectAsState`.
**Candidate Answer:**
"`produceState` is a generic builder. It's basically a `LaunchedEffect` that gives you a `semaphor` to set a value. It's useful for converting archaic callback-based APIs (like waiting for a Bluetooth connection result) into Compose State.

`collectAsState` (or `collectAsStateWithLifecycle`) is specifically optimized for Coroutine Flows. It does the same thing internally, but it handles the flow cancellation and heavy lifting for you.
In 99% of cases, we use `collectAsState` because our data comes from Room or Retrofit as a Flow. `produceState` is a lower-level tool for when you don't have a flow."

[Back to Syllabus](../docs/syllabus-overview.md)