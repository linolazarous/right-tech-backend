// Logger utilities with comprehensive exports
import { 
  logError, 
  logWarning, 
  logInfo, 
  logEvent, 
  logDebug,
  logPerformance 
} from './monitoring.js';

// Re-export all monitoring functions
export {
  logError,
  logWarning, 
  logInfo,
  logEvent,
  logDebug,
  logPerformance
};

// Additional logger-specific functions
export const logger = {
  error: logError,
  warn: logWarning,
  info: logInfo,
  event: logEvent,
  debug: logDebug,
  performance: logPerformance
};

export default logger;
