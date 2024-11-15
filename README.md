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

# Iterate over all staged Markdown files
for file in $(git diff --cached --name-only --diff-filter=ACM | grep '\.md$'); do
  # Check if the file already contains a date in YYYY-MM-DD format
  if ! grep -qE '[0-9]{4}-[0-9]{2}-[0-9]{2}$' "$file"; then
    # Append the current date with a line break to the file
    echo -e "<br />\n$(date +'%Y-%m-%d')" >> "$file"
    # Add the modified file back to the staging area
    git add "$file"
  fi
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
