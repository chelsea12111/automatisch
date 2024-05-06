import { knexSnakeCaseMappers } from 'objection';
import appConfig from './src/config/app.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knexConfig = {
  client: 'pg',
  connection: {
    host: appConfig.postgres.host,
    port: appConfig.postgres.port,
    user: appConfig.postgres.username,
    password: appConfig.postgres.password,
    database: appConfig.postgres.database,
    ssl: appConfig.postgres.enableSsl,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'src/db/migrations'),
    extension: 'js',
  },
  seeds: {
    directory: path.join(__dirname, 'src/db/seeds'),
  },
  pool: {
    min: 0,
    max: 20,
  },
  asyncStackTraces: appConfig.env === 'development',
  searchPath: [appConfig.postgres.schema],
  ...(appConfig.env === 'test' ? knexSnakeCaseMappers() : {}),
};

export default knexConfig;
