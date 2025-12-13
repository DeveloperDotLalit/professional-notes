# Chapter 01: OkHttp Internals

## 1. The Call Architecture
OkHttp is the engine. Retrofit is just the steering wheel.
`OkHttpClient` is efficiently designed to share resources (threads, connections) across the entire app.

### 1.1 The Dispatcher
It manages asynchronous requests.
- **maxRequests**: 64.
- **maxRequestsPerHost**: 5.
- **ExecutorService**: Unbounded thread pool (CachedThreadPool). Threads die after 60s idle.

### 1.2 The Interceptor Chain (The Onion)
Requests flow through a chain of responsibilities.
1.  **Application Interceptors**: You add these. (Logging, Headers).
2.  **RetryAndFollowUpInterceptor**: Handles 302 Redirects and Connection failures.
3.  **BridgeInterceptor**: Adds necessary headers (`gzip`, `Keep-Alive`, `Host`).
4.  **CacheInterceptor**: Checks disk cache. If fresh, returns immediately (no network).
5.  **ConnectInterceptor**: Opens the socket connection.
6.  **CallServerInterceptor**: Writes data to socket and reads response.

## 2. Connection Pooling
Handshaking (TCP + TLS) is slow (3 round trips).
OkHttp keeps connections open (`Keep-Alive`) in a `ConnectionPool`.
- **Logic**: If a request to `api.google.com` finishes, the socket isn't closed. It sits in the pool for 5 minutes.
- **Reuse**: Next request to `api.google.com` reuses the specific `RealConnection` object. Zero latency start.

## 3. Platform & TLS
OkHttp handles the dirty work of TLS implementation.
- It attempts TLS 1.3. Falls back to 1.2.
- It validates Certificates (Chain of Trust).
- It handles Certificate Pinning via `CertificatePinner`.

[Next: Chapter 02 - Retrofit Proxies](chapter-02-retrofit-proxies.md)
