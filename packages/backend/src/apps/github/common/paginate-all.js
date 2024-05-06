import parseLinkHeader from '../../../helpers/parse-header-link.js';

export default async function paginateAll($, request) {
  let aggregatedResponse = { data: [] };
  let currentRequest = request;

  try {
    while (currentRequest) {
      const response = await currentRequest;
      aggregatedResponse.data.push(...response.data);

      const links = parseLinkHeader(response.headers.link);
      if (links.next) {
        currentRequest = $.http.request({ ...response.config, url: links.next.uri });
      } else {
        currentRequest = null;
      }
    }
  } catch (error) {
    // Handle error here, e.g. logging or rethrowing
    console.error(error);
    throw error;
  }

  return aggregatedResponse;
}

