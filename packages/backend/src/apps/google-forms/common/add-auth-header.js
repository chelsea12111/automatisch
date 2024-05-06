const addAuthHeader = ($, requestConfig) => {
  if (requestConfig && $.auth && $.auth.data && $.auth.data.accessToken) {
    const { tokenType, accessToken } = $.auth.data;
    if (!accessToken) {
      console.error('Access token is missing or empty');
      return requestConfig;
    }

    const authHeader = `${tokenType} ${accessToken}`;
    const headers = Object.assign({}, requestConfig.headers, { Authorization: authHeader });
    requestConfig = Object.assign({}, requestConfig, { headers });
  }
  return requestConfig;
};

module.exports = addAuthHeader;

