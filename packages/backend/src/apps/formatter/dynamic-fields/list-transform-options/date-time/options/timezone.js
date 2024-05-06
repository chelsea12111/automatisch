const timezoneOptions = [];

for (const timezone of Intl.supportedValuesOf('timeZone')) {
  timezoneOptions.push({ label: timezone, value: timezone });
}

export default timezoneOptions;
