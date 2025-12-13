# Chapter 01: SQLite Optimization

## 1. How SQLite Works
It's a library, not a server. It reads/writes directly to a file on disk.

### 1.1 B-Tree Indexing
Data is stored in Pages (4KB).
Without an Index: `SELECT * FROM users WHERE name = 'Alice'`.
- **Full Table Scan**. Reads every page. O(N).
With Index:
- **B-Tree Search**. Reads root node -> leaf node. O(log N).
**Tip**: Always index columns used in `WHERE` and `JOIN` clauses.

## 2. WAL Mode (Write-Ahead Logging)
Enabled by default in Room on API 16+.
- **Legacy (Journal)**: Locking is coarse. 1 Writer blocks All Readers.
- **WAL**:
    - Writers append to a `-wal` file.
    - Readers read from DB file + WAL file.
    - **Benefit**: Readers do not block Writers. Writers do not block Readers. Concurrency!

## 3. Query Plans
Use `EXPLAIN QUERY PLAN SELECT ...`.
It tells you if it's using an Index (`SEARCH TABLE`) or scanning (`SCAN TABLE`).
Room generates `_Impl` classes where you can see the exact SQL interaction.

[Next: Chapter 02 - Room Internals](chapter-02-room-internals.md)
