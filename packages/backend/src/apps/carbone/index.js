import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import { auth as authActions, actions as appActions } from './actions/index.js';
import authModule from './auth/index.js';

const { getAuthHeader } = authModule;

export default defineApp({
  name: 'Carbone',
  key: 'carbone',
  iconUrl: `${process.env.BASE_URL}/apps/carbone/assets/favicon.svg`,
  authDocUrl: `${process.env.DOCS_URL}/apps/carbone/connection`,
  supportsConnections: true,
  baseUrl: 'https://carbone.io',
  apiBaseUrl: 'https://api.carbone.io',
  primaryColor: '6f42c1',
  beforeRequest: [request => {
    const authHeader = getAuthHeader();
    if (authHeader) {
      request.headers.set('Authorization', authHeader);
    }
    return request;
  }],
  auth: authModule,
  actions: {
    ...appActions,
    auth: authActions,
  },
});
