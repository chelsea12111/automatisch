import { nanoid } from 'nanoid';
import defineTrigger from '../../../../helpers/define-trigger';
import { retry } from 'async-retry';
import axios from 'axios';

export default defineTrigger<void, void>({
  name: 'New quotes',
  key: 'newQuotes',
  type: 'webhook',
  description: 'Triggers when a new quote is added.',
  arguments: [],

  async run($) {
    const dataItem = {
      raw: $.request.body,
      meta: {
        internalId: nanoid(),
      },
    };

    $.pushTriggerItem(dataItem);
  },

  async testRun($) {
    try {
      const lastExecutionStep = await $.getLastExecutionStep();

      if (!lastExecutionStep?.dataOut) {
        throw new Error('No data output found');
      }

      await retry(
        async () => {
          const dataItem = {
            raw: lastExecutionStep.dataOut,
            meta: {
              internalId: nanoid(),
            },
          };

          $.pushTriggerItem(dataItem);
        },
        {
          retries: 3,
          minTimeout: 1000,
          maxTimeout: 5000,
        }
      );
    } catch (error) {
      $.log.error('Test run failed:', error.message);
    }
  },

  async registerHook($) {
    const CREATE_QUOTE_EVENT_ID = '3';

    const payload = {
      target_url: $.webhookUrl,
      event_id: CREATE_QUOTE_EVENT_ID,
      format: 'JSON',
      rest_method: 'post',
    };

    try {
      const response = await axios.post('/v1/webhooks', payload);

      await $.flow.setRemoteWebhookId(response.data.data.id);
    } catch (error) {
      $.log.error('Failed to register hook:', error.message);
    }
  },

  async unregisterHook($) {
    try {
      await axios.delete(`/v1/webhooks/${$.flow.remoteWebhookId}`);
    } catch (error) {
      $.log.error('Failed to unregister hook:', error.message);
    }
  },
});


npm install async-retry axios
