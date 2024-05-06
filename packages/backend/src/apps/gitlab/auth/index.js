import generateAuthUrl from './generate-auth-url.js';
import verifyCredentials from './verify-credentials.js';
import isStillVerified from './is-still-verified.js';
import refreshToken from './refresh-token.js';

export default class GitlabOAuthClient {
  constructor() {
    this.fields = [
      {
        key: 'oAuthRedirectUrl',
        label: 'OAuth Redirect URL',
        type: 'string',
        required: true,
        readOnly: true,
        value: '{WEB_APP_URL}/app/gitlab/connections/add',
        placeholder: null,
        description:
          'When asked to input an OAuth callback or redirect URL in Gitlab OAuth, enter the URL above.',
        docUrl: 'https://automatisch.io/docs/gitlab#oauth-redirect-url',
        clickToCopy: true,
      },
      {
        key: 'instanceUrl',
        label: 'Gitlab instance URL',
        type: 'string',
        required: false,
        readOnly: false,
        value: 'https://gitlab.com',
        placeholder: 'https://gitlab.com',
        description: 'Your Gitlab instance URL. Default is https://gitlab.com.',
        docUrl: 'https://automatisch.io/docs/gitlab#oauth-redirect-url',
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
        docUrl: 'https://automatisch.io/docs/gitlab#client-id',
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
        docUrl: 'https://automatisch.io/docs/gitlab#client-secret',
        clickToCopy: false,
      },
    ];
  }

  getFields() {
    return this.fields;
  }

  getAuthUrl() {
    const { instanceUrl, clientId, oAuthRedirectUrl } = this.fields.find(
      (field) => field.key === 'instanceUrl' || field.key === 'clientId' || field.key === 'oAuthRedirectUrl'
    );
    return generateAuthUrl(instanceUrl.value, clientId.value, oAuthRedirectUrl.value);
  }

  refresh(clientId, clientSecret) {
    return refreshToken(clientId, clientSecret);
  }

  verify(instanceUrl, clientId, clientSecret, refreshToken) {
    return verifyCredentials(instanceUrl.value, clientId, clientSecret, refreshToken);
  }

  isVerified(instanceUrl, clientId, clientSecret, refreshToken) {
    return isStillVerified(instanceUrl.value, clientId, clientSecret, refreshToken);
  }
}
