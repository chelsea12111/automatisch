import { verifyCredentials } from './verify-credentials.js';

/**
 * Checks if the user's credentials are still valid.
 * @param {Object} user - The user object containing the credentials to verify.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the credentials are still valid, or `false` otherwise.
 */
const isStillVerified = async (user) => {
  try {
    await verifyCredentials(user);
    return true;
  } catch (error) {
    console.error(`Error verifying user credentials: ${error.message}`);
    return false;
  }
};

// Export the function using named export syntax for better code readability
export { isStillVerified };

