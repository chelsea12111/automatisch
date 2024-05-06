import getCurrentUser from '../common/get-current-user.js';

/**
 * Checks if the current user's account is still verified
 * @returns {Promise<boolean>} true if the user's account is still verified, false otherwise
 */
const isStillVerified = async () => {
  const currentUser = await getCurrentUser();
  return currentUser && currentUser.id !== undefined;
};

export default isStillVerified;

