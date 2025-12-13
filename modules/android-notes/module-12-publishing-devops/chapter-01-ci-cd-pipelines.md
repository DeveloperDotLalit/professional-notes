# Chapter 01: CI/CD Pipelines (GitHub Actions)

## 1. The Workflow
Every PR should trigger:
1.  **Lint**: Code style (Detekt/Ktlint).
2.  **Unit Tests**: Fast.
3.  **Build**: Ensure it compiles.

## 2. Caching Strategy
Gradle is slow cold.
- **Cache**: Store `~/.gradle/caches` and `~/.gradle/wrapper`.
- **Key**: `runner-os-gradle-hash`.
- **Result**: Builds drop from 10m to 2m.

## 3. UI Tests in Cloud
Running Emulators in GitHub Actions (macOS runners) is expensive (hardware acceleration).
**Firebase Test Lab**:
- Build APK in CI.
- Upload to FTL.
- FTL runs tests on 50 real devices.
- FTL reports results back to PR.

[Next: Chapter 02 - App Signing](chapter-02-app-signing.md)
