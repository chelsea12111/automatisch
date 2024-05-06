import { DateTime } from 'luxon';

type FormatDateTimeParams = {
  input: string;
  fromFormat?: string;
  fromTimezone?: string;
  toFormat?: string;
  toTimezone?: string;
};

const formatDateTime = ({
  input,
  fromFormat = 'yyyy-MM-dd HH:mm:ss',
  fromTimezone = 'UTC',
  toFormat = 'yyyy-MM-dd HH:mm:ss',
  toTimezone = 'UTC',
}: FormatDateTimeParams): string => {
  if (!input) {
    throw new Error('Input is required');
  }

  const inputDateTime = DateTime.fromFormat(input, fromFormat, {
    zone: fromTimezone,
    setZone: true,
  });

  if (inputDateTime.invalid) {
    throw new Error(`Invalid input: ${input}`);
  }

  const outputDateTime = inputDateTime.setZone(toTimezone).toFormat(toFormat);

  return outputDateTime;
};

export default formatDateTime;
