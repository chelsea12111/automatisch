const addAuthHeader = (axiosInstance, requestConfig) => {
  const authData = axiosInstance.defaults.headers.common.Authorization;

  if (authData) {
    const [type, credentials] = authData.split(' ');

    if (type === 'Basic' || type === 'Bearer') {
      requestConfig.headers.Authorization = authData;
    } else if (type === 'ApiKey') {
      requestConfig.headers['x-api-key'] = credentials;
    }
  }

  return requestConfig;
};

const axiosInstance = axios.create();
axiosInstance.defaults.headers.common.Authorization =
  'ApiKey ' + process.env.REACT_APP_API_KEY;

export { addAuthHeader, axiosInstance };

