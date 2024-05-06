import defineAction from '../../../../helpers/define-action.js';

export default defineAction({
  name: 'Find database item',
  key: 'findDatabaseItem',
  description: 'Searches for an item in a database by property.',
  arguments: [
    {
      label: 'Database',
      key: 'databaseId',
      type: 'dropdown',
      required: true,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listDatabases',
          },
        ],
      },
    },
    {
      label: 'Name',
      key: 'name',
      type: 'string',
      required: false,
      default: '',
      description:
        'This field has a 2000 character limit. Any characters beyond 2000 will not be included.',
      variables: true,
      validation: {
        maxLength: 2000,
      },
    },
  ],

  async run($) {
    const databaseId = $.step.parameters.databaseId;
    const name = $.step.parameters.name;
    const truncatedName = name.slice(0, 2000);

    if (!databaseId || !truncatedName) {
      return $.step.setOutput('The database ID and name are required.');
    }

    const body = {
      filter: {
        property: 'Name',
        rich_text: {
          equals: truncatedName,
        },
      },
      sorts: [
        {
          timestamp: 'last_edited_time',
          direction: 'descending',
        },
      ],
    };

    try {
      const { data } = await $.http.post(
        `/v1/databases/${databaseId}/query`,
        body
      );

      if (data.results.length === 0) {
        return $.step.setOutput('No item found with the given name.');
      }

      $.setActionItem({
        raw: data.results[0],
      });

      return $.step.setOutput('Item found successfully.');
    } catch (error) {
      return $.step.setOutput(`Error: ${error.message}`);
    }
  },
});
