import defineTrigger from '../../../../helpers/define-trigger.js';
import { validate } from 'uuid';

export default defineTrigger({
  name: 'New video in channel',
  key: 'newVideoInChannel',
  description:
    'Triggers when a new video is published to a specific Youtube channel.',
  arguments: [
    {
      label: 'Channel',
      key: 'channelId',
      type: 'string',
      required: true,
      description:
        'Get the new videos uploaded to this channel. If the URL of the youtube channel looks like this www.youtube.com/channel/UCbxb2fqe9oNgglAoYqsYOtQ then you must use UCbxb2fqe9oNgglAoYqsYOtQ as a value in this field.',
      variables: true,
      validate: (value) => {
        return validate(value) || 'Invalid channel ID';
      },
    },
  ],

  async run($) {
    const channelId = $.step.parameters.channelId;

    const params = {
      pageToken: undefined,
      part: 'snippet',
      channelId: channelId,
      maxResults: 50,
      order: 'date',
      type: 'video',
    };

    do {
      try {
        const { data } = await $.http.get('/v3/search', { params });

        if (data?.items?.length) {
          for (const item of data.items) {
            $.pushTriggerItem({
              raw: item,
              meta: {
                internalId: item.etag,
              },
            });
          }
        }

        params.pageToken = data.nextPageToken;
      } catch (error) {
        $.log.error(`Error fetching videos: ${error.message}`);
      }
    } while (params.pageToken);
  },
});
