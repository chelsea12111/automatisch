import defineApp from '../../helpers/define-app.js';
import formatTextAction from './actions/format-text.js';
import formatDateAction from './actions/format-date.js';
import dynamicFields from './dynamic-fields/index.js';

const actions = {
  formatText: formatTextAction,
  formatDate: formatDateAction,
};

export default defineApp({
  name: 'Formatter',
  key: 'formatter',
  iconUrl: '{BASE_URL}/apps/formatter/assets/favicon.svg',
  authDocUrl: '{DOCS_URL}/apps/formatter/connection',
  supportsConnections: false,
  baseUrl: '',
  apiBaseUrl: '',
  primaryColor: '#001F52', // Use hexadecimal color codes instead of decimal
  actions,
  dynamicFields,
});
