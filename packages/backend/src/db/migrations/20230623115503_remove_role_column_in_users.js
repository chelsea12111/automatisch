export async function up(knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('role');
  });
}

export async function down(knex) {
  return knex.schema.table('users', (table) => {
    table.specificType('role', 'text').defaultTo('user');
  });
}
