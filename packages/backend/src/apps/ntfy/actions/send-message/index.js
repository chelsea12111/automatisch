import defineAction from '../../../../helpers/define-action.js';
import { isTimestamp, isDuration } from '../../../../helpers/time.js';

export default defineAction({
  name: 'Send message',
  key: 'sendMessage',
  description: 'Sends a message to a topic you specify.',
  arguments: [
    {
      label: 'Topic',
      key: 'topic',
      type: 'string',
      required: true,
      description: 'Target topic name.',
      variables: true,
    },
    {
      label: 'Message body',
      key: 'message',
      type: 'string',
      required: true,
      description:
        'Message body to be sent, set to triggered if empty or not passed.',
      variables: true,
    },
    {
      label: 'Title',
      key: 'title',
      type: 'string',
      required: false,
      default: 'New message',
      description: 'Message title.',
      variables: true,
    },
    {
      label: 'Email',
      key: 'email',
      type: 'string',
      required: false,
      description: 'E-mail address for e-mail notifications.',
      variables: true,
    },
    {
      label: 'Click URL',
      key: 'click',
      type: 'string',
      required: false,
      description: 'Website opened when notification is clicked.',
      variables: true,
    },
    {
      label: 'Attach file by URL',
      key: 'attach',
      type: 'string',
      required: false,
      description: 'URL of an attachment.',
      variables: true,
    },
    {
      label: 'Filename',
      key: 'filename',
      type: 'string',
      required: false,
      description: 'File name of the attachment.',
      variables: true,
    },
    {
      label: 'Delay',
      key: 'delay',
      type: 'string',
      required: false,
      description:
        'Timestamp or duration for delayed delivery. For example, 30min or 9am.',
      variables: true,
    },
  ],

  async run($) {
    const { topic, message, title, email, click, attach, filename, delay } =
      $.step.parameters;

    // Check if delay is a timestamp or duration
    if (delay && !isTimestamp(delay) && !isDuration(delay)) {
      throw new Error('Invalid delay format. Expected timestamp or duration.');
    }

    // Create payload
    const payload = {
      topic,
      message,
      title,
      email,
      click,
      attach,
      filename,
      delay,
    };

    // Check if attach and filename are both present
    if (attach && !filename) {
      throw new Error('Attachment file name is missing.');
    }

    try {
      const response = await $.http.post('/', payload);

      // Check if the request was successful
      if (response.status !== 200) {
        throw new Error('Failed to send message.');
      }

      $.setActionItem({
        raw: response.data,
      });
    } catch (error) {
      $.log('Error sending message:', error.message);
      throw error;
    }
  },
});
