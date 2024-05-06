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
    const response = await axios.post('https://oauth2.googleapis.com/token', params);
    const { access_token, expires_in, token_type } = response.data;

    auth.set({
      accessToken: access_token,
      expiresIn: expires_in,
      scope: authScope.join(' '),
      tokenType: token_type,
    });

  } catch (error) {
    console.error('Error refreshing token:', error.message);
    throw error;
  }
};

export default refreshToken;
