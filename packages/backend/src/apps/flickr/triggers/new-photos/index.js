// Import the necessary modules and functions
import defineTrigger from '../../../../helpers/define-trigger.js';
import newPhotos from './new-photos.js';
import { logError } from '../../../../helpers/utils.js';

// Define the trigger with better configuration and error handling
export default defineTrigger({
  name: 'New Photos',
  pollInterval: 15, // Check for new photos every 15 minutes
  key: 'newPhotos',
  description: 'Triggers when a new photo is added.',
  onError: (error, $) => {
    logError(`Error in new photos trigger: ${error.message}`, $, error);
  },

  // Run the trigger function
  async run($) {
    try {
      await newPhotos($);
    } catch (error) {
      // If there's an error, reject the promise and log it
      return Promise.reject(error);
    }
  },
});

// Separate the log error function for better readability
const logError = (message, $, error) => {
  log.error(`${message} \n$, ${JSON.stringify($, null, 2)} \nError: ${error.stack}`);
};
