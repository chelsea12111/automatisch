import defineAction from '../../../../helpers/define-action.js';

export default defineAction({
  name: 'Send a message to channel',
  key: 'sendMessageToChannel',
  description: 'Sends a message to a specific channel you specify.',
  icon: 'message-circle', // Add an icon for better visual representation
  arguments: [
    {
      label: 'Channel',
      key: 'channel',
      type: 'dropdown',
      required: true,
      description: 'Pick a channel to send the message to.',
      variables: true,
      source: async (_, { getDynamicData }) => {
        const channels = await getDynamicData({ key: 'listChannels' });
        return channels.map((channel) => ({ label: channel.name, value: channel.id }));
      },
    },
    {
      label: 'Message text',
      key: 'message',
      type: 'string',
      required: true,
      description: 'The content of your new message.',
      variables: true,
      hint: 'You can use variables to personalize the message.',
    },
  ],

  async run($) {
    const { channel, message } = $.step.parameters;

    try {
      const response = await $.http.post(`/channels/${channel}/messages`, { content: message });
      $.setActionItem({ raw: response.data });
    } catch (error) {
      $.notify('Error sending message:', error.message, 'error');
    }
  },
});
