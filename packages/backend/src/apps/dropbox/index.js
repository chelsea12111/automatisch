import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import authConfig from './auth/index.js';
import actionsConfig from './actions/index.js';

const auth = { ...authConfig };
const actions = { ...actionsConfig };

auth.beforeRequest = [addAuthHeader];

export default defineApp({
  name: 'Dropbox',
  key: 'dropbox',
  iconUrl: '{BASE_URL}/apps/dropbox/assets/favicon.svg',
  authDocUrl: '{DOCS_URL}/apps/dropbox/connection',
  supportsConnections: true,
  baseUrl: 'https://dropbox.com',
  apiBaseUrl: 'https://api.dropboxapi.com',
  primaryColor: '0061ff',
  auth,
  actions,
});
