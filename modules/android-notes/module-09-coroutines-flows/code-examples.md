# 💻 Code Examples: Advanced Concurrency

## 1. The Mutex-Protected Cache
**Goal**: Prevent "Dogpile Effect" - multiple threads hitting network for same key simultaneously.

```kotlin
class RateLimiter {
    private val mutex = Mutex()
    private var lastFetch = 0L
    private var cache: Data? = null

    suspend fun getData(): Data {
        mutex.withLock {
            // Double-check locking pattern in Coroutines
            if (System.currentTimeMillis() - lastFetch < 5000 && cache != null) {
                return cache!!
            }
            val newData = api.fetch()
            cache = newData
            lastFetch = System.currentTimeMillis()
            return newData
        }
    }
}
```

## 2. Parallel Map using `flatMapMerge`
**Goal**: Upload 10 images in parallel, but limit concurrency to 3 at a time.

```kotlin
suspend fun uploadImages(uris: List<Uri>) {
    uris.asFlow()
        .map { uri ->
            // Wrap in object to hold context if needed
            uri
        }
        .flatMapMerge(concurrency = 3) { uri ->
            flow {
                emit(api.upload(uri))
            }.catch { e ->
                emit(null) // Handle error per file
            }
        }
        .collect { result ->
            // Process results as they finish
        }
}
```

## 3. Selecting on Channels
**Goal**: Race two data sources, take first winner.

```kotlin
suspend fun race(): String = select {
    // Assuming source1 and source2 are ReceiveChannel
    source1.onReceive { result ->
        "Source 1 won: $result"
    }
    source2.onReceive { result ->
        "Source 2 won: $result"
    }
    onTimeout(1000) {
        "Both too slow"
    }
}
```

[< Back to Theory](theory.md) | [Next: Interview Questions >](interview-questions.md)
