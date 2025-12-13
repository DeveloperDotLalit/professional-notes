---
layout: default
title: "Intro"
parent: "Networking Retrofit Ktor"
nav_order: 999
---

## 📋 Overview
Almost every app connects to the internet. But handling slow connections, retries, authentication refresh, and caching is what separates a demo app from a production app. We primarily use **Retrofit** (backed by **OkHttp**), the industry standard.

## 🎯 Learning Objectives

1.  Implement a rock-solid **Token Refresh** mechanism using `Authenticator`.
2.  Understand the **OkHttp Interceptor Chain**.
3.  Debug connection issues using **Charles Proxy** or Chucker.
4.  Handle **Offline Mode** gracefully.

## 📚 Topics Covered

- **Retrofit**: Creating services, Converters (GSON/Moshi).
- **OkHttp**: Interceptors, Timeouts, Caching.
- **Error Handling**: Mapping HTTP codes to Domain Exceptions.
- **Ktor**: The pure-Kotlin alternative (brief overview).

---

[< Back to Syllabus](../docs/syllabus-overview.md) | [Next: Theory Deep Dive >](theory.md)