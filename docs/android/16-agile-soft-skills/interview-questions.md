---
layout: default
title: "Interview Questions"
parent: "Agile Soft Skills"
nav_order: 999
---

## Section 1: Process & Conflict

### Q1: Tell me about a time you disagreed with a Product Manager.
**Candidate Answer:**
"We were building a new Checkout flow. The PM wanted to ask for 'Date of Birth' upfront to capture user data.
I argued that adding friction at the start of the funnel would drop conversion rates significantly.
Instead of just saying 'No', I proposed an A/B test. We implemented both flows.
The data showed the 'No DOB' flow had 15% higher conversion. The PM was happy with the data, and we dropped the requirement.
I believe in using data to resolve subjective disagreements."

### Q2: How do you handle a teammate who writes poor code?
**Candidate Answer:**
"Empathy first. Nobody writes bad code on purpose.
I would stop leaving 50 comments on their PRs, which feels attacking.
Instead, I'd ask to Pair Program with them on the next ticket.
I would walk through the thought process: 'Why don't we extract this to a function so it's testable?'.
I'd also point them to our Style Guide.
If it persists, I would mention it to my Manager in a 1:1, focusing on the *impact* to the team's velocity, not attacking the person."

### Q3: You realize mid-sprint you won't make the deadline. What do you do?
**Candidate Answer:**
"Bad news must travel fast.
The worst thing to do is wait until Friday to say 'I'm not done'.
As soon as I realize—say, Tuesday—I raise a flag in Standup.
'I hit an unexpected blocker with the API. I don't think I can finish all 3 sub-tasks.'
I would propose a scope cut: 'I can deliver the UI, but the animation might have to wait for next sprint.'
This gives the PM time to manage stakeholder expectations."

## Section 2: Methodology

### Q4: Why do we use Story Points instead of Hours?
**Candidate Answer:**
"Hours bind us to a specific time, which is often wrong.
Story Points measure **Complexity** and **Uncertainty**.
A '5 point' task is always 5 points of complexity, whether a Junior does it (slowly) or a Senior does it (fast).
This allows the team to calculate a stable 'Velocity' (e.g., 40 points/sprint) that averages out individual speeds and holidays. It makes long-term planning more accurate than summing up hours."

### Q5: What is your definition of 'Legacy Code'?
**Candidate Answer:**
"To me, Legacy Code is simply **Code without Tests**.
It doesn't matter if it was written yesterday. If it has no tests, I am afraid to touch it because I don't know if I broke it.
To handle it, I don't just rewrite it blindly. I write a 'Characterization Test' first—a test that asserts the *current* behavior (even if buggy). Once I have that safety net, I can refactor it."

[Back to Syllabus](../docs/syllabus-overview.md)