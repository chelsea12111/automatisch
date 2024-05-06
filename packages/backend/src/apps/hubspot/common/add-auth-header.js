type RequestConfig = {
  additionalProperties?: {
    skipAddingAuthHeader?: boolean;
  };
  headers?: Record<string, string>;
};

type AuthData = {
  accessToken?: string;
};

const addAuthHeader = (
  $,
  requestConfig: RequestConfig & { headers?: Record<string, string> }
): RequestConfig => {
  if (requestConfig.additionalProperties?.skipAddingAuthHeader) {
    return requestConfig;
  }

  const authData = $.auth.data as AuthData | undefined;
  if (authData?.accessToken) {
    const authorizationHeader = `Bearer ${authData.accessToken}`;
    requestConfig.headers = {
      ...requestConfig.headers,
      Authorization: authorizationHeader,
    };
  }

  return requestConfig;
};

export default addAuthHeader;
