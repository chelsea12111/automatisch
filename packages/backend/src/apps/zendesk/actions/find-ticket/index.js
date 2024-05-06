import defineAction from '../../../../helpers/define-action.js';

export default defineAction({
  name: 'Find ticket',
  key: 'findTicket',
  description: 'Finds an existing ticket.',
  arguments: [
    {
      label: 'Query',
      key: 'query',
      type: 'string',
      required: true,
      variables: true,
      description:
        'Write a search string that specifies the way we will search for the ticket in Zendesk.',
      validation: {
        type: 'string',
        maxLength: 255,
      },
    },
  ],

  async run($) {
    const query = $.step.parameters.query.trim();

    if (!query) {
      throw new Error('The query parameter cannot be empty.');
    }

    const params = {
      query: `type:ticket ${query}`,
      sort_by: 'created_at',
      sort_order: 'desc',
      limit: 1,
    };

    try {
      const response = await $.http.get('/api/v2/search', { params });

      if (response.data.results.length === 0) {
        throw new Error('No tickets found for the given query.');
      }

      $.setActionItem({ raw: response.data.results[0] });
    } catch (error) {
      throw new Error(`Error finding ticket: ${error.message}`);
    }
  },
});
