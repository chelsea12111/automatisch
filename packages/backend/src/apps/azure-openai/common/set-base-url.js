const setBaseUrl = ($, requestConfig) => {
  const authData = $.auth.data || {};
  const resourceName = authData.resourceName || '';

  if (resourceName) {
    requestConfig.baseURL = `https://${resourceName}.openai.azure.com/openai`;
  }

  return requestConfig;
};

// Add default export only if it's not defined yet
if (typeof exports !== 'undefined' && !exports.default) {
  exports.default = setBaseUrl;
}

// Also export the function as a named export for easier tree shaking
module.exports = { setBaseUrl };

