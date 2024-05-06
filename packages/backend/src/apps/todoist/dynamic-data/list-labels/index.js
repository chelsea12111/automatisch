import { defineAction, http } from 'katalyst';

export default defineAction({
  name: 'List labels',
  key: 'listLabels',

  async run($) {
    try {
      const response = await http($, { method: 'get', url: '/labels' });
      const labels = response.data.map((label) => {
        return {
          value: label.name,
          name: label.name,
        };
      });
      return { data: labels };
    } catch (error) {
      $.log.error(`Error fetching labels: ${error.message}`);
      return { error: error.message };
    }
  },
});
