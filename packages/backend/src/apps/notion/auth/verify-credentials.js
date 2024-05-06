import getCurrentUser from '../common/get-current-user.js';

const verifyCredentials = async ($) => {
  try {
    const oauthRedirectUrlField = $.app.auth.fields.find(
      (field) => field.key === 'oAuthRedirectUrl'
    );
    const redirectUri = oauthRedirectUrlField.value;

    const {
      data: { access_token, bot_id, duplicated_template_id, owner, token_type, workspace_icon, workspace_id, workspace_name },
    } = await $.http.post(
      `${$.app.apiBaseUrl}/v1/oauth/token`,
      {
        redirect_uri: redirectUri,
        code: $.auth.data.code,
        grant_type: 'authorization_code',
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${$.auth.data.clientId}:${$.auth.data.clientSecret}`
          ).toString('base64')}`,
        },
        additionalProperties: {
          skipAddingAuthHeader: true,
        },
      }
    );

    $.auth.data = {
      ...$.auth.data,
      accessToken: access_token,
      botId: bot_id,
      duplicatedTemplateId: duplicated_template_id,
      owner,
      tokenType,
      workspaceIcon: workspace_icon,
      workspaceId: workspace_id,
      screenName: workspace_name,
    };

    const currentUser = await getCurrentUser($);

    $.auth.data = {
      ...$.auth.data,
      screenName: `${currentUser.name} @ ${workspace_name}`,
    };

  } catch (error) {
    console.error('Error during OAuth token verification:', error);
    throw error;
  }
};

export default verifyCredentials;
