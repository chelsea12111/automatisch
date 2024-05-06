import defineTrigger from '../../../../helpers/define-trigger.js';
import updatedFiles from './updated-files.js';

export default defineTrigger({
  name: 'Updated files',
  key: 'updatedFiles',
  pollInterval: 15,
  description:
    'Triggers when a file is updated in a specific folder (but not its subfolders).',
  arguments: [
    {
      label: 'Drive',
      key: 'driveId',
      type: 'dropdown',
      required: false,
      description:
        'The Google Drive where your file resides. If nothing is selected, then your personal Google Drive will be used.',
      variables: false,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listDrives',
          },
        ],
      },
    },
    {
      label: 'Folder',
      key: 'folderId',
      type: 'dropdown',
      required: false,
      defaultValue: 'root',
      dependsOn: ['parameters.driveId'],
      description:
        'Check a specific folder for updated files. Please note: files located in subfolders of the folder you choose here will NOT trigger this flow. Defaults to the top-level folder if none is picked.',
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listFolders',
          },
          {
            name: 'parameters.driveId',
            value: '{parameters.driveId}',
          },
        ],
        errorHandler: (_, error) => {
          $.context.log.error('Error while listing folders:', error);
        },
      },
    },
    {
      label: 'Include Deleted',
      key: 'includeDeleted',
      type: 'dropdown',
      required: true,
      value: true,
      description: 'Should this trigger also on files that are deleted?',
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
    const driveId = ${$.parameters.driveId};
    const folderId = ${$.parameters.folderId};
    const includeDeleted = ${$.parameters.includeDeleted};

    if (!driveId) {
      $.context.log.warn('No drive ID provided, using the personal Google Drive.');
    }

    if (!folderId) {
      $.context.log.warn('No folder ID provided, checking the top-level folder.');
    }

    await updatedFiles($, driveId, folderId, includeDeleted);
  },
});
