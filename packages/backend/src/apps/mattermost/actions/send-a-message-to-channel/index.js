import defineAction from '../../../../helpers/define-action.js';
import postMessage from './post-message.js';

export default defineAction({
  name: 'Send a message to channel',
  key: 'sendMessageToChannel',
  description: 'Sends a message to the specified channel.',
  arguments: [
    {
      label: 'Channel',
      key: 'channel',
      type: 'dropdown',
      required: true,
      description: 'Select the channel to send the message to.',
      dynamic: 'listChannels',
    },
    {
      label: 'Message text',
      key: 'message',
      type: 'string',
      required: true,
      description: 'Enter the content of your message.',
      dynamic: true,
    },
  ],

  async run($) {
    const message = await postMessage({ channel: $.channel, text: $.message });

    return message;
  },
});
