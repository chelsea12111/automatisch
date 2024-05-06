import defineTrigger from '../../../../helpers/define-trigger.js';
import { sleep } from '../../../../helpers/utils.js';

export default defineTrigger({
  name: 'New posts matching search',
  key: 'newPostsMatchingSearch',
  pollInterval: 15,
  description: 'Triggers when a search string matches a new post.',
  arguments: [
    {
      label: 'Search Query',
      key: 'searchQuery',
      type: 'string',
      required: true,
      description:
        'The term or expression to look for, restricted to 512 characters. If your query contains periods (e.g., automatisch.io), ensure it is enclosed in quotes ("automatisch.io").',
      variables: true,
    },
  ],

  async run($) {
    const { searchQuery } = $.step.parameters;
    const params = {
      q: searchQuery,
      type: 'link',
      sort: 'new',
      limit: 100,
      after: undefined,
    };

    const maxRetries = 5;
    let retries = 0;

    do {
      try {
        const { data } = await $.http.get('/search', {
          params,
        });

        if (data.data.children?.length) {
          for (const item of data.data.children) {
            $.pushTriggerItem({
              raw: item,
              meta: {
                internalId: item.data.id,
              },
            });
          }
        }

        if (data.data.after) {
          params.after = data.data.after;
        } else {
          break;
        }

        retries = 0;

      } catch (error) {
        retries++;
        if (retries < maxRetries) {
          await sleep(5000); // Wait for 5 seconds before retrying
        } else {
          throw error;
        }
      }

    } while (params.after);
  },
});

