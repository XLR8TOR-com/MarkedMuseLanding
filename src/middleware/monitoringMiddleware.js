/**
 * API Monitoring Middleware for Next.js
 * 
 * This middleware automatically wraps API handlers with monitoring functionality:
 * - Performance measurement for all API requests
 * - Structured logging of request details
 * - Error tracking and reporting
 * - Response time monitoring
 */

import { logInfo, logError, measurePerformance } from '../utils/monitoring';

/**
 * Wraps a Next.js API handler with monitoring functionality
 * 
 * @param {Function} handler - The original API route handler
 * @returns {Function} - The wrapped handler with monitoring
 */
export function withMonitoring(handler) {
  return async (req, res) => {
    const startTime = Date.now();
    const requestId = crypto.randomUUID();
    const method = req.method;
    const url = req.url;
    const userAgent = req.headers['user-agent'] || 'unknown';
    
    // Add request ID to response headers for traceability
    res.setHeader('X-Request-ID', requestId);
    
    // Log the incoming request
    logInfo('API Request', {
      requestId,
      method,
      url,
      userAgent,
      query: req.query,
      // Don't log sensitive body data, or selectively log non-sensitive fields
      // body: req.body
    });
    
    try {
      // Measure the performance of the handler execution
      await measurePerformance(
        async () => {
          await handler(req, res);
        },
        'api-handler',
        { requestId, method, url }
      );
      
      // Calculate response time
      const responseTime = Date.now() - startTime;
      
      // Log successful response
      logInfo('API Response', {
        requestId,
        method,
        url,
        statusCode: res.statusCode,
        responseTime,
      });
      
    } catch (error) {
      // Calculate response time even for errors
      const responseTime = Date.now() - startTime;
      
      // Log the error
      logError('API Error', {
        requestId,
        method,
        url,
        error: error.message,
        stack: error.stack,
        responseTime,
      });
      
      // If headers haven't been sent yet, send an error response
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Internal Server Error',
          requestId, // Include request ID for troubleshooting
        });
      }
      
      // Re-throw the error for potential upstream handling
      throw error;
    }
  };
}

/**
 * Example usage in an API route:
 * 
 * // pages/api/example.js
 * import { withMonitoring } from '@/middleware/monitoringMiddleware';
 * 
 * async function handler(req, res) {
 *   // Your API logic here
 *   res.status(200).json({ success: true });
 * }
 * 
 * export default withMonitoring(handler);
 */