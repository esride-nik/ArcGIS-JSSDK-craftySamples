#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Create symlinks for all hooks
for hook in "$REPO_ROOT"/.githooks/*; do
    if [ -f "$hook" ]; then
        # Get the hook name without path
        hook_name=$(basename "$hook")
        # Create symlink in .git/hooks
        ln -sf "../../.githooks/$hook_name" "$REPO_ROOT/.git/hooks/$hook_name"
        # Make the original hook executable
        chmod +x "$hook"
        echo "✓ Installed hook: $hook_name"
    fi
done

echo "Git hooks installation complete!"