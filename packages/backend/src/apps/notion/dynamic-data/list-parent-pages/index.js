export default {
  name: 'List parent pages',
  key: 'listParentPages',

  async run($) {
    const parentPages = {
      data: [],
      error: null,
    };
    const payload = {
      filter: {
        value: 'page',
        property: 'object',
      },
    };

    let hasNextPage = true;

    while (hasNextPage) {
      const response = await $.http.post('/v1/search', payload);

      if (response.error) {
        parentPages.error = response.error;
        break;
      }

      if (!response.data || !response.data.results || !Array.isArray(response.data.results)) {
        parentPages.error = new Error('Invalid response data');
        break;
      }

      payload.start_cursor = response.data.next_cursor;

      const topLevelPages = response.data.results.filter(
        (page) => page.parent && page.parent.workspace
      );

      if (!Array.isArray(topLevelPages)) {
        parentPages.error = new Error('Invalid top-level pages data');
        break;
      }

      for (const page of topLevelPages) {
        if (!page.properties || !page.properties.title || !page.properties.title.title || !Array.isArray(page.properties.title.title) || !page.properties.title.title[0] || !page.properties.title.title[0].plain_text) {
          continue;
        }

        parentPages.data.push({
          value: page.id,
          name: page.properties.title.title[0].plain_text,
        });
      }

      hasNextPage = Boolean(payload.start_cursor);
    }

    if (parentPages.data.length === 0) {
      parentPages.error = new Error('No parent pages found');
    }

    return parentPages;
  },
};
