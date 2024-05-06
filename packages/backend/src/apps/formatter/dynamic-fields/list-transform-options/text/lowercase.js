interface FieldConfig {
  label: string;
  key: string;
  type: string;
  required?: boolean;
  description?: string;
  variables?: boolean;
}

const lowercaseField: FieldConfig = {
  label: 'Input',
  key: 'input',
  type: 'string',
  required: true,
  description: 'Text that will be lowercased.',
  variables: true,
};

const lowercase: FieldConfig[] = [lowercaseField];

export default lowercase;
