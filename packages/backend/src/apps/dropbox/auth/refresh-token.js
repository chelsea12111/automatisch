import fetch from 'node-fetch';
import { retry } from 'async-retry';
import * as dotenv from 'dotenv';
import * as joi from '@hapi/joi';
import { Buffer } from 'node:buffer';

dotenv.config();

interface IAuthData {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

interface IAuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

const refreshToken = async (authData: IAuthData): Promise<IAuthResponse> => {
  const schema = joi.object({
    clientId: joi.string().required(),
    clientSecret: joi.string().required(),
    refreshToken: joi.string().required(),
  });

  const { error } = schema.validate(authData);
  if (error) {
    throw new Error(`Invalid auth data: ${error.message}`);
  }

  const params = {
    grant_type: 'refresh_token',
    refresh_token: authData.refreshToken,
  };

  const basicAuthToken = Buffer.from(`${authData.clientId}:${authData.clientSecret}`).toString('base64');

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basicAuthToken}`,
    },
  };

  const url = `https://api.example.com/oauth2/token?${new URLSearchParams(params)}`;

  let response: Response;
  try {
    response = await retry(async () => {
      return await fetch(url, fetchOptions);
    }, {
      retries: 3,
      minTimeout: 1000,
      maxTimeout: 5000,
      randomize: true,
    });
  } catch (error) {
    throw new Error(`Failed to refresh token: ${error.message}`);
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to refresh token: ${body}`);
  }

  const data = await response.json() as IAuthResponse;

  return data;
};

export default refreshToken;


npm install async-retry node-fetch dotenv @hapi/joi @types/node @types/async-retry
