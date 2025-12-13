---
layout: default
title: "Code Quality Reviews"
parent: "Agile Soft Skills"
nav_order: 3
---

## 1. Writing a Reviewable PR
**The Golden Rule**: Small PRs.

- 200 lines: Reviewer finds 5 bugs.
- 2000 lines: Reviewer says "Looks good to me".
Break your features down.

**The Description**: Context is King.
Attach Screenshots/Videos (use `screenrecord`).
Explain *Why* you did this, not just *What*.
Link the Jira ticket.

## 2. Reviewing Others
**Focus on Logic, Not Style**.
Use a Linter (Ktlint) for style. Don't waste comments on "Add a space here".
**Be Kind**:

- Bad: "You broke the pattern here."
- Good: "Can we use the existing pattern here to stay consistent?"
- Questions > Statements: "What do you think about handling the null case here?"

## 3. Nitpicks
Distinguish between **Blocking** comments and **Nits** (Nitpicks).
Prefix your comment: "NIT: Variable name could be clearer."
This tells the author: "I don't insist on this, take it or leave it, don't block the merge."

[Previous: Chapter 02 - Estimation](chapter-02-estimation.md) | [Next: Chapter 04 - Career Growth](chapter-04-career-growth.md)