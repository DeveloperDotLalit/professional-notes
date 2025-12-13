# Chapter 03: API Architecture & Error Handling

## 1. Modeling Network Results
Exceptions (`try-catch`) are expensive and untyped.
**Best Practice**: Sealed Classes.
```kotlin
sealed class NetworkResult<out T> {
    data class Success<T>(val data: T) : NetworkResult<T>()
    data class Error(val code: Int, val message: String) : NetworkResult<Nothing>()
    data class Exception(val e: Throwable) : NetworkResult<Nothing>()
}
```

### 1.1 The Wrapper Approach
You can create a custom `CallAdapter` that automatically converts Retrofit calls into `NetworkResult<T>` instead of throwing exceptions.
This keeps your Repository clean.
`suspend fun getUsers(): NetworkResult<List<User>>`

## 2. Versioning Strategies
- **Path Versioning**: `/v1/users`. easiest to cache.
- **Header Versioning**: `Accept: application/vnd.company.v1+json`. Cleaner URLs.
- **Query Parameter**: `/users?v=1`.

## 3. Handling 401 (Token Refresh)
The **Authenticator** API in OkHttp.
- When server returns 401.
- `Authenticator.authenticate()` is called.
- You perform a **Synchronous** call to refresh token.
- You return a *new* Request with the new token.
- OkHttp automatically retries the original request.
**Deadlock Warning**: If the refresh token call *also* returns 401, be careful not to infinite loop.

[Previous: Chapter 02 - Retrofit](chapter-02-retrofit-proxies.md) | [Next: Chapter 04 - Serialization](chapter-04-serialization.md)
