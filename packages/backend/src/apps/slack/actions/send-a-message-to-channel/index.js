import defineAction from '../../../../helpers/define-action.js';
import postMessage from './post-message.js';

export default defineAction({
  name: 'Send a message to channel',
  key: 'sendMessageToChannel',
  description: 'Sends a message to a channel you specify.',
  arguments: [
    {
      label: 'Channel',
      key: 'channel',
      type: 'dropdown',
      required: true,
      description: 'Pick a channel to send the message to.',
      variables: true,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listChannels',
          },
        ],
      } as { type: string; name: string; arguments?: { name: string; value: string }[] },
    },
    {
      label: 'Message text',
      key: 'message',
      type: 'string',
      required: true,
      description: 'The content of your new message.',
      variables: true,
    },
    {
      label: 'Send as a bot?',
      key: 'sendAsBot',
      type: 'dropdown',
      required: false,
      value: false,
      description:
        'If you choose no, this message will appear to come from you. Direct messages are always sent by bots.',
      variables: true,
      options: [
        {
          label: 'Yes',
          value: true,
        },
        {
          label: 'No',
          value: false,
        },
      ],
      additionalFields: {
        type: 'query',
        name: 'getDynamicFields',
        arguments: [
          {
            name: 'key',
            value: 'listFieldsAfterSendAsBot',
          },
          {
            name: 'parameters.sendAsBot',
            value: '{parameters.sendAsBot}',
          },
        ],
      } as { type: string; name: string; arguments?: { name: string; value: string }[] },
    },
  ],

  async run($) {
    const { listChannels, listFieldsAfterSendAsBot } = await $.query({
      key: 'getDynamicData',
      arguments: [
        { name: 'key', value: 'listChannels' },
        { name: 'key', value: 'listFieldsAfterSendAsBot' },
      ],
    });

    const message = await postMessage({
      channel: $,
      message: $,
      sendAsBot: $,
      listChannels,
      listFieldsAfterSendAsBot,
    });

    return message;
  },
});
