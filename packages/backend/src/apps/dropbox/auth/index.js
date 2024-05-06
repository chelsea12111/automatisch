import generateAuthUrl from './generate-auth-url.js';
import verifyCredentials from './verify-credentials.js';
import isStillVerified from './is-still-verified.js';
import refreshToken from './refresh-token.js';

const FIELDS = [
  {
    key: 'oAuthRedirectUrl',
    label: 'OAuth Redirect URL',
    type: 'string',
    required: true,
    readOnly: true,
    value: '{WEB_APP_URL}/app/dropbox/connections/add',
    placeholder: null,
    description:
      'When asked to input an OAuth callback or redirect URL in Dropbox OAuth, enter the URL above.',
    clickToCopy: true,
  },
  {
    key: 'clientId',
    label: 'App Key',
    type: 'string',
    required: true,
    readOnly: false,
    value: null,
    placeholder: null,
    description: null,
    clickToCopy: false,
  },
  {
    key: 'clientSecret',
    label: 'App Secret',
    type: 'string',
    required: true,
    readOnly: false,
    value: null,
    placeholder: null,
    description: null,
    clickToCopy: false,
  },
];

export { generateAuthUrl, verifyCredentials, isStillVerified, refreshToken };

export default FIELDS;
