const trimWhitespace = {
  name: 'trimWhitespace',
  description: 'Trim leading and trailing whitespaces from a string.',
  input: {
    type: 'string',
    required: true,
    description: 'The input string to trim whitespaces from.',
  },
  output: {
    type: 'string',
    description: 'The input string with leading and trailing whitespaces removed.',
  },
  execute: (input) => {
    return input.trim();
  },
};

export default trimWhitespace;
