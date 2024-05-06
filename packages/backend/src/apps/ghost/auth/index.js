import verifyCredentials from './verify-credentials.js';
import isStillVerified from './is-still-verified.js';

const fields = [
  {
    key: 'instanceUrl',
    label: 'Instance URL',
    type: 'string',
    required: true,
    readOnly: false,
    value: null,
    placeholder: null,
    description: null,
    clickToCopy: false,
  },
  {
    key: 'apiKey',
    label: 'Admin API Key',
    type: 'string',
    required: true,
    readOnly: false,
    value: null,
    placeholder: null,
    description: null,
    clickToCopy: false,
  },
];

const config = {
  verifyCredentials,
  isStillVerified,
};

export default { fields, ...config };
