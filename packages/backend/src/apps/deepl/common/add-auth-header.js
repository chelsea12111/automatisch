const addAuthHeader = (config, authData) => {
  if (!authData || !authData.authenticationKey) {
    return config;
  }

  const authorizationHeader = `DeepL-Auth-Key ${authData.authenticationKey}`;
  config.headers = config.headers || {};
  config.headers.Authorization = authorizationHeader;

  return config;
};

export default addAuthHeader;
