import defineAction from '../../../../helpers/define-action.js';
import { tweetApiBaseUrl, tweetApiVersion } from '../../../../config.js';

export default defineAction({
  name: 'Create tweet',
  key: 'createTweet',
  description: 'Create a new tweet.',
  arguments: [
    {
      label: 'Tweet body',
      key: 'tweet',
      type: 'string',
      required: true,
      description: 'The content of your new tweet.',
      variables: true,
    },
  ],

  async run($) {
    const tweetContent = $.step.parameters.tweet;

    if (!tweetContent.trim()) {
      throw new Error('Tweet body cannot be empty.');
    }

    const response = await $.http.post(`${tweetApiBaseUrl}/${tweetApiVersion}/tweets`, {
      text: tweetContent,
    });

    if (!response.ok) {
      throw new Error(`Failed to create tweet: ${response.statusText}`);
    }

    $.setActionItem({ raw: response.data });
  },
});
