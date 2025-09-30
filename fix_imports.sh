#!/bin/bash

echo "Starting import fix script..."

# Find all .js and .jsx files in src/
find src -type f \( -name "*.js" -o -name "*.jsx" \) | while read -r file; do
    echo "Processing $file..."

    # Use 'sed' to find and replace relative imports without extensions.
    # This uses a negative lookahead to ensure we don't change imports that already have .js, .jsx, etc.
    # It targets './[module]' and '../[module]' followed by a quote or parenthesis.
    
    # 1. Change './Component' to './Component.js'
    sed -i '' -E "s/(\.\/[a-zA-Z0-9_-]+)(['\"])/\1.js\2/g" "$file"

    # 2. Change '../Component' to '../Component.js'
    sed -i '' -E "s/(\.\.\/[a-zA-Z0-9_-]+)(['\"])/\1.js\2/g" "$file"

    # 3. Change '../../Component' to '../../Component.js'
    sed -i '' -E "s/(\.\.\/\.\.\/[a-zA-Z0-9_-]+)(['\"])/\1.js\2/g" "$file"

    # Note: The -i '' syntax works for macOS. On Linux, it's just -i.
done

echo "Script complete. Please review changes with 'git status' and 'git diff'."
