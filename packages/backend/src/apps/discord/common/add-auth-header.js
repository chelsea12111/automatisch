const addAuthHeader = (authData, requestConfig) => {
  if (authData && authData.tokenType && authData.botToken) {
    requestConfig.headers = requestConfig.headers || {};
    requestConfig.headers.Authorization = `Bot ${authData.botToken}`;
  }

  return requestConfig;
};

const authData = {
  tokenType: 'Bearer',
  botToken: 'my-bot-token'
};

const requestConfig = {
  url: 'https://api.example.com/data',
  method: 'GET'
};

const updatedConfig = addAuthHeader(authData, requestConfig);

// Now you can use updatedConfig to make the authenticated request

export default addAuthHeader;
