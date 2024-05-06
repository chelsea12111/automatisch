// addNotionVersionHeader.js

const addNotionVersionHeader = (requestConfig) => {
  requestConfig.headers = {
    ...requestConfig.headers,
    'Notion-Version': '2022-06-28',
  };

  return requestConfig;
};

module.exports = addNotionVersionHeader;
