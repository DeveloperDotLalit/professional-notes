---
layout: default
title: "Tricky Scenarios"
parent: "Design Patterns"
nav_order: 999
---

## 1. Singleton vs Static Class
**Question**: Why use `object Singleton` instead of `class Utils { static fun ... }`?
**Answer**: A Singleton is an Object. It can implement Interfaces. It can be passed as a parameter.
`static` methods are just global procedures. They cannot be polymorphic.
If you want to mock your Utils for testing, you need an Interface + Singleton (or instance), not static methods.

## 2. The Context Leak (Observer Pattern)
**Scenario**:
Activity observes a Singleton Repository.
Repo keeps a list of observers: `observers.add(activity)`.
**Crash**: Activity rotates/destroys. Repository *still holds reference* to the destroyed Activity. Memory Leak!
**Fix**: `LiveData` and `Lifecycle` aware components automatically unsubscribe in `onDestroy`.
If implementing manual Observer, you MUST strictly unsubscribe.

## 3. Builder vs Constructor with Defaults
**Scenario**: Kotlin supports `User(val a: Int = 0, val b: Int = 0)`.
Do we still need Builders?
**Answer**: Mostly No. Named arguments are superior.
**Exception**: When construction requires *steps* or *validation* that depends on multiple fields.
Example: `build()` might throw if "You set 'AuthType' to OAuth but didn't provide 'Token'". Constructors are messy places for complex validation logic.

## 4. Adapter Hell
**Scenario**: Nested RecyclerViews. Adapter inside Adapter.
**Problem**: Logic becomes untraceable. Scroll performance dies.
**Fix**: Use `ConcatAdapter` (MergeAdapter) to combine adapters linearly instead of nesting them. Or use a single Adapter with multiple ViewTypes.

[Back to Syllabus](../docs/syllabus-overview.md)