import axios from 'axios';

const getCurrentUser = async () => {
  try {
    const response = await axios.get('/api/v1/me');
    const currentUser = response.data;
    return currentUser;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

export default getCurrentUser;

