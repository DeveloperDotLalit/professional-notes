# Chapter 03: The Repository Pattern (SSoT)

## 1. Single Source of Truth (SSoT)
The Repository is the arbiter of data.
- The UI asks for data.
- The Repository decides: "Do I have it in memory? In Disk? Or do I fetch from Network?"
- The UI *never* decides this.

## 2. Caching Strategies
### 2.1 Cache-Aside
Check DB. If empty, Fetch Network inside the repo logic.
### 2.2 NetworkBoundResource (The Google Logic)
A standard algorithm:
1.  Emit `Loading` from DB.
2.  Check `shouldFetch()`.
3.  If yes:
    - Call API.
    - Save result to DB.
    - Re-emit from DB (The DB is the SSoT!).
4.  If error:
    - Emit Error.

## 3. Multiple Data Sources
`class UserRepository(val local: LocalDataSource, val remote: RemoteDataSource)`
- **Local**: DAO (Room). Fast, synchronous (mostly), limited data.
- **Remote**: Retrofit Service. Slow, async, full data.
- **Mappers**: Repository converts `NetworkUser` (JSON schema) -> `DomainUser` (Business logic) -> `LocalUser` (SQL Schema).
- **Separation**: This decoupling allows you to change the JSON field names without rewriting your SQL tables or UI code.

[Previous: Chapter 02 - DI](chapter-02-di-mechanics.md) | [Next: Chapter 04 - MVI](chapter-04-mvi-unidirectional.md)
