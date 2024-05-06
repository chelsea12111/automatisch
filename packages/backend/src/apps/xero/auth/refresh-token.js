import { URLSearchParams } from 'node:url';
import axios, { AxiosResponse } from 'axios';

import authScope from '../common/auth-scope.js';

const refreshToken = async (config: any): Promise<AxiosResponse> => {
  const { clientId, clientSecret, refreshToken } = config.auth.data;

  const headers = {
    Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const response = await axios.post(
    'https://identity.xero.com/connect/token',
    params.toString(),
    {
      headers,
    }
  );

  await config.auth.set({
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
    expiresIn: response.data.expires_in,
    idToken: response.data.id_token,
    scope: authScope.join(' '),
    tokenType: response.data.token_type,
  });

  return response;
};

export default refreshToken;
