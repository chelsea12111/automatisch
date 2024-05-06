import generateAuthUrl from './generate-auth-url.js';
import verifyCredentials from './verify-credentials.js';
import isStillVerified from './is-still-verified.js';

export default class DiscordClient {
  constructor() {
    this.name = 'DiscordClient';
    this.fields = [
      {
        key: 'oAuthRedirectUrl',
        label: 'OAuth Redirect URL',
        type: 'string',
        required: true,
        readOnly: true,
        value: '{WEB_APP_URL}/app/discord/connections/add',
        placeholder: null,
        description:
          'When asked to input an OAuth callback or redirect URL in Discord OAuth, enter the URL above.',
        docUrl: 'https://automatisch.io/docs/discord#oauth-redirect-url',
        clickToCopy: true,
      },
      {
        key: 'consumerKey',
        label: 'Consumer Key',
        type: 'string',
        required: true,
        readOnly: false,
        value: null,
        placeholder: null,
        description: null,
        docUrl: 'https://automatisch.io/docs/discord#consumer-key',
        clickToCopy: false,
      },
      {
        key: 'consumerSecret',
        label: 'Consumer Secret',
        type: 'string',
        required: true,
        readOnly: false,
        value: null,
        placeholder: null,
        description: null,
        docUrl: 'https://automatisch.io/docs/discord#consumer-secret',
        clickToCopy: false,
      },
      {
        key: 'botToken',
        label: 'Bot token',
        type: 'string',
        required: true,
        readOnly: false,
        value: null,
        placeholder: null,
        description: null,
        docUrl: 'https://automatisch.io/docs/discord#bot-token',
        clickToCopy: false,
      },
    ];
  }

  async generateAuthUrl() {
    try {
      return await generateAuthUrl();
    } catch (error) {
      console.error(`Error in ${this.name}.generateAuthUrl:`, error);
      throw error;
    }
  }

  async verifyCredentials() {
    try {
      return await verifyCredentials();
    } catch (error) {
      console.error(`Error in ${this.name}.verifyCredentials:`, error);
      throw error;
    }
  }

  async isStillVerified() {
    try {
      return await isStillVerified();
    } catch (error) {
      console.error(`Error in ${this.name}.isStillVerified:`, error);
      throw error;
    }
  }
}
