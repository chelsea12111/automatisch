import { URLSearchParams } from 'url';

const addAuthHeader = (axiosInstance, requestConfig) => {
  if (!axiosInstance || !requestConfig) {
    throw new Error('axiosInstance and requestConfig are required parameters');
  }

  const authData = axiosInstance.defaults.headers.common['Authorization'].data;
  if (!authData) {
    throw new Error('Authorization data not found in axiosInstance defaults');
  }

  const params = new URLSearchParams({
    access_token: authData.accessToken,
    api_key: authData.apiKey,
    api_secret: authData.apiSecret,
  });

  requestConfig.params = params;

  return requestConfig;
};

export default addAuthHeader;
