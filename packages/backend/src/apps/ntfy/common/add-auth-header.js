const addAuthHeader = (axiosInstance, config) => {
  const authData = axiosInstance.auth.data;

  if (authData.serverUrl) {
    config.baseURL = authData.serverUrl;
  }

  if (authData.username && authData.password) {
    config.auth = {
      username: authData.username,
      password: authData.password,
    };
  }

  return config;
};

module.exports = addAuthHeader;

