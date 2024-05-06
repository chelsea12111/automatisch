import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import authConfig from './auth/index.js';
import actionsConfig from './actions/index.js';

export default defineApp({
  name: 'Ntfy',
  key: 'ntfy',
  iconUrl: `${process.env.BASE_URL}/apps/ntfy/assets/favicon.svg`,
  authDocUrl: `${process.env.DOCS_URL}/apps/ntfy/connection`,
  supportsConnections: true,
  baseUrl: 'https://ntfy.sh',
  apiBaseUrl: 'https://ntfy.sh',
  primaryColor: '56bda8',
  auth: authConfig,
  actions: actionsConfig,
  hooks: {
    beforeRequest: [addAuthHeader],
  },
});
