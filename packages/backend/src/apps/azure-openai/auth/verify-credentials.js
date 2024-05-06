const verifyCredentials = async ($) => {
  try {
    await $.http.get(`/fine_tuning/jobs`);
  } catch (error) {
    console.error(`Error in verifyCredentials: ${error}`);
    throw error;
  }
};

// Adding a description to the exported function
/**
 * Verifies user credentials by making a GET request to the fine-tuning jobs endpoint.
 * @function
 * @param {Object} $ - The request object.
 * @returns {Promise} A promise that resolves when the request is successful.
 */
export default verifyCredentials;
