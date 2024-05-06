import { URLSearchParams } from 'url';
import getCurrentUser from '../common/get-current-user.js';

const verifyCredentials = async ($) => {
  const oauthRedirectUrlField = $.app.auth.fields.find(
    (field) => field.key === 'oAuthRedirectUrl'
  );
  const redirectUri = oauthRedirectUrlField.value;

  const queryParams = new URLSearchParams({
    grant_type: 'authorization_code',
    code: $.auth.data.code,
    redirect_uri: redirectUri,
  });

  const headers = {
    Authorization: `Basic ${Buffer.from(
      $.auth.data.clientId + ':' + $.auth.data.clientSecret
    ).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const response = await $.http.post(
      `https://oauth.pipedrive.com/oauth/token`,
      queryParams.toString(),
      { headers }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.access_token) {
      throw new Error('Invalid response data');
    }

    const {
      access_token: accessToken,
      api_domain: apiDomain,
      expires_in: expiresIn,
      refresh_token: refreshToken,
      scope,
      token_type: tokenType,
    } = data;

    await $.auth.set({
      accessToken,
      apiDomain,
      expiresIn,
      refreshToken,
      scope,
      tokenType,
    });

    const user = await getCurrentUser($);

    const screenName = [user.name, user.company_domain]
      .filter(Boolean)
      .join(' @ ');

    await $.auth.set({
      userId: user.id,
      screenName,
    });
  } catch (error) {
    console.error('Error:', error);
    // Handle the error here
  }
};

export default verifyCredentials;
