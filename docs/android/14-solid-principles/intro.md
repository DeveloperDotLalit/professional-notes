---
layout: default
title: "Intro"
parent: "Solid Principles"
nav_order: 999
---

## Module Overview
Writing code that works is easy. Writing code that **survives** is hard.
The SOLID principles are not academic rules; they are the survival guide for large codebases.
In this module, we dissect the 5 principles that define "Clean Architecture". We move beyond the abstract definitions and apply them directly to Android development—refactoring massive Activities, decoupling ViewModels, and creating plugin-based architectures.

## What You Will Learn

- **SRP**: How to split a "God Activity" into rigorous layers.
- **OCP**: How to add features (like new Payment methods) without touching a single line of existing code.
- **LSP**: Why inheritance is dangerous and how to avoid the "Square-Rectangle" trap.
- **ISP**: Why massive interfaces hurt testing.
- **DIP**: The art of Dependency Injection and why "High Level" modules must rule "Low Level" ones.

## Prerequisites

- Basic OOPS (Module 13).
- Android Architecture components (Module 04).

## Roadmap

1.  **[Single Responsibility (SRP)](chapter-01-srp.md)**: Separation of Concerns.
2.  **[Open/Closed & Liskov (OCP/LSP)](chapter-02-ocp-lsp.md)**: Extensibility.
3.  **[Interface Segregation & Dependency Inv. (ISP/DIP)](chapter-03-isp-dip.md)**: Decoupling.
4.  **[SOLID in Android](chapter-04-solid-android.md)**: Real world case studies.