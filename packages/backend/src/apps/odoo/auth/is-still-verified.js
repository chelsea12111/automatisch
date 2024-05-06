import { verifyCredentials } from './verify-credentials.js';

const isStillVerified = async (user) => {
  if (!user) {
    throw new Error('User object is required');
  }

  try {
    await verifyCredentials(user);
    return true;
  } catch (error) {
    console.error(`Error verifying user credentials: ${error.message}`);
    return false;
  }
};

// Export the function using named export syntax
export { isStillVerified };

// Alternatively, you can use the following syntax to export the function as default
// export default isStillVerified;

// You can also create a named export for the error message
export const ERROR_MSG_VERIFYING_CREDENTIALS = 'Error verifying user credentials: ';

