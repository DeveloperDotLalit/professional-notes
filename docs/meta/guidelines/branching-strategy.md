# Branching Strategy Documentation

This document outlines the branching strategy for managing code contributions and releases in our repository. This strategy ensures smooth collaboration, minimizes conflicts, and provides a clear workflow from feature development to production deployment.

---

## Branch Overview

1. **Main Branch (`main`)**
   - **Purpose**: Holds the production-ready code that is deployed to production.
   - **Access Control**: Only specific team members can merge changes to this branch.
   - **Merge Policy**: Changes are merged from the `staging` branch after final testing and approval.
   - **Usage**: Direct commits to this branch are not allowed. Pull requests (PRs) should be created only from the `staging` branch.

2. **Staging Branch (`staging`)**
   - **Purpose**: Serves as the pre-production branch for final testing and QA.
   - **Access Control**: Only approved changes from feature branches are merged here for testing.
   - **Sync with Main**: After successful testing in `staging`, changes are merged to `main`.
   - **Usage**: Only PRs from feature branches are merged into `staging`. No direct commits are allowed in this branch.

3. **Feature Branches**
   - **Purpose**: Represents major areas of work, such as specific tutorials or projects (e.g., `feature/cpp-tutorial`, `feature/java-tutorial`).
   - **Naming Convention**: Each branch should clearly indicate the topic, such as `feature/cpp-tutorial` or `feature/leetcode-questions`.
   - **Access Control**: Each team works on its assigned feature branch, keeping it organized for specific topic areas.
   - **Merge Policy**: Only the corresponding feature child branches can be merged into a feature branch.

4. **Feature Child Branches**
   - **Purpose**: Developers create child branches under feature branches to work on specific subtopics (e.g., `cpp-tutorial/for-loops`, `java-tutorial/oop-basics`).
   - **Naming Convention**: Use a clear, descriptive name for each child branch (e.g., `cpp-tutorial/for-loops`, `dsa-tutorial/binary-search`).
   - **Access Control**: These branches are created for individual developers to work on specific tasks within the feature area.
   - **Merge Policy**: PRs from child branches are merged into their respective feature branches after code review.

---

## Branching Workflow

1. **Setting Up Your Feature Child Branch**
   - **Step 1**: Ensure your local repository is updated by pulling the latest changes from the remote repository.
   - **Step 2**: Create a feature child branch based on your assigned task. The branch name should follow the naming convention for feature child branches (e.g., `cpp-tutorial/for-loops`).
   - **Command**: 
     ```bash
     git checkout -b feature-name/subtopic-name
     ```

2. **Working on Your Feature Child Branch**
   - Make all necessary changes and add your updates. 
   - Commit frequently with clear and descriptive messages.
   - **Commit Example**:
  
     ```bash
     git add .
     git commit -m "Add detailed notes on for-loops in C++ tutorial"
     ```

3. **Raising a Pull Request**
   - Push your changes to the remote feature child branch:

     ```bash
     git push origin feature-name/subtopic-name
     ```

   - Navigate to GitHub and create a Pull Request (PR) to merge your changes from the feature child branch into the relevant feature branch.
   - Follow any additional code review guidelines, tagging appropriate reviewers for approval.

4. **Merging Feature Branches to Staging**
   - Once a feature is complete and approved, raise a PR to merge the feature branch into `staging` for final testing.
   - **Important**: Ensure all automated tests are passing before merging to `staging`.

5. **Merging Staging to Main**
   - After testing in `staging`, if everything is verified, create a PR to merge changes from `staging` into `main`.
   - **Note**: Only authorized team members can approve and merge PRs into `main`.

---

## Naming Conventions

Use the following naming conventions to maintain consistency:

- **Feature Branches**: `feature/topic-name`  
  - Examples: `feature/cpp-tutorial`, `feature/java-tutorial`

- **Feature Child Branches**: `topic-name/subtopic-name`
  - Examples: `cpp-tutorial/for-loops`, `dsa-tutorial/binary-search`

---

## Branching Policies

1. **Direct Commits**: No direct commits are allowed on `main` or `staging` branches.
2. **Code Review**: All PRs must be reviewed and approved before merging.
3. **Automated Testing**: Set up CI/CD to run automated tests on `staging` and feature branches.
4. **Branch Protection Rules**: Enable branch protection rules for `main` and `staging` branches to enforce the following:
   - Require pull requests before merging.
   - Require code reviews and approvals.
   - Require passing status checks before merging.

---

## Branch Structure Visualization

To help clarify this branching structure, here is the visual tree of branches:

```bash

main (prod deployment branch)
└── staging (pre-prod branch)
    ├── feature/cpp-tutorial
    │   ├── cpp-tutorial/for-loops
    │   ├── cpp-tutorial/hash-maps
    │   └── cpp-tutorial/binary-search
    ├── feature/java-tutorial
    │   ├── java-tutorial/oop-basics
    │   ├── java-tutorial/collections
    │   └── java-tutorial/streams
    ├── feature/dsa-tutorial
    │   ├── dsa-tutorial/linked-lists
    │   ├── dsa-tutorial/sorting-algorithms
    │   └── dsa-tutorial/graph-theory
    └── feature/leetcode-questions
        ├── leetcode-questions/array-problems
        ├── leetcode-questions/string-manipulation
        └── leetcode-questions/dynamic-programming
```

---

## Collaboration Tips

- **Frequent Pulls**: Regularly pull updates from `staging` and feature branches to avoid merge conflicts.
- **Small, Frequent Commits**: Make incremental updates and commit frequently to improve traceability and simplify code reviews.
- **Clear Commit Messages**: Use descriptive commit messages to make changes easy to understand and review.

---

This branching strategy will help maintain a clean codebase, enable effective collaboration, and support a smooth release process from development to production. Happy coding!
