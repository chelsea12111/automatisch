import defineApp from '../../helpers/define-app.js';
import auth from './auth/index.js';
import actions from './actions/index.js';
import dynamicData from './dynamic-data/index.js';

const appConfig = {
  name: 'Pushover',
  key: 'pushover',
  baseUrl: 'https://pushover.net',
  apiBaseUrl: 'https://api.pushover.net',
  iconUrl: `${appConfig.baseUrl}/apps/pushover/assets/favicon.svg`,
  authDocUrl: `${appConfig.docsUrl}/apps/pushover/connection`,
  primaryColor: '#249DF1',
  supportsConnections: true,
  auth,
  actions,
  dynamicData,
};

appConfig.docsUrl = defineApp.docsUrl;

export default appConfig;
