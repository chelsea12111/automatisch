const useDefaultValue = [
  {
    label: 'Input',
    key: 'input',
    type: 'string',
    required: true,
    description: 'Text to check for emptiness.',
    allowsVariables: true, // using more descriptive variable names
  },
  {
    label: 'Default Value',
    key: 'defaultValue',
    type: 'string',
    required: true,
    description: 'Default text if input is empty.',
    allowsVariables: true,
  },
];

export default useDefaultValue;
