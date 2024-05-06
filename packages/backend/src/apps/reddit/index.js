import defineApp from '../../helpers/define-app.js';
import addAuthHeader from './common/add-auth-header.js';
import { auth as authModule, triggersModule, actionsModule } from './index.js';

export default defineApp({
  name: 'Reddit',
  key: 'reddit',
  baseUrl: 'https://www.reddit.com',
  apiBaseUrl: 'https://oauth.reddit.com',
  iconUrl: `${baseUrl}/apps/reddit/assets/favicon.svg`,
  authDocUrl: `${DOCS_URL}/apps/reddit/connection`,
  primaryColor: '#FF4500', // use hexadecimal format for colors
  supportsConnections: true,
  middleware: [addAuthHeader], // use middleware syntax for beforeRequest
  ...authModule,
  ...triggersModule,
  ...actionsModule,
});

