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

// Adding a check to ensure that the input is an object
const isObject = (input) => {
  return typeof input === 'object' && !Array.isArray(input) && input !== null;
};

// Exporting the isStillVerified function with a check for valid input
export default (input$) => {
  if (!isObject(input$)) {
    console.error('Invalid input: isStillVerified expects an object as input');
    return false;
  }
  return isStillVerified(input$);
};
