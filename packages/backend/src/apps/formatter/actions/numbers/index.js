import defineAction from '../../../../helpers/define-action.js';
import { performMathOperation, randomNumber, formatNumber, formatPhoneNumber } from './transformers';

const transformers = {
  performMathOperation,
  randomNumber,
  formatNumber,
  formatPhoneNumber,
};

$.validation.add('transform-key', value => Object.keys(transformers).includes(value));

export default defineAction({
  name: 'Numbers',
  key: 'numbers',
  description:
    'Transform numbers to perform math operations, generate random numbers, format numbers, and much more.',
  arguments: [
    {
      label: 'Transform',
      key: 'transform',
      type: 'dropdown',
      required: true,
      variables: true,
      options: [
        { label: 'Perform Math Operation', value: 'performMathOperation' },
        { label: 'Random Number', value: 'randomNumber' },
        { label: 'Format Number', value: 'formatNumber' },
        { label: 'Format Phone Number', value: 'formatPhoneNumber' },
      ],
      additionalFields: {
        type: 'query',
        name: 'getDynamicFields',
        arguments: [
          {
            name: 'key',
            value: 'listTransformOptions',
          },
          {
            name: 'parameters.transform',
            value: '{parameters.transform}',
          },
        ],
      },
    },
  ],

  async run($) {
    const transformerName = $.step.parameters.transform;

    if (!transformerName || !transformers[transformerName]) {
      throw new Error(`Invalid transformer: ${transformerName}`);
    }

    const output = transformers[transformerName]?.($);

    $.setActionItem({
      raw: {
        output,
      },
    });
  },
});
