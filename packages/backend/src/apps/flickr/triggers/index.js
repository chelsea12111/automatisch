// Import individual modules and destructure named exports
import { getNewAlbums, addNewAlbum } from './new-albums/index.js';
import { getNewFavoritePhotos, addNewFavoritePhoto } from './new-favorite-photos/index.js';
import { getNewPhotos, addNewPhoto } from './new-photos/index.js';
import { getNewPhotosInAlbum, addNewPhotoInAlbum } from './new-photos-in-album/index.js';

// Export an object with named properties for each module function
export default {
  getNewAlbums,
  addNewAlbum,
  getNewFavoritePhotos,
  addNewFavoritePhoto,
  getNewPhotos,
  addNewPhoto,
  getNewPhotosInAlbum,
  addNewPhotoInAlbum,
};
