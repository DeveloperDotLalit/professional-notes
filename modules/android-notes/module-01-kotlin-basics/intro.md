# Module 01: Kotlin Mechanics

## 📋 Overview
Kotlin is a modern, concise, and safe programming language. But to master Android, you need to understand Kotlin **beyond the syntax**. This module covers the internal mechanics of Kotlin, how it compiles to bytecode, and how to write code that is not just "working" but "idiomatic" and "performant".

## 🎯 Learning Objectives
By the end of this module, you should be able to:
1.  Explain exactly how `val`, `var`, and `const` implementation differs in bytecode.
2.  Understand the memory implications of Inline Classes and `inline` functions.
3.  Write complex Higher-Order Functions without causing object allocation overhead.
4.  Master Scope Functions (`let`, `run`, `with`, `apply`, `also`) and know when *not* to use them.

## 📚 Topics Covered
- **The Type System**: Nullability, `Unit` vs `Nothing`, Platform Types.
- **Functions**: Inline, Reified, Infix, Extension Mechanics.
- **Classes**: Data classes (copy mechanics), Sealed classes/interfaces, Object singleton internals.
- **Delegation**: Class delegation vs Property delegation.
- **Generics**: `in`, `out`, `where`, and reified type parameters.

---

[< Back to Syllabus](../docs/syllabus-overview.md) | [Next: Theory Deep Dive >](theory.md)
