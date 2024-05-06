import { DateTime } from 'luxon';
import cronParser from 'cron-parser';

/**
 * Gets the next date/time for the given cron string.
 * @param {string} cronString - The cron string to parse.
 * @returns {DateTime} The next date/time for the given cron string.
 */
export default function getNextCronDateTime(cronString) {
  // Check if cronString is not empty
  if (!cronString) {
    throw new Error('cronString cannot be empty');
  }

  // Parse the cron string
  const cronDate = cronParser.parseExpression(cronString);

  // Get the next matching date/time
  const matchingNextCronDateTime = cronDate.next();
  const matchingNextDateTime = DateTime.fromJSDate(
    matchingNextCronDateTime.toDate()
  );

  return matchingNextDateTime;
}
