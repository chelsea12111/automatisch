import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import { auth as authModule, actions as actionsModule, triggers as triggersModule, dynamicData as dynamicDataModule } from './index.js';

const appConfig = {
  name: 'Google Tasks',
  key: 'google-tasks',
  baseUrl: 'https://calendar.google.com/calendar/u/0/r/tasks',
  apiBaseUrl: 'https://tasks.googleapis.com',
  iconUrl: '{BASE_URL}/apps/google-tasks/assets/favicon.svg',
  authDocUrl: '{DOCS_URL}/apps/google-tasks/connection',
  primaryColor: '0066DA',
  supportsConnections: true,
  beforeRequest: [addAuthHeader],
};

const app = defineApp(appConfig);

app.auth = authModule;
app.actions = actionsModule;
app.dynamicData = dynamicDataModule;
app.triggers = triggersModule;

export default app;
