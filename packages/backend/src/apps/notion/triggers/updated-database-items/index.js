import defineTrigger from '../../../../helpers/define-trigger.js';
import { getDynamicData } from '../../../api.js';
import updatedDatabaseItems from './updated-database-items.js';

export default defineTrigger({
  name: 'Database Item Updated',
  key: 'updatedDatabaseItem',
  description: 'Triggers when an item is updated in a chosen database',
  pollInterval: 15,
  documentations: [
    {
      type: 'body',
      description: 'Triggers every 15 seconds to check for updated items in the selected database.',
    },
  ],
  type: 'api',
  inputs: [
    {
      label: 'Database',
      key: 'databaseId',
      type: 'dropdown',
      required: false,
      variables: false,
      dataType: 'string',
      fetchData: async () => {
        const databases = await getDynamicData({ key: 'listDatabases' });
        return databases.map((database) => ({
          label: database,
          value: database,
        }));
      },
    },
  ],
  async run($) {
    if (!$['databaseId']) {
      $.notifyUser('Please select a database', 'warning');
      return;
    }

    await updatedDatabaseItems($, $.databaseId);
  },
});
