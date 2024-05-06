type FieldType = 'string' | 'number' | 'boolean' | 'object' | 'array';

interface FieldConfig {
  label: string;
  key: string;
  required?: boolean;
  description?: string;
  variables?: boolean;
  type: FieldType;
}

const encodeUri: FieldConfig[] = [
  {
    label: 'Input',
    key: 'input',
    required: true,
    description: 'URI to encode',
    variables: true,
    type: 'string',
  },
];

export default encodeUri;
