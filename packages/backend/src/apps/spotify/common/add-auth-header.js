type RequestConfig = {
  additionalProperties?: {
    skipAddingAuthHeader?: boolean;
  };
  headers?: {
    Authorization?: string;
  };
};

type AuthData = {
  accessToken?: string;
};

const addAuthHeader = (auth: AuthData, requestConfig: RequestConfig = {}) => {
  if ('skipAddingAuthHeader' in requestConfig.additionalProperties && requestConfig.additionalProperties.skipAddingAuthHeader) {
    return requestConfig;
  }

  if (auth.accessToken) {
    const authorizationHeader = `Bearer ${auth.accessToken}`;
    requestConfig.headers = requestConfig.headers || {};
    requestConfig.headers.Authorization = authorizationHeader;
  }

  return requestConfig;
};

export default addAuthHeader;
