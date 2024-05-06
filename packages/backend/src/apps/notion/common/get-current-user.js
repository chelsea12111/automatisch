const getCurrentUser = async ({ auth }) => {
  if (!auth || !auth.data || !auth.data.owner || !auth.data.owner.user || !auth.data.owner.user.id) {
    throw new Error('Unauthorized: missing or invalid authentication data');
  }

  const response = await fetch(`/v1/users/${auth.data.owner.user.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch current user: ${response.statusText}`);
  }

  const currentUser = await response.json();
  return currentUser;
};

export default getCurrentUser;

