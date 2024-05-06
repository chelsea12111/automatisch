// Import the necessary modules and functions
import defineTrigger from '../../../../helpers/define-trigger.js';
import newPhotos from './new-photos.js';
import { log } from '../../../../helpers/utils.js';

// Define the trigger with better configuration and error handling
export default defineTrigger({
  name: 'New Photos',
  pollInterval: 15, // Check for new photos every 15 minutes
  key: 'newPhotos',
  description: 'Triggers when a new photo is added.',
  onError: (error, $) => {
    log.error(`Error in new photos trigger: ${error.message}`, $);
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
