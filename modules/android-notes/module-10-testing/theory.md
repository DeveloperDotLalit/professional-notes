# 🎓 Theory: Modern Android Testing

## 1. Mocks vs Fakes
- **Mock**: An object where you define expected behavior dynamically (`every { repo.get() } returns ...`). Good for error boundaries.
- **Fake**: A lightweight, working implementation (`class FakeRepo : Repo { val list = mutableListOf... }`). Better for complex state and integration. **Google recommends Fakes**.

## 2. The Main Thread Problem
Unit tests run on a standard JVM (not Android). `Looper.getMainLooper()` is null.
Any code using `Dispatchers.Main` will crash.
**Solution**: Replace the Main Dispatcher with a `TestDispatcher` during tests.

## 3. Coroutine Testing (`kotlinx-coroutines-test`)
- **`runTest`**: Skips `delay()`. A 10-second delay finishes instantly.
- **`StandardTestDispatcher`**: queues coroutines. You must call `advanceUntilIdle()`.
- **`UnconfinedTestDispatcher`**: runs coroutines eagerly (immediate). simpler for most ViewModels.

## 4. UI Testing
- **Espresso**: View-based. Synchronization is automatic (waits for UI idle).
- **Compose Test Rule**: Node-based. `composeTestRule.onNodeWithText("Hi").assertIsDisplayed()`.

[< Back to Intro](intro.md) | [Next: Code Examples >](code-examples.md)
