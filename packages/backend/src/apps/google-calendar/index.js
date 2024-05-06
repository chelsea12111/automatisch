import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import authConfig from './auth/index.js';
import triggersConfig from './triggers/index.js';
import dynamicDataConfig from './dynamic-data/index.js';

const appConfig = {
  name: 'Google Calendar',
  key: 'google-calendar',
  baseUrl: 'https://calendar.google.com',
  apiBaseUrl: 'https://www.googleapis.com/calendar',
  iconUrl: '{BASE_URL}/apps/google-calendar/assets/favicon.svg',
  authDocUrl: '{DOCS_URL}/apps/google-calendar/connection',
  primaryColor: '448AFF',
  supportsConnections: true,
  beforeRequest: [addAuthHeader],
};

export const app = defineApp(appConfig);

// Instead of directly exporting the config objects, we can export the initialized modules
export const auth = authConfig(app);
export const triggers = triggersConfig(app);
export const dynamicData = dynamicDataConfig(app);

