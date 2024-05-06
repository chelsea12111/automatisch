import defineAction from '../../../../helpers/define-action.js';

export default defineAction({
  name: 'Create worksheet',
  key: 'createWorksheet',
  description: 'Create a blank worksheet with a title. Optionally, provide headers.',
  arguments: [
    {
      label: 'Drive',
      key: 'driveId',
      type: 'dropdown',
      required: false,
      description: 'The Google Drive where your spreadsheet resides. If nothing is selected, then your personal Google Drive will be used.',
      variables: true,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [{ name: 'key', value: 'listDrives' }],
      },
    },
    {
      label: 'Spreadsheet',
      key: 'spreadsheetId',
      type: 'dropdown',
      required: true,
      dependsOn: ['parameters.driveId'],
      variables: true,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          { name: 'key', value: 'listSpreadsheets' },
          { name: 'parameters.driveId', value: '{$parameters.driveId}' },
        ],
      },
    },
    {
      label: 'Title',
      key: 'title',
      type: 'string',
      required: true,
      description: '',
      variables: true,
    },
    {
      label: 'Headers',
      key: 'headers',
      type: 'dynamic',
      required: false,
      fields: [
        {
          label: 'Header',
          key: 'header',
          type: 'string',
          required: true,
          variables: true,
        },
      ],
    },
    {
      label: 'Overwrite',
      key: 'overwrite',
      type: 'dropdown',
      required: false,
      value: false,
      description: 'If a worksheet with the specified title exists, its content would be lost. Please, use with caution.',
      variables: true,
      options: [
        {
          label: 'Yes',
          value: true,
        },
        {
          label: 'No',
          value: false,
        },
      ],
    },
  ],

  async run($) {
    try {
      const spreadsheetInfo = await $.http.get(`/v4/spreadsheets/${$.step.parameters.spreadsheetId}`);
      const { sheets } = spreadsheetInfo.data;

      const selectedSheet = sheets.find(
        (sheet) => sheet.properties.title === $.step.parameters.title
      );

      const headers = $.step.parameters.headers;
      if (headers && headers.length > 0) {
        const values = headers.map((entry) => entry.header);

        const addSheetRequest = {
          addSheet: {
            properties: {
              title: $.step.parameters.title,
            },
          },
        };

        const body = {
          requests: [addSheetRequest],
        };

        if ($.step.parameters.overwrite && selectedSheet) {
          body.requests.unshift({
            deleteSheet: {
              sheetId: selectedSheet.properties.sheetId,
            },
          });
        }

        const spreadsheetUpdateResponse = await $.http.post(
          `https://sheets.googleapis.com/v4/spreadsheets/${$.step.parameters.spreadsheetId}:batchUpdate`,
          body
        );

        const updateCellsRequest = {
          updateCells: {
            rows: [
              {
                values: values.map((header) => ({
                  userEnteredValue: { stringValue: header },
                })),
              },
            ],
            fields: '*',
            start: {
              sheetId:
                spreadsheetUpdateResponse.data.replies[
                  spreadsheetUpdateResponse.data.replies.length - 1
                ].addSheet.properties.sheetId,
              rowIndex: 0,
              columnIndex: 0,
            },
          },
        };

        await $.http.post(
          `https://sheets.googleapis.com/v4/spreadsheets/${$.step.parameters.spreadsheetId}:batchUpdate`,
          { requests: [updateCellsRequest] }
        );

        $.setActionItem({
          raw: spreadsheetUpdateResponse,
        });
        return;
      }

      $.setActionItem({
        raw: spreadsheetInfo,
      });
    } catch (error) {
      $.log(error);
      $.setActionItem({
        raw: error.response,
      });
    }
  },
});
