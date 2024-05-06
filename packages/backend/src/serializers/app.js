const appSerializer = (app) => {
  const appData = {
    key: app.key,
    name: app.name,
    iconUrl: app.iconUrl,
    primaryColor: app.primaryColor,
    authDocUrl: app.authDocUrl,
    supportsConnections: app.supportsConnections,
  };

  if (app.connectionCount !== undefined) {
    appData.connectionCount = app.connectionCount;
  }

  if (app.flowCount !== undefined) {
    appData.flowCount = app.flowCount;
  }

  return appData;
};

export default appSerializer;
