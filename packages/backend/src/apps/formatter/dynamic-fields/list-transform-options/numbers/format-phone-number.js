import { phoneNumberCountryCodes } from '../../../common/phone-number-country-codes.js';

const formatPhoneNumber = [
  {
    label: 'Phone Number',
    key: 'phoneNumber',
    type: 'string',
    required: true,
    description: 'The phone number you want to format.',
    variables: true,
    placeholder: 'Enter phone number',
  },
  {
    label: 'To Format',
    key: 'toFormat',
    type: 'dropdown',
    required: true,
    description: 'The format you want to convert the number to.',
    variables: true,
    options: [
      { label: '+491632223344 (E164)', value: 'e164', defaultValue: 'e164' },
      { label: '+49 163 2223344 (International)', value: 'international', defaultValue: 'international' },
      { label: '0163 2223344 (National)', value: 'national', defaultValue: 'national' },
    ],
  },
  {
    label: 'Phone Number Country Code',
    key: 'phoneNumberCountryCode',
    type: 'dropdown',
    required: true,
    description: 'The country code of the phone number. The default is US.',
    variables: true,
    help: 'Select the country code of the phone number',
    options: phoneNumberCountryCodes,
  },
];

export default formatPhoneNumber;
