import defineAction from '../../../../helpers/define-action.js';
import { isValidDateString } from '../../../../helpers/date-utils.js';

export default defineAction({
  name: 'Delay until',
  key: 'delayUntil',
  description: 'Delays the execution of the next action until a specified date.',
  arguments: [
    {
      label: 'Delay until (Date)',
      key: 'delayUntil',
      type: 'string',
      required: true,
      description: 'Delay until the date. E.g. 2022-12-18',
      variables: true,
    },
  ],

  async run($) {
    const { delayUntil } = $.step.parameters;

    if (!isValidDateString(delayUntil)) {
      throw new Error(`Invalid date string: ${delayUntil}`);
    }

    const dataItem = {
      delayUntil,
    };

    $.setActionItem({ raw: dataItem });
  },
});

function isValidDateString(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}


function isValidDateString(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}
