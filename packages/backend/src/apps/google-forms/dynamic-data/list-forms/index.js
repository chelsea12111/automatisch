export default {
  name: 'List forms',
  key: 'listForms',

  async run($) {
    const forms = {
      data: [],
    };

    const params = {
      q: `mimeType='application/vnd.google-apps.form'`,
      spaces: 'drive',
      pageToken: undefined,
    };

    do {
      const response = await $.http.get(
        `https://www.googleapis.com/drive/v3/files`,
        { params }
      );

      const { data } = response;
      if (!data || !data.files) {
        break;
      }

      params.pageToken = data.nextPageToken;

      forms.data.push(
        ...data.files.map(file => ({
          value: file.id,
          name: file.name,
        }))
      );

    } while (params.pageToken);

    return forms;
  },
};

