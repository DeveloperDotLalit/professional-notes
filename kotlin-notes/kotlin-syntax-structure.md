### **Notes: Kotlin Syntax and Structure**

---

#### **1. Kotlin Program Structure**
A Kotlin program consists of functions, variables, and classes organized into packages. Here's a breakdown of a typical Kotlin program structure:

```kotlin
// Package declaration (optional)
package com.example.myapp

// Import statements (optional)
import kotlin.math.*

// Main function - Entry point
fun main() {
    println("Hello, Kotlin!")
}
```

---

#### **2. Writing Your First Kotlin Program**
- **Code**:  
  ```kotlin
  fun main() {
      println("Hello, Kotlin!")
  }
  ```
- **Explanation**:
  - `fun`: Declares a function.
  - `main`: The entry point for the program.
  - `println`: Prints a message to the console.

---

#### **3. Basic Syntax**
1. **Keywords**  
   Reserved words in Kotlin cannot be used as identifiers (e.g., `val`, `fun`, `class`, `if`, etc.).

2. **Semicolons**  
   - Kotlin does not require semicolons (`;`) to terminate statements.
   - Optional but can be used for multiple statements on one line.

3. **Case Sensitivity**  
   - Kotlin is case-sensitive (`Variable` and `variable` are distinct).

4. **Code Blocks**  
   - Enclosed by curly braces `{ }`.

---

#### **4. Packages**
- Packages are used to organize code logically.
- The `package` keyword defines the package name.
- Example:
  ```kotlin
  package com.example.mypackage
  ```

---

#### **5. Comments**
- **Single-line Comment**: Starts with `//`.
  ```kotlin
  // This is a single-line comment
  ```
- **Multi-line Comment**: Enclosed in `/* */`.
  ```kotlin
  /* This is a
     multi-line comment */
  ```

---

#### **6. Identifiers**
- Names for variables, functions, and classes.
- Rules:
  - Must start with a letter or an underscore.
  - Cannot use reserved keywords.
  - Example:
    ```kotlin
    val myVariable = 10
    ```

---

#### **7. Main Function**
- Entry point for a Kotlin program.
- Structure:
  ```kotlin
  fun main() {
      // Code here
  }
  ```
- **Command-Line Arguments**:
  ```kotlin
  fun main(args: Array<String>) {
      println("First Argument: ${args[0]}")
  }
  ```

---

#### **8. Strings and String Templates**
- Strings are declared using double quotes:
  ```kotlin
  val greeting = "Hello, Kotlin!"
  ```
- String templates allow embedding expressions:
  ```kotlin
  val name = "Alice"
  println("Welcome, $name!")
  ```

---

#### **9. Printing Output**
- **`println`**: Prints a message with a newline.
- **`print`**: Prints a message without a newline.
- Example:
  ```kotlin
  println("This is Kotlin")
  print("Learning Kotlin is ")
  print("fun!")
  ```

---

#### **10. Kotlin Code Layout**
- Use proper indentation (typically 4 spaces per level).
- Example:
  ```kotlin
  fun main() {
      val a = 10
      if (a > 5) {
          println("a is greater than 5")
      }
  }
  ```

---

#### **11. Whitespace**
- Kotlin ignores extra spaces, tabs, and newlines, making code flexible.
- Example:
  ```kotlin
  val sum = 5 +
            10 // Valid
  ```

---

#### **12. Import Statements**
- Importing specific classes or entire packages:
  ```kotlin
  import kotlin.math.PI
  import kotlin.math.* // Imports all functions from kotlin.math
  ```

---

#### **13. Comments Best Practices**
- Use single-line comments for short explanations.
- Multi-line comments for detailed notes or disabling blocks of code.
