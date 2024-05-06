const newFolders = async ($) => {
  // Validate function parameters
  if (!$.step || !$.step.parameters) {
    throw new Error('Invalid function parameters');
  }

  const { driveId, folderId } = $.step.parameters;

  let q = "mimeType='application/vnd.google-apps.folder'";
  if (folderId) {
    q += ` and '${folderId}' in parents`;
  } else {
    q += ` and parents in 'root'`;
  }

  const params = {
    pageSize: 1000,
    q,
    fields: '*',
    orderBy: 'createdTime desc',
  };

  if (driveId) {
    params.driveId = driveId;
    params.supportsAllDrives = true;
    params.includeItemsFromAllDrives = true;
    params.corpora = 'drive';
  }

  let pageToken = undefined;

  do {
    // Add try-catch block for error handling
    try {
      const { data } = await $.http.get(`/v3/files`, { params, pageToken });

      if (data.files?.length) {
        for (const file of data.files) {
          $.pushTriggerItem({
            raw: file,
            meta: {
              internalId: file.id,
            },
          });
        }
      }

      pageToken = data.nextPageToken;
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  } while (pageToken);
};

export default newFolders;
