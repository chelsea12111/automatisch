import axios, { AxiosResponse } from 'axios';

const extraFields = [
  'license',
  'date_upload',
  'date_taken',
  'owner_name',
  'icon_server',
  'original_format',
  'last_update',
  'geo',
  'tags',
  'machine_tags',
  'o_dims',
  'views',
  'media',
  'path_alias',
  'url_sq',
  'url_t',
  'url_s',
  'url_m',
  'url_o',
].join(',');

interface Photoset {
  id: string;
  // add other properties as needed
}

interface PhotosetsResponse {
  photosets: {
    page: number;
    pages: number;
    photoset: Photoset[];
  };
}

const newAlbums = async (auth: { data: { userId: string } }) => {
  let page = 1;
  let pages = 1;

  do {
    try {
      const response: AxiosResponse<PhotosetsResponse> = await axios.get('/rest', {
        params: {
          page,
          per_page: 500,
          user_id: auth.data.userId,
          extras: extraFields,
          method: 'flickr.photosets.getList',
          format: 'json',
          nojsoncallback: 1,
        },
      });
      const { photosets: photos } = response.data;
      page = photos.page + 1;
      pages = photos.pages;

      for (const photoset of photos.photoset) {
        // use photoset here
      }
    } catch (error) {
      console.error(error);
    }
  } while (page <= pages);
};

export default newAlbums;
