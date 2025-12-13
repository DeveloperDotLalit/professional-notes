---
layout: default
title: "Estimation"
parent: "Agile Soft Skills"
nav_order: 2
---

## 1. Why we suck at estimating
Humans are optimistic. We imagine the "Happy Path".
We forget:

- Gradle build times.
- Context switching.
- Meetings.
- Random bugs.

## 2. Story Points vs Hours
**Hours**: Creating a Login Screen = 8 hours.
**Points**: Complexity relative to a baseline.

- 1 Point: Change text copy (Trivial).
- 3 Points: A standard screen with existing components.
- 5 Points: A complex screen with new logic.
- 8 Points: A scary unknown beast.

**Why Points?**
Senior Dev does "3 points" in 2 hours. Junior does it in 10 hours.
But the *Complexity* was the same.
Points allow the team to measure **Velocity** (Points burned per sprint) regardless of who does the work.

## 3. Under-Promise, Over-Deliver
**The Rule of Pi**: Take your best estimate in hours. Multiply by Pi (3.14). That's the real time.
Better to say "3 Days" and finish in 2 (Hero), than say "1 Day" and finish in 2 (Villain).
Always bake in **buffer** for Code Review and QA. Coding is only 30% of the task.

[Previous: Chapter 01 - Rituals](chapter-01-scrum-process.md) | [Next: Chapter 03 - Code Reviews](chapter-03-code-quality-reviews.md)