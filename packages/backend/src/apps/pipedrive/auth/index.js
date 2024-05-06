import generateAuthUrl from './generate-auth-url.js';
import verifyCredentials from './verify-credentials.js';
import refreshToken from './refresh-token.js';
import isStillVerified from './is-still-verified.js';

export default class OAuthClient {
  constructor() {
    this.fields = {
      oAuthRedirectUrl: {
        key: 'oAuthRedirectUrl',
        label: 'OAuth Redirect URL',
        type: 'string',
        required: true,
        readOnly: true,
        value: '{WEB_APP_URL}/app/pipedrive/connections/add',
        placeholder: null,
        description:
          'When asked to input a redirect URL in Pipedrive, enter the URL above.',
        clickToCopy: true,
      },
      clientId: {
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
      clientSecret: {
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
    };

    this.oAuthUrl = null;
  }

  setCredentials(clientId, clientSecret) {
    if (typeof clientId !== 'string' || clientId.trim() === '') {
      throw new Error('Invalid client ID');
    }

    if (typeof clientSecret !== 'string' || clientSecret.trim() === '') {
      throw new Error('Invalid client secret');
    }

    this.fields.clientId.value = clientId;
    this.fields.clientSecret.value = clientSecret;
  }

  generateAuthUrl() {
    this.oAuthUrl = generateAuthUrl(
      this.fields.clientId.value,
      this.fields.oAuthRedirectUrl.value
    );
    return this.oAuthUrl;
  }

  async verifyCredentials() {
    return verifyCredentials(
      this.fields.clientId.value,
      this.fields.clientSecret.value
    );
  }

  async isStillVerified() {
    return isStillVerified(this.fields.clientId.value);
  }

  async refreshToken() {
    return refreshToken(
      this.fields.clientId.value,
      this.fields.clientSecret.value
    );
  }
}


const oauth = new OAuthClient();
oauth.setCredentials('my-client-id', 'my-client-secret');
const authUrl = oauth.generateAuthUrl();
// ...
const isVerified = await oauth.isStillVerified();
