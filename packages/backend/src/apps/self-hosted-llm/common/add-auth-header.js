const addAuthHeader = (authData, requestConfig) => {
  if (authData && authData.apiKey) {
    requestConfig.headers = requestConfig.headers || {};
    requestConfig.headers.Authorization = `Bearer ${authData.apiKey}`;
  }

  return requestConfig;
};

// Ensure that the `authData` argument is always an object, even if it's undefined
const withDefaults = (authData = {}) => addAuthHeader(authData);

// Export the function with default parameters
export default withDefaults;
