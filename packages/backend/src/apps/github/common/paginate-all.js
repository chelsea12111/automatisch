import parseLinkHeader from '../../../helpers/parse-header-link.js';

export default async function paginateAll($, request) {
  let aggregatedResponse = { data: [] };
  let currentRequest = request;

  while (currentRequest) {
    try {
      const response = await currentRequest;
      aggregatedResponse.data.push(...response.data);
      const links = parseLinkHeader(response.headers.link);
      currentRequest = links.next ? $.http.request(links.next.uri) : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return aggregatedResponse;
}

