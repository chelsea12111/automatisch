const isStillVerified = async (http) => {
  try {
    await http.get('/v1/models');
    return true;
  } catch (error) {
    console.error('Error while checking if user is still verified:', error);
    return false;
  }
};

export default isStillVerified;
