import { DateTime } from 'luxon';
import defineTrigger from '../../../../helpers/define-trigger.js';
import cronTimes from '../../common/cron-times.js';
import getNextCronDateTime from '../../common/get-next-cron-date-time.js';
import getDateTimeObjectRepresentation from '../../common/get-date-time-object.js';

export default defineTrigger({
  name: 'Every Month',
  key: 'every-month',
  description: 'Triggers every month on a specific day and time.',
  arguments: [
    {
      label: 'Day of the month',
      key: 'day',
      type: 'number',
      required: true,
      validation: {
        min: 1,
        max: 31,
      },
      defaultValue: 1,
    },
    {
      label: 'Time of day (24-hour format)',
      key: 'hour',
      type: 'number',
      required: true,
      validation: {
        min: 0,
        max: 23,
      },
      defaultValue: 0,
    },
  ],

  getInterval(parameters) {
    const interval = cronTimes.everyMonthOnAndAt(
      parameters.day,
      parameters.hour
    );

    return interval;
  },

  async run($) {
    const nextCronDateTime = getNextCronDateTime(
      this.getInterval($.step.parameters)
    );
    const dateTime = DateTime.now();
    const dateTimeObjectRepresentation = getDateTimeObjectRepresentation(
      $.execution.testRun ? nextCronDateTime : dateTime
    );

    const dataItem = {
      raw: dateTimeObjectRepresentation,
      meta: {
        internalId: dateTime.toMillis().toString(),
      },
    };

    $.pushTriggerItem(dataItem);
  },
});
