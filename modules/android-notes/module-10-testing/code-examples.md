# 💻 Code Examples: Testing Patterns

## 1. Testing a ViewModel (MockK + Coroutines)
**Goal**: Verify state updates.

```kotlin
@OptIn(ExperimentalCoroutinesApi::class)
class ViewModelTest {
    private val dispatcher = StandardTestDispatcher()
    private val repo = mockk<UserRepository>()
    private lateinit var viewModel: UserViewModel

    @Before
    fun setup() {
        Dispatchers.setMain(dispatcher)
        viewModel = UserViewModel(repo)
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun `loadUser updates state to Success`() = runTest {
        // Given
        val user = User("Alice")
        coEvery { repo.fetchUser() } returns user

        // When
        viewModel.loadUser()
        advanceUntilIdle() // Wait for coroutines on StandardTestDispatcher

        // Then
        assertEquals(UiState.Success(user), viewModel.uiState.value)
    }
}
```

## 2. Testing Flows with Turbine
**Goal**: Verify a sequence of emissions.

```kotlin
@Test
fun `flow emits loading then error`() = runTest {
    repository.flow.test {
        assertEquals(Loading, awaitItem())
        assertEquals(Error("Failed"), awaitItem())
        cancelAndIgnoreRemainingEvents()
    }
}
```

## 3. Creating a Fake
**Goal**: Avoiding MockK for complex logic.

```kotlin
class FakeUserRepository : UserRepository {
    private val users = mutableMapOf<String, User>()
    var shouldFail = false

    override suspend fun getUser(id: String): User {
        if (shouldFail) throw IOException("Boom")
        return users[id] ?: throw NoSuchElementException()
    }

    fun addUser(user: User) {
        users[user.id] = user
    }
}
```

[< Back to Theory](theory.md) | [Next: Interview Questions >](interview-questions.md)
