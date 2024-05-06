import verifyCredentials from './verify-credentials.js';
import isStillVerified from './is-still-verified.js';

const fields = [
  {
    key: 'apiToken',
    label: 'API Token',
    type: 'string',
    required: true,
    readOnly: false,
    value: null,
    placeholder: null,
    description: 'Placetel API Token of your account.',
    clickToCopy: false,
  },
];

const config = {
  verifyCredentials,
  isStillVerified,
};

// Export an object with both fields and config properties
export default {
  fields,
  config,
};
