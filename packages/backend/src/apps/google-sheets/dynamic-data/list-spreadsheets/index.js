import { get } from 'lodash';

export default {
  name: 'List spreadsheets',
  key: 'listSpreadsheets',

  async run($) {
    const spreadsheets = {
      data: [],
    };

    const params = {
      q: `mimeType='application/vnd.google-apps.spreadsheet'`,
      pageSize: 100,
      pageToken: undefined,
      orderBy: 'createdTime desc',
      driveId: get($.step.parameters, 'driveId', undefined),
      supportsAllDrives: true,
    };

    // Validate driveId parameter
    if (params.driveId) {
      if (typeof params.driveId !== 'string') {
        throw new Error('Invalid driveId parameter. Expected a string.');
      }

      params.includeItemsFromAllDrives = true;
      params.corpora = 'drive';
    }

    do {
      try {
        const { data } = await $.http.get(
          `https://www.googleapis.com/drive/v3/files`,
          { params }
        );

        if (data.files?.length) {
          for (const file of data.files) {
            spreadsheets.data.push({
              value: file.id,
              name: file.name,
            });
          }
        }

        params.pageToken = data.nextPageToken;
      } catch (error) {
        $.log('Error fetching spreadsheets:', error);
        break;
      }
    } while (params.pageToken);

    return spreadsheets;
  },
};
