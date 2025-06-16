#!/usr/bin/env node

/**
 * Cloudflare Workers Deployment Rollback Script
 * 
 * This script provides functionality to roll back a Cloudflare Workers deployment
 * to a previous version when issues are detected. It can be run manually or
 * integrated into CI/CD pipelines as a safety mechanism.
 * 
 * Features:
 * - Roll back to a specific version or the previous version
 * - Verify rollback success using the deployment monitor
 * - Notify relevant parties about the rollback
 * - Detailed logging of the rollback process
 * 
 * Usage:
 *   node scripts/rollback.js [options]
 * 
 * Options:
 *   --version=<version>    Specific version to roll back to (default: previous version)
 *   --environment=<env>    Environment to roll back (default: production)
 *   --verify               Run verification checks after rollback
 *   --notify=<url>         Webhook URL to notify about rollback
 *   --reason=<reason>      Reason for rollback (for documentation)
 *   --force                Skip confirmation prompt
 */

const { execSync } = require('child_process');
const { program } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Import the deployment monitor for verification
const deploymentMonitor = require('./deployment-monitor');

// Configure CLI options
program
  .option('--version <version>', 'Specific version to roll back to (default: previous version)')
  .option('--environment <env>', 'Environment to roll back', 'production')
  .option('--verify', 'Run verification checks after rollback')
  .option('--notify <url>', 'Webhook URL to notify about rollback')
  .option('--reason <reason>', 'Reason for rollback (for documentation)')
  .option('--force', 'Skip confirmation prompt')
  .parse(process.argv);

const options = program.opts();

// Get the project configuration
function getProjectConfig() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'));
    const wranglerConfig = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'wrangler.jsonc'), 'utf8'));
    
    return {
      name: packageJson.name || 'unknown',
      version: packageJson.version || '0.0.0',
      workerName: wranglerConfig.name || packageJson.name,
      accountId: wranglerConfig.account_id || process.env.CLOUDFLARE_ACCOUNT_ID,
      deploymentUrl: wranglerConfig.route || process.env.DEPLOYMENT_URL || null
    };
  } catch (error) {
    console.error(chalk.red('Error reading project configuration:'), error.message);
    process.exit(1);
  }
}

// Get available versions from Cloudflare
async function getAvailableVersions(config) {
  console.log(chalk.blue('Fetching available versions from Cloudflare...'));
  
  try {
    // Use wrangler to list versions
    const result = execSync(`npx wrangler versions list --name=${config.workerName}`, { encoding: 'utf8' });
    
    // Parse the versions from the output
    const versions = result
      .split('\n')
      .filter(line => line.includes('│'))
      .filter(line => !line.includes('Tag') && !line.includes('─'))
      .map(line => {
        const parts = line.split('│').map(part => part.trim());
        if (parts.length >= 4) {
          return {
            id: parts[1],
            tag: parts[2] || null,
            date: parts[3] || null
          };
        }
        return null;
      })
      .filter(Boolean);
    
    return versions;
  } catch (error) {
    console.error(chalk.red('Error fetching versions:'), error.message);
    process.exit(1);
  }
}

// Perform the rollback
async function performRollback(config, targetVersion) {
  console.log(chalk.yellow(`Rolling back ${config.workerName} to version ${targetVersion}...`));
  
  try {
    // Use wrangler to roll back to the specified version
    execSync(`npx wrangler rollback --name=${config.workerName} --version=${targetVersion}`, { 
      encoding: 'utf8',
      stdio: 'inherit'
    });
    
    console.log(chalk.green(`Successfully rolled back to version ${targetVersion}`));
    return true;
  } catch (error) {
    console.error(chalk.red('Rollback failed:'), error.message);
    return false;
  }
}

// Verify the rollback was successful
async function verifyRollback(deploymentUrl) {
  console.log(chalk.blue('Verifying rollback...'));
  
  try {
    // Wait for the rollback to propagate
    console.log('Waiting 30 seconds for rollback to propagate...');
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    // Run the deployment monitor to verify
    const monitorOptions = {
      url: deploymentUrl,
      checks: ['health', 'links'],
      silent: false
    };
    
    const results = await deploymentMonitor.runChecks(monitorOptions);
    
    if (results.success) {
      console.log(chalk.green('Rollback verification successful!'));
      return true;
    } else {
      console.error(chalk.red('Rollback verification failed:'), results.errors);
      return false;
    }
  } catch (error) {
    console.error(chalk.red('Error verifying rollback:'), error.message);
    return false;
  }
}

// Send notification about the rollback
async function sendNotification(notifyUrl, config, version, reason, success) {
  if (!notifyUrl) return;
  
  try {
    const payload = {
      type: 'rollback',
      project: config.name,
      environment: options.environment,
      version: version,
      reason: reason || 'Manual rollback',
      success: success,
      timestamp: new Date().toISOString(),
      initiator: process.env.GITHUB_ACTOR || process.env.USER || 'unknown'
    };
    
    await axios.post(notifyUrl, payload);
    console.log(chalk.blue('Rollback notification sent'));
  } catch (error) {
    console.error(chalk.yellow('Failed to send notification:'), error.message);
  }
}

// Log the rollback for auditing purposes
function logRollback(config, version, reason, success) {
  const logDir = path.resolve(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  const logFile = path.join(logDir, 'rollback-history.json');
  let history = [];
  
  if (fs.existsSync(logFile)) {
    try {
      history = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    } catch (error) {
      console.error(chalk.yellow('Error reading rollback history:'), error.message);
    }
  }
  
  history.push({
    project: config.name,
    environment: options.environment,
    version: version,
    reason: reason || 'Manual rollback',
    success: success,
    timestamp: new Date().toISOString(),
    initiator: process.env.GITHUB_ACTOR || process.env.USER || 'unknown'
  });
  
  fs.writeFileSync(logFile, JSON.stringify(history, null, 2), 'utf8');
  console.log(chalk.blue('Rollback logged to history'));
}

// Main function
async function main() {
  console.log(chalk.bold.blue('Cloudflare Workers Deployment Rollback'));
  console.log(chalk.blue('======================================='));
  
  const config = getProjectConfig();
  const versions = await getAvailableVersions(config);
  
  if (versions.length < 2) {
    console.error(chalk.red('Not enough versions available for rollback'));
    process.exit(1);
  }
  
  // Determine target version
  let targetVersion = options.version;
  
  if (!targetVersion) {
    // Default to the previous version
    targetVersion = versions[1].id; // Index 0 is current, 1 is previous
  }
  
  const targetVersionInfo = versions.find(v => v.id === targetVersion);
  
  if (!targetVersionInfo) {
    console.error(chalk.red(`Version ${targetVersion} not found`));
    console.log(chalk.blue('Available versions:'));
    versions.forEach(v => console.log(`  ${v.id} (${v.date})`));
    process.exit(1);
  }
  
  // Confirm rollback unless --force is used
  if (!options.force) {
    const answers = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: `Are you sure you want to roll back to version ${targetVersion} (${targetVersionInfo.date})?`,
      default: false
    }]);
    
    if (!answers.confirm) {
      console.log(chalk.yellow('Rollback cancelled'));
      process.exit(0);
    }
  }
  
  // Perform the rollback
  const rollbackSuccess = await performRollback(config, targetVersion);
  
  // Verify if requested
  let verificationSuccess = true;
  if (rollbackSuccess && options.verify && config.deploymentUrl) {
    verificationSuccess = await verifyRollback(config.deploymentUrl);
  }
  
  // Send notification if configured
  if (options.notify) {
    await sendNotification(
      options.notify,
      config,
      targetVersion,
      options.reason,
      rollbackSuccess && verificationSuccess
    );
  }
  
  // Log the rollback
  logRollback(
    config,
    targetVersion,
    options.reason,
    rollbackSuccess && verificationSuccess
  );
  
  // Final status
  if (rollbackSuccess && verificationSuccess) {
    console.log(chalk.green.bold('Rollback completed successfully'));
    process.exit(0);
  } else if (rollbackSuccess) {
    console.log(chalk.yellow.bold('Rollback completed but verification failed'));
    process.exit(1);
  } else {
    console.log(chalk.red.bold('Rollback failed'));
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error(chalk.red('Unhandled error:'), error);
  process.exit(1);
});