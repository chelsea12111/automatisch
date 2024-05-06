import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import authModule from './auth/index.js';
import triggersModule from './triggers/index.js';
import actionsModule from './actions/index.js';
import dynamicDataModule from './dynamic-data/index.js';

const { auth } = authModule;
const { triggers } = triggersModule;
const { actions } = actionsModule;
const { dynamicData } = dynamicDataModule;

export default defineApp({
  name: 'SignalWire',
  key: 'signalwire',
  iconUrl: '{BASE_URL}/apps/signalwire/assets/favicon.svg',
  authDocUrl: '{DOCS_URL}/apps/signalwire/connection',
  supportsConnections: true,
  baseUrl: 'https://signalwire.com',
  apiBaseUrl: '',
  primaryColor: '044cf6',
  beforeRequest: [addAuthHeader],
  auth,
  triggers,
  actions,
  dynamicData,
});
