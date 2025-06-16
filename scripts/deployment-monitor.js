#!/usr/bin/env node
/**
 * Deployment Monitoring Script
 * 
 * This script helps verify deployments and monitor application health.
 * It can be run manually or integrated into CI/CD pipelines.
 * 
 * Features:
 * - Deployment verification
 * - Health checks
 * - Basic performance monitoring
 * - Notification capabilities
 * 
 * Usage:
 *   node scripts/deployment-monitor.js --url=https://your-site.com --checks=health,links,performance
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=');
    acc[key] = value || true;
  }
  return acc;
}, {});

// Default configuration
const config = {
  url: args.url || process.env.DEPLOYMENT_URL || 'http://localhost:8788',
  checks: (args.checks || 'health,links').split(','),
  timeout: parseInt(args.timeout || process.env.CHECK_TIMEOUT || '30000', 10),
  retries: parseInt(args.retries || process.env.CHECK_RETRIES || '3', 10),
  retryDelay: parseInt(args.retryDelay || process.env.RETRY_DELAY || '5000', 10),
  outputFile: args.output || process.env.OUTPUT_FILE || null,
  verbose: args.verbose || process.env.VERBOSE || false,
  notifyUrl: args.notifyUrl || process.env.NOTIFY_URL || null,
  exitOnFail: args.exitOnFail !== 'false',
};

// Results storage
const results = {
  timestamp: new Date().toISOString(),
  url: config.url,
  success: true,
  checks: {},
  duration: 0,
  errors: [],
};

/**
 * Make an HTTP request with retry capability
 */
async function makeRequest(url, options = {}) {
  const parsedUrl = new URL(url);
  const client = parsedUrl.protocol === 'https:' ? https : http;
  
  const requestOptions = {
    method: options.method || 'GET',
    headers: options.headers || {
      'User-Agent': 'Deployment-Monitor/1.0',
    },
    timeout: options.timeout || config.timeout,
    ...options,
  };

  return new Promise((resolve, reject) => {
    const req = client.request(url, requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data,
          timings: {
            start: req.startTime,
            end: Date.now(),
            duration: Date.now() - req.startTime,
          },
        });
      });
    });
    
    req.startTime = Date.now();
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Request timeout after ${requestOptions.timeout}ms`));
    });
    
    req.end();
  });
}

/**
 * Retry a function with exponential backoff
 */
async function withRetry(fn, options = {}) {
  const retries = options.retries || config.retries;
  const retryDelay = options.retryDelay || config.retryDelay;
  
  let lastError;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt < retries) {
        const delay = retryDelay * Math.pow(2, attempt);
        log(`Retry ${attempt + 1}/${retries} after ${delay}ms: ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

/**
 * Log messages based on verbosity
 */
function log(message, level = 'info') {
  const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  };
  
  const verbosityLevel = config.verbose === true ? 3 : 
                         typeof config.verbose === 'string' ? levels[config.verbose] || 2 : 
                         config.verbose ? 3 : 2;
  
  if (levels[level] <= verbosityLevel) {
    const prefix = `[${new Date().toISOString()}] [${level.toUpperCase()}]`;
    console[level === 'info' ? 'log' : level](prefix, message);
  }
}

/**
 * Check if the deployment is healthy
 */
async function checkHealth() {
  const startTime = Date.now();
  log('Running health check...', 'info');
  
  try {
    // Try the main URL first
    const mainResponse = await withRetry(() => makeRequest(config.url));
    
    if (mainResponse.statusCode < 200 || mainResponse.statusCode >= 400) {
      throw new Error(`Main URL returned status code ${mainResponse.statusCode}`);
    }
    
    // Check health endpoint if it exists
    try {
      const healthUrl = new URL('/api/health', config.url).toString();
      const healthResponse = await makeRequest(healthUrl, { timeout: 5000 });
      
      if (healthResponse.statusCode !== 200) {
        log(`Health endpoint returned status ${healthResponse.statusCode}`, 'warn');
      } else {
        log('Health endpoint check passed', 'info');
      }
    } catch (error) {
      // Health endpoint might not exist, so just log a warning
      log(`Health endpoint check failed: ${error.message}`, 'warn');
    }
    
    return {
      success: true,
      duration: Date.now() - startTime,
      statusCode: mainResponse.statusCode,
    };
  } catch (error) {
    return {
      success: false,
      duration: Date.now() - startTime,
      error: error.message,
    };
  }
}

/**
 * Check for broken links on the main page
 */
async function checkLinks() {
  const startTime = Date.now();
  log('Checking for broken links...', 'info');
  
  try {
    const response = await withRetry(() => makeRequest(config.url));
    
    if (response.statusCode < 200 || response.statusCode >= 400) {
      throw new Error(`Main URL returned status code ${response.statusCode}`);
    }
    
    // Extract links from HTML
    const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/g;
    const links = [];
    let match;
    
    while ((match = linkRegex.exec(response.data)) !== null) {
      const href = match[1];
      
      // Skip anchors, javascript:, mailto:, etc.
      if (href.startsWith('#') || 
          href.startsWith('javascript:') || 
          href.startsWith('mailto:') ||
          href.startsWith('tel:')) {
        continue;
      }
      
      // Resolve relative URLs
      const resolvedUrl = new URL(href, config.url).toString();
      
      // Only check links on the same domain
      const linkUrl = new URL(resolvedUrl);
      const baseUrl = new URL(config.url);
      
      if (linkUrl.hostname === baseUrl.hostname) {
        links.push(resolvedUrl);
      }
    }
    
    log(`Found ${links.length} internal links to check`, 'info');
    
    // Check up to 10 random internal links
    const linksToCheck = links.length <= 10 ? 
                         links : 
                         links.sort(() => 0.5 - Math.random()).slice(0, 10);
    
    const linkResults = await Promise.all(
      linksToCheck.map(async (link) => {
        try {
          const linkResponse = await makeRequest(link, { 
            method: 'HEAD',
            timeout: 5000,
          });
          
          return {
            url: link,
            statusCode: linkResponse.statusCode,
            success: linkResponse.statusCode >= 200 && linkResponse.statusCode < 400,
          };
        } catch (error) {
          return {
            url: link,
            error: error.message,
            success: false,
          };
        }
      })
    );
    
    const brokenLinks = linkResults.filter(link => !link.success);
    
    return {
      success: brokenLinks.length === 0,
      duration: Date.now() - startTime,
      totalChecked: linkResults.length,
      brokenCount: brokenLinks.length,
      brokenLinks,
    };
  } catch (error) {
    return {
      success: false,
      duration: Date.now() - startTime,
      error: error.message,
    };
  }
}

/**
 * Check basic performance metrics
 */
async function checkPerformance() {
  const startTime = Date.now();
  log('Checking performance...', 'info');
  
  try {
    // Make 3 requests and calculate average response time
    const requests = [];
    
    for (let i = 0; i < 3; i++) {
      requests.push(makeRequest(config.url));
      // Add a small delay between requests
      if (i < 2) await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    const responses = await Promise.all(requests);
    
    const responseTimes = responses.map(res => res.timings.duration);
    const avgResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
    
    return {
      success: true,
      duration: Date.now() - startTime,
      avgResponseTime,
      responseTimes,
      threshold: 2000, // 2 seconds
      passesThreshold: avgResponseTime < 2000,
    };
  } catch (error) {
    return {
      success: false,
      duration: Date.now() - startTime,
      error: error.message,
    };
  }
}

/**
 * Send notification with results
 */
async function sendNotification(results) {
  if (!config.notifyUrl) return;
  
  try {
    log(`Sending notification to ${config.notifyUrl}`, 'info');
    
    await makeRequest(config.notifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deployment: {
          url: config.url,
          timestamp: results.timestamp,
          success: results.success,
          summary: `Deployment ${results.success ? 'succeeded' : 'failed'}: ${results.url}`,
          details: results,
        }
      }),
    });
    
    log('Notification sent successfully', 'info');
  } catch (error) {
    log(`Failed to send notification: ${error.message}`, 'error');
  }
}

/**
 * Save results to file
 */
function saveResults(results) {
  if (!config.outputFile) return;
  
  try {
    const outputDir = path.dirname(config.outputFile);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(
      config.outputFile,
      JSON.stringify(results, null, 2),
      'utf8'
    );
    
    log(`Results saved to ${config.outputFile}`, 'info');
  } catch (error) {
    log(`Failed to save results: ${error.message}`, 'error');
  }
}

/**
 * Run all checks
 */
async function runChecks() {
  const startTime = Date.now();
  log(`Starting deployment monitoring for ${config.url}`, 'info');
  log(`Checks to run: ${config.checks.join(', ')}`, 'info');
  
  // Run all selected checks
  if (config.checks.includes('health')) {
    results.checks.health = await checkHealth();
    if (!results.checks.health.success) {
      results.success = false;
      results.errors.push(`Health check failed: ${results.checks.health.error}`);
    }
  }
  
  if (config.checks.includes('links')) {
    results.checks.links = await checkLinks();
    if (!results.checks.links.success) {
      results.success = false;
      results.errors.push(`Links check failed: ${results.checks.links.error || `${results.checks.links.brokenCount} broken links found`}`);
    }
  }
  
  if (config.checks.includes('performance')) {
    results.checks.performance = await checkPerformance();
    if (!results.checks.performance.success) {
      results.success = false;
      results.errors.push(`Performance check failed: ${results.checks.performance.error}`);
    } else if (results.checks.performance.passesThreshold === false) {
      results.success = false;
      results.errors.push(`Performance below threshold: ${results.checks.performance.avgResponseTime}ms (threshold: ${results.checks.performance.threshold}ms)`);
    }
  }
  
  // Calculate total duration
  results.duration = Date.now() - startTime;
  
  // Print summary
  log('\n=== Deployment Monitoring Results ===', 'info');
  log(`URL: ${results.url}`, 'info');
  log(`Success: ${results.success ? 'YES' : 'NO'}`, 'info');
  log(`Duration: ${results.duration}ms`, 'info');
  
  if (results.errors.length > 0) {
    log('\nErrors:', 'error');
    results.errors.forEach(error => log(`- ${error}`, 'error'));
  }
  
  log('\nCheck Results:', 'info');
  Object.entries(results.checks).forEach(([check, result]) => {
    log(`- ${check}: ${result.success ? 'PASS' : 'FAIL'} (${result.duration}ms)`, result.success ? 'info' : 'error');
  });
  
  // Save results to file if configured
  saveResults(results);
  
  // Send notification if configured
  await sendNotification(results);
  
  // Exit with appropriate code
  if (!results.success && config.exitOnFail) {
    log('\nExiting with error code 1 due to failed checks', 'error');
    process.exit(1);
  } else {
    log('\nAll checks completed successfully', 'info');
  }
}

// Run all checks
runChecks().catch(error => {
  log(`Unhandled error: ${error.message}`, 'error');
  log(error.stack, 'debug');
  process.exit(1);
});