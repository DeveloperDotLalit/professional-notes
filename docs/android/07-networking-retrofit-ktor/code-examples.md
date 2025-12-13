---
layout: default
title: "Code Examples"
parent: "Networking Retrofit Ktor"
nav_order: 999
---

## 1. The Token Authenticator
**Goal**: Auto-refresh token on 401.

```kotlin
class TokenAuthenticator(
    private val tokenManager: TokenManager,
    private val api: AuthApi // Be careful of circular dependency!
) : Authenticator {

    override fun authenticate(route: Route?, response: Response): Request? {
        // 1. Check if we already tried to refresh (avoid infinite loop)
        if (response.responseCount > 1) {
            return null // Give up
        }

        // 2. Synchronous Token Refresh
        val newToken = runBlocking { 
            tokenManager.refreshToken() 
        }

        // 3. Retry with new token
        return if (newToken != null) {
            response.request.newBuilder()
                .header("Authorization", "Bearer $newToken")
                .build()
        } else {
            null // Logout user
        }
    }
}
```

## 2. Sealed Classes for Network Result
**Bad**: Returning nullable data or throwing exceptions to UI.
**Good**: Wrapping results.

```kotlin
sealed class NetworkResult<out T> {
    data class Success<out T>(val data: T) : NetworkResult<T>()
    data class Error(val code: Int, val message: String) : NetworkResult<Nothing>()
    object Loading : NetworkResult<Nothing>()
}

// In Repository
suspend fun getUser(): NetworkResult<User> {
    return try {
        val response = api.getUser()
        if (response.isSuccessful) {
            NetworkResult.Success(response.body()!!)
        } else {
            NetworkResult.Error(response.code(), response.message())
        }
    } catch (e: IOException) {
        NetworkResult.Error(0, "No Internet")
    }
}
```

[< Back to Theory](theory.md) | [Next: Interview Questions >](interview-questions.md)