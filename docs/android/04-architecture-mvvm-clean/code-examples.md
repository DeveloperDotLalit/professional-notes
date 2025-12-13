---
layout: default
title: "Code Examples"
parent: "Architecture MVVM Clean"
nav_order: 999
---

## 1. The Domain Layer (Pure Kotlin)
```kotlin
// Domain Model
data class User(val id: String, val name: String)

// Repository Interface (Contract)
interface UserRepository {
    suspend fun getUser(id: String): User
}

// Use Case
class GetUserUseCase(private val repository: UserRepository) {
    suspend operator fun invoke(id: String): Result<User> {
        return try {
            val user = repository.getUser(id)
            if (user.name.isBlank()) {
                Result.failure(Exception("Invalid User"))
            } else {
                Result.success(user)
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
```

## 2. The Data Layer (Implementation)
```kotlin
// DTO (Network Model)
data class NetworkUser(
    @SerializedName("id_str") val id: String,
    @SerializedName("full_name") val name: String
)

// Extension Mapper
fun NetworkUser.toDomain() = User(id = this.id, name = this.name)

// Repository Implementation
class UserRepositoryImpl(
    private val api: UserApi,
    private val dao: UserDao
) : UserRepository {
    
    override suspend fun getUser(id: String): User {
        // Simple caching strategy
        val local = dao.getUser(id)
        return if (local != null) {
            local.toDomain()
        } else {
            val remote = api.fetchUser(id)
            dao.insert(remote.toEntity())
            remote.toDomain()
        }
    }
}
```

## 3. The UI Layer (ViewModel)
```kotlin
@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val getUserUseCase: GetUserUseCase
) : ViewModel() {

    private val _uiState = MutableStateFlow<UiState>(UiState.Loading)
    val uiState = _uiState.asStateFlow()

    fun loadProfile(id: String) {
        viewModelScope.launch {
            getUserUseCase(id)
                .onSuccess { user -> _uiState.value = UiState.Success(user) }
                .onFailure { _uiState.value = UiState.Error(it.message) }
        }
    }
}
```

[< Back to Theory](theory.md) | [Next: Interview Questions >](interview-questions.md)