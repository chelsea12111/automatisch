import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import authConfig from './auth/index.js';
import dynamicDataConfig from './dynamic-data/index.js';
import triggersConfig from './triggers/index.js';

const appConfig = {
  name: 'Disqus',
  key: 'disqus',
  baseUrl: 'https://disqus.com',
  apiBaseUrl: 'https://disqus.com/api',
  iconUrl: '{BASE_URL}/apps/disqus/assets/favicon.svg',
  authDocUrl: 'https://automatisch.io/docs/apps/disqus/connection',
  primaryColor: '2E9FFF',
  supportsConnections: true,
  beforeRequest: [addAuthHeader],
};

export const auth = defineApp(authConfig);
export const dynamicData = defineApp(dynamicDataConfig);
export const triggers = defineApp(triggersConfig);

export default defineApp({
  ...appConfig,
  ...authConfig,
  ...dynamicDataConfig,
  ...triggersConfig,
});
