#!/bin/bash

# Version bump (patch)
grunt bump-only:patch
# Generate new dist
grunt prod
# Commit new release tag
grunt bump-commit

# Push commits/tags to master branch on remote 'origin'
git push origin master && git push --tags origin master