import defineAction from '../../../../helpers/define-action.js';

export default defineAction({
  name: 'Delay for',
  key: 'delayFor',
  description:
    'Delays the execution of the next action by a specified amount of time.',
  arguments: [
    {
      label: 'Delay for unit',
      key: 'delayForUnit',
      type: 'dropdown',
      required: true,
      value: null,
      description: 'Delay for unit, e.g. minutes, hours, days, weeks.',
      variables: true,
      options: [
        {
          label: 'Minutes',
          value: 'minutes',
        },
        {
          label: 'Hours',
          value: 'hours',
        },
        {
          label: 'Days',
          value: 'days',
        },
        {
          label: 'Weeks',
          value: 'weeks',
        },
      ],
    },
    {
      label: 'Delay for value',
      key: 'delayForValue',
      type: 'string',
      required: true,
      description: 'Delay for value, use a number, e.g. 1, 2, 3.',
      variables: true,
      validate: {
        type: 'number',
        message: 'Delay for value must be a number.',
      },
    },
  ],

  async run($) {
    const { delayForUnit, delayForValue } = $.step.parameters;

    if (!delayForUnit || !delayForValue) {
      throw new Error('Missing required parameters.');
    }

    const dataItem = {
      delayForUnit,
      delayForValue,
    };

    $.setActionItem({ raw: dataItem });

    // Delay the execution of the next action
    await new Promise((resolve) => setTimeout(resolve, delayForValue * getTimeMultiplier(delayForUnit)));
  },
});

// Helper function to get the time multiplier based on the unit
function getTimeMultiplier(unit) {
  switch (unit) {
    case 'minutes':
      return 60 * 1000;
    case 'hours':
      return 60 * 60 * 1000;
    case 'days':
      return 24 * 60 * 60 * 1000;
    case 'weeks':
      return 7 * 24 * 60 * 60 * 1000;
    default:
      throw new Error(`Invalid delay for unit: ${unit}`);
  }
}
