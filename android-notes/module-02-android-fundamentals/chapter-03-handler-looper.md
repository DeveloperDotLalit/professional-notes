# Chapter 03: The Message Loop (Handler & Looper)

## 1. The Event Loop Model
Unlike a simple `main()` that runs literal code and exits, Android is event-driven.
`public static void main()` in `ActivityThread` basically does:
```java
Looper.prepareMainLooper();
ActivityThread thread = new ActivityThread();
thread.attach(false);
Looper.loop(); // Infinite loop!
```

## 2. Components
### 2.1 MessageQueue
A Priority Queue (LinkedList) sorted by **timestamp**.
- It holds `Message` (data) or `Runnable` (executables).
- `next()`: Blocks (sleeps) if the queue is empty or next message is in future. Uses Linux `epoll` to sleep efficiently.

### 2.2 Looper
The Thread-Local wrapper.
- `loop()`:
```java
for (;;) {
    Message msg = queue.next(); // might block
    msg.target.dispatchMessage(msg); // target is the Handler
    msg.recycle();
}
```

### 2.3 Handler
The API for developers.
- **Sending**: `sendMessage`, `post(Runnable)`. Enqueues into MessageQueue.
- **Receiving**: `handleMessage()`.

## 3. Sync Barriers (The Secret Sauce)
How does the UI render immediately even if the Queue is full of junk?
**Synchronization Barrier**.
- The System can post a "Barrier" (Message with null target) to the Queue.
- When `Looper` encounters a Barrier, it **skips** all synchronous messages and looks for **Asynchronous** messages (flagged `isAsync=true`).
- **VSYNC** messages are Async. They jump the queue!
- **Danger**: If you post a barrier (reflection) and forget to remove it, you freeze the app (ANR).

## 4. IdleHandler
Interface: `queueIdle() -> Boolean`.
- Called when the queue is **Empty** or waiting for future messages.
- **Use Case**:
    - Pre-warm a cache.
    - Garbage Collection hints.
    - Load Heavy library.
    - `Activity.reportFullyDrawn()`.

[Previous: Chapter 02 - Rendering](chapter-02-ui-rendering.md) | [Next: Chapter 04 - Components](chapter-04-component-lifecycle.md)
