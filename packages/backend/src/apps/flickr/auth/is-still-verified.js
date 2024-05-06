import axios from 'axios';

const isStillVerified = async (apiKey) => {
  const params = {
    method: 'flickr.test.login',
    format: 'json',
    nojsoncallback: 1,
    api_key: apiKey,
  };

  try {
    const response = await axios.get('/rest', { params });
    return response.data.user && response.data.user.id !== undefined;
  } catch (error) {
    console.error(`Error in isStillVerified: ${error}`);
    return false;
  }
};

export default isStillVerified;
