// utils.js
export const listModules = () => [
  './list-users',
  './list-brands',
  './list-first-page-of-tickets',
  './list-groups',
  './list-organizations',
  './list-sharing-agreements',
  './list-ticket-forms',
  './list-views'
];

// index.js
import { listModules } from './utils.js';

const importModules = modulesList => modulesList.map(modulePath => {
  // Dynamically import modules and return an array of imported modules
  const [moduleName, extension] = modulePath.split('.');
  return import(`../${modulePath}.js`).then(module => module[moduleName]);
});

export default importModules(listModules()).then(modules => {
  // Return an object with named exports for better code readability
  return modules.reduce((acc, module, index) => {
    acc[`list${index + 1}`] = module;
    return acc;
  }, {});
});

