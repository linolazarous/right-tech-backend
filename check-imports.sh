#!/bin/bash

echo "🔍 Checking for import issues..."

# Find all JavaScript files
find src/ -name "*.js" -o -name "*.jsx" | while read file; do
  echo "📄 Checking: $file"
  
  # Extract imports
  grep "from ['\"]" "$file" | while read import_line; do
    if echo "$import_line" | grep -q "from './\|from '../"; then
      import_path=$(echo "$import_line" | sed -n "s/.*from ['\"]\([^'\"]*\)['\"].*/\1/p")
      
      # Resolve relative path
      dir=$(dirname "$file")
      resolved_path="$dir/$import_path"
      
      # Check if file exists
      if [ ! -f "$resolved_path" ] && [ ! -f "$resolved_path.js" ] && [ ! -f "$resolved_path.jsx" ] && [ ! -f "$resolved_path/index.js" ]; then
        echo "   ❌ MISSING: $import_path"
      else
        echo "   ✅ OK: $import_path"
      fi
    fi
  done
done

echo "✅ Import check completed!"
