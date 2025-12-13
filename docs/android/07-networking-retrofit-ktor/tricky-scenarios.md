---
layout: default
title: "Tricky Scenarios"
parent: "Networking Retrofit Ktor"
nav_order: 999
---

## Scenario 1: The "Concurrent Refresh" Race Condition
### The Setup
App starts. Home screen fires 3 API calls simultaneously (`/profile`, `/feed`, `/config`).
All 3 fail with 401 (Token Expired).
Without synchronization, the Authenticator runs 3 times.

1.  Call A -> 401 -> Refresh Token (Gets 'Token X') -> Retry A (Success).
2.  Call B -> 401 -> Refresh Token (Gets 'Token Y') -> Retry B.
3.  Call C -> 401 -> Refresh Token...

### The Problem
Refreshing a token usually invalidates the old one.
When Call A refreshes, it gets Token X. The server invalidates the old Refresh Token.
When Call B tries to refresh using the *old* logic, it fails because the refresh token was rotated!
**Fix**: `OkHttp.Authenticator` is synchronized on the client instance, BUT valid logic implementation is key. You should check if the existing token in `TokenManager` has changed *since* the request failed.
Pseudo-code:
```kotlin
val currentToken = tokenManager.getToken()
if (response.request.header("Authorization") != currentToken) {
    // Someone else already refreshed it! Just retry with currentToken.
    return retry(response.request, currentToken)
}
// Else, perform refresh.
```

---

## Scenario 2: Double Encoding
### The Setup
You send a URL as a query parameter.
`Retrofit`: `@Query("url") url: String`.
You manually encode it: `URLEncoder.encode("https://google.com")`.

### The Result
The server receives `https%253A%252F%252Fgoogle.com`. Double encoded!
`%` became `%25`.
**Fix**: Retrofit encodes by default. Do not manually encode unless you use `encoded = true` in the annotation.

[< Back to Interview Questions](interview-questions.md) | [**Next Module: Databases** >](../module-08-databases-room-datastore/intro.md)