---
layout: default
title: "Datastore Proto"
parent: "Databases Room Datastore"
nav_order: 3
---

## 1. SharedPreferences is Broken

- **Synchronous API**: `getString` works on UI thread.
- **Disk I/O**: Initial load blocks UI thread.
- **No transactional API**: `apply()` is async but fire-and-forget. `commit()` is sync.

## 2. DataStore Architecture

- **Async**: Built on Coroutines and Flow.
- **Transactional**: `updateData { ... }` is atomic. Serialized execution.
- **IO**: Moves all Disk I/O to `Dispatchers.IO`.

## 3. Preferences vs Proto

- **Preferences DataStore**: Like SharedPreferences (Key-Value). No Type safety.
- **Proto DataStore**: Uses Protocol Buffers schema (`.proto`).
    - Compiles to strongly typed classes.
    - Extremely fast serialization.
    - Safe evolution (forward/backward compatibility).

## 4. The Corruption Handler
If the file on disk is corrupted (power loss during write), DataStore allows you to plug in a `CorruptionHandler` to invoke a strategy (e.g., delete and reset to default). SharedPreferences would just crash or return garbage.

[Previous: Chapter 02 - Room](chapter-02-room-internals.md) | [Next: Chapter 04 - Migrations](chapter-04-migrations.md)