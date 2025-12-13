---
layout: default
title: "Navigation Backstack"
parent: "Jetpack Components"
nav_order: 4
---

## 1. The Single Activity Principle
One Activity, many Fragments.
The `NavController` manages the swapping.
It replaces:

1.  **FragmentManager transactions**: It does `beginTransaction().replace(...)` for you.
2.  **Back Stack**: It maintains an internal stack of "Destinations".

## 2. The Navigation Graph (XML/DSL)

- **Destination**: A node (Fragment, Dialog, Activity).
- **Action**: An edge (Arrow). Contains `enterAnim`, `exitAnim`, `popUpTo`.

### 2.1 popUpTo vs popUpToInclusive
Scenario: A -> B -> C -> Login.
User logs in. We want to go to Home, and remove A, B, C, Login from stack.
Action: `dest=Home`, `popUpTo=A`, `inclusive=true`.
Result: Stack is cleared, Home is pushed. Back button exits app.

## 3. Deep Links
Navigation handles external URLs.

- **Explicit**: `NavDeepLinkBuilder`.
- **Implicit**: `<deepLink>` in graph.
**Algorithm**:
When an Intent matches a deep link:

1.  System starts Activity.
2.  NavController recreates the specific Back Stack needed to reach that destination.
    - Example: Link to `/user/settings`.
    - Graph says: Home -> User -> Settings.
    - NavController synthesizes the "Home" and "User" fragments in the background, so when you press Back from "Settings", you go to "User", not exit.

[Previous: Chapter 03 - WorkManager](chapter-03-workmanager-schedulers.md) | [Back to Syllabus](../docs/syllabus-overview.md)