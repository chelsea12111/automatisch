import path from 'path';
import { fileURLToPath } from 'url';
import { graphqlHTTP } from 'express-graphql';
import { loadSchemaSync, makeExecutableSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutable } from 'graphql-middleware';

import appConfig from '../config/app.js';
import logger from './logger.js';
import authentication from './authentication.js';
import * as Sentry from './sentry.ee.js';
import resolvers from '../graphql/resolvers.js';
import HttpError from '../errors/http.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let schema;
try {
  schema = loadSchemaSync(path.resolve(__dirname, '../graphql/schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });
} catch (e) {
  console.error('Error loading schema:', e);
  process.exit(1);
}

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const schemaWithMiddleware = applyMiddleware(
  makeExecutableSchema({
    schema: schemaWithResolvers,
  }),
  authentication.generate(schemaWithResolvers)
);

const graphQLInstance = graphqlHTTP({
  schema: makeExecutable(schemaWithMiddleware),
  rootValue: {},
  graphiql: appConfig.isDev,
  customFormatErrorFn: async (error) => {
    logger.error(error.path + ' : ' + error.message + '\n' + error.stack);

    if (error.originalError instanceof HttpError) {
      delete error.originalError.response;
    }

    Sentry.captureException(error, {
      tags: { graphql: true },
      extra: {
        source: error.source?.body,
        positions: error.positions,
        path: error.path,
      },
    });

    return error;
  },
});

export default graphQLInstance;
