import defineApp from '../../helpers/define-app.js';
import actions from './actions/index.js';

const APP_NAME = 'Delay';
const APP_KEY = 'delay';
const ICON_URL = '{BASE_URL}/apps/delay/assets/favicon.svg';
const AUTH_DOC_URL = '{DOCS_URL}/apps/delay/connection';
const SUPPORTS_CONNECTIONS = false;
const BASE_URL = '';
const API_BASE_URL = '';
const PRIMARY_COLOR = '#001F52'; // use hex code for color representation

export default defineApp({
  name: APP_NAME,
  key: APP_KEY,
  iconUrl: ICON_URL,
  authDocUrl: AUTH_DOC_URL,
  supportsConnections: SUPPORTS_CONNECTIONS,
  baseUrl: BASE_URL,
  apiBaseUrl: API_BASE_URL,
  primaryColor: PRIMARY_COLOR,
  actions,
});
