import verifyCredentials from './verify-credentials.js';

const isStillVerified = async ($) => {
  try {
    await verifyCredentials($);
    return true;
  } catch (error) {
    console.error('Error during verification:', error);
    return false;
  }
};

export default isStillVerified;
