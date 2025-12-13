---
layout: default
title: "Theory"
parent: "Networking Retrofit Ktor"
nav_order: 999
---

## 1. How Retrofit Works
Retrofit is a wrapper around OkHttp.
It uses **Java Dynamic Proxies** (`Proxy.newProxyInstance`).
When you call `api.getUser()`, Retrofit intercepts the call, reads the annotations (`@GET("user")`), constructs an OkHttp Request, executes it, and converts the Response using a Factory (e.g., GsonConverterFactory).

## 2. Interceptors: The Onion Model
OkHttp requests pass through a chain of interceptors.

1.  **Application Interceptors**: Run once. Good for global headers (User-Agent).
2.  **Network Interceptors**: Run before data is sent to the wire. Can modify connection specifics. Good for Caching logic.
3.  **Server**: Processes request.
4.  Response flows back up the chain.

## 3. Token Refresh Logic
**The Challenge**: App sends request -> 401 Unauthorized -> App must refresh token -> App must retry original request.
**The Solution**: `OkHttp.Authenticator`.

- It runs *after* a response is received.
- If it returns a Request, OkHttp retries automatically.
- It runs synchronously (internally synchronized), preventing multiple refreshes.

## 4. Caching
OkHttp has a built-in LRU Cache.

- HTTP Headers `Cache-Control` determine behavior.
- Use `Cache-Control: max-stale=...` for offline reading.

[< Back to Intro](intro.md) | [Next: Code Examples >](code-examples.md)