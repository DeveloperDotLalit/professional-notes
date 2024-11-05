# Folder Structure Documentation

This document outlines the folder structure strategy for storing tutorial pages across different subjects. This structure ensures modularity, clear organization, and ease of collaboration, with each topic and subtopic arranged to allow seamless, independent contributions.

---

## Folder Overview

1. **Subjects Folders**
   - **Purpose**: Each subject (e.g., `Cpp`, `Java`, `LeetCode`) has its own top-level folder within the repository.
   - **Naming Convention**: Folders are named to represent each subject (e.g., `Cpp`, `Java`, `LeetCode`).
   - **Content**: Each folder holds subtopic folders that are organized to contain README files, which serve as notes or tutorial content for each subtopic.

2. **Subtopics Folders**
   - **Purpose**: Subfolders within each subject folder represent specific subtopics (e.g., `HashMaps`, `Arrays` for `Cpp`, `Collections` for `Java`).
   - **Naming Convention**: Use descriptive names based on each subtopic for clarity and consistency (e.g., `ForLoops`, `HashMaps`, `BinarySearch`).
   - **Content**: Each subtopic folder includes a `README.md` file, where detailed notes or explanations are stored.

3. **LeetCode Folder Structure**
   - **Purpose**: Contains daily challenges, weekly challenges, and contest-specific problem folders.
   - **Subfolders**:
     - `DailyChallenges`
     - `WeeklyChallenges`
     - `Contests`
   - **Content**: Each folder includes subfolders for specific problems, each with a `README.md` file to hold explanations or solutions.

---

## Folder Structure Visualization

The following tree structure provides a clear visual representation of the repository organization:

```
repository-root
├── Cpp
│   ├── ForLoops
│   │   └── README.md
│   ├── HashMaps
│   │   └── README.md
│   └── BinarySearch
│       └── README.md
├── Java
│   ├── OOPBasics
│   │   └── README.md
│   ├── Collections
│   │   └── README.md
│   └── Streams
│       └── README.md
├── DSA
│   ├── LinkedLists
│   │   └── README.md
│   ├── SortingAlgorithms
│   │   └── README.md
│   └── GraphTheory
│       └── README.md
└── LeetCode
    ├── DailyChallenges
    │   ├── Problem1
    │   │   └── README.md
    │   └── Problem2
    │       └── README.md
    ├── WeeklyChallenges
    │   ├── Problem1
    │   │   └── README.md
    │   └── Problem2
    │       └── README.md
    └── Contests
        ├── Contest1
        │   ├── Problem1
        │   │   └── README.md
        │   └── Problem2
        │       └── README.md
        └── Contest2
            ├── Problem1
            │   └── README.md
            └── Problem2
                └── README.md
```

---

## Folder Naming and Content Guidelines

1. **Top-Level Folders (Subjects)**
   - Each subject (e.g., `Cpp`, `Java`, `DSA`, `LeetCode`) should have its own folder at the top level.
   - This separation makes it easy for developers to locate and navigate to specific subjects.

2. **Subtopic Folders**
   - Each subtopic under a subject (e.g., `ForLoops` under `Cpp`, `OOPBasics` under `Java`) has its own folder.
   - The folder name should be concise but descriptive enough to understand the subtopic covered.
   - Each subtopic folder contains a `README.md` file where detailed content related to the subtopic is documented.

3. **LeetCode Structure**
   - For daily, weekly, and contest-based challenges, separate folders (`DailyChallenges`, `WeeklyChallenges`, `Contests`) are created within `LeetCode`.
   - Each folder contains subfolders for individual problems (e.g., `Problem1`, `Problem2`).
   - Each problem folder has its own `README.md` file to document problem descriptions, solutions, and explanations.

---

## Collaboration Tips

- **Consistent Naming**: Follow the naming conventions for new folders and files to keep the structure organized.
- **Modular Contributions**: Each developer should work on subtopics in separate folders to avoid conflicts.
- **Frequent Commits**: Commit frequently and push changes to avoid losing work and to keep a history of contributions.
- **Clear Commit Messages**: Use descriptive commit messages to make it easier for reviewers and collaborators to understand changes.

---

This folder structure is designed to facilitate efficient collaboration, easy navigation, and well-organized content across multiple subjects and subtopics. Following this structure will ensure a scalable and maintainable repository. Happy coding!
