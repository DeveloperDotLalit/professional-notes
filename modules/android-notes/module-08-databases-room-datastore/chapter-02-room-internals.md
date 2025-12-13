# Chapter 02: Room Internals

## 1. The Annotation Processor
Room validates your SQL at **Compile Time**.
It builds an `InMemorySQLiteOpenHelper` to verify queries against the schema.

## 2. InvalidationTracker (Observability)
How does `Flow<List<User>>` auto-update?
1.  **Triggers**: Room adds Database Triggers (`AFTER INSERT`, `AFTER UPDATE`, `AFTER DELETE`) to monitored tables.
2.  **Flag**: When a trigger fires, it updates a dirty flag in memory.
3.  **Runnable**: Room's `InvalidationTracker` polls these flags on a background thread.
4.  **Notify**: If table `User` is dirty, it re-runs the SELECT query for all active Observers.
**Performance**: If you update `Users` table 10 times in 10ms, Room merges the invalidations. But modifying a table monitored by complex queries can trigger heavy re-computations.

## 3. Suspend Transactions
```kotlin
@Transaction
suspend fun transfer() { ... }
```
Room uses `withTransaction(db) { ... }`.
It acquires a special threaded connection.
**Reentrancy**: Room handles nested transactions by using reference counting.

[Previous: Chapter 01 - SQLite](chapter-01-sqlite-optimization.md) | [Next: Chapter 03 - DataStore](chapter-03-datastore-proto.md)
