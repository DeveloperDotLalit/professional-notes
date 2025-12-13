# Hashmap Notes in C

## Over View

Hash maps in C++ are incredibly useful for quickly storing and accessing data based on keys. In C++, the `unordered_map` from the Standard Template Library (STL) provides an efficient hash map. Let’s dive into its details, handling, and commonly used methods.

### Hash Maps in C++

- **Definition**: A hash map (or unordered map) is a data structure that stores key-value pairs, allowing for average constant-time complexity for insertions, deletions, and lookups.
- **Implementation in C++**: In C++, hash maps are implemented using the `unordered_map` class in the `<unordered_map>` library.

### Basic Syntax for Declaring a Hash Map

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> myMap;
    myMap["apple"] = 1;      // Insert key-value pair
    cout << myMap["apple"];  // Access value
    return 0;
}
```

### Key Characteristics of `unordered_map`

- **Unordered Structure**: Keys are hashed and placed in “buckets” based on their hash values, so elements are not stored in any particular order.
- **Unique Keys**: Each key must be unique; duplicate keys will overwrite existing values.
- **Average Complexity**: Access, insertion, and deletion operations are O(1) on average, though in the worst case, they may degrade to O(n).

### Key Methods in `unordered_map`

1. **Insertion Methods**
   - **Using Bracket Notation**: `myMap[key] = value;` adds or updates the key with a given value.
   - **Using `insert` Function**: Adds a new key-value pair.

      ```cpp
      myMap.insert({"banana", 2});
      ```

   - **Using `emplace` Function**: Similar to `insert` but faster in certain cases, as it constructs elements in place.

      ```cpp
      myMap.emplace("cherry", 3);
      ```

2. **Accessing Elements**
   - **Using Brackets** (`myMap[key]`): Directly accesses the value associated with a key. If the key doesn’t exist, it creates an entry with the default value.
   - **Using `at` Method**: Safer for access; throws an exception if the key doesn’t exist.

      ```cpp
      cout << myMap.at("banana"); // Accesses value for "banana"
      ```

3. **Checking for Key Existence**
   - **Using `count` Method**: Checks if a key exists. Returns `1` if present, `0` if not.

      ```cpp
      if (myMap.count("apple")) {
          cout << "Apple exists in the map.";
      }
      ```

   - **Using `find` Method**: Returns an iterator to the element if found or `myMap.end()` if not.

      ```cpp
      auto it = myMap.find("banana");
      if (it != myMap.end()) {
          cout << "Banana found!";
      }
      ```

4. **Deleting Elements**
   - **Using `erase`**: Removes a specific key-value pair.

      ```cpp
      myMap.erase("apple");
      ```

   - **Using `clear`**: Removes all elements from the map.

      ```cpp
      myMap.clear();
      ```

5. **Size and Capacity**
   - **`size`**: Returns the number of elements in the map.

      ```cpp
      cout << "Size: " << myMap.size();
      ```

6. **Iterating Over Elements**
   - **Using `for` Loop with Iterator**:

      ```cpp
      for (auto it = myMap.begin(); it != myMap.end(); ++it) {
          cout << it->first << ": " << it->second << endl;
      }
      ```

   - **Using Range-based `for` Loop**:

      ```cpp
      for (const auto &pair : myMap) {
          cout << pair.first << ": " << pair.second << endl;
      }
      ```

### Important Notes

- **Load Factor and Rehashing**: The load factor (`myMap.load_factor()`) determines when to rehash the map. High load factors may increase search time, so `unordered_map` automatically resizes when it gets too dense.
- **Custom Hash Functions**: Custom types require custom hash functions, defined by overloading the `hash` function.

-------
-------
-------

## Important Notes of Hashmaps

Hash maps are one of the most efficient data structures for quick data retrieval and storage, making them very useful in many programming problems.

-------

### Time Complexity of Hash Maps

1. **Average Time Complexity**:
   - **Insertion**: O(1)
   - **Search**: O(1)
   - **Deletion**: O(1)

2. **Worst-Case Time Complexity**:
   - **Insertion**: O(n)
   - **Search**: O(n)
   - **Deletion**: O(n)
   - *Reason*: In rare cases, hash functions might generate many collisions, causing all elements to fall into one bucket, degrading the complexity. However, this is uncommon if the hash function is well-designed and the load factor is kept low.

3. **Space Complexity**: O(n), where `n` is the number of elements.

-------

### Use Cases for Hash Maps

Hash maps excel in situations where fast access to data is required and are commonly used in the following scenarios:

1. **Counting Frequencies**
   - Counting occurrences of elements, like words in a text or characters in a string.
   - Example: Counting word frequencies in a sentence.

2. **Tracking Uniqueness**
   - Checking if elements are unique, such as finding duplicate elements in an array.
   - Example: Finding duplicate elements in a list or array.

3. **Implementing Caching (e.g., LRU Cache)**
   - Hash maps allow for fast data retrieval, ideal for caches where quick access is needed.
   - Example: Using hash maps in LRU (Least Recently Used) Cache implementations.

4. **Lookup Tables and Mapping Relationships**
   - Associating one type of data with another, like a dictionary or lookup table.
   - Example: Mapping user IDs to user information or settings.

5. **Efficient Search and Storage**
   - When frequent searches, insertions, and deletions are required.
   - Example: Managing database indices or symbol tables in compilers.

6. **Solving Subarray and Subsequence Problems**
   - Often used to solve problems involving subarrays, such as finding subarrays with a given sum.
   - Example: Using prefix sums with a hash map to find subarrays with a target sum in O(n) time.

-------

### How to Identify When to Use a Hash Map in Problem Solving

1. **Frequent Access or Modification Needed**:
   - When a problem requires frequent insertion, deletion, or retrieval based on keys, hash maps are typically a good choice due to their O(1) average-time complexity.

2. **Tracking Counts or Frequencies**:
   - Problems involving counting occurrences or ensuring uniqueness can often be solved with hash maps, as they provide an efficient way to keep track of counts for each element.

3. **Fast Lookup Requirements**:
   - If the problem states or implies that elements need to be accessed or checked quickly, a hash map is usually the best fit.

4. **Mapping Relationships or Connections**:
   - When elements have a one-to-one or one-to-many relationship, such as a key-value pairing, hash maps offer a straightforward solution.

5. **Unordered Data Requirements**:
   - If the order of elements does not matter, `unordered_map` is preferable over ordered data structures like `map`.

6. **Avoiding Nested Loops**:
   - Problems that seem to require nested loops for searching, counting, or looking up elements can often be optimized with hash maps, reducing time complexity from O(n²) to O(n).

-------

### Example Problem

**Problem**: Given an array of integers, find if any two numbers add up to a target sum.

**Solution Using Hash Map**:

1. Traverse the array, and for each element, calculate the difference needed to reach the target sum.
2. Use a hash map to store each element as you iterate, checking if the complement (target - current element) is already in the map.
3. If it is, you've found a pair that adds up to the target; otherwise, add the element to the map and continue.

**Complexity**: O(n) with hash map instead of O(n²) with nested loops.

-------
-------
-------

## Concepts and Questions

Certainly! Here’s a focused set of points on hash maps, especially useful for interviews, along with a list of common questions.

-------

### **Key Hash Map Concepts for Interviews**

1. **Time Complexity**:
   - Average O(1) for insertion, deletion, and search.
   - Worst-case O(n) due to hash collisions (very rare with good hashing functions).

2. **Hash Collisions**:
   - **Definition**: When two keys produce the same hash.
   - **Handling**: C++ handles collisions via separate chaining (linked lists in each bucket).

3. **Load Factor**:
   - Determines when a hash map resizes (e.g., when the load factor exceeds 1, rehashing may occur).
   - `load_factor()` returns the current load factor, while `max_load_factor()` can set it.

4. **Order of Elements**:
   - `unordered_map` does not maintain any order for elements, so use only when order isn’t required.
   - Use `map` if sorted order by keys is needed.

5. **Custom Hash Functions**:
   - You can use custom hash functions, especially for complex data types.
   - This requires defining a hash function object or specialization for `std::hash`.

6. **When to Use**:
   - Ideal for cases where fast access, counting, or lookup is essential.
   - Examples: LRU Cache, word frequencies, lookup tables.

-------

### **Top 25 Hash Map Interview Questions and Answers**

-------

#### **Basic Questions**

1. **What is a hash map?**
   - A data structure that stores key-value pairs, allowing fast retrieval of values based on unique keys.

2. **Why use a hash map?**
   - It provides constant-time average access, insertion, and deletion operations.

3. **Difference between `map` and `unordered_map` in C++?**
   - `map` is ordered (sorted by key) with O(log n) access, while `unordered_map` is unordered with average O(1) access.

4. **What is a hash collision, and how is it handled?**
   - A hash collision occurs when two keys produce the same hash. In C++, it's handled by separate chaining.

5. **What is the load factor?**
   - It is the number of elements divided by the number of buckets. If it exceeds a threshold, the hash map resizes.

-------

#### **Intermediate Questions**

6. **How does `unordered_map` handle duplicate keys?**
   - It replaces the existing value if a duplicate key is inserted.

7. **How do you check if a key exists in a hash map?**
   - Use `find` or `count`.

8. **When would you choose a hash map over an array?**
   - When there is no sequential access need and you need efficient key-based access.

9. **Can hash maps be used with complex data types as keys?**
   - Yes, but they require a custom hash function.

10. **Explain the rehashing process.**
    - Rehashing is the process of resizing the hash map when the load factor exceeds a set threshold.

-------

#### **Advanced Questions**

11. **What is the time complexity of inserting n elements into an empty hash map?**
    - Average O(n), but can be O(n²) in the worst case if excessive rehashing occurs.

12. **How can you implement a custom hash function?**
    - By creating a function object or specializing `std::hash`.

13. **Explain the difference between `find` and `operator[]` in `unordered_map`.**
    - `find` does not insert a new entry if the key isn’t found, while `operator[]` does.

14. **How do you handle concurrent access to a hash map?**
    - Use locking mechanisms or concurrent data structures like `concurrent_unordered_map` (if available).

15. **When might you use `unordered_map` over `vector`?**
    - When there’s a need for key-based access instead of index-based, especially with non-sequential keys.

-------

#### **Applied Problem-Solving Questions**

16. **How would you find the frequency of elements in an array?**
    - Traverse the array, storing each element as a key and incrementing the value in a hash map.

17. **How do you check if two strings are anagrams using a hash map?**
    - Count characters in one string and subtract for the second string; check if all values are zero.

18. **How would you implement an LRU Cache using a hash map?**
    - Use `unordered_map` for storage and a doubly-linked list to track the usage order.

19. **How can you use a hash map to find the intersection of two arrays?**
    - Store elements of one array in a hash map, then check for existence while traversing the second array.

20. **How to use a hash map to find pairs with a specific sum in an array?**
    - For each element, check if the target difference exists in the hash map.

-------

#### **Complex Problem-Solving Questions**

21. **Describe how to use a hash map to find subarrays with a given sum.**
    - Use a prefix sum hash map to store sums and find matching sums as you traverse.

22. **Explain how to use hash maps to detect cycles in a linked list.**
    - Use a hash map to store visited nodes; if a node is revisited, there’s a cycle.

23. **How would you find duplicates in an array using hash maps?**
    - Insert each element and check if it already exists before each insertion.

24. **How to use hash maps to find a majority element in an array?**
    - Count occurrences of each element and find one that exceeds half the array size.

25. **Explain a scenario where hash maps are not the best choice.**
    - Avoid hash maps when maintaining the order of elements is crucial or when hash collisions are frequent, as in specific small-range keys.

-------
-------
-------

## Practice Problems

Here is a structured list of practice problems for hash maps in C++, categorized by difficulty level, including constraints, explanations, and sample test cases. This set will help you progressively build and test your understanding of hash maps.

-------

## **Easy Problems**

### 1. **Count Character Frequencies**

- **Problem**: Given a string, count the frequency of each character.
- **Constraints**:  
  - 1 ≤ Length of string ≤ 10⁵
- **Explanation**: Use a hash map where each character is a key, and its count is the value.
- **Sample Cases**:
  - Input: `"hello"` → Output: `{ 'h': 1, 'e': 1, 'l': 2, 'o': 1 }`
  - Input: `"apple"` → Output: `{ 'a': 1, 'p': 2, 'l': 1, 'e': 1 }`
  - Input: `"aaa"` → Output: `{ 'a': 3 }`

### 2. **Check for Duplicate Elements**

- **Problem**: Check if an array contains any duplicates.
- **Constraints**:  
  - 1 ≤ Array length ≤ 10⁶
- **Explanation**: Use a hash map to store each element as a key. If a key appears twice, return `true`.
- **Sample Cases**:
  - Input: `[1, 2, 3, 4]` → Output: `false`
  - Input: `[1, 2, 3, 3, 5]` → Output: `true`

### 3. **Find Pair with Target Sum**

- **Problem**: Given an array and a target sum, determine if there’s a pair of elements that add up to the target.
- **Constraints**:  
  - 2 ≤ Array length ≤ 10⁵
  - Elements range: -10⁹ to 10⁹
- **Explanation**: Use a hash map to store the required complement for each element.
- **Sample Cases**:
  - Input: `arr = [1, 2, 3, 4], target = 6` → Output: `true` (2 + 4)
  - Input: `arr = [5, 5, 2, 8], target = 14` → Output: `false`

### 4. **Frequency of Words in a Sentence**

- **Problem**: Count occurrences of each word in a sentence.
- **Constraints**:
  - 1 ≤ Number of words ≤ 10⁵
- **Explanation**: Split words and count each word using a hash map.
- **Sample Cases**:
  - Input: `"apple banana apple"` → Output: `{ 'apple': 2, 'banana': 1 }`

### 5. **Intersection of Two Arrays**

- **Problem**: Return elements that appear in both arrays.
- **Constraints**:
  - 1 ≤ Array length ≤ 10⁵
- **Explanation**: Use a hash map to store elements of one array and check if elements from the second array are in the map.
- **Sample Cases**:
  - Input: `arr1 = [1, 2, 2, 1], arr2 = [2, 2]` → Output: `[2]`

### 6. **Group Anagrams**

- **Problem**: Group anagrams together in a list of strings.
- **Constraints**: 
  - 1 ≤ Number of strings ≤ 10⁵
- **Explanation**: Use sorted strings as keys in a hash map to group anagrams.
- **Sample Cases**:
  - Input: `["eat", "tea", "tan", "ate", "nat", "bat"]` → Output: `[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]`

### 7. **Unique Elements Count**

- **Problem**: Count distinct elements in an array.
- **Constraints**:
  - 1 ≤ Array length ≤ 10⁶
- **Explanation**: Use a hash map to store unique elements.
- **Sample Cases**:
  - Input: `[1, 2, 2, 3, 4]` → Output: `4`

-------

## **Medium Problems**

### 1. **Subarray Sum Equals K**

- **Problem**: Count the number of continuous subarrays that sum to a given `k`.
- **Constraints**:
  - 1 ≤ Array length ≤ 10⁴
- **Explanation**: Use prefix sums and a hash map to store cumulative sums.
- **Sample Cases**:
  - Input: `arr = [1, 1, 1], k = 2` → Output: `2`

### 2. **Find All Pairs with Given Difference**

- **Problem**: Find all pairs with a difference of `k`.
- **Constraints**:
  - 1 ≤ Array length ≤ 10⁴
- **Explanation**: Use a hash map to check for each element’s difference with `k`.
- **Sample Cases**:
  - Input: `arr = [1, 5, 3, 4, 2], k = 3` → Output: `{(5, 2), (4, 1)}`

### 3. **Longest Substring Without Repeating Characters**

- **Problem**: Find the length of the longest substring without repeating characters.
- **Constraints**:
  - 1 ≤ Length of string ≤ 10⁴
- **Explanation**: Use a hash map to track characters and indices.
- **Sample Cases**:
  - Input: `"abcabcbb"` → Output: `3`

### 4. **Top K Frequent Elements**

- **Problem**: Find the `k` most frequent elements in an array.
- **Constraints**:
  - 1 ≤ Array length ≤ 10⁴
- **Explanation**: Use a hash map to count occurrences and a priority queue.
- **Sample Cases**:
  - Input: `arr = [1, 1, 1, 2, 2, 3], k = 2` → Output: `[1, 2]`

### 5. **Check If a String Is Isomorphic**

- **Problem**: Check if two strings are isomorphic (characters map to each other).
- **Constraints**:
  - 1 ≤ Length of strings ≤ 10⁴
- **Explanation**: Use two hash maps for character mapping.
- **Sample Cases**:
  - Input: `s = "egg", t = "add"` → Output: `true`

-------

## **Hard Problems**

### 1. **Longest Consecutive Sequence**

- **Problem**: Find the longest consecutive sequence in an unsorted array.
- **Constraints**:
  - 1 ≤ Array length ≤ 10⁵
- **Explanation**: Use a hash map to check for consecutive numbers.
- **Sample Cases**:
  - Input: `[100, 4, 200, 1, 3, 2]` → Output: `4` (sequence: `[1, 2, 3, 4]`)

### 2. **Find All Anagrams in a String**

- **Problem**: Given a string and a pattern, find all start indices of the pattern’s anagrams in the string.
- **Constraints**:
  - 1 ≤ Length of string ≤ 10⁵
- **Explanation**: Use sliding window and hash maps for character counts.
- **Sample Cases**:
  - Input: `s = "cbaebabacd", p = "abc"` → Output: `[0, 6]`

### 3. **Minimum Window Substring**

- **Problem**: Find the minimum window substring containing all characters of a pattern.
- **Constraints**:
  - 1 ≤ Length of string ≤ 10⁵
- **Explanation**: Use sliding window and hash maps to match pattern characters.
- **Sample Cases**:
  - Input: `s = "ADOBECODEBANC", t = "ABC"` → Output: `"BANC"`

-------
-------
-------

## Sample Examples

Here are three unique hash map problems—one for each difficulty level—along with problem statements, constraints, and solutions with explanations in the code comments.

-------

## **Easy Problem: Find First Non-Repeating Character**

### **Problem Statement**

- Given a string, find the first character that does not repeat. Return its index. If all characters repeat, return -1.

### **Input and Constraints**

- **Input**: A string `s`.
- **Constraints**:
  - 1 ≤ Length of `s` ≤ 10⁵
  - `s` consists of lowercase English letters.

### **Solution**

```cpp
#include <iostream>
#include <unordered_map>
#include <string>

int firstNonRepeatingCharacter(const std::string &s) {
    std::unordered_map<char, int> charCount;  // map to store frequency of each character

    // Step 1: Count the occurrences of each character
    for (char ch : s) {
        charCount[ch]++;
    }

    // Step 2: Find the first character with a count of 1
    for (int i = 0; i < s.size(); i++) {
        if (charCount[s[i]] == 1) {  // check if current character is non-repeating
            return i;
        }
    }

    // No non-repeating character found
    return -1;
}

int main() {
    std::string s = "leetcode";
    std::cout << "Index of first non-repeating character: " << firstNonRepeatingCharacter(s) << std::endl;
    return 0;
}
```

### **Explanation**

- **Step 1**: Use a hash map to count each character’s occurrences.
- **Step 2**: Iterate through the string to find the first character with a count of 1, returning its index.
- **Time Complexity**: O(n) for both counting and searching phases, where `n` is the length of `s`.

### **Sample Cases**

- Input: `"leetcode"` → Output: `0`
- Input: `"loveleetcode"` → Output: `2`
- Input: `"aabb"` → Output: `-1`

-------

## **Medium Problem: Subarrays with Equal 0s and 1s**

### **Problem Statement**

- Given a binary array (containing only `0`s and `1`s), find the number of contiguous subarrays with an equal number of `0`s and `1`s.

### **Input and Constraints**

- **Input**: A binary array `arr`.
- **Constraints**:
  - 1 ≤ Length of `arr` ≤ 10⁵

### **Solution**

```cpp
#include <iostream>
#include <unordered_map>
#include <vector>

int countEqualZeroOneSubarrays(const std::vector<int> &arr) {
    std::unordered_map<int, int> prefixSumMap;  // map to store frequency of prefix sums
    int prefixSum = 0;  // initialize prefix sum
    int count = 0;      // count of subarrays with equal 0s and 1s

    prefixSumMap[0] = 1;  // to handle cases where prefix sum itself results in equal 0s and 1s

    for (int num : arr) {
        // Step 1: Convert 0 to -1 to balance counts of 0 and 1
        prefixSum += (num == 0) ? -1 : 1;

        // Step 2: Check if current prefixSum has been seen before
        if (prefixSumMap.find(prefixSum) != prefixSumMap.end()) {
            count += prefixSumMap[prefixSum];  // add the frequency of this prefix sum to count
        }

        // Step 3: Record the occurrence of the current prefix sum
        prefixSumMap[prefixSum]++;
    }

    return count;
}

int main() {
    std::vector<int> arr = {0, 1, 0, 1, 0, 1, 1};
    std::cout << "Number of subarrays with equal 0s and 1s: " << countEqualZeroOneSubarrays(arr) << std::endl;
    return 0;
}
```

### **Explanation**

- **Step 1**: Replace `0` with `-1` to balance `0`s and `1`s.
- **Step 2**: Use prefix sums, checking if the prefix sum has been seen before in `prefixSumMap`. If it has, increment `count` by the occurrences of that prefix sum.
- **Step 3**: Store each new prefix sum in the hash map to track its frequency.
- **Time Complexity**: O(n), where `n` is the length of `arr`.

### **Sample Cases**

- Input: `[0, 1, 0, 1, 0, 1, 1]` → Output: `9`
- Input: `[1, 1, 1, 0, 0, 0]` → Output: `9`
- Input: `[0, 0, 1, 1]` → Output: `4`

-------

## **Hard Problem: Minimum Window Substring**

### **Problem Statement**

- Given two strings `s` and `t`, return the minimum window substring of `s` that contains all characters of `t`. If there is no such substring, return an empty string `""`.

### **Input and Constraints**

- **Input**: Two strings `s` and `t`
- **Constraints**:
  - 1 ≤ Length of `s`, Length of `t` ≤ 10⁵
  - `t` contains unique characters

### **Solution**

```cpp
#include <iostream>
#include <unordered_map>
#include <string>
#include <climits>

std::string minWindowSubstring(const std::string &s, const std::string &t) {
    std::unordered_map<char, int> tFreq, windowFreq;
    
    // Step 1: Count each character in t
    for (char ch : t) tFreq[ch]++;
    
    int required = tFreq.size();  // number of unique characters required
    int left = 0, right = 0;      // sliding window boundaries
    int formed = 0;               // number of unique characters in the window that match t
    int minLength = INT_MAX;      // minimum length of valid window
    int minLeft = 0;              // start index of minimum window

    while (right < s.size()) {
        char ch = s[right];
        windowFreq[ch]++;
        
        if (tFreq.count(ch) && windowFreq[ch] == tFreq[ch]) {
            formed++;  // we have matched one required character completely
        }
        
        while (left <= right && formed == required) {
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minLeft = left;
            }

            char leftChar = s[left];
            windowFreq[leftChar]--;

            if (tFreq.count(leftChar) && windowFreq[leftChar] < tFreq[leftChar]) {
                formed--;  // one required character no longer fully matches
            }
            
            left++;
        }
        
        right++;
    }
    
    return minLength == INT_MAX ? "" : s.substr(minLeft, minLength);
}

int main() {
    std::string s = "ADOBECODEBANC", t = "ABC";
    std::cout << "Minimum window substring: " << minWindowSubstring(s, t) << std::endl;
    return 0;
}
```

### **Explanation**

- **Step 1**: Count the frequency of each character in `t` using `tFreq`.
- **Step 2**: Use a sliding window approach, expanding the `right` boundary until all characters in `t` are found.
- **Step 3**: Once the window contains all characters of `t`, contract the window by moving `left` to minimize its length.
- **Step 4**: Track the smallest window length and return it.
- **Time Complexity**: O(n), where `n` is the length of `s`, as each character is processed at most twice.

### **Sample Cases**

- Input: `s = "ADOBECODEBANC", t = "ABC"` → Output: `"BANC"`
- Input: `s = "a", t = "a"` → Output: `"a"`
- Input: `s = "a", t = "b"` → Output: `""`

-------
