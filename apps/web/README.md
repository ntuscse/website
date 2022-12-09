# Web
NTU SCSE's main public facing website, built with Next.js.

[<img src="https://user-images.githubusercontent.com/98306554/151310855-3293e4ae-b673-40ec-adc0-5f2e56426470.svg">](https://vercel.com/?utm_source=cse-it&&utm_campaign=os)

## Tables of Content

1. [Requirements](#requirements)
2. [Getting Started](#getting-started)
3. [Storybook](#storybook)
4. [How to Contribute](#how-to-contribute)
5. [Tests](#tests)


## Requirements

- Yarn v1

<br />

## Getting Started

### Secrets

First copy the contents of `.env.example` file to a new file named `.env.local` in the same directory.  
Populate the variables in this file - ask your team lead or the IT Executive for these variables.

### Installation

At the root directory of `web`, download all the required node packages:

```bash
yarn
```

### Local Development

1. Run the local development server:

```bash
yarn dev
```

2. Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

Learn how to contribute to this project [here](#how-to-contribute).
<br />

## Storybook

### Introduction:
Storybook is a frontend workshop for building UI components and pages in isolation.
It can be used for UI development, testing, and documentation.

The basics of Storybook can be learned from https://storybook.js.org/docs/react/writing-stories/introduction

### When to use Storybook?
Stories are usually written for testing components in isolation from the main web page.

Thus, you should write stories when developing a component in the `packages/ui/components` directory.

### Starting Storybook:
Navigate to the `website/packages/ui` directory, and run:

```bash
yarn storybook
```

<br />

## How To Contribute

### Steps:

1. In the main branch, run `git pull` to get the latest changes.
2. Create a new branch by running `git checkout -b web/[task-type]/SCSE-[task_number]`. Work on your task/feature in this branch.
3. After you are done with all your changes, `git add .` and `git commit -m "commit message"` to commit your changes locally.
4. Next, run `git pull origin main --rebase` to fetch new changes in the main branch (if any). Fix merge conflicts if any.
5. Push your branch to GitHub by running `git push` or `git push --set-upstream origin [branch-name]` (if this branch does not exist on GitHub)
6. Go to this GitHub repo and make a pull request from your branch to `main` branch. Name the PR starting with `[SCSE-branch_number]` (e.g.: [SCSE-125] Add web docs).
7. Request 1 person to review your pull request, and you are done!

### Naming Conventions:

<details>
    <summary>Naming [task-type] for new branches</summary>
    <ul>
        <li>feat: A new feature</li>
        <li>fix: A bug fix</li>
        <li>docs: Documentation only changes</li>
        <li>style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)</li>
        <li>refactor: A code change that neither fixes a bug nor adds a feature</li>
        <li>perf: A code change that improves performance</li>
        <li>test: Adding missing or correcting existing tests</li>
        <li>chore: Changes to the build process or auxilliary tools and libraries such as documnetation generation</li>
        <li>revert: A revert to a previous commit</li>
    </ul>
</details>

<br />

## Tests

**1. Jest Unit Tests**

All Jest unit tests are written in the `_tests_` directory with `.tsx` directory.

To run jest unit tests, run:

```bash
yarn test
```

**Note: Snapshots need to be updated after changes have been made to the pages. This can be achieved by running:**

```bash
yarn test -u
```

<br />

**2. Cypress E2E Tests**

All Cypress tests are written in the `cypress/e2e` directory with the extension `.cy.ts`.

To begin cypress e2e test, run the following command to open the UI:

```bash
yarn cypress
```
