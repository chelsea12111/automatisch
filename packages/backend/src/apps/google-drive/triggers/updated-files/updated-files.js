const validateParameters = (params) => {
  if (!params.driveId) {
    throw new Error("Missing required parameter: 'driveId'");
  }

  if (params.includeItemsFromAllDrives && !params.corpora) {
    throw new Error(
      "When 'includeItemsFromAllDrives' is set to true, 'corpora' parameter is required"
    );
  }
};

const updatedFiles = async ($) => {
  const params = {
    pageToken: undefined,
    orderBy: 'modifiedTime desc',
    fields: '*',
    pageSize: 1000,
    q: `mimeType!='application/vnd.google-apps.folder'`,
    driveId: $.step.parameters.driveId,
    supportsAllDrives: true,
  };

  try {
    validateParameters(params);

    if ($.step.parameters.includeDeleted !== false) {
      params.q += ` and trashed=${$.step.parameters.includeDeleted}`;
    }

    if ($.step.parameters.folderId) {
      params.q += ` and '${$.step.parameters.folderId}' in parents`;
    } else {
      params.q += ` and parents in 'root'`;
    }

    if (params.includeItemsFromAllDrives) {
      params.corpora = 'drive';
    }

    do {
      let { data } = await $.http.get(`/v3/files`, { params });

      if (data.files?.length) {
        for (const file of data.files) {
          $.pushTriggerItem({
            raw: file,
            meta: {
              internalId: `${file.id}-${file.modifiedTime}`,
            },
          });
        }
      }

      params.pageToken = data.nextPageToken;
    } while (params.pageToken);
  } catch (error) {
    $.log(error.message);
    throw error;
  }
};

export default updatedFiles;
