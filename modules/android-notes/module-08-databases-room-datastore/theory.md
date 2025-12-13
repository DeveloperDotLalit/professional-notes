# 🎓 Theory: Persistence

## 1. Room Architecture
Room is an annotation processor wrapper around `SQLite`.
- **Compile Time Safety**: SQL syntax is checked at compile time.
- **DAO (Data Access Object)**: The interface to the DB.
- **Entities**: Defining the schema.

## 2. Relationships: The "No Object" Rule
Room does NOT allow object references in entities.
- BAD: `data class User(val pets: List<Pet>)` -> Error.
- WHY? Lazy loading issues. If UI reads `User`, should it fetch 1000 pets?
- **Solution**: POJOs (Plain Old Java Objects) with `@Relation` or simply querying the Pet table by UserId.
- **Best Practice**: Use an intermediate Data Class for UI exposure (e.g., `UserWithPets`).

## 3. Migrations
When you change the schema (add a column), SQLite needs instructions.
- **Destructive Migration**: `fallbackToDestructiveMigration()`. Wipes data. Okay for development.
- **Manual Migration**: write the SQL `ALTER TABLE...`. Required for production.

## 4. Proto DataStore vs Preferences DataStore
- **Preferences**: Like SharedPreferences but async (Coroutines). Keys-Values. No type safety beyond primitives.
- **Proto**: Uses Protocol Buffers schema. Fully type-safe objects. Fast serialization. Requires `.proto` file definition.

[< Back to Intro](intro.md) | [Next: Code Examples >](code-examples.md)
