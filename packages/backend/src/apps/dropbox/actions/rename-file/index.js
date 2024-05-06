import path from 'node:path';
import defineAction from '../../../../helpers/define-action.js';

export default defineAction({
  name: 'Rename file',
  key: 'renameFile',
  description: 'Rename a file with the given file path and new name',
  arguments: [
    {
      label: 'File Path',
      key: 'filePath',
      type: 'string',
      required: true,
      description: 'Write the full path to the file such as /Folder1/File.pdf',
      variables: true,
    },
    {
      label: 'New Name',
      key: 'newName',
      type: 'string',
      required: true,
      description:
        "Enter the new name for the file (without the extension, e.g., '.pdf')",
      variables: true,
    },
  ],

  async run($) {
    const validate = (value, label) => {
      if (typeof value !== 'string') {
        throw new Error(`${label} must be a string`);
      }
      if (value.trim() === '') {
        throw new Error(`${label} cannot be empty`);
      }
    };

    const { filePath, newName } = $.step.parameters;

    validate(filePath, 'File Path');
    validate(newName, 'New Name');

    const fileObject = path.parse(filePath);

    // Check that the new name does not contain the file extension
    if (fileObject.ext && newName.includes(fileObject.ext)) {
      throw new Error('New name cannot contain the file extension');
    }

    const newPath = path.format({
      dir: fileObject.dir,
      ext: fileObject.ext,
      name: newName,
    });

    // Check that the new path is not the same as the old path
    if (newPath === filePath) {
      throw new Error('New path cannot be the same as the old path');
    }

    try {
      const response = await $.http.post('/2/files/move_v2', {
        from_path: filePath,
        to_path: newPath,
      });

      $.setActionItem({ raw: response.data.metadata });
    } catch (error) {
      if (error.response?.data?.error?.code === 'file_not_found') {
        throw new Error('The specified file was not found');
      } else if (error.response?.data?.error?.code === 'cant_rename') {
        throw new Error('The file cannot be renamed due to permission or other issues');
      } else {
        throw error;
      }
    }
  },
});
