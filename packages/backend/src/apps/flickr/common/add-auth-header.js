import oauthClient from './oauth-client.js';

const addAuthHeader = ($) => (requestConfig) => {
  const { url, method, data, params, baseURL } = requestConfig;

  const token = {
    key: $.auth.data?.accessToken,
    secret: $.auth.data?.accessSecret,
  };

  const requestData = {
    url: `${baseURL}${url}`,
    method,
  };

  if (url === '/oauth/request_token') {
    requestData.data = data;
  } else if (method === 'get') {
    requestData.params = params;
  } else {
    requestData.data = data;
  }

  const authHeader = oauthClient($).toHeader(
    oauthClient($).authorize(requestData, token)
  );

  requestConfig.headers.Authorization = authHeader.Authorization;

  return requestConfig;
};

export default addAuthHeader;
