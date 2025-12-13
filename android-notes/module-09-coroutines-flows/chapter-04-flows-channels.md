# Chapter 04: Flows & Channels

## 1. Flow vs Channel
- **Channel**: Hot. A blocking queue. Sender and Receiver synchronize. If no one receives, Sender suspends (buffer full). Data exists regardless of subscribers.
- **Flow**: Cold. A blueprint. The code inside `flow { ... }` runs *only* when `collect()` is called. It runs *for every* collector independently.

## 2. Backpressure
In RxJava, backpressure was hard (request(n)).
In Flow, backpressure is **implicit** via Suspension.

### 2.1 The Mechanism
Emitter:
```kotlin
emit(1) // suspends if collector is busy!
emit(2)
```

Collector:
```kotlin
collect {
    delay(1000) // Takes a long time
}
```
Because `emit` is a suspend function, and `collect` invokes the block directly (fused), if the collector delays, the emitter effectively delays.
**No buffer by default**. They handshake on every element.

### 2.2 Buffering
`flow.buffer()` introduces a `Channel` in between.
- Emitter runs in Coroutine A (Producer).
- Channel buffer stores items.
- Collector runs in Coroutine B (Consumer).
Now `emit` only suspends if Channel is full.

## 3. Flow Context Preservation
"Context Preservation" is the invariant that Flow execution context is determined by the collector, unless `flowOn` is used.

```kotlin
flow {
    emit(1) // Runs on context of collector
}
```

### 3.1 flowOn
```kotlin
flow {
    // Runs on IO
    emit(1)
}.flowOn(Dispatchers.IO)
 .collect { 
    // Runs on Main
 }
```
`flowOn` creates a `ChannelCoroutine`. It splits the execution. Everything *above* `flowOn` runs in the specified dispatcher.

## 4. Channels Deep Dive
Channels are essentially semantic BlockingQueues using Competing Consumers logic.
- **Rendezvous** (Capacity 0): Sender waits for Receiver.
- **Buffered** (Capacity N): Array-backed.
- **Conflated**: Keeps only last.
- **LinkedList**: Infinite (Dangerous).

### 4.1 "Fan-Out" architecture
```kotlin
val channel = produce { ... }
repeat(5) { launch(Dispatchers.Default) { channel.consumeEach { ... } } }
```
Multiple coroutines consuming from one channel. Safe distribution of work. "First one to wake up takes the item".

[Previous: Chapter 03 - Structured Concurrency](chapter-03-structured-concurrency.md) | [Back to Syllabus](../docs/syllabus-overview.md)
