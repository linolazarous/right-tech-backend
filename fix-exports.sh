#!/bin/bash

echo "🔧 Fixing all export issues..."

# 1. Fix monitoring.js exports
cat > src/utils/monitoring.js << 'MONITORING'
// Monitoring utilities
export const logError = (error, context = {}) => {
  console.error('Error:', error, 'Context:', context);
};

export const logWarning = (warning, context = {}) => {
  console.warn('Warning:', warning, 'Context:', context);
};

export const logInfo = (info, context = {}) => {
  console.log('Info:', info, 'Context:', context);
};

export const logEvent = (event, data = {}) => {
  console.log('Event:', event, 'Data:', data);
};

export const initMonitoring = () => {
  console.log('Monitoring initialized');
};

// Default export for backward compatibility
export default {
  logError,
  logWarning,
  logInfo,
  logEvent,
  initMonitoring
};
MONITORING

# 2. Check for other missing exports
echo "=== Checking for missing exports ==="

# Find all imports that might have missing exports
find src/ -name "*.js" -exec grep -h "from.*['\"].*\/.*['\"]" {} \; | \
  grep -o "from ['\"][^'\"]*['\"]" | \
  sed "s/from ['\"]//" | \
  sed "s/['\"]//" | \
  sort | uniq | \
  while read import_path; do
  if [[ $import_path == ./* ]] || [[ $import_path == ../* ]]; then
    # Resolve the actual file
    base_file="${import_path%.*}"
    if [ ! -f "$base_file.js" ] && [ ! -f "$base_file.jsx" ] && [ ! -f "$base_file/index.js" ]; then
      echo "❌ Missing file: $import_path"
    fi
  fi
done

# 3. Check logger.js for missing exports
if [ -f "src/utils/logger.js" ]; then
  echo "=== Checking logger.js exports ==="
  grep -q "export.*logWarning" src/utils/logger.js || echo "❌ logger.js missing logWarning export"
  grep -q "export.*logError" src/utils/logger.js || echo "❌ logger.js missing logError export"
fi

echo "✅ Export fixes completed!"
