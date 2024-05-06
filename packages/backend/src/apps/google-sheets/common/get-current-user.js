import axios, { AxiosResponse } from 'axios';

type CurrentUser = {
  names?: {
    displayName?: string;
  }[];
  emailAddresses?: {
    value?: string;
  }[];
};

const getCurrentUser = async (): Promise<CurrentUser | null> => {
  try {
    const response: AxiosResponse<CurrentUser> = await axios.get(
      'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export default getCurrentUser;
