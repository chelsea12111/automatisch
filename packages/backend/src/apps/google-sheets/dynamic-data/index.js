// utils/index.js

export { default as listDrives } from './list-drives';
export { default as listSpreadsheets } from './list-spreadsheets';
export { default as listWorksheets } from './list-worksheets';



// some-file.js

import { listDrives } from './utils';

async function someFunction() {
  const drives = await listDrives();
  // do something with drives...
}



// utils/index.js

export const modules = [
  import('./list-drives'),
  import('./list-spreadsheets'),
  import('./list-worksheets'),
];

