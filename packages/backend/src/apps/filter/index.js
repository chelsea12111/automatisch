import defineApp from '../../helpers/define-app.js';
import actions from './actions/index.js';

const APP_NAME = 'Filter';
const APP_KEY = 'filter';
const ICON_URL = '{BASE_URL}/apps/filter/assets/favicon.svg';
const AUTH_DOC_URL = '{DOCS_URL}/apps/filter/connection';
const SUPPORTS_CONNECTIONS = false;
const PRIMARY_COLOR = '#001F52'; // use hex code for color representation

export default defineApp({
  name: APP_NAME,
  key: APP_KEY,
  iconUrl: ICON_URL,
  authDocUrl: AUTH_DOC_URL,
  supportsConnections: SUPPORTS_CONNECTIONS,
  baseUrl: '',
  apiBaseUrl: '',
  primaryColor: PRIMARY_COLOR,
  actions,
});
