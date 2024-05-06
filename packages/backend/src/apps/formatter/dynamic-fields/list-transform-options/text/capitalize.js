interface CapitalizeSchema {
  label: string;
  key: 'input';
  type: 'string';
  required: true;
  description: string;
  variables: boolean;
  pattern?: string;
  minLength?: number;
}

const capitalize: CapitalizeSchema = {
  label: 'Input',
  key: 'input',
  type: 'string',
  required: true,
  description: 'Text that will be capitalized.',
  variables: true,
  pattern: '^[a-zA-Z0-9\\s]+$',
  minLength: 1
};

export default capitalize;
