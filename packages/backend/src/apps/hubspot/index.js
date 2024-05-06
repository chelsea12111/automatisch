import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import actions from './actions/index.js';
import auth from './auth/index.js';

// Define app constants
const APP_NAME = 'HubSpot';
const APP_KEY = 'hubspot';
const ICON_URL = '{BASE_URL}/apps/' + APP_KEY + '/assets/favicon.svg';
const AUTH_DOC_URL = '{DOCS_URL}/apps/' + APP_KEY + '/connection';
const BASE_URL = 'https://www.hubspot.com';
const API_BASE_URL = 'https://api.hubapi.com';
const PRIMARY_COLOR = '#F95C35';

// Define app beforeRequest hook
const beforeRequest = [addAuthHeader];

// Define app object
const app = defineApp({
  name: APP_NAME,
  key: APP_KEY,
  iconUrl: ICON_URL,
  authDocUrl: AUTH_DOC_URL,
  supportsConnections: true,
  baseUrl: BASE_URL,
  apiBaseUrl: API_BASE_URL,
  primaryColor: PRIMARY_COLOR,
  beforeRequest,
  auth,
  actions,
});

export default app;
