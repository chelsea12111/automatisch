type KeyDescription = {
  label: string;
  description?: string;
  required?: boolean;
  variables?: boolean;
  pattern?: RegExp;
};

type KeyType = 'string' | 'number' | 'boolean' | 'object' | 'array';

type Key = {
  key: string;
  type: KeyType;
  defaultValue?: string | number | boolean | object | any[];
};

const markdownToHtml: Key[] = [
  {
    key: 'input',
    type: 'string',
    required: true,
    description: 'Markdown text that will be converted to HTML.',
    variables: true,
    pattern: /^(.|\s)*$/,
    defaultValue: '',
  },
];

export default markdownToHtml;
