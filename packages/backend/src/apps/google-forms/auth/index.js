import generateAuthUrl from './generate-auth-url.js';
import verifyCredentials from './verify-credentials.js';
import refreshToken from './refresh-token.js';
import isStillVerified from './is-still-verified.js';

const FIELDS = [
  {
    key: 'oAuthRedirectUrl',
    label: 'OAuth Redirect URL',
    type: 'string',
    required: true,
    readOnly: true,
    value: '{WEB_APP_URL}/app/google-forms/connections/add',
    placeholder: null,
    description: 'When asked to input a redirect URL in Google Cloud, enter the URL above.',
    clickToCopy: true,
  },
  {
    key: 'clientId',
    label: 'Client ID',
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
    label: 'Client Secret',
    type: 'string',
    required: true,
    readOnly: false,
    value: null,
    placeholder: null,
    description: null,
    clickToCopy: false,
  },
];

export { generateAuthUrl, verifyCredentials, isStillVerified, refreshToken, FIELDS };
