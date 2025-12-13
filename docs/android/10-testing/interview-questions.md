---
layout: default
title: "Interview Questions"
parent: "Testing"
nav_order: 999
---

## Section 1: Unit Testing

### Q1: Mock vs Fake vs Stub.
**Candidate Answer:**
"In practice, these terms are often used interchangeably, but there are distinct differences in robustness.
A **Stub** is the simplest: It's hardcoded. 'If `reop.get()` is called, return `User("Alice")`'. It has no logic.
A **Mock** (like MockK) is about behavior verification. We check *interactions*. 'Verify that `analytics.track()` was called exactly once'. Mocks are great for boundary APIs but can make tests brittle because they couple the test to the *implementation details* (the sequence of calls).
A **Fake** is a lightweight, working implementation of the dependency. For example, a `FakeRepository` that uses a `HashMap` instead of a real Database. Fakes are superior because they maintain state. If I call `save(User)`, then `get(User)`, the Fake returns the user I just saved. `Mock` would require me to manually wire up that relationship every time. Fakes lead to more resilient tests that survive refactoring."

### Q13: `IdlingResource`. Why is it arguably the hardest part of Espresso?
**Candidate Answer:**
"Espresso is designed to be synchronous. It waits for the UI thread to be idle.
But modern apps do work on background threads (Coroutines, RxJava, Retrofit). Espresso has no visibility into a thread pool unless we tell it.
So, if I click 'Login', and the app makes a network call, Espresso thinks the app is idle and immediately asserts 'Fail: Success screen not shown', because the network hasn't finished yet.
`IdlingResource` is the bridge. We register a resource that tells Espresso: 'Hey, I am busy right now'. When the network finishes, we say 'I am idle'. Espresso waits for that signal.
The architectural pain is that production code shouldn't know about test idling resources. We often have to use a singleton or a wrapper to inject these counters strictly for debug builds."

## Section 4: Tricky Scenarios

### Q17: Flaky Tests. How do you fight them?
**Candidate Answer:**
"Flakiness usually comes from three source: **Concurrency**, **Time**, or **External dependencies**.

1.  **Concurrency**: If a test fails 5% of the time, it's usually a race condition. Using `StandardTestDispatcher` (which pauses time) helps control execution order deterministically.
2.  **Time**: Never rely on `Thread.sleep()`. It's unreliable on slow CI runners. Always use polling (awaitility) or IdlingResources. Also, inject a `Clock` so you can freeze time (avoiding failures where 'now' changes exactly at midnight).
3.  **External**: A unit test hitting a real network API is doomed to fail eventually. We must strictly Mock or Fake all IO boundaries.
We also use a 'Flaky Test Handler' in CI that automatically retries failed tests once, but we verify the logs to ensure we fix the root cause rather than ignoring it."

[Back to Syllabus](../docs/syllabus-overview.md)