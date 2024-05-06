type RequestConfig = {
  headers?: Record<string, string>;
  additionalProperties?: {
    skipAddingAuthHeader?: boolean;
  };
};

type AuthData = {
  accessToken?: string;
};

type AddAuthHeader = (
  requestConfig: {
    headers?: Record<string, string>;
  },
  authData?: AuthData
) => RequestConfig;

const addAuthHeader: AddAuthHeader = (requestConfig, { data: authData }) => {
  if (requestConfig.additionalProperties?.skipAddingAuthHeader) {
    return requestConfig;
  }

  if (authData?.accessToken) {
    const authorizationHeader = `Bearer ${authData.accessToken}`;
    return Object.assign({}, requestConfig, {
      headers: { ...requestConfig.headers, Authorization: authorizationHeader },
    });
  }

  return requestConfig;
};

export default addAuthHeader;
