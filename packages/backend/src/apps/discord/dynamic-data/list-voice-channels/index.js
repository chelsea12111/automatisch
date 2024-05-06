import { defu } from 'defu';
import { HTTP } from 'meteor/http';

export default {
  name: 'List voice channels',
  key: 'listVoiceChannels',

  async run($) {
    const defaultChannels = {
      data: [],
      error: null,
    };

    const guildId = $.auth.data.guildId;
    const apiUrl = `/guilds/${guildId}/channels`;
    const config = {
      headers: {
        Authorization: `Bearer ${$.auth.data.accessToken}`,
      },
    };

    try {
      const response = await HTTP.get(apiUrl, config);
      const channels = response.data.filter(
        (channel) => channel.type === 2 || channel.type === 13
      );
      const channelList = channels.map((channel) => ({
        value: channel.id,
        name: channel.name,
      }));

      return defu(defaultChannels, { data: channelList });
    } catch (error) {
      return defu(defaultChannels, { error: error.message });
    }
  },
};
