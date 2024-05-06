// Import the `newEntry` function/module from its relative path
import newEntry from './new-entry';

// Create an array containing the default export of `newEntry`
const entries = [newEntry()];

// Export the `entries` array as the default export of this module
export default entries;

