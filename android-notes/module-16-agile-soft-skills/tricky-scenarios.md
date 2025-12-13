# Module 16: Tricky Agile Scenarios

## 1. The "Mid-Sprint Injection"
**Scenario**: Product Manager comes in on Wednesday: "This is urgent! Drop everything!"
**Response**:
Do NOT just say "Yes".
Say: "Okay, we can bring this in. **But** we are at capacity. Which existing ticket should we move out to make room?"
**Why**: This teaches Stakeholders that engineering time is a finite resource. It forces them to prioritize.

## 2. "It works on my machine"
**Scenario**: Bug cannot be reproduced by Dev, but QA sees it constantly.
**Response**:
Stop saying "It works for me".
Go to the QA's desk (or screen share). Watch them do it.
Compare environments (Debug vs Release builds, Wifi vs 4G, Staging vs Prod backend).
The bug is real; your environment is biased.

## 3. The Never-Ending Refactor
**Scenario**: A dev takes a simple ticket but decides to refactor the entire networking stack "while I'm at it".
**Result**: PR is 5000 lines. Review is impossible. QA is blocked.
**Fix**:
Separate Refactoring from Feature work.
Do the refactor in a separate PR first. Merge it. THEN do the feature.
Atomic commits preserve sanity.

## 4. Estimation Poker Peer Pressure
**Scenario**: Everyone votes "3". You think it's an "8". You feel pressure to change to "3".
**Response**:
Stick to your "8". Explain **Why**.
"I voted 8 because this touches the Legacy Payment module which has no tests."
Usually, the team will go "Oh right!" and bump their estimates up.
Dissenting voices prevent disaster.

[Back to Syllabus](../docs/syllabus-overview.md)
