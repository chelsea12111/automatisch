type DropdownOption = {
  label: string;
  value: string;
  defaultValue?: string;
};

type FormatNumberProperty = {
  label: string;
  key: string;
  type: string;
  required: boolean;
  description: string;
  variables?: boolean;
  help?: string;
};

const formatNumber: FormatNumberProperty[] = [
  {
    label: 'Input',
    key: 'input',
    type: 'string',
    required: true,
    description: 'The number you want to format.',
    variables: true,
    help: 'For example, "12345.67" or "1,234,5.67"',
  },
  {
    label: 'Input Decimal Mark',
    key: 'inputDecimalMark',
    type: 'dropdown',
    required: true,
    description: 'The decimal mark of the input number.',
    variables: true,
    options: [
      { label: 'Comma', value: ',', defaultValue: ',' },
      { label: 'Period', value: '.', defaultValue: '.' },
    ],
  },
  {
    label: 'To Format',
    key: 'toFormat',
    type: 'dropdown',
    required: true,
    description: 'The format you want to convert the number to.',
    variables: true,
    help: 'For example, "0" for "123,456.78" or "3" for "123 456,78"',
    options: [
      { label: 'Comma for grouping & period for decimal', value: '0', defaultValue: '0', groupingSizes: [3, 3] },
      { label: 'Period for grouping & comma for decimal', value: '1', defaultValue: '1', groupingSizes: [3, 3] },
      { label: 'Space for grouping & period for decimal', value: '2', defaultValue: '2', groupingSizes: [3, 3] },
      { label: 'Space for grouping & comma for decimal', value: '3', defaultValue: '3', groupingSizes: [3, 3] },
    ],
  },
];

export default formatNumber;
