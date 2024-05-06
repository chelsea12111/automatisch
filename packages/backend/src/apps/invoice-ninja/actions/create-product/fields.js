export const fields = [
  {
    label: 'Product Key',
    key: 'productKey',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Notes',
    key: 'notes',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Price',
    key: 'price',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Quantity',
    key: 'quantity',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
];

const taxFields = Array.from({ length: 3 }, (_, i) => ({
  label: `Tax Rate ${i + 1}`,
  key: `taxRate${i + 1}`,
  type: 'string',
  required: false,
  description: '',
  variables: true,
}));

const customValueFields = Array.from({ length: 4 }, (_, i) => ({
  label: `Custom Value ${i + 1}`,
  key: `customValue${i + 1}`,
  type: 'string',
  required: false,
  description: '',
  variables: true,
}));

fields.push(...taxFields, ...customValueFields);
