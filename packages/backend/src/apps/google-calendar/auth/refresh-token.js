import { URLSearchParams } from 'node:url';
import axios from 'axios';

const authScope = '../common/auth-scope.js';

const refreshToken = async ({ auth }) => {
  const params = new URLSearchParams({
    client_id: auth.data.clientId,
    client_secret: auth.data.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: auth.data.refreshToken,
  });

  try {
    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    auth.set({
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in,
      scope: authScope.join(' '),
      tokenType: response.data.token_type,
    });

  } catch (error) {
    console.error('Error refreshing token:', error.message);
    throw error;
  }
};

export default refreshToken;
