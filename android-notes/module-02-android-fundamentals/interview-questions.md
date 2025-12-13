# Module 02: Android Internals - Interview Questions (Narrative)

## Section 1: OS & IPC

### Q1: Explain the `Zygote` process startup sequence.
**Candidate Answer:**
"The Zygote is fundamentally an optimization for Android's app startup time.
When you boot an Android phone, launching a fresh JVM (Dalvik/ART) for every single app effectively from scratch would be way too slow.
So, during boot, the OS starts this special process called 'Zygote'.
Zygote pre-loads the entire Android Framework—all the thousands of classes in `android.*`, the drawables, the system resources—into its own RAM. Then it sits and listens on a socket.

When you tap an app icon, the ActivityManager sends a signal to Zygote.
Zygote performs a Linux `fork()` command. This clones the process.
Because of a Linux kernel feature called **Copy-On-Write (COW)**, the child process starts almost instantly and shares the exact same memory pages as the parent Zygote initially.
So your app starts with the entire Framework already loaded in RAM, for 'free'. It only starts consuming its own memory when it writes new data. That's why Android app launch is relatively snappy."

### Q2: Why is the Binder transaction limit 1MB?
**Candidate Answer:**
"It's a guardrail for system stability.
The Binder driver effectively maps a shared memory buffer for every process for IPC (Inter-Process Communication).
The confusing part is that this buffer—typically 1MB—is not per-transaction; it's **shared across all active transactions** happening in that process at that moment.

Binder is designed for remote procedure calls (RPC)—sending commands like 'Start Activity' or 'Play Audio'. It was never meant to transport heavy data like Bitmap images.
If you try to stuff a 2MB Bitmap into an Intent, you'll crash with `TransactionTooLargeException`. And since this buffer is shared, even smaller transactions could fail if the buffer is already clogged by other background calls.
The correct way to share data is passing a pointer: a File Descriptor, a Content Provider URI, or using shared memory (Ashmem)."

### Q7: What is a Sync Barrier?
**Candidate Answer:**
"A Sync Barrier is the 'Please Do Not Disturb' sign of the MessageQueue.
Normally, the Looper processes messages sequentially: 1, 2, 3...
But sometimes, the OS needs to do something urgent, typically **Rendering a Frame** (VSYNC).
When the Choreographer requests a frame, it posts a generic Message but it also inserts a 'Sync Barrier' into the Queue.

This barrier works like a filter. The Looper sees the barrier and looks at the queue. It says: 'Okay, I am strictly ignoring all standard synchronous messages (like `post(Runnable)`). I will ONLY look for **Asynchronous** messages.'
The VSYNC frame callback is an Asynchronous message. So it skips the line, renders the frame, and then removes the barrier.
This ensures that your `handler.post` call doesn't accidentally block the UI from drawing just because it was queued 1ms earlier."

## Section 2: UI & Rendering

### Q10: Double Buffering vs Triple Buffering.
**Candidate Answer:**
"This solves the 'Jank' problem where the CPU/GPU take too long.
In a Double Buffer system, you have a Front Buffer (on screen) and Back Buffer (being drawn).
Every 16ms (VSYNC), they swap.
But what if the GPU is slow and misses the deadline? The swap can't happen. We show the old frame again (Jank).
Worse, now the CPU is blocked because it has no buffer to write to (Front is locked by display, Back is locked by slow GPU). The CPU sits idle for a whole frame, creating a bubble in the pipeline.

**Triple Buffering** adds a third buffer.
If the GPU is stuck on Buffer B, and Display is showing Buffer A, the CPU can immediately start drawing the *next* frame into Buffer C.
It smooths out these hiccups. It introduces a slight input lag (since the frame the CPU is drawing is now 2 steps behind reality), but it massively reduces visual stuttering."

### Q15: `onSaveInstanceState` payload limit.
**Candidate Answer:**
"This ties back to the Binder limit we discussed.
When you rotate the screen, the Activity destroys and recreates. The `Bundle` you save in `onSaveInstanceState` is actually sent via Binder to the `ActivityManagerService` (System Server) so it can be safely held while your process restarts.
Because it travels via Binder, it hits that 1MB wall.
I've seen crashes where developers tried to save a huge JSON string or a list of images in the state.
The rule of thumb is: Save IDs, not Data. Save the `userId`, and re-fetch the User profile from the Database or Repo when you restart. Don't try to persist the whole object graph here."

## Section 3: Architecture

### Q16: How does `ViewModel` actually survive Activity recreation?
**Candidate Answer:**
"It feels like magic, but it's just clever scoping using the `NonConfigurationInstances` class.
When an Activity is about to include destruction due to a config change (rotation), the System calls `onRetainNonConfigurationInstance()`.
The Activity captures the `ViewModelStore` (which holds your ViewModels) and passes it to this method.
The `ActivityThread` (which serves as the main entry point) holds onto this specific object in memory.
When the new Activity is instanced 100ms later, it asks the ActivityThread: 'Do you have anything for me?'
The ActivityThread hands back the stored `ViewModelStore`.
The new Activity connects to it. Since the store is the exact same object in heap memory, the ViewModels inside are exactly the same instances. No serialization involved."

[Back to Syllabus](../docs/syllabus-overview.md)
