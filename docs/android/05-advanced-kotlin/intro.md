---
layout: default
title: "Intro"
parent: "Advanced Kotlin"
nav_order: 999
---

## 📋 Overview
You know how to write functions. Now learn how to write *languages*. This module covers the powerful features of Kotlin that allow for Type-Safe Builders (DSLs), metaprogramming using Delegates, and mastering the type system with Variance.

## 🎯 Learning Objectives

1.  Create your own **Type-Safe DSL** (like the Compose UI tree).
2.  Understand **Covariance** (`out`) and **Contravariance** (`in`) so you never face a generic compile error again.
3.  Implement custom **Property Delegates**.
4.  Grasp **Context Receivers** (the future of DI?).

## 📚 Topics Covered

- **Lambdas with Receivers**: `String.() -> Unit`.
- **DSLs**: Building hierarchical data structures.
- **Generics**: `List<out T>` vs `MutableList<T>`.
- **Delegation**: `ReadWriteProperty` interface.
- **Contracts**: Helping the compiler be smarter.

---

[< Back to Syllabus](../docs/syllabus-overview.md) | [Next: Theory Deep Dive >](theory.md)