// Comprehensive monitoring utilities

export const logError = (error, context = {}) => {
  console.error('🔴 Error:', error, 'Context:', context);
  // Add error reporting service integration here if needed
};

export const logWarning = (warning, context = {}) => {
  console.warn('🟡 Warning:', warning, 'Context:', context);
};

export const logInfo = (info, context = {}) => {
  console.log('🔵 Info:', info, 'Context:', context);
};

export const logEvent = (event, data = {}) => {
  console.log('📊 Event:', event, 'Data:', data);
};

export const logDebug = (message, data = {}) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🐛 Debug:', message, 'Data:', data);
  }
};

export const logPerformance = (operation, duration, context = {}) => {
  console.log('⏱️ Performance:', operation, `${duration}ms`, 'Context:', context);
};

export const initMonitoring = () => {
  console.log('📈 Monitoring system initialized');
  return {
    logError,
    logWarning,
    logInfo,
    logEvent,
    logDebug,
    logPerformance
  };
};

// Default export for convenience
export default {
  logError,
  logWarning,
  logInfo,
  logEvent,
  logDebug,
  logPerformance,
  initMonitoring
};
