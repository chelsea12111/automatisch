// Import the createIssue function from its module
import createIssue from './create-issue/index.js';

// Export an object with the createIssue function as a property
// This makes the code more flexible and easier to extend
export const issueCreator = { createIssue };

