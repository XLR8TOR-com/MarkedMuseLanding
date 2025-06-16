/**
 * Monitoring and logging utilities for Cloudflare Workers deployment
 */

/**
 * Log an event to Cloudflare Workers logs
 * @param {string} level - Log level (info, warn, error)
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 */
export function logEvent(level, message, data = {}) {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    level,
    message,
    ...data,
  };
  
  // In Cloudflare Workers, console.log is sent to the Cloudflare dashboard
  console.log(JSON.stringify(logData));
  
  // For error level logs, also log to console.error for better visibility
  if (level === 'error') {
    console.error(JSON.stringify(logData));
  }
}

/**
 * Log an info event
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 */
export function logInfo(message, data = {}) {
  logEvent('info', message, data);
}

/**
 * Log a warning event
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 */
export function logWarning(message, data = {}) {
  logEvent('warn', message, data);
}

/**
 * Log an error event
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 */
export function logError(message, data = {}) {
  logEvent('error', message, data);
}

/**
 * Measure the performance of a function
 * @param {Function} fn - Function to measure
 * @param {string} name - Name of the function for logging
 * @param {Object} additionalData - Additional data to log
 * @returns {Promise<any>} - Result of the function
 */
export async function measurePerformance(fn, name, additionalData = {}) {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;
    logInfo(`Performance: ${name}`, { 
      duration_ms: duration.toFixed(2),
      ...additionalData
    });
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    logError(`Error in ${name}`, { 
      duration_ms: duration.toFixed(2),
      error: error.message,
      stack: error.stack,
      ...additionalData
    });
    throw error;
  }
}

/**
 * Create a middleware for monitoring API routes
 * @returns {Function} - Next.js API middleware
 */
export function createMonitoringMiddleware() {
  return async (req, res, next) => {
    const start = performance.now();
    const url = req.url;
    const method = req.method;
    
    // Add response listener to capture status code
    const originalEnd = res.end;
    res.end = function(...args) {
      const duration = performance.now() - start;
      logInfo('API Request', {
        url,
        method,
        status: res.statusCode,
        duration_ms: duration.toFixed(2),
      });
      return originalEnd.apply(this, args);
    };
    
    try {
      await next();
    } catch (error) {
      const duration = performance.now() - start;
      logError('API Error', {
        url,
        method,
        error: error.message,
        stack: error.stack,
        duration_ms: duration.toFixed(2),
      });
      throw error;
    }
  };
}

/**
 * Initialize error tracking
 */
export function initErrorTracking() {
  if (typeof window !== 'undefined') {
    // Browser-side error tracking
    window.addEventListener('error', (event) => {
      logError('Unhandled Error', {
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      });
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      logError('Unhandled Promise Rejection', {
        message: event.reason?.message || 'Unknown promise rejection',
        stack: event.reason?.stack,
      });
    });
  } else {
    // Server-side error tracking
    process.on('uncaughtException', (error) => {
      logError('Uncaught Exception', {
        message: error.message,
        stack: error.stack,
      });
    });
    
    process.on('unhandledRejection', (reason) => {
      logError('Unhandled Rejection', {
        message: reason?.message || 'Unknown promise rejection',
        stack: reason?.stack,
      });
    });
  }
}

export default {
  logInfo,
  logWarning,
  logError,
  measurePerformance,
  createMonitoringMiddleware,
  initErrorTracking,
};