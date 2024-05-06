import { URLSearchParams } from 'node:url';
import defineAction from '../../../../helpers/define-action.js';

const PHONE_REGEX = /^\+\d{1,3}\d{9,14}$/;

export default defineAction({
  name: 'Send an SMS',
  key: 'sendSms',
  description: 'Sends an SMS',
  arguments: [
    {
      label: 'From Number',
      key: 'fromNumber',
      type: 'dropdown',
      required: true,
      description:
        'The number to send the SMS from. Include country code. Example: 15551234567',
      variables: true,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listIncomingPhoneNumbers',
          },
        ],
      },
      validation: (value) => PHONE_REGEX.test(value.trim()),
    },
    {
      label: 'To Number',
      key: 'toNumber',
      type: 'string',
      required: true,
      description:
        'The number to send the SMS to. Include country code. Example: 15551234567',
      variables: true,
      validation: (value) => PHONE_REGEX.test(value.trim()),
    },
    {
      label: 'Message',
      key: 'message',
      type: 'string',
      required: true,
      description: 'The message to send.',
      variables: true,
      validation: (value) => value.trim().length > 0,
    },
  ],

  async run($) {
    const requestPath = `/2010-04-01/Accounts/${$.auth.data.accountSid}/Messages.json`;
    const messageBody = $.step.parameters.message;

    const fromNumber = $.step.parameters.fromNumber.trim();
    const toNumber = $.step.parameters.toNumber.trim();

    if (!PHONE_REGEX.test(fromNumber) || !PHONE_REGEX.test(toNumber)) {
      throw new Error('Invalid phone number');
    }

    if (messageBody.trim().length === 0) {
      throw new Error('Message cannot be empty');
    }

    const payload = new URLSearchParams({
      Body: messageBody,
      From: fromNumber,
      To: toNumber,
    }).toString();

    try {
      const response = await $.http.post(requestPath, payload);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay to avoid rate limiting
      $.setActionItem({ raw: response.data });
    } catch (error) {
      $.log.error('Error sending SMS:', error);
      throw error;
    }
  },
});
