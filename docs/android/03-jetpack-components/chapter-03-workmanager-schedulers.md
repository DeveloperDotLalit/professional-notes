---
layout: default
title: "Workmanager Schedulers"
parent: "Jetpack Components"
nav_order: 3
---

## 1. The Unified Scheduler
Before WorkManager, we had `JobScheduler` (API 21+), `AlarmManager`, and `FirebaseJobDispatcher`.
WorkManager chooses the best implementation based on API level.

- **API 23+**: Uses `JobScheduler`.
- **Below API 23**: Uses `AlarmManager` + Broadcast Receivers.

## 2. Guaranteed Execution
WorkManager persists requests to a local **SQLite Database** (Room).
If the device reboots, WorkManager reads the DB and reschedules the jobs.
It is for **Deferrable, Guaranteed** work. Not for "Now".

## 3. Constraints & Greedy Scheduler
`setRequiresCharging(true)`.
How does it know?

- **JobScheduler**: The OS manages this. It wakes the app when constraints are met.
- **GreedyScheduler** (In-app process): WorkManager registers BroadcastReceivers for `ACTION_POWER_CONNECTED`. When it receives this, it checks the DB for pending jobs demanding power and executes them. This works only if the app process is *already* alive.

## 4. Chains (DAGs)
`beginWith(A).then(B).then([C, D])`.
WorkManager creates a dependency graph in the DB.

- **Prerequisites**: B cannot run until A's state is `SUCCEEDED`.
- **Output Merging**: `Data` passed from A is merged into B's input. `InputMerger`.
- **Failure**: If A fails, the whole chain stops (unless handling failure gracefully).

[Previous: Chapter 02 - LiveData](chapter-02-livedata-internals.md) | [Next: Chapter 04 - Navigation](chapter-04-navigation-backstack.md)