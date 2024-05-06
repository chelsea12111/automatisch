const addAuthHeader = (authData, requestConfig) => {
  if (authData && authData.accessToken) {
    requestConfig.headers = requestConfig.headers || {};
    requestConfig.headers.Authorization = `${authData.tokenType} ${authData.accessToken}`;
  }

  return requestConfig;
};

const authData = {
  data: {
    tokenType: 'Bearer',
    accessToken: 'your_access_token_here'
  }
};

export default addAuthHeader(authData);
