const eventModules = [
  ['confidential-issue-event', 'index.js'],
  ['confidential-note-event', 'index.js'],
  ['deployment-event', 'index.js'],
  ['feature-flag-event', 'index.js'],
  ['issue-event', 'index.js'],
  ['job-event', 'index.js'],
  ['merge-request-event', 'index.js'],
  ['note-event', 'index.js'],
  ['pipeline-event', 'index.js'],
  ['push-event', 'index.js'],
  ['release-event', 'index.js'],
  ['tag-push-event', 'index.js'],
  ['wiki-page-event', 'index.js'],
];

const importModule = ([moduleName, filePath]) =>
  import(`./${moduleName}/${filePath}`).then((module) => module.default);

const loadEventModules = () => Promise.all(eventModules.map(importModule));

export default loadEventModules;
