// Import all helpers and configuration files first
import { init, captureException } from './helpers/sentry.ee.js';
import appConfig from './config/app.js';
import './config/orm.js';
import checkWorkerReadiness from './helpers/check-worker-readiness.js';

// Import all worker files
import flow from './workers/flow.js';
import trigger from './workers/trigger.js';
import action from './workers/action.js';
import email from './workers/email.js';
import deleteUser from './workers/delete-user.ee.js';

// Import cloud-specific workers
if (appConfig.isCloud) {
  import removeCancelledSubscriptionsWorker from './workers/remove-cancelled-subscriptions.ee.js';
  import removeCancelledSubscriptionsQueue from './queues/remove-cancelled-subscriptions.ee.js';

  // Run cloud-specific workers
  removeCancelledSubscriptionsWorker();
  removeCancelledSubscriptionsQueue();
}

// Initialize Sentry
init();

// Check worker readiness
checkWorkerReadiness();

// Start worker functions
flow();
trigger();
action();
email();
deleteUser();

// Import and initialize telemetry
import telemetry from './helpers/telemetry/index.js';
telemetry.setServiceType('worker');

// Handle errors with Sentry
process.on('uncaughtException', (error) => {
  captureException(error);
});

process.on('unhandledRejection', (reason, promise) => {
  captureException(reason);
});
