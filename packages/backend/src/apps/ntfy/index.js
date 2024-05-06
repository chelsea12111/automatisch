import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import authConfig from './auth/index.js';
import actionsConfig from './actions/index.js';

// Define app constants
const APP_NAME = 'Ntfy';
const APP_KEY = 'ntfy';
const ICON_URL = `${process.env.BASE_URL}/apps/${APP_KEY}/assets/favicon.svg`;
const AUTH_DOC_URL = `${process.env.DOCS_URL}/apps/${APP_KEY}/connection`;
const BASE_URL = 'https://ntfy.sh';
const API_BASE_URL = 'https://ntfy.sh';
const PRIMARY_COLOR = '56bda8';

export default defineApp({
  name: APP_NAME,
  key: APP_KEY,
  iconUrl: ICON_URL,
  authDocUrl: AUTH_DOC_URL,
  supportsConnections: true,
  baseUrl: BASE_URL,
  apiBaseUrl: API_BASE_URL,
  primaryColor: PRIMARY_COLOR,
  auth: authConfig,
  actions: actionsConfig,
  hooks: {
    beforeRequest: [addAuthHeader],
  },
});
