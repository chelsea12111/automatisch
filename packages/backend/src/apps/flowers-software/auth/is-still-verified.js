import { verifyCredentials } from './verify-credentials.js';

const isStillVerified = async (userData) => {
  try {
    await verifyCredentials(userData);
    return true;
  } catch (error) {
    console.error('Error during verification:', error);
    return false;
  }
};

export default isStillVerified;
