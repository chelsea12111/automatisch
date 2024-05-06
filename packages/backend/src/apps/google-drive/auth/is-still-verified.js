import getCurrentUser from '../common/get-current-user.js';

const isStillVerified = async (context) => {
  const currentUser = await getCurrentUser(context);
  return currentUser.resourceName ? true : false;
};

export default isStillVerified;
