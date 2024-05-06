export default {
  name: 'List channels',
  key: 'listChannels',

  async run($) {
    try {
      const response = await $.http.get('/api/v4/users/me/channels');
      const channels = response.data.map(channel => ({
        value: channel.id,
        name: channel.display_name || channel.id,
      }));

      return { data: channels, error: null };
    } catch (error) {
      return { data: [], error: error.message };
    }
  },
};
