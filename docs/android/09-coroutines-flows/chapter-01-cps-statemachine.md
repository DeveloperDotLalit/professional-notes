---
layout: default
title: "Cps Statemachine"
parent: "Coroutines Flows"
nav_order: 1
---

## 1. The Suspension Mechanism
Kotlin Coroutines are a compile-time implementation of **Continuation Passing Style (CPS)**. Unlike Go-routines (which are stackful runtime-managed threads), Kotlin coroutines are stackless (mostly) and compiled into state machine classes.

### 1.1 The `suspend` Transformation
Every `suspend` function is effectively converted by the compiler.
```kotlin
suspend fun getUser(id: String): User
```
Becomes (roughly):
```java
Object getUser(String id, Continuation<User> cont)
```

- **Return Type**: `Object`. Why? Because it might return the `User` (if result is immediate) OR the special marker `COROUTINE_SUSPENDED` (if it suspended).
- **Continuation**: A callback interface that represents "the rest of the code".

### 1.2 The State Machine Class
If a function has suspension points, it is compiled into an anonymous class extending `SuspendLambda` (or `ContinuationImpl`).
This class has:

1.  **Bitfield (`label`)**: Tracks execution progress (Instruction Pointer).
2.  **Fields**: Saves local variables and parameters that must survive suspension (Spilling to Heap).

**Source:**
```kotlin
suspend fun auth() {
    val token = login() // Suspend 1
    println(token)
    val user = fetch(token) // Suspend 2
    save(user)
}
```

**Compiled State Machine (Pseudo-Java):**
```java
class AuthStateMachine extends ContinuationImpl {
    int label = 0;
    Object token; // Local variable spilled to heap
    Object user;

    Object invokeSuspend(Object result) {
        switch(label) {
            case 0:
                label = 1;
                result = login(this);
                if (result == COROUTINE_SUSPENDED) return COROUTINE_SUSPENDED;
                // Fallthrough if login() returned immediately
            case 1:
                token = result; // Restore result
                System.out.println(token);
                label = 2;
                result = fetch(token, this); // Pass 'this' as continuation
                if (result == COROUTINE_SUSPENDED) return COROUTINE_SUSPENDED;
            case 2:
                user = result;
                save(user);
                return Unit.INSTANCE;
        }
    }
}
```

### 1.3 Stack Unwinding
When `login()` returns `COROUTINE_SUSPENDED`:

1.  The `invokeSuspend` method returns `COROUTINE_SUSPENDED`.
2.  The stack frame is popped.
3.  The thread is effectively "Freed".
4.  The `AuthStateMachine` object sits on the Heap, effectively "Freezing" the local state.

## 2. BaseContinuationImpl
All kotlin coroutines inherit from `BaseContinuationImpl`.
It has a `resumeWith(Result)` method.
When a coroutine resumes:

1.  It calls `resumeWith` on the continuation.
2.  `resumeWith` calls `invokeSuspend` in a loop (trampoline) to avoid StackOverflow in tail-call recursion scenarios.

## 3. The Cost of Suspension

- **Allocation**: One StateMachine object per coroutine frame.
- **Switching**: `instanceof` checks and `switch` cases.
- **Deep Recursion**: If you have 1000 nested suspend calls, you have a linked list of 1000 Continuation objects on the heap.
- **Optimization**: Tail Call Optimization (some cases) and "Spilling" minimization (compiler tries to use fields only for vars that are actually alive across suspension points).

[Next: Chapter 02 - Dispatchers & Schedulers](chapter-02-dispatchers-schedulers.md)