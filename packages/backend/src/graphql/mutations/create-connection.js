import App from '../../models/app.js';
import AppConfig from '../../models/app-config.js';

const createConnection = async (parent, { input }, context) => {
  // Check if the user has permission to create a connection
  context.currentUser.can('create', 'Connection');

  const { key, appAuthClientId, formattedData } = input;

  // Fetch the app using the key
  const app = await App.findOneByKey(key);

  // Fetch the app config using the key
  const appConfig = await AppConfig.query().findOne({ key });

  // If the app config is disabled, throw an error
  if (appConfig && appConfig.disabled) {
    throw new Error(
      'This application has been disabled for new connections!'
    );
  }

  // If custom connections are not allowed and formattedData is present, throw an error
  if (appConfig && !appConfig.allowCustomConnection && formattedData) {
    throw new Error(`Custom connections cannot be created for ${app.name}!`);
  }

  // If the app config is shared and formattedData is not present, use the default formattedAuthDefaults
  if (appConfig && appConfig.shared && !formattedData) {
    const authClient = await appConfig
      .$relatedQuery('appAuthClients')
      .findById(appAuthClientId)
      .where({
        active: true,
      })
      .throwIfNotFound();

    formattedData = authClient.formattedAuthDefaults;
  }

  // Create the connection
  const createdConnection = await context.currentUser
    .$relatedQuery('connections')
    .insert({
      key,
      appAuthClientId,
      formattedData,
      verified: false,
    });

  return createdConnection;
};

export default createConnection;
