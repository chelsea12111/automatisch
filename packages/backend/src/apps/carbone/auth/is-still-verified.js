import { verifyCredentials } from './verify-credentials.js';

const isStillVerified = async (user) => {
  try {
    await verifyCredentials(user);
    return true;
  } catch (error) {
    console.error(`Error verifying user credentials: ${error.message}`);
    return false;
  }
};

export default isStillVerified;
