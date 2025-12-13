---
layout: default
title: "Code Examples"
parent: "Databases Room Datastore"
nav_order: 999
---

## 1. Defining a Migration
**Scenario**: Adding a `age` column to `User` table. Version 1 -> 2.

```kotlin
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        database.execSQL("ALTER TABLE User ADD COLUMN age INTEGER NOT NULL DEFAULT 0")
    }
}

// In DatabaseBuilder:
Room.databaseBuilder(context, AppDatabase::class.java, "my-db")
    .addMigrations(MIGRATION_1_2)
    .build()
```

## 2. 1-to-Many Relationship
**Goal**: Get User with their Posts.

```kotlin
// Entities
@Entity
data class User(@PrimaryKey val userId: Long, val name: String)

@Entity
data class Post(@PrimaryKey val postId: Long, val ownerId: Long, val content: String)

// Result Class
data class UserWithPosts(
    @Embedded val user: User,
    @Relation(
        parentColumn = "userId",
        entityColumn = "ownerId"
    )
    val posts: List<Post>
)

// DAO
@Transaction // Important for atomicity!
@Query("SELECT * FROM User")
fun getUsersWithPosts(): Flow<List<UserWithPosts>>
```

## 3. DataStore (Preferences)
```kotlin
val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")

// Reading
val exampleCounterFlow: Flow<Int> = context.dataStore.data
    .map { preferences ->
        preferences[EXAMPLE_COUNTER] ?: 0
    }

// Writing
suspend fun increment() {
    context.dataStore.edit { settings ->
        val currentCounter = settings[EXAMPLE_COUNTER] ?: 0
        settings[EXAMPLE_COUNTER] = currentCounter + 1
    }
}
```

[< Back to Theory](theory.md) | [Next: Interview Questions >](interview-questions.md)