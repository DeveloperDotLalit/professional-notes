# Chapter 04: UI Testing (Compose & Espresso)

## 1. Espresso (Legacy View System)
- **Synchronization**: The killer feature. Espresso waits for:
    - MessageQueue to be empty.
    - AsyncTask to finish.
    - IdlingResources to be idle.
- **IdlingResource**: If you use Coroutines or Retrofit, Espresso doesn't know you are busy. You must register a global `IdlingResource` to tell Espresso "Wait, I'm fetching network".

## 2. Compose Test Rule
Much cleaner API.
```kotlin
@get:Rule val rule = createComposeRule()

rule.setContent { MyScreen() }
rule.onNodeWithText("Hello").assertIsDisplayed()
```

### 2.1 The Semantics Tree
Compose tests interact with the **Semantics Tree**, not the UI tree.
- **UI Tree**: Box, Column, Text.
- **Semantics Tree**: Parallel tree describing "Meaning" (Label, Action, State) for Accessibility services.
- `Modifier.semantics { testTag = "LoginButton" }` allows you to find nodes uniquely.

### 2.2 Synchronization
Compose tests automatically wait for the UI to be "Idle" (Recomposition finished) via `mainClock`.
You can manually advance time via `rule.mainClock.advanceTimeBy(1000)` to test animations frame-by-frame.

[Previous: Chapter 03 - Robolectric](chapter-03-integration-robolectric.md) | [Back to Syllabus](../docs/syllabus-overview.md)
