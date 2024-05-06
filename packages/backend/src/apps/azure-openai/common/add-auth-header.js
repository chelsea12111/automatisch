const addAuthHeader = ($, requestConfig = {}) => {
  if ($.auth && $.auth.data && $.auth.data.apiKey) {
    requestConfig.headers = requestConfig.headers || {};
    requestConfig.headers['api-key'] = $.auth.data.apiKey;
  }

  if ($.apiVersion) {
    requestConfig.params = requestConfig.params || {};
    requestConfig.params['api-version'] = $.apiVersion;
  }

  return requestConfig;
};

export default addAuthHeader;
