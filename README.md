# Alfredo's blog

## This blog runs on SST, Remix and Markdown to html service I created.

## Installation

To allow autodating to the markdown I am using git hooks.

This is how you set them up.
Steps:
Navigate to Git Hooks Directory:

```sh
cd ./.git/hooks
```

Create a Pre-Commit Hook (pre-commit):

```sh

   #!/bin/bash
   for file in $(git diff --cached --name-only --diff-filter=ACM | grep '\.md$'); do
     echo "$(date +'%Y-%m-%d')" >> "$file"
     git add "$file"
   done
```

Make the Hook Executable:

```sh
   chmod +x pre-commit
```

Usage:

1. Make changes to any Markdown file.
1. Stage the changes (git add).
1. Commit (git commit).
1. The pre-commit hook appends the current date to the saved files automatically.

## Dev

```sh
npx sst dev --stage dev
```

## Deployment

```sh
npx sst deploy --stage alfredo
```
2024-11-13
