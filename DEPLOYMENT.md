# Deploying to Cloudflare Workers

This guide provides instructions for deploying the Next.js application to Cloudflare Workers.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (v9 or later)
- [Cloudflare account](https://dash.cloudflare.com/sign-up)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (installed as a dev dependency)

## Configuration Files

The project has been configured for Cloudflare Workers deployment with the following files:

- `next.config.js`: Configured for static export with Cloudflare Workers compatibility
- `wrangler.jsonc`: Configured for deploying the Next.js application to Cloudflare Workers
- `package.json`: Contains scripts for building and deploying to Cloudflare Workers

## Deployment Process

### 1. Authentication

Before deploying, you need to authenticate with Cloudflare:

```bash
npx wrangler login
```

This will open a browser window to authenticate with your Cloudflare account.

### 2. Build and Deploy

To build and deploy the application to Cloudflare Workers:

```bash
npm run pages:deploy
```

This command will:
1. Build the Next.js application with `@cloudflare/next-on-pages`
2. Deploy the built application to Cloudflare Pages

### 3. Local Development with Cloudflare Workers

To test the application locally with Cloudflare Workers:

```bash
npm run pages:dev
```

This will start a local development server that simulates the Cloudflare Workers environment.

## Available Scripts

- `npm run pages:build`: Builds the Next.js application with `@cloudflare/next-on-pages`
- `npm run pages:deploy`: Builds and deploys the application to Cloudflare Pages
- `npm run pages:watch`: Watches for changes and rebuilds the application with `@cloudflare/next-on-pages`
- `npm run pages:dev`: Starts a local development server with Cloudflare Workers

## Automated Deployment with GitHub Actions

This project includes a GitHub Actions workflow for automated deployments to Cloudflare Workers. The workflow is defined in `.github/workflows/deploy.yml` and is triggered on:

- Pushes to the `main` branch
- Manual triggers via the GitHub Actions UI

### Setup for GitHub Actions

To use the GitHub Actions workflow, you need to set up the following secrets in your GitHub repository:

1. `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with the necessary permissions
2. `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

To create a Cloudflare API token:
1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/)
2. Navigate to "My Profile" > "API Tokens"
3. Click "Create Token"
4. Use the "Edit Cloudflare Workers" template or create a custom token with the following permissions:
   - Account > Cloudflare Pages > Edit
   - Account > Worker Scripts > Edit

### Workflow Steps

The GitHub Actions workflow performs the following steps:
1. Checks out the repository
2. Sets up Node.js
3. Installs dependencies
4. Builds the Next.js application
5. Builds for Cloudflare Pages with `@cloudflare/next-on-pages`
6. Deploys to Cloudflare Pages

## Troubleshooting

### Common Issues

1. **Build Failures**

   If the build fails, check the following:
   - Ensure all dependencies are installed: `npm install`
   - Check for any errors in the Next.js application
   - Verify that the `next.config.js` file is properly configured

2. **Deployment Failures**

   If deployment fails, check the following:
   - Ensure you're authenticated with Cloudflare: `npx wrangler login`
   - Check for any errors in the Cloudflare Workers configuration
   - Verify that the `wrangler.jsonc` file is properly configured

3. **Runtime Errors**

   If the application has runtime errors:
   - Check the Cloudflare Workers logs in the Cloudflare dashboard
   - Test the application locally with `npm run pages:dev`
   - Verify that the application works correctly with `npm run dev`

## Monitoring and Logging

The project includes a monitoring and logging utility (`src/utils/monitoring.js`) that provides:

- Structured logging for Cloudflare Workers
- Performance measurement utilities
- Error tracking and reporting
- API request monitoring middleware

### Using the Monitoring Utilities

To use the monitoring utilities in your application:

1. Import the monitoring utilities:

```javascript
import { logInfo, logError, measurePerformance } from '@/utils/monitoring';
```

2. Log events:

```javascript
// Log an informational event
logInfo('User logged in', { userId: '123' });

// Log an error
logError('Failed to process payment', { orderId: '456', error: 'Payment declined' });
```

3. Measure performance:

```javascript
// Measure the performance of a function
const result = await measurePerformance(
  async () => await fetchData(),
  'fetchData',
  { dataType: 'users' }
);
```

4. Initialize error tracking in your application's entry point:

```javascript
// In pages/_app.js or similar
import { initErrorTracking } from '@/utils/monitoring';

// Initialize error tracking
initErrorTracking();
```

### API Monitoring Middleware

The project includes a middleware for automatically monitoring API routes (`src/middleware/monitoringMiddleware.js`). This middleware:

- Measures API request performance
- Logs request details
- Tracks and reports errors
- Adds request IDs for traceability

To use the middleware with an API route:

```javascript
// pages/api/example.js
import { withMonitoring } from '@/middleware/monitoringMiddleware';

async function handler(req, res) {
  // Your API logic here
  res.status(200).json({ success: true });
}

export default withMonitoring(handler);
```

### Deployment Verification and Monitoring

The project includes a deployment monitoring script (`scripts/deployment-monitor.js`) that helps verify deployments and monitor application health. This script can be run manually or as part of the CI/CD pipeline.

#### Available NPM Scripts

The following NPM scripts are available for deployment monitoring:

- `npm run monitor` - Run all checks on the default URL
- `npm run monitor:health` - Run only health checks
- `npm run monitor:post-deploy` - Run comprehensive post-deployment verification
- `npm run postdeploy` - Automatically run after deployment

#### Manual Usage

You can run the deployment monitor manually with custom options:

```bash
# Basic usage
node scripts/deployment-monitor.js --url=https://your-site.com

# Run specific checks
node scripts/deployment-monitor.js --url=https://your-site.com --checks=health,links,performance

# Send notifications
node scripts/deployment-monitor.js --url=https://your-site.com --notifyUrl=https://your-webhook.com

# Save results to file
node scripts/deployment-monitor.js --url=https://your-site.com --output=results.json
```

#### CI/CD Integration

The deployment monitor is automatically integrated into the GitHub Actions workflow. After each deployment:

1. The script waits for the deployment to propagate
2. Runs health and link checks to verify the deployment
3. Monitors performance metrics
4. Outputs the results to the GitHub Actions log

### Viewing Logs in Cloudflare

To view logs from your deployed application:

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/)
2. Navigate to "Workers & Pages" > "Overview"
3. Select your application
4. Click on "Logs" to view the application logs

## Rollback Procedures

The project includes a rollback script (`scripts/rollback.js`) that provides a safety mechanism for reverting to a previous deployment when issues are detected. This script can be run manually or integrated into CI/CD pipelines.

### Using the Rollback Script

The following NPM scripts are available for rollback operations:

- `npm run rollback` - Interactive rollback with confirmation prompt
- `npm run rollback:previous` - Quick rollback to the previous version without confirmation
- `npm run rollback:verify` - Rollback with post-rollback verification

### Manual Rollback Options

You can run the rollback script manually with custom options:

```bash
# Basic usage (interactive)
node scripts/rollback.js

# Roll back to a specific version
node scripts/rollback.js --version=<version-id>

# Roll back to previous version without confirmation
node scripts/rollback.js --force

# Roll back and verify success
node scripts/rollback.js --verify

# Roll back with notification
node scripts/rollback.js --notify=https://your-webhook.com

# Document reason for rollback
node scripts/rollback.js --reason="Performance degradation after deployment"
```

### Rollback Verification

When using the `--verify` option, the rollback script will:

1. Wait for the rollback to propagate (30 seconds)
2. Run health checks to verify the application is functioning
3. Check for broken links
4. Report success or failure

### Rollback Logging

All rollback operations are logged to `logs/rollback-history.json` for audit purposes. Each log entry includes:

- Project name
- Environment
- Version rolled back to
- Reason for rollback
- Success status
- Timestamp
- Initiator (user or CI/CD system)

### Emergency Rollback Procedure

In case of a critical production issue:

1. Run `npm run rollback:previous` to quickly revert to the previous version
2. Verify the application is functioning correctly
3. Document the issue and rollback in the incident log
4. Investigate the root cause before attempting a new deployment
### Automated Rollback in CI/CD

The project includes automated rollback capabilities integrated into the GitHub Actions workflow. If a deployment fails verification, the system will automatically trigger a rollback to the previous stable version.

#### How Automated Rollback Works

1. After deployment to Cloudflare, the workflow runs verification checks using the deployment monitor
2. If verification fails (health checks, critical endpoints, etc.), the rollback job is triggered
3. The rollback job executes the rollback script with the `--force` and `--verify` options
4. The system logs the rollback event and sends notifications if configured
5. The GitHub Actions workflow reports the rollback status in the job summary

#### Configuring Automated Rollback

The automated rollback is configured in `.github/workflows/deploy.yml` and can be customized:

```yaml
# Example configuration in GitHub Actions workflow
rollback:
  name: Rollback on Failure
  needs: [deploy]
  if: failure() && needs.deploy.result == 'failure'
  runs-on: ubuntu-latest
  steps:
    # Rollback steps...
```

#### Rollback Notifications

When an automated rollback occurs:

1. The event is logged to `logs/rollback-history.json`
2. If a notification URL is configured, a webhook is triggered with rollback details
3. The GitHub Actions workflow summary includes rollback information
4. The initiator is recorded as "CI/CD" in the audit log
## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [`@cloudflare/next-on-pages` Documentation](https://github.com/cloudflare/next-on-pages)
- [Cloudflare Workers Monitoring](https://developers.cloudflare.com/workers/observability/)