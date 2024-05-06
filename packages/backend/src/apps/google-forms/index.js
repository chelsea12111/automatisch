import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import authConfig from './auth/index.js';
import triggersConfig from './triggers/index.js';
import dynamicDataConfig from './dynamic-data/index.js';

const appConfig = {
  name: 'Google Forms',
  key: 'google-forms',
  baseUrl: 'https://docs.google.com/forms',
  apiBaseUrl: 'https://forms.googleapis.com',
  iconUrl: '{BASE_URL}/apps/google-forms/assets/favicon.svg',
  authDocUrl: '{DOCS_URL}/apps/google-forms/connection',
  primaryColor: '673AB7',
  supportsConnections: true,
  beforeRequest: [addAuthHeader],
};

export const app = defineApp(appConfig);
export const auth = authConfig;
export const triggers = triggersConfig;
export const dynamicData = dynamicDataConfig;
