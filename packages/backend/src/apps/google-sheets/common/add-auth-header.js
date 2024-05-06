const addAuthHeader = (authData, requestConfig) => {
  if (authData && authData.accessToken) {
    requestConfig.headers = requestConfig.headers || {};
    requestConfig.headers.Authorization = `${authData.tokenType} ${authData.accessToken}`;
  }

  return requestConfig;
};

const authData = {
  data: {
    accessToken: 'your_access_token',
    tokenType: 'Bearer'
  }
};

export default addAuthHeader(authData);
