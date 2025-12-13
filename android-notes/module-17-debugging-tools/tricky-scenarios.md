# Module 17: Tricky Debugging Scenarios

## 1. The "Heisenbug" (Race Condition)
**Scenario**: The bug happens 1% of the time. When you attach the Debugger (breakpoints), it *never* happens.
**Why**: Attaching the debugger pauses threads. This changes the timing of execution. If the bug depends on Thread A finishing before Thread B, the debugger forces synchronization, establishing order, and hiding the bug.
**Fix**:
Do NOT use Breakpoints.
Use **Timber/Logcat** with high-resolution timestamps.
Or use `Systrace` markers to visualize thread overlap without pausing execution.

## 2. Release-Only Crashes (R8/Proguard)
**Scenario**: App works in Debug. Crashes in Release with `ClassNotFoundException` or `NoSuchMethodError`.
**Why**: R8 obfuscated or stripped a class that was accessed via Reflection (e.g., Gson serialization, Retrofit).
**Fix**:
- analyze the `mapping.txt` file to de-obfuscate the stack trace.
- Check `proguard-rules.pro`. Add `@Keep` annotations to data classes used in network parsing.

## 3. ANR (Application Not Responding)
**Scenario**: The UI freezes for 5 seconds. System shows "Close App?".
**Debugging**:
- Logs: Look for "ANR in com.example.app". The system dumps the stack trace of the Main Thread at the moment of freeze.
- `traces.txt`: Retrieve `/data/anr/traces.txt` via ADB.
- **Common Cause**: Accidental DB access, SharedPreference `commit()` (sync), or heavy JSON parsing on UI thread.

## 4. The "Zombie" View
**Scenario**: `NullPointerException` regarding a View that *should* exist.
**Context**: Fragments.
**Why**: Fragments have a different lifecycle than their Views.
If you keep a reference to a `TextView` in the Fragment (not null), but the View is destroyed (`onDestroyView`), and then you try to access it (e.g., in a delayed network callback), you crash.
**Fix**: Always clear View bindings in `onDestroyView`. And check `viewLifecycleOwner.lifecycle` scope.

[Back to Syllabus](../docs/syllabus-overview.md)
