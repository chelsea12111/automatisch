import axios from 'axios';

export default {
  name: 'List drives',
  key: 'listDrives',

  async run() {
    const drives = [{ value: null, name: 'My Google Drive' }];
    let pageToken = undefined;

    do {
      const params = {
        pageSize: 100,
        pageToken,
      };

      const response = await axios.get('/v3/drives', { params });
      pageToken = response.data.nextPageToken;

      const newDrives = response.data.drives || [];
      drives.push(...newDrives.map((drive) => ({ value: drive.id, name: drive.name })));
    } while (pageToken);

    return drives;
  },
};

