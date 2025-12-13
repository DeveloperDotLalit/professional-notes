---
layout: default
title: "Tricky Scenarios"
parent: "Solid Principles"
nav_order: 999
---

## 1. The "Premature Optimization" of OCP
**Scenario**: You create an interface for EVERYTHING thinking "I might need a second implementation later".
**Result**: Codebase explosion. `IUserRepo`, `UserRepoImpl`, `UserRepoFactory`.
**Rule**: Apply OCP only when you have evidence of change. "Fool me once, shame on you. Fool me twice, apply OCP."

## 2. LSP and Exceptions
**Scenario**:
Parent `FileStore` has `save()`.
Child `ReadOnlyFileStore` overrides `save()` to throw `IOException`.
**Verdict**: violation of LSP.
The parent contract implied the ability to save. The child broke that promise.
**Fix**: Separate hierarchy `Readable` and `Writable`.

## 3. DIP vs "Just pass a lambda"
**Scenario**: Creating a whole interface `OnClickListener { onClick() }` vs passing `() -> Unit`.
**Modern View**: In Kotlin, Function Types are essentially single-method interfaces.
Passing a lambda IS satisfying DIP. It is an abstraction. You don't always need a named Interface class.

## 4. SRP cohesion vs fragmentation
**Scenario**: You split a class into 10 tiny classes (Validator, Formatter, Saver, Logger, etc.).
**Result**: To understand how "Save User" works, you have to jump through 10 files.
**Balance**: Cohesion means things that change *together* should stay *together*. Do not split blindly.

## 5. ISP and ABI Compatibility
**Scenario**: Library development.
If you have a large public interface `Listener` and you break it into 3 small ones.
Existing users who implemented `Listener` will fail to compile.
**Fix**: Use Default Methods (`fun foo() {}`) in the interface to maintain backward compatibility while encouraging segregation for new code.

[Back to Syllabus](../docs/syllabus-overview.md)