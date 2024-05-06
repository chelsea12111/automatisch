import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import authConfig from './auth/index.js';
import triggersConfig from './triggers/index.js';
import dynamicDataConfig from './dynamic-data/index.js';

const appConfig = {
  name: 'Google Drive',
  key: 'google-drive',
  baseUrl: 'https://drive.google.com',
  apiBaseUrl: 'https://www.googleapis.com/drive',
  iconUrl: '{BASE_URL}/apps/google-drive/assets/favicon.svg',
  authDocUrl: '{DOCS_URL}/apps/google-drive/connection',
  primaryColor: '1FA463',
  supportsConnections: true,
  beforeRequest: [addAuthHeader],
};

export const app = defineApp(appConfig);
export const auth = authConfig;
export const triggers = triggersConfig;
export const dynamicData = dynamicDataConfig;

