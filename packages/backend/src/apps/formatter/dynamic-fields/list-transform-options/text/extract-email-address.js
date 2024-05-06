type FormField = {
  label: string;
  key: string;
  type: string;
  required?: boolean;
  description?: string;
  variables?: boolean;
};

const emailExtractor = (text: string): string | null => {
  const emailRegex = /\S+@\S+\.\S+/;
  const match = text.match(emailRegex);
  return match ? match[0] : null;
};

const extractEmailAddress: FormField[] = [
  {
    label: 'Input',
    key: 'input',
    type: 'string',
    required: true,
    description: 'Text that will be searched for an email address.',
    variables: true,
  },
];

const extractEmail = (form: FormField): string | null => {
  if (form.type !== 'string' || !form.input) {
    throw new Error('Invalid form field');
  }

  return emailExtractor(form.input);
};

export { extractEmailAddress, extractEmail };
