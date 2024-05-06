const getCurrentUser = async (http) => {
  try {
    const response = await http.get('/api/v4/users/me');
    const currentUser = response.data;
    return currentUser;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

export default getCurrentUser;

