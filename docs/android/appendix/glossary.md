---
layout: default
title: "Glossary"
parent: "Appendix"
nav_order: 999
---

## A

- **AAB (Android App Bundle)**: The publishing format that contains all code and resources. Google Play uses it to generate optimized APKs.
- **Activity**: The entry point for interacting with the user. Represents a single screen with a user interface.
- **ADB (Android Debug Bridge)**: Command-line tool to communicate with a device.
- **ANR (Application Not Responding)**: A system dialog shown when the UI thread is blocked for too long (>5s).

## C

- **Choreographer**: The mechanism that coordinates the timing of animations, input, and drawing.

## D

- **De-obfuscation**: Mapping obfuscated stack traces (a.b.c()) back to readable names using mapping.txt.
- **Deep Link**: A URI that links to a specific content page inside an app.

## B

- **Back Stack**: A stack where Activities/Fragments are pushed. Pressing Back pops the stack.
- **Binder**: The inter-process communication (IPC) mechanism in Android.

## C

- **Composable**: A function marked with `@Composable` that can emit UI.
- **Coroutine**: A light-weight thread. It can be suspended and resumed without blocking the underlying thread.
- **Context**: Interface to global information about an application environment.

## D

- **DAG (Directed Acyclic Graph)**: Used in Dependency Injection (Hilt/Dagger) to represent dependencies.
- **DataStore**: Jetpack library for storing data asynchronously. Replaces SharedPreferences.

## E

- **Emulator**: Software that simulates an Android device on your computer.

## F

- **Fragment**: A reusable portion of an Activity's UI. Has its own lifecycle.
- **Flow**: A cold asynchronous stream of data that emits multiple values sequentially.

## G

- **Gradle**: The build system used for Android apps.

## H

- **Hilt**: Dependency Injection library for Android (wrapper around Dagger).
- **Heap Dump**: A snapshot of the memory used by your app at a specific point in time.

## I

- **Intent**: A messaging object to request an action from another app component.

## J

- **Jetpack**: A suite of libraries to help developers follow best practices.

## K

- **Kotlin**: The primary programming language for Android development.
- **KAP (Kotlin Annotation Processing)**: The successor to KAPT/Annotation Processing.

## L

- **LiveData**: A data holder class that can be observed within a given lifecycle.
- **Lifecycle**: The state of an object (Created, Started, Resumed, etc.).
- **LeakCanary**: A memory detection library for Android.

## M

- **Manifest**: XML file describing essential information about the app (permissions, components).
- **MVVM (Model-View-ViewModel)**: Architecture pattern separating UI logic from business logic.

## O

- **Overdraw**: Drawing the same pixel multiple times in a single frame.
- **Obfuscation**: Shortening class and member names to reduce size and reverse engineering (R8).

## P

- **Proguard/R8**: Tool for code shrinking and obfuscation.

## R

- **Retrofit**: Type-safe HTTP client for Android.
- **Room**: Abstraction layer over SQLite.

## S

- **SOLID**: Five principles of Object-Oriented Design (SRP, OCP, LSP, ISP, DIP).
- **Story Point**: An abstract unit of measure for estimating the difficulty of a user story.
- **Snapshot**: In Compose, a consistent view of the state at a specific time.

## T

- **Tree Shaking**: Removing unused code during the build process (R8/Proguard).

## V

- **V-Table (Virtual Method Table)**: A lookup table of function pointers used to resolve dynamic dispatch/overriding in OOPS.
- **ViewBinding**: Generates a binding class for each XML layout file.
- **ViewModel**: Stores UI-related data that survives configuration changes.

[< Back to Syllabus](../docs/syllabus-overview.md)