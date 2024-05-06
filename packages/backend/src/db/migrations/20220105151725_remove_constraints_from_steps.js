export async function up(knex) {
  return knex.schema.table('steps', (table) => {
    table.string('key').defaultTo(null).alter();
    table.string('app_key').defaultTo(null).alter();
  });
}

export async function down(knex) {
  return knex.schema.table('steps', (table) => {
    table.string('key').notNullable().alter();
    table.string('app_key').notNullable().alter();
  });
}
