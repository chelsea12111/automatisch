import type { HttpClient, TriggerItem } from '$lib';

const extraFields = [
  'description',
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
  'url_q',
  'url_m',
  'url_n',
  'url_z',
  'url_c',
  'url_l',
  'url_o',
].join(',');

interface Photo {
  date_faved: string;
  // add other properties as needed
}

const newPhotos = async ($, auth: { data: { userId: string } }, http: HttpClient) => {
  let page = 1;
  let pages = 1;

  do {
    const params = {
      page,
      per_page: 500,
      user_id: auth.data.userId,
      extras: extraFields,
      method: 'flickr.favorites.getList',
      format: 'json',
      nojsoncallback: 1,
    };

    try {
      const response = await http.get('/rest', { params });
      const photos: { photo: Photo[]; page: number; pages: number } = response.data;
      page = photos.page + 1;
      pages = photos.pages;

      for (const photo of photos.photo) {
        const {
          id,
          owner,
          secret,
          server,
          farm,
          title,
          ispublic,
          isfriend,
          isfamily,
          dateupload,
          datefaved,
          // add other properties as needed
        } = photo;

        $.pushTriggerItem({
          raw: photo,
          meta: {
            internalId: datefaved,
            id,
            owner,
            secret,
            server,
            farm,
            title,
            ispublic,
            isfriend,
            isfamily,
            dateupload,
            // add other properties as needed
          },
        } as TriggerItem<Photo>);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  } while (page <= pages);
};

export default newPhotos;
