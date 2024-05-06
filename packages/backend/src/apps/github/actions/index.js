// Import the `createIssue` function from its module using destructuring
// to make the code more concise and easier to read.
import { createIssue } from './create-issue/index.js';

// Export an object with the `createIssue` function as a property.
// This makes the code more flexible and easier to extend.
// Use const instead of export default to avoid accidentally overwriting
// the object with a new one in future code changes.
const issueCreator = { createIssue };

// Export the object using module.exports to ensure compatibility
// with both CommonJS and ES modules.
module.exports = issueCreator;
