import verifyCredentials from './verify-credentials.js';
import isStillVerified from './is-still-verified.js';

const fields = [
  {
    key: 'screenName',
    label: 'Screen Name',
    type: 'string',
    required: true,
    readOnly: false,
    value: null,
    placeholder: null,
    description: 'Screen name of your connection to be used on Automatisch UI.',
    clickToCopy: false,
  },
  {
    key: 'apiKey',
    label: 'API Key',
    type: 'string',
    required: true,
    readOnly: false,
    value: null,
    placeholder: null,
    description: 'Carbone API key of your account.',
    clickToCopy: false,
  },
];

const config = {
  verifyCredentials,
  isStillVerified,
};

export default { fields, ...config };
