// Adding type definitions for better type safety and autocompletion
type User = {
  id: number;
  username: string;
  email: string;
  // add other properties as needed
};

interface HttpClient {
  get(url: string): Promise<{ data: User }>;
}

const getCurrentUser = async (httpClient: HttpClient): Promise<User> => {
  // ref: https://docs.gitlab.com/ee/api/users.html#list-current-user

  const response = await httpClient.get('/api/v4/user');
  const currentUser = response.data;
  return currentUser;
};

// Instantiate the HttpClient as needed, e.g. using fetch or axios
const httpClient: HttpClient = {
  async get(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  },
};

export default getCurrentUser;
