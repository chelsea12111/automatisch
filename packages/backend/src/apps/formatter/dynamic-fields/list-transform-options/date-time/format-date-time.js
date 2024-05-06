import formatOptions from './options/format.js';
import timezoneOptions from './options/timezone.js';

const formatDateTime = {
  input: {
    label: 'Input',
    type: 'string',
    required: true,
    description: 'The datetime you want to format.',
    variables: true,
  },
  fromFormat: {
    label: 'From Format',
    type: 'dropdown',
    required: true,
    description: 'The format of the input.',
    variables: true,
    options: formatOptions,
  },
  fromTimezone: {
    label: 'From Timezone',
    type: 'dropdown',
    required: true,
    description: 'The timezone of the input.',
    variables: true,
    options: timezoneOptions,
  },
  toFormat: {
    label: 'To Format',
    type: 'dropdown',
    required: true,
    description: 'The format of the output.',
    variables: true,
    options: formatOptions,
  },
  toTimezone: {
    label: 'To Timezone',
    type: 'dropdown',
    required: true,
    description: 'The timezone of the output.',
    variables: true,
    options: timezoneOptions,
  },
};

export default formatDateTime;
