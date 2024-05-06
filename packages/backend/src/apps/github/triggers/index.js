const newIssues = await import('./new-issues/index.js');
const newPullRequests = await import('./new-pull-requests/index.js');
const newStargazers = await import('./new-stargazers/index.js');
const newWatchers = await import('./new-watchers/index.js');

const eventHandlers = {
  newIssues: newIssues.default,
  newPullRequests: newPullRequests.default,
  newStargazers: newStargazers.default,
  newWatchers: newWatchers.default,
};

export default eventHandlers;
