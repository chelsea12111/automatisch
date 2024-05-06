import axios, { AxiosResponse } from 'axios';

const getAccessTokenInfo = async (axiosInstance: AxiosInstance): Promise<AccessTokenInfo> => {
  try {
    const response: AxiosResponse<AccessTokenInfo> = await axiosInstance.get(
      `/oauth/v1/access-tokens/${axiosInstance.auth.data.accessToken}`
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      // Handle error based on response status and data
      console.error(`Error getting access token info: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // Handle error due to network issues
      console.error('Error getting access token info: No response received');
    } else {
      // Handle error due to other issues
      console.error('Error getting access token info:', error.message);
    }

    throw error;
  }
};

export default getAccessTokenInfo;
