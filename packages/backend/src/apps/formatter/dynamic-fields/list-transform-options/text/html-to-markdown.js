/**
 * A constant array of objects defining the schema for the `htmlToMarkdown` function.
 * Each object represents a single schema field with its properties.
 * @constant
 * @type {Array<object>}
 */
const htmlToMarkdownSchema = [
  {
    label: 'Input HTML',
    key: 'input',
    type: 'string',
    required: true,
    description: 'The HTML that will be converted to Markdown.',
    //
