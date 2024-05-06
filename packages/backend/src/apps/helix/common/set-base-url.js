// utils/setBaseUrl.js

const setBaseUrl = (axiosInstance, requestConfig = {}) => {
  const instanceUrl = axiosInstance.defaults.baseURL;
  const appApiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  if (instanceUrl) {
    requestConfig.baseURL = instanceUrl;
  } else if (appApiBaseUrl) {
    requestConfig.baseURL = appApiBaseUrl;
  } else {
    console.warn('No base URL found for API requests');
  }

  return requestConfig;
};

export default setBaseUrl;

// and then in your main index.js or app.js file

import axios from 'axios';
import setBaseUrl from './utils/setBaseUrl';

const apiClient = axios.create();

apiClient.interceptors.request.use(config =>
  setBaseUrl(apiClient, config)
);

export default apiClient;
