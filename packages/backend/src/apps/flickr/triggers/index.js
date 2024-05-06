// Import individual modules instead of default export
import * as newAlbums from './new-albums/index.js';
import * as newFavoritePhotos from './new-favorite-photos/index.js';
import * as newPhotos from './new-photos/index.js';
import * as newPhotosInAlbums from './new-photos-in-album/index.js';

// Export an object with named properties for each module
export default {
  newAlbums,
  newFavoritePhotos,
  newPhotos,
  newPhotosInAlbums,
};
