# Module 03: Jetpack Components - Interview Questions (Narrative)

## Section 1: ViewModel & Lifecycle

### Q3: `LifecycleScope` vs `ViewModelScope`.
**Candidate Answer:**
"Choosing the right scope is critical to avoid memory leaks or wasted resources.
`ViewModelScope` is tied to the `ViewModel`. It stays alive as long as the ViewModel is in memory—which means it survives configuration changes like rotation. This is the perfect place for **Data Fetching** operations. You want your network call to continue even if the user rotates the phone 3 times.

`LifecycleScope` is tied to the `Fragment` or `Activity` (the UI). It dies when the View is destroyed (`onDestroy`).
This is where you should do **UI Updates** or Flow Collection. If you collect a flow in `ViewModelScope`, it will run forever, potentially trying to update a UI that doesn't exist anymore, or wasting battery in the background.
So rule of thumb: Fetch data in `ViewModelScope`. Consume/Collect data in `LifecycleScope` (specifically using `repeatOnLifecycle`)."

### Q4: `SavedStateHandle`. How does it solve Process Death?
**Candidate Answer:**
"We often test rotation, but we forget Process Death. Android can kill your app in the background to save RAM. When the user returns, the ViewModel is *recreated* from scratch. All your variables are reset to null/default.
`SavedStateHandle` is the solution. It's essentially a Key-Value map that persists through this death, powered by the OS's `onSaveInstanceState` serialization.
Instead of holding `var query = ""` in the ViewModel class, you hold it in `handle["query"]`.
When the app restarts, the handle is pre-populated with the old value. It's essential for a production-quality app that doesn't lose user input."

## Section 2: WorkManager

### Q6: `OneTimeWorkRequest` vs `PeriodicWorkRequest`.
**Candidate Answer:**
"It sounds simple—run once vs run many times—but the constraints differ.
`OneTimeWorkRequest` is flexible. You can chain them: 'Upload Image' -> 'Compress' -> 'Share'. You can set an initial delay.
`PeriodicWorkRequest` is very restrictive by design to save battery.
First, the minimum interval is **15 minutes**. You cannot run something every 30 seconds.
Second, you cannot chain periodic work. It stands alone.
Also, the execution timing is 'inexact'. The OS might drift it by a few minutes to batch it with other jobs (Doze mode optimization)."

### Q9: `UniqueWork` policies (`REPLACE`, `KEEP`, `APPEND`).
**Candidate Answer:**
"This is about handling collisions. What if I schedule a 'Sync' job, but one is already running?
**`REPLACE`**: The nuclear option. Cancel the current running job immediately and start the new one. Good if the new job has fresher data that makes the old job obsolete.
**`KEEP`**: The polite option. If a job is running, ignore the new request completely. Good for 'Daily Sync'—if one is running, I don't need another.
**`APPEND`**: The queue option. Run the new job *after* the current one finishes. Crucially, if the first job fails, the appended job is also marked failed (cascade failure). If you want it to run regardless, use `APPEND_OR_REPLACE`."

## Section 3: Navigation

### Q11: Deep Linking: Implicit vs Explicit.
**Candidate Answer:**
"Explicit Deep Links are when *we* are in control—usually handling a Notification click. We use the `NavDeepLinkBuilder` to construct a `PendingIntent`. The cool thing is it recreates the entire back stack for us. So when the user presses back from the notification destination, they go to the 'Parent' screen, not exit the app.

Implicit Deep Links are for the outside world. We define a `<nav-graph>` URI pattern like `example.com/user/{id}`.
The OS matches this URI in the `AndroidManifest`.
When another app (like Chrome) opens this URL, Android allows the user to open our app directly to that specific destination. The Navigation component handles parsing the `{id}` placeholder and passing it as arguments to the Fragment."

### Q14: BackStack management (`popUpTo`).
**Candidate Answer:**
"By default, Navigation just pushes screens: A -> B -> C -> D.
But think of a Login flow: Login -> Home.
If the user presses Back on Home, they shouldn't go back to Login. They should exit the app.
That's where `popUpTo` comes in.
When navigating from Login to Home, we say `popUpTo(Login) { inclusive = true }`.
This tells the Controller: 'Before you go to Home, remove everything from the stack up to (and including) Login'.
So the stack becomes just [Home]. Clean and proper."

[Back to Syllabus](../docs/syllabus-overview.md)
