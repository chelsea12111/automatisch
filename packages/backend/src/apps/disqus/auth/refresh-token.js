import { URLSearchParams } from 'node:url';
import authScope from '../common/auth-scope.js';
import type { HttpClient } from '../common/http-client.js';

type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
};

const refreshToken = async (httpClient: HttpClient, authData: {
  apiKey: string;
  apiSecret: string;
  refreshToken: string;
}) => {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: authData.apiKey,
    client_secret: authData.apiSecret,
    refresh_token: authData.refreshToken,
  });

  const endpoint = new URL('https://disqus.com/api/oauth/2.0/access_token/');

  try {
    const { data } = await httpClient.post<RefreshTokenResponse>(endpoint, {
      body: params.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    await authData.set({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      scope: authScope.join(','),
      tokenType: data.token_type,
    });
  } catch (error) {
    // Handle the error here
    console.error(error);
  }
};

export default refreshToken;
