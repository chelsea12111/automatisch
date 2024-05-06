import { URLSearchParams } from 'node:url';
import authScope from '../common/auth-scope.js';

const refreshToken = async ($) => {
  const params = new URLSearchParams({
    client_id: $.auth.data.clientId,
    client_secret: $.auth.data.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: $.auth.data.refreshToken,
  });

  try {
    const response = await $.http.post(
      'https://oauth2.googleapis.com/token',
      params
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    await $.auth.set({
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      scope: authScope.join(' '),
      tokenType: data.token_type,
    });

  } catch (error) {
    console.error('An error occurred while refreshing the token:', error);
    throw error;
  }
};

export default refreshToken;
