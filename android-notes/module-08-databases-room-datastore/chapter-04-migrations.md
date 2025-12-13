# Chapter 04: Database Migrations

## 1. The Schema Hash
Room stores an `identity hash` in the database header.
On open, it compares `Code Schema Hash` vs `Disk Schema Hash`.
- **Match**: Open.
- **Mismatch**: Look for Migration Path.

## 2. Migration Paths
- **Automigrations** (Room 2.4+):
  ```kotlin
  @Database(version = 2, autoMigrations = [AutoMigration(from = 1, to = 2)])
  ```
  Room detects column adds/renames and generates the SQL.

- **Manual Migrations**:
  ```kotlin
  val MIGRATION_1_2 = object : Migration(1, 2) {
      override fun migrate(database: SupportSQLiteDatabase) {
          database.execSQL("ALTER TABLE User ADD COLUMN age INTEGER NOT NULL DEFAULT 0")
      }
  }
  ```

## 3. Destructive Fallback
`fallbackToDestructiveMigration()`.
If no migration path is found, Room deletes the DB files and recreates it.
**Acceptable** in Debug. **Catastrophic** in Production.

## 4. Testing Migrations
Use `MigrationTestHelper`.
1.  Helper creates DB v1.
2.  Run migration to v2.
3.  Validate schema.
**Always test migrations** in CI. It is the #1 cause of crashes on app update.

[Previous: Chapter 03 - DataStore](chapter-03-datastore-proto.md) | [Back to Syllabus](../docs/syllabus-overview.md)
