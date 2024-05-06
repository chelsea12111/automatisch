import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import authConfig from './auth/index.js';
import triggersConfig from './triggers/index.js';
import dynamicDataConfig from './dynamic-data/index.js';

const { auth, setupAuth } = authConfig;
const { triggers } = triggersConfig;
const { dynamicData } = dynamicDataConfig;

export default defineApp({
  name: 'Placetel',
  key: 'placetel',
  iconUrl: '{BASE_URL}/apps/placetel/assets/favicon.svg',
  authDocUrl: '{DOCS_URL}/apps/placetel/connection',
  supportsConnections: true,
  baseUrl: 'https://placetel.de',
  apiBaseUrl: 'https://api.placetel.de',
  primaryColor: '069dd9',
  beforeRequest: [addAuthHeader],
  auth: {
    ...auth,
    setup: setupAuth,
  },
  triggers,
  dynamicData,
});
