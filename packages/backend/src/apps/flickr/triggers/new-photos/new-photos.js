type Photo = {
  id: string;
  // add other properties as needed
};

type PhotosResponse = {
  photos: {
    page: number;
    pages: number;
    photo: Photo[];
  };
};

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
];

const newPhotos = async (auth: { data: { userId: string } }) => {
  let page = 1;
  let pages = 1;

  do {
    try {
      const response = await fetch('/rest', {
        method: 'GET',
        params: {
          page,
          per_page: 500,
          user_id: auth.data.userId,
          extras: extraFields.join(','),
          method: 'flickr.photos.search',
          format: 'json',
          nojsoncallback: 1,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PhotosResponse = await response.json();
      const photos = data.photos.photo;

      for (const photo of photos) {
        // Use `Object.assign` to create a new object with the desired properties
        $.pushTriggerItem({
          raw: photo,
          meta: Object.assign({}, photo, {
            internalId: photo.id,
          }),
        });
      }

      page = data.photos.page + 1;
      pages = data.photos.pages;

    } catch (error) {
      console.error(`Error: ${error}`);
    }
  } while (page <= pages);
};

export default newPhotos;
