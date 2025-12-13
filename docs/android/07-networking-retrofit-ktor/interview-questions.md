---
layout: default
title: "Interview Questions"
parent: "Networking Retrofit Ktor"
nav_order: 999
---

## Section 1: OkHttp Internals

### Q3: Explain Connection Pooling internals.
**Candidate Answer:**
"Establishing a secure HTTPS connection is expensive. You have the TCP 3-way handshake (SYN, SYN-ACK, ACK), and then the TLS handshake (Key exchange, Certificate verification). Doing this for every API call adds huge latency.

OkHttp solves this with a `ConnectionPool`.
When a request finishes, OkHttp doesn't close the socket. It keeps it open (Keep-Alive) and puts it in the pool for 5 minutes.
When a new request comes in for the same host (e.g., `api.google.com`), OkHttp checks the pool. If there's an idle connection, it reuses it immediately, skipping the handshakes.
This reduces latency from ~300ms to ~50ms for subsequent calls.
It uses a Deque (Double Ended Queue) internally. If the pool is full or connections expire, it cleans them up using an LRU (Least Recently Used) policy."

### Q5: Certificate Pinning implementation.
**Candidate Answer:**
"TLS normally relies on the Chain of Trust. My phone trusts the Root CA (DigiCert), and DigiCert signs the Server's certificate.
But what if a hacker compromises a Root CA? Or installs a malicious Root Cert on the user's device? they can perform a Man-In-The-Middle attack.

Certificate Pinning adds a second layer of defense.
We hardcode the **Hash (SHA-256)** of the server's public key inside the app.
When the SSL handshake happens, OkHttp checks: 'Does the certificate presented by the server match this specific hash I have hardcoded?'
If it matches, we proceed. If it doesn't—even if the Root CA is valid—OkHttp throws an exception and kills the connection.
The risk is breakage: If the server rotates its keys and we don't update the app, the app stops working. So we usually pin the 'Backup Key' as well."

## Section 2: Retrofit

### Q8: How does `retrofit.create` work?
**Candidate Answer:**
"It utilizes a Java Core mechanism called **Dynamic Proxies** (`Proxy.newProxyInstance`).
When you call `create(Api::class.java)`, Retrofit creates a runtime object that implements your interface.
It intercepts every method call.
When you call `api.getUser("123")`, the proxy captures the method name, the arguments ("123"), and the annotations (`@GET("users/{id}")`).
It passes this info to a `ServiceMethod` parser, which applies the string replacement to build a final URL.
Then it creates an internal OkHttp `Call`.
Finally, it asks the configured `CallAdapter` (like RxJava or Coroutines adapter) to wrap that OkHttp call into the return type you expected (like `suspend fun` or `Observable`)."

### Q13: `Authenticator` vs `Interceptor` for 401.
**Candidate Answer:**
"If you get a 401 Unauthorized, you usually want to refresh the Access Token using a Refresh Token.
You *could* do this in an Interceptor, capturing the 401 and doing a sync call.
But OkHttp provides a dedicated **Authenticator** API.
The difference is that Authenticator is triggered *only* when a valid 401 response occurs.
It allows you to perform the token refresh logic.
The cool part is the return value: You return a **Request** object (the original request, but with the *new* Authorization header).
OkHttp will automatically retry the request with this new header. If it fails again, it might ask you again, allowing for a retry loop (which you must break to avoid infinity)."

[Back to Syllabus](../docs/syllabus-overview.md)