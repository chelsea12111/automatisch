import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import { authConfig } from './auth/index.js';
import { dynamicDataConfig } from './dynamic-data/index.js';
import { actionsConfig } from './actions/index.js';
import { triggersConfig } from './triggers/index.js';
import { dynamicFieldsConfig } from './dynamic-fields/index.js';

export default defineApp({
  name: 'Discord',
  key: 'discord',
  iconUrl: '{BASE_URL}/apps/discord/assets/favicon.svg',
  authDocUrl: '{DOCS_URL}/apps/discord/connection',
  supportsConnections: true,
  baseUrl: 'https://discord.com',
  apiBaseUrl: 'https://discord.com/api',
  primaryColor: '5865f2',
  beforeRequest: [addAuthHeader],
  ...authConfig,
  ...dynamicDataConfig,
  ...dynamicFieldsConfig,
  ...triggersConfig,
  ...actionsConfig,
});
