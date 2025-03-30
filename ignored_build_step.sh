#!/bin/bash
# https://vercel.com/guides/how-do-i-use-the-ignored-build-step-field-on-vercel#with-a-script

APP_NAME=$1

# The git branch of the commit the deployment was triggered by
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

# Build when push is on `develop` (default) branch or any other open by pull request
if [[ "$VERCEL_GIT_COMMIT_REF" == "develop" ]]; then
    echo "✅ - Build production environment!"
    # If the command exits with code 1, the build continues as normal
    npx nx-ignore ${APP_NAME}
elif [[ "$VERCEL_GIT_COMMIT_REF" == "gh-pages" ]]; then
    echo "🛑 - Skipping build phase!"
    # If the command exits with code 0, the build is immediately aborted, and the deployment state is set to CANCELED
    exit 0;
else
    # Build other preview environments on any pull request branch naming
    echo "✅ - Build preview environment!"
    npx nx-ignore ${APP_NAME}
fi
