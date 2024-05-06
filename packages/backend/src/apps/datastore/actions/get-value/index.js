import defineAction from '../../../../helpers/define-action.js';

export default defineAction({
  name: 'Get Value',
  key: 'getValue',
  description: 'Retrieve a value from the persistent datastore using a given key.',
  document: 'Retrieves the value associated with the provided key from the datastore. If the key does not exist, the action will return `null`.',
  version: '1.0.0',
  inputs: [
    {
      label: 'Key',
      key: 'key',
      type: 'string',
      description: 'The key of the value to retrieve from the datastore.',
      required: true,
      dynamic: true,
    },
  ],
  outputs: [
    {
      label: 'Value',
      key: 'value',
      type: 'any',
      description: 'The value associated with the provided key in the datastore.',
    },
  ],
  async run($) {
    const key = $.inputs.key;
    const keyValuePair = await $.datastore.get({ key });

    if (keyValuePair) {
      $.outputs.value = keyValuePair.value;
    } else {
      $.outputs.value = null;
    }
  },
});
