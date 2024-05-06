import getCurrentUser from '../common/get-current-user.js';

export default async function isStillVerified($) {
  try {
    await getCurrentUser($);
    return true;
  } catch (error) {
    // Handle the error, e.g. by logging it or rejecting the promise
    console.error(error);
    throw error;
  }
}

