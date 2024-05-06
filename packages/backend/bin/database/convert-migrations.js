import appConfig from '../../src/config/app';
import logger from '../../src/helpers/logger';
import '../../src/config/orm';
import { Knex } from 'knex';
import { Client } from 'knex/types/drivers/pg/client-base';

export const renameMigrationsAsJsFiles = async (): Promise<void> => {
  if (!appConfig.isDev) {
    return;
  }

  try {
    const knexClient = knex as Client<any, Knex.TransactionClient<any>>;
    const tableExists = await knexClient.schema.hasTable('knex_migrations');

    if (tableExists) {
      await knexClient('knex_migrations')
        .where('name', 'like', '%.ts')
        .update({
          name: knexClient.raw("REPLACE(name, '.ts', '.js')"),
        });

      logger.info(
        `Migration file names with typescript renamed as JS file names!`
      );
    }
  } catch (err) {
    logger.error(err.message);
  } finally {
    try {
      if (knex && knex.client) {
        await (knex.client as any).destroy();
      }
    } catch (err) {
      logger.error(err.message);
    }
  }
};

(async () => {
  await renameMigrationsAsJsFiles();
})();

