# Module 04: Architecture - Interview Questions (Narrative)

## Section 1: Clean Architecture

### Q1: Explain the Dependency Rule and why it matters.
**Candidate Answer:**
"The limit test of any architecture is: 'Can I swap the UI framework without rewriting my business logic?'.
The Dependency Rule states that source code dependencies can only point **inward**.
The inner circle is your **Domain Layer** (Entities, Use Cases). It typically contains pure Kotlin code. It knows nothing about SQL, Retrofit, or Android Views.
The outer layers (Data, UI) depend on the Domain.
This matters because it creates stability. The UI changes frequently (Material 2 to Material 3, XML to Compose). The Database might change (SQLite to Realm). But the fundamental business rules of your app ('A User must have a valid email') change rarely. By isolating the Domain, we protect our most valuable logic from the chaos of external frameworks."

### Q2: Use Cases. Just a wrapper for Repository?
**Candidate Answer:**
"It often starts that way—a `GetUsersUseCase` that just calls `repo.getUsers()`.
But the value appears as the app grows.
First, **Screaming Architecture**: When I open the 'Domain' package, I see a list of features (`LoginUser`, `TransferMoney`, `Logout`). I know exactly what this app does without reading code.
Second, **Reusability**: If `Login` is needed in multiple VMs, I reuse the UseCase logic (maybe it includes validation or analytics) instead of duplicating it in VMs.
Third, **Isolation**: I can unit test the logic of 'Transfer Money' (checking balances, calculating fees) purely without worrying about where the data comes from."

## Section 2: MVVM & MVI

### Q6: MVI vs MVVM. Why would I choose MVI?
**Candidate Answer:**
"MVVM is great, but in complex screens, it often suffers from 'State Scatter'.
You have `isLoading: LiveData`, `user: LiveData`, `error: LiveData`.
It's possible to reach inconsistent states—like `isLoading = false` but `data = null`.
**MVI (Model-View-Intent)** solves this by enforcing a **Single Source of Truth**.
You have one State Data Class: `data class ScreenState(val isLoading: Boolean, val user: User?)`.
You can only change this state through a **Reducer**. A Reducer is a pure function: it takes the Old State and an Action, and produces a New State.
This makes the app state predictable. I can replay user actions and get the exact same state. It eliminates the heuristic bugs where 'The loading spinner didn't disappear'."

### Q7: What is a "Reducer"?
**Candidate Answer:**
"Conceptually borrowed from Redux.
A Reducer is a function with the signature `(CurrentState, Action) -> NewState`.
Crucially, it must be a **Pure Function**. No side effects. No network calls.
It just calculates the next state.
For example: `reduce(state, Action.LoadSuccess(data))`.
It returns `state.copy(isLoading = false, data = data)`.
Because it's pure, it is unbelievably easy to unit test. You don't need Mocks. You just assert inputs and outputs."

## Section 3: Dependency Injection

### Q11: `@Singleton` vs `@ActivityRetainedScoped`.
**Candidate Answer:**
"`@Singleton` implies the object lives as long as the Application. It's shared globally. This is great for things like a NetworkClient or a Database.
`@ActivityRetainedScoped` (in Hilt) is special. It generally lives as long as the `ViewModel`.
It survives rotation (Activity destruction/recreation).
This is useful for dependencies that hold some state relevant to the screen flow but shouldn't persist forever, or expensive objects that you don't want to recreate on every rotation but also don't want keeping alive when the user leaves the feature."

### Q16: Single Source of Truth (SSoT).
**Candidate Answer:**
"SSoT is the principle that for any data, there is only one place in the app that is trusted to be 'correct'.
In Android, this is usually the **Database** (Room).
When we fetch from Network, we don't send it to the UI. We save it to the DB.
The UI only observes the DB.
This creates a clean loop: Network -> DB -> UI.
If we modify data (like 'Like Post'), we update the DB. The DB then emits the new list to the UI.
This prevents the bug where the user clicks 'Like', the UI updates to red, but the network fails and the backend still thinks it's unliked. With SSoT, the UI always reflects the true persisted state."

[Back to Syllabus](../docs/syllabus-overview.md)
