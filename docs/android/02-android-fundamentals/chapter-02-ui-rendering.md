---
layout: default
title: "UI Rendering"
parent: "Android Fundamentals"
nav_order: 2
---

## 1. The Rendering Hardware

- **CPU**: Calculates what to draw (Measure, Layout, Draw commands). Creates DisplayList.
- **GPU**: Rasterizes the DisplayList (Textures, Bitmaps) onto the screen.

## 2. The Loop: Choreographer & VSYNC
Your device screen refreshes at 60Hz (every 16.6ms) or 90/120Hz.
**VSYNC (Vertical Synchronization)**: The hardware pulse that says "Ready for next frame".

### 2.1 Choreographer

- `Choreographer` is a class in your app that listens to VSYNC events from SurfaceFlinger.
- When VSYNC fires:
    1.  **Input**: Handle touch events.
    2.  **Animation**: Advance value animators.
    3.  **Traversal**: Measure -> Layout -> Draw.
    4.  **Sync**: Send data to RenderThread.

## 3. The RenderThread
Introduced in Lollipop (5.0).

- **Main Thread**: "I want to draw a button at (0,0)". Generates a `RenderNode` (DisplayList). Syncs to RenderThread.
- **RenderThread**: Talks to GPU (Opengl/Vulkan).
    - Can perform animations (Ripple, Circular Reveal, Translation) *independent* of Main Thread.
    - This is why Ripples still work even if the Main Thread is frozen!

## 4. Triple Buffering
To avoid tearing (showing half-drawn frames).

1.  **Front Buffer**: What the screen is scanning right now.
2.  **Back Buffer**: What the GPU is drawing into.
3.  **Third Buffer**: If GPU is slow, and CPU is fast, CPU can start preparing the *next* frame in the Third buffer instead of waiting (Jank).

## 5. SurfaceFlinger
The System Compositor.

- It receives "Surfaces" (Buffers) from:
    - Status Bar (System UI Process).
    - Your App (App Process).
    - Navigation Bar.
- It calculates Z-order, transparency (alpha blending).
- It merges them into one final Buffer for the Display.

## 6. Overdraw
Drawing the same pixel multiple times in one frame.

- **Red Zone**: 4x overdraw.
- **Cause**: Stacked backgrounds. `windowBackground` + `layoutBackground` + `cardBackground`.
- **Optimization**: `getWindow().setBackgroundDrawable(null)` if your layout covers the whole screen.

[Previous: Chapter 01 - IPC](chapter-01-binder-ipc.md) | [Next: Chapter 03 - Handler & Looper](chapter-03-handler-looper.md)