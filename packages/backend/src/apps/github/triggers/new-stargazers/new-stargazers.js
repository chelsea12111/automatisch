import { DateTime } from 'luxon';
import axios from 'axios';
import parseLinkHeader from '../../../../helpers/parse-header-link.js';

const getRepoOwnerAndRepo = (repo) => {
  if (!repo || typeof repo !== 'string' || repo.split('/').length !== 2) {
    throw new Error('Invalid repository format');
  }
  const [repoOwner, repoName] = repo.split('/');
  return { repoOwner, repoName };
};

const newStargazers = async ($) => {
  try {
    const { repoOwner, repoName } = getRepoOwnerAndRepo($.step.parameters.repo);
    const firstPagePathname = `/repos/${repoOwner}/${repoName}/stargazers`;
    const requestConfig = {
      params: {
        per_page: 100,
      },
      headers: {
        Accept: 'application/vnd.github.star+json',
      },
    };

    let pathname = firstPagePathname;
    let allStars = [];

    do {
      const response = await axios.get(pathname, requestConfig);
      const links = parseLinkHeader(response.headers.link);
      pathname = links.prev?.uri;

      if (response.data.length) {
        allStars = allStars.concat(response.data);
      }
    } while (pathname);

    // sort stars reverse-chronologically
    allStars.sort((a, b) => new Date(b.starred_at) - new Date(a.starred_at));

    for (const starEntry of allStars) {
      const { starred_at, user } = starEntry;
      const timestamp = DateTime.fromISO(starred_at).toMillis();

      const dataItem = {
        raw: user,
        meta: {
          internalId: timestamp.toString(),
        },
      };

      $.pushTriggerItem(dataItem);
    }
  } catch (error) {
    $.log(`Error fetching stargazers: ${error.message}`);
  }
};

export default newStargazers;
