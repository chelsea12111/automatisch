const addAuthHeader = ($, requestConfig) => {
  if (requestConfig && $.auth && $.auth.data && $.auth.data.accessToken) {
    const authHeader = `${$.auth.data.tokenType} ${$.auth.data.accessToken}`;
    if (!requestConfig.headers) {
      requestConfig.headers = {};
    }
    requestConfig.headers.Authorization = authHeader;
  }
  return requestConfig;
};

module.exports = addAuthHeader;
