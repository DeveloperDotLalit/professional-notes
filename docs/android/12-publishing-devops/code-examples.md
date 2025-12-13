---
layout: default
title: "Code Examples"
parent: "Publishing Devops"
nav_order: 999
---

## 1. GitHub Actions Workflow
`.github/workflows/android.yml`

```yaml
name: Android CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
        cache: gradle

    - name: Grant execute permission for gradlew
      run: chmod +x gradlew

    - name: Build with Gradle
      run: ./gradlew build

    - name: Run Unit Tests
      run: ./gradlew testDebugUnitTest
```

## 2. Auto-Versioning in Gradle
`build.gradle.kts`:

```kotlin
def major = 1
def minor = 2
def patch = 0
def buildNumber = System.getenv("BUILD_NUMBER")?.toInteger() ?: 0

android {
    defaultConfig {
        versionCode = major * 10000 + minor * 100 + patch
        versionName = "$major.$minor.$patch ($buildNumber)"
    }
}
```

## 3. Signing Config (Securely)
**Never** commit passwords to Git. Use `local.properties` (ignored) or Environment Variables.

```kotlin
signingConfigs {
    create("release") {
        storeFile = file(System.getenv("KEYSTORE_PATH"))
        storePassword = System.getenv("KEYSTORE_PASSWORD")
        keyAlias = System.getenv("KEY_ALIAS")
        keyPassword = System.getenv("KEY_PASSWORD")
    }
}
```

[< Back to Theory](theory.md) | [Next: Interview Questions >](interview-questions.md)