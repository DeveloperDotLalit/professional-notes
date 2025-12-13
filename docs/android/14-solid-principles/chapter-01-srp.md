---
layout: default
title: "Srp"
parent: "Solid Principles"
nav_order: 1
---

## 1. The Definition
> "A class should have one, and only one, reason to change." - Uncle Bob

It does **not** mean "A class should do only one thing" (that's a function).
It means a class should answer to only one **Actor**.

## 2. The God Activity (Anti-Pattern)
Imagine `MainActivity.kt`:

1.  Handles Clicks (`OnClickListener`).
2.  Parses JSON (`Gson`).
3.  Makes Network Calls (`Retrofit`).
4.  Updates UI.
5.  Saves to DB (`Room`).

**Violations**:

- If the Designer changes the UI, MainActivity changes.
- If the Backend changes the API, MainActivity changes.
- If the DBA changes the Schema, MainActivity changes.
It has **3 reasons to change**. It is fragile.

## 3. The Refactor
Split it up!

1.  **ViewModel**: Handles Presentation Logic (State).
2.  **Repository**: Handles Data Logic (Backend/DB).
3.  **Activity**: Handles UI Rendering (Views).

Now:

- UI tweak? Only touch Activity.
- API change? Only touch Repository.
**Professional Communication**: "We decoupled the layers to improve cohesion and reduce merge conflicts."

[Next: Chapter 02 - OCP & LSP](chapter-02-ocp-lsp.md)