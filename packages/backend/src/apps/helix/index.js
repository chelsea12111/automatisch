import defineApp from '../../helpers/define-app.js';
import setBaseUrl from './common/set-base-url.js';
import addAuthHeader from './common/add-auth-header.js';
import authConfig from './auth/index.js';
import actionsConfig from './actions/index.js';

const appConfig = {
  name: 'Helix',
  key: 'helix',
  baseUrl: 'https://tryhelix.ai',
  apiBaseUrl: 'https://app.tryhelix.ai',
  iconUrl: `${appConfig.baseUrl}/apps/helix/assets/favicon.svg`,
  authDocUrl: `${appConfig.docsUrl}/apps/helix/connection`,
  primaryColor: '#000000',
  supportsConnections: true,
  beforeRequest: [setBaseUrl, addAuthHeader],
};

const { auth, ...authRest } = authConfig;
appConfig.auth = { ...auth, docUrl: appConfig.authDocUrl };
const { actions, ...actionsRest } = actionsConfig;
appConfig.actions = { ...actions, ...actionsRest };

export default defineApp(appConfig);
