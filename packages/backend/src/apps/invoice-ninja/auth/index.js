import verifyCredentials from './verify-credentials.js';
import isStillVerified from './is-still-verified.js';

export default class Config {
  constructor() {
    this.fields = [
      {
        key: 'apiToken',
        label: 'API Token',
        type: 'string',
        required: true,
        readOnly: false,
        value: null,
        placeholder: null,
        description:
          'Tokens can be created in the v5 app on Settings > Account Management',
        clickToCopy: false,
      },
      {
        key: 'instanceUrl',
        label: 'Invoice Ninja instance URL (optional)',
        type: 'string',
        required: false,
        readOnly: false,
        value: null,
        placeholder: null,
        description: "Leave this field blank if you're using hosted platform.",
        clickToCopy: true,
      },
    ];

    this.fields.forEach(field => {
      if (field.required) {
        field.value = '';
      }
    });
  }

  validate() {
    return this.fields.every(field => {
      return !field.required || !!field.value;
    });
  }

  getFields() {
    return this.fields;
  }

  verifyCredentials() {
    return verifyCredentials(this.fields);
  }

  isStillVerified() {
    return isStillVerified(this.fields);
  }
}
