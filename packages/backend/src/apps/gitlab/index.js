import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import setBaseUrl from './common/set-base-url.js';
import authConfig from './auth/index.js';
import triggersConfig from './triggers/index.js';
import dynamicDataConfig from './dynamic-data/index.js';

const appConfig = {
  name: 'GitLab',
  key: 'gitlab',
  baseUrl: 'https://gitlab.com',
  apiBaseUrl: 'https://gitlab.com',
  iconUrl: `${appConfig.baseUrl}/apps/gitlab/assets/favicon.svg`,
  authDocUrl: `${appConfig.docsUrl}/apps/gitlab/connection`,
  primaryColor: '#FC6D26',
  supportsConnections: true,
  beforeRequest: [setBaseUrl, addAuthHeader],
};

const { auth, ...authProps } = authConfig;
appConfig.auth = { ...authProps, ...auth };

const { triggers, ...triggersProps } = triggersConfig;
appConfig.triggers = { ...triggersProps, ...triggers };

const { dynamicData, ...dynamicDataProps } = dynamicDataConfig;
appConfig.dynamicData = { ...dynamicDataProps, ...dynamicData };

export default defineApp(appConfig);
