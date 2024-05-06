import axios, { AxiosResponse } from 'axios';

const getCurrentUser = async (): Promise<AxiosResponse<User>> => {
  try {
    const response = await axios.get<User>('/user');
    return response;
  } catch (error) {
    console.error('Error fetching current user:', error.message);
    throw error;
  }
};

export default getCurrentUser;

interface User {
  id: number;
  name: string;
  email: string;
  // add other user properties as needed
}
