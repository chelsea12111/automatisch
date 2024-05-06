import defineTrigger from '../../../../helpers/define-trigger.js';

export default defineTrigger({
  name: 'New video by search',
  key: 'newVideoBySearch',
  description: 'Triggers when a new video is uploaded that matches a specific search string.',
  arguments: [
    {
      label: 'Query',
      key: 'query',
      type: 'string',
      required: true,
      description: 'Search for videos that match this query.',
      variables: true,
    },
  ],

  async run($) {
    const query = $.step.parameters.query;
    let pageToken = undefined;

    const params = {
      pageToken,
      part: 'snippet',
      q: query,
      maxResults: 50,
      order: 'date',
      type: 'video',
    };

    do {
      const response = await $.http.get('/v3/search', { params });
      const data = response.data;

      if (data?.items?.length) {
        for (const item of data.items) {
          $.pushTriggerItem({
            raw: item,
            meta: {
              internalId: item.etag,
            },
          });
        }
      }

      pageToken = data.nextPageToken;

    } while (pageToken);
  },
});
