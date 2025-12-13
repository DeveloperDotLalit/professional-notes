---
layout: default
title: "Interview Questions"
parent: "Databases Room Datastore"
nav_order: 999
---

## Section 1: SQLite & Internals

### Q1: Explain WAL (Write-Ahead Logging) mode.
**Candidate Answer:**
"The default journal mode in SQLite is 'Delete Mode' or 'Persist Mode', where a rollback journal is used. The major limitation here is that Readers block Writers, and Writers block Readers.
If I am reading a list of users, the background thread cannot insert a new user until I finish.

WAL (Write-Ahead Logging) changes the game.
In WAL mode, changes are appended to a separate `-wal` file. They are not written to the main `.db` file immediately.
This allows **Snapshot Isolation**.
A Reader can read the main DB file (state at time T).
A Writer can append changes to the WAL file (state at T+1).
They can run **Concurrently**.
Periodically, a 'Checkpoint' operation runs (or when the WAL gets big) to merge the WAL changes back into the main DB.
Enabling WAL is the single biggest performance boost you can make for concurrent DB apps."

### Q3: `CursorWindow` limits.
**Candidate Answer:**
"Data flow between the SQLite native layer (C++) and the Java layer happens via a shared memory buffer called `CursorWindow`.
This window has a fixed size limit—historically 2MB (it used to be 1MB).
When you query the DB, SQLite fills this window with rows.
The limitations are twofold:

1.  **Row Too Big**: If a *single row* of data is larger than 2MB (say, you stored a massive high-res image Blob), it physically cannot fit in the window. The app will crash with `RowTooBigException`.
2.  **Paging Stutter**: If you have 10,000 rows, they won't all fit. As you scroll (iterate cursor), the window must be cleared and refilled from the disk. If this happens on the Main Thread, you'll see dropped frames."

## Section 2: Room Library

### Q7: `InvalidationTracker` mechanism.
**Candidate Answer:**
"One of Room's best features is the ability to observe queries (`Flow<List<User>>`). But how does it know when to emit?
Room isn't magic; it uses SQLite Triggers.
When you create the database, Room creates an `InvalidationTracker`.
For every table you observe, Room adds SQL triggers: `AFTER INSERT`, `AFTER UPDATE`, `AFTER DELETE`.
These triggers write a flag to a special tracking table in memory.
Room keeps a connection open that polls/checks this tracking table.
When a transaction commits, the tracker sees the flag, figures out which tables changed (e.g., 'UserTable'), and effectively re-runs the SELECT query for any active LiveData/Flow connected to that table.
It then emits the new results. This implies that if you update *one* user, Room re-queries the *entire* list, which can be inefficient for massive datasets."

### Q14: Proto DataStore atomicity.
**Candidate Answer:**
"SharedPreferences has a race condition. If two threads try to edit keys, last write wins, or `apply()` might overlap.
DataStore uses Coroutines and ACID guarantees.
It serializes all reads and writes onto a specific background dispatcher.
The `updateData { }` block provides a **Atomic Read-Modify-Write** cycle.
It gives you the *current* state. You transform it. You return the *new* state.
DataStore guarantees that no other write can slip in between the read and the write.
Also, it writes to a temporary file first and then performs an atomic file rename. This prevents data corruption if the phone crashes mid-write (no half-written files)."

[Back to Syllabus](../docs/syllabus-overview.md)