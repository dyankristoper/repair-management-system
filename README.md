
# Repair Management System

# Project Features
- **User Authentication**
   *Secure login for authenticated users.
   *Users can update credentials and add new users.
- **Task Management**
   *Create, duplicate, delete, and update tasks seamlessly.
   *Ensures efficient task handling for all users.
- **Adaptive Theme (Light & Dark Mode)**
   *Automatically detects system preferences and adjusts the UI accordingly.
   *Enhances user experience with a visually comfortable interface.
- **Task Filtering & Sorting**
   *Intuitive table operations for filtering and sorting tasks.
   *Enables users to quickly find and manage relevant tasks.
- **Pagination for Seamless Navigation**
   *Allows users to navigate across multiple pages effortlessly.
   *Enhances accessibility for large datasets.


# Collaboration Guidelines 

This repository is designed for building a ReactJS-based application. To maintain a smooth workflow, it is crucial that all contributors follow these guidelines. By adhering to these practices, we ensure consistency, quality, and collaboration efficiency.

## Git Workflow

We follow a Git workflow to manage our development process. This section outlines how we structure branches, commits, and pull requests.

### Branching Strategy

- **main**: This branch contains the stable, production-ready code.
- **staging**: This branch contains the latest features and bug fixes, ready for testing before being merged into `main`.
- **feature/xyz**: Each feature should be developed in its own branch based on `staging`. When working on a feature, create a branch named `feature/<feature-name>`.
- **fix/xyz**: For fixing bugs, create a branch named `bugfix/<bug-name>` from `staging`.

### Commit Messages

Commit messages should be clear, concise, and follow this format:

#### Types of commits:
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation update
- **style**: Code formatting or stylistic changes (no logic changes)
- **refactor**: Refactoring code without changing its functionality
- **test**: Adding or modifying tests
- **chore**: Miscellaneous tasks, such as build, CI configuration, or dependencies update

## Code Style and Formatting

We follow [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript) for all JavaScript-related code. This ensures that our codebase is consistent and readable across all contributors.

To enforce consistent formatting, we use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/). Please make sure to run Prettier and ESLint before committing.

You can set up Prettier and ESLint to run automatically on save in your IDE.

## Pull Requests (PRs)

- **Create a PR**: When your feature or bugfix is ready, create a pull request to merge your branch into `staging`. Provide a detailed description of the changes made in the PR.
- **PR Reviews**: All PRs must be reviewed by at least one other team member before merging.
- **PR Size**: Keep PRs small and focused on one particular task (feature, fix, etc.). Large PRs are harder to review and may slow down the process.
- **Squash Commits**: Before merging, squash your commits to keep the Git history clean.

## Code Reviews

- **Be Respectful**: Code reviews should be constructive and respectful. If you have suggestions, explain why they might improve the code.
- **Check for Functionality**: Ensure that the code works as expected and passes tests.
- **Check for Readability**: Make sure the code is easy to read and understand.
- **Request Changes**: If the code does not meet the guidelines or needs improvement, request changes. Be specific about what needs to be improved.

## Issue Management

- **Creating Issues**: If you find a bug or need to request a feature, create an issue in the [Issues](https://github.com/username/repository/issues) section.
- **Assigning Issues**: If you are working on an issue, assign it to yourself. Make sure to update the issue with your progress and when the work is complete.
- **Closing Issues**: Once the work for an issue is completed and merged, the issue should be closed.

## Environment Setup

To clone the repository to your local machine, 

```bash
  git clone <repository-url>
  cd <project-directory>
  npm install
```

After setting up the project, you can run the development server with:

```
  vite
```

## Communication

Effective communication is key to successful collaboration. Please keep the following in mind:

- **Discord**: Use the project's Slack/Discord channel for general discussions, quick questions, and issues.
- **GitHub Issues & PRs**: For detailed discussions about specific tasks, use GitHub Issues and PRs. 
- **Trello**: Be updated on the recent and up-to-date task progress on tickets added in Trello.
- **Timely Responses**: Respond to comments and reviews in a timely manner to keep the project moving forward.