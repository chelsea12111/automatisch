import { Knex } from 'knex';

const tableName = 'datastore';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('key', 255).notNullable();
    table.text('value');
    table.string('scope', 255).notNullable();
    table.uuid('scope_id').notNullable();

    table.unique(['key', 'scope', 'scope_id'], { indexName: 'unique_key_scope_scope_id' });
    table.index(['scope_id'], { indexName: 'index_scope_id' });

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
