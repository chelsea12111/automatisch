/**
 * Returns the base URL for the API, based on the provided `$` object.
 * The base URL is determined in the following order of priority:
 * 1. `instanceUrl` property of the `auth` object
 * 2. `apiBaseUrl` property of the `app` object
 * 3. `baseUrl` property of the `app` object
 */
const getBaseUrl = ({ auth: { data: { instanceUrl } = {} } = {}, app: { apiBaseUrl, baseUrl } = {} }: any = {}) => {
  if (instanceUrl) {
    return instanceUrl;
  }

  if (apiBaseUrl) {
    return apiBaseUrl;
  }

  return baseUrl;
};

export default getBaseUrl;
