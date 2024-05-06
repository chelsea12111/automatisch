import { defineTrigger } from '../../../../helpers/index.js';
import newFavoritePhotos from './new-favorite-photos.js';

const triggerName = 'New favorite photos';
const pollInterval = 15; // minutes
const triggerKey = 'newFavoritePhotos';
const triggerDescription = 'Triggers when you favorite a photo.';

export default defineTrigger({
  name: triggerName,
  pollInterval,
  key: triggerKey,
  description: triggerDescription,

  async run($) {
    await newFavoritePhotos($);
  },
});
