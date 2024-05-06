export default {
  name: 'List drives',
  key: 'listDrives',

  async run($) {
    const drives = {
      data: [{ value: null, name: 'My Google Drive' }],
    };

    const paginationParams = {
      pageSize: 100,
      pageToken: undefined,
    };

    do {
      let response;
      try {
        response = await $.http.get(
          `https://www.googleapis.com/drive/v3/drives`,
          { params: paginationParams }
        );
      } catch (error) {
        $.log('Error fetching drives:', error);
        break;
      }

      const { data: driveData } = response;

      if (driveData && driveData.drives) {
        for (const drive of driveData.drives) {
          drives.data.push({
            value: drive.id,
            name: drive.name,
          });
        }
      }

      paginationParams.pageToken = driveData.nextPageToken;

    } while (paginationParams.pageToken);

    return drives;
  },
};
